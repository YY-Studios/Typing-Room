'use client';

import { Lock } from 'lucide-react';

interface ItemCardProps {
  id: string;
  name: string;
  description: string;
  cardColor: string;
  tag?: string;
  isUnlocked: boolean;
  isActive: boolean;
  onUnlock: () => void;
  onApply: () => void;
}

export const ItemCard = ({
  name,
  description,
  cardColor,
  tag,
  isUnlocked,
  isActive,
  onUnlock,
  onApply,
}: ItemCardProps) => {
  return (
    <div
      className={`
        group relative flex flex-col gap-4 rounded-3xl border-[6px] border-white p-5
        transition-all duration-200 hover:scale-105 hover:rotate-1
        ${cardColor}
        sticker-shadow
      `}
    >
      {/* 광택 오버레이 */}
      <div className="plastic-shine pointer-events-none absolute inset-0 rounded-3xl" />

      {/* 태그 */}
      {tag && (
        <span className="absolute -right-2 -top-3 rounded-full border-2 border-white bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sticker-shadow">
          {tag}
        </span>
      )}

      {/* 미리보기 영역 */}
      <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-white/30 backdrop-blur-sm">
        {isUnlocked ? (
          <div className="size-16 rounded-full bg-white/60 shadow-inner" />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-60">
            <Lock size={32} className="text-white drop-shadow" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Locked
            </span>
          </div>
        )}
        {/* 광택 */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent" />
      </div>

      {/* 텍스트 */}
      <div className="flex flex-col gap-1">
        <p className="text-lg font-black uppercase leading-tight tracking-tight text-white drop-shadow-sm bubble-text-shadow">
          {name}
        </p>
        <p className="text-xs font-medium text-white/70">{description}</p>
      </div>

      {/* CTA 버튼 */}
      {isUnlocked ? (
        <button
          disabled
          className="w-full rounded-full border-2 border-white/50 bg-white/20 py-2.5 text-xs font-black uppercase tracking-wider text-white"
        >
          ✓ 보유 중
        </button>
      ) : (
        <button
          onClick={onUnlock}
          className="w-full rounded-full border-2 border-white bg-black/30 py-2.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
        >
          📺 광고 보고 잠금해제
        </button>
      )}
    </div>
  );
};
