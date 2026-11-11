'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(process.argv[2] || '.');
const outDir = path.resolve(process.argv[3] || path.join(__dirname, 'salida'));
const IGNORE = new Set(['node_modules', '.git', 'salida']);
const EXPECTED = [
  ['Inicio', 'index.html'],
  ['Aprende', 'pages/aprende.html'],
  ['Mantenimiento', 'pages/mantenimiento.html'],
  ['Problemas y soluciones', 'pages/problemas.html'],
  ['Herramientas', 'pages/herramientas.html'],
  ['Evaluación', 'pages/evaluacion.html'],
  ['Acerca de', 'pages/acerca-de.html']
];
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'use', 'stop']);
const OPTIONAL_CLOSE = new Set(['p', 'li', 'dt', 'dd', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'option', 'colgroup']);
const SEV = ['Crítico', 'Alto', 'Medio', 'Bajo'];
const findings = [];

function add(sev, file, msg) { findings.push({ sev, file: rel(file), msg }); }
function rel(f) { return path.relative(root, f).split(path.sep).join('/'); }

function walk(dir, acc) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
    if (IGNORE.has(e.name)) return;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc); else acc.push(p);
  });
  return acc;
}

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error('Ruta de proyecto no válida: ' + root);
  process.exit(1);
}

const files = walk(root, []);
const ext = function (f) { return path.extname(f).toLowerCase(); };
const htmls = files.filter(function (f) { return ext(f) === '.html'; });
const csss = files.filter(function (f) { return ext(f) === '.css'; });
const jss = files.filter(function (f) { return ext(f) === '.js'; });
const assets = files.filter(function (f) { return ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.mp3', '.mp4'].indexOf(ext(f)) > -1; });
const read = function (f) { return fs.readFileSync(f, 'utf8'); };
const referenced = new Set();
const idsByFile = {};
const targetsByPage = {};

function isExternal(u) { return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(u); }

function parseAttrs(s) {
  const attrs = {};
  const re = /([^\s=\/"'<>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m;
  while ((m = re.exec(s))) attrs[m[1].toLowerCase()] = m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4] !== undefined ? m[4] : '';
  return attrs;
}

function blank(src, tag) {
  return src.replace(new RegExp('(<' + tag + '\\b[^>]*>)([\\s\\S]*?)(</' + tag + '>)', 'gi'), function (_, a, b, c) { return a + b.replace(/[^\n]/g, ' ') + c; });
}

function resolveLocal(from, ref) {
  const clean = decodeURIComponent(ref.split('#')[0].split('?')[0]);
  if (!clean) return from;
  let target = path.resolve(path.dirname(from), clean);
  if (/[\\/]$/.test(ref.split('#')[0].split('?')[0])) target = path.join(target, 'index.html');
  return target;
}

function collectIds(f) {
  if (idsByFile[f]) return idsByFile[f];
  const set = new Set();
  const src = blank(blank(read(f), 'script'), 'style');
  const re = /<[a-zA-Z][^>]*?\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(src))) set.add(m[1] || m[2]);
  idsByFile[f] = set;
  return set;
}

function auditHtml(f) {
  const raw = read(f);
  const src = blank(blank(raw.replace(/<!--[\s\S]*?-->/g, function (c) { return c.replace(/[^\n]/g, ' '); }), 'script'), 'style');
  if (!/^\s*<!doctype html>/i.test(raw)) add('Medio', f, 'Falta la declaración <!DOCTYPE html>.');
  if (!/<html[^>]*\slang\s*=/i.test(src)) add('Medio', f, 'La etiqueta <html> no tiene atributo lang.');
  if (!/<title>\s*\S/i.test(src)) add('Medio', f, 'Falta <title> o está vacío.');
  if (!/<meta[^>]*name\s*=\s*["']viewport["']/i.test(src)) add('Alto', f, 'Falta <meta name="viewport"> (afecta al responsive).');
  if (!/<meta[^>]*charset/i.test(src)) add('Medio', f, 'Falta <meta charset>.');
  if (/[A-Za-z]:[\\/]Users[\\/]|file:\/\//i.test(raw)) add('Alto', f, 'Contiene una ruta local privada (C:/Users/… o file://).');

  const stack = [];
  const ids = {};
  const headings = [];
  const re = /<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g;
  let m;
  while ((m = re.exec(src))) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrs = closing ? {} : parseAttrs(m[3]);
    if (!closing) {
      if (attrs.id) ids[attrs.id] = (ids[attrs.id] || 0) + 1;
      if (/^h[1-6]$/.test(tag)) headings.push(Number(tag[1]));
      if (!VOID.has(tag) && !/\/\s*$/.test(m[3])) stack.push(tag);
      if (tag === 'img') {
        if (attrs.alt === undefined) add('Medio', f, 'Imagen sin atributo alt: ' + (attrs.src || '(sin src)'));
        if (attrs.src && !isExternal(attrs.src) && !/^data:/i.test(attrs.src)) checkRef(f, attrs.src, 'Medio', 'imagen');
      }
      if (tag === 'link' && attrs.href && /stylesheet|icon|preload/i.test(attrs.rel || '') && !isExternal(attrs.href)) checkRef(f, attrs.href, 'Crítico', 'hoja de estilos o recurso');
      if (tag === 'script' && attrs.src) {
        if (!isExternal(attrs.src)) checkRef(f, attrs.src, 'Crítico', 'script');
        else add('Medio', f, 'Script externo a revisar: ' + attrs.src);
      }
    } else {
      let idx = stack.lastIndexOf(tag);
      if (idx === -1) { if (!VOID.has(tag)) add('Medio', f, 'Etiqueta de cierre </' + tag + '> sin apertura.'); continue; }
      while (stack.length - 1 > idx) {
        const open = stack.pop();
        if (!OPTIONAL_CLOSE.has(open)) add('Medio', f, 'Etiqueta <' + open + '> sin cerrar o mal anidada.');
      }
      stack.pop();
    }
  }
  stack.forEach(function (t) { if (!OPTIONAL_CLOSE.has(t) && t !== 'html' && t !== 'body') add('Medio', f, 'Etiqueta <' + t + '> sin cerrar.'); });
  Object.keys(ids).forEach(function (id) { if (ids[id] > 1) add('Medio', f, 'Identificador duplicado: #' + id + ' (' + ids[id] + ' veces).'); });
  const h1 = headings.filter(function (h) { return h === 1; }).length;
  if (h1 !== 1) add('Bajo', f, 'Se esperaba un único <h1>; hay ' + h1 + '.');
  for (let i = 1; i < headings.length; i++) if (headings[i] - headings[i - 1] > 1) { add('Bajo', f, 'Salto de encabezados h' + headings[i - 1] + ' → h' + headings[i] + '.'); break; }

  const targets = new Set();
  targetsByPage[f] = targets;
  const aRe = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  while ((m = aRe.exec(src))) {
    const attrs = parseAttrs(m[1]);
    const text = m[2].replace(/<[^>]*>/g, '').trim();
    const named = text || attrs['aria-label'] || /<img[^>]*\salt\s*=\s*["'][^"']+/i.test(m[2]) || /<svg[^>]*aria-label/i.test(m[2]);
    const href = attrs.href;
    if (href === undefined || href === '' || href === '#') {
      if (attrs['data-route'] === undefined && attrs['data-page'] === undefined) add('Medio', f, 'Enlace vacío o sin destino: «' + (text || '(sin texto)') + '».');
    } else if (!isExternal(href)) {
      if (href.charAt(0) === '#') {
        if (href.length > 1 && !collectIds(f).has(href.slice(1))) add('Alto', f, 'Ancla interna inexistente: ' + href);
      } else {
        const t = checkRef(f, href, 'Alto', 'página');
        if (t) targets.add(t);
      }
    } else if (/^https?:/i.test(href) || href.indexOf('//') === 0) {
      if (/_blank/i.test(attrs.target || '') && !/noopener/i.test(attrs.rel || '')) add('Bajo', f, 'Enlace externo con target="_blank" sin rel="noopener": ' + href);
    }
    if (!named && href) add('Medio', f, 'Enlace sin nombre accesible: ' + href);
  }
  const bRe = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
  while ((m = bRe.exec(src))) {
    const attrs = parseAttrs(m[1]);
    const text = m[2].replace(/<[^>]*>/g, '').trim();
    if (!text && !attrs['aria-label'] && !attrs['aria-labelledby'] && !attrs.title) add('Medio', f, 'Botón sin nombre accesible' + (attrs.id ? ' (#' + attrs.id + ')' : '') + '.');
  }
}

function checkRef(from, ref, sev, kind) {
  if (isExternal(ref) || /^data:/i.test(ref)) return null;
  const target = resolveLocal(from, ref);
  if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    add(sev, from, 'Referencia a ' + kind + ' inexistente: ' + ref);
    return null;
  }
  referenced.add(target);
  const hash = ref.split('#')[1];
  if (hash && ext(target) === '.html' && !collectIds(target).has(hash)) add('Alto', from, 'Ancla inexistente en ' + rel(target) + ': #' + hash);
  return target;
}

const pageScripts = {};
htmls.forEach(function (f) {
  auditHtml(f);
  pageScripts[f] = [];
  const re = /<script\b[^>]*\ssrc\s*=\s*["']([^"']+)["']/gi;
  const raw = read(f);
  let m;
  while ((m = re.exec(raw))) if (!isExternal(m[1])) { const t = resolveLocal(f, m[1]); if (fs.existsSync(t)) pageScripts[f].push(t); }
});

csss.forEach(function (f) {
  const src = read(f).replace(/\/\*[\s\S]*?\*\//g, '');
  const open = (src.match(/\{/g) || []).length;
  const close = (src.match(/\}/g) || []).length;
  if (open !== close) add('Alto', f, 'Llaves desbalanceadas en CSS: ' + open + ' "{" frente a ' + close + ' "}".');
  const re = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
  let m;
  while ((m = re.exec(src))) if (!isExternal(m[1]) && !/^data:/i.test(m[1]) && m[1].charAt(0) !== '#') checkRef(f, m[1], 'Medio', 'recurso de CSS');
  if (/@import/.test(src)) add('Bajo', f, 'Usa @import (bloquea la carga en paralelo).');
});

const storage = {};
jss.forEach(function (f) {
  const src = read(f);
  try { new vm.Script(src, { filename: f }); } catch (e) { add('Crítico', f, 'Error de sintaxis JavaScript: ' + e.message); }
  if (/\beval\s*\(|new Function\s*\(/.test(src)) add('Medio', f, 'Uso de eval() o new Function().');
  if (/document\.write\s*\(/.test(src)) add('Medio', f, 'Uso de document.write().');
  const re = /(?:localStorage|sessionStorage)\.(?:getItem|setItem|removeItem)\(\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src))) (storage[m[1]] = storage[m[1]] || new Set()).add(rel(f));
  if (/innerHTML\s*=/.test(src)) add('Bajo', f, 'Usa innerHTML: confirmar que no inserta datos no controlados.');
});
Object.keys(storage).forEach(function (k) {
  if (storage[k].size > 1) add('Medio', root, 'Clave de almacenamiento local «' + k + '» usada por varios archivos: ' + Array.from(storage[k]).join(', '));
});

jss.forEach(function (f) {
  const users = htmls.filter(function (h) { return pageScripts[h].indexOf(f) > -1; });
  if (!users.length) return;
  const src = read(f);
  const re = /getElementById\(\s*['"]([^'"]+)['"]\s*\)/g;
  let m;
  const wanted = new Set();
  while ((m = re.exec(src))) wanted.add(m[1]);
  const missing = Array.from(wanted).filter(function (id) { return users.every(function (h) { return !collectIds(h).has(id); }); });
  missing.forEach(function (id) { add('Bajo', f, 'Busca #' + id + ' pero ninguna página que carga este script lo contiene (verificar que el código lo compruebe antes de usarlo).'); });
});

const seen = new Set(Array.from(referenced));
csss.concat(jss).forEach(function (f) { if (!seen.has(f)) add('Bajo', f, 'Archivo no referenciado por ninguna página HTML (comprobar antes de eliminar).'); });
assets.forEach(function (f) {
  const name = path.basename(f);
  const used = !seen.has(f) && !csss.concat(jss, htmls).some(function (o) { return read(o).indexOf(name) > -1; });
  if (used) add('Bajo', f, 'Recurso sin ninguna referencia encontrada (comprobar antes de eliminar).');
});

const present = EXPECTED.map(function (e) { return { label: e[0], file: e[1], abs: path.join(root, e[1]), ok: fs.existsSync(path.join(root, e[1])) }; });
present.forEach(function (p) { if (!p.ok) add('Alto', path.join(root, p.file), 'No existe el archivo de referencia de «' + p.label + '». Verificar el nombre real; no renombrar sin necesidad.'); });
present.filter(function (p) { return p.ok; }).forEach(function (p) {
  const targets = targetsByPage[p.abs] || new Set();
  present.filter(function (q) { return q.ok && q.abs !== p.abs; }).forEach(function (q) {
    if (!targets.has(q.abs)) add('Medio', p.abs, 'No enlaza a «' + q.label + '» (' + q.file + ').');
  });
});

const order = { 'Crítico': 0, 'Alto': 1, 'Medio': 2, 'Bajo': 3 };
findings.sort(function (a, b) { return order[a.sev] - order[b.sev] || a.file.localeCompare(b.file); });
const count = {};
SEV.forEach(function (s) { count[s] = findings.filter(function (f) { return f.sev === s; }).length; });

let state = 'Correctamente integrada (según las comprobaciones estáticas)';
if (count['Crítico'] || count['Alto']) state = 'Pendiente de correcciones importantes';
else if (count['Medio'] || count['Bajo']) state = 'Funcional con observaciones';

const md = [];
md.push('# Informe de auditoría estática — TECNO GUÍA (Fase 16)');
md.push('');
md.push('Proyecto analizado: `' + root + '`');
md.push('');
md.push('## A. Estado general (solo comprobaciones estáticas)');
md.push('');
md.push('**' + state + '**');
md.push('');
md.push('## Inventario');
md.push('');
md.push('- HTML: ' + htmls.length + ' · CSS: ' + csss.length + ' · JS: ' + jss.length + ' · Recursos: ' + assets.length);
md.push('- Páginas de referencia encontradas: ' + present.filter(function (p) { return p.ok; }).length + ' de 7');
present.forEach(function (p) { md.push('  - ' + (p.ok ? '✔' : '✘') + ' ' + p.label + ' (`' + p.file + '`)'); });
md.push('');
md.push('## B. Errores encontrados');
md.push('');
md.push('| Gravedad | Cantidad |');
md.push('|---|---|');
SEV.forEach(function (s) { md.push('| ' + s + ' | ' + count[s] + ' |'); });
md.push('');
SEV.forEach(function (s) {
  const list = findings.filter(function (f) { return f.sev === s; });
  if (!list.length) return;
  md.push('### ' + s);
  md.push('');
  list.forEach(function (f) { md.push('- `' + f.file + '` — ' + f.msg); });
  md.push('');
});
if (!findings.length) { md.push('No se detectaron problemas con las comprobaciones automáticas.'); md.push(''); }
md.push('## C. Correcciones realizadas');
md.push('');
md.push('Esta herramienta no modifica ningún archivo. Las correcciones se aplican después, una por hallazgo, y se vuelve a ejecutar la auditoría.');
md.push('');
md.push('## Pruebas NO ejecutadas por esta herramienta');
md.push('');
md.push('Requieren navegador y se registran a mano en `lista-pruebas-manuales.md`: consola del navegador, responsive (5 tamaños), compatibilidad (Chrome, Edge, Firefox), Lighthouse, validador HTML, contraste, navegación con teclado, evaluaciones (7 escenarios) y `localStorage`.');
md.push('');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'informe-auditoria.md'), md.join('\n'));
fs.writeFileSync(path.join(outDir, 'informe-auditoria.json'), JSON.stringify({ proyecto: root, estado: state, conteo: count, hallazgos: findings }, null, 2));
console.log('Estado: ' + state);
SEV.forEach(function (s) { console.log(s + ': ' + count[s]); });
console.log('Informe: ' + path.join(outDir, 'informe-auditoria.md'));
process.exit(count['Crítico'] ? 2 : 0);
