'use client';
import { useEffect, useState } from 'react';

import { TypingStats } from './TypingStats';
import { LanguageSelector } from '@/features/setting/LanguageSelector';
import { TypeSelector } from '@/features/setting/TypeSelector';
import { TypingArea } from './TypingArea';

export default function Screen() {
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
