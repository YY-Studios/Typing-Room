맞아요, 그냥 div예요. 구조가 이래요:

```html
<div class="sentence">
  <span class="char typed">가</span>
  <span class="char typed">만</span>
  <span class="char typed">히</span>
  <span class="char current">앉</span> ← 지금 쳐야 할 글자
  <span class="char">아</span>
  <span class="char">아</span>
  ...
</div>
```

input이나 textarea가 아예 없어요. div 안에 글자마다 span을 쪼개놓고, 키보드 치면 JS가 span의 클래스만 바꿔주는 거예요. `.char` → `.typed`로 바뀌면 색이 바뀌고, `.current`가 다음 글자로 넘어가고, `.wrong`이면 빨갛게 깜빡이고.

유저 입장에서는 "내가 치는 대로 글자에 색이 입혀지는" 느낌이라 textarea처럼 커서가 깜빡이거나 텍스트가 추가되는 게 아니라, 이미 있는 문장이 점점 물드는 경험이에요. 이게 타이핑룸의 감성에 딱 맞는 거고요.

다만 한 가지 주의할 점이 있어요. 모바일에서는 `keydown` 이벤트만으로는 가상 키보드가 안 올라와요. 그래서 화면 밖에 숨겨진 input을 하나 둬요:

```html
<input
  id="ghost"
  style="position:fixed;left:-9999px;opacity:0"
  autocomplete="off"
/>
```

모바일에서 화면 터치하면 이 ghost input에 포커스를 걸어서 키보드를 띄우고, 입력 이벤트는 여기서 잡아서 같은 로직으로 처리하는 거예요. PC에서는 그냥 keydown으로 충분하고요.

---

---

---

---

한글 + 영어 둘 다 있으면
`keydown만으로 처리`하면 안 돼.

정확한 방식은 이거야:

- 보여주기: `div + span`
- 입력 받기: 실제 `input` 하나
- 처리 이벤트: `beforeinput` + `input` + `compositionstart` + `compositionend`

핵심 이유:

- 영어는 `keydown`으로도 얼추 되지만
- 한글은 조합형이라 `ㄱ` → `가`처럼 중간 상태가 있어서
- 최종 입력 글자는 `input/composition` 기준으로 잡아야 정확함

추천 구조

```html
<div class="sentence" aria-label="typing sentence">
  <span class="char typed">가</span>
  <span class="char current">만</span>
  <span class="char">히</span>
</div>

<input
  ref="{inputRef}"
  class="ghost-input"
  autocomplete="off"
  autocapitalize="off"
  spellcheck="false"
/>
```

CSS

```css
.ghost-input {
  position: fixed;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}
```

제일 중요한 포인트

1. 비교 단위는 “최종 1글자”
2. 한글 조합 중에는 판정하지 말고 `compositionend`에서 판정
3. 영어는 `input`에서 바로 판정
4. Backspace, Enter, Shift 같은 제어키는 따로 처리

실무적으로 제일 안전한 예시

```tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type CharState = 'idle' | 'typed' | 'current' | 'wrong';

const sentence = '가만히 앉아 있어도 괜찮아. typing room';

export default function Screen() {
  const inputRef = useRef<HTMLInputElement>(null);
  const composingRef = useRef(false);

  const chars = useMemo(() => Array.from(sentence), []);
  const [index, setIndex] = useState(0);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const consumeChar = (value: string) => {
    if (!value || index >= chars.length) return;

    const target = chars[index];

    if (value === target) {
      setWrongIndex(null);
      setIndex((prev) => prev + 1);
    } else {
      setWrongIndex(index);
      window.setTimeout(() => {
        setWrongIndex((prev) => (prev === index ? null : prev));
      }, 180);
    }
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleCompositionStart = () => {
    composingRef.current = true;
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    composingRef.current = false;

    const value = e.currentTarget.value;
    if (!value) return;

    const lastChar = Array.from(value).at(-1);
    if (lastChar) consumeChar(lastChar);

    e.currentTarget.value = '';
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (composingRef.current) return;

    const target = e.currentTarget;
    const value = target.value;
    if (!value) return;

    const lastChar = Array.from(value).at(-1);
    if (lastChar) consumeChar(lastChar);

    target.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (index > 0) {
        setWrongIndex(null);
        setIndex((prev) => prev - 1);
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }

    if (e.key === ' ') {
      // input에 space가 잘 들어가게 막지 않음
      return;
    }

    if (
      e.key === 'Shift' ||
      e.key === 'Control' ||
      e.key === 'Alt' ||
      e.key === 'Meta' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      return;
    }
  };

  const getCharClass = (charIndex: number): CharState => {
    if (wrongIndex === charIndex) return 'wrong';
    if (charIndex < index) return 'typed';
    if (charIndex === index) return 'current';
    return 'idle';
  };

  return (
    <div onClick={focusInput}>
      <div className="sentence" aria-label="typing sentence">
        {chars.map((char, i) => (
          <span key={`${char}-${i}`} className={`char ${getCharClass(i)}`}>
            {char}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        className="ghost-input"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </div>
  );
}
```

