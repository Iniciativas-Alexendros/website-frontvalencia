---
'frontvalencia-web': patch
---

Elimina la duplicidad del botón "Contactar" en la zona de bienvenida.

En la primera pantalla del home aparecían dos botones "Contactar" apuntando al
mismo destino (`#localizacion`/`#location`): el CTA persistente del navbar y un
segundo CTA en el Hero. Ahora el Hero conserva un único CTA primario
("Ver Carta" → `#carta`) y el acceso a contacto queda centralizado en el navbar,
tanto en escritorio como en móvil. Se añade un test de regresión E2E que fija
que el Hero expone exactamente un CTA.
