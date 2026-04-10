# AI 생성 코드 → 컴포넌트 변환 규칙

Figma MCP 외에, Google AI Studio / ChatGPT / v0 등 외부 AI가 생성한 코드를
이 프로젝트에 맞게 변환할 때 따르는 워크플로우.

## 워크플로우

1. **디자인 의도 파악** — AI가 생성한 코드에서 핵심 디자인 무드, 레이아웃, 인터랙션 추출
2. **제거할 것 식별** — 프로젝트와 무관한 로직 (스토어/카트/가격/외부 API 등)
3. **FSD 레이어 판단** → 올바른 경로에 파일 생성 (아래 표 참고)
4. **스택 변환** — 원본 스택과 무관하게 프로젝트 스택으로 재작성

## 제거 체크리스트

- [ ] 외부 라이브러리 (framer-motion → CSS animation, axios → fetch)
- [ ] 프로젝트 무관 비즈니스 로직 (결제, 카트, 외부 인증 등)
- [ ] 하드코딩된 외부 API 엔드포인트
- [ ] 프로젝트에 없는 폰트/아이콘 라이브러리

## FSD 배치 기준

| 성격              | 위치                                        |
| ----------------- | ------------------------------------------- |
| 특정 기능에 종속  | `src/features/{slice}/ui/ComponentName.tsx` |
| 여러 feature 조합 | `src/widgets/{slice}/ui/ComponentName.tsx`  |
| 범용 UI           | `src/shared/ui/{name}/ComponentName.tsx`    |
| 페이지 단위       | `src/app/{route}/page.tsx`                  |

## 스타일 변환 규칙

- 커스텀 CSS 클래스 → Tailwind CSS 4 유틸리티로 대체
- 인라인 `style={{}}` → Tailwind로 가능한 것은 클래스로 이동
  - 단, CSS 애니메이션 keyframe / `repeating-conic-gradient` 등 Tailwind 불가 속성은 인라인 유지
- 색상: 프로젝트 토큰 우선 (`text-primary`, `bg-surface` 등) → 없으면 hex 직접 사용
- 외부 애니메이션 라이브러리 → `globals.css` `@keyframes` + `animation` 속성으로 대체

## 컴포넌트 코드 형식

```tsx
'use client'; // 인터랙션 있으면 추가

interface ComponentNameProps {
  // props 타입 명시
}

export const ComponentName = ({ ... }: ComponentNameProps) => {
  return (
    // Tailwind CSS
  );
};
```

## 네이밍

- 파일명: `PascalCase.tsx`
- named export만 사용 (default export 금지)
- 원본 AI 코드의 컴포넌트명은 프로젝트 맥락에 맞게 재명명

## 실제 예시

Google AI Studio 키드코어 스토어 → `src/features/unlock-store/ui/UnlockStore.tsx`

- framer-motion 제거 → CSS `@keyframes` + `animation` 속성
- 결제/카트 로직 제거 → 잠금해제 시스템으로 교체
- 커스텀 CSS 유틸 → `globals.css`에 추가 후 클래스로 사용
