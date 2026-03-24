import { QueryProvider } from '@/shared/providers/query-provider';
import { Header } from '@/widgets/header/ui/Header';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <Header />
          <main className="pt-[72px]">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
