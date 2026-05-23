import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import Script from 'next/script'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const cairo = Cairo({
  variable: '--font-cairo-var',
  subsets: ['arabic', 'latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Automera — AI Automation for SMBs',
    template: '%s | Automera',
  },
  description:
    'Automera builds custom AI workflows, agents, and data pipelines for SMB teams — shipped in weeks, not quarters. You own the code.',
  metadataBase: new URL('https://automera.co'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://automera.co',
    siteName: 'Automera',
    title: 'Automera — AI Automation for SMBs',
    description:
      'Custom AI workflows, agents, and data pipelines. Shipped in weeks. You own the code.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Automera — AI Automation for SMBs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automera — AI Automation for SMBs',
    description: 'Custom AI workflows, agents, and data pipelines. Shipped in weeks.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-white.png', type: 'image/png' },
    ],
    shortcut: '/favicon-white.png',
    apple: '/favicon-white.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
      {/* Cal.com embed — auto-initialises from data-cal-link attributes */}
      <Script src="https://cal.com/embed.js" strategy="lazyOnload" />
    </html>
  )
}
