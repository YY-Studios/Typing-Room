'use client';

import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
import { EmotionType } from '../screen/type/type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface TypeSelectorProps {
  resetEngine: () => void;
}

// 💡 각 감정별 이모지와 라벨 매핑 (디자인 가이드 반영)
const EMOTION_MAP: Record<EmotionType, { emoji: string; label: string }> = {
  fun: { emoji: '☺️', label: '즐거운' },
  empathy: { emoji: '😟', label: '공감하는' },
  neutral: { emoji: '🫠', label: '차분한' },
};

export const TypeSelector = ({ resetEngine }: TypeSelectorProps) => {
  // 💡 유저 정보 기반 스토어 사용 (오타 반영: useTypingSettingStroe)
  const { emotion, setEmotion } = useTypingSettingStroe();

  const handleEmotion = (type: EmotionType) => {
    setEmotion(type);
    resetEngine(); // 감정 변경 시 타이핑 엔진 초기화
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center justify-between gap-3 px-3 h-10',
          'bg-[#80DEFF] text-black font-black rounded-full',
          'border-[2px]',
        )}
      >
        <span className="text-lg">{EMOTION_MAP[emotion].emoji}</span>
        <ChevronDown size={18} strokeWidth={3} className="ml-1" />
      </DropdownMenuTrigger>

      {/* 💡 드롭다운 컨텐츠: 만화책 패널 스타일 */}
      <DropdownMenuContent
        align="start"
        sideOffset={12}
        className={cn('w-48 p-2 bg-white border border-black rounded-3xl')}
      >
        <DropdownMenuGroup>
          {/* 💡 헤더 라벨: 더 작고 대담하게 */}
          <DropdownMenuLabel className="text-[11px] font-black text-black/30 uppercase tracking-[0.15em] px-3 py-2">
            Mood Switch
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-black/10 h-[2px] mb-2 mx-1" />

          {/* 💡 감정 리스트: 이모지와 글자를 함께 배치 */}
          {(Object.keys(EMOTION_MAP) as EmotionType[]).map((type) => (
            <DropdownMenuItem
              key={type}
              onClick={() => handleEmotion(type)}
              className={cn(
                'flex items-center justify-between px-3 py-2.5 rounded-2xl cursor-pointer mb-1 last:mb-0 outline-none transition-all',
                'border-[2px] border-transparent',
                'focus:bg-[#80DEFF] focus:border-black focus:text-black',
                'data-[highlighted]:bg-[#80DEFF] data-[highlighted]:border-black data-[highlighted]:text-black',
                emotion === type && 'bg-[#80DEFF]/15',
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{EMOTION_MAP[type].emoji}</span>
                <span className="text-sm font-black tracking-tight">
                  {EMOTION_MAP[type].label}
                </span>
              </div>

              {/* 선택된 항목 표시: 펄스 애니메이션이 들어간 검정 점 */}
              {emotion === type && (
                <div className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
