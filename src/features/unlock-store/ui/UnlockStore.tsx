'use client';

import type { ThemeItem } from '../model/types';
import { ItemCard } from './ItemCard';
import { useUnlockStore } from '@/shared/stores/useUnlockStore';

// TODO: [API 연결] themes 테이블에서 가져오기
const MOCK_THEMES: ThemeItem[] = [
  {
    id: 'honey',
    slug: 'honey',
    name: '허니',
    description: '부드러운 기본 타건음',
    cardColor: 'bg-amber-400',
    isDefault: true,
  },
  {
    id: 'duzzoncu',
    slug: 'duzzoncu',
    name: '두쫀쿠',
    description: '클리키한 묵직한 타건음',
    cardColor: 'bg-cyan-500',
    isDefault: false,
    tag: 'NEW',
  },
  {
    id: 'pudding',
    slug: 'pudding',
    name: '푸딩',
    description: '달콤한 푸딩 타건음',
    cardColor: 'bg-orange-400',
    isDefault: false,
  },
  {
    id: 'ice',
    slug: 'ice',
    name: '아이스',
    description: '시원한 얼음 타건음',
    cardColor: 'bg-sky-400',
    isDefault: false,
  },
];

export const UnlockStore = () => {
  const { points, unlockedIds, activeThemeId, unlock, applyTheme } =
    useUnlockStore();

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
            Themes
          </p>
        </div>

        {/* 그리드 */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {MOCK_THEMES.map((theme) => (
            <ItemCard
              key={theme.id}
              id={theme.id}
              name={theme.name}
              description={theme.description}
              cardColor={theme.cardColor}
              tag={theme.tag}
              isUnlocked={unlockedIds.has(theme.id)}
              isActive={activeThemeId === theme.id}
              onUnlock={() => unlock(theme.id)}
              onApply={() => applyTheme(theme.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
