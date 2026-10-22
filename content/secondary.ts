/**
 * PUBLIC CONTENT. Shorter client engagements.
 *
 * HOW THESE ARE WRITTEN, AND WHY IT CHANGED.
 *
 * These used to carry a "Not established" block under each one, listing what
 * the work had not achieved. That was a mistake. There is a difference between
 * not overclaiming and announcing your own shortfalls, and only the first one
 * is honesty. The second is just losing.
 *
 * So the accuracy now lives in the verbs. "Worked on a team building" is
 * already not a claim of sole ownership. "Evaluated" is already not a claim of
 * a production accuracy number. If a sentence would be wrong, the fix is to
 * write a different sentence, not to write the sentence and then take it back.
 *
 * The full limitations record still exists. It lives in
 * /Users/ahamed/portfolio-private/CLAIMS-AND-SOURCES.md, which is where a
 * claims checklist belongs: in the file you check claims against, not on the
 * page a hiring manager reads.
 *
 * Rules that still bind every line here:
 *   - no client names
 *   - a result the team earned is described as the team's
 *   - no number without its denominator, which usually means no number
 */

export type SecondaryItem = {
  id: string
  title: string
  client: string
  summary: string
  /** What it took to do, in a few words each. */
  tags: string[]
}

export const secondary: SecondaryItem[] = [
  {
    id: 'curriculum-review',
    title: 'Standards review an educator can check line by line',
    client: 'State government, career and technical education',
    summary:
      'Built and presented a demo that compares changing state standards against existing teaching materials and produces output a teacher can actually review, rather than a verdict they have to trust. The client’s feedback in the session was positive and colleagues asked to circulate it internally.',
    tags: ['Document comparison', 'Human review', 'Client demo'],
  },
  {
    id: 'hr-classification',
    title: 'Evaluating classification agents against human-approved work',
    client: 'State government, human resources',
    summary:
      'Compared agent approaches for classifying position descriptions against reports a human reviewer had already signed off. Investigated prompt sensitivity, run-to-run consistency on identical input, and the tradeoff between classifying correctly and producing a report someone wants to read. Surfaced specific mismatches and regression risks across successive reviews.',
    tags: ['ReAct', 'Evaluation', 'Failure analysis'],
  },
  {
    id: 'legacy-modernization',
    title: 'A live coding-agent walkthrough on a 40-year-old codebase',
    client: 'Hospitality and gaming',
    summary:
      'Delivered a live demonstration of an AI coding agent working on IBM i and RPG: capture the issue, diagnose it, repair it, compile, test, document the change. The tooling failed partway through and I worked around it on the call. It turned into a real technical conversation about QA versus production source access, change management, and onboarding.',
    tags: ['IBM i and RPG', 'Live demo', 'Change management'],
  },
  {
    id: 'budget-workflow',
    title: 'Budget document consolidation workflow',
    client: 'State government, health and human services',
    summary:
      'Worked on a team building a workflow that consolidates budget documents and makes the prioritisation editable, carrying it from prototype toward something the client could run themselves. A September review reported the client had verified the system and that it was live.',
    tags: ['Document consolidation', 'Team delivery'],
  },
  {
    id: 'developer-enablement',
    title: 'Office hours with a client team adopting coding agents',
    client: 'Public sector retirement system',
    summary:
      'Recurring customer office hours on agent adoption: development access, guardrails, and how a coding agent fits a team that already has review and change-management practices. A colleague’s write-up of that work thanked me for the contribution.',
    tags: ['Developer enablement', 'Guardrails', 'Client-facing'],
  },
]
