import type { Metadata } from 'next'
import Link from 'next/link'
import StatusTag from '@/components/StatusTag'
import Disclosure from '@/components/Disclosure'
import { quantizationStudy, otherResearch, sideProjects } from '@/content/research'

export const metadata: Metadata = {
  title: 'Research | Ahamed Fofana',
  description:
    'Quantization across four agent architectures: 87 configurations on 1,000 shared questions, with the qualification attached to every finding. Plus current network-monitoring research at NYU Osiris Lab.',
}

/**
 * The research page.
 *
 * Every finding is paired with its bound. That pairing is not a disclaimer at
 * the bottom of the page, it is the layout: claim, evidence, and what the
 * evidence does not cover, in that order, in the same block. A finding whose
 * limit is hidden somewhere else is not a finding a reader can use.
 */
export default function Research() {
  const s = quantizationStudy

  return (
    <div className="mx-auto max-w-frame px-6 py-20">
      <Link href="/" className="font-mono text-[0.8125rem] text-ink-subtle transition-colors hover:text-ink">
        &larr; Home
      </Link>

      <header className="mt-9 border-b border-hairline pb-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <StatusTag status="Research in progress" />
          <span className="font-mono text-[0.8125rem] text-ink-subtle">
            {s.affiliation} · {s.period}
          </span>
        </div>

        <h1 className="mt-6 max-w-[22ch] text-display-md text-ink">
          {s.title}
        </h1>

        <div className="mt-7 space-y-4">
          {s.question.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted">
              {p}
            </p>
          ))}
        </div>

        <p className="mt-6 max-w-prose font-mono text-[0.8125rem] leading-[1.6] text-ink-subtle">
          Status: {s.status}.
        </p>
      </header>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Design</h2>
        <dl className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {s.design.map((d) => (
            <div key={d.label}>
              <dt className="eyebrow">{d.label}</dt>
              <dd className="mt-1.5 font-mono text-[1.5rem] tnum leading-none text-ink">
                {d.value}
              </dd>
              <dd className="mt-2.5 text-[0.875rem] leading-[1.6] text-ink-subtle">{d.note}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-9 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted">{s.kuber}</p>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Findings</h2>
        <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted">
          Five results, each with the boundary of what it covers. The boundary is not a hedge. It
          is the difference between a finding and a slogan.
        </p>

        {/* No 01 / 02 / 03 here. These five are a list, not a sequence: nothing
            about the second follows from the first, and numbering them would
            claim an order the evidence does not have. */}
        <div className="mt-10 space-y-10">
          {s.findings.map((f) => (
            <div key={f.claim.slice(0, 24)} className="border-t border-hairline pt-8 first:border-t-0 first:pt-0">
              <h3 className="max-w-[44ch] text-card-title text-ink">{f.claim}</h3>
              <p className="mt-4 max-w-prose text-[1rem] leading-[1.75] text-ink-muted">{f.detail}</p>
              <p className="mt-4 max-w-prose border-l-2 border-chart-held/50 pl-4 text-[0.9375rem] leading-[1.7] text-ink-muted">
                <span className="mr-2 eyebrow text-chart-held">
                  Bound
                </span>
                {f.bound}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">How it was kept honest</h2>
        <div className="mt-6">
          <Disclosure summary="Method and statistical boundaries" hint="5 points" open>
            <ul className="max-w-prose list-disc space-y-3 pl-5 text-[1rem] leading-[1.7] text-ink-muted">
              {s.method.map((m) => (
                <li key={m.slice(0, 24)}>{m}</li>
              ))}
            </ul>
          </Disclosure>
          <Disclosure summary="What is still open" hint="4 points">
            <ul className="max-w-prose list-disc space-y-3 pl-5 text-[1rem] leading-[1.7] text-ink-muted">
              {s.openWork.map((m) => (
                <li key={m.slice(0, 24)}>{m}</li>
              ))}
            </ul>
          </Disclosure>
        </div>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Other research</h2>
        <dl className="mt-8">
          {otherResearch.map((r) => (
            <div key={r.id} className="border-t border-hairline py-7 first:border-t-0 first:pt-0">
              <dt>
                <span className="eyebrow">
                  {r.affiliation} · {r.period} · {r.status}
                </span>
                <p className="mt-2 max-w-[46ch] text-[1.125rem] leading-snug text-ink">
                  {r.title}
                </p>
              </dt>
              <dd className="mt-3 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-muted">
                {r.question}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-11">
        <h2 className="text-headline text-ink">Earlier experiments</h2>
        <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted">
          Side projects and stopped experiments, kept here because a result that did not work out
          is still a result. Two of these ended in nulls and one was stopped by a rule written
          before it started.
        </p>
        <dl className="mt-8">
          {sideProjects.map((p) => (
            <div key={p.id} className="border-t border-hairline py-6 first:border-t-0 first:pt-0">
              <dt className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="eyebrow">{p.stage}</span>
                <p className="max-w-[46ch] text-[1.0625rem] leading-snug text-ink">{p.title}</p>
              </dt>
              <dd className="mt-2.5 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-muted">
                {p.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
