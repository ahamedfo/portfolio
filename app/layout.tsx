import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ahamed Fofana | AI Engineer & Security Researcher',
  description: 'Portfolio of Ahamed Fofana - AI Engineer and Security Researcher specializing in NLP, LLMs, and cybersecurity.',
  keywords: ['AI Engineer', 'Security Researcher', 'NLP', 'Machine Learning', 'Cybersecurity'],
  authors: [{ name: 'Ahamed Fofana' }],
  openGraph: {
    title: 'Ahamed Fofana | AI Engineer & Security Researcher',
    description: 'Building secure AI systems at the intersection of machine learning and cybersecurity',
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
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}
