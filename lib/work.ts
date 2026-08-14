/**
 * The things Ahamed is working on.
 *
 * THESE DESCRIPTIONS ARE A FIRST PASS AND NEED HIS EDIT. Every fact in them
 * traces to a committed artifact, but the wording is not his. They are kept
 * to two or three sentences each precisely so they are quick to rewrite.
 *
 * Titles are questions on purpose. A reader who has never heard of any of this
 * should understand what is being asked before they understand the method.
 */

export type Stage = 'Ongoing' | 'Starting' | 'Finished' | 'Paused' | 'Stopped'

export type Work = {
  id: string
  stage: Stage
  /** Plain-language question. No jargon, no keywords. */
  question: string
  /** Two or three sentences. What it is, and what came back. */
  body: string
  /** Where it happens, if that matters. */
  where?: string
}

export const work: Work[] = [
  {
    id: 'kuber',
    stage: 'Ongoing',
    question: 'Can separate AI models teach each other without a central server?',
    body: 'Four models train on different slices of data and share what they learn through a shared registry, instead of averaging their weights together the way federated learning normally does. The proof of concept runs end to end. No results measured against a baseline yet.',
    where: 'Queen Mary University of London, funded by UKRI-EPSRC with IBM Research and Nokia Bell Labs',
  },
  {
    id: 'scaffold-collapse',
    stage: 'Starting',
    question: 'Does the way you wire up AI agents still matter once the model is compressed?',
    body: 'Comparing four agent architectures across five levels of compression on the same task. The plan is written and frozen so the results cannot be adjusted after the fact. No data collected yet.',
  },
  {
    id: 'on-track',
    stage: 'Finished',
    question: 'Can a compressed AI agent tell when it is heading for a wrong answer?',
    body: 'I ran a 9-billion-parameter model as a research agent, squeezed it down to 2 bits, and tested whether its internal state predicts whether it will end up correct. It partly does, but most of that signal turns out to be tracking what the agent has already read rather than any judgement about itself. Pushing on the signal changes how confidently it answers and does not change what it decides to do.',
  },
  {
    id: 'injection-depth',
    stage: 'Paused',
    question: 'Does splitting one agent into three make it harder to attack?',
    body: 'Prompt injection succeeded against a single agent 33% of the time and against a three-agent chain 8% of the time. The chain was also much worse at the actual task, and the reason was that the agents kept dropping the user’s original request when handing work to each other.',
  },
  {
    id: 'margin',
    stage: 'Stopped',
    question: 'Does compression quietly weaken a model’s ability to refuse?',
    body: 'I stopped this one. Every model that showed a dramatic drop in refusals turned out to be too damaged by the compression to measure at all, so there was no real safety effect left to explain. The rule for when to stop was written down before anything ran.',
  },
]
