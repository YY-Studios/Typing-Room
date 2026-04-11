'use client';

interface VolumeSliderProps {
  value: number; // 0~100
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const VolumeSlider = ({
  value,
  onChange,
  disabled = false,
}: VolumeSliderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-xs font-bold text-gray-500">Master Volume</span>
        <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-white">
          {value}%
        </span>
      </div>
      <div className="relative flex h-7 items-center">
        <div className="sticker-shadow relative h-3 w-full overflow-hidden rounded-full border-2 border-white bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300"
            style={{ width: `${value}%` }}
          />
        </div>
        {/* 핸들 — 클릭 이벤트를 위해 input[range] 오버레이 */}
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:pointer-events-none"
        />
        <div
          className="sticker-shadow pointer-events-none absolute top-1/2 size-6 -translate-y-1/2 rounded-full border-4 border-white bg-amber-400"
          style={{ left: `calc(${value}% - 12px)` }}
        />
      </div>
    </div>
  );
};
