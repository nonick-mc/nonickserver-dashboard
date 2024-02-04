import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Providers } from './provider';

const notoSans = Noto_Sans_JP({ subsets: ['latin'] });

const siteName = 'NoNICK SERVER';

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description: 'Discordサーバー「NoNICK SERVER」公式サイト'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={notoSans.className}>
        <Providers>
          <main className='container max-w-screen-lg h-screen'>
            <Nav />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
