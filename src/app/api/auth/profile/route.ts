import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { serverApi } from '@/shared/api/server/serverApi';
import { verifyAccessToken } from '@/shared/lib/jwt';
import { nicknameSchema } from '@/features/profile/model/schema';

export async function PATCH(request: NextRequest) {
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
    const body = await request.json();

    // Zod 검증
    const result = nicknameSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 },
      );
    }

    await serverApi(`/profiles?id=eq.${user_id}`, {
      method: 'PATCH',
      body: { nickname: result.data.nickname },
    });

    return NextResponse.json({ message: '닉네임 변경 완료' });
  } catch {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }
}
