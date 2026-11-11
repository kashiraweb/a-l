'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const argv = process.argv.slice(2);
const cmd = argv[0];
const rest = argv.slice(1);
const flag = function (name) { const i = rest.indexOf(name); return i > -1 ? rest[i + 1] : null; };
const positional = rest.filter(function (a, i) { return a.charAt(0) !== '-' && (i === 0 || rest[i - 1].charAt(0) !== '-'); });
const EXCLUDE = /^(node_modules|\.git|salida|respaldos)$/i;
const PAGES = [
  ['Inicio', ''],
  ['Aprende', 'pages/aprende.html'],
  ['Mantenimiento', 'pages/mantenimiento.html'],
  ['Problemas y soluciones', 'pages/problemas.html'],
  ['Herramientas', 'pages/herramientas.html'],
  ['Evaluación', 'pages/evaluacion.html'],
  ['Acerca de', 'pages/acerca-de.html']
];

function fail(msg) { console.error(msg); process.exit(1); }
function hashFile(f) { return crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'); }
function posix(p) { return p.split(path.sep).join('/'); }

function hashTree(dir) {
  const out = {};
  (function walk(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach(function (e) {
      if (EXCLUDE.test(e.name)) return;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p); else out[posix(path.relative(dir, p))] = hashFile(p);
    });
  })(dir);
  return out;
}

function copyTree(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  fs.readdirSync(src, { withFileTypes: true }).forEach(function (e) {
    if (EXCLUDE.test(e.name)) return;
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) copyTree(s, d); else fs.copyFileSync(s, d);
  });
}

function respaldar() {
  const project = path.resolve(positional[0] || '');
  const version = flag('--version');
  if (!positional[0] || !fs.existsSync(project)) fail('Uso: node herramientas.js respaldar <proyecto> --version X.Y.Z [--salida carpeta]');
  if (!version || !/^\d+\.\d+\.\d+$/.test(version)) fail('Indica la versión que decida el propietario con --version (formato X.Y.Z). No se asigna automáticamente.');
  const out = path.resolve(flag('--salida') || path.join(__dirname, 'respaldos'));
  const stamp = new Date().toISOString().slice(0, 10);
  const dest = path.join(out, 'v' + version + '_' + stamp);
  if (fs.existsSync(dest)) fail('Ya existe ' + dest + '. Los respaldos no se sobrescriben.');
  const files = hashTree(project);
  copyTree(project, path.join(dest, 'TECNO-GUIA'));
  fs.writeFileSync(path.join(dest, 'manifest.json'), JSON.stringify({ version: version, fecha: stamp, archivos: files }, null, 2));
  console.log('Respaldo creado: ' + dest);
  console.log('Archivos: ' + Object.keys(files).length + ' · manifiesto: manifest.json (SHA-256)');
}

function comparar() {
  const a = path.resolve(positional[0] || '');
  const b = path.resolve(positional[1] || '');
  if (!positional[0] || !positional[1] || !fs.existsSync(a) || !fs.existsSync(b)) fail('Uso: node herramientas.js comparar <carpeta-local> <carpeta-publicada-o-respaldo | manifest.json>');
  const ha = hashTree(a);
  const hb = /\.json$/i.test(b) ? JSON.parse(fs.readFileSync(b, 'utf8')).archivos : hashTree(b);
  const onlyA = Object.keys(ha).filter(function (k) { return !(k in hb); });
  const onlyB = Object.keys(hb).filter(function (k) { return !(k in ha); });
  const diff = Object.keys(ha).filter(function (k) { return k in hb && ha[k] !== hb[k]; });
  const same = Object.keys(ha).length - onlyA.length - diff.length;
  console.log('Idénticos: ' + same);
  console.log('Solo en la primera (' + onlyA.length + '):'); onlyA.forEach(function (k) { console.log('  + ' + k); });
  console.log('Solo en la segunda (' + onlyB.length + '):'); onlyB.forEach(function (k) { console.log('  - ' + k); });
  console.log('Con contenido distinto (' + diff.length + '):'); diff.forEach(function (k) { console.log('  ~ ' + k); });
  process.exit(onlyA.length || onlyB.length || diff.length ? 3 : 0);
}

