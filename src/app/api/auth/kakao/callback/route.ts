import { NextRequest, NextResponse } from 'next/server';

import { serverApi } from '@/shared/api/server/serverApi';
import { createAccessToken, createRefreshToken } from '@/shared/lib/jwt';

interface KakaoTokenResponse {
  access_token: string;
}

interface KakaoUserResponse {
  id: number;
  kakao_account?: {
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

interface Profile {
  id: string;
  nickname: string;
  avatar_url: string | null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.json(
      { message: '인증 코드가 없습니다.' },
      { status: 400 },
    );
  }

  // CSRF 검증: 쿠키의 state와 콜백 state 비교
  const savedState = request.cookies.get('oauth_state')?.value;

  if (!state || state !== savedState) {
    return NextResponse.json(
      { message: '잘못된 요청입니다.' },
      { status: 403 },
    );
  }

  // 1. 카카오 토큰 교환
  const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID!,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
      redirect_uri: process.env.KAKAO_REDIRECT_URI!,
      code,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.json(
      { message: '카카오 토큰 교환 실패' },
      { status: 401 },
    );
  }

  const { access_token } = (await tokenRes.json()) as KakaoTokenResponse;

  // 2. 카카오 사용자 정보 조회
  const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!userRes.ok) {
    return NextResponse.json(
      { message: '카카오 사용자 정보 조회 실패' },
      { status: 401 },
    );
  }

  const kakaoUser = (await userRes.json()) as KakaoUserResponse;
  const kakaoId = String(kakaoUser.id);
  const nickname =
    kakaoUser.kakao_account?.profile?.nickname ?? `user_${kakaoId}`;
  const avatarUrl = kakaoUser.kakao_account?.profile?.profile_image_url ?? null;

  // 3. profiles 테이블 upsert
  try {
    const existing = await serverApi<Profile[]>(
      `/profiles?id=eq.${kakaoId}&select=id`,
    );

    if (existing.length === 0) {
      await serverApi('/profiles', {
        method: 'POST',
        body: { id: kakaoId, nickname, avatar_url: avatarUrl },
      });
    } else {
      await serverApi(`/profiles?id=eq.${kakaoId}`, {
        method: 'PATCH',
        body: { nickname, avatar_url: avatarUrl },
      });
    }
  } catch (e) {
    console.error('[auth/callback] profiles upsert 실패:', e);
    return NextResponse.json(
      { message: '프로필 저장 실패', detail: String(e) },
      { status: 500 },
    );
  }

  // 4. JWT 발급 → httpOnly 쿠키 set (access + refresh)
  const isProduction = process.env.NODE_ENV === 'production';
  const accessToken = createAccessToken({ user_id: kakaoId });
  const refreshToken = createRefreshToken({ user_id: kakaoId });

  const baseUrl = new URL(request.url).origin;
  const response = NextResponse.redirect(baseUrl);

  response.cookies.set('access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60,
    path: '/',
  });

  response.cookies.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });

  response.cookies.delete('oauth_state');

  return response;
}
