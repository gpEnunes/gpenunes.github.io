import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import { SITE } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Emerson Nunes · Fullstack Developer',
  description:
    'Fullstack Developer with 8+ years, specialised in Vue.js, Nuxt.js, Laravel and real-time dashboards.',
  authors: [{ name: 'Emerson Nunes' }],
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
