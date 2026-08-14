import type { Metadata } from 'next'
import Link from 'next/link'
import { personalInfo, aboutText, education, focusAreas, tooling, otherWork } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About | Ahamed Fofana',
  description: 'Background, experience, and education.',
}

export default function About() {
  return (
    <div className="pt-14">
      <Link
        href="/"
        className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
      >
        &larr; Timeline
      </Link>

      <header className="mt-10 pb-14">
        <h1 className="text-[2.25rem] leading-[1.15] tracking-[-0.01em] text-ink-1 sm:text-[3rem]">
          Ahamed Fofana
        </h1>
        <div className="mt-7 space-y-5">
          {aboutText.map((p, i) => (
            <p key={i} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
              {p}
            </p>
          ))}
        </div>
      </header>

      <section className="pb-16">
        <h2 className="border-b border-line pb-4 text-2xl text-ink-1">Focus</h2>
        <dl className="divide-y divide-line">
          {focusAreas.map((f) => (
            <div key={f.title} className="grid gap-2 py-6 lg:grid-cols-[16rem_1fr] lg:gap-8">
              <dt className="text-[1.0625rem] text-ink-1">{f.title}</dt>
              <dd className="max-w-prose text-[0.9375rem] leading-[1.7] text-ink-2">
                {f.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Experience lives on the home timeline. Repeating it here would mean
          two places to keep in sync and nothing gained. */}

      <section className="pb-16">
        <h2 className="border-b border-line pb-4 text-2xl text-ink-1">Education</h2>
        <dl className="divide-y divide-line">
          {education.map((e) => (
            <div key={e.school} className="grid gap-2 py-6 lg:grid-cols-[16rem_1fr] lg:gap-8">
              <div>
                <dt className="text-[1.0625rem] text-ink-1">{e.school}</dt>
                <dd className="mt-1 font-mono text-[0.8125rem] tnum text-ink-3">{e.period}</dd>
              </div>
              <div>
                <dd className="text-[1.0625rem] italic text-ink-1">{e.degree}</dd>
                <dd className="mt-1 text-[0.9375rem] text-ink-2">{e.sub}</dd>
                <dd className="mt-1 font-mono text-label text-ink-3">{e.note}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section className="pb-16">
        <h2 className="border-b border-line pb-4 text-2xl text-ink-1">Other work</h2>
        <dl className="divide-y divide-line">
          {otherWork.map((w) => (
            <div key={w.title} className="grid gap-2 py-6 lg:grid-cols-[16rem_1fr] lg:gap-8">
              <dt className="text-[1.0625rem] text-ink-1">{w.title}</dt>
              <dd className="max-w-prose text-[0.9375rem] leading-[1.7] text-ink-2">
                {w.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pb-8">
        <h2 className="border-b border-line pb-4 text-2xl text-ink-1">Tooling</h2>
        <dl className="divide-y divide-line">
          {Object.entries(tooling).map(([group, items]) => (
            <div key={group} className="grid gap-2 py-5 lg:grid-cols-[16rem_1fr] lg:gap-8">
              <dt className="font-mono text-label uppercase tracking-label text-ink-3">
                {group}
              </dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
                {items.map((i) => (
                  <span key={i} className="font-mono text-[0.8125rem] text-ink-2">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pb-8">
        <p className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
          Reach me at{' '}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-ink-1 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
          >
            {personalInfo.email}
          </a>
          .
        </p>
      </section>
    </div>
  )
}
