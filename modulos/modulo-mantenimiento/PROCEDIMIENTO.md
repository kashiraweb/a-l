# Procedimiento de mantenimiento — TECNO GUÍA (Fase 18)

Principio: no cambiar lo que ya funciona. Cada modificación resuelve un problema real, no rompe otras funciones y conserva el diseño.

## 1. Auditoría del estado actual (antes de tocar nada)
1. Obtener una copia de lo publicado (descargarla del hosting) y compararla con la versión local:
   `node herramientas.js comparar <carpeta-local> <copia-publicada>`
   Documentar las diferencias; no presuponer que coinciden.
2. Ejecutar la auditoría estática del módulo de la fase 16 (`auditar.js`) sobre la carpeta local.
3. Comprobar el sitio público: `node herramientas.js sitio <dirección-real>`.
4. Completar `lista-supervision.md` con lo realmente probado.
5. Registrar los hallazgos en `MANTENIMIENTO.md`. No se corrige nada hasta tener el inventario.

## 2. Supervisión periódica
La frecuencia la decide el propietario. Como referencia razonable: comprobación rápida del sitio tras cada actualización y una revisión completa de `lista-supervision.md` de forma periódica. Cada revisión se registra con su fecha real.

## 3. Corrección de errores
1. Clasificar: Crítico (página no carga, navegación rota, pérdida de información, función fundamental caída), Alto (evaluaciones, contenidos o recursos esenciales, móvil grave), Medio (interacciones secundarias, enlaces, resoluciones concretas), Bajo (detalles visuales, erratas, espaciados).
2. Identificar el origen antes de editar.
3. Corregir primero críticos y altos.
4. Volver a probar la página afectada y las relacionadas. Un error no se declara corregido sin comprobarlo.

## 4. Actualización controlada
1. Respaldo previo con versión decidida por el propietario:
   `node herramientas.js respaldar <proyecto> --version X.Y.Z`
2. Listar los archivos que se modificarán.
3. Aplicar los cambios en la copia de trabajo.
4. Probar (auditoría estática + lista de supervisión).
5. Subir al hosting solo cuando las pruebas pasen; conservar la versión publicada anterior hasta verificar la nueva.
6. Registrar versión anterior, versión nueva, archivos modificados, motivo, pruebas y resultado en `MANTENIMIENTO.md`.
7. Para restaurar: volver a subir la carpeta `TECNO-GUIA` del respaldo y verificar con `comparar` contra su `manifest.json`.

Versionado sugerido (los números los asigna el propietario): correcciones menores incrementan el último número, actualización de contenidos el central, cambios importantes el primero. Si se usa Git, etiquetar cada versión.

## 5. Contenidos educativos
Revisar periódicamente definiciones, ejemplos, procedimientos y herramientas. Si algo parece desactualizado o incorrecto, redactar una propuesta de corrección con su justificación y esperar la decisión del propietario. No inventar especificaciones técnicas; explicar los conceptos nuevos para principiantes.

## 6. Evaluaciones
- Exportar las preguntas a JSON y ejecutar `node herramientas.js evaluaciones <archivo.json>`: valida identificador, enunciado, cuatro alternativas, índice correcto (0–3), explicación, categoría, tema, y detecta duplicados.
- La herramienta valida la estructura, no la veracidad: verificar a mano que cada respuesta correcta coincida con el contenido educativo.
- Comprobar el cálculo con el módulo de la fase 16 (`pruebas/clasificacion.test.js`) y haciendo evaluaciones de prueba.
- Preguntas nuevas: seguir la estructura existente. No cambiar respuestas correctas ni eliminar preguntas sin revisar dependencias.

## 7. Hosting
Revisar periódicamente, con los datos reales del panel del proveedor: disponibilidad, espacio usado, transferencia, vigencia del certificado HTTPS, renovación del dominio (si existe), errores y condiciones del plan. No inventar métricas. No contratar ni pagar nada sin autorización; si el proveedor cambia condiciones, documentar el problema y sus consecuencias.

## 8. Seguridad y privacidad
- Sin contraseñas, claves ni archivos privados en el sitio; sin scripts desconocidos; enlaces externos confiables; HTTPS activo.
- `localStorage`: los resultados quedan en el navegador de cada usuario, no se sincronizan, se pierden si se borran los datos del navegador y pueden no estar disponibles si el almacenamiento está deshabilitado.
- No recopilar datos personales innecesarios ni añadir seguimiento o servicios externos sin necesidad justificada y autorización.

## 9. Compatibilidad
Revisar las cinco resoluciones de referencia (1920×1080, 1366×768, 768×1024, 390×844, 360×800), incluyendo Android y pantallas pequeñas. Solo se modifica el diseño si hay un problema real.
