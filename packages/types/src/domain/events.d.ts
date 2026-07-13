import type { z } from 'zod'

export interface Event {
  id: string
  title: string
  description?: string
  date: string
  endDate?: string
  time?: string
  location?: string
  capacity?: number
  price?: number
  images?: string[]
  isActive: boolean
  isPublic: boolean
}

export interface EventRegistration {
  id: string
  eventId: string
  attendeeName: string
  attendeeEmail: string
  attendees?: number
  registrationDate: string
  status: 'confirmed' | 'cancelled' | 'waitlist'
}
