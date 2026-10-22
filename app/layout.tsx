import type { Metadata } from 'next'
import { Archivo, Instrument_Sans, Martian_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

/**
 * Three faces, three jobs.
 *
 * Two of them are grotesques, which would normally be too close to tell apart.
 * The separation here is WIDTH, not shape: Archivo carries a wdth axis from 62
 * to 125 and runs wide for display, Instrument Sans sits narrow underneath it.
 * That is why `axes: ['wdth']` is loaded rather than a fixed weight set. Pulling
 * the axis means the width contrast is real rather than faked with tracking.
 *
 * Martian Mono is wide by default, which is right for a six-character station
 * code and wrong for anything longer, so it is pulled in narrower where it runs
 * as a label.
 */
const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
})

const body = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const mono = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-void font-sans text-ink-2 antialiased">
        <div className="mx-auto max-w-frame px-6">
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
