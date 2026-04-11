interface NoDataProps {
  emoji?: string;
  message?: string;
  description?: string;
  className?: string;
}

export const NoData = ({
  emoji = '📭',
  message = '표시할 데이터가 없어요',
  description,
  className = '',
}: NoDataProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-3xl border-[6px] border-dashed border-primary/30 bg-primary-light/30 py-12 text-center ${className}`}
    >
      <span className="text-4xl">{emoji}</span>
      <p className="text-sm font-bold text-text-sub">{message}</p>
      {description && <p className="text-xs text-text-sub">{description}</p>}
    </div>
  );
};

export default NoData;
