'use client';

import { useTypingEngine } from '../hooks/useTypingEngine';
import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
interface TypingStatsProps {
  accuracy: number;
  cpm: number;
}
export const TypingStats = ({ accuracy, cpm }: TypingStatsProps) => {
  return (
    <div className="flex justify-center gap-10">
      {/* 정확도 실시간 컴포넌트 */}
      <div className="text-center">
        <div className="text-3xl font-semibold">{accuracy}%</div>
        <div className="text-xs text-gray-400">정확도</div>
      </div>
      {/* 속도 실시간 컴포넌트 */}
      <div className="text-center">
        <div className="text-3xl font-semibold">{cpm}</div>
        <div className="text-xs text-gray-400">CPM</div>
      </div>
    </div>
  );
};
