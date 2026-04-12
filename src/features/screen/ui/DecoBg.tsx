'use client';

import { useUnlockStore } from '@/shared/stores/useUnlockStore';

interface DecoImage {
  src: string;
  className: string;
}

const DECO_MAP: Record<string, DecoImage[]> = {
  honey: [
    {
      src: '/deco/honey/bee.png',
      className:
        'left-[-5%] top-[-2%] w-[40px] lg:w-[600px] xl:w-[700px] -rotate-12 opacity-40',
    },
    {
      src: '/deco/honey/bear.png',
      className:
        'right-[-8%] bottom-[-10%] w-[500px] lg:w-[700px] xl:w-[800px] opacity-40',
    },
  ],
};

export const DecoBg = () => {
  const activeThemeId = useUnlockStore((s) => s.activeThemeId);
  const decos = DECO_MAP[activeThemeId];

  if (!decos) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden lg:block">
      {decos.map((deco) => (
        <img
          key={deco.src}
          src={deco.src}
          alt=""
          loading="lazy"
          className={`absolute ${deco.className}`}
        />
      ))}
    </div>
  );
};
