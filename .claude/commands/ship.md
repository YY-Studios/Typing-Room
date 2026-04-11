작업 마무리 워크플로우를 실행한다: 이슈 생성 → 커밋 → PR → 위키 업데이트.

---

## 1단계: 변경사항 파악

```bash
git status
git diff --stat
git log --oneline -5
```

변경된 파일과 작업 내용을 파악한다.

---

## 2단계: GitHub 이슈 생성

작업 내용을 기반으로 이슈를 생성한다:

```bash
gh issue create --title "<작업 요약>" --body "<작업 내용 설명>"
```

- 제목: 한국어, 작업 내용 한 줄 요약
- 생성된 이슈 번호를 기억해둔다 (이후 커밋/PR에 사용)

---

## 3단계: 커밋

관련 파일만 명시적으로 스테이징한다 (.env, secrets 절대 포함 금지):

```bash
git add <관련 파일들>
```

커밋 메시지는 Conventional Commits + 이슈 번호 형식을 반드시 따른다:

```
<type>: <한국어 설명> (#이슈번호)
```

type: feat / fix / chore / design / core / docs 중 선택

---

## 4단계: PR 생성

```bash
git push -u origin HEAD
gh pr create \
  --title "<type>: <한국어 설명> (#이슈번호)" \
  --body "..."
```

PR body 형식:

```
## 작업 내용
- 변경사항 bullet point

## 관련 이슈
closes #이슈번호

## 스크린샷
(해당 시)
```

---

## 5단계: 위키 업데이트

위키 경로: `/tmp/Typing-Room.wiki/`

아래 파일 중 이번 작업과 관련된 것만 수정한다:

| 파일                             | 업데이트할 때                |
| -------------------------------- | ---------------------------- |
| `Claude-Code-하네스-가이드.md`   | rules/commands/hooks 변경 시 |
| `🎨-Typing‐Room-UI-UX-가이드.md` | 컴포넌트/디자인 변경 시      |
| `Home.md`                        | 프로젝트 구조 변경 시        |
| `개발-환경-세팅.md`              | 의존성/환경 변경 시          |

```bash
cd /tmp/Typing-Room.wiki
# 해당 파일 수정 후:
git add -A && git commit -m "docs: <변경 내용 요약>" && git push
```

위키 레포가 로컬에 없으면 먼저 clone:

```bash
gh repo clone $(gh repo view --json nameWithOwner -q .nameWithOwner).wiki /tmp/Typing-Room.wiki
```
