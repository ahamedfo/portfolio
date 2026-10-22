/**
 * PUBLIC CONTENT. Featured case studies.
 *
 * To add a case study: append one object to `cases`. The id becomes the URL at
 * /work/<id>, the card on the home page, and the key that capability lenses and
 * testimonials point at. No layout code needs to change.
 *
 * Every field has one job:
 *   problem      what the client could not do before
 *   contribution what Ahamed personally did, stated separately from the result
 *   system       the architecture, step by step
 *   check        the thing that verifies the model instead of trusting it
 *   outcome      what changed, attributed to whoever earned it
 *   limits       what this work does NOT establish, in plain language
 *
 * `limits` is published on purpose. A reader who can see the boundary of a
 * claim can trust the rest of it.
 */

export type CaseStatus =
  | 'Working demo'
  | 'Client demo'
  | 'Client pilot'
  | 'Research in progress'
  | 'Team deployment'

export type Diagram = 'policy-hook' | 'document-gis' | 'agent-fleet' | null

export type CaseStudy = {
  /** Stable. Used in URLs, lens links, and testimonial links. */
  id: string
  title: string
  /** A few words. Used anywhere the full title would not fit. */
  shortTitle: string
  /** One line, reads as a sentence on the card. */
  blurb: string
  status: CaseStatus
  /** Sector and scale only. Never the client name. */
  client: string
  org: 'IBM'
  period: string
  problem: string[]
  contribution: string[]
  system: { step: string; detail: string }[]
  check: { title: string; body: string[] }
  outcome: string[]
  limits: string[]
  stack: string[]
  /** Capability lenses this case belongs to. See content/lenses.ts. */
  lenses: string[]
  diagram: Diagram
  featured: boolean
}

