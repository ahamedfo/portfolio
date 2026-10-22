/**
 * DEPLOYMENT CONTRACT. Read this before changing next.config.js.
 *
 * The site is a static export served from a subdirectory on GitHub Pages at
 * https://ahamedfo.github.io/portfolio/, so three things must agree:
 *
 *   next.config.js  basePath and assetPrefix are both '/portfolio'
 *   this file       BASE_PATH matches them
 *   the workflow    uploads the `out` directory
 *
 * next/link prefixes internal hrefs automatically. A plain <img src>, a <link>,
 * or a fetch of a file in public/ does NOT, so every raw static asset must go
 * through asset(). There are no raw assets on the site today; this stays so the
 * first one added does not silently 404 in production while working locally.
 *
 * Direct links: `output: 'export'` writes one HTML file per route, including
 * one per case study id, so /portfolio/work/<id> resolves without client-side
 * routing. If the site ever moves to a custom domain at the root, set basePath
 * and assetPrefix to '' and BASE_PATH to '' together.
 */
export const BASE_PATH = '/portfolio'

export const asset = (p: string) => `${BASE_PATH}${p}`