이 방식이 맞는 이유

- 영어: `input`으로 바로 들어옴
- 한글: 조합 중엔 기다렸다가 `compositionend`에서 최종 글자만 판정
- UI는 계속 `span` 클래스만 바꾸면 됨
- 너가 원하는 “문장이 물드는 느낌” 유지 가능

`keydown`만 쓰면 생기는 문제

```ts
// 비추천
window.addEventListener('keydown', (e) => {
  console.log(e.key);
});
```

한글에서 이런 이슈 생김:

- 조합 중간값이 들어옴
- 브라우저/IME마다 다름
- `e.key`가 최종 글자 보장 안 됨
- 오답 처리 타이밍이 꼬임

그래서 정리하면

정확한 방식:

- 렌더링은 `div + span`
- 입력은 숨겨진 `input`
- 영어는 `input`
- 한글은 `compositionend`
- 제어키는 `keydown`에서 별도 처리

한 줄 결론:
한글/영어 둘 다 할 거면 `keydown 기반 게임` 말고 `hidden input + composition 이벤트` 방식으로 가야 정확해.

원하면 내가 이걸 바로
`useTypingInput 훅`
형태로 짧게 빼줄게.

---

---

---

---

---

**0단계: 목업텍스트 필터링**
선택된 필터 한에서 텍스트를 랜덤으로 뽑아서 TypingArea에 넘기기..

**1단계: 문장 렌더링**
문장을 글자 단위로 쪼개서 각각 `span`으로 뿌리기. `Array.from(sentence)` 써서 한글도 정확히 1글자씩 분리. 이 시점에서는 그냥 회색 글자들이 화면에 나열되기만 하면 돼요.

**2단계: 숨겨진 input + 포커스**
ghost input 만들고 화면 밖으로 빼기. 페이지 로드 시 자동 포커스, 화면 아무 데나 클릭해도 다시 포커스 잡히게.

**3단계: 영어 입력 처리**
`input` 이벤트에서 마지막 글자 가져와서 현재 위치 글자와 비교. 맞으면 `.typed` 클래스 추가하고 다음 글자로, 틀리면 `.wrong` 잠깐 보여주기.

**4단계: 한글 조합 처리**
`compositionstart`에서 플래그 켜고, 조합 중에는 판정 안 함. `compositionend`에서 최종 글자만 가져와서 판정. 이게 없으면 `ㄱ→가→간` 중간값이 다 들어와서 꼬여요.

**5단계: 제어키 처리**
`keydown`에서 Backspace(이전 글자로 되돌리기), Shift/Ctrl/Alt/방향키(무시) 처리.

**6단계: 완료 판정**
`charIdx >= sentence.length` 되면 타이핑 끝. 여기서 결과 화면으로 넘기든, 다음 문장 로드하든.

============================================

textarea 방식으로 다시 정리하면:

**1단계: 문장 렌더링**
`Array.from(text)`로 글자 단위 span 쪼개기. 회색 글자 나열만 되면 OK.

**2단계: 숨겨진 textarea + 포커스**
투명 textarea 만들고 화면 밖으로 빼기. 페이지 로드 시 자동 포커스, 화면 클릭 시 재포커스.

**3단계: 입력 판정 (한글/영어 동시)**
`onChange`에서 `e.target.value` 전체를 원본 문장이랑 앞에서부터 비교. 맞으면 typed, 틀리면 wrong. 한글 조합은 브라우저가 알아서 처리하니까 별도 처리 없음.

**4단계: 완료 판정**
입력 길이 >= 문장 길이 되면 타이핑 끝.

**5단계: 소리/이펙트 (나중에)**
`onKeyDown`에서 키 누를 때마다 소리 재생, 리플 효과 트리거.

6단계에서 4단계로 줄었어요. composition 처리랑 제어키 처리가 통째로 빠진 거예요. 1단계는 했으니까 2단계 textarea 갈까요?


