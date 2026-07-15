---
'frontvalencia-web': patch
---

Refinamiento del Hero, tipografía de marca y documentación:

- Copy del Hero (ES): "Saborea Valencia" y "frente al Mediterráneo.".
- Tipografía: el subtítulo del Hero usa una fuente script self-hosted
  (Sacramento, OFL) como sustituta libre de la comercial Marquette. El stack
  `--font-accent` prefiere `Marquette` automáticamente si más adelante se añade
  su `@font-face`, respetando la CSP (`font-src 'self'`).
- Ajuste visual del subtítulo: tamaño reducido un 40%, opacidad al 80% y ligera
  sombra paralela para dar cohesión sobre el vídeo de fondo.
- Documentación: README reescrito en un formato más profesional y menos
  recargado, con captura actualizada y URL de clonado corregida.
