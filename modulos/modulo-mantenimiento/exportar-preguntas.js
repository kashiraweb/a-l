'use strict';
// Exporta las preguntas de la página de Evaluación (js/evaluacion/preguntas.js) a JSON para validarlas con herramientas.js.
// Uso: node exportar-preguntas.js <ruta/preguntas.js> [salida.json]
const fs = require('fs');
const path = require('path');
const src = process.argv[2];
if (!src || !fs.existsSync(src)) { console.error('Uso: node exportar-preguntas.js <ruta/preguntas.js> [salida.json]'); process.exit(1); }
global.window = {};
require(path.resolve(src));
const ev = global.window.TG_EVALUACIONES;
if (!ev) { console.error('No se encontró window.TG_EVALUACIONES en el archivo.'); process.exit(1); }
const out = path.resolve(process.argv[3] || 'preguntas-exportadas.json');
fs.writeFileSync(out, JSON.stringify(ev, null, 2) + '\n');
console.log('Exportado: ' + out + ' (' + Object.keys(ev).length + ' evaluaciones)');
