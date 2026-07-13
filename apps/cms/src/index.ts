import { getPayload } from 'payload'
import config from './payload.config'

let cached: ReturnType<typeof getPayload> | null = null

/**
 * Singleton de Payload para uso en scripts y endpoints.
 * Reusa instancia en desarrollo, crea nueva en producción.
 */
export async function getPayloadClient() {
  if (cached && process.env.NODE_ENV !== 'production') return cached
  const client = await getPayload({ config })
  cached = client
  return client
}

export { config }
