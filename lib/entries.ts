import { experiences } from '@/lib/data'
import { work, type Stage } from '@/lib/work'

export type Tone = 'ongoing' | 'starting' | 'finished' | 'paused' | 'stopped' | 'role'

export type Entry = {
  id: string
  /** Set when the entry has a page of its own. Renders a visible link. */
  href?: string
  /** The link text, so the affordance says what is behind it. */
  hrefLabel?: string
  /** ISO. Only present when a real date exists. */
  date?: string
  /** The metadata slot. A period for roles, a stage for work. */
  dateLabel?: string
  /** The small uppercase marker. */
  label: string
  tone: Tone
  title: string
  /** A short line under the title, e.g. a job title. */
  line?: string
  summary?: string
  /** Affiliation or funding, printed small under the summary. */
  where?: string
}

const stageTone: Record<Stage, Tone> = {
  Ongoing: 'ongoing',
  Starting: 'starting',
  Finished: 'finished',
  Paused: 'paused',
  Stopped: 'stopped',
}

/**
 * Work carries no dates. Four of the five started inside the same fortnight,
 * so a date axis would imply a cadence that is not real. Stage is the
 * honest ordering and it goes in the slot a date would occupy.
 */
export function getWorkEntries(): Entry[] {
  return work.map((w) => ({
    id: w.id,
    label: w.stage,
    tone: stageTone[w.stage],
    title: w.question,
    summary: w.body,
    where: w.where,
  }))
}

/** Roles that have a page of their own. Others render without a link. */
const rolePages: Record<string, string | undefined> = {
  IBM: '/experience/ibm',
}

/**
 * Roles and labs, most recent first.
 *
 * IBM and Queen Mary both started in May 2026. The comparator returns 0 on a tie
 * so the sort stays stable, which means ties fall back to the order in
 * `experiences`. IBM is listed first there, so it leads.
 */
export function getExperienceEntries(): Entry[] {
  return experiences
    .map((e): Entry => ({
      id: `${e.company}-${e.start}`,
      href: rolePages[e.company],
      hrefLabel: 'See what I built',
      date: e.start,
      dateLabel: e.period,
      label: e.location,
      tone: 'role',
      title: e.company,
      line: e.role,
      summary: e.description[0],
    }))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}
