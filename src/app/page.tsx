import { BaseKeyboard } from '@/features/keyboard/ui/BaseKeyboard';
import Screen from '@/features/screen/ui/Screen';

export default function Home() {
  return (
    <main className="w-full h-screen pt-[72px]">
      <Screen />

      <div className="absolute bottom-0 left-0 right-0 h-[50%] z-10">
        <BaseKeyboard />
      </div>
    </main>
  );
}
