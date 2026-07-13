import type { CollectionAfterChangeHook } from 'payload'

/**
 * Revalida el frontend Astro cuando cambia contenido en Payload.
 * > POST /api/revalidate?secret={previewSecret}&slug={collectionSlug}
 *
 * Registrado en cada collection como `afterChange: [revalidateWebhook]`.
 */
export const revalidateWebhook: CollectionAfterChangeHook = async ({ doc, req, collection }) => {
  // Solo en producción
  if (process.env.NODE_ENV !== 'production') return doc

  const webhookUrl = process.env.NEXT_PUBLIC_SITE_URL
  const secret = process.env.PAYLOAD_PREVIEW_SECRET

  if (!webhookUrl || !secret) return doc

  try {
    await fetch(`${webhookUrl}/api/revalidate?secret=${secret}&slug=${collection.slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    req.payload.logger.warn(`[revalidateWebhook] Error revalidating ${collection.slug}: ${err}`)
  }

  return doc
}
