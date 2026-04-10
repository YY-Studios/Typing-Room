# Auth & API 패턴 규칙 (dev-craft BFF 방식)

## 핵심 구조

Supabase Auth 라이브러리 사용 안 함.
**커스텀 JWT** → **httpOnly 쿠키** → **BFF 검증** 방식.

```
브라우저
  └─ clientApi (credentials: 'include') → /api/* (BFF Route)
                                              └─ verifyAccessToken(cookie)
                                              └─ serverApi (service role key) → Supabase REST
```

## 두 개의 API 클라이언트

### clientApi — 프론트엔드 → BFF

```ts
// src/shared/api/client/clientApi.ts
fetch(`/api/${path}`, {
  credentials: 'include', // 쿠키 자동 전송
  method: options?.method ?? 'GET',
  headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
  body: options?.body ? JSON.stringify(options.body) : undefined,
});
```

### serverApi — BFF → Supabase REST

```ts
// src/shared/api/server/serverApi.ts
fetch(`${NEXT_PUBLIC_SUPABASE_URL}/rest/v1${path}`, {
  headers: {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    'Content-Type': 'application/json',
  },
});
```

## 보호된 API Route 패턴

```ts
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
    const data = await serverApi(`/table?user_id=eq.${user_id}`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }
}
```

## 카카오 OAuth 로그인 흐름

1. `/api/auth/kakao` → 카카오 인증 URL로 리다이렉트
2. `/api/auth/kakao/callback` → code 받아서 카카오 토큰 교환
3. 카카오 user info 조회 → Supabase users 테이블 upsert
4. `createAccessToken({ user_id })` → httpOnly 쿠키 set
5. 홈으로 리다이렉트

## JWT 관리

- `createAccessToken`: `jwt.sign({ user_id }, JWT_SECRET, { expiresIn: '7d' })`
- `verifyAccessToken`: `jwt.verify(token, JWT_SECRET)` → `{ user_id }`
- 쿠키: `httpOnly: true`, `secure: prod`, `sameSite: 'lax'`

## 금지 사항

- 브라우저에서 SUPABASE_SERVICE_ROLE_KEY 접근 금지
- localStorage에 토큰 저장 금지
- Supabase Auth 클라이언트 라이브러리 사용 금지 (이 프로젝트는 커스텀 JWT 방식)
- 클라이언트 컴포넌트에서 직접 Supabase REST 호출 금지

## 환경변수

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
KAKAO_REDIRECT_URI=
```
