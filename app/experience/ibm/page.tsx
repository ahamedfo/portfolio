import type { Metadata } from 'next'
import Link from 'next/link'
import { ibmMeta, ibmIntro, ibmHighlights } from '@/lib/ibm'

export const metadata: Metadata = {
  title: 'IBM Client Engineering | Ahamed Fofana',
  description:
    'Ten enterprise engagements over one summer: multi-agent systems, a vision pipeline for survey documents, cost benchmarking across AI coding assistants, and legacy modernization.',
}

export default function IBM() {
  return (
    <article className="pt-14">
      <Link
        href="/"
        className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
      >
        &larr; Back
      </Link>

      <header className="mt-10 border-b border-line pb-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[0.8125rem] tnum text-ink-3">{ibmMeta.period}</span>
          <span className="font-mono text-label uppercase tracking-label text-ink-3">
            {ibmMeta.location}
          </span>
        </div>

        <h1 className="mt-5 text-[2.25rem] leading-[1.15] tracking-[-0.01em] text-ink-1 sm:text-[3rem]">
          {ibmMeta.org}
        </h1>
        <p className="mt-2 text-[1.125rem] italic text-ink-1">{ibmMeta.role}</p>

        <div className="mt-7 space-y-5">
          {ibmIntro.map((p, i) => (
            <p key={i} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
              {p}
            </p>
          ))}
        </div>
      </header>

      <div className="pb-8">
        {ibmHighlights.map((h) => (
          <section key={h.id} className="border-b border-line py-12 last:border-b-0">
            <span className="font-mono text-label uppercase tracking-label text-ink-3">
              {h.context}
            </span>

            <h2 className="mt-3 max-w-[34ch] text-2xl leading-snug text-ink-1">{h.title}</h2>

            <div className="mt-5 space-y-4">
              {h.body.map((p, i) => (
                <p key={i} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
                  {p}
                </p>
              ))}
            </div>

          </section>
        ))}
      </div>

      <p className="max-w-prose border-t border-line pt-8 font-mono text-[0.8125rem] leading-[1.6] text-ink-3">
        Clients are described by industry rather than named, and internal identifiers are omitted.
      </p>
    </article>
  )
}
