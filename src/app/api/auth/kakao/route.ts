import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.KAKAO_CLIENT_ID!;
  const redirectUri = process.env.KAKAO_REDIRECT_URI!;

  // CSRF 방지: 랜덤 state 생성 → 쿠키에 저장 → 카카오에 전달
  const state = crypto.randomUUID();

  const kakaoAuthUrl =
    `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&state=${state}`;

  const response = NextResponse.redirect(kakaoAuthUrl);
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10,
    path: '/',
  });

  return response;
}
