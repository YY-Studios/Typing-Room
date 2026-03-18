export const TypingStats = () => {
  return (
    <div className="flex justify-center gap-10">
      {/* 정확도 실시간 컴포넌트 */}
      <div className="text-center">
        <div className="text-3xl font-semibold">75%</div>
        <div className="text-xs text-gray-400">정확도</div>
      </div>
      {/* 속도 실시간 컴포넌트 */}
      <div className="text-center">
        <div className="text-3xl font-semibold">100</div>
        <div className="text-xs text-gray-400">WPM</div>
      </div>
    </div>
  );
};
