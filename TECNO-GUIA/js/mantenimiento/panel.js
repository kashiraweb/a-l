// Sistema reutilizable de información: un único <dialog> accesible para todas las tarjetas.
(function () {
  'use strict';
  var M = window.Mant = window.Mant || {};
  var dlg = document.getElementById('mt-dialog');
  if (!dlg || !M.data) return;
  var $ = function (id) { return document.getElementById(id); };
  var ui = { eyebrow: $('mt-dlg-eyebrow'), title: $('mt-dlg-title'), body: $('mt-dlg-body'), main: $('mt-dlg-main'), prev: $('mt-dlg-prev'), next: $('mt-dlg-next') };
  var groups = [
    { key: 'intro', sel: '.mt-intro__card', eyebrow: function () { return '¿Qué es el mantenimiento?'; } },
    { key: 'importancia', sel: '.mt-imp__item', eyebrow: function () { return 'Importancia del mantenimiento'; } },
    { key: 'tipos', sel: '.mt-tipo', eyebrow: function () { return 'Tipo de mantenimiento'; } },
    { key: 'preventivo', sel: '.mt-bento > article', eyebrow: function () { return 'Mantenimiento preventivo'; } },
    { key: 'correctivo', sel: '.mt-cor__item', eyebrow: function () { return 'Mantenimiento correctivo'; } },
    { key: 'herramientas', sel: '.mt-tool', eyebrow: function () { return 'Herramienta de mantenimiento'; } },
    { key: 'componentes', sel: '.mt-comp', eyebrow: function () { return 'Componente que requiere atención'; } },
    { key: 'cuidados', sel: '.mt-hab', eyebrow: function () { return 'Cuidado básico'; } },
    { key: 'errores', sel: '.mt-err', eyebrow: function () { return 'Error común'; } },
    { key: 'resumen', sel: '.mt-step', eyebrow: function (i) { return 'Etapa ' + (i + 1) + ' de 5'; } }
  ];
  var current = null, opener = null;

  function el(tag, text, cls, parent) {
    var n = document.createElement(tag);
    if (text) n.textContent = text;
    if (cls) n.className = cls;
    if (parent) parent.appendChild(n);
    return n;
  }

  function build(group) {
    var nodes = document.querySelectorAll(group.sel), rows = M.data[group.key] || [], entries = [];
    nodes.forEach(function (node, i) {
      var d = rows[i];
      if (!d) { console.warn('Mantenimiento: falta contenido para', group.key, i); return; }
      var e = { node: node, group: group, i: i, title: d[0], secs: d[1], entries: entries };
      var btn = el('button', '', 'mt-hit');
      btn.type = 'button';
      btn.setAttribute('aria-haspopup', 'dialog');
      btn.setAttribute('aria-label', 'Ver explicación: ' + e.title);
      node.setAttribute('data-mt-info', '');
      node.appendChild(btn);
      e.btn = btn;
      btn.addEventListener('click', function () { open(e); });
      entries.push(e);
    });
  }

  function render(e) {
    current = e; opener = e.btn;
    ui.eyebrow.textContent = e.group.eyebrow(e.i);
    ui.title.textContent = e.title;
    ui.body.textContent = '';
    e.secs.forEach(function (s) {
      if (s[0]) el('h3', s[0], '', ui.body);
      if (s[1]) el('p', s[1], '', ui.body);
      if (s[2]) { var ul = el('ul', '', 'mt-dialog__list', ui.body); s[2].forEach(function (t) { el('li', t, '', ul); }); }
    });
    e.entries.forEach(function (o) { o.node.classList.toggle('is-selected', o === e); });
    ui.prev.disabled = e.i === 0;
    ui.next.disabled = e.i === e.entries.length - 1;
    ui.prev.hidden = ui.next.hidden = e.entries.length < 2;
    ui.main.scrollTop = 0;
  }

  function open(e) {
    render(e);
    if (!dlg.open) {
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      document.body.classList.add('mt-lock');
    }
    $('mt-dlg-close').focus();
  }
  function close() {
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
    onClosed();
  }
  function onClosed() {
    document.body.classList.remove('mt-lock');
    if (opener) opener.focus();
  }

  dlg.addEventListener('close', onClosed);
  dlg.addEventListener('click', function (ev) { if (ev.target === dlg) close(); });
  $('mt-dlg-close').addEventListener('click', close);
  $('mt-dlg-done').addEventListener('click', close);
  ui.prev.addEventListener('click', function () { if (current && current.i > 0) render(current.entries[current.i - 1]); });
  ui.next.addEventListener('click', function () { if (current && current.i < current.entries.length - 1) render(current.entries[current.i + 1]); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && dlg.open && typeof dlg.showModal !== 'function') close(); });

  groups.forEach(build);
})();
