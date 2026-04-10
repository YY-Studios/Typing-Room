'use client';

import { useState } from 'react';
import type { KeyboardSkin, SoundItem, StoreTab } from '../model/types';
import { ItemCard } from './ItemCard';
import { useUnlockStore } from '@/shared/stores/useUnlockStore';

const KEYBOARD_SKINS: KeyboardSkin[] = [
  {
    id: 'default',
    name: 'Honey Pink',
    description: '기본 제공 스킨',
    cardColor: 'bg-pink-400',
    isDefault: true,
  },
  {
    id: 'candy-pop',
    name: 'Candy Pop',
    description: '달콤한 핑크 팝 스타일',
    cardColor: 'bg-fuchsia-500',
    isDefault: false,
    tag: 'NEW',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: '딥 다크 미드나잇',
    cardColor: 'bg-indigo-700',
    isDefault: false,
  },
  {
    id: 'lemon',
    name: 'Lemon Drop',
    description: '상큼한 레몬 옐로우',
    cardColor: 'bg-yellow-400',
    isDefault: false,
    tag: 'HOT',
  },
];

const SOUND_ITEMS: SoundItem[] = [
  {
    id: 'honey',
    name: '꿀 소리',
    description: '부드러운 기본 타건음',
    presetKey: 'honey',
    cardColor: 'bg-amber-400',
    isDefault: true,
  },
  {
    id: 'duzzoncu',
    name: '두쫀쿠',
    description: '클리키한 묵직한 타건음',
    presetKey: 'duzzoncu',
    cardColor: 'bg-cyan-500',
    isDefault: false,
    tag: 'NEW',
  },
];

export const UnlockStore = () => {
  const [activeTab, setActiveTab] = useState<StoreTab>('keyboard');
  const {
    points,
    unlockedIds,
    activeKeyboardId,
    activeSoundId,
    unlock,
    applyKeyboard,
    applySound,
  } = useUnlockStore();

  return (
    <div className="min-h-screen pt-[72px]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* 타이틀 + 포인트 */}
        <div className="mb-10 text-center">
          <h1
            className="text-6xl font-black uppercase tracking-tight text-white drop-shadow-lg bubble-text-shadow"
            style={{ WebkitTextStroke: '2px rgba(0,0,0,0.15)' }}
          >
            🎹 TYPING-ROOM
          </h1>
          <p className="mt-2 text-xl font-bold uppercase tracking-widest text-white/80">
            Skins & Sounds
          </p>
        </div>

        {/* 탭 */}
        <div className="mb-8 flex justify-center gap-3">
          {(
            [
              { key: 'keyboard', label: '🎹 Keyboard Skins' },
              { key: 'sound', label: '🔊 Sounds' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                rounded-full border-4 border-white px-6 py-2.5 text-sm font-black uppercase tracking-wider
                transition-all duration-150 hover:scale-105 active:scale-95 sticker-shadow
                ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-800'
                    : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 그리드 */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {activeTab === 'keyboard'
            ? KEYBOARD_SKINS.map((skin) => (
                <ItemCard
                  key={skin.id}
                  id={skin.id}
                  name={skin.name}
                  description={skin.description}
                  cardColor={skin.cardColor}
                  tag={skin.tag}
                  isUnlocked={unlockedIds.has(skin.id)}
                  isActive={activeKeyboardId === skin.id}
                  onUnlock={() => unlock(skin.id)}
                  onApply={() => applyKeyboard(skin.id)}
                />
              ))
            : SOUND_ITEMS.map((sound) => (
                <ItemCard
                  key={sound.id}
                  id={sound.id}
                  name={sound.name}
                  description={sound.description}
                  cardColor={sound.cardColor}
                  tag={sound.tag}
                  isUnlocked={unlockedIds.has(sound.id)}
                  isActive={activeSoundId === sound.id}
                  onUnlock={() => unlock(sound.id)}
                  onApply={() => applySound(sound.id)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
