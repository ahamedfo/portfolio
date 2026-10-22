/**
 * PUBLIC CONTENT. The "How the work connects" section.
 *
 * A lens is a capability. Selecting one shows the pieces of work that share it
 * and, for each one, the reason it belongs there. The reason is the content.
 * A line drawn between two logos says nothing.
 *
 * These are conceptual connections. None of them claims that research code was
 * deployed into a client system, that one project caused another, or that a
 * career followed a plan.
 *
 * To add a node: give it an id, a label, and a `where` it lives, then list its
 * id in the relevant lens `members` with a one-line reason.
 */

export type NodeKind = 'case' | 'secondary' | 'research' | 'role'

export type ConnectedNode = {
  id: string
  label: string
  kind: NodeKind
  /** Employer, university, or lab. */
  where: string
  /** Internal route, when the node has a page. */
  href?: string
}

/** Everything a lens can point at. */
export const nodes: ConnectedNode[] = [
  { id: 'workplace-assistant', label: 'Six-agent workplace assistant', kind: 'case', where: 'IBM', href: '/work/workplace-assistant' },
  { id: 'streaming-policy-demo', label: 'Streaming intelligence and the policy hook', kind: 'case', where: 'IBM', href: '/work/streaming-policy-demo' },
  { id: 'access-workflow', label: 'Access-provisioning pilot', kind: 'case', where: 'IBM', href: '/work/access-workflow' },
  { id: 'document-gis-validation', label: 'Document to GIS, with a geometry check', kind: 'case', where: 'IBM', href: '/work/document-gis-validation' },
  { id: 'curriculum-review', label: 'Standards review for educators', kind: 'secondary', where: 'IBM' },
  { id: 'hr-classification', label: 'Classification agent evaluation', kind: 'secondary', where: 'IBM' },
  { id: 'legacy-modernization', label: 'Coding agent on legacy systems', kind: 'secondary', where: 'IBM' },
  { id: 'quantized-agents', label: 'Quantization across agent architectures', kind: 'research', where: 'Queen Mary University of London', href: '/research' },
  { id: 'osiris-monitoring', label: 'Human-in-the-loop network monitoring', kind: 'research', where: 'NYU Osiris Lab', href: '/research' },
  { id: 'ransomware-intelligence', label: 'Ransomware ecosystem research', kind: 'research', where: 'New York University', href: '/research' },
  { id: 'security-enablement', label: 'Security training and partner enablement', kind: 'role', where: 'SentinelOne' },
  { id: 'delivery-reliability', label: 'Testing, release, and on-call', kind: 'role', where: 'CVS Health' },
]

export type Lens = {
  id: string
  label: string
  /** What the lens means, in one sentence. */
  summary: string
  members: { nodeId: string; reason: string }[]
}

