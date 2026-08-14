import { experiences } from '@/lib/data'
import { work, type Stage } from '@/lib/work'

export type Tone = 'ongoing' | 'starting' | 'finished' | 'paused' | 'stopped' | 'role'

export type Entry = {
  id: string
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

/** Roles and labs, most recent first. */
export function getExperienceEntries(): Entry[] {
  return experiences
    .map((e): Entry => ({
      id: `${e.company}-${e.start}`,
      date: e.start,
      dateLabel: e.period,
      label: e.location,
      tone: 'role',
      title: e.company,
      line: e.role,
      summary: e.description[0],
    }))
    .sort((a, b) => ((a.date ?? '') < (b.date ?? '') ? 1 : -1))
}
