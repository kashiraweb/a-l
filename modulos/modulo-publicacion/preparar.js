'use strict';
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = function (name) { const i = args.indexOf(name); return i > -1 ? args[i + 1] : null; };
const positional = args.filter(function (a, i) { return a.charAt(0) !== '-' && (i === 0 || args[i - 1].charAt(0) !== '-'); });
const root = path.resolve(positional[0] || '.');
const outDir = path.resolve(flag('--salida') || path.join(__dirname, 'salida'));
const baseUrl = (flag('--url') || '').replace(/\/+$/, '');

const PAGES = [
  { label: 'Inicio', file: 'index.html', title: 'TECNO GUÍA | Aprende informática y mantenimiento de computadoras' },
  { label: 'Aprende', file: 'pages/aprende.html', title: 'Aprende informática desde cero | TECNO GUÍA' },
  { label: 'Mantenimiento', file: 'pages/mantenimiento.html', title: 'Mantenimiento de computadoras | TECNO GUÍA' },
  { label: 'Problemas y soluciones', file: 'pages/problemas.html', title: 'Problemas informáticos y soluciones | TECNO GUÍA' },
  { label: 'Herramientas', file: 'pages/herramientas.html', title: 'Herramientas informáticas | TECNO GUÍA' },
  { label: 'Evaluación', file: 'pages/evaluacion.html', title: 'Evaluación de informática | TECNO GUÍA' },
  { label: 'Acerca de', file: 'pages/acerca-de.html', title: 'Acerca de TECNO GUÍA | Plataforma educativa' }
];
const EXCLUDE_DIR = /^(node_modules|\.git|\.vscode|\.idea|salida|respaldo|backup|backups|test|tests|prueba|pruebas|temp|tmp|docs-internos)$/i;
const EXCLUDE_FILE = /(\.bak|\.old|\.tmp|\.orig|\.log|\.zip|\.rar|\.7z|~)$|^(\.env.*|\.ds_store|thumbs\.db|leeme\.md|readme\.md|informe.*\.md)$/i;
const LOCAL_REF = /localhost|127\.0\.0\.1|0\.0\.0\.0|\b192\.168\.\d+\.\d+|\b10\.\d+\.\d+\.\d+|file:\/\/|[A-Za-z]:[\\/]Users[\\/]/;
const SECRET = /(password|passwd|contrase(?:ñ|n)a|api[_-]?key|secret|token|private[_-]?key)\s*[:=]\s*["'][^"']{4,}["']/i;

const issues = [];
const notes = [];
function add(sev, file, msg) { issues.push({ sev, file, msg }); }
const posix = function (p) { return p.split(path.sep).join('/'); };

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error('Ruta de proyecto no válida: ' + root);
  process.exit(1);
}

const missing = PAGES.filter(function (p) { return !fs.existsSync(path.join(root, p.file)); });
if (missing.length) {
  const msg = ['# Informe de preparación — TECNO GUÍA (Fase 17)', '', 'Proyecto: `' + root + '`', '',
    '**Estado definitivo: PUBLICACIÓN BLOQUEADA POR PROBLEMAS**', '',
    'Faltan páginas de referencia (comprobar el nombre real antes de renombrar nada):', ''];
  missing.forEach(function (p) { msg.push('- ' + p.label + ' (`' + p.file + '`)'); });
  msg.push('', 'No se genera copia de seguridad ni versión de publicación hasta que las siete páginas existan y la Fase 16 esté completada.');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'informe-preparacion.md'), msg.join('\n'));
  console.log('PUBLICACIÓN BLOQUEADA: faltan ' + missing.length + ' de 7 páginas.');
  missing.forEach(function (p) { console.log(' - ' + p.file); });
  process.exit(2);
}

