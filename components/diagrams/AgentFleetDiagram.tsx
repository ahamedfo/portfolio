import Figure from './Figure'

/**
 * One entry point, six scoped agents, grounded answers, telemetry.
 *
 * The six agents are drawn as rows inside one panel rather than as six boxes
 * with six connectors. Six fan-out arrows into a two-column grid cross through
 * the boxes they are not pointing at, and a crossing line reads as a
 * relationship that is not there.
 *
 * The agent names are workflow areas, not client system names. The telemetry
 * bar names the values that were recorded and shows none of them, because the
 * real readout was demo control-plane data.
 */
const INK = '#1A1917'
const INK2 = '#55514A'
const INK3 = '#6C675C'
const LINE = '#C9C2B1'
const HI = '#35639C'
const SIGNAL = '#895F16'
const PAPER = '#F3F0E8'

const AGENTS = [
  ['HR policy', 'policy docs'],
  ['Onboarding', 'directory'],
  ['Procurement', 'purchasing'],
  ['IT service', 'ticketing'],
  ['Escalation', 'routing'],
  ['Recruiting', 'req tracking'],
]

export default function AgentFleetDiagram() {
  return (
    <Figure
      id="agent-fleet"
      title="One entry point, six scoped agents, one telemetry record per request"
      caption="Illustration of the architecture as built in the demonstration environment. The telemetry bar names the values that were recorded; no values are shown, because the readout was demo data rather than client traffic."
      steps={[
        'A request arrives in plain language, with no need to pick a queue.',
        'A routing layer decides which specialist agent owns the request.',
        'Six agents each cover one workflow area and hold only that area’s tools.',
        'Policy answers are grounded in documents rather than model memory.',
        'Each request writes one telemetry record: latency, tokens, and whether it failed.',
      ]}
    >
      <svg
        viewBox="0 0 880 286"
        className="h-auto w-full"
        role="img"
        aria-labelledby="agent-fleet-title agent-fleet-desc"
      >
        <desc id="agent-fleet-desc">
          A request enters a single routing layer, which dispatches it to one of six specialist
          agents covering HR policy, onboarding, procurement, IT service, escalation, and
          recruiting. Each agent holds only its own tools. Policy answers are grounded in a
          document store. Every request produces one telemetry record capturing latency, token
          usage, and failure.
        </desc>

        <defs>
          <marker id="af-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke={INK3} strokeWidth="1.3" />
          </marker>
          <marker id="af-arrow-signal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke={SIGNAL} strokeWidth="1.3" />
          </marker>
        </defs>

        {/* the request */}
        <rect x={8} y={100} width={118} height={52} rx={2} fill={PAPER} stroke={LINE} />
        <text x={67} y={122} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
          One request
        </text>
        <text x={67} y={138} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          plain language
        </text>

        <line x1={126} y1={126} x2={166} y2={126} stroke={INK3} strokeWidth="1" markerEnd="url(#af-arrow)" />

        {/* the routing layer */}
        <rect x={168} y={92} width={130} height={68} rx={2} fill={PAPER} stroke={INK} />
        <text x={233} y={116} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
          Routing layer
        </text>
        <text x={233} y={134} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          picks the owner,
        </text>
        <text x={233} y={148} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          not the person
        </text>

        <line x1={298} y1={126} x2={336} y2={126} stroke={INK3} strokeWidth="1" markerEnd="url(#af-arrow)" />

        {/* the six agents, as rows in one panel */}
        <rect x={338} y={24} width={236} height={204} rx={2} fill={PAPER} stroke={INK} />
        <text x={456} y={46} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
          Six specialist agents
        </text>
        <line x1={338} y1={58} x2={574} y2={58} stroke={LINE} strokeWidth="1" />
        {AGENTS.map(([name, scope], i) => {
          const y = 80 + i * 24
          return (
            <g key={name}>
              <text x={356} y={y} fontSize="11.5" fill={INK2} fontFamily="Georgia, serif">
                {name}
              </text>
              <text x={556} y={y} textAnchor="end" fontSize="9.5" fill={INK3} fontFamily="ui-monospace, monospace">
                {scope}
              </text>
            </g>
          )
        })}
        <text x={456} y={216} textAnchor="middle" fontSize="9.5" fill={INK3} fontFamily="ui-monospace, monospace">
          each holds only its own tools
        </text>

        {/* grounded answers */}
        <line x1={574} y1={96} x2={606} y2={96} stroke={HI} strokeWidth="1" strokeDasharray="3 3" />
        <rect x={610} y={70} width={152} height={52} rx={2} fill={PAPER} stroke={HI} strokeWidth="1.2" />
        <text x={686} y={92} textAnchor="middle" fontSize="12" fill={HI} fontFamily="Georgia, serif">
          Policy documents
        </text>
        <text x={686} y={108} textAnchor="middle" fontSize="9.5" fill={INK3} fontFamily="ui-monospace, monospace">
          answers cite a source
        </text>

        {/* one record per request, written whatever the outcome */}
        <path
          d="M 233 160 L 233 252 L 604 252"
          fill="none"
          stroke={SIGNAL}
          strokeWidth="1"
          markerEnd="url(#af-arrow-signal)"
        />
        <rect x={610} y={226} width={234} height={52} rx={2} fill={PAPER} stroke={SIGNAL} strokeWidth="1.2" />
        <text x={727} y={248} textAnchor="middle" fontSize="12" fill={SIGNAL} fontFamily="Georgia, serif">
          One telemetry record per request
        </text>
        <text x={727} y={264} textAnchor="middle" fontSize="9.5" fill={INK3} fontFamily="ui-monospace, monospace">
          latency · tokens · failure
        </text>

        <text x={8} y={192} fontSize="10.5" fill={INK2} fontFamily="ui-monospace, monospace">
          Six agents as built in the
        </text>
        <text x={8} y={208} fontSize="10.5" fill={INK2} fontFamily="ui-monospace, monospace">
          demonstration environment.
        </text>
        <text x={8} y={224} fontSize="10.5" fill={INK2} fontFamily="ui-monospace, monospace">
          Not every workflow area
        </text>
        <text x={8} y={240} fontSize="10.5" fill={INK2} fontFamily="ui-monospace, monospace">
          was complete.
        </text>
      </svg>
    </Figure>
  )
}
