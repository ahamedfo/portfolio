/**
 * PRAISE. Approval-gated, and the gate is the whole point.
 *
 * TWO CLASSES OF SOURCE, AND THEY ARE NOT THE SAME THING.
 *
 * `public` means the author wrote it publicly, about Ahamed, on a platform
 * where it is still visible and attributable. A LinkedIn recommendation is
 * exactly this: the author chose to publish it, their name is on it, and a
 * reader can click through and confirm it exists. Quoting it on a personal
 * site is ordinary practice and needs no redaction.
 *
 * `internal` means a message sent inside a company. Slack, Teams, email.
 * Redacting one does not convert it into the first class. It also destroys the
 * reason anyone wanted the screenshot: an image is persuasive because it looks
 * unfakeable, and once the name, the avatar, the client and the channel are
 * blacked out, nothing is verifiable and it carries less weight than a plain
 * attributed quote would have.
 *
 * So internal praise does not get published as a redacted image. It gets
 * published when its author says yes, with their name on it, or not at all.
 * `approved: false` until then. See the permission request in
 * /Users/ahamed/portfolio-private/UNRESOLVED.md.
 *
 * TO ADD ONE
 *   1. Ask the author. One message. Almost nobody says no.
 *   2. Paste the text VERBATIM. Do not tidy it, do not fix its punctuation,
 *      do not shorten it silently. If you take an excerpt, set `excerpt: true`
 *      so the component says so.
 *   3. Set `roleId` to the role it is about, so it appears next to the work it
 *      corroborates rather than in a wall of compliments.
 *   4. Set `approved: true`.
 */

export type PraiseSource = 'public' | 'internal'

export type Praise = {
  id: string
  /** A role id from content/roles.ts. Praise sits with the work it is about. */
  roleId: string
  /** Verbatim. Including punctuation the house style would otherwise ban. */
  quote: string
  /** True when the visible text stops short of the full original. */
  excerpt?: boolean
  author: string
  title: string
  /** How the author knew him, in their own words where possible. */
  relationship: string
  date: string
  source: PraiseSource
  /** Where a reader can go and confirm it exists. Public sources only. */
  verifyUrl?: string
  approved: boolean
}

export const praise: Praise[] = [
  {
    id: 'kornhauser-2025',
    roleId: 'sentinelone',
    quote:
      'I had the privilege of coaching and leading Ahamed during his internship, and he quickly proved himself to be an exceptional contributor. He ramped up on SentinelOne with minimal supervision, collaborated seamlessly with cross-functional teams, and drove a major project—our AWS GameDay initiative—from concept to product. His ability to learn fast, take ownership, and deliver in a short time was impressive. Any team would be lucky to have him.',
    author: 'Aaron J. Kornhauser',
    title: 'AVP, Solutions Engineering at SentinelOne',
    relationship: 'Managed Ahamed directly',
    date: 'August 22, 2025',
    source: 'public',
    verifyUrl: 'https://www.linkedin.com/in/ahamedfofana/details/recommendations/',
    approved: true,
  },
  {
    id: 'greenfield-2025',
    roleId: 'sentinelone',
    quote:
      'I had the pleasure of mentoring Ahamed Fofana during his internship on our Partner Engineering team at SentinelOne. From the very beginning, Ahamed brought an incredible level of enthusiasm and curiosity that made an impact on everyone he interacted with. What stood out most was his eagerness to connect, learn, and engage with people across the company. He consistently asked thoughtful questions, took feedback seriously, and applied it quickly, which accelerated his growth throughout the summer.',
    excerpt: true,
    author: 'Tyler Greenfield',
    title: 'Senior Manager, Solutions Engineering, VAR',
    relationship: 'Was Ahamed’s mentor',
    date: 'August 28, 2025',
    source: 'public',
    verifyUrl: 'https://www.linkedin.com/in/ahamedfofana/details/recommendations/',
    approved: true,
  },

  /**
   * IBM. Four messages worth asking about, from the private evidence pack.
   * Each stays off the site until its author agrees to be named.
   *
   * Left here as a checklist rather than deleted, so the work of chasing
   * permission has somewhere to land. The quote text itself is deliberately
   * NOT in this file: it is internal material and this file ships to the
   * browser.
   */
  {
    id: 'ibm-renewal',
    roleId: 'ibm',
    quote: '',
    author: '',
    title: 'Account-team colleague',
    relationship: 'Worked with Ahamed on the access-provisioning pilot',
    date: 'September 2026',
    source: 'internal',
    approved: false,
  },
  {
    id: 'ibm-documentation',
    roleId: 'ibm',
    quote: '',
    author: '',
    title: 'Account-team colleague',
    relationship: 'On the co-authored implementation guides',
    date: '2026',
    source: 'internal',
    approved: false,
  },
]

export const praiseFor = (roleId: string) =>
  praise.filter((p) => p.approved && p.roleId === roleId && p.quote.length > 0)

export const hasPraise = (roleId: string) => praiseFor(roleId).length > 0

/** How many are waiting on a yes. Shown nowhere public; used by the docs. */
export const awaitingPermission = praise.filter((p) => !p.approved).length
