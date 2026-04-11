퍼블 완료된 컴포넌트에 실제 스토어/API를 연결한다.

작업 순서:

1. 대상 파일을 확인한다 (사용자가 파일 경로를 주거나, 현재 작업 중인 파일)
2. 파일 내 `// TODO:` 주석을 모두 찾아 목록화한다
3. 각 TODO 항목을 순서대로 연결한다:

[스토어 연결]

- MOCK\_\* 상수 제거
- 해당 Zustand store import 후 훅으로 교체
- 이벤트 핸들러의 console.log → 실제 store 액션 호출

[API 연결]

- clientApi import
- 이벤트 핸들러 → async/await + clientApi 호출
- 로딩/에러 상태 필요하면 TanStack Query(useQuery/useMutation) 사용
- supabase-auth.md 패턴 준수

[공통 주의사항]

- 'use client' 지시어 유지
- 에러 처리: try/catch 또는 onError 콜백
- 연결 완료된 TODO 주석 제거

4. 연결 완료 후 `pnpm type-check` 실행하여 타입 오류 확인
5. 연결된 항목 목록을 요약 보고
