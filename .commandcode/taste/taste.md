# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# communication
- Respond in Spanish (el usuario se comunica en español). Confidence: 0.85
- Prefer parallel agent orchestration for speed and coverage when executing multi-phase plans. Confidence: 0.75

# architecture
- For this project (frontvalencia.com rebuild): Use Astro 5 + TypeScript strict + Tailwind CSS 4 + React only for interactive islands. Confidence: 0.85
- Content collections must be typed with Zod; never hardcode text in presentation components. Confidence: 0.85
- i18n via file-based routing: /es/... and /en/... with proper hreflang tags. Confidence: 0.85
- Each interactive component must declare explicit hydration strategy (client:visible, client:idle, client:load). Confidence: 0.80

# design-system
- For this project: Brutalist aesthetic — dark neutrals (concrete/charcoal) base, warm Mediterranean accent (terracotta/amber or deep marine blue), OKLCH color format. Confidence: 0.75
- Use fluid typography with clamp(), 8pt spacing system, near-rectangular border radii (0-4px max). Confidence: 0.75

# security
- For this project: Strict CSP with explicit third-party domain exceptions only. Confidence: 0.80
- All third-party scripts (Metricool, Meta Pixel) must be gated behind cookie consent (GDPR/LSSI-CE compliant). Confidence: 0.85
- All external links must use rel="noopener noreferrer". Confidence: 0.85

# performance
- For this project: Performance budget — LCP < 2.0s (4G), TBT < 100ms, CLS < 0.1, Lighthouse ≥90/95/95/95. Confidence: 0.80
- Images: AVIF/WebP with fallback, srcset/sizes, never serve unoptimized images. Confidence: 0.80
- Video hero: preload="none", check saveData, serve poster first, AV1/H.264 dual encoding. Confidence: 0.75

# testing
- For this project: Vitest for unit tests, Testing Library for component tests, Playwright for E2E + visual regression, axe-core for a11y, Lighthouse CI in pipeline. Confidence: 0.80

# content
- For this project: EN translations must be verified by reference/official translators, not solely auto-translated. Confidence: 0.70

# observability
- For this project: Use OpenTelemetry for observability (tracing, metrics, logging) instead of or alongside vendor-specific solutions like Sentry. Confidence: 0.65
