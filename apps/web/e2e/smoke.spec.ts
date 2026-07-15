import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Section ids rendered per locale. These must stay in sync with the anchors
 * used by the navbar / hero / structured data. A mismatch (the historical
 * "#localizacion" vs "#location" bug) is caught by the anchor-integrity test.
 */
const SECTIONS: Record<'es' | 'en', string[]> = {
  es: ['carta', 'espacio', 'localizacion', 'reservas'],
  en: ['carta', 'space', 'location', 'book'],
}

for (const lang of ['es', 'en'] as const) {
  test.describe(`${lang} home`, () => {
    test('renders every section anchor', async ({ page }) => {
      await page.goto(`/${lang}/`)
      for (const id of SECTIONS[lang]) {
        await expect(page.locator(`#${id}`)).toBeAttached()
      }
    })

    test('every in-page navbar link targets an existing element', async ({ page }) => {
      await page.goto(`/${lang}/`)
      const hrefs = await page
        .locator('#site-header a[href^="#"]')
        .evaluateAll((els) => els.map((el) => el.getAttribute('href')).filter(Boolean))
      expect(hrefs.length).toBeGreaterThan(0)
      for (const href of hrefs) {
        const id = (href as string).slice(1)
        await expect(page.locator(`#${id}`), `navbar points to #${id} which must exist in the DOM`).toBeAttached()
      }
    })

    test('has no serious or critical accessibility violations', async ({ page }) => {
      await page.goto(`/${lang}/`)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join('\n')).toEqual([])
    })
  })
}

test('cookie consent banner appears on first visit', async ({ page }) => {
  await page.goto('/es/')
  await expect(page.getByRole('dialog', { name: /cookies/i })).toBeVisible({
    timeout: 10_000,
  })
})
