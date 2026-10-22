import type { Metadata } from 'next'
import Link from 'next/link'
import { profile, skills, education, languages } from '@/content/profile'
import { industryRoles, researchRoles } from '@/content/roles'
import type { Role } from '@/content/roles'
import { byId } from '@/content/cases'

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
        <div key={r.id} className="border-t border-line py-8 first:border-t-0 first:pt-0">
          <dt className="grid gap-x-8 gap-y-2 lg:grid-cols-[14rem_1fr]">
            <div>
              <p className="font-mono text-[0.8125rem] tnum text-ink-3">{r.period}</p>
              <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-label text-ink-3">
                {r.location}
              </p>
            </div>
            <div>
              <p className="text-[1.25rem] leading-snug text-ink-1">{r.org}</p>
              <p className="mt-1 text-[1.0625rem] italic text-ink-2">{r.title}</p>
            </div>
          </dt>
          <dd className="mt-4 lg:ml-[17.5rem]">
            <ul className="max-w-prose space-y-3">
              {r.bullets.map((b) => (
                <li key={b.slice(0, 24)} className="text-[1rem] leading-[1.7] text-ink-2">
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
                    className="border-b border-signal/40 pb-0.5 font-mono text-[0.8125rem] text-signal transition-colors hover:border-signal"
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
    <div className="pt-12">
      <Link href="/" className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1">
        &larr; Home
      </Link>

      <header className="mt-9 border-b border-line pb-11">
        <h1 className="text-[2rem] leading-[1.15] tracking-[-0.01em] text-ink-1 sm:text-[2.75rem]">
          {profile.name}
        </h1>
        <p className="mt-3 font-mono text-[0.8125rem] text-ink-3">{profile.location}</p>
        <div className="mt-7 space-y-4">
          {profile.intro.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
              {p}
            </p>
          ))}
        </div>
      </header>

      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">Experience</h2>
        <div className="mt-8">
          <RoleList items={industryRoles} />
        </div>
      </section>

      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">Research positions</h2>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-3">
          Listed separately from the roles above because they overlap with them. An overlapping
          research appointment is not a gap in employment.
        </p>
        <div className="mt-8">
          <RoleList items={researchRoles} />
        </div>
        <Link
          href="/research"
          className="mt-8 inline-block border-b border-signal/40 pb-0.5 font-mono text-[0.8125rem] text-signal transition-colors hover:border-signal"
        >
          The quantization study in full &rarr;
        </Link>
      </section>

      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">Education</h2>
        <dl className="mt-7">
          {education.map((e) => (
            <div key={e.school} className="grid gap-x-8 gap-y-2 border-t border-line py-6 first:border-t-0 first:pt-0 lg:grid-cols-[14rem_1fr]">
              <dt className="font-mono text-[0.75rem] uppercase tracking-label text-ink-3">
                {e.location}
              </dt>
              <dd>
                <p className="text-[1.0625rem] text-ink-1">{e.school}</p>
                <p className="mt-1 text-[1rem] italic text-ink-2">{e.degree}</p>
                <p className="mt-1 font-mono text-[0.8125rem] tnum text-ink-3">{e.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">Tools and areas</h2>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-3">
          A plain list. No proficiency percentages, because I have never seen one that meant
          anything.
        </p>
        <dl className="mt-7">
          {skills.map((g) => (
            <div key={g.group} className="grid gap-x-8 gap-y-2 border-t border-line py-5 first:border-t-0 first:pt-0 lg:grid-cols-[14rem_1fr]">
              <dt className="font-mono text-[0.75rem] uppercase tracking-label text-ink-3">
                {g.group}
              </dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
                {g.items.map((i) => (
                  <span key={i} className="font-mono text-[0.8125rem] text-ink-2">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          ))}
          <div className="grid gap-x-8 gap-y-2 border-t border-line py-5 lg:grid-cols-[14rem_1fr]">
            <dt className="font-mono text-[0.75rem] uppercase tracking-label text-ink-3">
              Languages
            </dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
              {languages.map((l) => (
                <span key={l} className="font-mono text-[0.8125rem] text-ink-2">
                  {l}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section className="py-11">
        <h2 className="text-[1.5rem] text-ink-1">Contact</h2>
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
