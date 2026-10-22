import type { Config } from 'tailwindcss'

/**
 * Deep field.
 *
 * The page is a dark navy field with a route drawn across it. Everything you
 * READ is ink on that field; everything PLOTTED is a mark with a meaning.
 *
 * Colour rules, and why they are rules:
 *
 *   Two categorical hues, `industry` and `research`, identify the two lines of
 *   the route. They were snapped into the dark-mode OKLCH lightness band and
 *   run through the palette validator: lightness, chroma floor, protan/deutan
 *   separation, normal-vision floor, and contrast against the field all pass.
 *   Do not hand-edit them. If a third line is ever needed, re-run the validator
 *   rather than inventing a hue.
 *
 *   `held` is a STATUS colour, not a third series. It marks something stopped,
 *   blocked, or not established, and it never means "the next category".
 *
 *   Status is never carried by colour alone. On the route, hue says which line
 *   a mark rides and SHAPE says its state: solid for shipped, ring for a demo
 *   or pilot, broken ring for stopped. That keeps the diagram readable in
 *   grayscale and under colour-vision deficiency.
 *
 *   Text never wears a series colour. Values, labels, and legends stay in ink;
 *   a coloured mark beside them carries the identity.
 *
 *   `now` is pure white and is spent in exactly one place: the live end of the
 *   route. Using it anywhere else costs it its meaning.
 *
 * Contrast ratios below are against `void` / `plate`, the two surfaces text can
 * land on. Small metadata type is never "large text", so ink has to clear AA on
 * the lighter of the two surfaces, not just the darker one.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0B1220', // the field
        plate: '#131C2E', // raised surfaces: records, figures, the readout
        grid: '#1E2A40', // the dot grid. decorative, deliberately below 3:1
        rule: '#2A3A55', // hairline rules. decorative
        edge: '#64708A', // the visible boundary of an interactive control. 3.43:1 on plate

        ink: {
          1: '#E8EDF5', // 15.93:1 void / 14.48:1 plate
          2: '#A8B4C8', // 8.94:1 / 8.13:1
          3: '#7A89A3', // 5.29:1 / 4.81:1
        },

        // Categorical. Validated as a set; see the note above.
        industry: '#B47819', // 5.03:1 / 4.57:1
        research: '#04999B', // 5.38:1 / 4.89:1

        // Status. Mark only, never text: it is 4.36:1 on plate, under AA for body copy.
        held: '#CF5E53',

        now: '#FFFFFF', // spent once, on the live end of the route
      },

      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      maxWidth: {
        prose: '62ch',
        frame: '1180px',
      },

      letterSpacing: {
        // Display runs tight; labels run wide. Width is what separates the two
        // sans faces, so it has to be deliberate in both directions.
        display: '-0.02em',
        label: '0.14em',
      },

      fontSize: {
        label: ['0.6875rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}

export default config
