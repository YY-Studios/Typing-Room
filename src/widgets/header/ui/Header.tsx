'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/shared/ui/logo/Logo';
import { NavBar } from './NavBar';
import { Settings, CircleUser, UserRoundPlus, LogOut } from 'lucide-react';
import { PreferencesDrawer } from '@/features/preferences/ui/PreferencesDrawer';
import { useAuth } from '@/features/auth/ui/useAuth';
import { LoginModal } from '@/features/auth/ui/LoginModal';

export const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isLoggedIn, isLoading, logout } = useAuth();

  return (
    <>
      <header className="fixed top-0 z-50 flex h-[64px] w-full items-center border-b-[3px] border-white bg-[#fbf9f5] px-6 shadow-[0_4px_0_0_rgba(0,0,0,0.05)]">
        <div className="flex w-40 shrink-0">
          <Logo />
        </div>
        <NavBar />

        <div className="flex w-40 shrink-0 items-center justify-end gap-2">
          {!isLoading &&
            (isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="sticker-shadow flex size-8 items-center justify-center rounded-full border-2 border-white bg-blue-400 text-white transition-transform hover:scale-110 active:scale-95"
                >
                  <CircleUser size={14} />
                </Link>
                <button
                  onClick={logout}
                  className="sticker-shadow flex size-8 items-center justify-center rounded-full border-2 border-white bg-red-400 text-white transition-transform hover:scale-110 active:scale-95"
                >
                  <LogOut size={14} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="sticker-shadow flex size-8 items-center justify-center rounded-full border-2 border-white bg-blue-400 text-white transition-transform hover:scale-110 active:scale-95"
              >
                <UserRoundPlus size={14} />
              </button>
            ))}
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

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};
