import type { Metadata } from 'next'
import Link from 'next/link'
import { profile, skills, education, languages } from '@/content/profile'
import { industryRoles, researchRoles } from '@/content/roles'
import type { Role } from '@/content/roles'
import { byId } from '@/content/cases'
import { secondary } from '@/content/secondary'
import { award } from '@/content/recognition'
import Disclosure from '@/components/Disclosure'

export const metadata: Metadata = {
  title: 'About | Ahamed Fofana',
  description:
    'Applied AI engineering at IBM Client Engineering, security enablement at SentinelOne, delivery and reliability at CVS Health, and multi-agent research at Queen Mary University of London and NYU.',
}

/**
 * Roles and education. Titles, dates, and locations come from the current
 * resume, which is the only authority for them.
 *
 * Industry roles and research positions are listed separately on purpose.
 * Interleaving them by date makes an overlapping research appointment look
 * like a gap between jobs, which is the opposite of what it is.
 *
 * There is no resume download. The current resume names clients, so it cannot
 * be published until a client-anonymous version exists.
 */
function RoleList({ items }: { items: Role[] }) {
  return (
    <dl>
      {items.map((r) => (
        <div key={r.id} className="border-t border-hairline py-8 first:border-t-0 first:pt-0">
          <dt className="grid gap-x-8 gap-y-2 lg:grid-cols-[14rem_1fr]">
            <div>
              <p className="font-mono text-[0.8125rem] tnum text-ink-subtle">{r.period}</p>
              <p className="mt-1 eyebrow text-ink-subtle">
                {r.location}
              </p>
            </div>
            <div>
              <p className="text-[1.25rem] leading-snug text-ink">{r.org}</p>
              <p className="mt-1 text-[1.0625rem] italic text-ink-muted">{r.title}</p>
            </div>
          </dt>
          <dd className="mt-4 lg:ml-[17.5rem]">
            <ul className="max-w-prose space-y-3">
              {r.bullets.map((b) => (
                <li key={b.slice(0, 24)} className="text-[1rem] leading-[1.7] text-ink-muted">
                  {b}
                </li>
              ))}
            </ul>
            {r.seeAlso && r.seeAlso.length > 0 && (
              <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {r.seeAlso.map((id) => (
                  <Link
                    key={id}
                    href={`/work/${id}`}
                    className="border-b border-primary/40 pb-0.5 font-mono text-[0.8125rem] text-primary-hover transition-colors hover:border-primary"
                  >
                    {byId(id)?.shortTitle ?? id}
                  </Link>
                ))}
              </p>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default function About() {
  return (
    <div className="mx-auto max-w-frame px-6 py-20">
      <Link href="/" className="font-mono text-[0.8125rem] text-ink-subtle transition-colors hover:text-ink">
        &larr; Home
      </Link>

      <header className="mt-9 border-b border-hairline pb-11">
        <h1 className="text-display-md text-ink">
          {profile.name}
        </h1>
        <p className="mt-3 font-mono text-[0.8125rem] text-ink-subtle">{profile.location}</p>
        <div className="mt-7 space-y-4">
          {profile.intro.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted">
              {p}
            </p>
          ))}
        </div>
      </header>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Experience</h2>
        <div className="mt-8">
          <RoleList items={industryRoles} />
        </div>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Research positions</h2>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-subtle">
          Listed separately from the roles above because they overlap with them. An overlapping
          research appointment is not a gap in employment.
        </p>
        <div className="mt-8">
          <RoleList items={researchRoles} />
        </div>
        <Link
          href="/research"
          className="mt-8 inline-block border-b border-primary/40 pb-0.5 font-mono text-[0.8125rem] text-primary-hover transition-colors hover:border-primary"
        >
          The quantization study in full &rarr;
        </Link>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Education</h2>
        <dl className="mt-7">
          {education.map((e) => (
            <div key={e.school} className="grid gap-x-8 gap-y-2 border-t border-hairline py-6 first:border-t-0 first:pt-0 lg:grid-cols-[14rem_1fr]">
              <dt className="eyebrow text-ink-subtle">
                {e.location}
              </dt>
              <dd>
                <p className="text-[1.0625rem] text-ink">{e.school}</p>
                <p className="mt-1 text-[1rem] italic text-ink-muted">{e.degree}</p>
                <p className="mt-1 font-mono text-[0.8125rem] tnum text-ink-subtle">{e.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Tools and areas</h2>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-subtle">
          A plain list. No proficiency percentages, because I have never seen one that meant
          anything.
        </p>
        <dl className="mt-7">
          {skills.map((g) => (
            <div key={g.group} className="grid gap-x-8 gap-y-2 border-t border-hairline py-5 first:border-t-0 first:pt-0 lg:grid-cols-[14rem_1fr]">
              <dt className="eyebrow text-ink-subtle">
                {g.group}
              </dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
                {g.items.map((i) => (
                  <span key={i} className="font-mono text-[0.8125rem] text-ink-muted">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          ))}
          <div className="grid gap-x-8 gap-y-2 border-t border-hairline py-5 lg:grid-cols-[14rem_1fr]">
            <dt className="eyebrow text-ink-subtle">
              Languages
            </dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
              {languages.map((l) => (
                <span key={l} className="font-mono text-[0.8125rem] text-ink-muted">
                  {l}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Additional client work</h2>
        <p className="mt-3 max-w-prose text-body text-ink-subtle">
          Shorter engagements where the honest version is smaller than a case study. Open one
          for what is supported and, just as importantly, what is not.
        </p>
        <div className="mt-7">
          {secondary.map((item) => (
            <Disclosure key={item.id} summary={item.title} hint={item.client}>
              <div className="space-y-4">
                <p className="max-w-prose text-body-sm leading-relaxed text-ink-muted">
                  {item.established}
                </p>
                <p className="max-w-prose border-l-2 border-chart-held/50 pl-4 text-body-sm leading-relaxed text-ink-muted">
                  <span className="eyebrow mr-2 text-chart-held">Not established</span>
                  {item.notEstablished}
                </p>
              </div>
            </Disclosure>
          ))}
        </div>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Recognition</h2>
        <div className="mt-6">
          <Disclosure summary={`${award.category}, ${award.event}`} hint={award.date}>
            <div className="max-w-prose space-y-2.5 text-body-sm leading-relaxed text-ink-muted">
              <p>
                Judged on the {award.criterion.toLowerCase()}. {award.shared}
              </p>
              <p className="text-ink-subtle">{award.note}</p>
            </div>
          </Disclosure>
          <Disclosure summary="Written feedback from clients and colleagues" hint="none published">
            <p className="max-w-prose text-body-sm leading-relaxed text-ink-muted">
              It sits on the case study it corroborates rather than in a wall of quotes, and
              none of it is published yet, because reuse permission for the wording and the
              attribution has not been obtained.
            </p>
          </Disclosure>
        </div>
      </section>

      <section className="py-14">
        <h2 className="text-headline text-ink">Contact</h2>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-[0.9375rem] text-ink underline decoration-control underline-offset-4 transition-colors hover:decoration-primary-hover"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            className="font-mono text-[0.9375rem] text-ink underline decoration-control underline-offset-4 transition-colors hover:decoration-primary-hover"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            className="font-mono text-[0.9375rem] text-ink underline decoration-control underline-offset-4 transition-colors hover:decoration-primary-hover"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  )
}
