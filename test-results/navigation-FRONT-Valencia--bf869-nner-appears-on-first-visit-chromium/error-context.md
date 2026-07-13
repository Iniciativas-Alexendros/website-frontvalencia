# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> FRONT Valencia — Cookie consent >> cookie banner appears on first visit
- Location: tests/e2e/navigation.spec.ts:47:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="dialog"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[role="dialog"]')

```

```yaml
- link "Saltar al contenido":
  - /url: "#main-content"
- banner:
  - navigation:
    - link "FRONT — Home":
      - /url: /es/
      - img "FRONT"
      - img "FRONT La Marina de Valencia"
    - link "Carta":
      - /url: /es/carta
    - link "Espacio":
      - /url: /es/espacio
    - link "Localización":
      - /url: /es/localizacion
    - link "The Club":
      - /url: https://front.feending.io/
      - text: The Club
      - img
    - link "Switch to English":
      - /url: /en/
      - text: EN
    - link "Reserva":
      - /url: /es/reservas
- main:
  - region "Hero":
    - heading "COMER BIEN FRENTE AL MAR" [level=1]
    - paragraph: Restaurante y Terraza en La Marina de Valencia
    - link "Ver Carta":
      - /url: /es/carta
    - link "Reservar":
      - /url: /es/reservas
    - link "Desplázate hacia abajo":
      - /url: "#carta"
      - img
  - region "Carta":
    - heading "Carta" [level=2]
    - heading "DESAYUNO FRENTE AL MAR" [level=3]
    - text: 9:00H 01
    - heading "CROISSANT" [level=4]
    - text: 2,95€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 7. LÁCTEOS
    - text: "02"
    - heading "TOSTADA ARTESANAL, MANTEQUILLA ECOLÓGICA Y MERMELADA CASERA" [level=4]
    - text: ECO 3,25€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 7. LÁCTEOS
    - text: "03"
    - heading "TOSTADA MEDITERRÁNEA, TOMATE FRESCO Y ACEITE DE OLIVA EXTRA" [level=4]
    - text: 3,50€
    - paragraph: 1. GLUTEN · 7. LÁCTEOS
    - text: "04"
    - heading "TOSTADA CLÁSICA DE JAMÓN IBÉRICO CON TOMATE RALLADO" [level=4]
    - text: 6,00€
    - paragraph: 1. GLUTEN
    - text: "05"
    - heading "TOSTADA DE SALMÓN NORUEGO, AGUACATE, QUESO CREMA AL ENELDO Y BROTES" [level=4]
    - text: 8,20€
    - paragraph: 1. GLUTEN · 4. PESCADO · 7. LÁCTEOS
    - heading "ESMORZARET" [level=3]
    - text: 9:00H 01
    - heading "TORTILLA DEL DÍA" [level=4]
    - text: 7,00€
    - paragraph: 3. HUEVOS
    - text: "02"
    - heading "ENCEBOLLADO DE HABITAS, LONGANIZA Y SALSA DE CHIMICHURRI" [level=4]
    - text: 7,50€
    - paragraph: 1. GLUTEN · 12. DIÓXIDO DE AZUFRE Y SULFITOS
    - text: "03"
    - heading "MAGRO CON TOMATE Y ALL I OLI" [level=4]
    - text: 8,00€
    - paragraph: 3. HUEVOS
    - text: "04"
    - heading "LOMO ASADO, PATATAS 'AL MONTÓN' Y AJO" [level=4]
    - text: 8,00€
    - paragraph: 12. DIÓXIDO DE AZUFRE Y SULFITOS
    - text: "05"
    - heading "ATÚN, TOMATE, ANCHOAS Y ACEITUNAS" [level=4]
    - text: 8,00€
    - paragraph: 1. GLUTEN · 4. PESCADO
    - text: "06"
    - heading "PEPITO DE TERNERA CON MANTEQUILLA ESPECIADA" [level=4]
    - text: 9,75€
    - paragraph: 1. GLUTEN · 7. LÁCTEOS
    - heading "ENSALADAS DE LA HUERTA" [level=3]
    - text: DESDE LAS 13H 01
    - heading "LA CLÁSICA CÉSAR CON POLLO CRUJIENTE" [level=4]
    - text: 13,50€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 4. PESCADO · 7. LÁCTEOS
    - text: "02"
    - heading "MEDITERRÁNEA POKE BOWL" [level=4]
    - text: 14,30€
    - paragraph: 1. GLUTEN · 4. PESCADO · 6. SOJA · 11. GRANOS DE SÉSAMO
    - text: "03"
    - 'heading "HUERTA Y MAR: TOMATE, MOZARELLA, VENTRESCA, NECTARINA Y PIPARRAS" [level=4]'
    - text: 15,50€
    - paragraph: 4. PESCADO · 7. LÁCTEOS
    - text: "04"
    - heading "TRICOLOR DE TOMATES DULCES, BURRATA Y PESTO" [level=4]
    - text: 16,25€
    - paragraph: 7. LÁCTEOS · 8. FRUTOS DE CÁSCARA
    - heading "LAS TAPAS DE VICENTE PATIÑO" [level=3]
    - text: DESDE LAS 13H 01
    - heading "CROQUETA DE JAMÓN (UD)" [level=4]
    - text: 3,30€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 7. LÁCTEOS
    - text: "02"
    - heading "GILDA FRONT" [level=4]
    - text: 5,00€
    - paragraph: 4. PESCADO
    - text: "03"
    - heading "QUÉ ENSALADILLA" [level=4]
    - text: 13,00€
    - paragraph: 3. HUEVOS · 4. PESCADO
    - text: "04"
    - heading "LAS BRAVAS SUFLADAS DE FRONT, CREMOSAS Y CROCANTES" [level=4]
    - text: 11,00€
    - paragraph: 3. HUEVOS
    - text: "05"
    - heading "SEPIA CON MAHONESA DE LIMA Y AJÍ AMARILLO" [level=4]
    - text: 16,00€
    - paragraph: 13. MOLUSCOS · 14. ALTRAMUCES
    - text: "06"
    - heading "MENESTRA DE VERDURAS CRUJIENTES CON MAYONESA DE SRIRACHA" [level=4]
    - text: PICANTE 12,00€
    - paragraph: 3. HUEVOS
    - text: "07"
    - heading "SEPIA ENCEBOLLADA Y PATATAS PAJAS CON AJO Y PEREJIL" [level=4]
    - text: 16,00€
    - paragraph: 14. ALTRAMUCES
    - text: "08"
    - heading "FRITURA DE PESCADO CON SALSA TÁRTARA Y CEBOLLA ROJA ENCURTIDAS" [level=4]
    - text: 14,00€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 4. PESCADO
    - text: "09"
    - heading "TITAINA DEL CABANYAL CON DADOS DE ATÚN EN SEMI SALAZÓN Y PRALINÉ DE FRUTOS SECOS" [level=4]
    - text: 15,00€
    - paragraph: 4. PESCADO · 8. FRUTOS DE CÁSCARA
    - text: "10"
    - heading "ALBÓNDIGAS DE BACALAO CON CREMOSO DE AJO A LA BRASA" [level=4]
    - text: 3,25€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 4. PESCADO
    - text: "11"
    - heading "MAGRO CON TOMATE (HUERTA DE MARAVELLA), PATATA Y EMULSIÓN DE PIMIENTO ENCURTIDO" [level=4]
    - text: 13,25€
    - paragraph: 3. HUEVOS
    - text: "12"
    - heading "CEVICHE DE CABALLA SOASADA" [level=4]
    - text: 16,00€
    - paragraph: 4. PESCADO
    - text: "13"
    - heading "COCA DE DACSA, TITAINA, HUEVO Y ANCHOAS" [level=4]
    - text: 11,00€
    - paragraph: 3. HUEVOS · 4. PESCADO
    - text: "14"
    - heading "COCA DE DACSA, MORTADELLA, BURRATA, TOMATE SECO Y PISTACHOS" [level=4]
    - text: 12,00€
    - paragraph: 7. LÁCTEOS · 8. FRUTOS DE CÁSCARA
    - heading "PARA PICAR CON SABOR A BRASA" [level=3]
    - text: DESDE LAS 13H 01
    - heading "BERENJENA A LA LLAMA" [level=4]
    - text: 12,00€
    - paragraph: Si lleva salsa contiene huevo (3)
    - text: "02"
    - heading "GAMBA BLANCA AL AJILLO" [level=4]
    - text: 21,50€
    - paragraph: 2. CRUSTÁCEOS
    - text: "03"
    - heading "ALCACHOFA DE LA HUERTA (EN TEMPORADA)" [level=4]
    - paragraph: PVP consultar
    - text: "04"
    - heading "CLOTXINA VALENCIANA, BERBERECHOS, NAVAJAS" [level=4]
    - paragraph: Consultar PVP según mercado
    - paragraph: 14. ALTRAMUCES
    - text: "05"
    - heading "CALAMAR A LA BRASA O ESTILO ANDALUZ" [level=4]
    - text: 22,00€
    - paragraph: 1. GLUTEN · 14. ALTRAMUCES
    - heading "EL PESCADO A LA BRASA" [level=3]
    - text: DESDE LAS 13H 01
    - heading "DE LONJA DEL DÍA" [level=4]
    - paragraph: PVP según mercado
    - paragraph: 4. PESCADO
    - text: "02"
    - heading "BACALAO CONFITADO, ESGARRAET Y EMULSIÓN DE KALAMATA" [level=4]
    - text: 21,50€
    - paragraph: 3. HUEVOS · 4. PESCADO
    - heading "LA CARNE A LA BRASA" [level=3]
    - text: DESDE LAS 13H 01
    - heading "CHULETA DE CERDO DE CASTAÑA" [level=4]
    - text: 17,50€ 02
    - heading "CACHOPO FRONT DE PLUMA IBÉRICA" [level=4]
    - text: 21,50€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 7. LÁCTEOS
    - text: "03"
    - heading "LOMO BAJO DE TERNERA" [level=4]
    - text: 24,50€ 04
    - heading "HAMBURGUESA DE VACA MADURA" [level=4]
    - text: 14,95€
    - paragraph: Si lleva queso contiene lácteos (7)
    - paragraph: 1. GLUTEN
    - text: "05"
    - heading "CANELÓN DE POLLO DE CORRAL" [level=4]
    - text: 16,50€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 7. LÁCTEOS
    - heading "GUARNICIONES" [level=3]
    - text: DESDE LAS 13H 01
    - heading "CREMOSO DE PATATAS" [level=4]
    - text: 5,00€
    - paragraph: 7. LÁCTEOS
    - text: "02"
    - heading "ENSALADA VERDE Y CEBOLLETA" [level=4]
    - text: 4,50€ 03
    - heading "PIMIENTOS DEL PIQUILLO CONFITADOS" [level=4]
    - text: 5,00€ 04
    - heading "PAN FOCACCIA ARTESANAL" [level=4]
    - text: 4,00€
    - paragraph: 1. GLUTEN
    - heading "LOS ARROCES EN LLAUNA (MÍN. 2PAX)" [level=3]
    - text: DESDE LAS 13H 01
    - heading "SENYORET (PESCADO DE LONJA Y MARISCO)" [level=4]
    - text: 19,90€
    - paragraph: 2. CRUSTÁCEOS · 4. PESCADO · 14. ALTRAMUCES
    - text: "02"
    - heading "CHULETA DE CERDO DE CASTAÑA, PIMIENTOS DEL PIQUILLO Y AJO ASADO A LA BRASA" [level=4]
    - text: 21,00€
    - heading "EL DULCE ANTES DE ZARPAR" [level=3]
    - text: DESDE LAS 13H 01
    - heading "FLAN AHUMADO DE VAINILLA" [level=4]
    - text: 6,50€
    - paragraph: 3. HUEVOS · 7. LÁCTEOS
    - text: "02"
    - heading "PIÑA A LA BRASA, HELADO DE CARAMELO, CROCANTI DE GALLETA" [level=4]
    - text: 6,00€
    - paragraph: 1. GLUTEN · 7. LÁCTEOS
    - text: "03"
    - heading "LA TARTA DE QUESO DE FRONT" [level=4]
    - text: 7,25€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 7. LÁCTEOS
    - text: "04"
    - heading "TOCINO DE CIELO CON SORBETE DE CÍTRICOS" [level=4]
    - text: 7,25€
    - paragraph: 3. HUEVOS
    - text: "05"
    - heading "TURRÓN XL" [level=4]
    - text: 8,00€
    - paragraph: 3. HUEVOS · 8. FRUTOS DE CÁSCARA
    - text: "06"
    - heading "TORRIJA DE BRIOCHE CARAMELIZADA" [level=4]
    - text: 7,50€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 7. LÁCTEOS
    - text: "07"
    - heading "BROWNIE CON POLVO DE NOCILLA Y HELADO DE YOGUR" [level=4]
    - text: 7,50€
    - paragraph: 1. GLUTEN · 3. HUEVOS · 6. SOJA · 7. LÁCTEOS · 8. FRUTOS DE CÁSCARA
    - heading "MENÚ DEL DÍA" [level=3]
    - text: 13H-16H
    - paragraph: Disponible de Lunes a Viernes
    - text: "01"
    - heading "BOCADOS DEL CHEF - A ELEGIR -" [level=4]
    - paragraph: 1. Ceviche, maíz tostado y boniato | 2. Croquetas de jamón
    - text: "02"
    - heading "ENTRANTES - A COMPARTIR -" [level=4]
    - paragraph: 1. Clotxina valenciana al vapor | 2. Patatas bravas en tempura
    - text: "03"
    - heading "PRINCIPAL - A ELEGIR -" [level=4]
    - paragraph: 1. Arroz de carrillera y pimientos del piquillo (min. 2 pax) | 2. Bacalao confitado con esgarradet y emulsión de kalamata | 3. Magro en salsa con patatas al montón y emulsión de pimiento
    - text: "04"
    - heading "POSTRE - A ELEGIR -" [level=4]
    - paragraph: 1. Brownie con helado de yogur y polvo de nocilla | 2. Piña asada con helado de caramelo | 3. Fruta de temporada
    - text: "05"
    - heading "SERVICIO DE AGUA Y PAN INCLUIDO" [level=4]
    - text: 25,00€
    - heading "MENÚ DE GRUPO" [level=3]
    - text: "01"
    - heading "MENÚ LA DÁRSENA" [level=4]
    - paragraph: "Snack en mesa: Almendras trufadas y servicio de cesta de pan tostado con alioli y tomate. Entrante para compartir: Chipironcitos fritos con huevo de corral. Entrante individual: Ensaladilla marinera con quisquilla fresca. Principal: Arroz de panceta y calabaza con alcachofitas. Postre: Tarta de queso casera con esencia de fresa."
    - text: "02"
    - heading "MENÚ DOCK" [level=4]
    - paragraph: "Entrante centro mesa: Tomate dulce tricolor con burrata, pesto cítrico de albahaca y pimiento al caramelo | Ceviche de lubina con cebollada morada, camote, gamba cristal y ají amarillo. Entrante individual: Tosta de ensaladilla marinera con ventresca, anchoa y piparra. Principal a elegir: 1. Meloso de chipirones y alcachofa | 2. Corvina a la brasa con crema de boniato | 3. Picaña con patatas asadas a la brasa, tirabeques y chimichurri. Postre: Torrija caramelizada con frutos del bosque y helado de leche merengada."
    - text: "03"
    - heading "MENÚ ALTAMAR" [level=4]
    - paragraph: "Entrante centro mesa: 1. Steak tartar de vaca con patatas crujientes y tostas artesanales | 2. Gamba blanca al ajillo. Entrante individual: Alcachofa a la brasa con salsa de pimientos asados y avellana. Principal a elegir: 1. Meloso de pollo de corral, setas y ajetes tiernos | 2. Corvina a la brasa con verduras salteadas al teriyaki | 3. Carrilleras ibéricas con parmenier de patata trufada. Postre: Tarta de queso con esencia de fresa. Incluye una bebida."
    - heading "Alérgenos" [level=3]
    - text: 1 · GLUTEN 2 · CRUSTÁCEOS 3 · HUEVOS 4 · PESCADO 5 · CACAHUETES 6 · SOJA 7 · LÁCTEOS 8 · FRUTOS DE CÁSCARA 9 · APIO 10 · MOSTAZA 11 · GRANOS DE SÉSAMO 12 · DIÓXIDO DE AZUFRE Y SULFITOS 13 · MOLUSCOS 14 · ALTRAMUCES
  - region "Espacio":
    - heading "COMER FRENTE AL MAR, DENTRO DE UNA JOYA BRUTALISTA." [level=2]
    - paragraph: "La Marina de Valencia vibra con un nuevo actor en su ecosistema de innovación. No es un proyecto tech más: es diseño, gastronomía y creatividad disruptiva. Grupo El Alto y Groovelives Team se han unido para dar vida a FRONT, el nuevo espacio gastronómico que marca tendencia en The Terminal Hub."
    - paragraph: Groovelives Team, expertos en crear experiencias donde se cruzan música, arte y cultura, junto a El Alto, con más de 40 años de trayectoria en gastronomía sostenible, presentan una propuesta que va más allá de la comida. FRONT se integra con la arquitectura brutalista del edificio y lo transforma en un lugar para disfrutar frente al mar, conectar y formar parte de la Valencia creativa.
    - heading "Espacios" [level=3]
    - list:
      - listitem: Terraza cubierta
      - listitem: Lounge
      - listitem: Cocktails Bar
      - listitem: Acceso terraza fin de semana
    - paragraph: ¿Tienes un evento privado en mente?
    - link "eventos@frontvalencia.com →":
      - /url: mailto:eventos@frontvalencia.com
    - list "Galería del espacio":
      - listitem:
        - img "Interior del restaurante FRONT"
        - img
      - listitem:
        - img "Terraza cubierta de FRONT"
        - img
      - listitem:
        - img "Barra de cócteles de FRONT"
        - img
      - listitem:
        - img "Exterior de FRONT en La Marina"
        - img
      - listitem:
        - img "Vista general del espacio FRONT"
        - img
  - region "The Club":
    - heading "The Club" [level=2]
    - paragraph: Únete a la comunidad FRONT. Eventos exclusivos, promociones y sorpresas.
    - link "Descubrir":
      - /url: https://front.feending.io/
      - text: Descubrir
      - img
  - region "LOCALIZACIÓN":
    - heading "LOCALIZACIÓN" [level=2]
    - heading "Dirección" [level=3]:
      - img
      - text: Dirección
    - paragraph: C/Travesía
    - paragraph: 46024 — La Marina de Valencia, The Terminal Hub
    - heading "Horario" [level=3]:
      - img
      - text: Horario
    - list:
      - listitem: "Lunes a Viernes: 9:00 a 19:00"
      - listitem: "Sábados, Domingos y Festivos: 11:30 a 19:00"
      - listitem: Noches de viernes y sábados hasta la 1:30h
    - heading "Cómo llegar" [level=3]:
      - img
      - text: Cómo llegar
    - paragraph: Bus
    - list:
      - listitem: "· Doctor J.J. Dòmine - Edifici del Rellotge: Líneas 4, 19, 92, 95, 99"
      - listitem: "· Avinguda del Port - Joan Verdeguer: Líneas 4, 30, 95, C3"
      - listitem: "· Manuel Soto Enginyer - Estació: Líneas 4, 19, 30, 92, 95, 99"
    - paragraph: "Parking: Parking público de pago gestionado por el Ayuntamiento de Valencia. Acceso a través del Tinglado nº 5."
    - paragraph: "Bicis: Parking bicis disponible"
    - link "Cómo llegar":
      - /url: https://maps.app.goo.gl/FVnSVDYfv5XnNiU16
      - text: Cómo llegar
      - img
    - iframe
  - region "RESERVA":
    - heading "RESERVA" [level=2]
    - paragraph: FRONT · COMER BIEN FRENTE A LA MARINA
    - paragraph: Menú de mediodía entre semana · Carta disponible todos los días · Menús de grupo disponibles bajo reserva.
    - iframe
    - heading "Horario" [level=3]
    - list:
      - listitem: "De lunes a viernes: 9:00 a 19:00."
      - listitem: "Sábados, domingos y festivos: 11:30 a 19:00."
      - listitem: Noches de viernes y sábados hasta la 1:30h (desde el 8 de abril).
    - paragraph:
      - text: Para grupos o eventos, también abrimos fuera de este horario. Consulta disponibilidad en
      - link "eventos@frontvalencia.com":
        - /url: mailto:eventos@frontvalencia.com
    - paragraph:
      - text: Y si tienes cualquier duda, contáctanos por WhatsApp o teléfono en el
      - link "+34 965 020 349":
        - /url: tel:34965020349
    - link "WhatsApp":
      - /url: https://wa.me/34965020349
      - img
      - text: WhatsApp
    - heading "CONDICIONES DE RESERVA" [level=3]
    - group:
      - text: Lee las condiciones antes de reservar
      - img
    - link "Ver condiciones completas →":
      - /url: /es/condiciones-reserva
