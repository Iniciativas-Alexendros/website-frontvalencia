# Plan de Implementación — FRONT Valencia Website

---

## ⚠️ PENDIENTES DE CLIENTE (bloquean el Go-Live)

> Datos reales que faltan por confirmar con el cliente antes de publicar en
> dominio definitivo. El código ya está preparado; solo hay que sustituir estos
> valores.

| #   | Dato pendiente                                                          | Dónde se usa                                                                                  | Estado         |
| --- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------- |
| 1   | Datos fiscales del titular (razón social, CIF/NIF, domicilio fiscal)    | `src/pages/{es,en}/legal-advice.astro` y `privacy-policy.astro` (marcados con `TODO-CONTENT`) | ✅             |
| 2   | Dirección postal completa del local (The Terminal Hub, sin nº de calle) | `src/content/site.json` → `contact.address`, Footer, JSON-LD, Localización                    | ✅             |
| 3   | URL real del portal de empleo (Teamtailor)                              | `src/components/sections/Header.tsx` y `Footer.tsx` (`careersUrl`)                            | ⚠️ verificar   |
| 4   | Emails de contacto definitivos (general, reservas, eventos)             | `src/content/site.json`, `Footer.tsx`, `ReservasSection.tsx`, páginas de condiciones          | ⚠️ verificar   |
| 5   | ID de Meta Pixel / analytics                                            | `src/lib/analytics.ts` (placeholder)                                                          | 🟢 opcional    |
| 6   | Dominio final + `PUBLIC_SITE_URL`                                       | `astro.config.mjs`, `vercel.json`, sitemap, JSON-LD                                           | ⚠️ al publicar |

**Cómo localizarlos rápido:**

```bash
grep -rn "TODO-CONTENT" apps/web/src            # textos legales pendientes
grep -n "address" apps/web/src/content/site.json # dirección incompleta
```

---

## Resumen de Cambios (12 puntos)

Este plan descompone los 12 puntos solicitados en fases ejecutables con verificaciones concretas.

---

## Fase 1 — Configuración y Preparación (Trivial)

### Fase 1.1 — Verificación de Entorno y Dependencias

- [ ] Verificar que `pnpm install` funciona correctamente
- [ ] Ejecutar `pnpm run lint` y `pnpm run build` para establecer baseline
- [ ] Confirmar que las imágenes de referencia (`/images/hero-poster.jpg`, `/video/vid-desk.mp4`, etc.) existen

**Verificación:**

```bash
pnpm run lint && pnpm run build
```

---

## Fase 2 — Menús de Grupo (Moderado)

### Fase 2.1 — Actualizar Contenido de Menús de Grupo (ES + EN)

- [ ] Actualizar `apps/web/src/content/menu/es.json`:
  - Renombrar `MENÚ DE GRUPO` → mantener estructura pero cambiar descripción al formato solicitado:
    - Menú 1: "MENÚ LA DÁRSENA" con descripción completa (Snack, Entrante compartir, Entrante individual, Principal, Postre)
    - Menú 2: "MENÚ DOCK" con descripción completa
    - Menú 3: "MENÚ ALTAMAR" con descripción completa
  - Eliminar numeración `01, 02, 03` → usar numeración simple `1, 2, 3`
- [ ] Actualizar `apps/web/src/content/menu/en.json` con traducciones equivalentes

**Verificación:**

```bash
cat apps/web/src/content/menu/es.json | jq '.categories[] | select(.name=="MENÚ DE GRUPO")'
```

### Fase 2.2 — Ajustar Componente MenuSection para Nueva Estructura

- [ ] Modificar `apps/web/src/components/sections/MenuSection.tsx`:
  - Detectar categorías de tipo "MENÚ DE GRUPO" (por nombre)
  - Renderizar como tarjetas individuales con descripción completa (no lista de items con número/precio)
  - Mantener numeración simple (1, 2, 3) en lugar de 01, 02, 03
  - Formato: **Nombre del menú** → Descripción completa en párrafo

