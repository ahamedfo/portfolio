/**
 * Status in ordinary product language.
 *
 * A reader should be able to tell a demonstration from a pilot from a shipped
 * deployment without decoding a colour. The word does that work; the colour
 * only reinforces it.
 */
const tone: Record<string, string> = {
  'Working demo': 'text-signal border-signal/35',
  'Client demo': 'text-signal border-signal/35',
  'Client pilot': 'text-hi border-hi/40',
  'Team deployment': 'text-hi border-hi/40',
  'Research in progress': 'text-ink-3 border-line-strong',
}

export default function StatusTag({ status }: { status: string }) {
  return (
    <span
      className={`inline-block border px-2 py-[0.1875rem] font-mono text-[0.6875rem] uppercase tracking-label ${
        tone[status] ?? 'text-ink-3 border-line-strong'
      }`}
    >
      {status}
    </span>
  )
}
