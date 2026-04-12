// themes 테이블 row에 대응
export interface ThemeItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  cardColor: string; // Tailwind bg 클래스
  isDefault: boolean;
  tag?: string; // 'NEW' | 'HOT' | 'LIMITED'
}

// user_unlocks 테이블 row에 대응 (Supabase 연동 시 사용)
export interface UserUnlock {
  user_id: string;
  item_id: string;
  item_type: 'theme' | 'mood';
  unlocked_at: string;
}
