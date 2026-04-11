# 퍼블(Publishing) 전용 작업 규칙

## 퍼블 작업이란?

UI 껍데기만 구현하는 작업. 실제 데이터 연결, API 호출, 스토어 바인딩은 하지 않는다.

## 퍼블 시 적용 규칙

- **데이터**: 하드코딩 or 파일 상단 `const MOCK_*` 로컬 상수 사용
- **스토어 연결 금지**: Zustand, TanStack Query 훅 연결하지 않음
- **API 호출 금지**: `clientApi`, `serverApi` 호출하지 않음
- **이벤트 핸들러**: `() => {}` 또는 `console.log`로 대체
- **TODO 주석**: 연결이 필요한 곳에 `// TODO: [스토어/API 연결]` 표시

## 예시

```tsx
// TODO: useUnlockStore 연결
const MOCK_UNLOCKED = ['default', 'candy-pop'];
const handleDelete = (id: string) => console.log('delete', id); // TODO: removeUnlock 연결
```

## 퍼블 완료 기준

- 모든 UI 상태(hover, active, disabled, empty) 시각적으로 확인 가능
- 실제 데이터 없이도 레이아웃이 깨지지 않음
- 연결 지점이 TODO로 명확히 표시됨
