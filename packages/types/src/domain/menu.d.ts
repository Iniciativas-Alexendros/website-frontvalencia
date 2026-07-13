export interface MenuItem {
  number?: number
  name: string
  description?: string
  price?: string
  allergens?: number[]
  tags?: MenuItemTag[]
  note?: string
}

export interface MenuCategory {
  name: string
  time?: string
  note?: string
  items: MenuItem[]
}

export interface MenuData {
  lang: 'es' | 'en'
  categories: MenuCategory[]
  allergenLegend?: AllergenLegend[]
  notes?: string[]
}

export type MenuItemTag = 'ecologico' | 'sin-gluten' | 'vegano' | 'picante'

export interface AllergenLegend {
  code: number
  name: string
}