export const lenses: Lens[] = [
  {
    id: 'verification',
    label: 'Checks outside the model',
    summary:
      'Every one of these puts something between a model’s output and whatever depends on it. The checks are different; the principle is the same.',
    members: [
      {
        nodeId: 'streaming-policy-demo',
        reason:
          'A policy hook checks a requested action at the boundary where it would execute, and blocks it even after a user has confirmed.',
      },
      {
        nodeId: 'document-gis-validation',
        reason:
          'A deterministic closure test checks extracted geometry by arithmetic the model has no influence over.',
      },
      {
        nodeId: 'hr-classification',
        reason:
          'Agent classifications are compared against reports a human reviewer already approved, so disagreement is measurable rather than theoretical.',
      },
      {
        nodeId: 'quantized-agents',
        reason:
          'Comparisons registered in advance with a reporting floor, so a result cannot be reinterpreted after seeing it.',
      },
      {
        nodeId: 'delivery-reliability',
        reason:
          'Raising test coverage from 20% to 80% on a user-facing scheduling flow is the same instinct applied to ordinary software.',
      },
    ],
  },
  {
    id: 'orchestration',
    label: 'Agent orchestration',
    summary:
      'Getting several agents, or one agent and several tools, to carry a workflow between them without losing the request along the way.',
    members: [
      {
        nodeId: 'workplace-assistant',
        reason:
          'Six specialist agents behind one entry point, each scoped to its own workflow area and its own tools.',
      },
      {
        nodeId: 'access-workflow',
        reason:
          'A described manual process decomposed into agent steps, with the decisions that need a person kept as decisions.',
      },
      {
        nodeId: 'document-gis-validation',
        reason:
          'One agent chaining custom tools across a document repository, a vision model, and a public GIS service.',
      },
      {
        nodeId: 'quantized-agents',
        reason:
          'The research studies coordination across four architectures. The client work applies orchestration to bounded business workflows. Different problems, shared subject.',
      },
    ],
  },
  {
    id: 'judgment',
    label: 'Where a person stays in the loop',
    summary:
      'Deciding which steps a human has to keep, and being honest about when an approval prompt is not actually a control.',
    members: [
      {
        nodeId: 'curriculum-review',
        reason:
          'The output is built for an educator to review. It proposes; it does not decide what gets taught.',
      },
      {
        nodeId: 'streaming-policy-demo',
        reason:
          'A worked example of why asking a user to confirm is weaker than enforcing a policy. The user confirmed, and the hook still refused.',
      },
      {
        nodeId: 'access-workflow',
        reason:
          'Permission granting is exactly the workflow where an agent should not quietly become more capable than anyone intended.',
      },
      {
        nodeId: 'osiris-monitoring',
        reason:
          'A newly scoped research question about where the person belongs in an agent-driven monitoring loop. No result yet.',
      },
      {
        nodeId: 'hr-classification',
        reason:
          'The baseline is human-approved work, which keeps the human judgment as the reference rather than the thing being replaced.',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security understanding',
    summary:
      'Where the cybersecurity background actually shows up in the agent work, and where it is still just background.',
    members: [
      {
        nodeId: 'ransomware-intelligence',
        reason:
          'Studying how attacker organisations really operate is where the domain understanding came from. It is research, not operations.',
      },
      {
        nodeId: 'security-enablement',
        reason:
          'Explaining security mechanisms to partners and buyers who needed to act on them, which is a different skill from knowing them.',
      },
      {
        nodeId: 'streaming-policy-demo',
        reason:
          'Tool-use permissions and audit logging, which is the agent version of a question security teams have asked for years.',
      },
      {
        nodeId: 'access-workflow',
        reason:
          'Identity and access provisioning, approached as a permission-model problem rather than a scripting problem.',
      },
      {
        nodeId: 'osiris-monitoring',
        reason:
          'Network monitoring with Zeek and Suricata, at the scoping stage.',
      },
      {
        nodeId: 'legacy-modernization',
        reason:
          'The customer questions that mattered were about source access and change management, not about whether the model could write code.',
      },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery and communication',
    summary:
      'Client-facing work: discovery, demos that run live, co-authored documentation, and material someone else can pick up.',
    members: [
      {
        nodeId: 'workplace-assistant',
        reason:
          'Built the system, presented it, and wrote the handoff that let a colleague present it without me.',
      },
      {
        nodeId: 'access-workflow',
        reason:
          'Requirements discovery and co-authored implementation guides, with the client’s engineers doing the building.',
      },
      {
        nodeId: 'curriculum-review',
        reason:
          'Translated a stated problem into a demo, then took the feedback back into the proposed workflow.',
      },
      {
        nodeId: 'legacy-modernization',
        reason:
          'A live demonstration where the tooling failed partway through and the session still produced a useful technical conversation.',
      },
      {
        nodeId: 'security-enablement',
        reason:
          'Certification pathways and enablement material for a partner ecosystem, which is the same job as a handoff package at larger scale.',
      },
    ],
  },
  {
    id: 'constraints',
    label: 'Model behaviour under constraints',
    summary:
      'What changes when a model does not get ideal conditions: compressed weights, a fixed architecture, a restricted environment.',
    members: [
      {
        nodeId: 'quantized-agents',
        reason:
          'The direct version of the question. Compression effects turn out to depend on quantizer, architecture, and model size together.',
      },
      {
        nodeId: 'hr-classification',
        reason:
          'Prompt sensitivity and run-to-run inconsistency on identical input, observed in a client workflow rather than a benchmark.',
      },
      {
        nodeId: 'document-gis-validation',
        reason:
          'A vision model reading degraded scans is a constraint problem. The closure check is what makes its failures visible.',
      },
      {
        nodeId: 'access-workflow',
        reason:
          'A restricted client environment is a constraint on the build, and it changed the design toward co-creation and documentation.',
      },
    ],
  },
]

export const nodeById = (id: string) => nodes.find((n) => n.id === id)
export const lensById = (id: string) => lenses.find((l) => l.id === id)
