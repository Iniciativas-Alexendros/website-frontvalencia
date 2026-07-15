# FRONT Valencia

**Restaurante y Terraza en La Marina de Valencia**

Este proyecto es la web del restaurante FRONT Valencia, situado en La Marina, frente al mar. Una web moderna, rápida, bilingüe (español e inglés) y fácil de mantener, pensada para que cualquier persona del equipo —sin saber programar— pueda modificar la carta, los horarios o las fotos desde un panel sencillo.

---

![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro&logoColor=white)
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

![Homepage — FRONT Valencia](public/images/home-screenshot.jpg)

---

## ¿Qué hace esta web?

- **Carta digital** bilingüe con alérgenos, etiquetas (eco, sin gluten, vegano, picante) y precios
- **Gestión de espacios** con galería de fotos, descripciones y contacto para eventos privados
- **Eventos** con fecha, hora, imágenes y enlace de reserva
- **Reservas** integradas con CoverManager
- **Localización** con mapa, transporte público y horarios
- **Páginas legales** (aviso legal, privacidad, cookies, condiciones de reserva)
- **Panel de administración** sencillo para editar todo sin tocar código

---

## ⚡ Empezar en 3 pasos

```bash
git clone https://github.com/Alexendros/website-frontvalencia.git
cd website-frontvalencia
pnpm install
cp .env.example .env              # edita las variables (ver sección entorno)
pnpm dev                           # arranca CMS + web simultáneamente
```

Abre [http://localhost:4321/es/](http://localhost:4321/es/) para ver la web.
Abre [http://localhost:3001/admin](http://localhost:3001/admin) para el panel de administración (requiere Postgres).

---

## 🏗️ Cómo está construido

La web está dividida en dos partes que trabajan juntas:

| Parte                       | Qué hace                                              | Tecnología    |
| --------------------------- | ----------------------------------------------------- | ------------- |
| **Web pública**             | Lo que ve el cliente: páginas, carta, fotos, reservas | Astro + React |
| **Panel de administración** | Donde el equipo edita la carta, fotos y contenidos    | Payload CMS   |

Cuando alguien del restaurante cambia un plato desde el panel, la web se actualiza automáticamente.

**Tecnologías principales:**

- **Astro** — genera páginas estáticas ultrarrápidas (SSG)
- **React** — componentes interactivos (consentimiento de cookies, selector de idioma)
- **Tailwind CSS** — estilos mantenibles y consistentes
- **Payload CMS** — panel de edición para el equipo del restaurante
- **PostgreSQL** — base de datos para el CMS
- **TypeScript** — todo el código está tipado para evitar errores
- **pnpm + Turborepo** — monorepo que organiza el código en módulos independientes
- **Docker** — entorno de desarrollo que arranca con un solo comando

---

## 🚀 Despliegue

| Componente       | Plataforma           | Cuándo se despliega              |
| ---------------- | -------------------- | -------------------------------- |
| Web pública      | Vercel               | Automático al publicar en `main` |
| Panel CMS        | Railway o Render     | Automático al publicar en `main` |
| Base de datos    | Railway (PostgreSQL) | Gestionado                       |
| Fotos e imágenes | Cloudflare R2        | Al subirlas desde el panel CMS   |

Cada cambio en `main` ejecuta automáticamente:

- Revisión de formato y tipos
- Tests automáticos
- Construcción de la web
- Despliegue a producción

---

## 📋 Scripts

| Comando          | Descripción                                          |
| ---------------- | ---------------------------------------------------- |
| `pnpm dev`       | Desarrollo en paralelo (CMS en :3001 + Web en :4321) |
| `pnpm build`     | Construye todo para producción                       |
| `pnpm test`      | Ejecuta todos los tests                              |
| `pnpm lint`      | Revisa formato y estilo de código                    |
| `pnpm typecheck` | Verifica que los tipos TypeScript son correctos      |

---

## 🐳 Entorno de desarrollo con Docker

```bash
pnpm docker:dev       # Arranca Postgres + CMS + Web
pnpm docker:down      # Para todo y limpia
pnpm docker:reset     # Reinicia desde cero
```

---

## 📂 Estructura del proyecto

```
website-frontvalencia/
├── apps/
│   ├── cms/                    # Panel de administración (Payload CMS)
│   │   └── src/
│   │       ├── collections/    # Carta, alérgenos, espacios, eventos, usuarios
│   │       ├── globals/        # Configuración general del sitio
│   │       ├── access/         # Control de permisos (admin, editor)
│   │       └── plugins/        # Almacenamiento de imágenes (Cloudflare R2)
│   └── web/                    # Web pública (Astro + React)
│       └── src/
│           ├── pages/          # Rutas: es/ (español) + en/ (inglés)
│           ├── components/     # Componentes visuales reutilizables
│           ├── lib/            # Cliente de API, utilidades i18n
│           └── middleware.ts   # Seguridad, redirecciones, preview
├── packages/types/             # Tipos TypeScript compartidos
├── docs/                       # Documentación técnica y decisiones
└── .github/workflows/          # Automatización de calidad y despliegue
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Crea un fork
2. Rama desde `main`: `git checkout -b feat/mi-mejora`
3. Sigue el estilo de código existente (TypeScript estricto)
4. Añade tests para funcionalidades nuevas
5. Verifica: `pnpm typecheck && pnpm lint && pnpm test`
6. Abre un Pull Request

Lee [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

---

## 📄 Licencia

**MIT** — Copyright © 2025 Alejandro Domingo Agustí.

El código es de código abierto. Los assets gráficos, imágenes, logotipos y nombres comerciales de FRONT Valencia no están cubiertos por esta licencia.
