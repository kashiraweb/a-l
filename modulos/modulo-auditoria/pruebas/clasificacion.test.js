'use strict';
const assert = require('assert');

function porcentaje(correctas, total) { return (correctas / total) * 100; }

function clasificar(p) {
  if (p >= 90) return 'Excelente';
  if (p >= 80) return 'Muy bien';
  if (p >= 70) return 'Bien';
  if (p >= 60) return 'En proceso';
  return 'Necesitas reforzar';
}

const casos = [
  [100, 'Excelente'], [90, 'Excelente'],
  [89, 'Muy bien'], [80, 'Muy bien'],
  [79, 'Bien'], [70, 'Bien'],
  [69, 'En proceso'], [60, 'En proceso'],
  [59, 'Necesitas reforzar'], [0, 'Necesitas reforzar']
];
casos.forEach(function (c) { assert.strictEqual(clasificar(c[0]), c[1], c[0] + ' debería ser ' + c[1]); });

assert.strictEqual(porcentaje(10, 10), 100);
assert.strictEqual(porcentaje(0, 10), 0);
assert.strictEqual(porcentaje(7, 10), 70);

const redondeo = [];
[5, 8, 10, 12, 15, 20].forEach(function (total) {
  for (let ok = 0; ok <= total; ok++) {
    const exacto = porcentaje(ok, total);
    const redondeado = Math.round(exacto);
    if (clasificar(exacto) !== clasificar(redondeado)) redondeo.push(ok + '/' + total + ' = ' + exacto.toFixed(2) + '% → exacto: ' + clasificar(exacto) + ', redondeado: ' + clasificar(redondeado));
  }
});

console.log('Fórmula y rangos de referencia: OK (' + casos.length + ' casos de frontera).');
if (redondeo.length) {
  console.log('Atención: si la página redondea antes de clasificar, estos casos cambian de categoría:');
  redondeo.forEach(function (r) { console.log(' - ' + r); });
} else {
  console.log('Redondear antes de clasificar no cambia ninguna categoría en los totales probados.');
}
