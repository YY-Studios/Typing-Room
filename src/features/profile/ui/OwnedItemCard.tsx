'use client';

import { Trash2 } from 'lucide-react';

interface OwnedItemCardProps {
  name: string;
  description: string;
  cardColor: string;
  isActive: boolean;
  isDefault: boolean;
  onDelete: () => void;
}

export const OwnedItemCard = ({
  name,
  description,
  cardColor,
  isActive,
  isDefault,
  onDelete,
}: OwnedItemCardProps) => {
  return (
    <div
      className={`
        group relative flex flex-col gap-3 rounded-3xl border-[6px] border-white p-4
        transition-all duration-200 hover:scale-105
        ${cardColor}
        sticker-shadow
      `}
    >
      {/* 광택 오버레이 */}
      <div className="plastic-shine pointer-events-none absolute inset-0 rounded-3xl" />

      {/* ACTIVE 배지 */}
      {isActive && (
        <span className="absolute -left-2 -top-3 rounded-full border-2 border-white bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sticker-shadow">
          ACTIVE
        </span>
      )}

      {/* 삭제 버튼 (기본 아이템 제외) */}
      {!isDefault && (
        <button
          onClick={onDelete}
          aria-label={`${name} 삭제`}
          className="absolute -right-2 -top-3 flex size-7 items-center justify-center rounded-full border-2 border-white bg-red-500 text-white sticker-shadow transition-transform hover:scale-110 active:scale-95"
        >
          <Trash2 size={13} />
        </button>
      )}

      {/* 미리보기 */}
      <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-white/30 backdrop-blur-sm">
        <div className="size-12 rounded-full bg-white/60 shadow-inner" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent" />
      </div>

      {/* 텍스트 */}
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-black uppercase leading-tight tracking-tight text-white drop-shadow-sm bubble-text-shadow">
          {name}
        </p>
        <p className="text-[11px] font-medium text-white/70">{description}</p>
      </div>

      {/* 기본 아이템 표시 */}
      {isDefault && (
        <span className="w-fit rounded-full border border-white/40 bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80">
          기본 제공
        </span>
      )}
    </div>
  );
};
