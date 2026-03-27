'use client';

import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
import { LangType } from '../screen/type/type';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  resetEngine: () => void;
}
export const LanguageSelector = ({ resetEngine }: LanguageSelectorProps) => {
  const { language, setLanguage } = useTypingSettingStroe();

  const hadleLanguage = (lang: LangType) => {
    setLanguage(lang);
    resetEngine();
  };
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => hadleLanguage(language === 'ko' ? 'en' : 'ko')}
        className="flex items-center gap-1 border-2 rounded-full h-10 px-[12px] text-sm font-bold"
      >
        <Globe size={16} />
        {language === 'ko' ? 'KR' : 'EN'}
      </button>
    </div>
  );
};
