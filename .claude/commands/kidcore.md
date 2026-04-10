키드코어(Kidcore) 스타일로 새 UI 섹션을 스캐폴딩한다.

.claude/rules/kidcore-design.md 디자인 시스템을 따른다.

작업 순서:

1. 사용자에게 만들 UI 섹션 유형 확인:
   - card: 아이템 카드 (plastic-shine + sticker-shadow)
   - section: 제목 + 그리드 섹션
   - page: 전체 페이지 (배경 포함)
2. 해당 유형의 보일러플레이트 생성:

[card]

- rounded-3xl border-[6px] border-white sticker-shadow
- .plastic-shine 오버레이
- hover:scale-105 hover:rotate-1 transition-all duration-200
- 태그 배지: absolute -right-2 -top-3

[section]

- 섹션 헤더: font-black uppercase tracking-tight bubble-text-shadow
- 탭 버튼: rounded-full border-4 border-white sticker-shadow
- 그리드: grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4

[page]

- 풀 키드코어: StarburstBg 컴포넌트 + UnlockStore 패턴
- 톤다운: bg-gradient-to-b 연한 그래디언트 (스타버스트 없음)

3. FSD 레이어에 맞는 경로에 파일 생성
4. named export 사용, 'use client' 필요 시 추가
