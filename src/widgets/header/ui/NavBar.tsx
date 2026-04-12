'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const MENU = [
  { name: 'Practice', href: '/' },
  { name: 'Stats', href: '/stats' },
  { name: 'Store', href: '/store' },
];

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 justify-center gap-1">
      {MENU.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              'rounded-full border-2 px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95',
              isActive
                ? 'sticker-shadow border-white bg-primary text-white'
                : 'border-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600',
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};
