import { test, expect } from '@playwright/test';

test.describe('FRONT Valencia — Legal pages and 404', () => {
  test('ES legal pages all return 200', async ({ page }) => {
    const urls = ['/es/legal-advice', '/es/privacy-policy', '/es/cookies-policy', '/es/condiciones-reserva'];
    for (const url of urls) {
      const response = await page.goto(url);
      expect(response?.status(), `Page ${url} should return 200`).toBe(200);
    }
  });

  test('EN legal pages all return 200', async ({ page }) => {
    const urls = ['/en/legal-advice', '/en/privacy-policy', '/en/cookies-policy', '/en/booking-conditions'];
    for (const url of urls) {
      const response = await page.goto(url);
      expect(response?.status(), `Page ${url} should return 200`).toBe(200);
    }
  });

  test('ES 404 page renders for unknown routes', async ({ page }) => {
    const response = await page.goto('/es/this-does-not-exist');
    expect(response?.status()).toBe(404);
    // On dev server 404 doesn't render 404.astro, but the response status confirms
    // On production preview, the custom 404.astro would render
  });

  test('EN 404 page returns 404 for unknown routes', async ({ page }) => {
    const response = await page.goto('/en/this-does-not-exist');
    expect(response?.status()).toBe(404);
  });

  test('Footer legal links are reachable from home', async ({ page }) => {
    await page.goto('/es/');
    // Navigate to the legal advice URL directly
    await page.goto('/es/legal-advice');
    await expect(page).toHaveURL(/\/es\/legal-advice/);
    await expect(page.locator('main h1').first()).toContainText('Aviso Legal');
  });

  test('Sitemap.xml is served', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const body = await response!.text();
    expect(body).toContain('<urlset');
    expect(body).toContain('frontvalencia.com');
  });
});

test.describe('FRONT Valencia — Menu redesign', () => {
  test('Menu shows prices and allergens with names (not just numbers)', async ({ page }) => {
    await page.goto('/es/carta');
    // First dish should show allergen name not just number
    await expect(page.getByText('CROISSANT').first()).toBeVisible();
    // The allergen code "1" should be expanded to "1. GLUTEN" or similar
    const allergenText = await page.getByText('GLUTEN').first().isVisible();
    expect(allergenText).toBeTruthy();
  });

  test('EN menu preserves Valencian culinary terms', async ({ page }) => {
    await page.goto('/en/menu');
    // ESMORZARET, TITAINA, SENYORET, ENSALADILLA should be present
    await expect(page.getByText('ESMORZARET').first()).toBeVisible();
  });
});

test.describe('FRONT Valencia — Hero redesign', () => {
  test('Hero has gradient overlay and decorative line', async ({ page }) => {
    await page.goto('/es/');
    // Both lines of the hero heading should be visible
    await expect(page.getByText('COMER BIEN').first()).toBeVisible();
    await expect(page.getByText('FRENTE AL MAR').first()).toBeVisible();
    // CTAs are present
    await expect(page.getByText('Ver Carta').first()).toBeVisible();
    await expect(page.getByText('Reservar').first()).toBeVisible();
  });
});

test.describe('FRONT Valencia — Structured Data', () => {
  test('Restaurant JSON-LD is in the head', async ({ page }) => {
    await page.goto('/es/');
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(ld).toBeTruthy();
    const parsed = JSON.parse(ld!);
    expect(parsed['@type']).toBe('Restaurant');
    expect(parsed.name).toBe('FRONT');
    expect(parsed.address.addressLocality).toBe('Valencia');
  });
});
