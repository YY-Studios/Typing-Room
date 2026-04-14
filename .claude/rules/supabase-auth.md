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
// 401 시 자동 리프레시 후 재요청
const request = async (path, options?) => {
  return fetch(`/api/${path}`, {
    credentials: 'include',
    method: options?.method ?? 'GET',
    headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
};

export const clientApi = async <T>(path, options?): Promise<T> => {
  let res = await request(path, options);
  if (res.status === 401) {
    const refreshRes = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    if (refreshRes.ok) res = await request(path, options);
  }
  if (!res.ok) {
    /* throw */
  }
  return res.json();
};
```

### serverApi — BFF → Supabase REST

```ts
// src/shared/api/server/serverApi.ts
// ⚠️ 빈 응답 처리 필수: Supabase POST/PATCH/DELETE는 빈 body 반환 가능
const text = await res.text();
if (!text) return [] as T;
return JSON.parse(text) as T;
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

1. `/api/auth/kakao` → 카카오 인증 URL로 리다이렉트 (CSRF state 쿠키 포함)
2. `/api/auth/kakao/callback` → state 검증 → code 받아서 카카오 토큰 교환
3. 카카오 user info 조회 → Supabase profiles 테이블 upsert
4. `createAccessToken` + `createRefreshToken` → httpOnly 쿠키 set (각각 1시간, 30일)
5. 홈으로 리다이렉트

## 리다이렉트 응답에서 쿠키 설정

⚠️ **`cookies()` (next/headers)로 쿠키를 설정하고 `NextResponse.redirect()`를 반환하면 쿠키가 응답에 포함되지 않는다.**

```ts
// ❌ 잘못된 방식 — 쿠키 안 붙음
const cookieStore = await cookies();
cookieStore.set('token', value, { ... });
return NextResponse.redirect(url);

// ✅ 올바른 방식 — response 객체에 직접 set
const response = NextResponse.redirect(url);
response.cookies.set('token', value, { ... });
return response;
```

- 읽기: `request.cookies.get()` 사용
- 쓰기: `response.cookies.set()` 사용
- `cookies()` (next/headers)는 **리다이렉트가 아닌** 일반 응답에서만 사용

## JWT 관리 (Access + Refresh 토큰)

### 토큰 종류

| 토큰          | 만료  | 쿠키명          | 용도                |
| ------------- | ----- | --------------- | ------------------- |
| Access Token  | 1시간 | `access_token`  | API 인증            |
| Refresh Token | 30일  | `refresh_token` | Access Token 재발급 |

### 함수

- `createAccessToken`: `jwt.sign({ user_id }, JWT_SECRET, { expiresIn: '1h' })`
- `createRefreshToken`: `jwt.sign({ user_id }, JWT_SECRET, { expiresIn: '30d' })`
- `verifyAccessToken` / `verifyRefreshToken`: `jwt.verify(token, JWT_SECRET)` → `{ user_id }`
- 쿠키: `httpOnly: true`, `secure: prod`, `sameSite: 'lax'`

### 리프레시 흐름

1. `clientApi`가 401 응답 받음
2. `/api/auth/refresh` POST 호출 (refresh_token 쿠키 자동 전송)
3. Refresh Token 검증 → 새 Access + Refresh 토큰 발급 (Refresh Rotation)
4. 원래 요청 재시도
5. Refresh도 만료 시 → 쿠키 전체 삭제 → 재로그인 필요

## profiles 테이블

- `profiles.id`는 **text** 타입 (카카오 숫자 ID를 문자열로 저장)
- `auth.users` FK 없음 — Supabase Auth를 사용하지 않으므로
- `typing_results.user_id`, `user_unlocks.user_id`도 text 타입

## 금지 사항

- 브라우저에서 SUPABASE_SERVICE_ROLE_KEY 접근 금지
- localStorage에 토큰 저장 금지
- Supabase Auth 클라이언트 라이브러리 사용 금지 (이 프로젝트는 커스텀 JWT 방식)
- 클라이언트 컴포넌트에서 직접 Supabase REST 호출 금지
- 리다이렉트 응답에서 `cookies()` (next/headers)로 쿠키 설정 금지
- `serverApi` 응답을 `res.json()`으로 직접 파싱 금지 (빈 body 에러 발생)

## 환경변수

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
KAKAO_REDIRECT_URI=
```
