# 폼 컴포넌트 생성

Zod + React Hook Form 기반 폼 컴포넌트를 스캐폴딩한다.

## 입력

$ARGUMENTS — 폼 설명 (예: "프로필 수정 폼", "닉네임 변경")

## 워크플로우

1. **스키마 정의** — `model/schema.ts`에 Zod 스키마 생성
2. **폼 컴포넌트 생성** — React Hook Form + zodResolver 연결
3. **에러 표시** — 각 필드 아래 에러 메시지
4. **FSD 배치** — feature 전용이면 `features/{slice}/`, 공통이면 `shared/`

## 코드 형식

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Button, Input } from '@/shared/ui';

const schema = z.object({
  /* 필드 */
});
type FormData = z.infer<typeof schema>;

export const FormName = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    /* API 호출 */
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input + 에러 메시지 */}
      <Button type="submit" disabled={isSubmitting}>
        저장
      </Button>
    </form>
  );
};
```

## 체크리스트

- [ ] Zod 스키마에 한글 에러 메시지 포함
- [ ] `shared/ui`의 Input, Button 컴포넌트 사용
- [ ] 서버 검증 필요 시 동일 스키마 공유
- [ ] `isSubmitting`으로 중복 제출 방지
- [ ] 키드코어 스타일 적용 (rounded-2xl 이상, sticker-shadow 등)