**Verificación:**

```bash
pnpm run build && pnpm run dev
# Visitar /es/carta y /en/menu → verificar renderizado de menús de grupo
```

---

## Fase 3 — Eventos Privados y Condiciones (Simple)

### Fase 3.1 — Botón en "¿Tienes un evento privado en mente?" (Es + En)

- [ ] Modificar `apps/web/src/components/sections/EspacioSection.tsx`:
  - Cambiar enlace `mailto:eventos@frontvalencia.com` → botón estilizado
  - Mismo estilo que botón "Reserva" del Header (bg-terracotta-500 hover:bg-terracotta-400)
  - Texto: "Contacta con nosotros" / "Contact us"

### Fase 3.2 — Condiciones de Reserva: Eliminar Desplegable (Es + En)

- [ ] Modificar `apps/web/src/components/sections/ReservasSection.tsx`:
  - Eliminar `<details>` / `<summary>` (accordion)
  - Mostrar contenido directamente como en bloque izquierdo
  - Separar cláusulas: una por línea con `<p>` o `<li>`
- [ ] Actualizar `apps/web/src/pages/es/condiciones-reserva.astro` y `en/booking-conditions.astro`:
  - Mismo contenido, mismo estilo (sin accordion)

### Fase 3.3 — Horarios: Eliminar "9:00H" y "DESDE LAS 13H" de Títulos

- [ ] En `apps/web/src/content/menu/es.json` y `en.json`:
  - **DESAYUNO FRENTE AL MAR** y **ESMORZARET**: eliminar `"time": "9:00H"` / `"9:00 AM"`
  - **ENSALADAS**, **TAPAS**, **PARA PICAR**, **PESCADO**, **CARNE**, **GUARNICIONES**, **ARROCES**, **DULCES**: eliminar `"time": "DESDE LAS 13H"` / `"FROM 1 PM"`
  - **MENÚ DEL DÍA**: eliminar `"time": "13H-16H"` / `"1 PM - 4 PM"`
- [ ] En `MenuSection.tsx`:
  - Antes del título "DESAYUNO FRENTE AL MAR" / "BREAKFAST BY THE SEA": añadir línea "Abrimos la mañana a las 9:00h con..." / "We open the morning at 9:00am with..."
  - Antes de la primera categoría con horario "DESDE LAS 13H" / "FROM 1 PM": añadir "Y a partir de las 13:00h..." / "And from 1:00pm..."

### Fase 3.4 — Arroces: Cambiar "(MÍN. 2PAX)" → "(Mín. 2 raciones)"

- [ ] En `menu/es.json` y `menu/en.json`:
  - Categoría `"LOS ARROCES EN LLAUNA (MÍN. 2PAX)"` → `"LOS ARROCES EN LLAUNA (Mín. 2 raciones)"`
  - En inglés: `"TRAY-BAKED RICE (MIN. 2 PAX)"` → `"TRAY-BAKED RICE (Mín. 2 portions)"`
- [ ] En `MenuSection.tsx`: reducir tamaño de fuente del texto entre paréntesis a la mitad (`text-[0.6em]` o similar)

### Fase 3.5 — Menú del Día: Sustituir "13H-16H" por "25,00€"

- [ ] En `menu/es.json`: categoría `"MENÚ DEL DÍA"` → eliminar `"time": "13H-16H"`, añadir precio en el item 5: `"price": "25,00€"` (ya existe)
- [ ] En `menu/en.json`: categoría `"DAILY LUNCH MENU"` → eliminar `"time": "1 PM - 4 PM"`, item 5 ya tiene precio
- [ ] En `MenuSection.tsx`: para categoría "MENÚ DEL DÍA" / "DAILY LUNCH MENU", mostrar el precio del item 5 como badge destacado en el header de la categoría

**Verificación Fase 3:**

```bash
pnpm run build
pnpm run dev
# Verificar /es/carta, /en/menu, /es/reservas, /en/book, /es/condiciones-reserva, /en/booking-conditions
```

---

