/**
 * PUBLIC CONTENT. Research.
 *
 * The quantization study gets its own page because it is a real experiment with
 * real numbers, and burying it at the end of an experience paragraph would waste
 * the one piece of work here with a frozen analysis behind it.
 *
 * Every number below is taken from the September 28, 2026 synthesis. Every
 * qualification in that synthesis that bounds a number is carried with it. The
 * manuscript is drafted. It is not published, accepted, or peer reviewed, and
 * nothing on this page should read as if it were.
 */

export type ResearchProject = {
  id: string
  title: string
  affiliation: string
  period: string
  status: string
  question: string
  lenses: string[]
}

/**
 * The research hub.
 *
 * `/research` used to be one page carrying the entire quantization study:
 * design table, five findings with their bounds, the method notes, the other
 * research, and the earlier experiments. It was a wall. Ahamed's read was
 * "way way way too dense", which was right.
 *
 * It is now an index. Each area is a panel with a title, where it happens, its
 * status and one line. Click one and you get that area on its own page. The
 * density did not go away, it went somewhere a reader chose to go.
 */
export type ResearchArea = {
  id: string
  title: string
  /** One line. What the question actually is. */
  line: string
  affiliation: string
  period: string
  status: string
  /** A number worth putting on the panel, when there is one. */
  stat?: { value: string; label: string }
  href: string
}

export const researchAreas: ResearchArea[] = [
  {
    id: 'quantization',
    title: 'What compression does to a team of agents',
    line: 'Everyone evaluates agents at full precision. Everyone deploys them compressed. I measured the gap.',
    affiliation: 'Queen Mary University of London',
    period: 'May 2026 to present',
    status: 'Manuscript drafted',
    stat: { value: '87', label: 'configurations' },
    href: '/research/quantization',
  },
  {
    id: 'osiris-monitoring',
    title: 'Where a person belongs in network monitoring',
    line: 'An agent watching a network still needs a human somewhere. Working out where.',
    affiliation: 'NYU Osiris Lab',
    period: 'October 2026 to present',
    status: 'Scoping',
    href: '/research/osiris-monitoring',
  },
  {
    id: 'ransomware-intelligence',
    title: 'How ransomware groups actually operate',
    line: 'Affiliate structures, how the money moves, and why attribution is so hard.',
    affiliation: 'New York University',
    period: 'January 2025 to January 2026',
    status: 'Completed',
    href: '/research/ransomware-intelligence',
  },
  {
    id: 'nlp-buffalo',
    title: 'Reading tone and topic out of text',
    line: 'BERT for sentiment, LDA for topics. Where measuring a model before trusting it started.',
    affiliation: 'University at Buffalo',
    period: 'May 2020 to January 2022',
    status: 'Completed',
    stat: { value: '28,000', label: 'posts' },
    href: '/research/nlp-buffalo',
  },
  {
    id: 'earlier',
    title: 'Experiments that stopped',
    line: 'Two nulls and one killed by its own stopping rule. Kept because a result that did not work is still a result.',
    affiliation: 'Side projects',
    period: '2025 to 2026',
    status: '5 experiments',
    href: '/research/earlier',
  },
]

export const areaById = (id: string) => researchAreas.find((a) => a.id === id)

