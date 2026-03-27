import { RotateCcw } from 'lucide-react';
interface TypeSelectorProps {
  resetEngine: () => void;
}
export const ResetButton = ({ resetEngine }: TypeSelectorProps) => {
  return (
    <>
      <button
        onClick={() => resetEngine()}
        className="felx items-center justify-center h-10 w-10 bg-primary border-2 rounded-full"
        aria-label="초기화"
      >
        <RotateCcw size={16} strokeWidth={3} className="inline" />
      </button>
    </>
  );
};
