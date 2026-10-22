/**
 * PUBLIC CONTENT. Additional client work.
 *
 * Deliberately compact. These are real pieces of work with real limits, and
 * none of them has the evidence behind it to carry a full case study. Giving
 * them equal visual weight to the featured four would overstate all five.
 *
 * `established` is what is actually supported. `notEstablished` is the claim a
 * reader might otherwise assume, written out so they do not have to guess.
 */

export type SecondaryItem = {
  id: string
  title: string
  client: string
  established: string
  notEstablished: string
  lenses: string[]
}

export const secondary: SecondaryItem[] = [
  {
    id: 'curriculum-review',
    title: 'Standards-versus-curriculum review, built for educators to check',
    client: 'State government, career and technical education',
    established:
      'I built and presented a demo that compares changing state standards against existing teaching materials and produces output an educator can review line by line. Client feedback in the session was positive, and colleagues asked to circulate the proposed solution internally.',
    notEstablished:
      'No measured time saving and no rollout. The review dashboard shown was conceptual and was not wired end to end to the live agent, and some standards and assessment material were demonstration fixtures. Interest in circulating something is not adoption of it.',
    lenses: ['judgment', 'delivery', 'verification'],
  },
  {
    id: 'hr-classification',
    title: 'Comparing classification agents against work a human already approved',
    client: 'State government, human resources',
    established:
      'I compared agent approaches for classifying position descriptions against reports a human reviewer had already approved, and investigated where they diverged: prompt sensitivity, run-to-run inconsistency on the same input, and the tradeoff between a classification being right and the report around it being readable. Specific mismatches and regression risks came out of that and were investigated across successive reviews.',
    notEstablished:
      'No accuracy figure is published here. An accuracy number is meaningless without its dataset, denominator, evaluation protocol, and system version, and later sessions still showed inconsistent classifications. This is evaluation and iteration work, not a production accuracy claim.',
    lenses: ['verification', 'judgment', 'delivery'],
  },
  {
    id: 'legacy-modernization',
    title: 'A live coding-agent walkthrough on a 40-year-old codebase',
    client: 'Hospitality and gaming',
    established:
      'I delivered a live demonstration of an AI coding agent working on IBM i and RPG code: capture the issue, diagnose it, repair it, compile, test, and document the change. Tooling failed partway through and I worked around it live. The session turned into a real technical discussion about QA versus production source access, change management, and onboarding.',
    notEstablished:
      'This was sample and trial code, not a completed production modernization. A planned refactor was shown as a plan rather than executed. No sale or rollout follows from this call.',
    lenses: ['delivery', 'security', 'orchestration'],
  },
  {
    id: 'budget-workflow',
    title: 'Budget document consolidation workflow',
    client: 'State government, health and human services',
    established:
      'I contributed to a team building a workflow that consolidates budget documents and makes the prioritization editable, and that moved from prototype toward something the client could use. A September review reported that the client had verified the system and that it was live.',
    notEstablished:
      'My exact implementation ownership on this one is not settled, so I am not presenting it as a personal accomplishment. Prototype ownership was shared with other engineers, and a deployment reported in a past meeting is not confirmation of current operating state.',
    lenses: ['delivery', 'judgment'],
  },
  {
    id: 'developer-enablement',
    title: 'Office hours with a client engineering team adopting coding agents',
    client: 'Public sector retirement system',
    established:
      'I took part in recurring customer office hours on agent adoption: development access, guardrails, and how a coding agent fits a team that already has review and change-management practices. A colleague’s write-up of that work thanked me for the contribution.',
    notEstablished:
      'Participation and acknowledgment, not authorship of every recommendation. A custom pull-request review skill discussed in those calls was built by a client participant, not by me. No adoption figure is claimed.',
    lenses: ['delivery', 'security'],
  },
]