export const cases: CaseStudy[] = [
  {
    id: 'workplace-assistant',
    title: 'A six-agent workplace assistant, with the control plane in view',
    shortTitle: 'Six-agent workplace assistant',
    blurb:
      'Six agents covering HR, procurement, and IT workflows, built so the people watching could see latency, token use, and failures while it ran.',
    status: 'Working demo',
    client: 'Commercial real estate',
    org: 'IBM',
    period: '2026',
    problem: [
      'Employee questions at this company land in three different places. Policy questions go to HR, purchase requests go to procurement, access and device problems go to IT. A person asking a question does not know or care which queue they belong in, so requests bounce.',
      'The client wanted to know whether one assistant could route all of it, and whether they could tell what the assistant was doing while it did it.',
    ],
    contribution: [
      'I built the assistant on the watsonx Orchestrate agent development kit: six agents behind one entry point, each owning a workflow area, with the prompt flows tested rather than written once and demoed.',
      'I added governance telemetry so latency, token usage, and failures were visible per request instead of hidden inside the agent.',
      'I built the demo flows and wrote a walkthrough and architecture handoff so a colleague could present the same system without me in the room. That handoff was later reused.',
    ],
    system: [
      {
        step: 'One entry point',
        detail:
          'A request arrives in plain language. The routing layer decides which specialist agent owns it rather than asking the person to pick.',
      },
      {
        step: 'Six specialist agents',
        detail:
          'Each agent owns one workflow area and only the tools that area needs. Narrow tool scope is the point: an HR agent cannot reach a procurement action.',
      },
      {
        step: 'Grounded answers',
        detail:
          'Policy answers are drawn from documents rather than from model memory, so an answer can be traced back to the source a person can go read.',
      },
      {
        step: 'Governance telemetry',
        detail:
          'Every request records latency, token usage, and whether it failed. That readout was part of the demo, not a dashboard built afterwards.',
      },
    ],
    check: {
      title: 'Make the agent observable before you make it impressive',
      body: [
        'The reason the telemetry mattered is that a multi-agent assistant fails quietly. A request routed to the wrong agent still returns something confident. Without a per-request record of what ran, how long it took, and what it cost, nobody can tell a good answer from a lucky one.',
        'So the walkthrough showed the control plane next to the conversation. A reviewer could watch a request land, see which agent took it, and see what it spent.',
      ],
    },
    outcome: [
      'The demo supported an active client pursuit. I built and presented the system; the commercial outcome belongs to the account team.',
      'The handoff package I wrote was picked up and reused by a colleague for a separate audience, which was the point of writing it.',
    ],
    limits: [
      'This is a working demonstration, not a production rollout. The telemetry shown is demo control-plane data, not the client’s production traffic.',
      'Not every workflow was implemented. Role switching and single sign-on restrictions were not all built or demonstrable, and new-employee creation and some ticket lookups were untested.',
      'The six-agent scope is as built in the demo environment.',
    ],
    stack: ['watsonx Orchestrate ADK', 'Multi-agent routing', 'RAG over policy documents', 'Agent telemetry'],
    lenses: ['orchestration', 'verification', 'judgment', 'delivery'],
    diagram: 'agent-fleet',
    featured: true,
  },

  {
    id: 'streaming-policy-demo',
    title: 'Real-time operational intelligence for agents, with a policy hook that said no',
    shortTitle: 'Streaming intelligence and the policy hook',
    blurb:
      'Kafka and Flink pipelines feeding agents live operational data. Then an agent tried to delete something, the user said yes, and an enforced policy hook blocked it anyway.',
    status: 'Working demo',
    client: 'Energy and utilities',
    org: 'IBM',
    period: '2026',
    problem: [
      'Operations data at a utility moves constantly and lands in systems that were not built to answer questions. An agent that can only read yesterday’s export is not much use to someone watching today.',
      'So the first job was getting live operational data in front of the agents. The second job, which turned out to be the more interesting one, was deciding what those agents were allowed to do with it.',
    ],
    contribution: [
      'I integrated Confluent Kafka and Flink pipelines to feed agents real-time operational intelligence, including change data capture so the agents saw updates rather than snapshots.',
      'I built the custom agent and tool integration that let an agent query that stream and act on what it found.',
      'I configured the enforced policy hook at the development environment boundary that checks tool calls before they execute, blocks the ones that are not permitted, and writes an audit event either way.',
      'I presented the walkthrough. The presentation was shared with colleagues.',
    ],
    system: [
      {
        step: 'Change data capture',
        detail:
          'Operational changes are captured as they happen and published onto a stream rather than batched overnight.',
      },
      {
        step: 'Stream processing',
        detail:
          'Flink shapes and joins those events into something an agent can usefully ask about.',
      },
      {
        step: 'Agent with tools',
        detail:
          'The agent reads from the stream through a tool, and has write tools available for the actions it is supposed to be able to take.',
      },
      {
        step: 'Policy check before execution',
        detail:
          'Every tool call passes a policy check at the environment boundary. Permitted calls run. Blocked calls do not, and both outcomes are logged.',
      },
    ],
    check: {
      title: 'Why the confirmation prompt was not the control',
      body: [
        'During the walkthrough, an agent proposed a destructive deletion. The user was asked to confirm, and the user confirmed. The policy hook blocked it anyway and recorded the attempt.',
        'That gap is the whole lesson. A confirmation prompt asks a person to authorize an action they can only see described, in the middle of a task they are trying to finish, often with incomplete context about blast radius. People say yes. An approval prompt is a user interface, not a control.',
        'A policy check sits at the boundary where the action actually executes, and it does not care whether anyone said yes. It is the difference between asking permission and not having the permission.',
        'What I will not claim: one enforced hook in one development environment is not proof of sandbox security, prompt-injection resistance, or protection from every destructive action. It is evidence that this class of control belongs in the design, and that it is worth testing whether it holds when a user overrides it.',
      ],
    },
    outcome: [
      'The streaming integration worked end to end and the agents answered questions against live data.',
      'The blocked deletion became the part of the walkthrough people asked about, which is the right thing for a security control to be remembered for.',
    ],
    limits: [
      'This ran in a demonstration environment with demonstration data. It was not the operation of a live electric grid.',
      'Enforcement was observed at the development environment boundary in the configuration tested. That is not a general claim about bypass resistance.',
      'The interaction diagram on this page is a labeled reconstruction drawn to explain the sequence. It is not a replay of a recorded session or a live system trace.',
    ],
    stack: ['Confluent Kafka', 'Apache Flink', 'Change data capture', 'Custom agent tools', 'Enforced policy hook', 'Audit logging'],
    lenses: ['orchestration', 'verification', 'judgment', 'delivery', 'security'],
    diagram: 'policy-hook',
    featured: true,
  },

  {
    id: 'access-workflow',
    title: 'Co-creating an access-provisioning pilot we could not log into',
    shortTitle: 'Access-provisioning pilot',
    blurb:
      'An agentic access workflow built with the client’s own engineers, because our team never had access to the environment it had to run in.',
    status: 'Client pilot',
    client: 'Logistics and delivery technology',
    org: 'IBM',
    period: '2026',
    problem: [
      'Granting and cloning access permissions at this client was manual, repetitive, and slow, and the people doing it were the people least able to spare the time.',
      'There was a constraint that shaped everything: our team had restricted access to the client environment. We could not build it, test it, and hand it over. The client’s engineers had to be the ones with their hands on it.',
    ],
    contribution: [
      'I co-created the agentic access-provisioning workflow on watsonx Orchestrate with the client’s engineers, working through their environment rather than ours.',
      'I ran requirements and scoping discussions to turn a described workflow into steps that were actually implementable in their system.',
      'I co-authored step-by-step implementation guides so their team could carry the work without us in the call.',
    ],
    system: [
      {
        step: 'Requirements discovery',
        detail:
          'Sessions with the client’s engineers to establish what the manual process really does, including the parts that are not written down anywhere.',
      },
      {
        step: 'Workflow decomposition',
        detail:
          'Break the described process into steps an agent can take, with the decision points that need a human kept as decision points.',
      },
      {
        step: 'Co-creation in their environment',
        detail:
          'Build alongside their engineers in the tenant we could not reach, which means the knowledge lands with the people who keep it running.',
      },
      {
        step: 'Written implementation guides',
        detail:
          'Co-authored documentation covering the setup steps in order, so progress does not depend on a specific person being available.',
      },
    ],
    check: {
      title: 'Restricted access as a design constraint, not an obstacle',
      body: [
        'Not having access forced a better handoff than we would have written otherwise. Every step had to be explainable to someone else well enough that they could execute it without us watching.',
        'The thing being automated here is permission granting, which is exactly the kind of workflow where an agent should not quietly get more capable than anyone intended. Keeping the client’s engineers as the implementers kept the permission model theirs.',
      ],
    },
    outcome: [
      'The pilot and the implementation guidance moved the client’s team forward on their own infrastructure.',
      'The account team later credited this pilot work with supporting a client renewal. That outcome belongs to the whole team, including the client engineers who built in their own environment. I contributed the co-creation, the scoping, and the documentation.',
    ],
    limits: [
      'Shared credit. This was not a solo production implementation, and our team did not have direct access to the client tenant.',
      'Some capabilities discussed, including advanced permission editing, lock checking, and scheduling, were plans or in-progress work rather than completed features.',
      'I describe a renewal as supported, not caused. No contract term or revenue figure is claimed.',
    ],
    stack: ['watsonx Orchestrate', 'Access provisioning workflows', 'Requirements discovery', 'Technical documentation'],
    lenses: ['orchestration', 'judgment', 'delivery', 'security'],
    diagram: null,
    featured: true,
  },

  {
    id: 'document-gis-validation',
    title: 'Reading survey geometry out of scanned deeds, then checking the math',
    shortTitle: 'Document to GIS, with a geometry check',
    blurb:
      'A document-to-map agent with two custom MCP tools, and a deterministic boundary-closure test that refuses to take the vision model’s word for it.',
    status: 'Working demo',
    client: 'Energy and utilities',
    org: 'IBM',
    period: '2026',
    problem: [
      'Easements live in scanned deed documents. The boundary of an easement is written as a sequence of survey calls, bearings and distances in legal prose, inside an image of a decades-old page.',
      'Getting that onto a map means reading the page, understanding the geometry described in it, and matching it against parcel records. Doing it by hand is slow. Doing it with a vision model is fast and sometimes wrong, and a wrong boundary looks exactly like a right one.',
    ],
    contribution: [
      'I engineered the easement-mapping agent, including two custom Model Context Protocol tools: one to retrieve documents from the enterprise content repository, and one to reach county GIS parcel data.',
      'I built the vision extraction step that pulls survey facts out of the scanned page.',
      'I added a deterministic boundary-closure check, so extracted geometry is tested by arithmetic rather than accepted because the model sounded certain.',
    ],
    system: [
      {
        step: 'Retrieve the document',
        detail:
          'A custom MCP tool fetches the scanned deed from the enterprise content repository, so the agent works from the system of record.',
      },
      {
        step: 'Extract survey facts',
        detail:
          'A vision model reads the bearings, distances, and reference points out of the page image into structured values.',
      },
      {
        step: 'Close the boundary',
        detail:
          'A deterministic routine walks the extracted calls in order and measures how far the traverse lands from where it started. A boundary that does not return to its origin contains an error.',
      },
      {
        step: 'Overlay on parcel records',
        detail:
          'A second custom MCP tool queries county GIS so the reconstructed geometry can be placed against the public parcel record.',
      },
    ],
    check: {
      title: 'Closure is arithmetic the model does not get a vote in',
      body: [
        'A legal boundary description is a loop. You walk each call in sequence and you are supposed to end up back where you started. If the extracted calls do not close, at least one of them is wrong, and you know that without a surveyor, a ground truth map, or a second opinion from the model.',
        'That is why this check is worth having: it is independent of the thing it is checking. The vision model cannot talk its way past a traverse that does not close.',
        'What closure does not tell you: it is a consistency test, not an accuracy test. A boundary can close cleanly and still sit in the wrong place, and some extraction errors will close just fine. It catches a real and common class of failure, and I do not claim it catches all of them.',
      ],
    },
    outcome: [
      'The workflow runs end to end in a narrated demonstration: retrieve a deed, extract the survey facts, reconstruct and test the geometry, and overlay it on the parcel record.',
      'It is the clearest example I have of the pattern I keep coming back to, which is putting an independent check between a model’s output and anything that depends on it.',
    ],
    limits: [
      'Boundary closure tests geometric consistency. It is not surveyed positional accuracy, and I make no positional accuracy claim.',
      'Not every extraction error is detectable this way.',
      'Deed contents, owner identities, parcel identifiers, and locations from client material are not published. The diagram on this page uses synthetic illustration values.',
    ],
    stack: ['Model Context Protocol', 'Enterprise content repository integration', 'Vision extraction', 'County GIS integration', 'Deterministic geometry validation'],
    lenses: ['orchestration', 'verification', 'delivery'],
    diagram: 'document-gis',
    featured: true,
  },
]

export const byId = (id: string) => cases.find((c) => c.id === id)

export const featuredCases = cases.filter((c) => c.featured)
