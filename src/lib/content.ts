/**
 * Safe content collection access with error handling.
 * Returns an empty fallback if the collection or entry is missing/broken.
 */
import { getEntry } from 'astro:content';

export interface MenuCategory {
  name: string;
  time?: string;
  note?: string;
  items: Array<{
    number?: number;
    name: string;
    description?: string;
    price?: string;
    allergens?: number[];
    tags?: string[];
    note?: string;
  }>;
}

export interface MenuData {
  lang: 'es' | 'en';
  categories: MenuCategory[];
  allergenLegend?: Array<{ code: number; name: string }>;
  notes?: string[];
}

const empty: MenuData = { lang: 'es', categories: [] };

export async function safeGetMenu(lang: 'es' | 'en'): Promise<MenuData> {
  try {
    const entry = await getEntry('menu', lang);
    if (!entry) {
      console.warn(`[content] menu/${lang} not found`);
      return { ...empty, lang };
    }
    return entry.data as MenuData;
  } catch (e) {
    console.error(`[content] Failed to load menu/${lang}:`, e);
    return { ...empty, lang };
  }
}

export async function safeGetSite(): Promise<any | null> {
  try {
    const entry = await getEntry('site', 'site');
    return entry?.data ?? null;
  } catch (e) {
    console.error('[content] Failed to load site:', e);
    return null;
  }
}
