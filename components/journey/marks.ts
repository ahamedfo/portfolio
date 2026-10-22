import type { EntryStatus, LineId } from '@/content/log'

/**
 * Mark appearance, in one place.
 *
 * Two encodings, deliberately independent:
 *
 *   HUE says which line the work rides. This is the documented deviation from
 *   DESIGN.md, which forbids a second chromatic accent. A chart does not get
 *   that option. Both hues were validated against the dark surfaces.
 *
 *   SHAPE says its state. Solid, ring, dotted ring, broken ring.
 *
 * Because state lives in the shape, the rail survives grayscale and
 * colour-vision deficiency without anyone having to tell amber from teal.
 * That is what makes the deviation safe rather than merely allowed.
 *
 * Tailwind only emits classes it can see as literal strings, which is why
 * these are spelled out rather than built from template literals.
 */

export const lineStroke: Record<LineId, string> = {
  industry: '#B47819',
  research: '#04999B',
}

export const HELD = '#CF5E53'

/** The mark itself. Hue from the line, shape from the status. */
export function markClass(line: LineId, status: EntryStatus): string {
  const base = 'block shrink-0 rounded-full transition-transform duration-200'

  if (status === 'held') {
    // Status overrides line hue here. A held claim is a state, and it should
    // read the same whichever line it sits on.
    return `${base} h-[11px] w-[11px] border-2 border-dashed border-chart-held bg-canvas`
  }

  const ring = line === 'industry' ? 'border-chart-industry' : 'border-chart-research'
  const fill = line === 'industry' ? 'bg-chart-industry' : 'bg-chart-research'

  switch (status) {
    case 'shipped':
      return `${base} h-[10px] w-[10px] ${fill}`
    case 'demo':
      return `${base} h-[11px] w-[11px] border-2 ${ring} bg-canvas`
    case 'research':
      return `${base} h-3 w-3 border-2 border-dotted ${ring} bg-canvas`
  }
}

/** What the shape means, spelled out wherever a key is shown. */
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
