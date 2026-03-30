'use client';

interface TypingStatsProps {
  accuracy: number;
  cpm: number;
}
export const TypingStats = ({ accuracy, cpm }: TypingStatsProps) => {
  return (
    <div className="flex justify-center gap-3">
      {/* 정확도 실시간 컴포넌트 */}
      <div className="text-center">
        <div className="text-xs font-bold text-[#A00042]">정확도</div>
        <div className="min-w-[92px] text-2xl font-bold border-2 rounded-lg py-0.5 px-3 bg-[#FF8FA6]">
          {accuracy}%
        </div>
      </div>
      {/* 속도 실시간 컴포넌트 */}
      <div className="text-center">
        <div className="text-xs font-bold text-[#41006C]">속도</div>
        <div className="min-w-[75px] text-2xl font-bold border-2 rounded-lg py-0.5 px-3 bg-[#BB80FF]">
          {cpm}
        </div>
      </div>
    </div>
  );
};