export const quantizationStudy = {
  id: 'quantized-agents',
  title: 'What does compressing a model do to a team of agents?',
  affiliation: 'Queen Mary University of London',
  period: 'May 2026 to present',
  status: 'Manuscript drafted, not submitted',
  lenses: ['orchestration', 'verification', 'constraints'],

  question: [
    'Almost every published agent evaluation runs at full precision. Almost every deployed agent runs compressed, because that is what fits on the hardware people actually have. So the configuration that gets measured is not the configuration that gets shipped.',
    'The question I set out to answer: once you quantize the weights, does the way you wire the agents together still matter, and does it matter the same way for every architecture?',
  ],

  design: [
    { label: 'Agent architectures', value: '4', note: 'Solo, planner-executor, orchestrator-worker, and Blackboard. Solo is a single-agent control, so these are not four multi-agent teams.' },
    { label: 'Configurations', value: '87', note: 'Architecture, model size, quantization format, and intervention combinations.' },
    { label: 'Questions', value: '1,000', note: 'The same 1,000 MuSiQue multi-hop questions for every configuration. That is what makes the comparisons paired.' },
    { label: 'Answer records', value: '87,000', note: 'Configurations times questions. Not 87,000 independent questions.' },
    { label: 'Model sizes', value: '9B and 27B', note: 'One model family.' },
    { label: 'Primary metric', value: 'F1', note: 'Exact match and a frozen model-judge accuracy are secondary.' },
  ],

  findings: [
    {
      claim: 'Keeping the planner at full precision is worth more than making the planner bigger.',
      detail:
        'In the planner-executor system at Q2_K, changing only the planner from a compressed 9B to a full-precision 9B raised F1 by 0.102 and judged accuracy by 11.4 points. Swapping that already-precise 9B planner for a 27B planner added only 0.030 F1, and its judge difference of 1.9 points has an interval that includes zero.',
      bound:
        'This holds for the planner-executor architecture in this implementation. The orchestrator-worker system does not show the same clear benefit, so this is not a general rule about managers or planners.',
    },
    {
      claim: 'Model size changes the compression story more than the compression setting does.',
      detail:
        'Every one of the twelve matched comparisons has the 27B configuration scoring above its 9B counterpart on F1, exact match, and judged accuracy. Within 27B, all eight compressed-versus-full-precision F1 differences fall between -0.028 and -0.004, which is below the reporting floor set in advance.',
      bound:
        'Being below the floor means not demonstrated, not equivalent. Six of those eight comparisons also ran across different hosts or device classes, so they are observed comparisons with recorded provenance rather than clean causal estimates. No hardware-independent speed claim comes out of this.',
    },
    {
      claim: 'Adding more agent activity did not buy accuracy.',
      detail:
        'All six revision-loop configurations, all three fusion-prompt variants, and all six writer-count variants came in below the 0.03 F1 reporting floor. In the planner-executor loop at Q2_K, the verifier asked for a revision on 509 of 1,000 questions; F1 improved on 18 and got worse on 15.',
      bound:
        'That tests these specific mechanisms, a one-revision evidence-grounded verifier and these writer counts. It is not evidence that feedback loops or multi-agent coordination cannot work.',
    },
    {
      claim: 'Bit width alone does not predict what an agent system will do.',
      detail:
        'For 9B Solo, Q2_K scores 0.309 F1 while IQ2_M scores 0.512, yet Q2_K has the lower build perplexity, 9.288 against 9.649. Perplexity did not order downstream agent performance here. There is also no universal advantage for either quantizer family: two architectures score higher on the judge metric at Q2_K than at IQ2_M.',
      bound:
        'K and IQ formats are compared at nominal bit width, which is not matched memory or matched numerical precision.',
    },
    {
      claim: 'The two metrics disagree, and that disagreement is part of the result.',
      detail:
        'F1 and the frozen judge accuracy do not always move together. A consistency audit over the 42,000 follow-up rows with archived prompts found 109 contradictory groups affecting 1,028 rows.',
      bound:
        'That is a consistency count, not a semantic error rate, and it does not say which label is right. Any claim that rests on the judge metric alone needs a blinded adjudication pass first, which has not been run.',
    },
  ],

  method: [
    'Comparisons were registered before the data existed, with a 0.03 F1 reporting floor set in advance so results could not be reinterpreted after the fact.',
    'Intervals come from 10,000 question-paired bootstrap resamples at a fixed seed, reported as descriptive unadjusted 95% percentile limits rather than simultaneous or multiplicity-corrected findings.',
    'An independent reviewer reproduced all 45 baseline means and all of the registered intervention comparisons from the frozen results.',
    'Judge verdicts were frozen. None were replaced or majority-voted during the synthesis.',
    'Host and device provenance is recorded per cell, including the cells that had to be rerun in a different environment.',
  ],

  openWork: [
    'Tokenizer-native cost accounting is unfinished, so there is no precise token-efficiency or cost claim.',
    'A blinded adjudication of judge disagreements is the right next check before any semantic-only result becomes central.',
    'A matched-compute single-agent control would be needed before claiming a general coordination advantage.',
    'Additional benchmarks and safety-oriented experiments have been discussed with my advisor. They are proposals. They have not been run.',
  ],

  kuber:
    'This sits inside KUber, a UKRI-EPSRC funded project on multi-agent orchestration and knowledge sharing involving IBM Research, Nokia Bell Labs, and Samsung AI. My work on it is the quantization and architecture experiments.',
}

