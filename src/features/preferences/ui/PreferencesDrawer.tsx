'use client';

import { X, Volume2, Music } from 'lucide-react';

interface PreferencesDrawerProps {
  onClose: () => void;
}

export const PreferencesDrawer = ({ onClose }: PreferencesDrawerProps) => {
  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* 사이드바 */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-[360px] flex-col bg-[#1c1b1b] shadow-[-20px_0px_50px_0px_rgba(0,0,0,0.6)]">
        {/* 헤더 */}
        <div className="flex flex-col gap-6 px-8 pb-12 pt-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h2
                className="text-[30px] leading-9 text-nav"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Settings
              </h2>
              <p className="text-sm font-medium text-[rgba(229,226,225,0.5)]">
                Customize your sanctuary
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[rgba(229,226,225,0.4)] transition-colors hover:text-[rgba(229,226,225,0.8)]"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* 설정 영역 */}
        <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-8 pb-20">
          {/* Sound 섹션 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Volume2 size={12} className="text-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.7px] text-primary">
                Sound
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {/* Master Volume */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-xs text-[rgba(229,226,225,0.6)]">
                    Master Volume
                  </span>
                  <span className="text-xs text-[rgba(229,226,225,0.6)]">
                    80%
                  </span>
                </div>
                <div className="relative flex h-6 items-center">
                  <div className="relative h-2 w-full rounded-full bg-[#0e0e0e] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05),inset_-4px_-4px_8px_rgba(0,0,0,0.3)]">
                    <div className="absolute left-0 top-0 h-full w-[80%] rounded-full bg-primary/30" />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 size-[18px] rounded-full bg-primary shadow-[0px_4px_10px_rgba(0,0,0,0.5)]"
                      style={{ left: 'calc(80% - 9px)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Typewriter Sounds 토글 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music size={12} className="text-[rgba(229,226,225,0.6)]" />
                  <span className="text-sm text-[#e5e2e1]">
                    Typewriter Sounds
                  </span>
                </div>
                <div className="flex h-6 w-12 items-center justify-end rounded-full bg-primary px-1 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
                  <div className="size-4 rounded-full bg-[#131313]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex flex-col gap-6 bg-[rgba(14,14,14,0.8)] p-8 backdrop-blur-sm">
          <button className="w-full rounded-full bg-primary py-4 text-xs font-bold uppercase tracking-[1.2px] text-[#131313] shadow-[0px_6px_0px_0px_#9c7500] transition-transform active:translate-y-1 active:shadow-none">
            Save Preferences
          </button>
          <div className="flex items-center justify-between px-4">
            <button className="text-[10px] uppercase tracking-[-0.5px] text-[rgba(229,226,225,0.4)] transition-colors hover:text-[rgba(229,226,225,0.6)]">
              Support
            </button>
            <button className="text-[10px] uppercase tracking-[-0.5px] text-[rgba(229,226,225,0.4)] transition-colors hover:text-[rgba(229,226,225,0.6)]">
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
