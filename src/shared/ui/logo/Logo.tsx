import Link from 'next/link';

export const Logo = () => {
  return (
    <h1>
      <Link href="/" className="flex items-center">
        <span className="font-serif text-2xl font-bold tracking-wide text-primary">
          Typing Room
        </span>
      </Link>
    </h1>
  );
};
