import { useEffect, useRef, useState } from 'react';
import { getStrokeCount } from '@/shared/lib/getStrokeCount';

/** 텍스트를 글자 단위로 쪼개고, 입력 판정/포커스/완료 여부를 관리하는 훅 */
export const useTypingEngine = (text: string) => {
  const [userInput, setUserInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const chars = Array.from(text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputChars = Array.from(userInput);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [cpm, setCpm] = useState<number>(0);
  const isFinished =
    inputChars.length > 0 && inputChars.length === chars.length;

  /** textarea의 onChange 핸들러. 문장 길이 초과 시 입력 차단 */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
    console.log(value);

    if (Array.from(value).length > chars.length) return;
    setUserInput(value);
  };

  /** textarea에 포커스를 주는 함수 */
  const focusTextarea = () => {
    textareaRef.current?.focus();
  };

  /** i번째 글자의 상태를 반환 (cursor | idle | correct | wrong) */
  const getCharState = (i: number) => {
    //커서
    if (inputChars.length === i) return 'cursor';
    //아직 차례가 아니다 회색
    if (inputChars.length < i) return 'idle';
    //쳤는데 원본과 같다 초록색
    if (inputChars[i] === chars[i]) return 'correct';
    //쳤는데 다르다 빨간
    return 'wrong';
  };

  /** 타이핑 정확도 계산 함수 */
  let correctCount = 0;
  let strokeCount = 0;
  for (let i = 0; i < inputChars.length; i++) {
    if (inputChars[i] === chars[i]) {
      correctCount++;
      strokeCount += getStrokeCount(inputChars[i]);
    }
  }

  const accuracy =
    inputChars.length === 0
      ? 0
      : Math.floor((correctCount / inputChars.length) * 100);

  /** 실시간 타수 계산 함수 */
  useEffect(() => {
    if (!startTime || isFinished) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMinutes = (now - startTime) / 60000;

      if (elapsedMinutes > 0) {
        const currentCpm = Math.floor(strokeCount / elapsedMinutes);
        setCpm(currentCpm);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [startTime, strokeCount, isFinished]);

  /** 세팅 초기화 함수 */
  const resetEngine = () => {
    setUserInput('');
    setCpm(0);
    setStartTime(null);
  };
  return {
    /** 원본 문장을 글자 단위로 쪼갠 배열 */
    chars,
    /** textarea를 잡는 ref */
    textareaRef,
    /** 유저가 현재까지 입력한 문자열 */
    userInput,
    setUserInput,
    handleChange,
    focusTextarea,
    getCharState,
    /** textarea 포커스 여부 */
    isFocused,
    setIsFocused,
    /** 정확도 */
    accuracy,
    cpm,
    /** 문장 타이핑 완료 여부 */
    isFinished,
    resetEngine,
  };
};
