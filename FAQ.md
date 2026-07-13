# FAQ — FRONT Valencia

## Preguntas frecuentes sobre el proyecto

### 1. ¿Qué es FRONT Valencia?

FRONT Valencia es el sitio web oficial del restaurante **FRONT**, ubicado en La Marina de Valencia. El proyecto incluye un sistema de gestión de contenido (CMS) para administrar la carta, eventos, espacios y configuración del sitio, y un frontend público construido con Astro.

### 2. ¿Por qué este stack tecnológico?

| Tecnología       | Motivo                                                               |
| ---------------- | -------------------------------------------------------------------- |
| Turborepo + pnpm | Monorepo escalable, caché de builds, workspaces nativos              |
| Payload CMS      | Headless CMS con TypeScript nativo, i18n integrada, API REST+GraphQL |
| Next.js 15       | Framework del CMS (Payload corre sobre Next.js)                      |
| Astro 7          | SSG/SSR, cero JS por defecto, rendimiento nativo, i18n built-in      |
| React 19         | Islas de interactividad en Astro para componentes dinámicos          |
| Tailwind 4       | Utilidades CSS, sin runtime, builds rápidos                          |
| Postgres         | Base de datos relacional madura, soporte nativo en Payload           |
| Cloudflare R2    | Almacenamiento de imágenes sin costes de egress, S3-compatible       |

Astro se eligió sobre Next.js para el frontend porque el sitio es mayoritariamente contenido estático con pequeñas islas de interactividad (reservas, mapa). El CMS corre sobre Next.js porque Payload lo requiere.

### 3. ¿Cómo configuro el proyecto localmente?

```bash
git clone https://github.com/alexendros/website-frontvalencia.git
cd website-frontvalencia
pnpm install
cp .env.example .env
cp apps/cms/.env.example apps/cms/.env
# Editar .env con tus valores
pnpm docker:dev        # Arranca Postgres + CMS + Web
pnpm db:push           # Ejecuta migraciones
pnpm dev               # Arranca en modo desarrollo
```

Requiere Node >=22.12, pnpm >=8.15 y Docker (o Postgres local).

### 4. ¿Cómo añado un nuevo plato a la carta?

1. Accede al panel de administración: `http://localhost:3001/admin`
2. Ve a **Carta > Platos** y haz clic en **Crear nuevo**
3. Rellena: nombre, descripción, precio, categoría, alérgenos y tags
4. Publica. El frontend reflejará los cambios automáticamente (SSG con rebuild)

Si necesitas crear una categoría nueva, ve a **Carta > Categorías**.

### 5. ¿Cómo despliego el proyecto?

El proyecto tiene dos targets de deploy:

| Componente  | Plataforma | Comando                            |
| ----------- | ---------- | ---------------------------------- |
| CMS         | Railway    | `git push railway main` o CI       |
| Web (Astro) | Vercel     | Conectado a GitHub → auto-deploy   |
| Media       | R2         | Manual via Dashboard de Cloudflare |

Para deploy local con Docker:

```bash
pnpm docker:prod
```

### 6. ¿Dónde se almacenan las imágenes?

Las imágenes se almacenan en **Cloudflare R2** (compatible con S3). La configuración se define en las variables de entorno:

- `R2_ENDPOINT` — Endpoint del bucket
- `R2_BUCKET` — Nombre del bucket (`frontvalencia-dev` en desarrollo)
- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` — Credenciales de acceso
- `R2_PUBLIC_URL` — URL pública para servir las imágenes

En desarrollo local, Payload puede almacenar imágenes localmente si no se configura R2.

### 7. ¿Cómo añado una nueva página al sitio?

Las páginas se crean como archivos `.astro` en el directorio correspondiente al locale:

```bash
apps/web/src/pages/es/mi-pagina.astro   # Versión español
apps/web/src/pages/en/my-page.astro     # Versión inglés
```

Astro genera la ruta automáticamente: `/es/mi-pagina/` y `/en/my-page/`.  
Asegúrate de añadir la página al menú de navegación si es necesario.

### 8. ¿El sitio soporta multi-idioma?

Sí. La configuración de i18n en Astro (`astro.config.mjs`) define dos locales:

- `es` — Español (locale por defecto)
- `en` — Inglés

El enrutamiento usa prefijo de locale (`/es/`, `/en/`).  
El CMS de Payload tiene campos localizados (`localized: true`) en colecciones como `Menu`, `Events`, `Space` y `SiteConfig`.

Para añadir contenido en ambos idiomas, rellena los campos correspondientes en el panel de administración.

### 9. ¿Cómo se optimiza el rendimiento?

El proyecto implementa varias estrategias de rendimiento:

- **Astro SSG** — HTML estático pre-renderizado, cero JS en páginas sin interactividad
- **Islas de React** — Solo se envía JS para componentes interactivos (reservas, mapa)
- **Prefetch** — Estrategia `viewport` (prefetch de enlaces visibles)
- **Imágenes optimizadas** — Astro `<Image />` + Sharp para transformación automática
- **Chunks de React** — `manualChunks` separa React del resto del bundle
- **Tailwind JIT** — Solo genera las clases CSS utilizadas
- **Sitemap** — Generación automática para SEO
- **Lighthouse CI** — Auditoría de rendimiento en cada PR (`.lighthouserc.json`)

### 10. ¿El sitio es accesible?

Sí, la accesibilidad es un objetivo del proyecto desde el diseño. Prácticas implementadas:

- Estructura de encabezados jerárquica (h1 → h2 → h3)
- Atributo `alt` obligatorio en todas las imágenes del CMS
- Navegación por teclado en componentes interactivos
- Contraste de color suficiente (verificado con herramientas de auditoría)
- Etiquetas semánticas HTML5 (`<nav>`, `<main>`, `<footer>`, etc.)
- Roles ARIA donde es necesario
- `prefers-reduced-motion` para animaciones

Ejecutamos auditorías con axe-core vía Lighthouse CI.

### 11. ¿Cuál es la estrategia SEO?

El sitio sigue las mejores prácticas de SEO técnico:

- **Sitemap XML** generado automáticamente (`/sitemap.xml`)
- **Canonical URLs** configuradas en cada página
- **Open Graph** para redes sociales (og:title, og:description, og:image)
- **JSON-LD** para datos estructurados (restaurante, menú, eventos)
- **Meta tags** por página, overrideables desde el CMS
- **URLs limpias** con trailing slash y estructura jerárquica
- **I18n** con hreflang tags (`es`, `en`)
- **Robots.txt** para control de crawling
- **Performance SEO**: Core Web Vitals monitorizados con Lighthouse CI

Los meta tags globales se gestionan desde la global `SiteConfig` del CMS.

### 12. ¿Cómo contribuir al proyecto?

1. Lee la [guía de contribución](./CONTRIBUTING.md)
2. Familiarízate con el [código de conducta](./CODE_OF_CONDUCT.md)
3. Crea una rama desde `develop` siguiendo `feat/`, `fix/`, etc.
4. Los commits deben seguir [Conventional Commits](https://www.conventionalcommits.org/)
5. Asegura que `pnpm lint`, `pnpm typecheck` y `pnpm test` pasan
6. Abre un Pull Request contra `develop`

Para cambios pequeños (typos, docs), puedes abrir un PR directamente.

### 13. ¿Bajo qué licencia está el proyecto?

El proyecto es **privado** (licencia no especificada públicamente).  
No está autorizado su uso, reproducción o distribución sin permiso explícito de los propietarios.

### 14. ¿Cómo funciona el pipeline de CI/CD?

El pipeline se define en GitHub Actions (`.github/workflows/`) y ejecuta:

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│   Lint   │ → │ Typecheck│ → │  Test    │ → │  Build   │ → │  Deploy  │
└──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
                                         ↓
                                  Lighthouse CI
```

