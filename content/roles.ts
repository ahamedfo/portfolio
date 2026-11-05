/**
 * PUBLIC CONTENT. Roles and research positions.
 *
 * Titles, dates, and locations come from the current resume. The previous
 * version of this site carried different dates, a different IBM location, and
 * broader claims. The resume wins.
 *
 * `kind` separates industry roles from research positions so an overlapping
 * research appointment never reads as a gap between jobs.
 */

export type Role = {
  id: string
  org: string
  title: string
  location: string
  period: string
  /** ISO start, for ordering only. */
  start: string
  kind: 'industry' | 'research'
  current: boolean
  bullets: string[]
  /** Case study ids to read next, if any. */
  seeAlso?: string[]
}

export const roles: Role[] = [
  {
    id: 'ibm',
    org: 'IBM',
    title: 'AI Forward Deployed Engineer, Client Engineering',
    location: 'New York, NY',
    period: 'January 2026 to present',
    start: '2026-01-01',
    kind: 'industry',
    current: true,
    bullets: [
      'Build agent workflows with enterprise clients, from the first discovery conversation through the build and the demo in front of their team.',
      'Put checks around agent behaviour: enforced policy hooks on tool calls, deterministic validation of extracted data, governance telemetry, and evaluation against human-approved output.',
      'Write the handoff material, so a system I built can be run and presented by someone else.',
    ],
    seeAlso: ['workplace-assistant', 'streaming-policy-demo', 'access-workflow', 'document-gis-validation'],
  },
  {
    id: 'queen-mary',
    org: 'Queen Mary University of London',
    title: 'Graduate Research Assistant, Multi-Agent Orchestration',
    location: 'Remote',
    period: 'May 2026 to present',
    start: '2026-05-01',
    kind: 'research',
    current: true,
    bullets: [
      'Multi-agent orchestration and knowledge sharing research for KUber, a UKRI-EPSRC funded project involving IBM Research, Nokia Bell Labs, and Samsung AI.',
      'Benchmarked LLM quantization across four agent architectures and 87 configurations on the same 1,000 MuSiQue questions, comparing 9B and 27B models and planner/executor precision. Manuscript drafted.',
    ],
  },
  {
    id: 'nyu-osiris',
    org: 'New York University, Osiris Lab',
    title: 'Research Project Member',
    location: 'New York, NY',
    period: 'October 2026 to present',
    start: '2026-10-01',
    kind: 'research',
    current: true,
    bullets: [
      'Human-in-the-loop agentic network monitoring using Zeek and Suricata. Project scoping in progress.',
    ],
  },
  {
    id: 'sentinelone',
    org: 'SentinelOne',
    title: 'Partner Solution Engineer',
    location: 'New York, NY',
    period: 'May 2025 to January 2026',
    start: '2025-05-01',
    kind: 'industry',
    current: false,
    bullets: [
      'Built an interactive security training game for AWS re:Invent covering GenAI threat detection, cloud risk, buyer scenarios, and attack modeling. The conference drew more than 40,000 attendees; roughly 400 of them played the game, which is my own estimate rather than a measured figure.',
      'Designed ROI-focused security demonstrations mapped to compliance requirements, and co-architected a modular framework for visualising cloud misconfiguration risk.',
      'Built certification pathways and an enablement framework serving a partner ecosystem of more than 2,200 partners. That is the size of the ecosystem the framework served, not a count of people I trained personally.',
    ],
  },
  {
    id: 'cvs',
    org: 'CVS Health',
    title: 'Software Engineer II, Application Delivery and Reliability',
    location: 'New York, NY',
    period: 'June 2023 to January 2025',
    start: '2023-06-01',
    kind: 'industry',
    current: false,
    bullets: [
      'Developed and tested vaccination-scheduling interface updates against changing stakeholder requirements and accessibility requirements, in a regulated healthcare environment. Raised automated test coverage from 20% to 80%.',
      'Monitored application health with Splunk, and supported CI/CD, Helm deployments, canary releases, and on-call troubleshooting.',
      'This is where the habit came from. Shipping something people depend on, then being the person who gets paged when it misbehaves, teaches you to want a check in front of anything you cannot personally watch.',
    ],
  },
  {
    id: 'nyu-prior',
    org: 'New York University',
    title: 'Graduate Research Assistant',
    location: 'New York, NY',
    period: 'January 2025 to January 2026',
    start: '2025-01-01',
    kind: 'research',
    current: false,
    bullets: [
      'Analysed ransomware tactics, affiliate models, monetization, and attribution to inform cyber risk mitigation.',
    ],
  },
]

export const industryRoles = roles.filter((r) => r.kind === 'industry')
export const researchRoles = roles.filter((r) => r.kind === 'research')
