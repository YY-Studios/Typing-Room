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