- **Lint**: ESLint sobre todas las apps y paquetes
- **Typecheck**: `tsc --noEmit` en todos los `tsconfig.json`
- **Test**: Vitest (unitarios) + Playwright (e2e)
- **Build**: Turbo build con caché de outputs
- **Lighthouse CI**: Auditoría de rendimiento en la web
- **Dependabot**: Actualizaciones semanales de dependencias

Cada PR debe pasar todas las fases antes de ser mergeado.

### 15. ¿Cómo se gestionan las migraciones de base de datos?

Payload CMS gestiona las migraciones automáticamente:

```bash
# Ejecutar migraciones pendientes
pnpm db:push

# Abrir Payload Studio para inspeccionar la BD
pnpm db:studio
```

Las migraciones se ejecutan al arrancar el CMS en producción.  
Cada cambio en el schema de una colección genera una migración automática.

### 16. ¿Qué colecciones existen en el CMS?

El CMS de Payload tiene las siguientes colecciones y globales:

| Colección           | Slug              | Propósito                        |
| ------------------- | ----------------- | -------------------------------- |
| Platos              | `menu-items`      | Cada plato de la carta           |
| Categorías          | `menu-categories` | Categorías (desayunos, comidas…) |
| Eventos             | `events`          | Eventos especiales               |
| Espacios            | `spaces`          | Información del espacio físico   |
| Alérgenos           | `allergens`       | Lista de alérgenos               |
| Media               | `media`           | Subida y gestión de imágenes     |
| Usuarios            | `users`           | Administradores y editores       |
| SiteConfig (global) | `site-config`     | Configuración global del sitio   |

### 17. ¿El proyecto usa Docker?

Sí. El archivo `docker-compose.yml` en la raíz orquesta:

- **Postgres** — Base de datos
- **CMS** — Payload CMS (Next.js)
- **Web** — Sitio Astro (opcional en producción)

Comandos disponibles:

```bash
pnpm docker:dev       # Desarrollo
pnpm docker:prod      # Producción
pnpm docker:down      # Parar
pnpm docker:reset     # Reset completo (borra volúmenes)
```

### 18. ¿Hay tests? ¿Cómo ejecutarlos?

Sí. Tests unitarios y e2e:

```bash
# Todos los tests
pnpm test

# Solo unitarios (Vitest)
pnpm test:unit

# Solo e2e (Playwright)
pnpm test:e2e

# Modo interactivo de Playwright
pnpm exec playwright test --ui
```

Los tests unitarios se ejecutan en Node/jsdom.  
Los e2e usan Chromium y un webServer que hace preview del build.

### 19. ¿Puedo usar el sitio como plantilla para mi proyecto?

El proyecto es de código abierto bajo la licencia del repositorio.  
Si quieres usarlo como referencia técnica, eres bienvenido.  
Para uso comercial o del nombre "FRONT Valencia", contacta con los propietarios.

### 20. ¿Dónde puedo reportar un bug o sugerir una mejora?

Abre un issue en GitHub (si tienes acceso al repositorio) o contacta a través del canal establecido. Para bugs de seguridad, consulta nuestra [política de seguridad](./SECURITY.md).

---

> ¿Tienes más preguntas? Abre un issue o contacta al equipo del proyecto.
