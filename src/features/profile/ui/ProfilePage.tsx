'use client';

import { useState } from 'react';
import { User, Lock, LogOut, ChevronRight } from 'lucide-react';
import { modal } from '@/shared/ui/modal';
import { OwnedItemCard } from './OwnedItemCard';

// ─── Mock 데이터 ───────────────────────────────────────────────────
// TODO: useUnlockStore 연결 (unlockedIds, activeKeyboardId, activeSoundId)
const MOCK_USER = { name: '핑핑이' };

const MOCK_KEYBOARD_SKINS = [
  {
    id: 'default',
    name: 'Honey Pink',
    description: '기본 제공 스킨',
    cardColor: 'bg-pink-400',
    isDefault: true,
  },
  {
    id: 'candy-pop',
    name: 'Candy Pop',
    description: '달콤한 핑크 팝',
    cardColor: 'bg-fuchsia-500',
    isDefault: false,
  },
];

const MOCK_SOUND_ITEMS = [
  {
    id: 'honey',
    name: '꿀 소리',
    description: '부드러운 기본 타건음',
    cardColor: 'bg-amber-400',
    isDefault: true,
  },
  {
    id: 'duzzoncu',
    name: '두쫀쿠',
    description: '클리키한 묵직한 타건음',
    cardColor: 'bg-cyan-500',
    isDefault: false,
  },
];

const MOCK_ACTIVE_KEYBOARD = 'default';
const MOCK_ACTIVE_SOUND = 'honey';
// ──────────────────────────────────────────────────────────────────

