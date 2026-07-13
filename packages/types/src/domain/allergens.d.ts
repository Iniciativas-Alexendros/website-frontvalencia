export interface Allergen {
  id: string
  name: string
  description?: string
  code: number
  category?: 'food' | 'drink' | 'other'
}

export interface MenuAllergen {
  allergenId: string
  menuItemId: string
  intensity?: 'low' | 'medium' | 'high'
}
