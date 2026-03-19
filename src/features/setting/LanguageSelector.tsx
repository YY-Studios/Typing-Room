'use client';

import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
import { LangType } from '../screen/type/type';

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
      <span className="text-sm text-gray-400 min-w-[60px]">언어선택</span>
      <div className="flex gap-2">
        <button
          onClick={() => hadleLanguage('ko')}
          className={`px-5 py-2 rounded-lg border border-gray-200 cursor-pointer bg-gray-100 ${language === 'ko' ? 'bg-gray-100' : 'bg-transparent'}`}
        >
          한국어
        </button>
        <button
          onClick={() => hadleLanguage('en')}
          className={`px-5 py-2 rounded-lg border border-gray-200 cursor-pointer bg-gray-100 ${language === 'en' ? 'bg-gray-100' : 'bg-transparent'}`}
        >
          영어
        </button>
      </div>
    </div>
  );
};
