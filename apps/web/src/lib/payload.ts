import type { Menu, MenuCategory, Allergen, Space, Event, SiteConfig } from '@frontvalencia/types'

const API_URL = import.meta.env.PAYLOAD_API_URL ?? 'http://localhost:3001/api'
const PREVIEW_SECRET = import.meta.env.PAYLOAD_PREVIEW_SECRET ?? ''

type FetchOptions = {
  locale?: 'es' | 'en'
  draft?: boolean
  depth?: number
}

async function fetchCollection<T>(slug: string, options: FetchOptions = {}): Promise<T> {
  const { locale = 'es', draft = false, depth = 2 } = options
  const headers: Record<string, string> = {}

  if (draft && PREVIEW_SECRET) {
    headers['Authorization'] = `Bearer ${PREVIEW_SECRET}`
  }

  const params = new URLSearchParams({
    locale,
    depth: String(depth),
    ...(draft ? { draft: 'true' } : {}),
  })

  const res = await fetch(`${API_URL}/${slug}?${params}`, { headers })
  if (!res.ok) throw new Error(`Fetching ${slug} failed: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function getMenu(locale: 'es' | 'en' = 'es', draft = false): Promise<{ docs: Menu[] }> {
  return fetchCollection('menu-items', { locale, draft })
}

export async function getMenuCategories(locale: 'es' | 'en' = 'es', draft = false): Promise<{ docs: MenuCategory[] }> {
  return fetchCollection('menu-categories', { locale, draft })
}

export async function getAllergens(locale: 'es' | 'en' = 'es'): Promise<{ docs: Allergen[] }> {
  return fetchCollection('allergens', { locale, depth: 0 })
}

export async function getSpace(locale: 'es' | 'en' = 'es', draft = false): Promise<Space> {
  const res = await fetchCollection<{ docs: Space[] }>('spaces', {
    locale,
    draft,
  })
  return res.docs[0]
}

export async function getEvents(locale: 'es' | 'en' = 'es', draft = false): Promise<{ docs: Event[] }> {
  return fetchCollection('events', { locale, draft })
}

export async function getSiteConfig(locale: 'es' | 'en' = 'es'): Promise<SiteConfig> {
  const res = await fetch(`${API_URL}/globals/site-config?locale=${locale}`, {
    headers: { locale },
  })
  if (!res.ok) throw new Error(`Fetching site-config failed: ${res.status}`)
  return res.json()
}

export { fetchCollection }
