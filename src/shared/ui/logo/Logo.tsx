import Link from 'next/link';

export const Logo = () => {
  return (
    <h1>
      <Link
        href="/"
        className="bubble-text-shadow text-xl font-black uppercase tracking-tight text-primary transition-transform hover:scale-105"
      >
        Typing Room
      </Link>
    </h1>
  );
};
