# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm format       # Prettier (write)
pnpm type-check   # tsc --noEmit
```

No test framework is configured.

## Commit Convention

Commits **must** follow Conventional Commits and include an issue reference — enforced by commitlint and Husky pre-commit hooks.

Format: `<type>: <subject> (#<issue-number>)`
Example: `feat: 타이핑 속도 표시 추가 (#12)`

Custom types beyond standard: `core`, `design`

## Architecture

**Feature-Sliced Design (FSD)** — the folder structure mirrors FSD layers:

```
src/
├── app/           # Next.js App Router pages & root layout
├── features/      # Self-contained feature modules
│   ├── keyboard/  # 3D keyboard (React Three Fiber) + sound
│   └── screen/    # Typing engine, stats display, text area
├── shared/        # Cross-cutting concerns
│   ├── ui/        # 공통 컴포넌트 (Button, Input, NoData, Pagination, Modal)
│   ├── stores/    # Zustand global state
│   ├── lib/       # Pure utility functions
│   ├── config/    # Sound preset definitions
│   ├── api/       # clientApi (BFF 호출), serverApi (Supabase REST)
│   └── providers/ # React Query provider + devtools
└── widgets/       # Page-level layout sections (header)
```

### Key Data Flows

**Typing session:**
`useTypingSettingStore` (Zustand) holds `emotion` + `language` → `getRandomText()` selects text → `useTypingEngine` drives character-by-character matching, CPM, and accuracy → `Screen.tsx` renders everything.

**Sound:**
`useTypingSound` preloads WAV buffers via Web Audio API on mount (preset from `soundPresets.ts`), plays a random buffer on each keypress.

**3D keyboard:**
`BaseKeyboard.tsx` (React Three Fiber) + `useKeyboardInput.ts` handles key highlight animations. Models live in `public/models/`.

### State Management

- **Zustand** (`shared/stores/`) — client UI state (selected emotion, language, current text)
- **TanStack Query** — server state (wrapped in `shared/providers/query-provider.tsx`)

## Auth & API Pattern (BFF)

Dev-craft 패턴 그대로 적용. Supabase Auth 라이브러리 사용 안 함.
See `.claude/rules/supabase-auth.md` for full patterns.

- **clientApi**: 프론트 → BFF (`credentials: 'include'`로 쿠키 자동 전송)
- **serverApi**: BFF → Supabase REST (service role key, 서버 전용)
- **Auth**: 카카오 OAuth → 커스텀 JWT → httpOnly 쿠키
- 모든 보호 API: `cookies()` → `verifyAccessToken()` → `user_id` 추출

**Env vars needed:** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, `KAKAO_CLIENT_ID`, `KAKAO_CLIENT_SECRET`

## Code Style

- **UI size**: Always compact — `text-xs`/`text-sm`, `p-2`/`p-3`
- **Styling**: Tailwind CSS 4; 컴포넌트 우선순위: `shared/ui` → `shadcn/ui` → `tailwind-variants` (`tv()`)
- **Path alias**: `@/*` maps to `src/*`
- Do not rename variables arbitrarily; mark any modifications with comments
