import { create } from 'zustand';

interface UnlockStoreState {
  points: number;
  unlockedIds: Set<string>;
  activeKeyboardId: string;
  activeSoundId: string;

  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean; // 포인트 부족 시 false
  unlock: (id: string) => void;
  applyKeyboard: (id: string) => void;
  applySound: (id: string) => void;
}

export const useUnlockStore = create<UnlockStoreState>((set, get) => ({
  points: 120, // 초기 포인트 (테스트용)
  unlockedIds: new Set(['default', 'honey']),
  activeKeyboardId: 'default',
  activeSoundId: 'honey',

  addPoints: (amount) => set((state) => ({ points: state.points + amount })),

  spendPoints: (amount) => {
    if (get().points < amount) return false;
    set((state) => ({ points: state.points - amount }));
    return true;
  },

  unlock: (id) =>
    set((state) => ({
      unlockedIds: new Set([...state.unlockedIds, id]),
    })),

  applyKeyboard: (id) => set({ activeKeyboardId: id }),
  applySound: (id) => set({ activeSoundId: id }),
}));
