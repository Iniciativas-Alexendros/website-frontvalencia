import { s3Storage } from '@payloadcms/storage-s3'

export const r2Storage = s3Storage({
  collections: { media: true },
  bucket: process.env.R2_BUCKET ?? 'frontvalencia',
  config: {
    endpoint: process.env.R2_ENDPOINT,
    region: 'auto',
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
    },
  },
  /**
   * CDN base URL para servir imágenes en producción.
   * En dev local se omite → Payload sirve directamente.
   */
  ...(process.env.R2_PUBLIC_URL ? { cdn: process.env.R2_PUBLIC_URL } : {}),
})
