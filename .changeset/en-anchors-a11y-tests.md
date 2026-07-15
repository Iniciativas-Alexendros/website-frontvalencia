---
'frontvalencia-web': patch
---

Corrección de navegación en inglés y mejoras de calidad:

- Fix: los anchors del navbar, Hero, JSON-LD (BreadcrumbList) y sitemap en la
  versión EN apuntaban a `#espacio`/`#localizacion`/`#reservas` (ids solo válidos
  en ES). Ahora usan los ids reales de EN: `#space`/`#location`/`#book`.
- Fix accesibilidad: se sube el contraste de `--color-text-muted` para cumplir
  WCAG AA (4.5:1) sobre fondos oscuros.
- Redirects 301 de las rutas antiguas (`/es/carta`, `/en/menu`, etc.) hacia los
  anchors del SPA, preservando SEO.
- Tests: 19 unitarios (i18n + contenido de menú + cliente Payload) y 14 E2E con
  Playwright (integridad de anchors, cookie consent y axe-core a11y en ES/EN,
  escritorio y móvil). Nuevo job de CI E2E & Accessibility.
- Limpieza de carpetas vacías y artefactos locales.
