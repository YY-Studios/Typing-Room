'use client';

import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
import { EmotionType } from '../screen/type/type';
interface TypeSelectorProps {
  resetEngine: () => void;
}

export const TypeSelector = ({ resetEngine }: TypeSelectorProps) => {
  const { emotion, setEmotion } = useTypingSettingStroe();
  const handleEmotion = (emotion: EmotionType) => {
    setEmotion(emotion);
    resetEngine();
  };
  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleEmotion('fun')}
        className={`flex-1 py-3 rounded-lg border border-gray-200 cursor-pointer text-lg ${emotion === 'fun' ? 'bg-gray-100 ' : 'bg-transparent'}`}
      >
        ☺️
      </button>
      <button
        onClick={() => handleEmotion('empathy')}
        className={`flex-1 py-3 rounded-lg border border-gray-200 cursor-pointer text-lg ${emotion === 'empathy' ? 'bg-gray-100 ' : 'bg-transparent'}`}
      >
        😟
      </button>
      <button
        onClick={() => handleEmotion('neutral')}
        className={`flex-1 py-3 rounded-lg border border-gray-200 cursor-pointer text-lg ${emotion === 'neutral' ? 'bg-gray-100 ' : 'bg-transparent'}`}
      >
        🫠
      </button>
    </div>
  );
};
