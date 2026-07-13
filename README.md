# FRONT Valencia

**Restaurante y Terraza en La Marina de Valencia** — Sitio web corporativo con menú interactivo, gestión de espacios, eventos, reservas y administración de contenido.

![Astro](https://img.shields.io/badge/Astro-7.0-FF5D01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Payload CMS](https://img.shields.io/badge/Payload_CMS-3-000000?logo=payload&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-2-EF4444?logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-8-F69220?logo=pnpm&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-yellow)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![code style](https://img.shields.io/badge/code_style-prettier-ff69b4)
![Accessibility](https://img.shields.io/badge/Accessibility-%3E%3D_AA-28a745)
![SEO](https://img.shields.io/badge/SEO-100-6f42c1)

---

## ⚡ Quick start

```bash
git clone https://github.com/alexendros/frontvalencia.git
cd frontvalencia
pnpm install
cp .env.example .env              # edita las variables (ver sección entorno)
pnpm dev                           # arranca CMS + web simultáneamente
```

| Servicio  | URL                         |
| --------- | --------------------------- |
| Admin CMS | http://localhost:3001/admin |
| Web       | http://localhost:4321/es/   |

---

## 🏗️ Arquitectura

Monorepo gestionado con **Turborepo + pnpm workspaces**. Dos aplicaciones independientes que comparten types y tooling:

```
┌─────────────────────────────────────────────────┐
│                    MONOREPO                      │
│  ┌─────────────────┐      ┌──────────────────┐  │
│  │   apps/cms       │      │   apps/web        │  │
│  │  Payload CMS 3   │◄────►│  Astro 7 + React  │  │
│  │  + Next.js 15    │ API  │  + Tailwind 4     │  │
│  └────────┬─────────┘      └────────┬─────────┘  │
│           │                         │            │
│  ┌────────▼─────────────────────────▼─────────┐  │
│  │        packages / types                    │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

- **CMS** (`apps/cms`): Payload CMS 3 sobre Next.js 15. Sirve API REST/GraphQL, admin panel y gestión de contenido localizado.
- **Web** (`apps/web`): Astro 7 con React 19 y Tailwind CSS v4. Generación estática (SSG) con rutas híbridas (ISR). Consume la API de Payload.
- **Shared** (`packages/types`): Tipos TypeScript compartidos entre CMS y web garantizando contract-first.

---

## 🛠️ Tech stack

| Capa           | Tecnología                                            | Propósito                              |
| -------------- | ----------------------------------------------------- | -------------------------------------- |
| **Frontend**   | [Astro](https://astro.build) 7                        | SSG/ISR, islands architecture          |
|                | [React](https://react.dev) 19                         | Componentes interactivos               |
|                | [Tailwind CSS](https://tailwindcss.com) v4            | Estilos utility-first + Vite plugin    |
|                | [Geist](https://geist.dev)                            | Tipografía (Vercel)                    |
| **CMS**        | [Payload CMS](https://payloadcms.com) 3               | Headless CMS, auto-generación de API   |
|                | [Next.js](https://nextjs.org) 15                      | Servidor del admin panel               |
|                | [Lexical](https://lexical.dev)                        | Editor rich text                       |
| **Base datos** | [PostgreSQL](https://postgresql.org)                  | Base de datos principal                |
| **DevOps**     | [Turborepo](https://turbo.build/repo) 2               | Orquestación de builds en monorepo     |
|                | [pnpm](https://pnpm.io) 8                             | Package manager (workspaces)           |
|                | [Docker](https://docker.com)                          | Entorno de desarrollo local            |
| **CI/CD**      | [GitHub Actions](https://github.com/features/actions) | Pipeline CI/CD multi-stage             |
| **Deploy**     | [Vercel](https://vercel.com)                          | Frontend web (static + serverless)     |
|                | [Railway](https://railway.app)                        | CMS + Base de datos (Postgres)         |
|                | [Cloudflare R2](https://cloudflare.com/r2)            | Almacenamiento de imágenes (S3-compat) |

### Plugins de Payload

| Plugin                         | Uso                            |
| ------------------------------ | ------------------------------ |
| `@payloadcms/plugin-seo`       | Meta tags y preview SEO        |
| `@payloadcms/plugin-redirects` | Redirecciones 301 gestionables |
| `@payloadcms/richtext-lexical` | Editor enriquecido (Lexical)   |
| `@payloadcms/storage-s3`       | Upload directo a Cloudflare R2 |
| `@payloadcms/db-postgres`      | Adaptador PostgreSQL           |

---

## 🔐 Variables de entorno

Copia `.env.example` a `.env` y completa los valores.

```
# Base de datos (Postgres)
DATABASE_URI           postgresql://user:pass@host:5432/frontvalencia
DATABASE_DIRECT_URL    URL directa para migraciones (opcional)

# Payload CMS
PAYLOAD_SECRET         Clave secreta (openssl rand -base64 32)
PAYLOAD_PREVIEW_SECRET Clave para preview mode (misma en CMS y web)
PAYLOAD_API_URL        URL pública de la API de Payload
PAYLOAD_PUBLIC_SERVER_URL URL interna del servidor CMS

# Web (Astro)
PUBLIC_SITE_URL        URL pública del sitio (ej: https://frontvalencia.com)

# Cloudflare R2 (media storage)
R2_ENDPOINT            Endpoint S3 de R2
R2_BUCKET              Nombre del bucket
R2_ACCESS_KEY_ID       Access Key ID
R2_SECRET_ACCESS_KEY   Secret Access Key
R2_PUBLIC_URL          URL pública del bucket o custom domain

# Servicios externos
PUBLIC_RESERVAS_ES_URL  URL de CoverManager (español)
PUBLIC_RESERVAS_EN_URL  URL de CoverManager (inglés)
PUBLIC_META_PIXEL_ID    Meta Pixel ID (opcional, con cookie consent)
PUBLIC_GOOGLE_MAPS_EMBED_URL Embed de Google Maps (opcional)
```

> El root `.env.example` contiene TODAS las variables. Cada app tiene su propio `.env.example` de referencia.

---

## 📁 Estructura del proyecto

```
frontvalencia/
├── apps/
│   ├── cms/                          # Payload CMS + Next.js
│   │   ├── src/
│   │   │   ├── access/               # Control de acceso
│   │   │   ├── collections/          # Allergens, Events, Media, Menu, Space, Users
│   │   │   ├── globals/              # SiteConfig
│   │   │   ├── hooks/                # Hooks (revalidateWebhook)
│   │   │   ├── plugins/              # r2-storage
│   │   │   ├── payload.config.ts     # Configuración principal de Payload
│   │   │   └── index.ts              # Entrypoint
│   │   ├── Dockerfile                # Docker multi-stage para Railway
│   │   └── next.config.mjs
│   │
│   └── web/                          # Astro + React + Tailwind
│       ├── src/
│       │   ├── components/           # Componentes .astro y .tsx
│       │   ├── layouts/              # Layouts base (con y sin locale)
│       │   ├── lib/
│       │   │   ├── payload.ts        # Cliente API para Payload
│       │   │   ├── i18n.ts           # Utilidades de internacionalización
│       │   │   ├── content.ts        # Loader de contenido local
│       │   │   ├── analytics.ts      # Gestión de consentimiento de cookies
│       │   │   └── telemetry.ts      # Telemetry helpers
│       │   ├── pages/
│       │   │   ├── es/               # 10 rutas en español
│       │   │   │   ├── index.astro
│       │   │   │   ├── carta.astro
│       │   │   │   ├── espacio.astro
│       │   │   │   ├── localizacion.astro
│       │   │   │   ├── reservas.astro
│       │   │   │   └── ...
│       │   │   ├── en/               # Rutas en inglés
│       │   │   └── index.astro       # Redirección / → /es/
│       │   ├── content/              # Colecciones de Astro Content
│       │   │   ├── menu/             # JSON de menú por idioma
│       │   │   └── site.json         # Configuración local del sitio
│       │   ├── styles/               # CSS global
│       │   └── middleware.ts         # Security headers, CSP, preview, i18n redirect
│       ├── public/
│       ├── astro.config.mjs
│       └── package.json
│
├── packages/
│   └── types/                        # Tipos TypeScript compartidos
│       └── src/
│           ├── api/                  # Tipos de respuesta API
│           ├── domain/               # Tipos de dominio (Menu, Space, Event...)
│           └── payload-types.d.ts    # Tipos generados por Payload
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint, typecheck, test, build, Lighthouse, a11y, SEO
│       ├── deploy-preview.yml        # Preview deployments
│       └── deploy-prod.yml           # Deploy a Vercel + Railway
│
├── tests/
│   ├── e2e/                          # Playwright tests
│   └── unit/                         # Vitest unit tests
│
├── tools/
│   └── scripts/                      # Scrape, validate-env, seed
│
├── turbo.json                        # Turborepo pipeline
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

---

## 📜 Scripts disponibles

| Comando               | Descripción                                         |
| --------------------- | --------------------------------------------------- |
| `pnpm dev`            | Dev en paralelo (CMS :3001 + Web :4321)             |
| `pnpm dev:cms`        | Solo CMS                                            |
| `pnpm dev:web`        | Solo Web                                            |
| `pnpm build`          | Build completo (ambas apps)                         |
| `pnpm build:cms`      | Build solo CMS                                      |
| `pnpm build:web`      | Build solo Web                                      |
| `pnpm lint`           | Lint en todas las apps                              |
| `pnpm typecheck`      | TypeScript check                                    |
| `pnpm test`           | Tests unitarios + e2e                               |
| `pnpm test:unit`      | Solo tests unitarios (Vitest)                       |
| `pnpm test:e2e`       | Solo tests e2e (Playwright)                         |
| `pnpm generate:types` | Regenera tipos de Payload + packages/types          |
| `pnpm db:push`        | Ejecuta migraciones de Payload                      |
| `pnpm db:studio`      | Abre Payload Studio (GUI de base de datos)          |
| `pnpm preview`        | Preview del build completo                          |
| `pnpm clean`          | Limpia builds, caches y node_modules                |
| `pnpm scrape`         | Scrapea contenido externo (ej: PDFs de carta)       |
| `pnpm validate:env`   | Valida que las variables de entorno estén presentes |

---

## 🐳 Docker (desarrollo local)

```bash
# Arrancar todo el stack (Postgres + CMS + Web)
pnpm docker:dev

# Production-like (con variables de producción)
pnpm docker:prod

# Parar y limpiar volúmenes
pnpm docker:down

# Reset completo (destroy + rebuild)
pnpm docker:reset
```

El CMS dispone de un `Dockerfile` multi-stage (build → runtime) para despliegues en contenedor. Usa `node:22-alpine` como imagen base y `next start` como runtime.

La base de datos Postgres se provisiona vía `docker-compose` (referencia) o como servicio gestionado en Railway.

---

## 🚀 Deployment

### Producción

| Componente | Plataforma    | Trigger                       |
| ---------- | ------------- | ----------------------------- |
| Frontend   | Vercel        | Push a `main` (GitHub Action) |
| CMS        | Railway       | Push a `main` (deploy hook)   |
| Base datos | Railway (PG)  | Gestionado                    |
| Media      | Cloudflare R2 | Upload vía Payload admin      |

Flujo de CI/CD:

1. Push/PR a `main` o `develop` → GitHub Actions ejecuta:

   - Lint & Format
   - TypeScript check
   - Tests unitarios + e2e
   - Build check
   - Lighthouse CI (performance, accesibilidad, SEO, best practices)
   - Accessibility audit (axe-core)
   - SEO validation (HTML validate)

2. Si el push es a `main`:
   - **Frontend**: Build + deploy a Vercel (producción)
   - **CMS**: Build + deploy a Railway vía deploy hook

### Preview

Las PRs generan previews automáticos:

- **Web**: Vercel Preview (URL única por PR)
- **CMS**: Railway preview environment

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Crea un fork
2. Rama desde `develop`: `git checkout -b feat/mi-feature`
3. Sigue los patrones de código existentes (TypeScript estricto, sin comentarios superfluos)
4. Añade tests para funcionalidades nuevas
5. Verifica: `pnpm typecheck && pnpm lint && pnpm test`
6. Abre un Pull Request contra `develop`

[Más información →](https://github.com/alexendros/frontvalencia/pulls)

---

## 📄 Licencia

**MIT** — Copyright © 2025 FRONT Valencia.

El código es de código abierto. Los assets gráficos, imágenes, logotipos y nombres comerciales son propiedad de FRONT Valencia y no están cubiertos por esta licencia.
