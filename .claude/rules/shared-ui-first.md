---

# shared/ui 우선 사용 규칙

## 핵심 원칙

새 UI 요소를 인라인으로 만들기 전, 반드시 `shared/ui/`를 먼저 확인한다.

## 체크 순서

1. `shared/ui/index.ts` 에서 이미 있는 컴포넌트인지 확인
2. 있으면 → 그대로 가져다 쓴다
3. 없지만 **재사용 가능성이 있으면** → `shared/ui/{name}/` 에 먼저 만들고 index.ts에 등록, 그 다음 사용
4. 완전히 특정 feature에만 쓰이는 것만 → feature 내부에 인라인

## 재사용 가능성 판단 기준

아래에 해당하면 `shared/ui/`로 추출:

- 버튼, 토글, 슬라이더, 입력, 뱃지, 카드, 모달 등 **기본 UI 빌딩 블록**
- 동일 feature 내 2곳 이상에서 사용
- 다른 feature에서 쓰일 가능성이 있는 것

## 현재 shared/ui 컴포넌트 목록

| 컴포넌트       | 경로                             | 용도                                                       |
| -------------- | -------------------------------- | ---------------------------------------------------------- |
| `Button`       | `button/Button.tsx`              | 버튼 (variant: primary/secondary/danger/ghost/dark/subtle) |
| `Toggle`       | `toggle/Toggle.tsx`              | 키드코어 on/off 토글                                       |
| `VolumeSlider` | `volume-slider/VolumeSlider.tsx` | 볼륨 슬라이더                                              |
| `Input`        | `input/Input.tsx`                | 텍스트 입력                                                |
| `Modal`        | `modal/`                         | 모달 시스템                                                |
| `NoData`       | `no-data/NoData.tsx`             | 빈 상태 표시                                               |
| `Pagination`   | `pagination/Pagination.tsx`      | 페이지네이션                                               |

## 금지 사항

- 이미 `shared/ui/`에 있는 컴포넌트를 feature 내부에서 다시 만드는 것
- `Button` 대신 `<button className="...">` 을 새로 스타일링하는 것 (Button의 variant/className 활용)
