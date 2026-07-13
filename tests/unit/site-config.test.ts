import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const SITE_PATH = path.resolve(__dirname, '../../content/site.json');

describe('Site configuration', () => {
  const site = JSON.parse(fs.readFileSync(SITE_PATH, 'utf-8'));

  it('has required top-level fields', () => {
    expect(site.name).toBe('FRONT');
    expect(site.tagline).toBeDefined();
    expect(site.description).toBeDefined();
  });

  it('has contact information', () => {
    expect(site.contact.phone).toBe('+34 965 020 349');
    expect(site.contact.email).toContain('@frontvalencia.com');
    expect(site.contact.eventsEmail).toContain('@frontvalencia.com');
    expect(site.contact.reservationsEmail).toContain('@frontvalencia.com');
  });

  it('has location data', () => {
    expect(site.location.address).toBeDefined();
    expect(site.location.city).toBe('Valencia');
    expect(site.location.mapsUrl).toContain('maps.app.goo.gl');
  });

  it('has hours', () => {
    expect(site.hours.weekday).toBeDefined();
    expect(site.hours.weekend).toBeDefined();
  });

  it('has external links with proper URLs', () => {
    expect(site.externalLinks.club).toContain('front.feending.io');
    expect(site.externalLinks.careers).toContain('teamtailor.com');
    expect(site.externalLinks.reservations.es).toContain('covermanager.com');
    expect(site.externalLinks.reservations.en).toContain('covermanager.com');
  });

  it('has legal links', () => {
    expect(site.legal.copyright).toBeDefined();
    expect(site.legal.legalAdvice).toBeDefined();
    expect(site.legal.privacyPolicy).toBeDefined();
    expect(site.legal.cookiesPolicy).toBeDefined();
  });

  it('has SEO data for both languages', () => {
    expect(site.seo.es.homeTitle).toBeDefined();
    expect(site.seo.en.homeTitle).toBeDefined();
  });
});
