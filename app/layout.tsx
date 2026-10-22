import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

/**
 * One family from display to body.
 *
 * DESIGN.md names Inter at 500/600/700 as the closest free substitute for
 * Linear's own cut, so that is what this is rather than a pair of faces doing
 * a contrast trick. The hierarchy is carried by size and by aggressively
 * negative tracking on display, not by swapping families.
 *
 * JetBrains Mono is the documented mono substitute and is scoped to data
 * readouts. The typography principles are explicit that mono stays out of
 * marketing chrome.
 */
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-canvas font-sans text-ink-muted antialiased">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
