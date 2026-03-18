'use client';
import { useEffect, useState } from 'react';

import { TypingStats } from './TypingStats';
import { LanguageSelector } from '@/features/setting/LanguageSelector';
import { TypeSelector } from '@/features/setting/TypeSelector';
import { TypingArea } from './TypingArea';
import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
import { getRandomText } from '@/shared/lib/getRandomText';

export default function Screen() {
  const { emotion, language } = useTypingSettingStroe();
  const [seletedText, setSeletedText] = useState<string>('');

  console.log(emotion);
  console.log(language);
  console.log(seletedText);
  useEffect(() => {
    const result = getRandomText({ emotion, language });
    if (result) setSeletedText(result);
  }, [emotion, language]);

  return (
    <div className="flex flex-col gap-6 p-5 max-w-xl mx-auto">
      {/* 언어 선택 */}
      <LanguageSelector />
      {/* 타입 선택 */}
      <TypeSelector />
      {/* 타이핑 피드백/몰입 요소 */}
      <TypingStats />
      <TypingArea />
    </div>
  );
}
