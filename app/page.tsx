import Link from 'next/link'
import CaseCard from '@/components/CaseCard'
import ConnectionExplorer from '@/components/ConnectionExplorer'
import StatusTag from '@/components/StatusTag'
import { featuredCases } from '@/content/cases'
import { secondary } from '@/content/secondary'
import { quantizationStudy } from '@/content/research'
import { profile } from '@/content/profile'
import { award } from '@/content/recognition'

/**
 * The first viewport states the focus and then goes straight into the work.
 * No hero image, no skill cloud, no counters. The next thing after the
 * headline is a case study.
 */
export default function Home() {
  return (
    <div>
      <section className="pb-16 pt-16 sm:pt-20">
        <h1 className="max-w-[30ch] text-[2.25rem] leading-[1.12] tracking-[-0.01em] text-ink-1 sm:text-[3.25rem]">
          {profile.headline}
        </h1>

        <div className="mt-9 grid gap-x-16 gap-y-7 lg:grid-cols-2">
          <p className="max-w-[46ch] text-[1.125rem] leading-[1.6] text-ink-1 sm:text-[1.3125rem]">
            {profile.supportingLine}
          </p>

          <div className="space-y-4">
            {profile.intro.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-prose text-[1rem] leading-[1.75] text-ink-2">
                {p}
              </p>
            ))}
          </div>
        </div>

        <nav aria-label="Jump to a section" className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {[
            ['#work', 'Selected work'],
            ['#connections', 'How the work connects'],
            ['/research', 'Research'],
            ['#experience', 'Experience'],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="border-b border-line-strong pb-0.5 font-mono text-[0.8125rem] text-ink-2 transition-colors hover:border-signal hover:text-ink-1"
            >
              {label}
            </Link>
          ))}
        </nav>
      </section>

      <section id="work" className="scroll-mt-8 border-t border-line pt-12">
        <h2 className="text-[1.75rem] text-ink-1">Selected work</h2>
        <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
          Four client engagements at IBM. Clients are described by sector rather than named. Each
          page carries the architecture, what I personally did, the check I put around the model,
          and what the work does not establish.
        </p>

        <div className="mt-10">
          {featuredCases.map((c) => (
            <CaseCard key={c.id} item={c} />
          ))}
        </div>
      </section>

      <section id="connections" className="scroll-mt-8 border-t border-line pt-12">
        <h2 className="text-[1.75rem] text-ink-1">How the work connects</h2>
        <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
          Six capabilities that run through the client work, the research, and the roles before
          both. Pick one to see what shares it and why. These are conceptual connections, not a
          claim that research code shipped into a client system or that one project caused another.
        </p>

        <div className="mt-9">
          <ConnectionExplorer />
        </div>
      </section>

      <section id="research" className="scroll-mt-8 border-t border-line pt-12">
        <h2 className="text-[1.75rem] text-ink-1">Research</h2>

        <div className="mt-8 border border-line bg-raised p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatusTag status="Research in progress" />
            <span className="font-mono text-[0.8125rem] text-ink-3">
              {quantizationStudy.affiliation}
            </span>
          </div>

          <h3 className="mt-4 max-w-[36ch] text-[1.5rem] leading-snug text-ink-1">
            <Link href="/research" className="transition-colors hover:text-signal">
              {quantizationStudy.title}
            </Link>
          </h3>

          <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.7] text-ink-2">
            {quantizationStudy.question[0]}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {quantizationStudy.design.slice(0, 6).map((d) => (
              <div key={d.label}>
                <dt className="label">{d.label}</dt>
                <dd className="mt-1 font-mono text-[1.125rem] tnum text-ink-1">{d.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/research"
            className="mt-8 inline-block border-b border-signal/40 pb-0.5 font-mono text-[0.8125rem] text-signal transition-colors hover:border-signal"
          >
            Design, findings, and the qualifications on each one &rarr;
          </Link>
        </div>
      </section>

      <section id="additional" className="scroll-mt-8 border-t border-line pt-12">
        <h2 className="text-[1.75rem] text-ink-1">Additional client work</h2>
        <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
          Shorter engagements and pieces of work where the honest version is smaller than a case
          study. Each one states what is supported and what is not.
        </p>

        <dl className="mt-9">
          {secondary.map((s) => (
            <div
              key={s.id}
              className="grid gap-x-10 gap-y-3 border-t border-line py-8 first:border-t-0 first:pt-0 lg:grid-cols-[20rem_1fr]"
            >
              <dt>
                <p className="max-w-[28ch] text-[1.125rem] leading-snug text-ink-1">{s.title}</p>
                <span className="label mt-2 block">{s.client}</span>
              </dt>
              <div>
                <dd className="max-w-prose text-[0.9375rem] leading-[1.7] text-ink-2">
                  {s.established}
                </dd>
                <dd className="mt-4 max-w-prose border-l border-line-strong pl-4 text-[0.9375rem] leading-[1.7] text-ink-3">
                  <span className="label mr-2">Not established</span>
                  {s.notEstablished}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section id="experience" className="scroll-mt-8 border-t border-line pt-12">
        <h2 className="text-[1.75rem] text-ink-1">Experience</h2>
        <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
          Roles, research positions, and education are on the{' '}
          <Link
            href="/about"
            className="text-ink-1 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
          >
            about page
          </Link>
          , with the research appointments kept separate from the industry roles so an overlapping
          appointment does not read as a gap.
        </p>
      </section>

      <section id="recognition" className="scroll-mt-8 border-t border-line pt-12">
        <h2 className="text-[1.75rem] text-ink-1">Recognition</h2>
        <div className="mt-7 max-w-prose">
          <p className="text-[1.125rem] leading-snug text-ink-1">
            {award.category}, {award.event}
          </p>
          <p className="mt-2 font-mono text-[0.8125rem] text-ink-3">{award.date}</p>
          <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-2">
            Judged on the {award.criterion.toLowerCase()}. {award.shared}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-3">{award.note}</p>
        </div>
        <p className="mt-6 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-3">
          Written feedback from clients and colleagues sits on the case study it corroborates
          rather than in a wall of quotes here. None of it is published yet, because reuse
          permission for the wording and the attribution has not been obtained.
        </p>
      </section>

      <section id="contact" className="scroll-mt-8 border-t border-line pt-12">
        <h2 className="text-[1.75rem] text-ink-1">Contact</h2>
        <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
          Email is the fastest way to reach me.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-[0.9375rem] text-ink-1 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            className="font-mono text-[0.9375rem] text-ink-1 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            className="font-mono text-[0.9375rem] text-ink-1 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  )
}
