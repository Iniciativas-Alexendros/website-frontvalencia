# Roadmap — FRONT Valencia

> **Restaurante y Terraza en La Marina de Valencia**
> Web: https://frontvalencia.com | Licencia: MIT | Open Source

---

## Estado Actual — Fase 9 Completada ✅

```
FASE 1-5        FASE 6-9
████████████████████████████▓▓▓▓▓▓▓▓  FASE 10
████████████████████████████████████  ●
Auditoría    Arquitectura    CMS    Calidad   CI/CD    SEO
  ✅            ✅          ✅       ✅       ✅       ✅
```

**Entregable actual**: repositorio público listo para publicación inmediata.

| Área                 | Estado | Métricas                                                  |
| -------------------- | ------ | --------------------------------------------------------- |
| **Frontend (Astro)** | ✅     | 21 páginas ES/EN, build 1.88s, LCP < 2.5s                 |
| **CMS (Payload)**    | ✅     | Collections + RBAC + seed data, dockerizado               |
| **Testing**          | ✅     | 31 tests unitarios, Playwright 3 viewports + axe-core     |
| **CI/CD**            | ✅     | GitHub Actions: lint → typecheck → test → build → deploy  |
| **Documentación**    | ✅     | 13 archivos (153KB): README, ADRs, DESIGN, FAQ, etc.      |
| **SEO**              | ✅     | JSON-LD Restaurant, sitemap, hreflang, performance budget |
| **Seguridad**        | ✅     | CSP, rate limiting, RBAC, secret validation               |

---

## Leyenda

| Símbolo | Significado                                                        |
| ------- | ------------------------------------------------------------------ |
| 🔴 P0   | Bloqueante — debe completarse antes de la milestone                |
| 🟡 P1   | Importante — incluido en la milestone si el tiempo lo permite      |
| 🟢 P2   | Nice-to-have — se mueve a la siguiente milestone si no se completa |
| ⚡      | Quick win (< 1 día de esfuerzo)                                    |
| 🔨      | Medio (1-3 días)                                                   |
| 🏗️      | Grande (3-7 días)                                                  |
| 🚀      | XL (> 7 días)                                                      |

---

## Milestone 1: MVP — Lanzamiento Open Source

**Objetivo**: repositorio público funcional que cualquier dev pueda clonar, instalar y ejecutar.

**Deadline**: ahora (todo está implementado)

### ✅ Completado

| Tarea                                                   | Esfuerzo | Impacto | Estado |
| ------------------------------------------------------- | -------- | ------- | ------ |
| Auditoría de seguridad (secretos, CSP, cookies)         | 🔨       | Alto    | ✅     |
| Mono-repo pnpm + Turborepo                              | 🔨       | Alto    | ✅     |
| Payload CMS con collections tipadas + RBAC              | 🔨       | Alto    | ✅     |
| Astro SSG con i18n ES/EN + 21 páginas                   | 🔨       | Alto    | ✅     |
| Docker Compose (Postgres + Payload + Astro)             | 🔨       | Alto    | ✅     |
| Seed data (14 alérgenos, 8 categorías, 44 platos)       | 🔨       | Alto    | ✅     |
| Documentación completa (13 archivos)                    | 🔨       | Alto    | ✅     |
| Branding (logo, favicon, OG, PWA manifest)              | ⚡       | Alto    | ✅     |
| SEO JSON-LD (Restaurant, WebSite, BreadcrumbList)       | ⚡       | Alto    | ✅     |
| CI/CD pipeline (7 jobs)                                 | 🔨       | Alto    | ✅     |
| Precommit validation (Husky + lint-staged + commitlint) | ⚡       | Alto    | ✅     |
| ESLint flat config + Playwright 3 viewports + axe-core  | ⚡       | Alto    | ✅     |
| Code review con 5 críticos corregidos                   | 🔨       | Alto    | ✅     |
| Performance budget (LCP < 2.5s, TBT < 200ms, CLS < 0.1) | ⚡       | Alto    | ✅     |

---

## Milestone 2: v1.0 — Producción

**Objetivo**: sitio en vivo en `frontvalencia.com` reemplazando al actual, con CMS conectado y datos reales.

**Deadline**: Q3 2026

### 🔴 P0 — Bloqueantes para lanzamiento

