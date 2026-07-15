import { describe, it, expect } from 'vitest'
import { LOCALES, DEFAULT_LOCALE, getAlternateHref, parseLocale } from '../src/lib/i18n'

describe('i18n', () => {
  it('exposes the two supported locales with a Spanish default', () => {
    expect(LOCALES).toEqual(['es', 'en'])
    expect(DEFAULT_LOCALE).toBe('es')
  })

  describe('getAlternateHref', () => {
    it('maps an ES path to its EN counterpart', () => {
      expect(getAlternateHref('en', '/es/carta/', 'https://x.com')).toBe('https://x.com/en/carta/')
    })

    it('maps an EN path to its ES counterpart', () => {
      expect(getAlternateHref('es', '/en/menu/', 'https://x.com')).toBe('https://x.com/es/menu/')
    })

    it('uses the provided site as base URL', () => {
      expect(getAlternateHref('en', '/es/', 'https://frontvalencia.com')).toBe('https://frontvalencia.com/en/')
    })
  })

  describe('parseLocale', () => {
    it('parses the locale and remaining path', () => {
      const { locale, pathWithoutLocale } = parseLocale(new URL('https://x.com/en/booking-conditions/'))
      expect(locale).toBe('en')
      expect(pathWithoutLocale).toBe('/booking-conditions/')
    })

    it('falls back to the default locale when no prefix is present', () => {
      const { locale } = parseLocale(new URL('https://x.com/random'))
      expect(locale).toBe(DEFAULT_LOCALE)
    })
  })
})
