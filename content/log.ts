/**
 * THE LOG. This is the file you append to.
 *
 * Every entry here becomes one mark on the route: an agent picks it up and
 * carries it to the station where it happened. Add an object, push, and the
 * board rebuilds with the NOW edge moved to the newest date.
 *
 * Nothing else needs editing. The diagram derives its time axis, its station
 * contents, its filters, and its readout from this array.
 *
 * Minimum viable entry:
 *
 *   {
 *     id: 'short-stable-slug',
 *     date: '2026-11',
 *     line: 'industry',
 *     station: 'new-york-2',
 *     status: 'demo',
 *     title: 'One line, sentence case',
 *     readout: 'Two sentences at most. This is what shows when someone hovers.',
 *   }
 *
 * Optional: `href` if it has a page of its own, `lenses` to put it under a
 * capability filter.
 *
 * Status is a SHAPE on the diagram, not just a colour, so it stays readable in
 * grayscale and under colour-vision deficiency:
 *
 *   shipped   solid mark     delivered, deployed, completed
 *   demo      ring           a working demonstration or a pilot
 *   research  dotted ring    in progress, scoping, drafted
 *
 * There used to be a fourth, `held`, rendering as "Not established". It was
 * removed: a portfolio that labels its own entries as failures is not being
 * honest, it is arguing against itself. Accuracy belongs in how the readout
 * describes the work. The limitations record lives in the private notes.
 */

export type LineId = 'industry' | 'research'
export type EntryStatus = 'shipped' | 'demo' | 'research'

export type LogEntry = {
  /** Stable. Matches a case study id when there is a page for it. */
  id: string
  /** 'YYYY-MM'. Month granularity is deliberate: a portfolio does not need days. */
  date: string
  line: LineId
  /** A station id from content/route.ts. */
  station: string
  status: EntryStatus
  title: string
  /** What the readout says on hover or focus. Two sentences at most. */
  readout: string
  href?: string
  /** Capability ids from content/lenses.ts, used by the route filters. */
  lenses?: string[]
}