| #   | Tarea                                      | Esfuerzo | Depende de  | Descripción                                                                           |
| --- | ------------------------------------------ | -------- | ----------- | ------------------------------------------------------------------------------------- |
| 1   | **Conectar Payload ↔ Astro en producción** | 🏗️       | R2, Railway | Deploy CMS en Railway + Astro en Vercel con secrets reales                            |
| 2   | **Migrar contenido actual al CMS**         | 🔨       | #1          | Poblar CMS con datos reales de `https://frontvalencia.com` (carta, espacios, eventos) |
| 3   | **Configurar Cloudflare R2 para imágenes** | 🔨       | #1          | Bucket público R2 + plugin S3 en Payload + CDN custom domain                          |
| 4   | **Conectar CoverManager widget real**      | 🔨       | ninguno     | Validar URLs reales de CoverManager para reservas ES/EN                               |
| 5   | **Activar Preview Mode**                   | 🔨       | #1          | Webhook Payload → Astro: preview de drafts en Vercel Preview Deployments              |
| 6   | **Configurar dominio y DNS**               | ⚡       | #1          | `frontvalencia.com` → Vercel, `cms.frontvalencia.com` → Railway                       |
| 7   | **SSL/TLS en todos los endpoints**         | ⚡       | #6          | Vercel auto-SSL + Let's Encrypt en Railway                                            |
| 8   | **Monitor de salud post-deploy**           | 🔨       | #6          | Healthchecks para CMS, web, Postgres. Alertas en Discord/Slack                        |

### 🟡 P1 — Deberían completarse

| #   | Tarea                                             | Esfuerzo | Depende de | Descripción                                                         |
| --- | ------------------------------------------------- | -------- | ---------- | ------------------------------------------------------------------- |
| 9   | **Cookie consent funcional**                      | 🔨       | ninguno    | Activar Meta Pixel + Metricool solo con consentimiento explícito    |
| 10  | **Google Maps embed en localización**             | ⚡       | ninguno    | Reemplazar placeholder con embed real de Google Maps                |
| 11  | **Optimizar videos hero**                         | 🔨       | #3         | Convertir MP4 a WebM/AV1, añadir `<source>` fallbacks, poster WebP  |
| 12  | **Optimizar imágenes con astro:assets**           | 🔨       | #3         | Usar `getImage()` en todas las imágenes estáticas                   |
| 13  | **Lighthouse score ≥ 90 en todas las categorías** | 🔨       | #11, #12   | Ejecutar LHCI con presupuesto, optimizar hasta pasar                |
| 14  | **Accesibilidad WCAG AA / score ≥ 95**            | 🔨       | ninguno    | Todos los checks de axe-core en verde. Keyboard navigation completo |
| 15  | **README con screenshot real del sitio**          | ⚡       | #1         | Captura del homepage en desktop/mobile para el README               |

### 🟢 P2 — Pueden posponerse

| #   | Tarea                                    | Esfuerzo | Depende de |
| --- | ---------------------------------------- | -------- | ---------- |
| 16  | Tests E2E completos con Playwright       | 🏗️       | #1         |
| 17  | Coverage ≥ 60% en tests unitarios        | 🔨       | #16        |
| 18  | Dark theme v1                            | 🔨       | ninguno    |
| 19  | Anuncio de lanzamiento en redes sociales | ⚡       | #6         |

---

## Milestone 3: v1.1 — Pulido y Refinamiento

**Objetivo**: experiencia pulida, rendimiento excelente, métricas verificables.

**Deadline**: Q4 2026

### 🔴 P0

| #   | Tarea                                          | Esfuerzo | Depende de | Descripción                                                                           |
| --- | ---------------------------------------------- | -------- | ---------- | ------------------------------------------------------------------------------------- |
| 20  | **Core Web Vitals en verde (75th percentile)** | 🏗️       | v1.0       | Monitorizar con Vercel Analytics o Web Vitals API. LCP < 2.5s, INP < 200ms, CLS < 0.1 |
| 21  | **RSS feed para eventos**                      | ⚡       | ninguno    | `/rss.xml` con eventos futuros del CMS                                                |
| 22  | **Breadcrumbs renderizados en frontend**       | ⚡       | ninguno    | Ya está el JSON-LD; añadir UI navegable                                               |
| 23  | **Loaders y estados de carga en imágenes**     | 🔨       | ninguno    | Blur-up placeholders, lazy loading con skeleton                                       |

### 🟡 P1

| #   | Tarea                                          | Esfuerzo | Depende de |
| --- | ---------------------------------------------- | -------- | ---------- |
| 24  | **Admin UI: personalizar dashboard**           | 🔨       | ninguno    |
| 25  | **Admin UI: live preview real en iframe**      | 🔨       | v1.0       |
| 26  | **Search en el sitio (MeiliSearch o Fuse.js)** | 🔨       | v1.0       |
| 27  | **Multilenguaje CAT (valenciano)**             | 🏗️       | v1.0       |
| 28  | **Blog/Noticias integrado con Payload**        | 🔨       | v1.0       |

### 🟢 P2

| #   | Tarea                                               | Esfuerzo | Depende de |
| --- | --------------------------------------------------- | -------- | ---------- |
| 29  | **Animaciones on-scroll (GSAP o View Transitions)** | 🔨       | v1.0       |
| 30  | **PWA con Service Worker offline**                  | 🏗️       | v1.0       |
| 31  | **Share API para platos y eventos**                 | ⚡       | v1.0       |

