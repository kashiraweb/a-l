# Módulo de auditoría — TECNO GUÍA (Fase 16)

Módulo independiente. No modifica el proyecto: solo lee y genera un informe.

## Contenido
- `auditar.js` — auditoría estática (Node.js, sin dependencias).
- `pruebas/clasificacion.test.js` — verifica la fórmula del porcentaje y los rangos de clasificación.
- `lista-pruebas-manuales.md` — tablas para las pruebas que requieren navegador.

## Uso
    node auditar.js <carpeta-del-proyecto> [carpeta-de-salida]
    node pruebas/clasificacion.test.js

Genera `salida/informe-auditoria.md` y `salida/informe-auditoria.json`. Código de salida 2 si hay errores críticos.

## Qué comprueba
- Existencia de las siete páginas de referencia y enlaces entre ellas.
- Rutas de CSS, JS, imágenes y enlaces; anclas internas.
- HTML: doctype, lang, title, viewport, charset, etiquetas sin cerrar, ids duplicados, alt, enlaces y botones sin nombre, jerarquía de encabezados, rutas locales privadas.
- CSS: llaves balanceadas, url() inexistentes.
- JS: errores de sintaxis, eval, document.write, claves de localStorage compartidas, ids que busca el script.
- Archivos sin ninguna referencia (solo se avisa; no se elimina nada).

## Qué NO comprueba
Consola del navegador, responsive, compatibilidad, Lighthouse, contraste, teclado y evaluaciones en vivo. Se registran a mano en `lista-pruebas-manuales.md`. El informe lo indica expresamente.