async function sitio() {
  const base = (positional[0] || '').replace(/\/+$/, '');
  if (!/^https?:\/\/[^\s/]+/i.test(base)) fail('Uso: node herramientas.js sitio <dirección-pública-real> [--salida archivo.md]');
  if (typeof fetch !== 'function') fail('Se necesita Node.js 18 o superior (fetch).');
  const rows = [];
  const problems = [];
  for (let i = 0; i < PAGES.length; i++) {
    const url = base + '/' + PAGES[i][1];
    const t0 = Date.now();
    const row = { page: PAGES[i][0], url: url, status: '-', ms: '-', bytes: '-', title: '-', https: /^https:/i.test(url) };
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(function () { ctrl.abort(); }, 15000);
      const res = await fetch(url, { signal: ctrl.signal, redirect: 'follow' });
      const body = await res.text();
      clearTimeout(timer);
      row.status = res.status; row.ms = Date.now() - t0; row.bytes = Buffer.byteLength(body);
      row.title = ((body.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '(sin título)').trim();
      row.https = /^https:/i.test(res.url);
      if (res.status !== 200) problems.push(row.page + ': respuesta HTTP ' + res.status);
      if (!row.https) problems.push(row.page + ': no se sirve por HTTPS');
      const mixed = body.match(/<(?:link|script|img|source|iframe)\b[^>]*?\s(?:src|href)\s*=\s*["']http:\/\/[^"']+/gi);
      if (mixed) problems.push(row.page + ': ' + mixed.length + ' recurso(s) por HTTP (contenido mixto)');
    } catch (e) {
      row.status = 'ERROR'; problems.push(row.page + ': no responde (' + (e.name === 'AbortError' ? 'tiempo agotado' : e.message) + ')');
    }
    rows.push(row);
  }
  const extra = [];
  for (const name of ['sitemap.xml', 'robots.txt']) {
    try { const r = await fetch(base + '/' + name); extra.push(name + ': HTTP ' + r.status); } catch (e) { extra.push(name + ': no responde'); }
  }
  const now = new Date().toISOString();
  const md = ['# Supervisión del sitio publicado — TECNO GUÍA (Fase 18)', '', 'Dirección: ' + base, 'Fecha y hora de la comprobación (UTC): ' + now, '',
    '| Página | HTTP | HTTPS | ms | Bytes | Título |', '|---|---|---|---|---|---|'];
  rows.forEach(function (r) { md.push('| ' + r.page + ' | ' + r.status + ' | ' + (r.https ? 'sí' : 'NO') + ' | ' + r.ms + ' | ' + r.bytes + ' | ' + r.title + ' |'); });
  md.push('', '## Problemas detectados', '');
  md.push(problems.length ? problems.map(function (p) { return '- ' + p; }).join('\n') : 'Ninguno con estas comprobaciones.');
  md.push('', '## Otros archivos', '');
  extra.forEach(function (e) { md.push('- ' + e); });
  md.push('', '## No comprobado por esta herramienta', '', 'Interacciones, evaluaciones, responsive, consola del navegador, espacio y transferencia del hosting, renovación de dominio y vigencia del certificado: revisar con `lista-supervision.md`.');
  const outFile = path.resolve(flag('--salida') || path.join(__dirname, 'salida', 'supervision-' + now.slice(0, 10) + '.md'));
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, md.join('\n') + '\n');
  rows.forEach(function (r) { console.log(r.page + ': ' + r.status + (r.https ? ' https' : ' SIN-HTTPS') + ' ' + r.ms + 'ms'); });
  console.log(problems.length ? 'Problemas: ' + problems.length : 'Sin problemas detectados con estas comprobaciones.');
  console.log('Informe: ' + outFile);
  process.exit(problems.length ? 2 : 0);
}

function evaluaciones() {
  const file = path.resolve(positional[0] || '');
  if (!positional[0] || !fs.existsSync(file)) fail('Uso: node herramientas.js evaluaciones <preguntas.json>');
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { fail('JSON no válido: ' + e.message); }
  let sets = [];
  if (Array.isArray(data)) sets = [{ name: path.basename(file), q: data }];
  else Object.keys(data).forEach(function (k) { if (Array.isArray(data[k])) sets.push({ name: k, q: data[k] }); else if (data[k] && Array.isArray(data[k].preguntas)) sets.push({ name: k, q: data[k].preguntas }); });
  if (!sets.length) fail('No se encontraron listas de preguntas (se espera un arreglo o un objeto con arreglos / {preguntas: [...]}).');
  const pick = function (o, names) { for (let i = 0; i < names.length; i++) if (o[names[i]] !== undefined) return o[names[i]]; return undefined; };
  const problems = [];
  const allIds = {};
  let total = 0;
  sets.forEach(function (s) {
    const texts = {};
    s.q.forEach(function (q, idx) {
      total++;
      const where = s.name + ' #' + (idx + 1);
      const id = pick(q, ['id', 'identificador']);
      const text = pick(q, ['enunciado', 'pregunta', 'question', 'texto']);
      const opts = pick(q, ['alternativas', 'opciones', 'options', 'respuestas']);
      const correct = pick(q, ['correcta', 'respuestaCorrecta', 'indiceCorrecto', 'correctIndex', 'answer']);
      const expl = pick(q, ['explicacion', 'explicación', 'explanation']);
      const cat = pick(q, ['categoria', 'categoría', 'category']);
      const tema = pick(q, ['tema', 'temaRelacionado', 'topic']);
      if (id === undefined || id === '') problems.push(where + ': falta identificador.');
      else { if (allIds[id]) problems.push(where + ': identificador repetido «' + id + '» (también en ' + allIds[id] + ').'); allIds[id] = where; }
      if (!text || !String(text).trim()) problems.push(where + ': falta el enunciado.');
      else { const k = String(text).trim().toLowerCase(); if (texts[k]) problems.push(where + ': enunciado duplicado dentro del mismo grupo.'); texts[k] = true; }
      if (!Array.isArray(opts) || opts.length !== 4) problems.push(where + ': se esperaban 4 alternativas' + (Array.isArray(opts) ? ' (hay ' + opts.length + ').' : '.'));
      else {
        if (opts.some(function (o) { return !String(o).trim(); })) problems.push(where + ': hay alternativas vacías.');
        if (new Set(opts.map(function (o) { return String(o).trim().toLowerCase(); })).size < 4) problems.push(where + ': alternativas repetidas.');
      }
      if (!Number.isInteger(correct) || correct < 0 || correct > 3) problems.push(where + ': el índice de respuesta correcta debe ser un entero de 0 a 3 (valor: ' + JSON.stringify(correct) + ').');
      if (!expl || !String(expl).trim()) problems.push(where + ': falta la explicación educativa.');
      if (!cat) problems.push(where + ': falta la categoría.');
      if (!tema) problems.push(where + ': falta el tema relacionado.');
    });
  });
  console.log('Grupos: ' + sets.length + ' · Preguntas revisadas: ' + total);
  sets.forEach(function (s) { console.log(' - ' + s.name + ': ' + s.q.length); });
  if (problems.length) { console.log('Problemas (' + problems.length + '):'); problems.forEach(function (p) { console.log('  ! ' + p); }); process.exit(2); }
  console.log('Estructura correcta. La validación NO comprueba que la respuesta correcta sea verdadera: eso requiere revisión humana del contenido.');
}

const commands = { respaldar: respaldar, comparar: comparar, sitio: sitio, evaluaciones: evaluaciones };
if (!commands[cmd]) {
  console.log('Uso: node herramientas.js <respaldar|comparar|sitio|evaluaciones> ...');
  process.exit(cmd ? 1 : 0);
}
Promise.resolve(commands[cmd]()).catch(function (e) { fail(e.message); });