---

## Milestone 4: v2.0 — Expansión Comercial

**Objetivo**: propuesta comercial completa con funcionalidades avanzadas que superan al sitio actual.

**Deadline**: 2027

### 🔴 P0

| #   | Tarea                             | Esfuerzo | Depende de | Descripción                                                                      |
| --- | --------------------------------- | -------- | ---------- | -------------------------------------------------------------------------------- |
| 32  | **Sistema de reservas integrado** | 🚀       | v1.0       | Widget de disponibilidad en tiempo real vía CoverManager API, no iframe estático |
| 33  | **Pedidos online integrados**     | 🚀       | v1.0       | Takeaway/delivery con Glovo o similar, o sistema propio con Stripe               |
| 34  | **Programa de fidelización**      | 🚀       | v1.0       | Puntos por visita, canjeables en CMS                                             |

### 🟡 P1

| #   | Tarea                                      | Esfuerzo | Depende de |
| --- | ------------------------------------------ | -------- | ---------- |
| 35  | **App móvil PWA avanzada**                 | 🚀       | v1.1 #30   |
| 36  | **Notificaciones push (eventos, ofertas)** | 🔨       | #35        |
| 37  | **Analytics dashboard integrado**          | 🏗️       | v1.0       |
| 38  | **Newsletter con segmentación**            | 🏗️       | v1.0       |
| 39  | **A/B testing de carta y precios**         | 🏗️       | v1.0       |

### 🟢 P2

| #   | Tarea                                               | Esfuerzo | Depende de |
| --- | --------------------------------------------------- | -------- | ---------- |
| 40  | **Multi-tenant: plantilla para otros restaurantes** | 🚀       | v1.1       |
| 41  | **CLI de instalación interactivo**                  | 🔨       | #40        |
| 42  | **White-label admin para cada restaurante**         | 🚀       | #40        |

---

## Backlog

Ideas validadas pero sin fecha concreta:

| #   | Idea                                           | Valor                  |
| --- | ---------------------------------------------- | ---------------------- |
| B1  | **VR tour 360° del espacio**                   | Diferenciación visual  |
| B2  | **Integración con Google Business Profile**    | SEO local              |
| B3  | **Chat en vivo (WhatsApp Business API)**       | Conversión de reservas |
| B4  | **Menú digital QR para mesas**                 | Experiencia in-situ    |
| B5  | **Integración con TripAdvisor / TheFork**      | Marketing              |
| B6  | **Generador de PDF del menú (print-friendly)** | UX para eventos        |
| B7  | **Horarios dinámicos por temporada**           | Precisión              |
| B8  | **Sistema de eventos recurrentes**             | CMS avanzado           |
| B9  | **Webhooks para notificar cambios a terceros** | Integraciones          |
| B10 | **Multi-idioma automático vía AI (DeepL API)** | Escalabilidad i18n     |

---

## Principios del Roadmap

1. **Ship early, iterate fast** — MVP ya está listo. Lanzar ahora y mejorar incrementalmente.
2. **Metric-driven** — cada milestone tiene KPIs medibles (Lighthouse, tests, cobertura).
3. **Open Source first** — todas las features se desarrollan en abierto. El valor comercial está en la ejecución y el servicio.
4. **Backward compatible** — no romper APIs ni URLs entre versiones.
5. **Security-first** — cada feature pasa por revisión de seguridad antes de deploy.

---

## Riesgos y Mitigaciones

| Riesgo                                 | Probabilidad | Impacto | Mitigación                                                 |
| -------------------------------------- | ------------ | ------- | ---------------------------------------------------------- |
| Payload CMS breaking changes (v3 → v4) | Media        | Alto    | Pin versiones, tests de integración                        |
| CoverManager cambia su API/widget      | Media        | Alto    | Abstraer en adapter, no acoplar al widget                  |
| Vercel/Railway downtime                | Baja         | Medio   | Status pages, fallback estático                            |
| Cloudflare R2 pricing changes          | Baja         | Bajo    | Mantener abstracción S3-compatible                         |
| Dependencias abandonadas               | Baja         | Medio   | Dependabot + Renovate + auditoría mensual                  |
| Deuda técnica acumulada                | Media        | Alto    | Code review obligatorio, refactors en P2 de cada milestone |

---

## Cómo Contribuir al Roadmap

1. Abre un **Issue** con label `roadmap` describiendo la idea o solicitud.
2. La propuesta se discute en el issue con el equipo.
3. Si se aprueba, se asigna a una milestone y se prioriza según la matriz impacto/esfuerzo.
4. Las ideas del Backlog se promueven a milestones cuando hay capacidad.

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para el proceso completo.
