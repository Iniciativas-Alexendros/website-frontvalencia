import { defineMiddleware } from 'astro/middleware'
import { parseLocale } from './lib/i18n'

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '0',
}

const CSP = [
  "default-src 'self'",
  "script-src 'self' https://tracker.metricool.com https://connect.facebook.net https://www.covermanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://tracker.metricool.com https://back.frontvalencia.com blob:",
  "font-src 'self'",
  "frame-src 'self' https://www.covermanager.com https://www.google.com/maps",
  "connect-src 'self' https://*.r2.dev https://api.metricool.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://www.covermanager.com",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url)

  // — Preview Mode (desde Payload) —
  if (url.pathname.startsWith('/api/preview')) {
    const secret = url.searchParams.get('secret')
    const slug = url.searchParams.get('slug') ?? '/'
    const locale = url.searchParams.get('locale') ?? 'es'

    if (secret !== import.meta.env.PAYLOAD_PREVIEW_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    context.cookies.set('__preview', 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60, // 1h
    })

    return context.redirect(`/${locale}${slug.startsWith('/') ? slug : `/${slug}`}?preview=1`)
  }

  // — Apply security headers —
  const response = await next()

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  response.headers.set('Content-Security-Policy', CSP)

  // — Redirigir / → /es/ (default locale) —
  if (url.pathname === '/') {
    const locale = context.cookies.get('locale')?.value
    const target = locale && ['es', 'en'].includes(locale) ? locale : 'es'
    return context.redirect(`/${target}/`, 302)
  }

  return response
})
