import './globals.css'
import { AnimationProvider } from '@/components/animation-proviter'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { siteConfig } from '@/config/site'

const notoSans = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.metadata.name,
    template: `%s - ${siteConfig.metadata.name}`,
  },
  description: siteConfig.metadata.description,
  themeColor: '#ffffff',
  openGraph: {
    title: siteConfig.metadata.name,
    description: siteConfig.metadata.description,
    siteName: siteConfig.metadata.name,
    locale: 'ja-JP',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <AnimationProvider>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            {children}
          </ThemeProvider>
        </AnimationProvider>
      </body>
    </html>
  )
}
