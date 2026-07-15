import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

type Item = {
  name: string
  price?: string
  allergens?: string[]
  tags?: string[]
}
type Category = { name: string; items?: Item[]; menus?: unknown[] }
type Menu = {
  lang: string
  categories: Category[]
  allergenLegend: { code: string; label: string }[]
}

const load = (lang: string): Menu =>
  JSON.parse(readFileSync(join(process.cwd(), 'src/content/menu', `${lang}.json`), 'utf-8'))

const es = load('es')
const en = load('en')

const menus: [string, Menu][] = [
  ['es', es],
  ['en', en],
]

describe('menu content', () => {
  for (const [lang, menu] of menus) {
    describe(`${lang}.json`, () => {
      it('declares the matching lang field', () => {
        expect(menu.lang).toBe(lang)
      })

      it('has a non-empty list of categories', () => {
        expect(Array.isArray(menu.categories)).toBe(true)
        expect(menu.categories.length).toBeGreaterThan(0)
      })

      it('every category has a name', () => {
        for (const cat of menu.categories) {
          expect(cat.name, JSON.stringify(cat)).toBeTruthy()
        }
      })

      it('ships an allergen legend', () => {
        expect(Array.isArray(menu.allergenLegend)).toBe(true)
        expect(menu.allergenLegend.length).toBeGreaterThan(0)
      })

      it('does not reintroduce leading item numbering (e.g. "01.", "02.")', () => {
        for (const cat of menu.categories) {
          for (const item of cat.items ?? []) {
            expect(item.name, item.name).not.toMatch(/^\s*\d{1,2}[.)]\s/)
          }
        }
      })
    })
  }

  it('ES and EN expose the same number of categories', () => {
    expect(es.categories.length).toBe(en.categories.length)
  })

  it('ES and EN expose the same allergen legend size', () => {
    expect(es.allergenLegend.length).toBe(en.allergenLegend.length)
  })
})
