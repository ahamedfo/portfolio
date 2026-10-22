import Figure from './Figure'

/**
 * Document, vision facts, geometry check, GIS overlay.
 *
 * Every value drawn here is synthetic. No client deed, owner, parcel
 * identifier, or real location appears in this file. The bearings below were
 * made up to close cleanly on three sides and fail on the fourth, because the
 * failure is the thing worth drawing.
 */
const INK = '#1A1917'
const INK2 = '#55514A'
const INK3 = '#6C675C'
const LINE = '#C9C2B1'
const LO = '#A8492F'
const HI = '#35639C'
const PAPER = '#F3F0E8'

export default function DocumentGisDiagram() {
  return (
    <Figure
      id="document-gis"
      title="Scanned deed to checked geometry, with synthetic values"
      caption="Illustration with invented survey values. No client document, owner, parcel identifier, or location is shown. Drawn to explain the check, not to display real data."
      steps={[
        'A custom tool retrieves the scanned deed from the content repository.',
        'A vision model reads the bearings and distances into structured values.',
        'A deterministic routine walks the calls in order and measures how far the traverse misses its starting point.',
        'A traverse that does not close is rejected before anything downstream sees it.',
        'A traverse that closes is overlaid against the county parcel record.',
      ]}
    >
      <svg
        viewBox="0 52 880 222"
        className="h-auto w-full"
        role="img"
        aria-labelledby="document-gis-title document-gis-desc"
      >
        <desc id="document-gis-desc">
          A left to right pipeline. A scanned deed is retrieved, a vision model extracts four
          bearing and distance calls, a closure routine walks those calls and finds that the
          boundary does not return to its starting point, and the extraction is rejected. When
          closure succeeds instead, the geometry is overlaid on county parcel records.
        </desc>

        <defs>
          <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke={INK3} strokeWidth="1.3" />
          </marker>
        </defs>

        {/* 1. the scanned page */}
        <rect x={8} y={64} width={122} height={150} rx={2} fill={PAPER} stroke={LINE} />
        <text x={69} y={88} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
          Scanned deed
        </text>
        {[108, 120, 132, 144, 156, 168].map((y, i) => (
          <line
            key={y}
            x1={24}
            y1={y}
            x2={i % 3 === 2 ? 96 : 114}
            y2={y}
            stroke={LINE}
            strokeWidth={3}
          />
        ))}
        <text x={69} y={196} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          image, not text
        </text>

        <line x1={130} y1={139} x2={176} y2={139} stroke={INK3} strokeWidth="1" markerEnd="url(#dg-arrow)" />

        {/* 2. extracted facts */}
        <rect x={178} y={64} width={176} height={150} rx={2} fill={PAPER} stroke={LINE} />
        <text x={266} y={88} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
          Extracted calls
        </text>
        {[
          ['N 12 E', '210.0 ft'],
          ['S 78 E', '145.0 ft'],
          ['S 12 W', '210.0 ft'],
          ['N 78 W', '131.0 ft'],
        ].map(([bearing, dist], i) => (
          <g key={bearing}>
            <text x={194} y={112 + i * 22} fontSize="11" fill={INK2} fontFamily="ui-monospace, monospace">
              {bearing}
            </text>
            <text x={336} y={112 + i * 22} textAnchor="end" fontSize="11" fill={i === 3 ? LO : INK2} fontFamily="ui-monospace, monospace">
              {dist}
            </text>
          </g>
        ))}
        <text x={266} y={204} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          synthetic values
        </text>

        <line x1={354} y1={139} x2={400} y2={139} stroke={INK3} strokeWidth="1" markerEnd="url(#dg-arrow)" />

        {/* 3. the closure test, drawn as the traverse itself */}
        <rect x={402} y={64} width={190} height={150} rx={2} fill={PAPER} stroke={INK} />
        <text x={497} y={88} textAnchor="middle" fontSize="12.5" fill={INK} fontFamily="Georgia, serif">
          Closure check
        </text>
        {/* three sides walk cleanly */}
        <path d="M 440 186 L 462 118 L 556 134 L 534 192" fill="none" stroke={INK2} strokeWidth="1.5" />
        {/* the fourth does not land back on the start */}
        <path d="M 534 192 L 452 178" fill="none" stroke={LO} strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx={440} cy={186} r={3.5} fill={PAPER} stroke={INK} strokeWidth="1.3" />
        <circle cx={452} cy={178} r={3.5} fill={LO} />
        <text x={497} y={206} textAnchor="middle" fontSize="10.5" fill={LO} fontFamily="ui-monospace, monospace">
          misses the start by 14.2 ft
        </text>

        <line x1={592} y1={139} x2={638} y2={139} stroke={INK3} strokeWidth="1" markerEnd="url(#dg-arrow)" />

        {/* 4a. rejected */}
        <rect x={640} y={76} width={136} height={56} rx={2} fill={PAPER} stroke={LO} strokeWidth="1.3" />
        <text x={708} y={98} textAnchor="middle" fontSize="12.5" fill={LO} fontFamily="Georgia, serif">
          Does not close
        </text>
        <text x={708} y={116} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          extraction rejected
        </text>

        {/* 4b. accepted path, overlaid */}
        <rect x={640} y={148} width={136} height={56} rx={2} fill={PAPER} stroke={HI} strokeWidth="1.2" />
        <text x={708} y={170} textAnchor="middle" fontSize="12.5" fill={HI} fontFamily="Georgia, serif">
          Closes
        </text>
        <text x={708} y={188} textAnchor="middle" fontSize="10" fill={INK3} fontFamily="ui-monospace, monospace">
          overlay on parcels
        </text>

        <line x1={776} y1={176} x2={812} y2={176} stroke={INK3} strokeWidth="1" markerEnd="url(#dg-arrow)" />
        <rect x={816} y={150} width={56} height={52} rx={2} fill={PAPER} stroke={LINE} />
        <path d="M 824 196 L 830 164 L 848 158 L 864 170 L 860 196 Z" fill="none" stroke={HI} strokeWidth="1.2" />
        <line x1={824} y1={180} x2={864} y2={176} stroke={LINE} strokeWidth="1" />

        <text x={8} y={240} fontSize="10.5" fill={INK2} fontFamily="ui-monospace, monospace">
          The closure test is arithmetic. The model that read the page has no influence over it.
        </text>
        <text x={8} y={258} fontSize="10.5" fill={INK2} fontFamily="ui-monospace, monospace">
          A closed boundary can still sit in the wrong place. Closure is consistency, not accuracy.
        </text>
      </svg>
    </Figure>
  )
}
