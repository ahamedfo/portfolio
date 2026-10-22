import type { EntryStatus, LineId } from '@/content/log'

/**
 * Mark appearance, in one place.
 *
 * Two encodings, deliberately independent:
 *
 *   HUE says which line the work rides. Two categorical values, validated as a
 *   set against the dark field.
 *
 *   SHAPE says its state. Solid, ring, dotted ring, broken ring.
 *
 * Because state lives in the shape, the diagram survives being printed in
 * grayscale, and nobody has to distinguish amber from teal to read it. That is
 * the whole reason status is not a third and fourth hue.
 *
 * Tailwind only emits classes it can see as literal strings, which is why these
 * are spelled out rather than built from template literals.
 */

export const lineText: Record<LineId, string> = {
  industry: 'text-industry',
  research: 'text-research',
}

export const lineStroke: Record<LineId, string> = {
  industry: '#B47819',
  research: '#04999B',
}

export const HELD = '#CF5E53'

/** The mark itself. Hue from the line, shape from the status. */
export function markClass(line: LineId, status: EntryStatus): string {
  const base = 'block rounded-full transition-transform duration-200'

  if (status === 'held') {
    // Status colour overrides the line hue here. A held claim is a state, and
    // it is the one state that should read the same whichever line it is on.
    return `${base} h-3 w-3 border-2 border-dashed border-held bg-void`
  }

  const ring = line === 'industry' ? 'border-industry' : 'border-research'
  const fill = line === 'industry' ? 'bg-industry' : 'bg-research'

  switch (status) {
    case 'shipped':
      return `${base} h-[11px] w-[11px] ${fill}`
    case 'demo':
      return `${base} h-3 w-3 border-2 ${ring} bg-void`
    case 'research':
      return `${base} h-[13px] w-[13px] border-2 border-dotted ${ring} bg-void`
  }
}

/** What the shape means, spelled out for the legend. */
export const statusLabel: Record<EntryStatus, string> = {
  shipped: 'Delivered',
  demo: 'Demo or pilot',
  research: 'In progress',
  held: 'Not established',
}

export const statusMeaning: Record<EntryStatus, string> = {
  shipped: 'Built, delivered, and done.',
  demo: 'A working demonstration or a client pilot. Not a production rollout.',
  research: 'Running now. Scoping, drafted, or unfinished.',
  held: 'Stopped, or a claim I will not make without the evidence for it.',
}
