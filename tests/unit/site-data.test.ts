import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const SITE = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/content/site.json'), 'utf-8'));
const ES_MENU = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/content/menu/es.json'), 'utf-8'));

describe('Site data (site.json)', () => {
  it('has required top-level keys', () => {
    expect(SITE.name).toBeTruthy();
    expect(SITE.tagline).toBeTruthy();
    expect(SITE.ogImage).toMatch(/^https?:\/\//);
    expect(SITE.contact).toBeDefined();
    expect(SITE.location).toBeDefined();
    expect(SITE.hours).toBeDefined();
    expect(SITE.social).toBeDefined();
    expect(SITE.externalLinks).toBeDefined();
    expect(SITE.legal).toBeDefined();
    expect(SITE.seo).toBeDefined();
  });

  it('contact block has all required fields', () => {
    expect(SITE.contact.phone).toMatch(/^\+\d/);
    expect(SITE.contact.email).toMatch(/@/);
    expect(SITE.contact.reservationsEmail).toMatch(/@/);
    expect(SITE.contact.eventsEmail).toMatch(/@/);
  });

  it('location has address and mapsUrl', () => {
    expect(SITE.location.address).toBeTruthy();
    expect(SITE.location.city).toBe('Valencia');
    expect(SITE.location.postalCode).toBeTruthy();
    expect(SITE.location.mapsUrl).toMatch(/^https?:\/\//);
  });

  it('transport block has bus lines and parking', () => {
    expect(Array.isArray(SITE.location.transport.bus)).toBe(true);
    expect(SITE.location.transport.bus.length).toBeGreaterThan(0);
    expect(SITE.location.transport.parking).toBeTruthy();
    expect(SITE.location.transport.bikeParking).toBeTruthy();
  });

  it('externalLinks has club, careers, and reservations', () => {
    expect(SITE.externalLinks.club).toMatch(/^https?:\/\//);
    expect(SITE.externalLinks.careers).toMatch(/^https?:\/\//);
    expect(SITE.externalLinks.reservations.provider).toBe('CoverManager');
    expect(SITE.externalLinks.reservations.es).toMatch(/^https?:\/\//);
    expect(SITE.externalLinks.reservations.en).toMatch(/^https?:\/\//);
  });

  it('SEO has ES and EN entries', () => {
    expect(SITE.seo.es).toBeDefined();
    expect(SITE.seo.en).toBeDefined();
    expect(SITE.seo.es.homeTitle).toBeTruthy();
    expect(SITE.seo.en.homeTitle).toBeTruthy();
  });
});

describe('Menu integrity (no Spanglish, ENSALADILLA preserved)', () => {
  it('no "FROM 13H" Spanglish in ES menu time fields', () => {
    for (const cat of ES_MENU.categories) {
      if (cat.time) {
        expect(cat.time, `Category "${cat.name}" has Spanglish time`).not.toMatch(/^FROM\s/);
      }
    }
  });

  it('ENSALADILLA RUSA is preserved in ES menu (not abbreviated to "EN SALADILLA")', () => {
    const dishes = ES_MENU.categories.flatMap((c: any) => c.items);
    const hasRussianSalad = dishes.some((d: any) => d.name.toLowerCase().includes('ensaladilla'));
    expect(hasRussianSalad).toBe(true);
  });
});
