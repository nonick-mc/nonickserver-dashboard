'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { SessionCheckProvider } from '@/components/sessionCheckProvider';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <SessionProvider>
      <SessionCheckProvider>
        <NextUIProvider navigate={router.push}>
          <ThemeProvider attribute='class' defaultTheme='dark'>
            {children}
          </ThemeProvider>
        </NextUIProvider>
      </SessionCheckProvider>
    </SessionProvider>
  );
}
