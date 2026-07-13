export const LOCALES = ['es', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'es'

export const LOCALE_CONFIG: Record<Locale, { label: string; labelEn: string; href: string; hreflang: string }> = {
  es: { label: 'Español', labelEn: 'Spanish', href: 'es', hreflang: 'es' },
  en: { label: 'English', labelEn: 'English', href: 'en', hreflang: 'en' },
}

/** Genera enlace para el locale alternativo (hreflang) dada la URL actual */
export function getAlternateHref(locale: Locale, path: string): string {
  const prefix = path.startsWith('/es/') ? '/en/' : '/es/'
  const altPath = path.replace(/^\/(es|en)\//, prefix)
  return `https://frontvalencia.com${altPath}`
}

/** Parsea el locale de la URL actual */
export function parseLocale(url: URL): {
  locale: Locale
  pathWithoutLocale: string
} {
  const match = url.pathname.match(/^\/(es|en)\/(.*)/)
  if (!match) return { locale: DEFAULT_LOCALE, pathWithoutLocale: url.pathname }
  const locale = match[1] as Locale
  return { locale, pathWithoutLocale: `/${match[2]}` }
}
