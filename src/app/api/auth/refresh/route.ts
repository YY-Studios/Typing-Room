import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from '@/shared/lib/jwt';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 },
    );
  }

  try {
    const { user_id } = verifyRefreshToken(refreshToken);
    const isProduction = process.env.NODE_ENV === 'production';

    // 새 access token + refresh token 발급 (refresh rotation)
    const newAccessToken = createAccessToken({ user_id });
    const newRefreshToken = createRefreshToken({ user_id });

    cookieStore.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 60 * 60, // 1시간
      path: '/',
    });

    cookieStore.set('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30일
      path: '/',
    });

    return NextResponse.json({ message: '토큰 갱신 완료' });
  } catch {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    return NextResponse.json({ message: '인증 만료' }, { status: 401 });
  }
}
