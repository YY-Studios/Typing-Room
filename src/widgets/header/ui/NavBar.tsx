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
              'relative pb-1 text-lg font-medium transition-colors',
              isActive
                ? 'text-nav border-b-2 border-primary'
                : 'text-text-sub hover:text-text-main',
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};
