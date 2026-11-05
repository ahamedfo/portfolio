import { log, type LineId, type LogEntry } from './log'

/**
 * THE ROUTE. Stations, lines, and the geometry the diagram is drawn on.
 *
 * A station is a place-stint: somewhere Ahamed lived and worked, with a start
 * and an end. Lines run across the stations and carry the work. Entries from
 * content/log.ts hang off a line at their own date.
 *
 * Why a transit diagram rather than a map. Geography and time cannot share one
 * pair of axes without lying about one of them. A transit diagram drops exact
 * geography on purpose, the way every real one does, and keeps the thing that
 * matters: the order you travelled in and what happened at each stop. It also
 * handles two lines running at once, which is the honest way to show that an
 * overlapping research appointment is not a gap in employment.
 *
 * There is no continuous time axis here. See the layout note below for why.
 *
 * To add a station: append to `stations` in chronological order and give it a
 * code. To add work: append to content/log.ts. Nothing here needs touching for
 * ordinary updates.
 */

export type Station = {
  id: string
  /** Three letters, shown in mono on the diagram. */
  code: string
  city: string
  /** 'YYYY-MM' */
  start: string
  /** null means this is where the route currently ends. */
  end: string | null
  /** One line. What this stint was. */
  note: string
  /**
   * The headline for this station's screen. One sentence, display size.
   * It is the thing a visitor reads while arriving, so it has to carry the
   * stop on its own without the list underneath it.
   */
  claim: string
}

/** Chronological. The route is drawn in this order. */
export const stations: Station[] = [
  {
    id: 'buffalo',
    code: 'BUF',
    city: 'Buffalo',
    start: '2019-08',
    end: '2023-05',
    note: 'Studied computer science at Buffalo and started my first research work.',
    claim: 'Started measuring models before trusting their results',
  },
  {
    id: 'new-york-1',
    code: 'NYC',
    city: 'New York',
    start: '2023-06',
    end: '2026-04',
    note: 'Worked at CVS, then SentinelOne, then studied cybersecurity at NYU.',
    claim: 'Shipped software people used, then studied how attackers break in',
  },
  {
    id: 'san-francisco',
    code: 'SFO',
    city: 'San Francisco',
    start: '2026-05',
    end: '2026-08',
    note: 'Spent the summer at IBM and started working on agents.',
    claim: 'Six agents running while a room watched the telemetry',
  },
  {
    id: 'new-york-2',
    code: 'NYC',
    city: 'New York',
    start: '2026-08',
    end: null,
    note: 'Back in New York for IBM Client Engineering, NYU Osiris, and research.',
    claim: 'Building agent workflows and checks to catch their errors',
  },
]

export type Stint = {
  stationId: string
  org: string
  role: string
  start: string
  end: string | null
  /** Shown under the org when the work was not done where he was sitting. */
  remoteNote?: string
}

export type Line = {
  id: LineId
  label: string
  /** What this line is, in one sentence, for the legend. */
  summary: string
  stints: Stint[]
}

export const lines: Line[] = [
  {
    id: 'industry',
    label: 'Industry',
    summary: 'Shipping and delivering with clients.',
    stints: [
      {
        stationId: 'new-york-1',
        org: 'CVS Health',
        role: 'Software Engineer II, Application Delivery and Reliability',
        start: '2023-06',
        end: '2025-01',
      },
      {
        stationId: 'new-york-1',
        org: 'SentinelOne',
        role: 'Partner Solution Engineer',
        start: '2025-05',
        end: '2026-01',
      },
      {
        stationId: 'new-york-1',
        org: 'IBM',
        role: 'AI Forward Deployed Engineer, Client Engineering',
        start: '2026-01',
        end: '2026-04',
      },
      {
        stationId: 'san-francisco',
        org: 'IBM',
        role: 'AI Forward Deployed Engineer, Client Engineering',
        start: '2026-05',
        end: '2026-08',
      },
      {
        stationId: 'new-york-2',
        org: 'IBM',
        role: 'AI Forward Deployed Engineer, Client Engineering',
        start: '2026-08',
        end: null,
      },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    summary: 'Measuring things before trusting them.',
    stints: [
      {
        stationId: 'buffalo',
        org: 'University at Buffalo',
        role: 'NLP Research Assistant',
        start: '2020-03',
        end: '2022-05',
      },
      {
        stationId: 'new-york-1',
        org: 'New York University',
        role: 'Graduate Research Assistant',
        start: '2025-01',
        end: '2026-01',
      },
      {
        stationId: 'new-york-1',
        org: 'Queen Mary University of London',
        role: 'Graduate Research Assistant, Multi-Agent Orchestration',
        start: '2026-01',
        end: '2026-04',
        remoteNote: 'Remote, from New York',
      },
      {
        stationId: 'san-francisco',
        org: 'Queen Mary University of London',
        role: 'Graduate Research Assistant, Multi-Agent Orchestration',
        start: '2026-05',
        end: '2026-08',
        remoteNote: 'Remote, from San Francisco',
      },
      {
        stationId: 'new-york-2',
        org: 'Queen Mary University of London',
        role: 'Graduate Research Assistant, Multi-Agent Orchestration',
        start: '2026-08',
        end: null,
        remoteNote: 'Remote, from New York',
      },
      {
        stationId: 'new-york-2',
        org: 'NYU Osiris Lab',
        role: 'Research Project Member',
        start: '2026-10',
        end: null,
      },
    ],
  },
]

// ── layout ───────────────────────────────────────────────────────────────────
/*
 * The route has no linear time axis, on purpose.
 *
 * Ten of the seventeen entries land in the last two months. On a linear scale
 * four empty years would eat most of the width and the recent work would pile
 * into a few pixels. Distorting a continuous axis to fix that would be a lie
 * about the scale.
 *
 * So there is no continuous scale to lie about. Stations get slots sized by how
 * much happened at them, entries spread evenly inside their station's slot in
 * date order, and left-to-right carries the ordering. That is how every transit
 * map works: distance is discarded, sequence is preserved, and each station
 * carries its own dates so nothing is hidden.
 */

/** Width weight for a station: a base slot plus room for what happened there. */
const slotWeight = (stationId: string) => 1 + entriesAtStationCount(stationId)

function entriesAtStationCount(stationId: string) {
  return log.filter((e) => e.station === stationId).length
}

export type Slot = { id: string; start: number; end: number }

/** Station slots across 0 to 1, sized by density. */
export const stationSlots = (): Slot[] => {
  const weights = stations.map((s) => slotWeight(s.id))
  const total = weights.reduce((a, b) => a + b, 0)
  let cursor = 0
  return stations.map((s, i) => {
    const w = weights[i] / total
    const slot = { id: s.id, start: cursor, end: cursor + w }
    cursor += w
    return slot
  })
}

/**
 * Position of every entry along the route, 0 to 1.
 *
 * Entries inside a station are ordered by date, then spread across the inner
 * part of that station's slot so marks never collide. Entries sharing a month
 * still get distinct positions, which is the point.
 */
export const entryPositions = (): Map<string, number> => {
  const slots = new Map(stationSlots().map((s) => [s.id, s]))
  const out = new Map<string, number>()

  for (const station of stations) {
    const slot = slots.get(station.id)!
    const here = log
      .filter((e) => e.station === station.id)
      .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id))

    // Keep marks off the slot edges so they never sit on a station label.
    const pad = (slot.end - slot.start) * 0.16
    const from = slot.start + pad
    const to = slot.end - pad
    here.forEach((e, i) => {
      const t = here.length === 1 ? 0.5 : i / (here.length - 1)
      out.set(e.id, from + (to - from) * t)
    })
  }
  return out
}

