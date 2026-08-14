/**
 * Pure formatting helpers, deliberately free of Node imports so that client
 * components can use them. Anything touching the filesystem lives in
 * lib/content.ts, which is server-only.
 */

/**
 * YAML parses an unquoted `date: 2026-08-13` into a Date, not a string, so the
 * frontmatter value has to be normalised back to an ISO day before formatting.
 */
export function toIsoDay(v: unknown): string {
  if (v instanceof Date && !Number.isNaN(v.getTime())) {
    return v.toISOString().slice(0, 10)
  }
  return String(v ?? '')
}

export function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00Z`)
  // Never render "Invalid Date" into the page; fall back to the raw value.
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
