import { QueryProvider } from '@/shared/providers/query-provider';
import { ModalProvider } from '@/shared/ui/modal';
import { Header } from '@/widgets/header/ui/Header';
import './globals.css';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn('font-sans', geist.variable)}>
      <body>
        <QueryProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
