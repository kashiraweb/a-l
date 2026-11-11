# Módulo de publicación — TECNO GUÍA (Fase 17)

Módulo independiente. No modifica el proyecto original: trabaja sobre copias.

## Contenido
- `preparar.js` — copia de seguridad, versión de publicación e informe (Node.js, sin dependencias).
- `GUIA-HOSTING.md` — criterios de elección, pasos y qué debe hacer el propietario.
- `lista-verificacion-publicada.md` — verificación desde Internet y plantilla del informe final.

## Uso
    node preparar.js <carpeta-del-proyecto> [--url https://dirección-real] [--salida carpeta]

Genera en `salida/`:
- `respaldo/TECNO-GUIA-respaldo-AAAAMMDD/` copia completa.
- `publicar/TECNO-GUIA/` solo lo necesario para el sitio, sin minificar.
- `informe-preparacion.md`.

## Qué hace
- Bloquea si falta alguna de las siete páginas (estado PUBLICACIÓN BLOQUEADA).
- Excluye copias, pruebas, temporales, `.env`, documentación interna y archivos comprimidos.
- Detecta localhost, IP privadas, rutas `C:/Users`, posibles credenciales, recursos por HTTP, rutas absolutas a la raíz y diferencias de mayúsculas/minúsculas en rutas (fallan en Linux).
- Compara títulos y metadatos con los de la Fase 17, sin modificarlos.
- Con `--url`, genera `sitemap.xml` y `robots.txt`; sin ella, no inventa direcciones.

## Qué NO hace
Publicar, contratar, elegir proveedor por el propietario, activar HTTPS ni probar desde Internet. Estado máximo posible aquí: PREPARADO, PERO NO PUBLICADO.
