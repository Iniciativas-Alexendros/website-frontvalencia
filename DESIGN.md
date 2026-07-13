# FRONT Valencia — Sistema de Diseño

> **Documento maestro de identidad, componentes y patrones visuales**
> Proyecto: FRONT Valencia (https://frontvalencia.com)
> Restaurante & Terraza · La Marina de Valencia
> Versión: 1.0.0

---

## 1. Identidad de Marca

FRONT Valencia es un restaurante y terraza ubicado en La Marina de Valencia. La identidad visual fusiona el **brutalismo mediterráneo** —hormigón, luz, mar— con la calidez de los tonos terracota propios de la arquitectura valenciana.

### Atributos de marca

| Atributo         | Descripción                                    |
| ---------------- | ---------------------------------------------- |
| **Esencia**      | Mediterráneo moderno, crudo pero acogedor      |
| **Tono**         | Directo, sin adornos superfluos, confiado      |
| **Arquetipo**    | El Creador / El Explorador                     |
| **Personalidad** | Sofisticación sin pretensión, calor industrial |
| **Adjetivos**    | Brutal, táctil, luminoso, salino, atemporal    |

### Principios de diseño

1. **El contenido es el diseño** — La tipografía y el espacio vacío son los elementos decorativos principales.
2. **Sin ruido** — Cada elemento sirve a un propósito funcional o narrativo.
3. **Mobile-first** — Todo se diseña desde la vista móvil hacia arriba.
4. **Accesible por defecto** — WCAG AA como mínimo, AAA donde sea posible.
5. **Toque humano** — Las imágenes editoriales y los detalles táctiles aportan calidez al rigor geométrico.

---

## 2. Paleta de Color

Colores definidos en OKLCH para consistencia perceptual entre temas claro y oscuro. Valores extraídos de `tokens.css`.

### 2.1 Tema Oscuro (default)

El tema oscuro es el valor por defecto del sitio, reflejando la atmósfera del restaurante por la noche.

#### Escala Concrete — Base neutra

```
Concrete 950  oklch(0.06 0.005 70)  — Superficie principal
Concrete 900  oklch(0.10 0.008 70)  — Superficie elevada (cards, modales)
Concrete 800  oklch(0.15 0.01 70)   — Bordes, separadores
Concrete 700  oklch(0.22 0.012 70)  — Hover sobre fondo oscuro
Concrete 400  oklch(0.50 0.012 70)  — Texto muted
Concrete 300  oklch(0.65 0.01 70)   — Texto secundario
Concrete 50   oklch(0.95 0.005 70)  — Texto primario (blanco roto)
```

#### Escala Terracotta — Acento cálido

```
Terracotta 400  oklch(0.60 0.16 40)  — Acento principal
Terracotta 300  oklch(0.68 0.14 45)  — Acento hover
Terracotta 500  oklch(0.52 0.16 35)  — Selection color
```

#### Marine — Detalle marítimo

```
Marine 400  oklch(0.55 0.12 250)  — Acento secundario (ocasional)
Marine 500  oklch(0.45 0.14 250)  — Hover marine
```

#### Mapeo semántico (dark)

```css
--color-surface: var(--color-concrete-950);
--color-surface-elevated: var(--color-concrete-900);
--color-text-primary: var(--color-concrete-50);
--color-text-secondary: var(--color-concrete-300);
--color-text-muted: var(--color-concrete-400);
--color-accent: var(--color-terracotta-400);
--color-accent-hover: var(--color-terracotta-300);
--color-border: var(--color-concrete-800);
```

### 2.2 Tema Claro (futuro / opcional)

Para versión diurna o print, invertir la escala concrete:

```
--color-surface:            var(--color-concrete-50);     /* → blanco roto */
--color-surface-elevated:   var(--color-concrete-100);
--color-text-primary:       var(--color-concrete-950);    /* → casi negro */
--color-text-secondary:     var(--color-concrete-700);
--color-text-muted:         var(--color-concrete-500);
--color-accent:             var(--color-terracotta-600);  /* terracota más intensa */
--color-accent-hover:       var(--color-terracotta-500);
--color-border:             var(--color-concrete-200);
```

### 2.3 Colores semánticos

| Uso     | OKLCH                  | CSS variable      |
| ------- | ---------------------- | ----------------- |
| Success | `oklch(0.55 0.12 145)` | `--color-success` |
| Error   | `oklch(0.55 0.18 30)`  | `--color-error`   |
| Warning | `oklch(0.65 0.15 85)`  | `--color-warning` |
| Info    | `oklch(0.55 0.12 250)` | `--color-info`    |

---

## 3. Tipografía

Familia principal: **Geist** (Vercel) — auto-hosted en `/public/fonts/` para cumplimiento GDPR y rendimiento.

### 3.1 Familias

```
--font-display: 'Geist', system-ui, sans-serif;
--font-body:    'Geist', system-ui, sans-serif;
--font-mono:    'Geist Mono', ui-monospace, monospace;
```

### 3.2 Pesos cargados

| Peso           | font-face                 | display    |
| -------------- | ------------------------- | ---------- |
| 400 (Regular)  | `Geist-Regular.woff2`     | `swap`     |
| 500 (Medium)   | `Geist-Medium.woff2`      | `optional` |
| 600 (SemiBold) | `Geist-SemiBold.woff2`    | `optional` |
| 700 (Bold)     | `Geist-Bold.woff2`        | `swap`     |
| 900 (Black)    | `Geist-Black.woff2`       | `optional` |
| 400 (Mono)     | `GeistMono-Regular.woff2` | `optional` |

Solo Regular y Bold tienen `font-display: swap` — son los pesos críticos para la primera renderización. El resto se cargan con `optional` para no bloquear el render.

### 3.3 Escala tipográfica fluida

La escala usa `clamp()` para transicionar suavemente entre móvil y escritorio.

| Token         | Tamaño móvil | Tamaño escritorio | Uso                 |
| ------------- | ------------ | ----------------- | ------------------- |
| `--text-xs`   | 0.75rem      | 0.875rem          | Captions, metadata  |
| `--text-sm`   | 0.8125rem    | 0.9375rem         | Body small, footer  |
| `--text-base` | 0.9375rem    | 1.0625rem         | Body text           |
| `--text-lg`   | 1.0625rem    | 1.25rem           | Lead, intro         |
| `--text-xl`   | 1.25rem      | 1.75rem           | Subheading          |
| `--text-2xl`  | 1.5rem       | 2.5rem            | Section heading     |
| `--text-3xl`  | 2rem         | 4rem              | Page heading        |
| `--text-4xl`  | 2.5rem       | 6rem              | Hero heading        |
| `--text-5xl`  | 3rem         | 10rem             | Display (home hero) |

### 3.4 Line-height

| Contexto   | Line-height |
| ---------- | ----------- |
| Body text  | 1.6         |
| Headings   | 1.05–1.15   |
| Navigation | 1           |
| Captions   | 1.3         |

### 3.5 Letter-spacing

| Contexto                   | Tracking              |
| -------------------------- | --------------------- |
| Body                       | `normal`              |
| Headings grandes (display) | `-0.02em` a `-0.04em` |
| Nav / botones              | `0.05em` (uppercase)  |
| Mono                       | `normal`              |

---

## 4. Espaciado (8px Grid)

Sistema de espaciado basado en cuadrícula de 8px, definido en `--spacing-*`.

```
--spacing-0   0
--spacing-1   0.25rem   (4px)
--spacing-2   0.5rem    (8px)    ← unidad base
--spacing-3   0.75rem   (12px)
--spacing-4   1rem      (16px)
--spacing-5   1.25rem   (20px)
--spacing-6   1.5rem    (24px)
--spacing-8   2rem      (32px)
--spacing-10  2.5rem    (40px)
--spacing-12  3rem      (48px)
--spacing-16  4rem      (64px)
--spacing-20  5rem      (80px)
--spacing-24  6rem      (96px)
--spacing-32  8rem      (128px)
--spacing-40  10rem     (160px)
```

### Convenciones de uso

| Contexto                 | Tokens típicos                                     |
| ------------------------ | -------------------------------------------------- |
| Padding interior (cards) | `--spacing-6` a `--spacing-8`                      |
| Padding exterior (page)  | `--spacing-6` (móvil), `--spacing-12` (escritorio) |
| Gap entre secciones      | `--spacing-20` a `--spacing-32`                    |
| Gap entre elementos      | `--spacing-4` a `--spacing-6`                      |
| Stack texto              | `--spacing-2` a `--spacing-4`                      |
| Icono junto a texto      | `--spacing-2`                                      |

---

## 5. Componentes

### 5.1 Principios de diseño de componentes

- **Brutalista minimalista**: bordes rectos (`--radius-sm: 2px` como máximo), sin sombras decorativas, sin gradientes gratuitos.
- **Tipografía bold**: titulares grandes con tracking negativo. Contraste extremo entre heading y body.
- **Whitespace generoso**: el aire es un elemento de diseño. Los bloques respiran.
- **Jerarquía clara**: un solo elemento focal por sección.
- **Estados**: todos los elementos interactivos tienen hover, focus-visible y active. Jamás solo cambio de color.
- **Dark first**: todos los componentes se diseñan primero en dark.

### 5.2 Botones

| Propiedad      | Primary                   | Secondary                  | Ghost                     |
| -------------- | ------------------------- | -------------------------- | ------------------------- |
| Background     | `--color-accent`          | `transparent`              | `transparent`             |
| Color texto    | `--color-concrete-950`    | `--color-accent`           | `--color-text-primary`    |
| Border         | none                      | `1px solid --color-accent` | none                      |
| Hover bg       | `--color-accent-hover`    | `--color-accent` / 10%     | `--color-concrete-800`    |
| Hover text     | `--color-concrete-950`    | `--color-concrete-950`     | `--color-accent`          |
| Padding        | `--spacing-3 --spacing-6` | `--spacing-3 --spacing-6`  | `--spacing-3 --spacing-6` |
| Border radius  | `--radius-sm`             | `--radius-sm`              | `--radius-sm`             |
| Font           | `--font-body`, 700        | `--font-body`, 600         | `--font-body`, 500        |
| Letter-spacing | `0.05em`                  | `0.05em`                   | `normal`                  |
| Text transform | uppercase                 | uppercase                  | none                      |

### 5.3 Navegación (Header)

- Fixed top, `--color-surface` con opacidad 95% (backdrop blur).
- Logo a la izquierda, enlaces a la derecha.
- Enlace activo indicado con línea inferior de `--color-accent`.
- Mobile: menú hamburguesa con overlay full-screen.
- Idioma: toggle ES/EN en el header, sin prefijo en la ruta.

### 5.4 Cards

- Background: `--color-surface-elevated`
- Border: `1px solid --color-border`
- Border radius: `--radius-md` (4px) o `--radius-none`
- Padding: `--spacing-6` (móvil), `--spacing-8` (escritorio)
- Imagen: sin border radius, sangrada al borde superior
- Jerarquía interna: título → metadata → descripción → CTA opcional

### 5.5 Hero

- Full viewport height (100dvh) en móvil, altura variable en escritorio.
- Imagen/video de fondo con overlay oscuro (gradiente black->transparent).
- Título display (--text-5xl) centrado o alineado a la izquierda.
- Subtítulo en --text-lg o --text-xl.
- Scroll indicator animado sutilmente en la parte inferior.
- El hero de home usa video loop (vid-desk.mp4 / vid-mob.mp4).

### 5.6 Footer

- Background: `--color-concrete-950` o ligeramente más oscuro.
- Grid: 1 columna (móvil), 3 columnas (tablet), 4 columnas (escritorio).
- Logo, enlaces legales, redes sociales, copyright.
- Separador superior: `1px solid --color-border`.

---

## 6. Logo y Uso de Marca

### 6.1 Archivos

Todos los logos residen en `apps/web/public/images/logos/`:

```
LOGO_MV_SVG.svg                   → Logo principal (vector)
ILUSTRACION_WEB_2020.svg          → Variante responsive
ILUSTRACION_WEB_1250.svg          → Variante desktop
ILUSTRACION_WEB-2.svg             → Variante tablet
ILUSTRACION_TABLET.svg            → Variante tablet alt
ILUSTRACION_MV_GRANDE.svg         → Variante mobile
ILUSTRACION_MV_PEQUEÑO.svg        → Variante mobile pequeña
logo-icon.svg                     → Icono solo (favicon)
```

### 6.2 Área de resguardo (clear space)

El logo debe tener un área de resguardo mínima equivalente a la altura de la letra "F" en todas las direcciones.

### 6.3 Tamaño mínimo

- Header: altura mínima 32px, máxima 48px.
- Footer: altura máxima 40px.
- Favicon: 32×32px.
- No usar el logo por debajo de 24px de altura en pantalla.

### 6.4 Colores del logo

- Sobre fondo oscuro (default): blanco / concrete-50.
- Sobre fondo claro (futuro): concrete-950.
- El logo no se reproduce en terracotta ni en ningún otro color de la paleta.

---

## 7. Imaginería

### 7.1 Estilo fotográfico

- **Editorial cálida**: fotografías con luz natural, tonos tierra, saturación moderada.
- **Enfoque en la comida y el espacio**: primeros planos de platos, tomas ambientales de la terraza, atardeceres en La Marina.
- **Sin modelos posando**: estilo documental, personas reales en contexto.
- **Formato**: 16:9 para hero, 4:3 y 1:1 para cards y galerías.
- **Optimización**: WebP (con fallback JPEG), compresión agresiva, dimensiones exactas en build-time.

### 7.2 Almacenamiento

- Imágenes subidas a Payload CMS → Cloudflare R2 (S3-compatible).
- URL pública: `https://media.frontvalencia.com/...`
- Build-time: Sharp procesa y optimiza las imágenes.
- Runtime: las URLs de R2 se pasan directamente a `<img>`.

### 7.3 Video

- Hero loop: `vid-desk.mp4` (1920×1080) y `vid-mob.mp4` (1080×1920).
- Sin audio.
- Atributo `playsinline muted autoplay loop` con poster image.
- `prefers-reduced-motion: reduce` → mostrar poster estático.

---

## 8. Animación y Movimiento

### 8.1 Principios

- Sin animaciones gratuitas. Cada transición tiene un propósito funcional (feedback, navegación, jerarquía).
- Duración: 150–500ms. Nada más lento que medio segundo.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — ease-out exponencial.
- `prefers-reduced-motion: reduce` → desactivar todas las animaciones.

### 8.2 Tokens

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### 8.3 Patrones

| Elemento        | Animación              | Duración |
| --------------- | ---------------------- | -------- |
| Hover enlace    | Color change           | 150ms    |
| Hover botón     | Background + color     | 200ms    |
| Page transition | Cross-fade             | 300ms    |
| Scroll reveal   | Fade + translateY 24px | 500ms    |
| Mobile menu     | Slide desde derecha    | 300ms    |

### 8.4 View Transitions

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 200ms var(--ease-out-expo);
}
::view-transition-new(root) {
  animation: fade-in 300ms var(--ease-out-expo);
}
```

---

## 9. Accesibilidad

### 9.1 Estándar

- **WCAG 2.2 AA** como mínimo obligatorio.
- **AAA** para contraste de texto (relación ≥ 7:1) y para elementos navegables por teclado.

### 9.2 Prácticas

- `:focus-visible` con borde de 2px `--color-accent` y `outline-offset: 2px`.
- Todos los iconos decorativos tienen `aria-hidden="true"`.
- Skip-to-content link en todas las páginas.
- Los formularios tienen etiquetas `<label>` explícitas.
- Los elementos interactivos son accesibles por teclado (Tab, Enter, Space).
- Las imágenes tienen `alt` descriptivo. Si son decorativas, `alt=""`.
- Las Cards que enlazan usan patrón de enlace completo sin perder accesibilidad.
- El menú hamburguesa gestiona el foco mediante `focus-trap`.
- `prefers-reduced-motion` respetado globalmente.
- `prefers-contrast-more` considerado para temas de alto contraste.

### 9.3 Contraste

| Combinación                                   | Ratio mínimo | Estado         |
| --------------------------------------------- | ------------ | -------------- |
| Texto normal sobre fondo                      | 4.5:1        | AA             |
| Texto grande (>24px / >19px bold) sobre fondo | 3:1          | AA             |
| Texto sobre fondo                             | 7:1          | AAA (objetivo) |
| Elementos no textuales (iconos, bordes)       | 3:1          | AA             |

---

## 10. Breakpoints y Responsive

### 10.1 Estrategia: Mobile-first

```css
/* Móvil: 0–374px — no definido, se adapta */
sm: 375px   /* Móvil grande (iPhone SE / 12/13/14/15) */
md: 768px   /* Tablet vertical */
lg: 1024px  /* Tablet horizontal / desktop pequeño */
xl: 1440px  /* Desktop ancho */
```

### 10.2 Adaptaciones por breakpoint

| Componente      | < 768px                | 768–1023px            | ≥ 1024px                  |
| --------------- | ---------------------- | --------------------- | ------------------------- |
| Header          | Hamburger menu         | Hamburger menu        | Desktop nav               |
| Hero            | 100dvh, texto centrado | 80dvh, texto centrado | 90vh, texto alineado izq. |
| Grid secciones  | 1 columna              | 2 columnas            | 2–3 columnas              |
| Footer          | 1 columna              | 2 columnas            | 4 columnas                |
| Typography      | valores clamp mínimos  | valores intermedios   | valores clamp máximos     |
| Padding lateral | `--spacing-6`          | `--spacing-10`        | `--spacing-12`            |

---

## 11. Modo Oscuro (Dark Mode)

FRONT Valencia usa tema oscuro como **configuración por defecto**. No hay toggle de tema — el sitio es dark-first.

### Justificación

- La experiencia principal del restaurante es nocturna (terraza, cenas, eventos).
- La estética brutalista se beneficia del contraste entre fondo oscuro y texto claro.
- El contenido editorial (comida, espacio) destaca más sobre fondo oscuro.

### Plan de migración a tema claro (si aplica en futuro)

1. Añadir `@media (prefers-color-scheme: light)` con los valores semánticos de la sección 2.2.
2. Verificar todos los componentes.
3. NO añadir toggle manual — solo adaptación al sistema del usuario.

---

## 12. Stack Técnico

| Capa           | Tecnología                          |
| -------------- | ----------------------------------- |
| Framework web  | Astro 7 (hybrid output: SSG + ISR)  |
| UI interactiva | React 19 (islas Astro)              |
| CMS            | Payload CMS 3 (con Next.js 15)      |
| CSS            | Tailwind v4 + CSS custom properties |
| Color space    | OKLCH                               |
| Fuente         | Geist + Geist Mono (auto-hosted)    |
| Base de datos  | PostgreSQL (Railway)                |
| Imágenes       | Cloudflare R2 (S3-compatible)       |
| Deployment     | Vercel (web) + Railway (CMS)        |
| Monorepo       | Turborepo + pnpm workspaces         |
| i18n           | Astro i18n (es default, en)         |

---

## 13. Contribución al Sistema de Diseño

### Principios

- Los cambios deben ser **justificables**: no se añade nada sin una razón funcional o de marca.
- Preferir **valores existentes** antes de crear nuevos tokens.
- Cualquier nuevo token de color debe validarse en OKLCH y comprobarse su contraste.
- Los cambios deben reflejarse tanto en este documento como en `tokens.css`.

### Proceso

1. Propuesta en issue de GitHub.
2. Discusión técnica.
3. Implementación en rama de feature.
4. Verificación visual en todos los breakpoints y temas.
5. Actualización de `DESIGN.md`.

---

> **Documento mantenido por el equipo de FRONT Valencia.**
> Última actualización: 2026-07-13
