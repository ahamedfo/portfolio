/**
 * Must match `basePath` / `assetPrefix` in next.config.js.
 * next/link prefixes hrefs automatically, but plain <img src> does not,
 * so every static asset reference goes through asset().
 */
export const BASE_PATH = '/portfolio'

export const asset = (p: string) => `${BASE_PATH}${p}`

/**
 * Master switch for links to source repositories.
 * The research repos are not public yet. Flip this to true once
 * they are pushed to github.com/ahamedfo and every "code" link
 * on the site turns on.
 */
export const CODE_LINKS_ENABLED = false
