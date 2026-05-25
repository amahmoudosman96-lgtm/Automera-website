import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automera — AI Automation for SMBs',
    description: 'Custom AI workflows, agents, and data pipelines. Shipped in weeks.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-white.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-white.svg',
    apple: '/favicon-white.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cairo.variable} ${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        {children}
      </body>
      {/* Cal.com embed — auto-initialises from data-cal-link attributes */}
      <Script src="https://cal.com/embed.js" strategy="lazyOnload" />
    </html>
  )
}
