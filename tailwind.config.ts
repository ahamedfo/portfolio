import type { Config } from 'tailwindcss'

/**
 * Linear.
 *
 * Every value here comes from DESIGN.md at the repo root, vendored from
 * voltagent/awesome-design-md. Read that file before changing any of it. The
 * three deviations from the system as written are documented at the top of it
 * and repeated in the comments below, so nobody has to go looking.
 *
 * The one idea to hold on to: hierarchy comes from the SURFACE LADDER, not
 * from borders. Canvas, then surface-1 for a panel, then surface-2 for a
 * featured or hovered panel. A page built out of hairline rules is the thing
 * this system exists to replace.
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
        // Never #000000. The faint blue tint is the point.
        canvas: '#010102',
        surface: {
          1: '#0f1011', // panels, cards
          2: '#141516', // featured or hovered panel
          3: '#18191a', // menus, sub-nav
          4: '#191a1b',
        },
        // Decorative. Deliberately below 3:1. A panel is identified by its
        // fill, not by its edge, so these never carry meaning.
        hairline: '#23252a',
        'hairline-strong': '#34343a',

        ink: {
          DEFAULT: '#f7f8f8', // 17.90:1 on surface-1
          muted: '#d0d6e0', // 13.04:1
          subtle: '#8a8f98', // 5.86:1
        },
        // DEVIATION: never used for text, where it measures 3.30:1 and fails.
        // This is the border colour for interactive controls, where the bar is
        // 3:1 and it clears it.
        control: '#62666d',

        // The single chromatic accent. Brand mark, focus ring, primary CTA.
        // Never a section background, never a card fill.
        primary: {
          DEFAULT: '#5e6ad2', // white on this measures 4.70:1 and passes
          // DEVIATION: this is the LINK TEXT colour, 6.64:1 on surface-1.
          // Base lavender as text is 4.05:1 and fails. It is also the focus
          // ring and the hover ring on the primary button, whose fill does
          // not lighten, because white on #828fff drops to 2.87:1.
          hover: '#828fff',
          focus: '#5e69d1',
        },

        success: '#27a644',

        /**
         * DEVIATION: a second chromatic accent, scoped to the route chart.
         *
         * Linear forbids this. A chart does not have the option: two lines
         * have to be tellable apart and a held claim has to read as held.
         * These three were snapped into the dark-mode OKLCH lightness band
         * and passed a palette validator for lightness, chroma floor,
         * protan/deutan separation, normal-vision floor, and contrast. They
         * appear nowhere outside the rail and its marks.
         *
         * Status is also carried by SHAPE, so the chart does not depend on
         * anyone telling these hues apart.
         */
        chart: {
          industry: '#B47819', // 5.12:1 on surface-1
          research: '#04999B', // 5.47:1
          held: '#CF5E53', // 4.88:1. mark only, never text
        },
      },

      fontFamily: {
        // One family from display to body, per the typography principles.
        // Inter is the substitute DESIGN.md itself names.
        sans: ['var(--font-sans)', 'SF Pro Display', 'system-ui', 'sans-serif'],
        // Data readouts only. Stays out of marketing chrome.
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      fontSize: {
        // Tracking pulls aggressively negative on display, roughly 4% of size,
        // and relaxes to nothing at body. The eyebrow goes the other way.
        'display-xl': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.1875rem', fontWeight: '600' }],
        'display-lg': ['3.5rem', { lineHeight: '1.10', letterSpacing: '-0.1125rem', fontWeight: '600' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.0625rem', fontWeight: '600' }],
        headline: ['1.75rem', { lineHeight: '1.20', letterSpacing: '-0.0375rem', fontWeight: '600' }],
        'card-title': ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.025rem', fontWeight: '500' }],
        subhead: ['1.25rem', { lineHeight: '1.40', letterSpacing: '-0.0125rem', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        caption: ['0.8125rem', { lineHeight: '1.4' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.04em', fontWeight: '500' }],
      },

      spacing: {
        // 4px base. `section` is the one that matters: 96px of nothing is what
        // makes the page breathe instead of stack.
        section: '6rem',
      },

      borderRadius: {
        xs: '4px', // chips, status badges
        sm: '6px', // inline tags
        md: '8px', // buttons, inputs. never pill
        lg: '12px', // cards and panels. the default
        xl: '16px', // the big framed figures
      },

      maxWidth: {
        prose: '62ch',
        frame: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
