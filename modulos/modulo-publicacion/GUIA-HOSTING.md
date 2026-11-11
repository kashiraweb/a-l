# Guía de publicación — TECNO GUÍA (Fase 17)

TECNO GUÍA está planteada con HTML5, CSS3 y JavaScript. Si al revisar el proyecto no aparece PHP, MySQL, Node.js en servidor, APIs ni autenticación, funciona como **sitio estático** y no necesita backend. Las evaluaciones usan `localStorage`: los resultados quedan en el navegador del usuario y no se sincronizan entre dispositivos ni navegadores.

## Antes de elegir hosting
1. Si ya existe un proveedor, comprobar primero su compatibilidad (sitio estático, carpeta pública, HTTPS).
2. Revisar en la web oficial del proveedor, el día de la publicación: espacio, transferencia, HTTPS, dominio propio, límites y condiciones del plan gratuito, y precio si lo hubiera. Esta guía no cita precios ni límites porque cambian.
3. No contratar servicios de pago ni dominios sin autorización del propietario.

## Tipos de alojamiento
- **Alojamiento estático** (servicios de publicación de sitios estáticos): adecuado para este proyecto.
- **Hosting compartido** (panel tipo cPanel): sirve igualmente; solo hace falta si más adelante se quiere PHP o MySQL.
- **Repositorio con publicación integrada**: opción válida si el propietario ya usa uno.

## Pasos
1. Ejecutar `node auditar.js <proyecto>` (módulo de auditoría) y resolver los críticos.
2. Ejecutar `node preparar.js <proyecto> --url <dirección-pública>` (la dirección solo cuando ya exista).
3. Revisar `salida/informe-preparacion.md`; con críticos no se publica.
4. Subir **el contenido** de `salida/publicar/TECNO-GUIA/` a la carpeta pública del hosting, de modo que `index.html` quede en la raíz de esa carpeta.
5. Activar HTTPS si el proveedor lo ofrece; si no, documentar la limitación.
6. Abrir la dirección pública y completar `lista-verificacion-publicada.md`.

## Qué debe hacer el propietario (lo que no puede hacerse desde aquí)
- Elegir el proveedor y crear o abrir su cuenta.
- Subir los archivos con el método del proveedor (administrador de archivos, FTP/SFTP, repositorio o panel).
- Mantener las credenciales fuera del código y de cualquier archivo del sitio.
- Facilitar la dirección pública real para el sitemap y el informe final.

## Recuperación
Conservar la carpeta `salida/respaldo/` y la versión publicada anterior. Si una actualización rompe el sitio, volver a subir la versión anterior y comprobar de nuevo. No borrar versiones funcionales hasta verificar la nueva.
