import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const site = import.meta.env.PUBLIC_SITE_URL || 'https://website-frontvalencia.vercel.app'
  const now = new Date().toISOString().split('T')[0]

  const routes = [
    { path: '/es/', priority: '1.0', changefreq: 'weekly' },
    { path: '/en/', priority: '1.0', changefreq: 'weekly' },
    { path: '/es/#carta', priority: '0.9', changefreq: 'monthly' },
    { path: '/en/#carta', priority: '0.9', changefreq: 'monthly' },
    { path: '/es/#espacio', priority: '0.8', changefreq: 'monthly' },
    { path: '/en/#espacio', priority: '0.8', changefreq: 'monthly' },
    { path: '/es/#localizacion', priority: '0.7', changefreq: 'monthly' },
    { path: '/en/#localizacion', priority: '0.7', changefreq: 'monthly' },
    { path: '/es/#reservas', priority: '0.8', changefreq: 'monthly' },
    { path: '/en/#reservas', priority: '0.8', changefreq: 'monthly' },
    { path: '/es/legal-advice', priority: '0.3', changefreq: 'yearly' },
    { path: '/en/legal-advice', priority: '0.3', changefreq: 'yearly' },
    { path: '/es/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/en/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/es/cookies-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/en/cookies-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/es/condiciones-reserva', priority: '0.4', changefreq: 'yearly' },
    { path: '/en/booking-conditions', priority: '0.4', changefreq: 'yearly' },
  ]

  const urlEntries = routes
    .map(({ path, priority, changefreq }) => {
      const isEn = path.startsWith('/en/')
      const altPath = path.replace(/^\/(es|en)\//, isEn ? '/es/' : '/en/')
      return `  <url>
    <loc>${site}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${site}${path.replace(/^\/en/, '/es')}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${site}${path.replace(/^\/es/, '/en')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/es/"/>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
