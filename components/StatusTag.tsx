import type { EntryStatus } from '@/content/log'
import { markClass, statusLabel } from './journey/marks'

/**
 * Status, in the same vocabulary the route uses.
 *
 * The word does the work. The mark beside it repeats the shape from the
 * diagram, so a reader who learned "ring means demo" on the route reads it the
 * same way here. Colour is never the only signal, on either surface.
 */
const fromCaseStatus: Record<string, EntryStatus> = {
  'Working demo': 'demo',
  'Client demo': 'demo',
  'Client pilot': 'demo',
  'Team deployment': 'shipped',
  'Research in progress': 'research',
}

export default function StatusTag({ status }: { status: string }) {
  const kind = fromCaseStatus[status] ?? 'research'
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-2.5 py-1">
      <span aria-hidden className={markClass('research', kind)} />
      <span className="eyebrow text-ink-muted">{status}</span>
    </span>
  )
}

export { statusLabel }
