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
      <header className="fixed top-0 w-full h-[72px] px-8 flex items-center justify-between border-b border-black/5 dark:border-white/10 z-50">
        <Logo />
        <NavBar />

        <div className="flex items-center gap-5 text-nav">
          <button onClick={() => setIsSettingsOpen(true)}>
            <Settings />
          </button>
          <button>
            <CircleUser />
          </button>
        </div>
      </header>

      {isSettingsOpen && (
        <PreferencesDrawer onClose={() => setIsSettingsOpen(false)} />
      )}
    </>
  );
};