## Fase 4 — Formulario de Reservas y Sticky CTA (Moderado)

### Fase 4.1 — Arreglar Formulario de Reservas (Iframe CoverManager)

- [ ] En `ReservasSection.tsx`:
  - El iframe tiene `min-h-[600px]` fijo → cambiar a `h-auto` o usar `aspect-video`
  - Permitir que el iframe crezca con su contenido: `style={{ height: '100%', minHeight: '600px' }}` o CSS `height: 100%`
  - Eliminar altura fija del contenedor padre o usar `overflow: visible`

### Fase 4.2 — Sticky "Reserva ahora tu mesa" (Top-Right)

- [ ] En `BaseLayout.astro` o `Header.tsx`:
  - Añadir botón fixed top-right: `fixed top-4 right-4 z-50` (sin tocar márgenes de ventana)
  - Botón: "Reserva ahora tu mesa" / "Book your table now"
  - Estilo: `bg-terracotta-500 hover:bg-terracotta-400 text-white px-4 py-2 rounded font-semibold`
  - Link a `/es/reservas` o `/en/book` según idioma actual
  - Solo visible en scroll > 100px (opcional: aparecer tras scroll)

**Verificación Fase 4:**

```bash
pnpm run dev
# Probar /es/reservas → formulario visible sin scroll interno
# Scroll down → botón sticky aparece top-right
```

---

## Fase 5 — Single Page Application + Navbar Scroll (Complejo)

### Fase 5.1 — Convertir a Single Page (Index única)

- [ ] Modificar `apps/web/src/pages/es/index.astro` y `en/index.astro`:
  - Convertir en página única que incluya TODAS las secciones:
    - Hero
    - MenuSection (Carta)
    - EspacioSection
    - LocalizacionSection
    - ReservasSection
  - Eliminar páginas separadas `/carta`, `/espacio`, `/localizacion`, `/reservas` (o redirigir con anchor links)

### Fase 5.2 — Navbar: Scroll Suave a Secciones (Single Page)

- [ ] En `Header.tsx`:
  - Links del navbar: cambiar `href="/es/carta"` → `href="#carta"`, etc.
  - Implementar scroll suave: `scrollIntoView({ behavior: 'smooth' })`
  - Mantener `client:load` para interactividad
- [ ] Secciones con IDs correctos:
  - `#carta` (MenuSection)
  - `#espacio` (EspacioSection)
  - `#localizacion` / `#location` (LocalizacionSection)
  - `#reservas` / `#book` (ReservasSection)

### Fase 5.2.1 — "The Club": Mantener Redirección Externa + Fondo Scroll

- [ ] Extraer imagen de fondo de `https://front.feending.io/`:
  - Descargar imagen de fondo del club
  - Guardar en `/public/images/club-bg.jpg` (o similar)
- [ ] En `Hero.tsx` o `BaseLayout.astro`:
  - Implementar fondo parallax suave que acompañe al scroll
  - Usar `background-attachment: fixed` o IntersectionObserver para parallax suave
  - Imagen del Club como fondo que se revela al hacer scroll

### Fase 5.3 — Eliminar Páginas Separadas + Redirecciones

- [ ] Eliminar o comentar páginas: `es/carta.astro`, `es/espacio.astro`, `es/localizacion.astro`, `es/reservas.astro` y equivalentes EN
- [ ] En `BaseLayout.astro` o `astro.config.mjs`: añadir redirecciones 301 de `/carta` → `/#carta`, etc. (opcional, para SEO)

**Verificación Fase 5:**

```bash
pnpm run build
pnpm run dev
# Probar: click en navbar → scroll suave a sección
# Probar: /es/ → single page con todas las secciones
# Probar: The Club → redirige a front.feending.io
```

---

## Fase 6 — Hero Section + Imagen de Fondo (Moderado)

### Fase 6.1 — Mejorar Hero "COMER BIEN FRENTE AL MAR"