export const ProfilePage = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(MOCK_USER.name);

  // TODO: useUnlockStore의 removeUnlock 연결
  const handleDelete = async (name: string, id: string) => {
    const confirmed = await modal.danger(
      `${name}을(를) 보유 목록에서 제거합니다.`,
      {
        title: '정말 삭제할까요?',
        emoji: '🗑️',
        description: '스토어에서 다시 잠금 해제할 수 있어요.',
        confirmText: '삭제',
        cancelText: '취소',
      },
    );
    if (confirmed) console.warn('delete', id); // TODO: removeUnlock 연결
  };

  // TODO: BFF /api/auth/profile PATCH 연결 (이름 변경)
  const handleNameSave = () => {
    console.warn('save name', nameValue);
    setIsEditingName(false);
  };

  // TODO: BFF /api/auth/password PATCH 연결
  const handlePasswordChange = async () => {
    await modal.alert('비밀번호 변경 기능은 준비 중이에요!', {
      emoji: '🔒',
      title: '준비 중',
    });
  };

  // TODO: BFF /api/auth/withdraw DELETE 연결
  const handleWithdraw = async () => {
    const confirmed = await modal.danger(
      '계정을 탈퇴하면 모든 데이터가 사라져요.',
      {
        title: '정말 탈퇴할까요?',
        emoji: '😢',
        description: '보유한 스킨과 사운드가 모두 삭제됩니다.',
        confirmText: '탈퇴',
        cancelText: '취소',
      },
    );
    if (confirmed) console.warn('withdraw'); // TODO: 탈퇴 API 연결
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-amber-50/60 to-background pt-[72px] dark:from-indigo-950/60 dark:via-slate-900/80 dark:to-background">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* 페이지 타이틀 */}
        <div className="mb-8 text-center">
          <h1
            className="text-4xl font-black uppercase tracking-tight text-text-main bubble-text-shadow sm:text-5xl"
            style={{ WebkitTextStroke: '1.5px rgba(0,0,0,0.1)' }}
          >
            🪪 MY PROFILE
          </h1>
          <p className="mt-1.5 text-sm font-bold uppercase tracking-widest text-text-sub">
            내 계정 &amp; 보유 아이템
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* ── 섹션 1: 내 정보 ───────────────────────────────── */}
          <section aria-labelledby="section-info">
            <h2
              id="section-info"
              className="mb-3 flex items-center gap-2 text-base font-black uppercase tracking-wider text-text-main"
            >
              <User size={18} className="text-primary" aria-hidden="true" />내
              정보
            </h2>

            <div className="relative rounded-3xl border-[6px] border-white bg-white/80 p-5 sticker-shadow dark:border-white/20 dark:bg-surface/80">
              <div className="plastic-shine pointer-events-none absolute inset-0 rounded-3xl" />

              <div className="flex flex-col divide-y divide-gray-100 dark:divide-white/10">
                {/* 이름 행 */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-bold text-text-sub">이름</span>
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                        aria-label="이름 입력"
                        className="rounded-xl border-2 border-primary bg-primary-light px-3 py-1.5 text-sm font-bold text-text-main outline-none focus:ring-2 focus:ring-primary/50"
                        autoFocus
                      />
                      <button
                        onClick={handleNameSave}
                        className="rounded-full border-2 border-primary bg-primary px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white transition-transform hover:scale-105 active:scale-95"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingName(false);
                          setNameValue(MOCK_USER.name);
                        }}
                        className="rounded-full border-2 border-gray-200 bg-gray-100 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-gray-500 transition-transform hover:scale-105 active:scale-95 dark:border-white/20 dark:bg-white/10 dark:text-white/60"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="flex items-center gap-1.5 rounded-full border-2 border-primary/30 bg-primary-light px-3 py-1.5 text-sm font-bold text-nav transition-transform hover:scale-105 active:scale-95"
                    >
                      {nameValue}
                      <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  )}
                </div>

                {/* 비밀번호 행 */}
                <div className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-text-sub">
                    <Lock size={14} aria-hidden="true" />
                    비밀번호
                  </span>
                  <button
                    onClick={handlePasswordChange}
                    className="flex items-center gap-1 rounded-full border-2 border-gray-200 bg-gray-100 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-gray-600 transition-transform hover:scale-105 active:scale-95 dark:border-white/20 dark:bg-white/10 dark:text-white/70"
                  >
                    변경하기
                    <ChevronRight size={12} aria-hidden="true" />
                  </button>
                </div>

                {/* 회원탈퇴 행 */}
                <div className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-text-sub">
                    <LogOut size={14} aria-hidden="true" />
                    계정
                  </span>
                  <button
                    onClick={handleWithdraw}
                    className="rounded-full border-2 border-red-200 bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-red-500 transition-transform hover:scale-105 active:scale-95 dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-400"
                  >
                    회원탈퇴
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── 섹션 2: 내 키보드 스킨 ───────────────────────── */}
          <section aria-labelledby="section-keyboard">
            <h2
              id="section-keyboard"
              className="mb-3 flex items-center gap-2 text-base font-black uppercase tracking-wider text-text-main"
            >
              🎹 내 키보드 스킨
              <span className="rounded-full border-2 border-primary/40 bg-primary-light px-2 py-0.5 text-xs font-bold text-nav">
                {MOCK_KEYBOARD_SKINS.length}개
              </span>
            </h2>

            {MOCK_KEYBOARD_SKINS.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border-[6px] border-dashed border-primary/30 bg-primary-light/30 py-10 text-center">
                <span className="text-4xl">🔒</span>
                <p className="text-sm font-bold text-text-sub">
                  보유한 스킨이 없어요
                </p>
                <p className="text-xs text-text-sub">
                  스토어에서 잠금 해제해 보세요!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {MOCK_KEYBOARD_SKINS.map((skin) => (
                  <OwnedItemCard
                    key={skin.id}
                    name={skin.name}
                    description={skin.description}
                    cardColor={skin.cardColor}
                    isActive={MOCK_ACTIVE_KEYBOARD === skin.id}
                    isDefault={skin.isDefault}
                    onDelete={() => handleDelete(skin.name, skin.id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── 섹션 3: 내 사운드 ────────────────────────────── */}
          <section aria-labelledby="section-sound">
            <h2
              id="section-sound"
              className="mb-3 flex items-center gap-2 text-base font-black uppercase tracking-wider text-text-main"
            >
              🔊 내 사운드
              <span className="rounded-full border-2 border-primary/40 bg-primary-light px-2 py-0.5 text-xs font-bold text-nav">
                {MOCK_SOUND_ITEMS.length}개
              </span>
            </h2>

            {MOCK_SOUND_ITEMS.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border-[6px] border-dashed border-primary/30 bg-primary-light/30 py-10 text-center">
                <span className="text-4xl">🔇</span>
                <p className="text-sm font-bold text-text-sub">
                  보유한 사운드가 없어요
                </p>
                <p className="text-xs text-text-sub">
                  스토어에서 잠금 해제해 보세요!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {MOCK_SOUND_ITEMS.map((sound) => (
                  <OwnedItemCard
                    key={sound.id}
                    name={sound.name}
                    description={sound.description}
                    cardColor={sound.cardColor}
                    isActive={MOCK_ACTIVE_SOUND === sound.id}
                    isDefault={sound.isDefault}
                    onDelete={() => handleDelete(sound.name, sound.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