export const log: LogEntry[] = [
  // ── Buffalo ────────────────────────────────────────────────────────────────
  {
    id: 'ub-nlp',
    date: '2021-03',
    line: 'research',
    station: 'buffalo',
    status: 'shipped',
    title: 'LDA topic modelling over a news corpus',
    readout:
      'Pulled articles through the Media Cloud API and ran gensim LDA over them, with pyLDAvis to actually look at the topics. The code is public.',
    href: 'https://github.com/ahamedfo/MediaCloudAPI',
    lenses: ['constraints'],
  },
  {
    id: 'ub-bert',
    date: '2021-09',
    line: 'research',
    station: 'buffalo',
    status: 'shipped',
    title: 'BERT sentiment classification across 28,000 posts',
    readout:
      'Fine-tuned BERT for sentiment on roughly 28,000 social posts, used to separate left and right leaning perspectives on the same topics.',
    lenses: ['constraints', 'verification'],
  },
  {
    id: 'ub-teaching',
    date: '2019-09',
    line: 'research',
    station: 'buffalo',
    status: 'shipped',
    title: 'Teaching assistant, three CS courses',
    readout:
      'CSE 116, 220 and 191 over nearly three years. Review hours, labs, grading Scala. Explaining a technical thing to someone who does not have it yet, every week, for three years.',
    href: '/#teaching',
    lenses: ['delivery'],
  },

  // ── New York, first stint ──────────────────────────────────────────────────
  {
    id: 'cvs-coverage',
    date: '2024-03',
    line: 'industry',
    station: 'new-york-1',
    status: 'shipped',
    title: 'Vaccination scheduling, test coverage 20% to 80%',
    readout:
      'Shipping a user-facing scheduling flow under changing stakeholder and accessibility requirements, then carrying the pager for it.',
    lenses: ['verification', 'delivery'],
  },
  {
    id: 'security-plus',
    date: '2025-01',
    line: 'industry',
    station: 'new-york-1',
    status: 'shipped',
    title: 'Security+',
    readout: 'CompTIA Security+. The foundations, formally, while working on a product people depended on.',
    lenses: ['security'],
  },
  {
    id: 'cissp',
    date: '2025-06',
    line: 'industry',
    station: 'new-york-1',
    status: 'shipped',
    title: 'CISSP',
    readout: 'Certified Information Systems Security Professional. Five months after Security+, alongside the MS at NYU.',
    lenses: ['security'],
  },
  {
    id: 'ransomware-intelligence',
    date: '2025-06',
    line: 'research',
    station: 'new-york-1',
    status: 'shipped',
    title: 'How ransomware groups actually operate',
    readout:
      'Affiliate structures, monetization, and the attribution problem. Research and threat intelligence, not incident response.',
    href: '/research#ransomware-intelligence',
    lenses: ['security'],
  },
  {
    id: 'reinvent-game',
    date: '2025-12',
    line: 'industry',
    station: 'new-york-1',
    status: 'shipped',
    title: 'Security training game at AWS re:Invent',
    readout:
      'GenAI threat detection and cloud risk as an interactive game. The conference drew 40,000+; roughly 400 played, which is my own estimate.',
    lenses: ['security', 'delivery'],
  },
  {
    id: 'partner-enablement',
    date: '2025-10',
    line: 'industry',
    station: 'new-york-1',
    status: 'shipped',
    title: 'Certification pathways for a 2,200+ partner ecosystem',
    readout:
      'Enablement framework and technical content audit. That is the size of the ecosystem it served, not a count of people I trained.',
    lenses: ['delivery', 'security'],
  },

  // ── San Francisco, the IBM summer ──────────────────────────────────────────
  {
    id: 'workplace-assistant',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'Six-agent workplace assistant, control plane in view',
    readout:
      'HR, procurement, and IT behind one entry point, built so the room could watch latency, tokens, and failures while it ran.',
    href: '/work/workplace-assistant',
    lenses: ['orchestration', 'verification', 'judgment', 'delivery'],
  },
  {
    id: 'business-case-award',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'shipped',
    title: 'Best Business Case, team award',
    readout:
      'A category award at an intern and co-op event, judged on the ROI story. Shared with two colleagues. The document does not name the winning project.',
    lenses: ['delivery'],
  },

  {
    id: 'skill-packs',
    date: '2026-06',
    line: 'industry',
    station: 'san-francisco',
    status: 'shipped',
    title: 'Reusable skill packs for the client engineering team',
    readout:
      'Packaged setup, safety rules and working modes for platforms the team kept re-learning, so an engineer starting an engagement did not start from nothing.',
    lenses: ['delivery', 'orchestration'],
  },
  {
    id: 'coding-assistant-benchmark',
    date: '2026-06',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'Cost and quality comparison across coding assistants',
    readout:
      'Led a comparison of what the same work costs, and how well it lands, across Claude Code, GitHub Copilot and IBM Bob.',
    lenses: ['verification', 'constraints'],
  },
  {
    id: 'token-cost-dashboard',
    date: '2026-06',
    line: 'industry',
    station: 'san-francisco',
    status: 'research',
    title: 'Token cost dashboard',
    readout:
      'An MVP for projecting what model usage costs over time, built against Planning Analytics.',
    lenses: ['verification', 'constraints'],
  },
  {
    id: 'confluent-lab',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'shipped',
    title: 'Confluent and Kafka lab, built from scratch',
    readout:
      'Learned a streaming platform I had no background in and turned it into a hands-on lab the rest of the team could run. This is where the policy-hook work started.',
    lenses: ['delivery', 'orchestration'],
  },
  {
    id: 'intake-pipeline',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'Intake-to-demo pipeline tool',
    readout:
      'Every engagement turns a discovery call into a workshop agenda by hand. This drafts it during the call, then pulls the whiteboard output back out afterwards.',
    lenses: ['delivery', 'orchestration'],
  },
  {
    id: 'subagent-orchestrator',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'Sub-agent orchestrator',
    readout:
      'A coordinator handing work to sub-agents, demoed internally. The same coordination question the Queen Mary research measures, on a much smaller scale.',
    lenses: ['orchestration'],
  },

  {
    id: 'promptroi',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'PromptROI, a prompt-coaching agent',
    readout:
      'Built for an internal hackathon. It coaches a prompt rather than answering it. Not connected to the team award that summer; that document does not name a project.',
    lenses: ['orchestration', 'delivery'],
  },
  {
    id: 'langgraph-qc',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'LangGraph multi-agent quality control',
    readout:
      'A quality-control system on watsonx Orchestrate, with agents checking work rather than only producing it.',
    lenses: ['orchestration', 'verification'],
  },
  {
    id: 'enablement-labs',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'shipped',
    title: 'Hands-on labs for non-specialists',
    readout:
      'Wrote labs that let people who do not build agents for a living get an agentic workflow running themselves. The teaching job, again, with a different syllabus.',
    lenses: ['delivery'],
  },

  // ── New York, back again ───────────────────────────────────────────────────
  {
    id: 'streaming-policy-demo',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'A policy hook that said no',
    readout:
      'An agent tried to delete something. The user confirmed. The hook blocked it anyway and logged both the attempt and the refusal.',
    href: '/work/streaming-policy-demo',
    lenses: ['orchestration', 'verification', 'judgment', 'delivery', 'security'],
  },
  {
    id: 'document-gis-validation',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Checking a vision model against geometry',
    readout:
      'Scanned deeds to mapped parcels through two custom MCP tools, with a closure test the model has no influence over.',
    href: '/work/document-gis-validation',
    lenses: ['orchestration', 'verification', 'delivery'],
  },
  {
    id: 'access-workflow',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'An access pilot we could not log into',
    readout:
      'Co-created with the client engineers because our team had no access to the environment it had to run in. Supported a renewal the whole team earned.',
    href: '/work/access-workflow',
    lenses: ['orchestration', 'judgment', 'delivery', 'security'],
  },
  {
    id: 'curriculum-review',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Standards review an educator can check',
    readout:
      'Compares changing state standards against teaching materials. Feedback was positive. No measured time saving and no rollout.',
    lenses: ['judgment', 'delivery', 'verification'],
  },
  {
    id: 'budget-workflow',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'shipped',
    title: 'Budget document consolidation workflow',
    readout:
      'Worked on a team carrying a budget-consolidation workflow from prototype to something the client could run. A September review reported it live.',
    lenses: ['delivery', 'judgment'],
  },
  {
    id: 'quantized-agents',
    date: '2026-09',
    line: 'research',
    station: 'new-york-2',
    status: 'research',
    title: 'Quantization across four agent architectures',
    readout:
      '87 configurations on the same 1,000 questions. Keeping the planner precise beat making it bigger. Manuscript drafted, not submitted.',
    href: '/research',
    lenses: ['orchestration', 'verification', 'constraints'],
  },
  {
    id: 'hr-classification',
    date: '2026-10',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Evaluating classification agents',
    readout:
      'Compared agent approaches against reports a human reviewer had already signed off, and found where they diverged: prompt sensitivity, and run-to-run drift on identical input.',
    lenses: ['verification', 'judgment', 'constraints', 'delivery'],
  },
  {
    id: 'legacy-modernization',
    date: '2026-10',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Coding agent on a 40-year-old codebase',
    readout:
      'Live IBM i and RPG walkthrough: capture, diagnose, repair, compile, test, document. Tooling failed partway and I worked around it live.',
    lenses: ['delivery', 'security', 'orchestration'],
  },
  {
    id: 'developer-enablement',
    date: '2026-10',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Office hours on agent adoption',
    readout:
      'Development access, guardrails, and fitting a coding agent to a team that already has review practices. Participation, not authorship.',
    lenses: ['delivery', 'security'],
  },
  {
    id: 'osiris-monitoring',
    date: '2026-10',
    line: 'research',
    station: 'new-york-2',
    status: 'research',
    title: 'Human-in-the-loop network monitoring',
    readout:
      'Where the person belongs in an agent-driven monitoring loop, on a Zeek and Suricata stack. Scoping. No harness, no result.',
    href: '/research#osiris-monitoring',
    lenses: ['judgment', 'security'],
  },
]

/** Newest first. The NOW edge sits at the first of these. */
export const logByRecency = [...log].sort((a, b) => b.date.localeCompare(a.date))

export const latestDate = logByRecency[0]?.date ?? '2026-10'

export const entryById = (id: string) => log.find((e) => e.id === id)
