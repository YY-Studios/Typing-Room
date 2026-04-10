# 키드코어(Kidcore) 디자인 시스템

Typing-Room의 모든 UI는 이 디자인 시스템을 따른다.

## 레퍼런스

아래 프롬프트로 생성된 Gemini Flash Preview 결과물이 기준:

> "첨부된 영상의 '키드코어(Kidcore)' 스타일을 중심으로 Typing-Room의 스토어 페이지를 설계해줘.
> 모든 키보드 스킨 상품은 장난감 패키지(Toy packaging) 속에 들어있는 것처럼 **반짝이는 플라스틱 질감(Glossy/Plastic shine)**을 입혀줘.
> 배경은 화려한 스타버스트(Starburst) 패턴과 네온 핑크/일렉트릭 블루 그래디언트를 사용하고,
> 모든 버튼과 라벨은 스티커(Sticker-like) 느낌과 버블 폰트를 적용해줘.
> 전체적으로 90년대 장난감 가게를 구경하는 듯한 즐겁고 압도적인(Overwhelming in a good way) 분위기를 만들어줘."

## 컬러 팔레트

| 역할               | 값                                                      |
| ------------------ | ------------------------------------------------------- |
| Primary            | `#ffb800` (Toy Yellow)                                  |
| Accent A           | Neon Pink (`#ff2d8d`, `bg-pink-500`, `bg-fuchsia-500`)  |
| Accent B           | Electric Blue (`#3b82f6`, `bg-blue-500`, `bg-cyan-500`) |
| Background (light) | `#fbf9f5` (cream)                                       |
| Background (dark)  | `#0f111a` (deep navy)                                   |

## 타이포그래피

- **헤딩/CTA**: `font-black uppercase tracking-tight` + `.bubble-text-shadow`
- **태그/라벨**: `font-bold uppercase tracking-wider text-xs`
- **본문**: `font-medium text-sm`
- WebkitTextStroke: `2px rgba(0,0,0,0.15)` for large headings

## 컴포넌트 스타일 원칙

### 카드

```
rounded-3xl border-[6px] border-white sticker-shadow
```

- `.plastic-shine` 오버레이 필수 (광택 효과)
- `hover:scale-105 hover:rotate-1 transition-all duration-200`

### 버튼

```
rounded-full border-4 border-white font-black uppercase tracking-wider sticker-shadow
```

- hover: `scale-105`, active: `scale-95`
- Primary CTA: solid white bg + dark text
- Secondary: `bg-white/20 backdrop-blur-sm text-white`

### 태그 배지

```
absolute -right-2 -top-3 rounded-full border-2 border-white bg-red-500
text-[10px] font-bold uppercase tracking-wider text-white sticker-shadow
```

## CSS 유틸 클래스 (globals.css에 정의됨)

| 클래스                | 효과                                        |
| --------------------- | ------------------------------------------- |
| `.plastic-shine`      | 135deg 대각선 광택 오버레이                 |
| `.sticker-shadow`     | `drop-shadow(4px 4px 0px rgba(0,0,0,0.2))`  |
| `.bubble-text-shadow` | `text-shadow: 3px 3px 0px rgba(0,0,0,0.15)` |

## 배경 유형

| 페이지 성격               | 배경 처리                                             |
| ------------------------- | ----------------------------------------------------- |
| 메인/스토어 (풀 키드코어) | `StarburstBg` 컴포넌트 (회전 스타버스트 + 그래디언트) |
| 보조 페이지 (톤다운)      | 단색 또는 연한 그래디언트, 스타버스트/스파클 없음     |

## 금지 사항

- 인라인 `style={{}}` 사용 금지 (WebkitTextStroke 예외)
- 밋밋한 `rounded-md`/`rounded-lg` — 항상 `rounded-2xl` 이상
- 회색 계열 단색 버튼 — 항상 컬러 or white border 적용
- default export — named export만 사용
