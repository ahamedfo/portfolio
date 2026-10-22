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

const DESCRIPTION =
  'Applied AI engineer at IBM Client Engineering. I build agent workflows for enterprise clients and put checks around them: enforced tool-use policy, deterministic validation, and evaluation against human-approved work. Multi-agent and quantization research at Queen Mary University of London and NYU.'

export const metadata: Metadata = {
  title: 'Ahamed Fofana, Applied AI Engineer',
  description: DESCRIPTION,
  openGraph: {
    title: 'Ahamed Fofana, Applied AI Engineer',
    description: DESCRIPTION,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-paper font-serif text-ink-2 antialiased">
        <div className="mx-auto max-w-frame px-6">
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
