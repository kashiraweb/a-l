# Lista de pruebas manuales — TECNO GUÍA (Fase 16)

Marcar solo lo que se haya ejecutado realmente. Resultado: OK / Falla / No probado.

## 1. Consola y carga (por página)

| Página | Abre sin errores en consola | CSS y JS cargan (Network) | Resultado | Observaciones |
|---|---|---|---|---|
| Inicio | | | | |
| Aprende | | | | |
| Mantenimiento | | | | |
| Problemas y soluciones | | | | |
| Herramientas | | | | |
| Evaluación | | | | |
| Acerca de | | | | |

## 2. Navegación global

| Prueba | Resultado | Observaciones |
|---|---|---|
| Recorrer las siete páginas desde el encabezado | | |
| Recorrer las siete páginas desde el footer | | |
| Volver a Inicio desde cada página | | |
| La página actual aparece marcada en el menú | | |
| Menú móvil abre y cierra (botón, Escape, clic fuera) | | |

## 3. Responsive

Marcar en cada tamaño: sin desbordamiento horizontal, sin superposiciones, menú funcional.

| Tamaño | Inicio | Aprende | Mantenimiento | Problemas | Herramientas | Evaluación | Acerca de |
|---|---|---|---|---|---|---|---|
| 1920 × 1080 | | | | | | | |
| 1366 × 768 | | | | | | | |
| 768 × 1024 | | | | | | | |
| 390 × 844 | | | | | | | |
| 360 × 800 | | | | | | | |

## 4. Evaluaciones (repetir en las siete)

| Escenario | Resultado esperado | Resultado obtenido |
|---|---|---|
| Todas correctas | 100 % · Excelente | |
| Todas incorrectas | 0 % · Necesitas reforzar | |
| Mezcla de correctas e incorrectas | Porcentaje = correctas / total × 100 y categoría según rango | |
| Preguntas sin responder | Aviso antes de finalizar | |
| Cambiar respuesta antes de finalizar | Cuenta la última respuesta | |
| Abandonar a mitad | Sin errores; estado coherente al volver | |
| Reiniciar intento | Intento limpio | |
| Explicaciones | Corresponden a cada pregunta | |
| Historial local (si existe) | Se guarda y se lee sin errores | |

Los rangos de referencia están verificados por `node pruebas/clasificacion.test.js`; esta tabla comprueba que la página los aplique igual.

## 5. Accesibilidad

| Prueba | Resultado | Observaciones |
|---|---|---|
| Navegación completa solo con teclado | | |
| Foco visible en enlaces, botones y tarjetas | | |
| Orden de tabulación lógico | | |
| Contraste suficiente (texto y fondo) | | |
| Movimiento reducido respetado | | |
| Menús e interacciones con nombre accesible | | |

## 6. Compatibilidad

| Navegador | Presentación | Menús y botones | JavaScript | localStorage | Observaciones |
|---|---|---|---|---|---|
| Chrome | | | | | |
| Edge | | | | | |
| Firefox | | | | | |

## 7. Herramientas de diagnóstico

| Herramienta | Resultado real (copiar la puntuación o el aviso) |
|---|---|
| Lighthouse | |
| Validador HTML | |
| Panel Network | |

## 8. Contenido educativo

| Comprobación | Resultado |
|---|---|
| Las siete páginas conservan todos sus contenidos | |
| Advertencias de seguridad de Mantenimiento visibles | |
| Glosarios completos | |
| Ninguna pregunta ni respuesta correcta modificada | |
