import { testimonialsFor, type Testimonial as T } from '@/content/recognition'

/**
 * One short contextual quote at the end of the case study it corroborates.
 *
 * Praise is only useful when it names the deliverable and what happened to it,
 * and it is only honest when the reader can tell who said it and in what sense.
 * So the kind is always rendered:
 *
 *   individual  the writer is describing the work of one person
 *   team        the writer is thanking or crediting a team
 *   relayed     a colleague is passing on what a client said
 *   fixture     a layout placeholder, not a real quotation
 *
 * `relayed` exists specifically so a client's words can never be dressed up as
 * a direct message from someone who did not write it.
 *
 * Nothing renders unless its own approval flag is true. An empty approval list
 * produces no section at all, which is the correct default.
 */
const kindLabel: Record<T['kind'], string> = {
  individual: 'Written feedback on this work',
  team: 'Written feedback to the team on this work',
  relayed: 'Client feedback, relayed by a project colleague',
  fixture: 'Development fixture, not a real quotation',
}

export default function Testimonial({ caseId }: { caseId: string }) {
  const items = testimonialsFor(caseId)
  if (items.length === 0) return null

  return (
    <div className="mt-12 space-y-6">
      {items.map((t) => (
        <figure
          key={t.id}
          className={`border-l-2 pl-6 ${t.kind === 'fixture' ? 'border-dashed border-rule' : 'border-research/40'}`}
        >
          <span className="label">{kindLabel[t.kind]}</span>
          <blockquote className="mt-3 max-w-prose text-[1.0625rem] italic leading-[1.7] text-ink-1">
            {t.quote}
          </blockquote>
          <figcaption className="mt-3 font-mono text-[0.8125rem] text-ink-3">
            {t.attribution}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
