# frontvalencia-web

## 1.0.3

### Patch Changes

- 529f2e8: Refinamiento del Hero, tipografía de marca y documentación:

  - Copy del Hero (ES): "Saborea Valencia" y "frente al Mediterráneo.".
  - Tipografía: el subtítulo del Hero usa una fuente script self-hosted
    (Sacramento, OFL) como sustituta libre de la comercial Marquette. El stack
    `--font-accent` prefiere `Marquette` automáticamente si más adelante se añade
    su `@font-face`, respetando la CSP (`font-src 'self'`).
  - Ajuste visual del subtítulo: tamaño reducido un 40%, opacidad al 80% y ligera
    sombra paralela para dar cohesión sobre el vídeo de fondo.
  - Documentación: README reescrito en un formato más profesional y menos
    recargado, con captura actualizada y URL de clonado corregida.

## 1.0.2

### Patch Changes

- 998de4e: Corrección de navegación en inglés y mejoras de calidad:

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

- a272346: Elimina la duplicidad del botón "Contactar" en la zona de bienvenida.

  En la primera pantalla del home aparecían dos botones "Contactar" apuntando al
  mismo destino (`#localizacion`/`#location`): el CTA persistente del navbar y un
  segundo CTA en el Hero. Ahora el Hero conserva un único CTA primario
  ("Ver Carta" → `#carta`) y el acceso a contacto queda centralizado en el navbar,
  tanto en escritorio como en móvil. Se añade un test de regresión E2E que fija
  que el Hero expone exactamente un CTA.

## 1.0.1

### Patch Changes

- b7b57b8: Migración de los componentes de secciones de Astro a React (TSX) dentro de Astro, con integración continua (CI lint/build/test), auto-release con Changesets, husky + commitlint para PRs autointegrables y despliegue en Vercel.
