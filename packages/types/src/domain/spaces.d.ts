import type { z } from 'zod'

export interface Space {
  id: string
  name: string
  description?: string
  capacity?: number
  images?: string[]
  features?: string[]
  price?: number
  availability?: AvailabilitySlot[]
  location?: string
}

export interface AvailabilitySlot {
  date: string
  available: boolean
  price?: number
}
