'use client';
import { useEffect, useState } from 'react';

import { TypingStats } from './TypingStats';
import { LanguageSelector } from '@/features/setting/LanguageSelector';
import { TypeSelector } from '@/features/setting/TypeSelector';
import { TypingArea } from './TypingArea';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
import { ResetButton } from '@/features/setting/ResetButton';
export default function Screen() {
  const { selectedText } = useTypingSettingStroe();
  const typingEngine = useTypingEngine(selectedText);
  return (
    <div className="max-w-5xl mx-auto mt-10 p-5 rounded-3xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between gap-2">
        <div>
          <TypingStats
            accuracy={typingEngine.accuracy}
            cpm={typingEngine.cpm}
          />
        </div>

        <div className="flex items-center gap-2">
          <ResetButton resetEngine={typingEngine.resetEngine} />
          <LanguageSelector resetEngine={typingEngine.resetEngine} />
          {/* 타입 선택 */}
          <TypeSelector resetEngine={typingEngine.resetEngine} />
        </div>
      </div>
      {/* 타이핑 피드백/몰입 요소 */}
      <TypingArea typingEngine={typingEngine} />
    </div>
  );
}
