import { describe, it, expect } from 'vitest';

// i18n utility tests
describe('i18n utilities', () => {
  function getLocaleFromPath(pathname: string): 'es' | 'en' {
    return pathname.startsWith('/en') ? 'en' : 'es';
  }

  function localizedPath(pathname: string, targetLang: 'es' | 'en'): string {
    const clean = pathname.replace(/^\/(es|en)/, '') || '/';
    return `/${targetLang}${clean}`;
  }

  it('detects ES from path', () => {
    expect(getLocaleFromPath('/es/')).toBe('es');
    expect(getLocaleFromPath('/es/carta')).toBe('es');
  });

  it('detects EN from path', () => {
    expect(getLocaleFromPath('/en/')).toBe('en');
    expect(getLocaleFromPath('/en/menu')).toBe('en');
  });

  it('defaults to ES for root path', () => {
    expect(getLocaleFromPath('/')).toBe('es');
  });

  it('converts ES path to EN', () => {
    expect(localizedPath('/es/carta', 'en')).toBe('/en/carta');
    expect(localizedPath('/es/', 'en')).toBe('/en/');
  });

  it('converts EN path to ES', () => {
    expect(localizedPath('/en/menu', 'es')).toBe('/es/menu');
  });
});
