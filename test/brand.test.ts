import { describe, it, expect } from 'vitest'
import { AUTHOR_NAME, PRODUCT_NAME, brandText } from '../src/shared/brand'
import { en } from '../src/renderer/src/i18n/en'
import { ptBR } from '../src/renderer/src/i18n/pt-BR'
import { ja } from '../src/renderer/src/i18n/ja'

describe('brandText', () => {
  it('renames the product and the author in prose', () => {
    expect(brandText("Gitcito's commit graph")).toBe(`${PRODUCT_NAME}'s commit graph`)
    expect(brandText('Open it in Gitcito.')).toBe(`Open it in ${PRODUCT_NAME}.`)
    expect(brandText('Add MyAppDesk as co-author')).toBe(`Add ${AUTHOR_NAME} as co-author`)
    // Scripts without spaces between words.
    expect(brandText('Gitcitoを開く')).toBe(`${PRODUCT_NAME}を開く`)
  })

  it('never touches identifiers, paths or URLs', () => {
    for (const s of [
      '.gitcito.json',
      'run `gitcito .` in a checkout',
      'GITCITO_SSH_DIR',
      'https://github.com/MyAppDesk/gitcito/issues',
      'https://myappdesk.github.io/gitcito/',
      '~/.config/Gitcito/shell-path',
      'Gitcito-Setup.exe',
      'gitcito-settings.json'
    ]) {
      expect(brandText(s)).toBe(s)
    }
    // Inside a Markdown link, the text changes and the URL does not.
    expect(brandText('[Gitcito](https://github.com/MyAppDesk/gitcito)')).toBe(
      `[${PRODUCT_NAME}](https://github.com/MyAppDesk/gitcito)`
    )
  })
})

describe('translations', () => {
  it('brand the credit lines in any language', () => {
    for (const dict of [en, ptBR, ja]) {
      expect(brandText(dict['settings.coAuthor'])).toContain(AUTHOR_NAME)
      expect(brandText(dict['settings.madeBy'])).not.toContain('MyAppDesk')
    }
  })
})
