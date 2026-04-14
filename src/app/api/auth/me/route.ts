import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { serverApi } from '@/shared/api/server/serverApi';
import { verifyAccessToken } from '@/shared/lib/jwt';

interface Profile {
  id: string;
  nickname: string;
  avatar_url: string | null;
  created_at: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 },
    );
  }

  try {
    const { user_id } = verifyAccessToken(accessToken);
    const data = await serverApi<Profile[]>(
      `/profiles?id=eq.${user_id}&select=*`,
    );

    if (data.length === 0) {
      return NextResponse.json(
        { message: '프로필을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(data[0]);
  } catch {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }
}