- [ ] En `Hero.tsx`:
  - Reemplazar video/fondo actual por imagen extraída de `front.feending.io` (punto 10)
  - Usar la misma imagen del Club como fondo del Hero
  - Ajustar overlay/gradiente para que el texto sea legible
  - Mantener CTAs ("Ver Carta", "Reservar") funcionales

### Fase 6.2 — Imagen de Fondo Suave (Parallax)

- [ ] Implementar en `Hero.tsx` o `BaseLayout.astro`:
  - `background-attachment: fixed` en contenedor del Hero
  - O IntersectionObserver para parallax suave al scroll
  - Imagen: la misma extraída de `front.feending.io` (Club)

**Verificación Fase 6:**

```bash
pnpm run dev
# Verificar Hero: fondo correcto, texto legible, CTAs funcionan
# Scroll → parallax suave en fondo
```

---

## Fase 7 — Versión Inglesa Completa (Simple pero Laborioso)

### Fase 7.1 — Revisión Completa EN

- [ ] Verificar `/en/` (home), `/en/menu`, `/en/book`, `/en/booking-conditions`, `/en/space`, `/en/location`
- [ ] Aplicar **todos** los cambios de fases 2-6 a versión EN:
  - Menús de grupo formato nuevo
  - Textos horarios ("Abrimos la mañana...", "Y a partir de las 13:00h...")
  - Arroces: "(Mín. 2 portions)"
  - Menú del día: precio "25,00€" / "25.00€"
  - Condiciones de reserva sin accordion
  - Botón evento privado
  - Sticky reserva
  - Single page + navbar scroll
  - Hero con nueva imagen
  - Arroces: "(Mín. 2 portions)"
  - Menú del día: "25.00€"

### Fase 7.2 — Content EN (`menu/en.json`)

- [ ] Aplicar mismos cambios de contenido a `menu/en.json`:
  - Nombres de categorías traducidos
  - Textos de tiempo ("Abrimos la mañana...", "And from 1:00pm...")
  - Arroces: "(Mín. 2 portions)"
  - Menú del día: precio visible

**Verificación Fase 7:**

```bash
pnpm run build
pnpm run dev
# Recorrer TODAS las páginas EN y ES
```

---

## Fase 8 — Testing, Lint y Deploy (Trivial)

### Fase 8.1 — Verificaciones Finales

- [ ] `pnpm run lint` → 0 errores
- [ ] `pnpm run build` → build exitoso
- [ ] `pnpm run test` (si existe) → pasa
- [ ] Verificar en móvil (responsive)
- [ ] Verificar accesibilidad básica (skip link, aria-labels, contraste)

### Fase 8.2 — Deploy a Producción

- [ ] Push a `main` → trigger deploy en Vercel
- [ ] Verificar producción: `https://website-frontvalencia.vercel.app`
- [ ] Verificar alias: `https://website-frontvalencia.vercel.app/es/`, `/en/`

---

## Resumen de Archivos a Modificar

