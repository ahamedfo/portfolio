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
        line: '#DDD7C9',
        'line-strong': '#C9C2B1',
        ink: {
          1: '#1A1917',
          2: '#55514A',
          3: '#736E62',
        },
        hi: '#35639C', // full precision, complete
        lo: '#A8492F', // compressed, stopped
        signal: '#8F6317', // a reading, running
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