const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const backupDir = path.join(outDir, 'respaldo', 'TECNO-GUIA-respaldo-' + stamp);
const distDir = path.join(outDir, 'publicar', 'TECNO-GUIA');
fs.rmSync(path.join(outDir, 'publicar'), { recursive: true, force: true });
fs.mkdirSync(backupDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

const excluded = [];
function copyTree(src, dst, filter, log) {
  fs.readdirSync(src, { withFileTypes: true }).forEach(function (e) {
    const s = path.join(src, e.name);
    if (path.resolve(s) === outDir || path.resolve(s).indexOf(outDir + path.sep) === 0) return;
    if (e.isDirectory()) {
      if (filter && EXCLUDE_DIR.test(e.name)) { log.push(posix(path.relative(root, s)) + '/'); return; }
      fs.mkdirSync(path.join(dst, e.name), { recursive: true });
      copyTree(s, path.join(dst, e.name), filter, log);
    } else {
      if (filter && EXCLUDE_FILE.test(e.name)) { log.push(posix(path.relative(root, s))); return; }
      fs.copyFileSync(s, path.join(dst, e.name));
    }
  });
}
copyTree(root, backupDir, false, []);
copyTree(root, distDir, true, excluded);

function walk(dir, acc) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc); else acc.push(p);
  });
  return acc;
}
const all = walk(distDir, []);
const textFiles = all.filter(function (f) { return /\.(html|css|js|json|xml|txt|svg)$/i.test(f); });
const rel = function (f) { return posix(path.relative(distDir, f)); };

function exactExists(from, ref) {
  const clean = decodeURIComponent(ref.split('#')[0].split('?')[0]);
  if (!clean) return true;
  let target = path.resolve(path.dirname(from), clean);
  if (/\/$/.test(clean)) target = path.join(target, 'index.html');
  const parts = path.relative(distDir, target).split(path.sep);
  if (parts[0] === '..') return false;
  let cur = distDir;
  for (let i = 0; i < parts.length; i++) {
    if (!fs.existsSync(cur) || !fs.statSync(cur).isDirectory()) return false;
    if (fs.readdirSync(cur).indexOf(parts[i]) === -1) return false;
    cur = path.join(cur, parts[i]);
  }
  return true;
}

textFiles.forEach(function (f) {
  const src = fs.readFileSync(f, 'utf8');
  if (LOCAL_REF.test(src)) add('Crítico', rel(f), 'Referencia a entorno local o ruta privada (localhost, IP privada, file:// o C:/Users).');
  if (SECRET.test(src)) add('Crítico', rel(f), 'Posible credencial o clave en el código.');
  if (/\.html$/i.test(f)) {
    const re = /<(?:link|script|img|source|iframe)\b[^>]*?\s(?:src|href)\s*=\s*["'](http:\/\/[^"']+)["']/gi;
    let m;
    while ((m = re.exec(src))) add('Alto', rel(f), 'Recurso cargado por HTTP (contenido mixto con HTTPS): ' + m[1]);
    const refRe = /<(?:a|link|script|img|source)\b[^>]*?\s(?:src|href)\s*=\s*["']([^"']+)["']/gi;
    while ((m = refRe.exec(src))) {
      const ref = m[1];
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref)) continue;
      if (ref.charAt(0) === '/') { add('Alto', rel(f), 'Ruta absoluta a la raíz del servidor (falla si el sitio no está en la raíz): ' + ref); continue; }
      if (!exactExists(f, ref)) add('Alto', rel(f), 'Referencia inexistente o con mayúsculas/minúsculas distintas (falla en servidores Linux): ' + ref);
    }
  }
  if (/\.css$/i.test(f)) {
    const re = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
    let m;
    while ((m = re.exec(src))) {
      const ref = m[1];
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|data:)/i.test(ref)) continue;
      if (!exactExists(f, ref)) add('Alto', rel(f), 'url() inexistente o con mayúsculas/minúsculas distintas: ' + ref);
    }
  }
});

