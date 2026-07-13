import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const CONTENT_DIR = path.resolve(__dirname, '../../content/menu');

describe('Menu Content Collections', () => {
  const esMenu = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'es.json'), 'utf-8'));
  const enMenu = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'en.json'), 'utf-8'));

  it('ES menu has lang set to es', () => {
    expect(esMenu.lang).toBe('es');
  });

  it('EN menu has lang set to en', () => {
    expect(enMenu.lang).toBe('en');
  });

  it('ES menu has categories array', () => {
    expect(Array.isArray(esMenu.categories)).toBe(true);
    expect(esMenu.categories.length).toBeGreaterThan(0);
  });

  it('EN menu has categories array', () => {
    expect(Array.isArray(enMenu.categories)).toBe(true);
    expect(enMenu.categories.length).toBeGreaterThan(0);
  });

  it('every category has a name and items array', () => {
    for (const cat of esMenu.categories) {
      expect(typeof cat.name).toBe('string');
      expect(cat.name.length).toBeGreaterThan(0);
      expect(Array.isArray(cat.items)).toBe(true);
    }
  });

  it('every item has a name string', () => {
    for (const cat of esMenu.categories) {
      for (const item of cat.items) {
        expect(typeof item.name).toBe('string');
        expect(item.name.length).toBeGreaterThan(0);
      }
    }
  });

  it('items with prices have valid format', () => {
    for (const cat of esMenu.categories) {
      for (const item of cat.items) {
        if (item.price) {
          expect(item.price).toMatch(/^\d+[.,]\d{2}€$/);
        }
      }
    }
  });

  it('allergens are arrays of numbers', () => {
    for (const cat of esMenu.categories) {
      for (const item of cat.items) {
        if (item.allergens) {
          expect(Array.isArray(item.allergens)).toBe(true);
          for (const a of item.allergens) {
            expect(typeof a).toBe('number');
            expect(a).toBeGreaterThanOrEqual(1);
            expect(a).toBeLessThanOrEqual(14);
          }
        }
      }
    }
  });

  it('allergen legend has 14 items', () => {
    expect(esMenu.allergenLegend).toBeDefined();
    expect(esMenu.allergenLegend.length).toBe(14);
    for (const a of esMenu.allergenLegend) {
      expect(typeof a.code).toBe('number');
      expect(typeof a.name).toBe('string');
    }
  });

  it('ES and EN menus have the same number of categories', () => {
    expect(esMenu.categories.length).toBe(enMenu.categories.length);
  });
});