- contentinfo:
  - img "FRONT"
  - paragraph: Suscríbete para enterarte de todo
  - text: Email
  - textbox "Email":
    - /placeholder: email@example.com
  - button "Suscribirse"
  - heading "Contacto" [level=3]
  - list:
    - listitem: Dirección C/Travesía 46024 — La Marina de Valencia, The Terminal Hub, Valencia
    - listitem:
      - text: Teléfono
      - link "+34 965 020 349":
        - /url: tel:34965020349
    - listitem:
      - text: Email
      - link "hello@frontvalencia.com":
        - /url: mailto:hello@frontvalencia.com
    - listitem:
      - link "reservas@frontvalencia.com":
        - /url: mailto:reservas@frontvalencia.com
      - link "eventos@frontvalencia.com":
        - /url: mailto:eventos@frontvalencia.com
  - heading "Legal" [level=3]
  - list:
    - listitem:
      - link "Aviso Legal":
        - /url: /es/legal-advice
    - listitem:
      - link "Privacidad":
        - /url: /es/privacy-policy
    - listitem:
      - link "Cookies":
        - /url: /es/cookies-policy
    - listitem:
      - link "Talento":
        - /url: https://grupoelalto-1738067471.teamtailor.com/
        - text: Talento
        - img
  - heading "Síguenos" [level=3]
  - link "Instagram":
    - /url: https://www.instagram.com/frontvalencia
    - img
    - text: "@frontvalencia"
  - paragraph: © 2026 FRONT THE TERMINAL BAR. Todos los derechos reservados.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('FRONT Valencia — Navigation', () => {
  4   |   test('home page loads with hero', async ({ page }) => {
  5   |     await page.goto('/es/');
  6   |     await expect(page).toHaveTitle(/FRONT/);
  7   |     await expect(page.locator('main')).toBeVisible();
  8   |   });
  9   | 
  10  |   test('navigate to carta and see menu categories', async ({ page }) => {
  11  |     await page.goto('/es/carta');
  12  |     await expect(page.locator('h2')).toContainText('Carta');
  13  |     // Check that menu categories are rendered
  14  |     const categories = page.locator('h3');
  15  |     await expect(categories.first()).toBeVisible();
  16  |   });
  17  | 
  18  |   test('navigate to espacio', async ({ page }) => {
  19  |     await page.goto('/es/espacio');
  20  |     await expect(page.locator('h2').first()).toContainText('BRUTALISTA');
  21  |   });
  22  | 
  23  |   test('navigate to localizacion', async ({ page }) => {
  24  |     await page.goto('/es/localizacion');
  25  |     await expect(page.locator('main h2').first()).toContainText('LOCALIZACIÓN');
  26  |   });
  27  | 
  28  |   test('navigate to reservas', async ({ page }) => {
  29  |     await page.goto('/es/reservas');
  30  |     await expect(page.locator('main h2').first()).toContainText('RESERVA');
  31  |   });
  32  | });
  33  | 
  34  | test.describe('FRONT Valencia — Language switching', () => {
  35  |   test('EN home page loads', async ({ page }) => {
  36  |     await page.goto('/en/');
  37  |     await expect(page).toHaveTitle(/FRONT/);
  38  |   });
  39  | 
  40  |   test('EN menu page loads', async ({ page }) => {
  41  |     await page.goto('/en/menu');
  42  |     await expect(page.locator('h2')).toContainText('Menu');
  43  |   });
  44  | });
  45  | 
  46  | test.describe('FRONT Valencia — Cookie consent', () => {
  47  |   test('cookie banner appears on first visit', async ({ page }) => {
  48  |     await page.goto('/es/');
  49  |     // Cookie consent should be visible (no stored consent)
  50  |     const banner = page.locator('[role="dialog"]');
> 51  |     await expect(banner).toBeVisible();
      |                          ^ Error: expect(locator).toBeVisible() failed
  52  |   });
  53  | 
  54  |   test('accepting cookies stores consent', async ({ page }) => {
  55  |     await page.goto('/es/');
  56  |     const banner = page.locator('[role="dialog"]');
  57  |     await expect(banner).toBeVisible();
  58  | 
  59  |     // Click accept all
  60  |     await page.getByText('Aceptar todas').click();
  61  |     await expect(banner).not.toBeVisible();
  62  | 
  63  |     // Consent should be in localStorage
  64  |     const consent = await page.evaluate(() => localStorage.getItem('front-cookie-consent'));
  65  |     expect(consent).toBeTruthy();
  66  |     const parsed = JSON.parse(consent!);
  67  |     expect(parsed.analytics).toBe(true);
  68  |     expect(parsed.marketing).toBe(true);
  69  |   });
  70  | 
  71  |   test('rejecting cookies stores minimal consent', async ({ page }) => {
  72  |     await page.goto('/es/');
  73  |     const banner = page.locator('[role="dialog"]');
  74  |     await page.getByText('Rechazar').click();
  75  |     await expect(banner).not.toBeVisible();
  76  | 
  77  |     const consent = await page.evaluate(() => localStorage.getItem('front-cookie-consent'));
  78  |     const parsed = JSON.parse(consent!);
  79  |     expect(parsed.analytics).toBe(false);
  80  |     expect(parsed.marketing).toBe(false);
  81  |   });
  82  | });
  83  | 
  84  | test.describe('FRONT Valencia — External links', () => {
  85  |   test('The Club link has correct attributes', async ({ page }) => {
  86  |     await page.goto('/es/');
  87  |     const clubLinks = page.locator('a[href*="front.feending.io"]');
  88  |     const count = await clubLinks.count();
  89  |     expect(count).toBeGreaterThan(0);
  90  |     for (let i = 0; i < count; i++) {
  91  |       await expect(clubLinks.nth(i)).toHaveAttribute('target', '_blank');
  92  |       await expect(clubLinks.nth(i)).toHaveAttribute('rel', /noopener/);
  93  |     }
  94  |   });
  95  | 
  96  |   test('Teamtailor careers link has correct attributes', async ({ page }) => {
  97  |     await page.goto('/es/');
  98  |     const careerLinks = page.locator('a[href*="teamtailor.com"]');
  99  |     const count = await careerLinks.count();
  100 |     expect(count).toBeGreaterThan(0);
  101 |     for (let i = 0; i < count; i++) {
  102 |       await expect(careerLinks.nth(i)).toHaveAttribute('target', '_blank');
  103 |       await expect(careerLinks.nth(i)).toHaveAttribute('rel', /noopener/);
  104 |     }
  105 |   });
  106 | });
  107 | 
  108 | test.describe('FRONT Valencia — Accessibility', () => {
  109 |   test('skip-to-content link exists', async ({ page }) => {
  110 |     await page.goto('/es/');
  111 |     const skipLink = page.locator('a[href="#main-content"]');
  112 |     await expect(skipLink).toHaveCount(1);
  113 |   });
  114 | 
  115 |   test('all images have alt attributes', async ({ page }) => {
  116 |     await page.goto('/es/');
  117 |     const images = page.locator('img');
  118 |     const count = await images.count();
  119 |     for (let i = 0; i < count; i++) {
  120 |       await expect(images.nth(i)).toHaveAttribute('alt');
  121 |     }
  122 |   });
  123 | 
  124 |   test('cookie consent has dialog role', async ({ page }) => {
  125 |     await page.goto('/es/');
  126 |     const dialog = page.locator('[role="dialog"]');
  127 |     await expect(dialog).toHaveAttribute('aria-label');
  128 |   });
  129 | });
  130 | 
```