import './globals.css'
import { AnimationProvider } from '@/components/animation-proviter'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { siteConfig } from '@/config/site'
import { NextAuthProvider } from '@/components/session-provider'
import { CheckSessionProvider } from './auth-provider'

const notoSans = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.metadata.name,
    template: `%s - ${siteConfig.metadata.name}`,
  },
  description: siteConfig.metadata.description,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={notoSans.className}>
        <NextAuthProvider>
          <CheckSessionProvider>
            <AnimationProvider>
              <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
                {children}
              </ThemeProvider>
            </AnimationProvider>
          </CheckSessionProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
