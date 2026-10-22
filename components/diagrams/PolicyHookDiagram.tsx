import Figure from './Figure'

/**
 * Request, tool call, enforcement check, block plus audit event.
 *
 * A reconstruction drawn to explain the sequence. Not a replay, not a trace.
 * The whole point of the drawing is the fork at the check: the top path is the
 * one a confirmation prompt would have allowed, and the bottom path is what
 * actually happened.
 */
const INK = '#1A1917'
const INK2 = '#55514A'
const INK3 = '#6C675C'
const LINE = '#C9C2B1'
const LO = '#A8492F'
const HI = '#35639C'
const PAPER = '#F3F0E8'

function Box({
  x,
  y,
  w = 128,
  h = 52,
  stroke = LINE,
  children,
}: {
  x: number
  y: number
  w?: number
  h?: number
  stroke?: string
  children: React.ReactNode
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={PAPER} stroke={stroke} strokeWidth={1} />
      {children}
    </g>
  )
}

export default function PolicyHookDiagram() {
  return (
    <Figure
      id="policy-hook"
      title="Request to blocked action, as a sequence"
      caption="Reconstruction based on a recorded demonstration, drawn to explain the order of events. It is not a replay of the session, a live system trace, or production data."
      steps={[
        'A person asks the agent to clean something up.',
        'The agent resolves that into a concrete destructive tool call.',
        'The person is asked to confirm, and confirms.',
        'The policy check runs at the boundary where the call would execute, and refuses it.',
        'The refusal and the attempt are both written to the audit log.',
      ]}
    >
      <svg
        viewBox="0 24 880 278"
        className="h-auto w-full"
        role="img"
        aria-labelledby="policy-hook-title policy-hook-desc"
      >
        <desc id="policy-hook-desc">
          A left to right sequence. A user request becomes an agent tool call. The user confirms it.
          A policy check then rejects the call, so the destructive action never runs, and both the
          attempt and the refusal are recorded in an audit log.
        </desc>

        <defs>
          <marker id="ph-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke={INK3} strokeWidth="1.3" />
          </marker>
          <marker id="ph-arrow-lo" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke={LO} strokeWidth="1.3" />
          </marker>
        </defs>

        {/* 1. request */}
        <Box x={8} y={116} w={132}>
          <text x={74} y={138} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
            Person asks
          </text>
          <text x={74} y={154} textAnchor="middle" fontSize="11" fill={INK3} fontFamily="ui-monospace, monospace">
            &quot;clean this up&quot;
          </text>
        </Box>

        <line x1={140} y1={142} x2={186} y2={142} stroke={INK3} strokeWidth="1" markerEnd="url(#ph-arrow)" />

        {/* 2. agent resolves to a tool call */}
        <Box x={188} y={104} w={148} h={76}>
          <text x={262} y={126} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
            Agent tool call
          </text>
          <text x={262} y={146} textAnchor="middle" fontSize="11" fill={LO} fontFamily="ui-monospace, monospace">
            delete(resource)
          </text>
          <text x={262} y={164} textAnchor="middle" fontSize="10.5" fill={INK3} fontFamily="ui-monospace, monospace">
            destructive
          </text>
        </Box>

        <line x1={336} y1={142} x2={382} y2={142} stroke={INK3} strokeWidth="1" markerEnd="url(#ph-arrow)" />

        {/* 3. human confirmation, which passes */}
        <Box x={384} y={116} w={138}>
          <text x={453} y={138} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
            Person confirms
          </text>
          <text x={453} y={155} textAnchor="middle" fontSize="10.5" fill={INK3} fontFamily="ui-monospace, monospace">
            says yes
          </text>
        </Box>

        <line x1={522} y1={142} x2={568} y2={142} stroke={INK3} strokeWidth="1" markerEnd="url(#ph-arrow)" />

        {/* 4. the policy check. drawn heavier because it is the control */}
        <Box x={570} y={100} w={150} h={84} stroke={INK}>
          <text x={645} y={124} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
            Policy check
          </text>
          <text x={645} y={142} textAnchor="middle" fontSize="10.5" fill={INK3} fontFamily="ui-monospace, monospace">
            at the execution
          </text>
          <text x={645} y={157} textAnchor="middle" fontSize="10.5" fill={INK3} fontFamily="ui-monospace, monospace">
            boundary
          </text>
          <text x={645} y={175} textAnchor="middle" fontSize="10.5" fill={LO} fontFamily="ui-monospace, monospace">
            enforced
          </text>
        </Box>

        {/* path not taken: what a confirmation prompt alone would have allowed */}
        <path
          d="M 720 124 L 760 124 L 760 58"
          fill="none"
          stroke={LINE}
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <rect x={766} y={34} width={106} height={48} rx={2} fill="none" stroke={LINE} strokeDasharray="3 4" />
        <text x={819} y={54} textAnchor="middle" fontSize="11.5" fill={INK3} fontFamily="Georgia, serif">
          Action runs
        </text>
        <text x={819} y={70} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          did not happen
        </text>

        {/* what did happen */}
        <path d="M 720 160 L 752 160" fill="none" stroke={LO} strokeWidth="1.4" markerEnd="url(#ph-arrow-lo)" />
        <rect x={756} y={134} width={116} height={52} rx={2} fill={PAPER} stroke={LO} strokeWidth="1.3" />
        <text x={814} y={156} textAnchor="middle" fontSize="12.5" fill={LO} fontFamily="Georgia, serif">
          Blocked
        </text>
        <text x={814} y={172} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          never executes
        </text>

        {/* audit, fed by both the attempt and the refusal */}
        <path d="M 645 184 L 645 236 L 752 236" fill="none" stroke={HI} strokeWidth="1" markerEnd="url(#ph-arrow)" />
        <path d="M 262 180 L 262 262 L 752 262" fill="none" stroke={HI} strokeWidth="1" strokeDasharray="2 4" />
        <rect x={756} y={222} width={116} height={54} rx={2} fill={PAPER} stroke={HI} strokeWidth="1.2" />
        <text x={814} y={244} textAnchor="middle" fontSize="12.5" fill={HI} fontFamily="Georgia, serif">
          Audit event
        </text>
        <text x={814} y={260} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          attempt + refusal
        </text>

        <text x={8} y={290} fontSize="10.5" fill={INK2} fontFamily="ui-monospace, monospace">
          Dashed outline marks the path a confirmation prompt alone would have allowed.
        </text>
      </svg>
    </Figure>
  )
}
