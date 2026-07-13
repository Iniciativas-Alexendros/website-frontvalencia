import { test, expect } from '@playwright/test';

test.describe('FRONT Valencia — Navigation', () => {
  test('home page loads with hero', async ({ page }) => {
    await page.goto('/es/');
    await expect(page).toHaveTitle(/FRONT/);
    await expect(page.locator('main')).toBeVisible();
  });

  test('navigate to carta and see menu categories', async ({ page }) => {
    await page.goto('/es/carta');
    await expect(page.locator('h2')).toContainText('Carta');
    // Check that menu categories are rendered
    const categories = page.locator('h3');
    await expect(categories.first()).toBeVisible();
  });

  test('navigate to espacio', async ({ page }) => {
    await page.goto('/es/espacio');
    await expect(page.locator('h2').first()).toContainText('BRUTALISTA');
  });

  test('navigate to localizacion', async ({ page }) => {
    await page.goto('/es/localizacion');
    await expect(page.locator('main h2').first()).toContainText('LOCALIZACIÓN');
  });

  test('navigate to reservas', async ({ page }) => {
    await page.goto('/es/reservas');
    await expect(page.locator('main h2').first()).toContainText('RESERVA');
  });
});

test.describe('FRONT Valencia — Language switching', () => {
  test('EN home page loads', async ({ page }) => {
    await page.goto('/en/');
    await expect(page).toHaveTitle(/FRONT/);
  });

  test('EN menu page loads', async ({ page }) => {
    await page.goto('/en/menu');
    await expect(page.locator('h2')).toContainText('Menu');
  });
});

test.describe('FRONT Valencia — Cookie consent', () => {
  test('cookie banner appears on first visit', async ({ page }) => {
    await page.goto('/es/');
    // Cookie consent is a React island (client:idle) and animates in
    const banner = page.locator('[role="dialog"]');
    await expect(banner).toBeVisible({ timeout: 10000 });
  });

  test('accepting cookies stores consent', async ({ page }) => {
    await page.goto('/es/');
    const banner = page.locator('[role="dialog"]');
    await expect(banner).toBeVisible();

    // Click accept all
    await page.getByText('Aceptar todas').click();
    await expect(banner).not.toBeVisible();

    // Consent should be in localStorage
    const consent = await page.evaluate(() => localStorage.getItem('front-cookie-consent'));
    expect(consent).toBeTruthy();
    const parsed = JSON.parse(consent!);
    expect(parsed.analytics).toBe(true);
    expect(parsed.marketing).toBe(true);
  });

  test('rejecting cookies stores minimal consent', async ({ page }) => {
    await page.goto('/es/');
    const banner = page.locator('[role="dialog"]');
    await page.getByText('Rechazar').click();
    await expect(banner).not.toBeVisible();

    const consent = await page.evaluate(() => localStorage.getItem('front-cookie-consent'));
    const parsed = JSON.parse(consent!);
    expect(parsed.analytics).toBe(false);
    expect(parsed.marketing).toBe(false);
  });
});

test.describe('FRONT Valencia — External links', () => {
  test('The Club link has correct attributes', async ({ page }) => {
    await page.goto('/es/');
    const clubLinks = page.locator('a[href*="front.feending.io"]');
    const count = await clubLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(clubLinks.nth(i)).toHaveAttribute('target', '_blank');
      await expect(clubLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });

  test('Teamtailor careers link has correct attributes', async ({ page }) => {
    await page.goto('/es/');
    const careerLinks = page.locator('a[href*="teamtailor.com"]');
    const count = await careerLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(careerLinks.nth(i)).toHaveAttribute('target', '_blank');
      await expect(careerLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });
});

test.describe('FRONT Valencia — Accessibility', () => {
  test('skip-to-content link exists', async ({ page }) => {
    await page.goto('/es/');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toHaveCount(1);
  });

  test('all images have alt attributes', async ({ page }) => {
    await page.goto('/es/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
  });

  test('cookie consent has dialog role', async ({ page }) => {
    await page.goto('/es/');
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toHaveAttribute('aria-label');
  });
});
