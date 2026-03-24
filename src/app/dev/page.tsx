import { BaseKeyboard } from '@/features/keyboard/ui/BaseKeyboard';
export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      {/* 상단 */}
      <div className="h-[50vh] relative z-20 bg-gray-800">화면</div>
      {/* 하단 */}
      <div className="h-[50vh] relative z-0 overflow-hidden">
        <BaseKeyboard />
      </div>
    </main>
  );
}
