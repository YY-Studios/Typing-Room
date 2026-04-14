# 폼 & 유효성 검증 규칙

## 스택

- **Zod** — 스키마 정의 + 유효성 검증
- **React Hook Form** — 폼 상태 관리
- **@hookform/resolvers** — Zod ↔ React Hook Form 연결

## 폼 컴포넌트 구조

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';

// 1. 스키마 정의
const schema = z.object({
  nickname: z
    .string()
    .min(2, '2자 이상 입력해주세요')
    .max(20, '20자 이하로 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

// 2. 컴포넌트
export const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    /* API 호출 */
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('nickname')} />
      {errors.nickname && (
        <p className="text-xs text-red-500">{errors.nickname.message}</p>
      )}
      <button type="submit">저장</button>
    </form>
  );
};
```

## Zod 스키마 배치

| 성격              | 위치                                   |
| ----------------- | -------------------------------------- |
| 특정 feature 전용 | `src/features/{slice}/model/schema.ts` |
| 여러 feature 공유 | `src/shared/lib/schemas.ts`            |
| API Route 전용    | 해당 route 파일 내부                   |

## 공통 유효성 패턴

```ts
// 닉네임: 2~20자, 특수문자 제한
z.string()
  .min(2, '2자 이상')
  .max(20, '20자 이하')
  .regex(/^[가-힣a-zA-Z0-9_]+$/, '한글, 영문, 숫자, _만 가능');

// 필수 텍스트
z.string().min(1, '필수 입력');

// URL (선택)
z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal(''));
```

## 에러 메시지 표시

```tsx
{
  errors.fieldName && (
    <p className="mt-1 text-xs font-bold text-red-500">
      {errors.fieldName.message}
    </p>
  );
}
```

## 서버 검증

API Route에서도 동일한 Zod 스키마로 검증 가능:

```ts
const result = schema.safeParse(body);
if (!result.success) {
  return NextResponse.json(
    { message: result.error.issues[0].message },
    { status: 400 },
  );
}
```

## 작업 완료 시 필수 검증

폼 컴포넌트를 생성하거나 수정한 경우, **작업 완료 전에 반드시 아래 항목을 확인**해야 한다.

### 1. 타입 체크

```bash
pnpm type-check
```

### 2. Zod 스키마 검증 케이스 나열

폼 작업 완료 시 각 필드의 성공/실패 케이스를 표로 보고:

```
| 필드     | 입력값         | 예상 결과              |
| -------- | -------------- | ---------------------- |
| nickname | ""             | ❌ "2자 이상"          |
| nickname | "a"            | ❌ "2자 이상"          |
| nickname | "ab"           | ✅ 통과                |
| nickname | "가나다라마..."  | ❌ "20자 이하"         |
| nickname | "hello!@#"     | ❌ "한글, 영문, 숫자, _만 가능" |
```

### 3. 브라우저 확인 항목

- [ ] 빈 입력 → 에러 메시지 표시되는지
- [ ] 최소/최대 길이 초과 → 에러 메시지 표시되는지
- [ ] 유효한 입력 → 제출 성공하는지
- [ ] 제출 중 버튼 비활성화 (`isSubmitting`) 되는지
- [ ] API 에러 시 에러 메시지가 사용자에게 보이는지

## 금지 사항

- 직접 `if (value.length < 2)` 같은 수동 검증 작성 금지 — Zod 스키마 사용
- `onChange`로 실시간 검증 직접 구현 금지 — React Hook Form의 `mode: 'onBlur'` 또는 `mode: 'onChange'` 사용
- 클라이언트/서버 검증 로직 이중 작성 금지 — 스키마 파일 공유
- 폼 작업 후 검증 케이스 보고 없이 "완료"라고 하는 것
