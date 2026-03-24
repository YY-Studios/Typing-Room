import { Logo } from '@/shared/ui/logo/Logo';
import { NavBar } from './NavBar';
import { Settings, CircleUser } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 w-full h-[72px] px-8 flex items-center justify-between bg-background/50 border-b border-black/5 dark:border-white/10 z-50 transition-colors">
      <Logo />
      <NavBar />

      <div className="flex items-center gap-5 text-nav">
        <button>
          <Settings />
        </button>
        <button>
          <CircleUser />
        </button>
      </div>
    </header>
  );
};
