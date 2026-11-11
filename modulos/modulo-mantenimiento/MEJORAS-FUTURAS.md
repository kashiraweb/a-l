# Mejoras futuras propuestas — TECNO GUÍA

Son propuestas, no tareas en curso. No se implementa ninguna sin decisión del propietario. Se redactaron sin acceso al código real: los campos «Páginas» y «Archivos» son estimaciones que deben confirmarse al revisar el proyecto.

## 1. Más preguntas de evaluación por tema
1. **Necesidad:** ampliar la cobertura de los temas con menos preguntas.
2. **Beneficio educativo:** refuerzo y práctica más variada.
3. **Páginas:** Evaluación.
4. **Archivos:** datos de preguntas de la evaluación (por confirmar). Ubicación en el proyecto actual: `js/evaluacion/preguntas.js` (exportable con `exportar-preguntas.js`).
5. **Complejidad:** baja a media (redactar y revisar el contenido).
6. **Riesgos:** respuestas incorrectas o duplicadas; se mitigan con `herramientas.js evaluaciones` y revisión humana.

## 2. Revisión de accesibilidad con herramientas reales
1. **Necesidad:** confirmar contraste, foco, teclado y nombres accesibles.
2. **Beneficio educativo:** más estudiantes pueden usar la plataforma.
3. **Páginas:** las siete.
4. **Archivos:** CSS y HTML de las páginas con hallazgos.
5. **Complejidad:** baja a media.
6. **Riesgos:** cambios visuales no deseados; corregir solo hallazgos reales.

## 3. Navegación compartida entre páginas
1. **Necesidad:** evitar menús y footers desalineados al actualizar.
2. **Beneficio educativo:** orientación coherente.
3. **Páginas:** las siete.
4. **Archivos:** script de integración (módulo de la fase 15) y HTML de cada página.
5. **Complejidad:** media.
6. **Riesgos:** romper el marcado de la página actual; probar cada página.

## 4. Ampliación de contenidos (hardware, sistemas operativos, glosarios)
1. **Necesidad:** mantener los contenidos al día y completar temas.
2. **Beneficio educativo:** contenido vigente y más completo para principiantes.
3. **Páginas:** Aprende, Herramientas, Mantenimiento.
4. **Archivos:** HTML y, si aplica, CSS y JS de esas páginas. En el proyecto actual el contenido de Aprende está en `js/aprende/data.js` y el de Mantenimiento en `js/mantenimiento/datos-*.js`; las páginas Herramientas y Acerca de aún no existen en el proyecto.
5. **Complejidad:** media.
6. **Riesgos:** información técnica imprecisa; validar con fuentes antes de publicar.
