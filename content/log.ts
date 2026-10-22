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
    title: 'Finding topics in news with LDA',
    readout:
      'Pulled news articles through the Media Cloud API, ran gensim LDA, and used pyLDAvis to view the topics. The code is public.',
    href: 'https://github.com/ahamedfo/MediaCloudAPI',
    lenses: ['constraints'],
  },
  {
    id: 'ub-bert',
    date: '2021-09',
    line: 'research',
    station: 'buffalo',
    status: 'shipped',
    title: 'BERT sentiment checks across 28,000 posts',
    readout:
      'Fine-tuned BERT on roughly 28,000 social posts to sort sentiment and separate left and right leaning views on the same topics.',
    lenses: ['constraints', 'verification'],
  },
  {
    id: 'ub-teaching',
    date: '2019-09',
    line: 'research',
    station: 'buffalo',
    status: 'shipped',
    title: 'Teaching assistant for three CS courses',
    readout:
      'Ran review hours and labs and graded Scala for CSE 116, 220 and 191 over nearly three years. Explained code to students still learning it, every week, for three years.',
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
      'Shipped a scheduling flow as stakeholder and access needs changed, then took on-call shifts to keep it running.',
    lenses: ['verification', 'delivery'],
  },
  {
    id: 'security-plus',
    date: '2025-01',
    line: 'industry',
    station: 'new-york-1',
    status: 'shipped',
    title: 'Security+',
    readout: 'Covered security basics through CompTIA certification while working on a product people relied on.',
    lenses: ['security'],
  },
  {
    id: 'cissp',
    date: '2025-06',
    line: 'industry',
    station: 'new-york-1',
    status: 'shipped',
    title: 'CISSP',
    readout: 'Five months after Security+, earned the Certified Information Systems Security Professional credential while studying for the MS at NYU.',
    lenses: ['security'],
  },
  {
    id: 'ransomware-intelligence',
    date: '2025-06',
    line: 'research',
    station: 'new-york-1',
    status: 'shipped',
    title: 'How ransomware groups make money',
    readout:
      'Researched how groups work with affiliates, make money, and hide who is behind an attack. The work focused on threat intelligence.',
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
      'Turned GenAI threat detection and cloud risk into a game people could play. The conference drew 40,000+; roughly 400 played, based on my own estimate.',
    lenses: ['security', 'delivery'],
  },
  {
    id: 'partner-enablement',
    date: '2025-10',
    line: 'industry',
    station: 'new-york-1',
    status: 'shipped',
    title: 'Certification paths for a 2,200+ partner ecosystem',
    readout:
      'Mapped out training paths and reviewed technical content for the partner network. The count refers to the network’s size, not how many people I trained.',
    lenses: ['delivery', 'security'],
  },

  // ── San Francisco, the IBM summer ──────────────────────────────────────────
  {
    id: 'workplace-assistant',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'Six-agent workplace assistant with live system stats',
    readout:
      'Put HR, procurement, and IT behind one entry point. People in the room could watch latency, token use, and failures as it ran.',
    href: '/work/workplace-assistant',
    lenses: ['orchestration', 'verification', 'judgment', 'delivery'],
  },
  {
    id: 'business-case-award',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'shipped',
    title: 'Team award for Best Business Case',
    readout:
      'Shared the award with two colleagues at an intern and co-op event, judged on the ROI case. The award document leaves the winning project unnamed.',
    lenses: ['delivery'],
  },

  {
    id: 'skill-packs',
    date: '2026-06',
    line: 'industry',
    station: 'san-francisco',
    status: 'shipped',
    title: 'Reusable skill packs for client engineers',
    readout:
      'Packaged setup steps, safety rules, and ways to work with platforms the team kept learning again. Engineers could use those packs when starting an engagement.',
    lenses: ['delivery', 'orchestration'],
  },
  {
    id: 'coding-assistant-benchmark',
    date: '2026-06',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'Comparing coding assistant costs and code quality',
    readout:
      'Led a comparison of Claude Code, GitHub Copilot and IBM Bob on the same work, checking what each cost and how well each did.',
    lenses: ['verification', 'constraints'],
  },
  {
    id: 'token-cost-dashboard',
    date: '2026-06',
    line: 'industry',
    station: 'san-francisco',
    status: 'research',
    title: 'Tracking token costs over time',
    readout:
      'Built an MVP with Planning Analytics to project model usage costs over time.',
    lenses: ['verification', 'constraints'],
  },
  {
    id: 'confluent-lab',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'shipped',
    title: 'Confluent and Kafka lab built from scratch',
    readout:
      'Learned the streaming platform from scratch and built a hands-on lab the team could run. The policy-hook work started here.',
    lenses: ['delivery', 'orchestration'],
  },
  {
    id: 'intake-pipeline',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'Drafting workshop plans during discovery calls',
    readout:
      'The tool drafts a workshop agenda during a discovery call, then pulls out the whiteboard output after the workshop.',
    lenses: ['delivery', 'orchestration'],
  },
  {
    id: 'subagent-orchestrator',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'A coordinator that assigns work to sub-agents',
    readout:
      'Demoed a coordinator handing tasks to sub-agents inside the team. It explores the same question about sharing work as the Queen Mary research, at a much smaller scale.',
    lenses: ['orchestration'],
  },

  {
    id: 'promptroi',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'PromptROI helps people write better prompts',
    readout:
      'Built an agent for an internal hackathon that coaches people on their prompts. It is separate from the team award that summer, whose document leaves the project unnamed.',
    lenses: ['orchestration', 'delivery'],
  },
  {
    id: 'langgraph-qc',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'demo',
    title: 'LangGraph agents that check work',
    readout:
      'Built a quality-control system on watsonx Orchestrate where agents check the work other agents produce.',
    lenses: ['orchestration', 'verification'],
  },
  {
    id: 'enablement-labs',
    date: '2026-07',
    line: 'industry',
    station: 'san-francisco',
    status: 'shipped',
    title: 'Hands-on agent labs for non-specialists',
    readout:
      'Wrote labs that helped people who do not build agents for a living run an agent workflow themselves.',
    lenses: ['delivery'],
  },

  // ── New York, back again ───────────────────────────────────────────────────
  {
    id: 'streaming-policy-demo',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'A policy hook that blocked a delete',
    readout:
      'An agent tried to delete something, and the user confirmed, but the hook blocked it and logged the attempt and refusal. That check alone does not prove sandbox security.',
    href: '/work/streaming-policy-demo',
    lenses: ['orchestration', 'verification', 'judgment', 'delivery', 'security'],
  },
  {
    id: 'document-gis-validation',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Checking scanned deeds with geometry',
    readout:
      'Used two custom MCP tools to turn scanned deeds into mapped parcels. A closure test outside the model’s control checks whether the geometry is consistent, not whether the parcel is in the right place.',
    href: '/work/document-gis-validation',
    lenses: ['orchestration', 'verification', 'delivery'],
  },
  {
    id: 'access-workflow',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Access pilot built with client engineers',
    readout:
      'Co-created the pilot with client engineers, who could reach the environment it needed to run in. Supported a renewal the whole team earned.',
    href: '/work/access-workflow',
    lenses: ['orchestration', 'judgment', 'delivery', 'security'],
  },
  {
    id: 'curriculum-review',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Checking teaching materials against state standards',
    readout:
      'The tool compares teaching materials with changing state standards so an educator can check the findings. Feedback was positive.',
    lenses: ['judgment', 'delivery', 'verification'],
  },
  {
    id: 'budget-workflow',
    date: '2026-09',
    line: 'industry',
    station: 'new-york-2',
    status: 'shipped',
    title: 'Combining budget documents into a working flow',
    readout:
      'Worked on a team taking a budget workflow from prototype to something the client could run. A September review reported it live.',
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
      'Compared 87 configurations on the same 1,000 questions. Keeping the planner precise beat making it bigger; the manuscript is drafted.',
    href: '/research',
    lenses: ['orchestration', 'verification', 'constraints'],
  },
  {
    id: 'hr-classification',
    date: '2026-10',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Checking classification agents against human-reviewed reports',
    readout:
      'Compared agent approaches with reports a human reviewer had signed off. Found that results changed with the prompt and across runs on the same input.',
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
      'Walked through IBM i and RPG live: capture, diagnose, repair, compile, test, and document. When the tools failed partway through, I worked around it live.',
    lenses: ['delivery', 'security', 'orchestration'],
  },
  {
    id: 'developer-enablement',
    date: '2026-10',
    line: 'industry',
    station: 'new-york-2',
    status: 'demo',
    title: 'Office hours on using coding agents',
    readout:
      'Took part in office hours on developer access, guardrails, and fitting a coding agent into a team’s review process.',
    lenses: ['delivery', 'security'],
  },
  {
    id: 'osiris-monitoring',
    date: '2026-10',
    line: 'research',
    station: 'new-york-2',
    status: 'research',
    title: 'Placing human checks in network monitoring',
    readout:
      'Scoped where a person should check an agent’s work in a network monitoring loop built on Zeek and Suricata.',
    href: '/research#osiris-monitoring',
    lenses: ['judgment', 'security'],
  },
]

/** Newest first. The NOW edge sits at the first of these. */
export const logByRecency = [...log].sort((a, b) => b.date.localeCompare(a.date))

export const latestDate = logByRecency[0]?.date ?? '2026-10'

export const entryById = (id: string) => log.find((e) => e.id === id)
