import type { Config } from 'tailwindcss'

/**
 * Warm paper, serif content, monospace metadata.
 *
 * The split is the whole idea: everything you READ is serif on paper,
 * everything MEASURED is monospace and tabular, and every figure is a dark
 * plate set into the page. Status colour is the only colour on the page and
 * it always means the same thing.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F3F0E8',
        raised: '#EAE6DB',
        line: '#DDD7C9', // hairline rules, decorative
        'line-strong': '#C9C2B1', // heavier rules, still decorative
        // The visible boundary of an interactive control. 3.47:1 on paper,
        // which clears the 3:1 that WCAG asks of a UI component edge.
        'line-control': '#8C8371',
        ink: {
          1: '#1A1917',
          2: '#55514A',
          // 4.94:1 on paper, 4.51:1 on raised. ink-3 carries small metadata
          // text, which is never "large text", so it has to clear AA on the
          // darker of the two surfaces, not just on paper.
          3: '#6C675C',
        },
        hi: '#35639C', // 5.40:1 on paper. a check that passed, a pilot
        lo: '#A8492F', // 5.04:1 on paper. a block, a bound, a stop
        signal: '#895F16', // 4.97:1 on paper, 4.54:1 on raised. links, status
        control: '#B6B0A2',
      },
      fontFamily: {
        serif: ['var(--font-source-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        prose: '66ch',
        frame: '1120px',
      },
      letterSpacing: {
        label: '0.12em',
      },
      fontSize: {
        label: ['0.6875rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}

export default config