const seo = [];
PAGES.forEach(function (p) {
  const f = path.join(distDir, p.file);
  const src = fs.readFileSync(f, 'utf8');
  const title = (src.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
  const row = { page: p.label, title: title ? title.trim() : '(falta)', desc: /<meta[^>]*name\s*=\s*["']description["'][^>]*content\s*=\s*["'][^"']+/i.test(src), lang: /<html[^>]*\slang\s*=\s*["']es/i.test(src), utf8: /<meta[^>]*charset\s*=\s*["']?utf-8/i.test(src), viewport: /<meta[^>]*name\s*=\s*["']viewport["']/i.test(src), expected: p.title };
  seo.push(row);
  if (!row.desc) add('Medio', p.file, 'Falta meta description.');
  if (!row.lang) add('Medio', p.file, 'Falta lang="es" en <html>.');
  if (!row.utf8) add('Medio', p.file, 'Falta <meta charset="UTF-8">.');
  if (!row.viewport) add('Alto', p.file, 'Falta <meta name="viewport">.');
  if (!title) add('Medio', p.file, 'Falta <title>.');
});

if (baseUrl) {
  if (!/^https?:\/\/[^\s/]+/i.test(baseUrl)) { console.error('--url no es una dirección válida: ' + baseUrl); process.exit(1); }
  const urls = PAGES.map(function (p) { return '  <url><loc>' + baseUrl + '/' + (p.file === 'index.html' ? '' : p.file) + '</loc></url>'; });
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.join('\n') + '\n</urlset>\n');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + baseUrl + '/sitemap.xml\n');
  notes.push('Se generaron `sitemap.xml` y `robots.txt` con la dirección indicada: ' + baseUrl);
} else {
  notes.push('No se generaron `sitemap.xml` ni `robots.txt`: no se indicó la dirección pública real (`--url`). No se inventan direcciones.');
}

const sizes = all.map(function (f) { return { f: rel(f), b: fs.statSync(f).size }; }).sort(function (a, b) { return b.b - a.b; });
const total = sizes.reduce(function (s, x) { return s + x.b; }, 0);
const order = { 'Crítico': 0, 'Alto': 1, 'Medio': 2, 'Bajo': 3 };
issues.sort(function (a, b) { return order[a.sev] - order[b.sev] || a.file.localeCompare(b.file); });
const crit = issues.filter(function (i) { return i.sev === 'Crítico'; }).length;
const state = crit ? 'PUBLICACIÓN BLOQUEADA POR PROBLEMAS' : 'PREPARADO, PERO NO PUBLICADO';

const md = ['# Informe de preparación — TECNO GUÍA (Fase 17)', '', 'Proyecto: `' + root + '`', '',
  '**Estado definitivo: ' + state + '**', '',
  'Este informe solo cubre la preparación local. La publicación en el hosting, HTTPS y las pruebas desde Internet las realiza el propietario con `lista-verificacion-publicada.md`.', '',
  '## Copia de seguridad', '', '- `' + backupDir + '` (copia completa del proyecto). Para recuperar: copiar su contenido de nuevo sobre la carpeta de trabajo.', '',
  '## Versión de publicación', '', '- `' + distDir + '` · ' + all.length + ' archivos · ' + (total / 1024).toFixed(1) + ' KB. Sin minificar (se conserva el código original).', ''];
md.push('### Excluidos de la versión de publicación', '');
md.push(excluded.length ? excluded.map(function (e) { return '- `' + e + '`'; }).join('\n') : '- Ninguno.');
md.push('', '### Archivos más pesados', '');
sizes.slice(0, 5).forEach(function (s) { md.push('- `' + s.f + '` — ' + (s.b / 1024).toFixed(1) + ' KB'); });
md.push('', '## Problemas detectados', '');
if (!issues.length) md.push('No se detectaron problemas con las comprobaciones automáticas.');
['Crítico', 'Alto', 'Medio', 'Bajo'].forEach(function (s) {
  const l = issues.filter(function (i) { return i.sev === s; });
  if (!l.length) return;
  md.push('### ' + s, '');
  l.forEach(function (i) { md.push('- `' + i.file + '` — ' + i.msg); });
  md.push('');
});
md.push('## Metadatos SEO (comparación, sin modificar archivos)', '', '| Página | Título actual | Título de referencia (Fase 17) | description | lang es | UTF-8 | viewport |', '|---|---|---|---|---|---|---|');
seo.forEach(function (r) { md.push('| ' + r.page + ' | ' + r.title + ' | ' + r.expected + ' | ' + (r.desc ? 'sí' : 'NO') + ' | ' + (r.lang ? 'sí' : 'NO') + ' | ' + (r.utf8 ? 'sí' : 'NO') + ' | ' + (r.viewport ? 'sí' : 'NO') + ' |'); });
md.push('', '## Notas', '');
notes.forEach(function (n) { md.push('- ' + n); });
md.push('- Hosting, HTTPS, pruebas en Internet, dispositivos y navegadores: **no ejecutadas** (requieren al propietario y un navegador).');
md.push('- Para confirmar la Fase 16 ejecutar antes `tecno-guia-auditoria/auditar.js` sobre el proyecto.');
fs.writeFileSync(path.join(outDir, 'informe-preparacion.md'), md.join('\n') + '\n');
console.log('Estado: ' + state);
console.log('Problemas: ' + issues.length + ' (críticos: ' + crit + ')');
console.log('Versión de publicación: ' + distDir);
console.log('Informe: ' + path.join(outDir, 'informe-preparacion.md'));
process.exit(crit ? 2 : 0);
