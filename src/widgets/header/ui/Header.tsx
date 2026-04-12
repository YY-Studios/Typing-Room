'use client';

import { useState } from 'react';
import { Logo } from '@/shared/ui/logo/Logo';
import { NavBar } from './NavBar';
import { Settings, CircleUser } from 'lucide-react';
import { PreferencesDrawer } from '@/features/preferences/ui/PreferencesDrawer';

export const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 flex h-[64px] w-full items-center border-b-[3px] border-white bg-[#fbf9f5] px-6 shadow-[0_4px_0_0_rgba(0,0,0,0.05)]">
        <div className="flex w-40 shrink-0">
          <Logo />
        </div>
        <NavBar />

        <div className="flex w-40 shrink-0 items-center justify-end gap-2">
          {/* TODO: [스토어/API 연결] 프로필 페이지 이동 */}
          <button className="sticker-shadow flex size-8 items-center justify-center rounded-full border-2 border-white bg-blue-400 text-white transition-transform hover:scale-110 active:scale-95">
            <CircleUser size={14} />
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="sticker-shadow flex size-8 items-center justify-center rounded-full border-2 border-white bg-fuchsia-500 text-white transition-transform hover:scale-110 active:scale-95"
          >
            <Settings size={14} />
          </button>
        </div>
      </header>

      {isSettingsOpen && (
        <PreferencesDrawer onClose={() => setIsSettingsOpen(false)} />
      )}
    </>
  );
};
