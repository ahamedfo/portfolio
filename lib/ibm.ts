/**
 * IBM Client Engineering, summer 2026.
 *
 * THE WORDING IS A FIRST PASS AND NEEDS AHAMED'S EDIT. Most facts trace to
 * "Ahamed - Summer 2026 Full Project Breakdown.md", which is itself evidence-keyed.
 * Two do not and came directly from Ahamed: first place out of 30 teams in the
 * internal hackathon, and the $350k pursuit.
 *
 * Framing: what was built and delivered. Not debugging narratives, not lists of
 * things that went wrong.
 *
 * Deliberately excluded from this public page:
 *   - client names (described by industry or scale instead)
 *   - internal ticket numbers, instance UUIDs, hostnames, github.ibm.com paths
 *   - colleague and client-contact names
 *   - client business-case figures
 *   - every claim the source document marks as unsupported
 */

export const ibmMeta = {
  org: 'IBM',
  team: 'Client Engineering',
  role: 'AI Engineer, Client Engineering',
  period: 'May 2026 - August 2026',
  location: 'San Francisco, CA',
}

export const ibmIntro = [
  `Client Engineering builds working proofs for enterprise clients on a short clock. An ambiguous business problem arrives on a call, and what is owed back is a running system and a demo that holds up in front of the client.`,

  `I worked across ten engagements in commercial real estate, utilities, pharmaceuticals, logistics, manufacturing and state government, and led several of them end to end from discovery through the client presentation.`,
]

export type Highlight = {
  id: string
  title: string
  /** Industry or scale, never the client name. */
  context: string
  body: string[]
}

export const ibmHighlights: Highlight[] = [
  {
    id: 'workplace-assistant',
    title: 'Designed and delivered a seven-agent enterprise workplace assistant',
    context: 'Commercial real estate client',
    body: [
      `An orchestrator coordinating six specialist agents on watsonx Orchestrate, covering employee onboarding, HR policy, procurement, IT service management, escalation and recruiting. It spanned five enterprise systems, answered policy questions from real documents with citations, and wrote back to the systems of record rather than only reading from them.`,

      `I owned it end to end: the architecture, all seven agents, the deployment automation and the demo. The demo ran live rather than on rails, so every response was genuinely generated in front of the audience.`,

      `It advanced a $350k client pursuit. I later produced a de-branded version of the same system so it could be shown to a second audience.`,
    ],
  },
  {
    id: 'promptroi',
    title: 'Won first place out of 30 teams in IBM’s internal hackathon',
    context: 'PromptROI, cost and quality analytics',
    body: [
      `A platform that benchmarks what AI coding assistants actually cost and how well they perform, built against a question leadership had raised about proving the value of giving engineers model access.`,

      `The finding that carried it was concrete: the same task cost 2.5 times more depending on which assistant ran it, $0.41 against $1.05 per prompt.`,

      `Underneath it, a service that clusters prompts by meaning, scores output quality with a model-as-judge layer, and models return on investment, along with its own integration server. I led the team and split the work across it, and authored 57 of the 61 commits.`,
    ],
  },
  {
    id: 'easements',
    title: 'Led an engagement and delivered the demo end to end',
    context: 'One of the largest power supply companies in the US',
    body: [
      `The client held decades of easements as static scanned maps and plat drawings, with no way to place them on a map. I owned the engagement end to end: the discovery, the solution design, the build and the client presentation.`,

      `The system pulls a document from the client's content repository through a custom integration I wrote, reads the survey geometry out of the drawing with a vision model, validates the extraction, resolves the parcel against county records, and returns mapped geography their application can render directly.`,

      `Choosing the vision model was a controlled evaluation on a real client document rather than a benchmark comparison, which mattered because the models that score well in general were not the ones that read survey anchors correctly.`,

      `The engagement was delivered and led to a follow-on engagement with the same client. I also shipped a formal knowledge transfer package so the work could continue without me.`,
    ],
  },
  {
    id: 'state-government',
    title: 'Authored and delivered a half-day AI workshop for a state government',
    context: 'State government, delivered on site',
    body: [
      `A working session showing a state's technology teams what AI and agentic tooling could actually do for them. I wrote the full programme, mapped five concrete use cases to named agencies, and covered the security and compliance posture the audience needed before they would engage with any of it.`,

      `I presented the opening session on site to an audience of government staff who were mostly not developers, and built a working public-facing application live on stage in about ten minutes, from raw meeting notes to a running app, to make the capability real rather than described.`,

      `I also wrote the facilitator materials for the breakout groups and rehearsed the full session with my manager before travelling.`,
    ],
  },
  {
    id: 'modernization',
    title: 'Built customer-facing labs for legacy system modernization',
    context: 'Logistics and pharmaceutical clients',
    body: [
      `For a logistics client evaluating AI assistance on decades-old business systems, I built one of three hands-on labs: a billing application containing a realistic defect that quietly undercharged invoices. The lab ships with an answer key of before and after totals, so a participant proves the system is broken, fixes it in plain English, and re-proves correctness exactly.`,

      `For a pharmaceutical client with a large application portfolio, I built the demonstration for a Java modernization engagement. Their engineers were already advanced users of AI coding tools, so the demo had to answer a sharper question than whether a model can convert code. It showed where rule-based tooling handles the predictable work, where a model handles the judgment calls, and how a real build verifies the result.`,
    ],
  },
  {
    id: 'confluent',
    title: 'Shipped a Confluent and Kafka enablement toolkit for the team',
    context: 'Reusable team asset, streaming data',
    body: [
      `Ahead of a streaming data engagement I had no background in, I learned Confluent and Kafka from scratch and turned it into a distributable toolkit the rest of the team could pick up: skills, commands, safety rules, working modes, and a hands-on lab that builds a real-time monitoring pipeline end to end from a handful of prompts.`,

      `It covers both halves of the platform, the infrastructure setup in dependency order and the data-in-motion work, and documents the platform behaviours that are expensive to rediscover.`,
    ],
  },
  {
    id: 'ce-pipeline',
    title: 'Built an internal app that drafts workshop agendas during the discovery call',
    context: 'Internal tooling',
    body: [
      `Every engagement starts the same way: turn a discovery call into a client-ready workshop agenda by hand, then synthesise the workshop's whiteboard output afterwards. Both repeat on every engagement, so the time saved compounds.`,

      `The app captures what the seller shares on the first call and generates the agenda on that same call, then connects to the collaborative whiteboard afterwards to pull every item off the board and summarise the pain points, requirements, stakeholders and success criteria. It produced the real agenda and analysis for one of my own engagements.`,
    ],
  },
]
