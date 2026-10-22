/**
 * PUBLIC CONTENT. Teaching.
 *
 * Three years of undergraduate CS teaching, across three courses, plus a
 * summer before that. It had been missing from the site entirely.
 *
 * It belongs on a portfolio aimed at forward-deployed and client-facing work
 * for a reason that is not sentimental: the job is explaining a technical
 * thing to someone who does not already understand it, watching whether it
 * landed, and adjusting. That is what review hours are. Three years of it is
 * the longest-running single thread in this whole site.
 *
 * Sourced from LinkedIn, which is the only record of these roles. The resume
 * does not carry them.
 */

export type TeachingRole = {
  id: string
  course: string
  /** The course title, where the code alone says nothing. */
  subject: string
  institution: string
  location: string
  period: string
  /** ISO start, for ordering. */
  start: string
  /** What the job actually involved. */
  detail: string
  /** The syllabus, compressed. Shown as a list of what he had to be able to teach. */
  topics: string[]
}

export const teaching: TeachingRole[] = [
  {
    id: 'cse-116',
    course: 'CSE 116',
    subject: 'Introduction to Computer Science II',
    institution: 'University at Buffalo',
    location: 'Buffalo, NY',
    period: 'September 2019 to May 2022',
    start: '2019-09',
    detail:
      'Held weekly review hours for first and second years, supervised labs, and graded Scala assignments. Spent nearly three years on the course. Seeing where students got stuck each semester helped me find better ways to explain the same ideas.',
    topics: [
      'Choosing a data structure',
      'Encapsulation, polymorphism, inheritance',
      'Recursion',
      'Multithreading',
      'Graph and tree traversal',
      'Asymptotic analysis',
      'Divide and conquer',
      'Databases',
      'Testing',
      'Multi-language integration',
    ],
  },
  {
    id: 'cse-220',
    course: 'CSE 220',
    subject: 'Systems Programming',
    institution: 'University at Buffalo',
    location: 'Buffalo, NY',
    period: 'August 2020 to May 2021',
    start: '2020-08',
    detail:
      'Held weekly review hours on the parts of a system students rarely see directly. Helped them connect the code they wrote to what the machine was doing.',
    topics: [
      'Compiler and linker invocation',
      'Memory management',
      'In-memory data representation',
      'Threads',
      'Synchronization primitives and concurrency',
      'The kernel and userspace boundary',
      'The system call interface',
    ],
  },
  {
    id: 'cse-191',
    course: 'CSE 191',
    subject: 'Discrete Structures',
    institution: 'University at Buffalo',
    location: 'Buffalo, NY',
    period: 'January 2020 to May 2020',
    start: '2020-01',
    detail:
      'Held review hours and graded student work. Reworked weekly lesson plans when students needed a different way into the topic.',
    topics: [
      'Logic and proofs',
      'Sets, functions, relations',
      'Recursion and recurrence relations',
      'Mathematical induction',
      'Graphs and trees',
      'Counting theory',
    ],
  },
  {
    id: 'hostos',
    course: 'Summer programme',
    subject: 'Writing',
    institution: 'CUNY Hostos Community College',
    location: 'New York, NY',
    period: 'June 2019 to August 2019',
    start: '2019-06',
    detail:
      'Worked as a course assistant and advisor for 15 to 17 year olds in intermediate and advanced writing. This was my first teaching job, helping students with words instead of code.',
    topics: [],
  },
]

/** Earliest first is wrong here. Most recent start, like everything else. */
export const teachingByRecency = [...teaching].sort((a, b) => b.start.localeCompare(a.start))

/**
 * Two early programmes that are not jobs and are not teaching, kept because
 * leaving them out of a page that claims to be the full record would be a
 * small dishonesty. Neither carries a claim.
 */
export const earlier = [
  {
    id: 'cisco-extern',
    org: 'Cisco',
    role: 'Extern',
    period: 'May 2020 to August 2020',
    detail: 'Took part in a mentorship programme focused on career advice. Practised interviews and learned about paths into the field.',
  },
  {
    id: 'ccny-hplp',
    org: 'The City College of New York',
    role: 'High Performance Learning Program',
    period: 'May 2013 to September 2013',
    detail:
      'Took part in a STEM apprenticeship at fourteen, with coding and 3D printing. It was my first chance to see people do this work for a living.',
  },
]
