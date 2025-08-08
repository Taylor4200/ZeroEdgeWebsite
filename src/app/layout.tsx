import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { analytics } from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ZeroEdgeStudios - Where Slots Meet Innovation',
    template: '%s | ZeroEdgeStudios'
  },
  description: 'Premium slot game studio creating innovative gaming experiences with stunning visuals and fair gameplay.',
  keywords: ['slot games', 'gaming', 'casino', 'RTP', 'volatility', 'free spins'],
  authors: [{ name: 'ZeroEdgeStudios' }],
  creator: 'ZeroEdgeStudios',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zeroedgestudios.com',
    title: 'ZeroEdgeStudios - Where Slots Meet Innovation',
    description: 'Premium slot game studio creating innovative gaming experiences.',
    siteName: 'ZeroEdgeStudios',
  },
  metadataBase: new URL('http://localhost:3000'),
  twitter: {
    card: 'summary_large_image',
    title: 'ZeroEdgeStudios - Where Slots Meet Innovation',
    description: 'Premium slot game studio creating innovative gaming experiences.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} bg-background text-white antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
