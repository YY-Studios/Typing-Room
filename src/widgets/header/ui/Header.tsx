import { Logo } from '@/shared/ui/logo/Logo';
import { NavBar } from './NavBar';

export const Header = () => {
  return (
    <header className="fixed top-0 w-full h-[72px] px-8 flex items-center justify-between bg-background border-b border-black/5 dark:border-white/10 z-50 transition-colors">
      <div className="flex items-center">
        <Logo />
        <NavBar />
      </div>

      <div className="flex items-center gap-5 text-primary-light dark:text-primary">
        <button className="hover:opacity-70 transition-opacity">
          {/* <Settings size={22} strokeWidth={1.5} /> */}
          설정
        </button>
        <button className="hover:opacity-70 transition-opacity">아바타</button>
      </div>
    </header>
  );
};
