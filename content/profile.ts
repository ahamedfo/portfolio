/**
 * PUBLIC CONTENT. Everything in content/ is shipped to the browser.
 *
 * Rules for this directory:
 *   - No client or colleague names. Clients are described by sector and size.
 *   - No internal evidence IDs, source hashes, uncertainty scores, file paths,
 *     meeting titles, or redaction notes.
 *   - No credentials, endpoints, or internal hostnames.
 *   - Titles and dates come from the current resume, not from the old site.
 *
 * The private source and approval records live outside this checkout.
 */

export const profile = {
  name: 'Ahamed Fofana',
  location: 'New York, NY',
  email: 'af4074@nyu.edu',
  linkedin: 'https://www.linkedin.com/in/ahamedfofana/',
  github: 'https://github.com/ahamedfo',

  /** First viewport. States the work, not an aspiration. */
  headline: 'I build agent workflows people can use, and checks that catch them when they are wrong.',

  supportingLine:
    'Applied AI engineering, cybersecurity, and multi-agent research, connected through client delivery and systems that get verified before anyone trusts them.',

  /** Two short paragraphs under the headline. */
  intro: [
    'I am an AI Forward Deployed Engineer in IBM Client Engineering. I sit with enterprise clients, work out which part of their workflow an agent can actually carry, build it, and show it running. The part I care most about is the check: a policy hook that blocks a destructive tool call, a geometry test that catches a bad extraction, an evaluation that compares an agent against work a human already approved.',
    'Alongside that I do research on multi-agent orchestration at Queen Mary University of London, where I measure what quantized models do to agent coordination, and I am scoping human-in-the-loop network monitoring research at NYU Osiris Lab. I am finishing an MS in Cybersecurity at NYU.',
  ],

  /**
   * Resume download is intentionally absent. The current resume names clients,
   * so it cannot be published until a client-anonymous version is prepared.
   * Tracked in the private unresolved-items list.
   */
  resumeDownload: null as string | null,
}

export type SkillGroup = { group: string; items: string[] }

export const skills: SkillGroup[] = [
  {
    group: 'Agents',
    items: [
      'Multi-agent orchestration',
      'watsonx Orchestrate ADK',
      'Model Context Protocol',
      'ReAct',
      'Tool calling',
      'LangGraph',
      'RAG',
      'LLM evaluation',
    ],
  },
  {
    group: 'Security and reliability',
    items: [
      'Threat modeling',
      'Tool-use policy enforcement',
      'Human-in-the-loop approvals',
      'Agent telemetry and audit logging',
      'Source-grounded validation',
      'Cloud security (AWS)',
    ],
  },
  {
    group: 'Engineering',
    items: ['Python', 'Java', 'JavaScript', 'Kafka and Flink', 'API integration', 'Splunk', 'CI/CD'],
  },
  {
    group: 'Certifications',
    items: [
      'CISSP (June 2025)',
      'Security+ (January 2025)',
      'AI Red Teaming Training (SAFE, 2025)',
    ],
  },
]

export const education = [
  {
    school: 'New York University, Tandon School of Engineering',
    degree: 'MS, Cybersecurity',
    note: 'GPA 4.0',
    location: 'New York, NY',
  },
  {
    school: 'University at Buffalo, School of Engineering',
    degree: 'BS, Computer Science (Machine Learning)',
    note: 'GPA 3.8 / 4.0',
    location: 'Buffalo, NY',
  },
]

/**
 * Arabic is kept here because it was dropped from the one-page resume for
 * space, not withdrawn. No other language or proficiency level is claimed.
 */
export const languages = ['Arabic (conversational)']
