import { useRef, useState } from 'react';

export const useTypingEngine = (text: string) => {
  const [userInput, setUserInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const chars = Array.from(text);
  const isComplete = Array.from(userInput).length >= chars.length;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 유저 입력값
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (Array.from(value).length > chars.length) return;
    setUserInput(e.target.value);
  };

  // Textarea focus
  const focusTextarea = () => {
    textareaRef.current?.focus();
  };

  // 입력 판정
  const getCharState = (i: number) => {
    const inputChars = Array.from(userInput);

    //커서
    if (inputChars.length === i) return 'cursor';
    //아직 차례가 아니다 회색
    if (inputChars.length < i) return 'idle';
    //쳤는데 원본과 같다 초록색
    if (inputChars[i] === chars[i]) return 'correct';
    //쳤는데 다르다 빨간
    return 'wrong';
  };

  return {
    chars,
    textareaRef,
    userInput,
    setUserInput,
    handleChange,
    focusTextarea,
    getCharState,
    isFocused,
    setIsFocused,
    isComplete,
  };
};