============================================

Gemini의 응답
가져오신 6단계 프로세스를 보니, 프론트엔드 커뮤니티나 블로그에서 **'바닐라 자바스크립트(Vanilla JS)로 타자 연습기 만들기'**의 아주 전형적이고 정석적인 교안을 찾아오셨네요!

결론부터 말씀드리면 "이론상 완벽하게 맞는 말이지만, React 환경에서는 저렇게 복잡하게 하실 필요가 없습니다."

영우님이 가져오신 방식(Ghost Input + 글자 인덱스 추적)과 제가 이전에 짜드린 코드(투명 Textarea + 전체 문자열 비교)의 차이를 실무 관점에서 비교해 드릴게요.

🚨 가져오신 방법의 가장 큰 지뢰: "4단계 한글 조합 처리"
타이핑 사이트를 만들 때 전 세계 개발자 중 한국 개발자만 겪는 고통이 바로 저 4단계입니다.

한글은 초성+중성+종성이 결합하는 IME(입력기) 조합 언어입니다.

사용자가 '간'을 칠 때 컴퓨터는 ㄱ -> 가 -> 간 순서로 인식합니다.

가져오신 방식대로 구현하면 ㄱ 쳤을 때 한 글자 맞았다고 넘어가 버리고, ㅏ 칠 때 다음 글자로 넘어가 버리는 대참사가 발생합니다.

그래서 compositionstart(조합 시작), compositionend(조합 끝) 이벤트를 다 달아서 막아줘야 하는데, 브라우저(크롬, 사파리)나 OS(맥, 윈도우)마다 이 이벤트가 터지는 타이밍이 미세하게 달라서 버그 잡다가 밤을 새우게 됩니다.

💡 React + 투명 Textarea 방식이 훨씬 좋은 이유
제가 이전에 짜드린 코드는 저 6단계를 단 하나의 onChange 이벤트로 압축해 버린 방식입니다.

1. 한글 조합, 브라우저에 맡기기 (4단계, 5단계 패스)
투명한 <textarea>를 쓰면 브라우저가 알아서 한글 조합(ㄱ->가->간)과 Backspace 지우기 등을 완벽하게 네이티브로 처리해 줍니다. 우리는 이벤트(composition)를 감지할 필요 없이, 그냥 textarea에 현재 적힌 **전체 글자(e.target.value)**만 가져오면 됩니다.

2. 글자 단위 추적 대신 '상태(State)' 비교 (3단계 패스)
가져오신 방법은 현재 인덱스(charIdx)를 숫자로 더하고 빼면서 추적합니다. (Imperative, 명령형)
React 방식은 그냥 "원본 문장"과 "내가 방금까지 친 전체 문장"을 겹쳐놓고 앞에서부터 비교만 합니다. (Declarative, 선언적)

JavaScript
// [가져오신 방식 - 바닐라 JS 스타일]
if (event.key === sentence[charIdx]) {
  charIdx++; // 맞으면 인덱스 1 증가
} else if (event.key === 'Backspace') {
  charIdx--; // 백스페이스면 인덱스 1 감소
} // 한글 조합 중이면 인덱스 멈춤... (복잡함)

// [제가 제안한 React 방식]
const handleInputChange = (e) => {
  setUserInput(e.target.value); // 그냥 친 글자 전체를 상태에 덮어씌움. 끝.
};
// 렌더링할 때 원본 글자랑 userInput 글자 위치끼리 비교해서 색칠함.
🎯 결론 및 제안
영우님이 가져오신 6단계 방식은 원리를 이해하는 데는 아주 훌륭한 교재입니다! 하지만 '타이핑룸'처럼 완성도 높은 서비스를 React로 빠르게 빼내려면, IME 버그 늪에 빠지기 쉬운 저 방식보다는 투명 Textarea를 활용한 상태 비교 방식으로 가시는 것을 강력히 추천합니다. (실제 상용 서비스들도 이 방식을 많이 씁니다.)

제가 전에 짜드린 코드의 구조가 바로 이 React 최적화 방식이었는데요, 혹시 이 방식에서 **'오타가 났을 때 화면이 미세하게 흔들리는(Error Shake) 애니메이션'**을 추가하는 방법을 바로 알려드릴까요? 아니면 이 텍스트 비교 로직을 Zustand 스토어와 분리해서 커스텀 훅(useTypingEngine)으로 빼는 방법을 보여드릴까요?




=========================================