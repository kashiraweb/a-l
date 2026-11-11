# Módulo de mantenimiento — TECNO GUÍA (Fase 18)

Módulo independiente. No modifica el proyecto; los respaldos y comparaciones solo leen.

## Contenido
- `herramientas.js` — Node.js 18+, sin dependencias.
- `exportar-preguntas.js` — convierte `js/evaluacion/preguntas.js` del proyecto a JSON para validarlo (`node exportar-preguntas.js <preguntas.js> [salida.json]`).
- `PROCEDIMIENTO.md` — auditoría, supervisión, corrección, actualización, hosting, seguridad.
- `lista-supervision.md` — revisión periódica con tablas para completar.
- `MANTENIMIENTO.md` — registro de tareas, versiones y respaldos (vacío).
- `MEJORAS-FUTURAS.md` — propuestas pendientes de decisión.
- `ejemplos/preguntas-ejemplo.json` — estructura esperada para validar evaluaciones.

## Uso
    node herramientas.js respaldar <proyecto> --version X.Y.Z [--salida carpeta]
    node herramientas.js comparar <carpeta-local> <copia-publicada | respaldo | manifest.json>
    node herramientas.js sitio <dirección-pública-real> [--salida informe.md]
    node herramientas.js evaluaciones <preguntas.json>

- `respaldar`: copia el proyecto y guarda `manifest.json` con SHA-256. La versión la decide el propietario; nunca sobrescribe un respaldo.
- `comparar`: lista archivos solo en uno de los lados y archivos con contenido distinto.
- `sitio`: comprueba HTTP, HTTPS, título, contenido mixto y sitemap/robots de las siete páginas. Requiere conexión a Internet en el equipo del propietario.
- `evaluaciones`: valida la estructura de las preguntas (no su veracidad).

## No hace
Corregir archivos, subir al hosting, consultar el panel del proveedor (espacio, transferencia, dominio), probar interacciones ni responsive.

## Dónde colocarlo
Guardar esta carpeta **fuera** de `TECNO-GUIA/` y no subirla al hosting: contiene procedimientos y una herramienta de uso interno. Las rutas de `herramientas.js` (`pages/...`) suponen la estructura actual del proyecto.
