# TECNO GUÍA — proyecto completo e integrado

## Estructura
- `TECNO-GUIA/` — el sitio (esto es lo que se publica). Abrir `index.html`.
  - `index.html` · `pages/` (aprende, mantenimiento, problemas, herramientas, evaluacion, acerca-de)
  - `css/` · `js/` (una carpeta por página) · `assets/`
- `modulos/` — herramientas internas. **No se publican.**
  - `modulo-auditoria/` (Fase 16) · `modulo-publicacion/` (Fase 17) · `modulo-mantenimiento/` (Fase 18)

## Navegación vinculada
Menú, pie de página y botones de las siete páginas enlazan entre sí con rutas reales (Inicio, Aprende, Mantenimiento, Problemas y soluciones, Herramientas, Evaluación y Acerca de). No queda ningún enlace pendiente.
En Inicio, las tarjetas de categorías, mantenimiento, problemas frecuentes y herramientas abren la sección correspondiente de la página que las desarrolla. Dos botones finales: «Explorar contenidos» (Evaluación) lleva a Aprende y «Continuar aprendiendo» (Herramientas) lleva a Evaluación.

## Pendiente
- **Problemas y soluciones** se integró sin su fase funcional: se añadió el menú móvil (`js/menu.js`); sus tarjetas y botones aún no tienen interacción.
- **Hosting y pruebas desde Internet:** las realiza el propietario (ver `modulos/modulo-publicacion`).

## Antes de publicar (en este orden)
1. `node modulos/modulo-auditoria/auditar.js TECNO-GUIA`
2. `node modulos/modulo-publicacion/preparar.js TECNO-GUIA --url <dirección-pública-real>`
3. Subir el contenido de `salida/publicar/TECNO-GUIA/` y completar `modulos/modulo-publicacion/lista-verificacion-publicada.md`.
