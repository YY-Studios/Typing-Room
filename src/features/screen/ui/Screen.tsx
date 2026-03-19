'use client';
import { useEffect, useState } from 'react';

import { TypingStats } from './TypingStats';
import { LanguageSelector } from '@/features/setting/LanguageSelector';
import { TypeSelector } from '@/features/setting/TypeSelector';
import { TypingArea } from './TypingArea';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';

export default function Screen() {
  const { selectedText } = useTypingSettingStroe();
  const typingEngine = useTypingEngine(selectedText);
  return (
    <div className="flex flex-col gap-6 p-5 max-w-xl mx-auto">
      {/* 언어 선택 */}
      <LanguageSelector resetEngine={typingEngine.resetEngine} />
      {/* 타입 선택 */}
      <TypeSelector />
      {/* 타이핑 피드백/몰입 요소 */}
      <TypingStats accuracy={typingEngine.accuracy} cpm={typingEngine.cpm} />
      <TypingArea typingEngine={typingEngine} />
    </div>
  );
}
