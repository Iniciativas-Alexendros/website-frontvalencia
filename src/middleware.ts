import type { MiddlewareHandler } from 'astro';

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '0',
};

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' https://tracker.metricool.com https://connect.facebook.net https://www.covermanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://tracker.metricool.com https://www.facebook.com https://back.frontvalencia.com",
  "font-src 'self'",
  "frame-src 'self' https://www.covermanager.com https://www.google.com/maps",
  "connect-src 'self' https://www.facebook.com https://api.metricool.com https://*.ingest.sentry.io https://*.sentry.io",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://www.covermanager.com",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  
  // Apply security headers
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  
  // CSP header
  response.headers.set('Content-Security-Policy', CSP_DIRECTIVES);
  
  return response;
};
