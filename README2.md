순서 정리:

**1단계: 정확도 계산**
useTypingEngine에서 맞은 글자 수 / 전체 입력 수 구하기.

```typescript
const inputChars = Array.from(userInput);
const correctCount = inputChars.filter((char, i) => char === chars[i]).length;
const accuracy =
  inputChars.length === 0
    ? 0
    : Math.round((correctCount / inputChars.length) * 100);
```

**2단계: 타이핑 시작 시간 기록**
첫 글자 칠 때 시간 저장. `useRef`로.

```typescript
const startTimeRef = useRef<number | null>(null);

// handleChange 안에서
if (!startTimeRef.current) startTimeRef.current = Date.now();
```

**3단계: WPM 계산**
경과 시간 + 맞은 글자 수로 계산.

```typescript
const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // 분
const wpm = elapsed > 0 ? Math.round(correctCount / 5 / elapsed) : 0;
// 영어 기준 5글자 = 1단어
```

**4단계: return에 추가**

```typescript
return { ...기존것들, accuracy, wpm };
```

**5단계: TypingStats 컴포넌트에 연결**
훅에서 꺼내서 표시.

1단계부터 갈까요?
