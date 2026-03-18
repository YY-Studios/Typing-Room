'use client';

import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';

export const TypeSelector = () => {
  const { emotion, setEmotion } = useTypingSettingStroe();
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setEmotion('fun')}
        className={`flex-1 py-3 rounded-lg border border-gray-200 cursor-pointer text-lg ${emotion === 'fun' ? 'bg-gray-100 ' : 'bg-transparent'}`}
      >
        ☺️
      </button>
      <button
        onClick={() => setEmotion('empathy')}
        className={`flex-1 py-3 rounded-lg border border-gray-200 cursor-pointer text-lg ${emotion === 'empathy' ? 'bg-gray-100 ' : 'bg-transparent'}`}
      >
        😟
      </button>
      <button
        onClick={() => setEmotion('neutral')}
        className={`flex-1 py-3 rounded-lg border border-gray-200 cursor-pointer text-lg ${emotion === 'neutral' ? 'bg-gray-100 ' : 'bg-transparent'}`}
      >
        🫠
      </button>
    </div>
  );
};