export const nlpBuffalo = {
  id: 'nlp-buffalo',
  title: 'Reading tone and topic out of text',
  affiliation: 'University at Buffalo',
  period: 'May 2020 to January 2022',
  status: 'Completed',
  body: [
    'Two pieces of undergraduate research, both about getting a machine to say something useful about a pile of text.',
    'The first fine-tuned BERT for sentiment across roughly 28,000 social posts, and used it to separate left and right leaning views on the same topics. The second pulled news articles through the Media Cloud API and ran gensim LDA over them to find what the coverage was actually about, with pyLDAvis to look at the result rather than trust it.',
    'The topic-modelling code is public. It is the oldest thing on this site and the first time I checked a model instead of believing it.',
  ],
  repo: 'https://github.com/ahamedfo/MediaCloudAPI',
}

export const otherResearch: ResearchProject[] = [
  {
    id: 'osiris-monitoring',
    title: 'Human-in-the-loop agentic harnesses for network monitoring',
    affiliation: 'NYU Osiris Lab',
    period: 'October 2026 to present',
    status: 'Project scoping',
    question:
      'A new project looking at where a person belongs in an agent-driven network monitoring loop, using an open-source Zeek and Suricata stack. We are at the stage of defining the research question and reviewing prior work. There is no harness, no result, and no deployed monitoring system yet.',
    lenses: ['judgment', 'security'],
  },
  {
    id: 'ransomware-intelligence',
    title: 'How ransomware groups actually operate',
    affiliation: 'New York University',
    period: 'January 2025 to January 2026',
    status: 'Completed',
    question:
      'Analysis of ransomware group methods, operations, affiliate structures, monetization, trends, and the problems with attribution, drawn from academic and industry sources. This is threat intelligence and research work. It is not incident response and it is not malware reverse engineering.',
    lenses: ['security'],
  },
]

/**
 * Carried over from the previous version of this site, where Ahamed wrote
 * these descriptions himself. The October 2026 source review did not cover
 * them, so the wording is his and has not been re-verified here. Listed
 * compactly and honestly rather than deleted.
 */
export const sideProjects = [
  {
    id: 'injection-depth',
    title: 'Does splitting one agent into three make it harder to attack?',
    stage: 'Paused',
    body: 'Prompt injection succeeded against a single agent 33% of the time and against a three-agent chain 8% of the time. The chain was also much worse at the actual task, because the agents kept dropping the original request when handing work to each other.',
  },
  {
    id: 'on-track',
    title: 'Can a compressed agent tell when it is heading for a wrong answer?',
    stage: 'Finished',
    body: 'A 9B model run as a research agent and compressed to 2 bits, tested on whether its internal state predicts whether it ends up correct. It partly does, but most of that signal tracks what the agent has already read rather than any judgement about itself.',
  },
  {
    id: 'margin',
    title: 'Does compression quietly weaken a model’s ability to refuse?',
    stage: 'Stopped',
    body: 'Stopped by its own kill criterion, which was written down before anything ran. Every model showing a dramatic refusal drop turned out to be too damaged by compression to measure, so there was no safety effect left to explain.',
  },
  {
    id: 'ransomware-pipeline',
    title: 'Ransomware ecosystem intelligence pipeline',
    stage: 'Finished',
    body: 'A five-stage pipeline over roughly 69,000 leaked ransomware-group chat messages: topic extraction, a semantic co-occurrence graph, community detection, and an agent that surfaces intelligence trails through it.',
  },
  {
    id: 'healthcare-authz',
    title: 'Authorization for healthcare AI agents',
    stage: 'Finished',
    body: 'Policy-based authorization for healthcare agents using Cedar, with a benchmark comparing policy engines and full audit logging of every agent tool call.',
  },
]
