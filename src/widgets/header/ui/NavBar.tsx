'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const MENU = [
  { name: 'Practice', href: '/' },
  { name: 'History', href: '/history' },
  { name: 'Stats', href: '/stats' },
];

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8 ml-10">
      {MENU.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              'relative pb-1 text-[15px] font-medium transition-colors',
              isActive
                ? 'text-primary-light dark:text-primary'
                : 'text-text-sub hover:text-text-main',
            )}
          >
            {item.name}
            {isActive && (
              <span className="absolute left-0 -bottom-[18px] w-full h-[3px] bg-primary-light dark:bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
