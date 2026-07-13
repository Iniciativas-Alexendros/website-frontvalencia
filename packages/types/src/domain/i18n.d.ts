export interface TranslationKey {
  key: string
  es: string
  en: string
}

export interface Translations {
  [key: string]: string
}

export interface LocaleData {
  locale: 'es' | 'en'
  translations: Translations
}
