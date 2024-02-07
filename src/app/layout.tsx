import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Providers } from './providers';
import { cn } from '@/lib/utils';

const notoSans = Noto_Sans_JP({ subsets: ['latin'] });

const siteName = 'NoNICK SERVER';

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description: 'Discordサーバー「NoNICK SERVER」公式サイト',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={cn(notoSans.className, 'min-h-screen')}>
        <Providers>
          <div className='flex flex-col'>
            <Nav />
            <main className='grow max-w-screen-lg w-full mx-auto px-6 pt-4'>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
