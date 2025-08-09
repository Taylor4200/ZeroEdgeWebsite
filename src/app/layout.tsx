import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import AgeGate from '@/components/AgeGate'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'ZeroEdge Studios - Stake-Exclusive Game Studio',
    template: '%s | ZeroEdge Studios'
  },
  description: 'Stake-exclusive game studio creating unique slot games built on Stake Engine for the world\'s leading crypto casino.',
  keywords: ['stake engine', 'stake exclusive', 'slot games', 'crypto casino', 'game development', 'stake publisher'],
  authors: [{ name: 'ZeroEdge Studios' }],
  creator: 'ZeroEdge Studios',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zeroedgestudios.com',
    title: 'ZeroEdge Studios - Stake-Exclusive Game Studio',
    description: 'Stake-exclusive game studio creating unique slot games built on Stake Engine.',
    siteName: 'ZeroEdge Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeroEdge Studios - Stake-Exclusive Game Studio',
    description: 'Stake-exclusive game studio creating unique slot games built on Stake Engine.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AgeGate />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