| Archivo                                                | Fases       | Tipo                     |
| ------------------------------------------------------ | ----------- | ------------------------ |
| `apps/web/src/content/menu/es.json`                    | 2, 3        | Contenido                |
| `apps/web/src/content/menu/en.json`                    | 2, 3, 7     | Contenido                |
| `apps/web/src/components/sections/MenuSection.tsx`     | 2, 3, 7     | Componente               |
| `apps/web/src/components/sections/ReservasSection.tsx` | 3, 4        | Componente               |
| `apps/web/src/components/sections/EspacioSection.tsx`  | 3           | Componente               |
| `apps/web/src/components/sections/Header.tsx`          | 4, 5, 9     | Componente               |
| `apps/web/src/components/sections/Hero.tsx`            | 6, 11       | Componente               |
| `apps/web/src/components/sections/BaseLayout.astro`    | 4, 5, 9, 10 | Layout                   |
| `apps/web/src/pages/es/index.astro`                    | 5           | Página                   |
| `apps/web/src/pages/en/index.astro`                    | 5, 7        | Página                   |
| `apps/web/src/pages/es/carta.astro`                    | 5           | Eliminar/Redirigir       |
| `apps/web/src/pages/en/menu.astro`                     | 5, 7        | Eliminar/Redirigir       |
| `apps/web/src/pages/es/espacio.astro`                  | 5           | Eliminar/Redirigir       |
| `apps/web/src/pages/en/space.astro`                    | 5, 7        | Eliminar/Redirigir       |
| `apps/web/src/pages/es/localizacion.astro`             | 5           | Eliminar/Redirigir       |
| `apps/web/src/pages/en/location.astro`                 | 5, 7        | Eliminar/Redirigir       |
| `apps/web/src/pages/es/reservas.astro`                 | 5           | Eliminar/Redirigir       |
| `apps/web/src/pages/en/book.astro`                     | 5, 7        | Eliminar/Redirigir       |
| `apps/web/src/pages/es/condiciones-reserva.astro`      | 3           | Componente               |
| `apps/web/src/pages/en/booking-conditions.astro`       | 3, 7        | Componente               |
| `apps/web/src/lib/content.ts`                          | -           | Utilidad (sin cambios)   |
| `apps/web/public/images/`                              | 6, 10       | Assets (nuevas imágenes) |

---

## Dependencias Entre Fases

```
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6 → Fase 7 → Fase 8
   │       │       │       │       │       │       │
   └───────┴───────┴───────┴───────┴───────┴───────┘
   (Secuencial: cada fase depende de la anterior)
```

**Nota:** Fase 7 (Inglés) puede paralelizarse parcialmente con Fase 5-6 si hay capacidad, pero requiere que las fases 2-6 estén completas en ES primero.

---

## Estimación de Esfuerzo

| Fase      | Complejidad      | Tiempo Estimado |
| --------- | ---------------- | --------------- |
| 1         | Trivial          | 15 min          |
| 2         | Moderado         | 1-2 h           |
| 3         | Simple           | 1 h             |
| 4         | Moderado         | 1-2 h           |
| 5         | Complejo         | 2-3 h           |
| 6         | Moderado         | 1 h             |
| 7         | Simple/Laborioso | 2-3 h           |
| 8         | Trivial          | 30 min          |
| **Total** |                  | **~10-12 h**    |

---

## Comandos de Verificación por Fase

```bash
# Fase 1
pnpm run lint && pnpm run build

# Fase 2
pnpm run build && pnpm run dev
# Verificar /es/carta y /en/menu

# Fase 3
pnpm run build && pnpm run dev
# Verificar /es/carta, /es/reservas, /es/condiciones-reserva, /en/*

# Fase 4
pnpm run dev
# Probar formulario reservas + sticky button

# Fase 5
pnpm run build && pnpm run dev
# Probar single page + navbar scroll + The Club

# Fase 6
pnpm run dev
# Verificar Hero + parallax

# Fase 7
pnpm run build && pnpm run dev
# Recorrido completo EN + ES

# Fase 8
pnpm run lint && pnpm run build && pnpm run test
# Deploy
```

---

## Notas Importantes

1. **Imágenes de `front.feending.io`**: Necesario descargar la imagen de fondo del Club antes de Fase 6. Usar `wget` o navegador para obtener la URL de la imagen de fondo.

2. **Single Page + SEO**: Al eliminar páginas separadas, considerar añadir `redirects` en `vercel.json` o `astro.config.mjs` para mantener SEO:

   ```json
   "redirects": [
     { "source": "/es/carta", "destination": "/es/#carta", "permanent": true },
     { "source": "/en/menu", "destination": "/en/#carta", "permanent": true }
   ]
   ```

3. **CoverManager Iframe**: El formulario de reservas usa iframe de CoverManager. Probar en móvil que no haya scroll interno ni recorte.

4. **Idiomas**: Todos los cambios de contenido deben replicarse en `menu/en.json` y páginas EN correspondientes.

5. **Testing**: Usar `pnpm run dev` para testing visual continuo. `pnpm run build` para validación de tipos y build.
