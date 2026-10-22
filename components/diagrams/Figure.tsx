import type { ReactNode } from 'react'

/**
 * The frame every diagram sits in.
 *
 * Three jobs:
 *   1. Say out loud that the drawing is an illustration, not a trace of a live
 *      system. That label is not optional on this site.
 *   2. Let a wide drawing scroll inside its own box so the page body never
 *      scrolls sideways on a phone.
 *   3. Carry a text equivalent, so the diagram is never the only way to get
 *      the information.
 */
export default function Figure({
  id,
  title,
  kicker = 'Illustration',
  caption,
  children,
  steps,
}: {
  id: string
  title: string
  kicker?: string
  caption: string
  children: ReactNode
  /** The same sequence in words. Always rendered. */
  steps: string[]
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-xl border border-hairline bg-surface-1">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-hairline bg-surface-2 px-5 py-3.5">
        <span className="eyebrow text-chart-held">{kicker}</span>
        <span id={`${id}-title`} className="font-mono text-[0.8125rem] text-ink-muted">
          {title}
        </span>
      </div>

      <div className="overflow-x-auto px-5 py-7">
        <div className="min-w-[32rem]">{children}</div>
      </div>

      <figcaption className="border-t border-hairline px-5 py-4">
        <p className="max-w-prose font-mono text-[0.8125rem] leading-[1.6] text-ink-subtle">{caption}</p>
        <ol className="mt-4 max-w-prose list-decimal space-y-1.5 pl-5 text-[0.9375rem] leading-[1.6] text-ink-muted">
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
