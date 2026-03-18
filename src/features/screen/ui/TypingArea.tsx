import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { useEffect } from 'react';
import clsx from 'clsx';
export const TypingArea = () => {
  const { selectedText } = useTypingSettingStroe();
  const {
    chars,
    textareaRef,
    userInput,
    handleChange,
    focusTextarea,
    getCharState,
    isFocused,
    setIsFocused,
    isComplete,
  } = useTypingEngine(selectedText);

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
          const displauChar =
            state === 'wrong' && userInput[i] !== ' ' ? userInput[i] : char;
          return (
            <span
              key={i}
              className={clsx('relative', {
                'text-red-500': state === 'wrong',
                'text-blue-500': state === 'correct',
              })}
            >
              {displauChar}
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
        name=""
        id=""
        className="fixed bottom-0 bg-gray-30k0"
      ></textarea>
      {/* 출처 */}
      <div className="mt-6 text-sm text-gray-500 italic">
        💭 살며시 놓아둔 말
      </div>
    </div>
  );
};
