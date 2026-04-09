# FSD 아키텍처 규칙

## 레이어 구조 및 책임
```
app/       → Next.js 라우팅, 레이아웃, 페이지 조합
widgets/   → 페이지 수준 섹션 (여러 feature 조합)
features/  → 독립적인 기능 단위 (keyboard, screen 등)
shared/    → 어디서나 쓰는 공통 (stores, lib, config, providers)
```

## 의존성 방향 (위 → 아래만 허용)
- `app` → `widgets` → `features` → `shared`
- **역방향 import 절대 금지** (예: shared에서 features import 금지)

## 파일 네이밍
- 컴포넌트: `PascalCase.tsx`
- 훅: `use-kebab-case.ts`
- 유틸: `kebab-case.ts`
- 슬라이스 폴더명: `kebab-case/`

## 새 기능 추가 시
1. 어느 레이어에 속하는지 먼저 판단
2. 해당 레이어 폴더 안에 슬라이스 생성
3. 상위 레이어에서만 import
