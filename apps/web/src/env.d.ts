/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PAYLOAD_API_URL: string
  readonly PAYLOAD_PREVIEW_SECRET: string
  readonly PUBLIC_SITE_URL: string
  readonly PUBLIC_RESERVAS_ES_URL: string
  readonly PUBLIC_RESERVAS_EN_URL: string
  readonly PUBLIC_META_PIXEL_ID?: string
  readonly PUBLIC_GOOGLE_MAPS_EMBED_URL?: string
  readonly R2_PUBLIC_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
