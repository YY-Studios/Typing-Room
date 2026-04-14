'use client';

import { X, Volume2, Music, Zap } from 'lucide-react';
import { Button, Toggle, VolumeSlider } from '@/shared/ui';

// TODO: [스토어/API 연결] useUnlockStore (unlockedIds, activeThemeId, applyTheme)
const MOCK_SKINS = [
  { id: 'default', name: 'Honey Pink', color: 'bg-pink-400' },
  { id: 'honey', name: 'Honey Bee', color: 'bg-amber-400' },
];
const MOCK_ACTIVE_SKIN = 'default';

// TODO: [스토어/API 연결] useTypingSettingStore
const MOCK_VOLUME = 80;
const MOCK_SOUND_ENABLED = true;

interface PreferencesDrawerProps {
  onClose: () => void;
}

export const PreferencesDrawer = ({ onClose }: PreferencesDrawerProps) => {
  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col bg-[#fbf9f5] shadow-[-20px_0px_60px_0px_rgba(0,0,0,0.25)]">
        {/* 헤더 — 핑크 그래디언트 배너 */}
        <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-5">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="bubble-text-shadow text-2xl font-black uppercase tracking-tight text-white">
                ⚙️ Settings
              </h2>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-white/70">
                Customize your vibe
              </p>
            </div>
            <button
              onClick={onClose}
              className="sticker-shadow flex size-8 items-center justify-center rounded-full border-2 border-white bg-white/20 text-white transition-transform hover:scale-110 active:scale-95"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* 설정 섹션들 */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          {/* My Skins 섹션 */}
          <div className="sticker-shadow rounded-3xl border-[4px] border-white bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="sticker-shadow flex size-7 items-center justify-center rounded-full bg-pink-400">
                <span className="text-sm leading-none">🎹</span>
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-800">
                My Skins
              </span>
            </div>

            {/* TODO: [스토어/API 연결] useUnlockStore (unlockedIds, activeThemeId, applyTheme) */}
            <div className="flex gap-3">
              {MOCK_SKINS.map((skin) => {
                const isActive = skin.id === MOCK_ACTIVE_SKIN;
                return (
                  <button
                    key={skin.id}
                    onClick={() => {}}
                    className={`sticker-shadow relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all hover:scale-105 active:scale-95 ${
                      isActive
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    {/* 활성 체크 뱃지 */}
                    {isActive && (
                      <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-white bg-primary text-[9px] font-black text-white">
                        ✓
                      </span>
                    )}
                    <div className={`size-10 rounded-xl ${skin.color}`} />
                    <span className="text-[10px] font-black uppercase tracking-wide text-gray-600">
                      {skin.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sound 섹션 */}
          <div className="sticker-shadow rounded-3xl border-[4px] border-white bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="sticker-shadow flex size-7 items-center justify-center rounded-full bg-amber-400">
                <Volume2 size={12} className="text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-800">
                Sound
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {/* TODO: [스토어/API 연결] 볼륨 값 연결 */}
              <VolumeSlider value={MOCK_VOLUME} onChange={() => {}} />

              {/* Typewriter Sounds 토글 */}
              <div className="flex items-center justify-between rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Music size={14} className="text-fuchsia-500" />
                  <span className="text-sm font-bold text-gray-700">
                    Typewriter Sounds
                  </span>
                </div>
                {/* TODO: [스토어/API 연결] 사운드 on/off 연결 */}
                <Toggle checked={MOCK_SOUND_ENABLED} onChange={() => {}} />
              </div>
            </div>
          </div>

          {/* Quick Actions 섹션 */}
          <div className="sticker-shadow rounded-3xl border-[4px] border-white bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="sticker-shadow flex size-7 items-center justify-center rounded-full bg-blue-500">
                <Zap size={12} className="text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-800">
                Quick Actions
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {/* TODO: [스토어/API 연결] 고객 지원 링크 */}
              <Button variant="subtle" size="sm" className="w-full py-3">
                Support
              </Button>
            </div>
          </div>
        </div>

        {/* 푸터 — Save 버튼 */}
        <div className="p-5 pt-0">
          {/* TODO: [스토어/API 연결] 설정 저장 */}
          <Button variant="primary" size="lg" className="w-full">
            💾 Save Preferences
          </Button>
        </div>
      </aside>
    </>
  );
};
