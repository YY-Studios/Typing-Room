import { BaseKeyboard } from '@/features/keyboard/ui/BaseKeyboard';
export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden relative">
      {/* 배경 - 헤더 뒤까지 풀스크린 */}

      {/* 타이핑 영역 */}
      <div className="absolute top-0 left-0 right-0 h-[55%] z-10 flex items-center justify-center">
        화면
      </div>

      {/* 키보드 - 하단 고정 */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] z-10">
        <BaseKeyboard />
      </div>
    </main>
  );
}
