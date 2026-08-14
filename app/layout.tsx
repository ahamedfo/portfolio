import type { Metadata } from 'next'
import { Source_Serif_4, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ahamed Fofana',
  description:
    'Research on language model agents under real deployment constraints: compressed weights, distributed knowledge, limited compute.',
  openGraph: {
    title: 'Ahamed Fofana',
    description:
      'Research on language model agents under real deployment constraints: compressed weights, distributed knowledge, limited compute.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-paper font-serif text-ink-2 antialiased">
        <div className="mx-auto max-w-frame px-6">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
