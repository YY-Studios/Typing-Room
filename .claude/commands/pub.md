퍼블(Publishing) 전용 모드로 UI 컴포넌트를 구현한다.

.claude/rules/pub-only.md 와 .claude/rules/kidcore-design.md 규칙을 따른다.

작업 순서:

1. 사용자에게 구현할 컴포넌트/페이지명과 위치(FSD 레이어) 확인
2. 실제 스토어/API 연결 없이 UI 껍데기만 구현
   - 데이터: 파일 상단 `const MOCK_*` 로컬 상수 사용
   - 이벤트 핸들러: `() => {}` 또는 `console.log`로 대체
   - 연결 필요 지점마다 `// TODO: [스토어/API 연결]` 주석 삽입
3. 모든 UI 상태(hover, active, disabled, empty) 구현
4. 키드코어 디자인 시스템 적용 (rounded-3xl, border-[6px] border-white, sticker-shadow 등)
5. 구현 완료 후 자동 마무리 (사용자에게 묻지 말고 바로 처리):
   a. `src/shared/ui/` 에 새 컴포넌트를 추가했으면 → `src/shared/ui/index.ts` 업데이트
   b. 새 공통 컴포넌트면 → `CLAUDE.md` Architecture의 `shared/ui/` 항목에 추가
   c. `pnpm type-check` 실행하여 타입 오류 확인
6. 최종 보고: 생성된 파일 목록 + TODO 주석 목록
