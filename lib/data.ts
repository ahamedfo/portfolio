export const personalInfo = {
  name: 'Ahamed Fofana',
  location: 'New York, NY',
  email: 'af4074@nyu.edu',
  linkedin: 'https://linkedin.com/in/ahamedfofana',
  github: 'https://github.com/ahamedfo',
}

export const aboutText = [
  `Most agents ship compressed. They run on quantized weights, on shared or borrowed compute, and increasingly as several models handing work to each other rather than one model doing everything. Almost all published evaluation happens at full precision on a single model, which means the configuration people actually deploy is the one nobody measures carefully.`,

  `That gap is what I work on. I take the constraint as given and ask what it does to behavior rather than to benchmark accuracy: whether safety survives compression, whether an agent still tracks that it is going wrong, whether a chain of agents holds together, and what knowledge transfer costs when the participants are unequal.`,

  `The method matters more to me than any individual result. Every experiment is preregistered before the data exists, and every claim is checked against a control built the same way but with the labels removed. In the quantized-agent work, two of the three preregistered causal tests returned nulls and both are written up. A separate project on refusal margins was stopped by its own kill criterion. Both are on this site.`,

  `I am finishing an MS in Cybersecurity at NYU. Before research I spent about two years as a software engineer at CVS Health and a year in solutions engineering at SentinelOne, which is where I learned to explain technical results to people who did not run the experiment.`,
]

export type Experience = {
  company: string
  role: string
  /** ISO start date, used to place the role on the timeline */
  start: string
  period: string
  location: string
  status: 'current' | 'past'
  description: string[]
}

export const experiences: Experience[] = [
  {
    company: 'IBM',
    role: 'AI Engineer, Client Engineering',
    start: '2026-05-01',
    period: 'May 2026 - Present',
    location: 'San Francisco, CA',
    status: 'current',
    description: [
      'Built a seven-agent workplace assistant on watsonx Orchestrate spanning five simulated enterprise systems, owned end to end',
      'Engineered an easements agent that retrieves documents over MCP and plots legal survey data onto county GIS parcels to within two inches',
      'Led a team benchmarking LLM cost and quality across Claude Code, GitHub Copilot, and IBM Bob',
    ],
  },
  {
    company: 'Queen Mary University of London',
    role: 'Graduate Research Assistant',
    start: '2026-05-01',
    period: 'May 2026 - Present',
    location: 'London, UK',
    status: 'current',
    description: [
      'Research on multi-agent LLM orchestration: coordination, knowledge sharing, and reliability across heterogeneous architectures',
      'Contributor to KUber, a UKRI-EPSRC project with IBM Research, Nokia Bell Labs, and Samsung AI',
      'Extending federated learning and knowledge distillation for edge AI into secure knowledge sharing between agents',
    ],
  },
  {
    company: 'NYU OSIRIS Lab',
    role: 'Researcher',
    start: '2025-02-01',
    period: 'Feb 2025 - Present',
    location: 'New York, NY',
    status: 'current',
    description: [
      'Security of AI-driven multi-agent systems, within NYU’s student-run offensive security research group',
      'Adversarial manipulation of LLM agents: prompt injection, unauthorized tool use, and authentication gaps across MCP handoffs',
    ],
  },
  {
    company: 'SentinelOne',
    role: 'Partner Solution Engineer',
    start: '2025-08-01',
    period: 'Aug 2025 - Jan 2026',
    location: 'New York, NY',
    status: 'past',
    description: [
      'Built a partner enablement framework for 2,200+ partners with certification pathways across deployment methodologies',
      'Led a technical content audit and gap analysis of the training infrastructure',
    ],
  },
  {
    company: 'SentinelOne',
    role: 'Partner Solution Engineer Intern',
    start: '2025-06-01',
    period: 'Jun 2025 - Aug 2025',
    location: 'New York, NY',
    status: 'past',
    description: [
      'Delivered AWS re:Invent simulation training to 40K+ professionals on GenAI security risks and AI-driven threat modeling',
      'Designed a risk assessment framework for AI and cloud security misconfiguration exposure',
    ],
  },
  {
    company: 'CVS Health',
    role: 'Software Engineer II',
    start: '2023-06-01',
    period: 'Jun 2023 - Jan 2025',
    location: 'New York, NY',
    status: 'past',
    description: [
      'Built full-stack features for a prescription-routing application serving millions of patients, spanning UI, API integrations and monitoring, at 80%+ test coverage',
      'Presented walkthroughs and demos to executives covering front-end flows, API integrations, and product functionality',
      'Monitored customer experience with Splunk to identify drop-offs in vaccine scheduling',
    ],
  },
  {
    company: 'University at Buffalo',
    role: 'NLP Research Assistant',
    start: '2020-03-01',
    period: 'Mar 2020 - May 2022',
    location: 'Buffalo, NY',
    status: 'past',
    description: [
      'Empirical NLP research applying BERT for sentiment classification across 28,000 tweets',
      'Unsupervised topic modeling (LDA) on 10,000 news articles to track thematic patterns',
      'Comparative analysis of deep learning against traditional ML for sentiment analysis',
    ],
  },
]

export const education = [
  {
    school: 'New York University',
    sub: 'Tandon School of Engineering',
    degree: 'MS, Cybersecurity',
    period: '2025 - Present',
    note: 'GPA 4.0',
  },
  {
    school: 'University at Buffalo',
    sub: 'School of Engineering',
    degree: 'BS, Computer Science',
    period: '2019 - 2023',
    note: 'Machine learning concentration. GPA 3.8. Dean’s List 2019-2022',
  },
]

export const focusAreas = [
  {
    title: 'Quantization and inference',
    detail:
      'What low-bit weights do to agent behavior rather than to benchmark accuracy. Probing, steering, and causal tests on quantized models.',
  },
  {
    title: 'Knowledge transfer',
    detail:
      'Distillation and federated learning between unequal participants, including non-IID clients and teacher-student transfer through a shared vault.',
  },
  {
    title: 'Multi-agent systems',
    detail:
      'What survives a handoff. Scaffold choice, context loss between hops, and whether depth buys anything once precision drops.',
  },
  {
    title: 'Agent security',
    detail:
      'Prompt injection, unauthorized tool use, and authentication gaps across agent boundaries, measured against exposure rather than raw success.',
  },
]

export const tooling = {
  Languages: ['Python', 'TypeScript', 'Java', 'C++'],
  'ML and inference': ['PyTorch', 'llama.cpp', 'Transformers', 'GGUF quantization', 'vLLM'],
  'Agents': ['LangGraph', 'MCP', 'watsonx Orchestrate', 'ReAct scaffolds', 'AgentDojo'],
  'Infrastructure': ['Modal', 'Docker', 'AWS', 'Kafka / Flink'],
  Certifications: ['CISSP', 'Security+'],
}

export const otherWork = [
  {
    title: 'Ransomware ecosystem intelligence pipeline',
    detail:
      'Five-stage NLP pipeline over roughly 69,000 leaked BlackBasta chat messages: LLM topic extraction, semantic co-occurrence graph, Leiden community detection, and an autonomous agent that surfaces intelligence trails.',
  },
  {
    title: 'Healthcare agent authorization',
    detail:
      'Cedar-based authorization for healthcare AI agents, with a benchmark comparing policy engines and full audit logging of agent tool calls.',
  },
  {
    title: 'PromptROI',
    detail:
      'A prompt-coaching agent built for IBM’s internal intern competition, where it placed first.',
  },
]
