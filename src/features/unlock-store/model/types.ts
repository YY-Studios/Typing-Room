// keyboards 테이블 row에 대응
export interface KeyboardSkin {
  id: string;
  name: string;
  description: string;
  cardColor: string; // Tailwind bg 클래스
  isDefault: boolean;
  tag?: string; // 'NEW' | 'HOT' | 'LIMITED'
}

// keyboard_sounds 테이블 row에 대응
export interface SoundItem {
  id: string;
  name: string;
  description: string;
  presetKey: string; // soundPresets.ts key와 매핑
  cardColor: string;
  isDefault: boolean;
  tag?: string;
}

// user_unlocks 테이블 row에 대응 (Supabase 연동 시 사용)
export interface UserUnlock {
  user_id: string;
  item_id: string;
  item_type: 'keyboard' | 'sound';
  unlocked_at: string;
}

export type StoreTab = 'keyboard' | 'sound';
