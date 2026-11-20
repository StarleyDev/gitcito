/**
 * The name this build shows, and who it credits.
 *
 * Git HuttBr is built from Gitcito. Rather than rewrite "Gitcito" across the
 * fifteen dictionaries and the translated handbook — which would conflict with
 * every upstream update — the text stays as upstream writes it and is branded
 * at display time, through `brandText`. Identifiers are never touched: the
 * `.gitcito.json` repo file, the `gitcito` CLI, GITCITO_* variables and the
 * settings folder are all lower- or upper-case, and only the capitalised word
 * is replaced.
 */
export const PRODUCT_NAME = 'Git HuttBr'
export const AUTHOR_NAME = 'Starley - Mestre Jedi'
export const AUTHOR_URL = 'https://github.com/StarleyDev'

// A whole word that is not part of a path, URL or identifier: no letter, digit,
// `/`, `.`, `-` or `_` on either side. `github.com/MyAppDesk/gitcito` keeps
// working; "Gitcito's commit graph" becomes "Git HuttBr's commit graph".
const word = (w: string): RegExp => new RegExp(`(?<![\\w/.\\-])${w}(?![\\w/\\-])`, 'g')
const UPSTREAM_PRODUCT = word('Gitcito')
const UPSTREAM_AUTHOR = word('MyAppDesk')

export function brandText(text: string): string {
  return text.replace(UPSTREAM_PRODUCT, PRODUCT_NAME).replace(UPSTREAM_AUTHOR, AUTHOR_NAME)
}
