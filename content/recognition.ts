/**
 * PUBLIC CONTENT. Recognition, behind an approval gate.
 *
 * HOW THIS WORKS
 *
 * Nothing in `testimonials` renders unless its own `approved` flag is true.
 * The default for every real quotation is `approved: false`, because reuse
 * permission for the wording and the attribution has not been obtained.
 *
 * `SHOW_FIXTURES` controls one development fixture whose text says, in the
 * rendered output, that it is a layout placeholder and not a real quotation.
 * It exists so the component can be reviewed locally while every real quote is
 * still withheld. Set it to false before anything is published.
 *
 * WHAT NEVER GOES IN THIS FILE
 *   - the exact wording of an unapproved quotation
 *   - the name of the person who wrote it
 *   - the client organisation it came from
 *   - a screenshot, cropped or otherwise
 *
 * Approval records are kept outside this checkout.
 *
 * TO PUBLISH A TESTIMONIAL
 *   1. Get permission for the exact wording AND the exact attribution.
 *   2. Add the quote with `caseId` set to the case study it corroborates,
 *      `attribution` as a generic role, and `kind` set honestly: `individual`
 *      praise, `team` praise, or `relayed` if a colleague is passing on what a
 *      client said rather than writing it themselves.
 *   3. Set `approved: true`.
 * The component renders the kind label, so relayed feedback can never read as
 * a direct quote from someone who did not write it.
 */

export const SHOW_FIXTURES = true

export type TestimonialKind = 'individual' | 'team' | 'relayed' | 'fixture'

export type Testimonial = {
  id: string
  /** The case study this corroborates. Praise sits next to its contribution. */
  caseId: string
  quote: string
  /** Generic role only. Never a personal name. */
  attribution: string
  kind: TestimonialKind
  approved: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 'fixture-layout',
    caseId: 'document-gis-validation',
    quote:
      'Development fixture. This box shows where an approved quotation would sit once permission for its wording and attribution has been obtained. It is not a real endorsement and no real quotation has been used to write it.',
    attribution: 'Layout placeholder, not a real person',
    kind: 'fixture',
    approved: SHOW_FIXTURES,
  },
]

export const testimonialsFor = (caseId: string) =>
  testimonials.filter((t) => t.approved && t.caseId === caseId)

/**
 * The award.
 *
 * Wording is fixed to what the award document actually says. It is a team
 * award in one category of an intern and co-op event. It is not an overall
 * first place, not an IBM-wide competition win, and the document does not name
 * the winning project, so no project is attached to it here.
 */
export const award = {
  category: 'Best Business Case',
  criterion: 'Most compelling "why it matters" and ROI story',
  event: '2026 Summer IBM US Horizon Intern and Co-op Bobathon',
  date: 'July 2, 2026',
  shared: 'Team award, shared with two colleagues.',
  note:
    'A category award at an intern and co-op event. The award document does not name the winning project, so none is claimed for it here.',
  /** No image. The certificate is an internal document. */
  image: null as string | null,
}
