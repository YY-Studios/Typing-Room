import { useTypingSettingStroe } from '@/shared/stores/useTypingSettingStore';
export const TypingArea = () => {
  const { selectedText } = useTypingSettingStroe();
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] px-10">
      {/* 문장 영역 */}
      <div className="text-2xl leading-relaxed tracking-wide text-gray-300 text-center max-w-2xl">
        {selectedText}
      </div>

      {/* 출처 */}
      <div className="mt-6 text-sm text-gray-500 italic">
        💭 살며시 놓아둔 말
      </div>
    </div>
  );
};
