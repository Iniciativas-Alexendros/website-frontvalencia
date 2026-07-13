import type { z } from 'zod'

export interface SiteConfig {
  name: string
  tagline: string
  description?: string
  ogImage: string
  ogLocale: string
  contact: ContactInfo
  location: LocationInfo
  hours: HoursInfo
  social?: SocialInfo
  externalLinks: ExternalLinks
  legal: LegalInfo
  seo?: SEOConfig
  language: 'es' | 'en'
}

export interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  reservationsEmail: string
  eventsEmail: string
}

export interface LocationInfo {
  address: string
  city: string
  postalCode: string
  area?: string
  mapsUrl: string
  transport: TransportInfo
}

export interface TransportInfo {
  bus: string[]
  parking: string
  bikeParking: string
}

export interface HoursInfo {
  weekday: string
  weekend: string
  nights?: string
  nightsNote?: string
}

export interface SocialInfo {
  instagram?: string
  facebook?: string
}

export interface ExternalLinks {
  club: string
  careers: string
  reservations: ReservationLinks
}

export interface ReservationLinks {
  provider: string
  es: string
  en: string
}

export interface LegalInfo {
  copyright: string
  legalAdvice: string
  privacyPolicy: string
  cookiesPolicy: string
}

export interface SEOConfig {
  [lang: string]: SEOFields
}

export interface SEOFields {
  homeTitle: string
  homeDescription: string
  menuTitle?: string
  cartaTitle?: string
  espacioTitle?: string
  spaceTitle?: string
  localizacionTitle?: string
  locationTitle?: string
  reservasTitle?: string
  bookTitle?: string
}
