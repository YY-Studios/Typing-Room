# Figma → 컴포넌트 변환 규칙

## 워크플로우

1. Figma MCP (`get_design_context`)로 디자인 컨텍스트 가져오기
2. MCP 결과는 레퍼런스일 뿐 — 그대로 쓰지 말고 아래 패턴으로 변환
3. FSD 레이어 판단 → 올바른 경로에 파일 생성

## FSD 배치 기준

| 컴포넌트 성격           | 위치 예시                                   |
| ----------------------- | ------------------------------------------- |
| 특정 기능에 종속        | `src/features/{slice}/ui/ComponentName.tsx` |
| 여러 feature 조합       | `src/widgets/{slice}/ui/ComponentName.tsx`  |
| 범용 UI (버튼, 배지 등) | `src/shared/ui/{name}/ComponentName.tsx`    |

## 컴포넌트 코드 형식

```tsx
'use client'; // 인터랙션 있으면 추가, 순수 표시용이면 생략

interface ComponentNameProps {
  // props 타입 명시
}

export const ComponentName = ({ ... }: ComponentNameProps) => {
  return (
    // Tailwind CSS
  );
};
```

## 스타일 규칙

- UI 크기: compact — `text-xs`/`text-sm`, `p-2`/`p-3`
- 조건부 클래스: `clsx()` 사용
- 색상: 기존 토큰 우선 (`text-nav`, `text-text-sub`, `text-text-main`, `border-primary` 등)
  → 토큰 없을 때만 hex 직접 사용
- shadcn/ui 컴포넌트 먼저 확인 후 없으면 `tailwind-variants` (`tv()`) 사용
- 인라인 스타일 (`style={{}}`) 금지

## 네이밍

- 파일명: `PascalCase.tsx`
- named export만 사용 (default export 금지)
- 컴포넌트명은 피그마 레이어명 기반으로 의미 있게

## 실제 예시

피그마에서 카카오 로그인 버튼 → `src/features/auth/ui/KakaoLoginButton.tsx`
피그마에서 통계 카드 → `src/features/screen/ui/StatsCard.tsx`
피그마에서 공통 뱃지 → `src/shared/ui/badge/Badge.tsx`
