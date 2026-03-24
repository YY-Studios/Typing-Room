import Link from 'next/link';

export const Logo = () => {
  return (
    <h1>
      <Link href="/" className="flex items-center text-2xl font-bold text-main">
        Typing Room
      </Link>
    </h1>
  );
};
