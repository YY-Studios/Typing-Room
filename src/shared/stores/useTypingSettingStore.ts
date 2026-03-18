import { create } from 'zustand';
import { EmotionType, LangType } from '@/features/screen/type/type';
import { getRandomText } from '../lib/getRandomText';
interface SettingState {
  emotion: EmotionType;
  language: LangType;
  selectedText: string;

  setEmotion: (emt: EmotionType) => void;
  setLanguage: (lag: LangType) => void;
  setSelectedText: (txt: string) => void;
}

export const useTypingSettingStroe = create<SettingState>((set, get) => ({
  emotion: 'fun',
  language: 'ko',
  selectedText: getRandomText({ emotion: 'fun', language: 'ko' }) ?? '',
  setEmotion: (emt) => {
    const nextLang = get().language;
    set({
      emotion: emt,
      selectedText: getRandomText({ emotion: emt, language: nextLang }),
    });
  },
  setLanguage: (lag) => {
    const nextEmt = get().emotion;
    set({
      language: lag,
      selectedText: getRandomText({ emotion: nextEmt, language: lag }),
    });
  },
  setSelectedText: (txt) => set({ selectedText: txt }),
}));
