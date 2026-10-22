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
    title: 'A standards review teachers can check',
    client: 'State government, career and technical education',
    summary:
      'Built and presented a demo that compares changes in state standards with existing teaching materials. Teachers can check the results line by line. The client gave positive feedback in the session, and colleagues asked to share it internally.',
    tags: ['Document comparison', 'Human review', 'Client demo'],
  },
  {
    id: 'hr-classification',
    title: 'Checking agent reports against human-approved work',
    client: 'State government, human resources',
    summary:
      'Compared how agents classify position descriptions with reports a human reviewer had approved. Checked how prompts changed the results, whether the same input gave the same answer, and how accuracy lined up with clear writing. Found specific mismatches and risks that later changes could bring back earlier errors.',
    tags: ['ReAct', 'Evaluation', 'Failure analysis'],
  },
  {
    id: 'legacy-modernization',
    title: 'A coding agent on a 40-year-old codebase',
    client: 'Hospitality and gaming',
    summary:
      'Gave a live demo of an AI coding agent on IBM i and RPG, from recording an issue through a fix, compile, test, and change notes. When the tools failed partway through, I worked around it on the call. We talked about access to QA and production source code, how teams manage changes, and how new staff learn the code.',
    tags: ['IBM i and RPG', 'Live demo', 'Change management'],
  },
  {
    id: 'budget-workflow',
    title: 'Bringing budget documents into a shared workflow',
    client: 'State government, health and human services',
    summary:
      'Worked on a team building a workflow to bring budget documents together and let users change their priorities. Helped move it from a prototype toward something the client could run themselves. A September review reported that the client had checked the system and it was live.',
    tags: ['Document consolidation', 'Team delivery'],
  },
  {
    id: 'developer-enablement',
    title: 'Office hours for teams using coding agents',
    client: 'Public sector retirement system',
    summary:
      'Held recurring office hours with a client team adopting coding agents. We covered development access, guardrails, and how agents fit with the team’s code reviews and change rules. A colleague thanked me for the contribution in a write-up.',
    tags: ['Developer enablement', 'Guardrails', 'Client-facing'],
  },
]