/**
 * How far along the route each line actually runs.
 *
 * Drawing both lines edge to edge would say Ahamed had an industry job in
 * Buffalo, which he did not. A transit line stops where it stops. The line
 * begins at the slot of its earliest stint and reaches the live edge only if
 * one of its stints is still open.
 */
export const lineExtent = (id: LineId): { from: number; to: number } => {
  const slots = new Map(stationSlots().map((s) => [s.id, s]))
  const line = lines.find((l) => l.id === id)
  if (!line || line.stints.length === 0) return { from: 0, to: 1 }

  const used = line.stints.map((st) => slots.get(st.stationId)!).filter(Boolean)
  const from = Math.min(...used.map((s) => s.start))
  const open = line.stints.some((st) => st.end === null)
  const to = open ? 1 : Math.max(...used.map((s) => s.end))
  return { from, to }
}

/**
 * Where a station's LABEL sits: the middle of its slot.
 *
 * Anchoring labels to the slot start puts two of them within a few pixels of
 * each other wherever a short stint follows a long one, and it drifts the label
 * away from the marks it is naming. The middle does neither.
 */
export const stationCenters = (): Map<string, number> => {
  const out = new Map<string, number>()
  for (const s of stationSlots()) out.set(s.id, (s.start + s.end) / 2)
  return out
}

/**
 * Where the route changes city: the start of each slot after the first.
 *
 * The first station has no boundary before it because nothing precedes it.
 */
export const stationBoundaries = (): { id: string; pos: number }[] =>
  stationSlots()
    .slice(1)
    .map((s) => ({ id: s.id, pos: s.start }))

// ── derived helpers ──────────────────────────────────────────────────────────

export const stationById = (id: string) => stations.find((s) => s.id === id)
export const lineById = (id: LineId) => lines.find((l) => l.id === id)

/** Entries on a line, in date order. */
export const entriesOnLine = (id: LineId): LogEntry[] =>
  log.filter((e) => e.line === id).sort((a, b) => a.date.localeCompare(b.date))

/** Entries that landed at a station, in date order. */
export const entriesAtStation = (stationId: string): LogEntry[] =>
  log.filter((e) => e.station === stationId).sort((a, b) => a.date.localeCompare(b.date))

/** Stints at a station, for the station panel. */
export const stintsAtStation = (stationId: string): (Stint & { line: LineId })[] =>
  lines.flatMap((l) =>
    l.stints.filter((s) => s.stationId === stationId).map((s) => ({ ...s, line: l.id })),
  )

export const formatMonth = (ym: string): string => {
  const [y, m] = ym.split('-').map(Number)
  const name = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ][m - 1]
  return `${name} ${y}`
}

export const formatRange = (start: string, end: string | null): string =>
  `${formatMonth(start)} to ${end ? formatMonth(end) : 'now'}`

/** Years only. The diagram has room for this and not for the full range. */
export const formatYearRange = (start: string, end: string | null): string => {
  const a = start.split('-')[0]
  const b = end ? end.split('-')[0] : 'now'
  return a === b ? a : `${a}\u2013${b}`
}
