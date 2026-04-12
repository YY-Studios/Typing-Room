# 테마 시스템 규칙

## 핵심 개념

**테마 = 소리 + 키보드 스타일 + 배경 데코**

스토어에서 유저가 고르는 건 "소리(테마)"이다.
소리를 고르면 키보드 색상과 배경 데코가 함께 적용된다.

## 현재 테마 목록

| slug     | 이름   | 소리 파일  | 키보드 색상                             | 배경 데코                      |
| -------- | ------ | ---------- | --------------------------------------- | ------------------------------ |
| duzzoncu | 두쫀쿠 | key1~4.wav | 미정                                    | character.png                  |
| honey    | 허니   | key1~3.wav | base=#FF8C00, keys=#FFF, accent=#FFB800 | bear.png, bee.png              |
| pudding  | 푸딩   | 미정       | 미정                                    | girl.png, pudding.png          |
| ice      | 아이스 | 미정       | 미정                                    | snowflake.png, penguin-1/2.png |

## DB 구조

- `themes` — 테마 마스터 (slug, 이름, 키보드 색상, is_free 등)
- `theme_sounds` — 테마별 소리 파일 (theme_id FK)
- `theme_decos` — 테마별 배경 데코 이미지 (theme_id FK, position, image_url)

새 테마 추가 시 DB INSERT만 하면 코드 수정 없이 스토어에 노출된다.

## 정적 에셋 구조

```
public/deco/{slug}/        — 배경 데코 PNG
public/sounds/{slug}/      — 소리 WAV
```

## 스토어 규칙

- 스토어는 **테마 단일 목록**으로 표시 (키보드/소리 탭 분리 없음)
- 테마 카드 선택 → 소리 + 키보드 + 배경 한꺼번에 적용
- `useUnlockStore`에서 `activeThemeId` 하나로 관리

## 배경 데코 배치 규칙

- 데코 컴포넌트: `pointer-events-none fixed inset-0 -z-10 overflow-hidden`
- 각 이미지: `absolute` + 위치 Tailwind 클래스, `alt=""`, `loading="lazy"`
- PC에서만 표시: `hidden lg:block`
- `overflow-hidden` 필수 (스크롤바 방지)
- Next.js Image 사용 안 함 (장식용, SEO 무관)

## 모바일 처리

타이핑은 물리 키보드 필수이므로 모바일(lg 미만)에서는 PC 접속 안내 표시.

```tsx
<MobileBlock />                    {/* lg 미만에서만 */}
<main className="hidden lg:block"> {/* lg 이상에서만 */}
```

## 새 테마 추가 체크리스트

### 1. 에셋 배치

- [ ] `public/deco/{slug}/` — 배경 데코 PNG 넣기
- [ ] `public/sounds/{slug}/` — 소리 WAV 넣기

### 2. 코드 수정 (퍼블 단계)

- [ ] `DecoBg.tsx`의 `DECO_MAP`에 항목 추가 (이미지 경로 + 위치/크기/투명도)
- [ ] `UnlockStore.tsx`의 `MOCK_THEMES`에 항목 추가
- [ ] `keyboardDesign.ts`의 `KEYBOARD_THEMES`에 키보드 색상 추가
- [ ] `soundPresets.ts`의 `SOUND_PRESETS`에 소리 프리셋 추가

### 3. DB (API 연결 후)

- [ ] `themes` 테이블에 INSERT
- [ ] `theme_sounds` 테이블에 소리 파일 INSERT
- [ ] `theme_decos` 테이블에 데코 이미지 INSERT

API 연결 완료 후에는 코드 수정 없이 DB INSERT만으로 테마 추가 가능.

## 금지 사항

- 키보드 스킨과 소리를 별도 상품으로 분리 판매
- 스토어에 keyboard/sound 탭 구분
- `activeKeyboardId`와 `activeSoundId` 분리 관리 (→ `activeThemeId` 하나로)
