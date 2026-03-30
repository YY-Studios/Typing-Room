import { useTypingEngine } from '../hooks/useTypingEngine';
import { useEffect } from 'react';
import clsx from 'clsx';
export const TypingArea = ({
  typingEngine,
}: {
  typingEngine: ReturnType<typeof useTypingEngine>;
}) => {
  const {
    chars,
    textareaRef,
    userInput,
    handleChange,
    focusTextarea,
    getCharState,
    isFocused,
    setIsFocused,
    isFinished,
  } = typingEngine;

  useEffect(() => {
    focusTextarea();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] px-10">
      {/* 문장 영역 */}
      <div
        onClick={focusTextarea}
        className="text-2xl leading-relaxed text-gray-300 tracking-wide text-center max-w-2xl"
      >
        {chars.map((char, i) => {
          const state = getCharState(i);
          const isInvisibleChar = userInput[i] === ' ' || userInput[i] === '\n';
          const displayChar =
            state === 'wrong' && !isInvisibleChar ? userInput[i] : char;
          return (
            <span
              key={i}
              className={clsx('relative', {
                'text-red-500': state === 'wrong',
                'text-blue-500': state === 'correct',
              })}
            >
              {displayChar}
              {state === 'cursor' && isFocused && (
                <span className="absolute -left-[2px] top-[2px] w-[4px] h-[1em] bg-yellow-400 animate-pulse animate-blink" />
              )}
            </span>
          );
        })}
      </div>
      <textarea
        ref={textareaRef}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={userInput}
        disabled={isFinished}
        name=""
        id=""
        className="fixed bottom-0 bg-gray-30k0 opacity-0"
      ></textarea>
    </div>
  );
};
