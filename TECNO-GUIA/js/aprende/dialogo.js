// Panel de información (un único <dialog> accesible) para módulos, conceptos, componentes, etc.
(function () {
  'use strict';
  var A = window.Aprende = window.Aprende || {};
  var dlg = document.getElementById('ap-dialog');
  if (!dlg || !A.data) return;
  var $ = function (id) { return document.getElementById(id); };
  var ui = { eyebrow: $('ap-dlg-eyebrow'), title: $('ap-dlg-title'), intro: $('ap-dlg-intro'), body: $('ap-dlg-body'),
    prev: $('ap-dlg-prev'), next: $('ap-dlg-next'), main: $('ap-dlg-main') };

  var groups = [
    { key: 'modulos', sel: '.ap-mod', eyebrow: function (i) { return 'Módulo ' + (i + 1) + ' de 8'; }, chips: true },
    { key: 'conceptos', sel: '.ap-fund', eyebrow: function () { return 'Concepto fundamental'; } },
    { key: 'hwsw', sel: '.ap-hw, .ap-sw', eyebrow: function () { return 'Hardware y software'; } },
    { key: 'componentes', sel: '.ap-comp', eyebrow: function () { return 'Componente interno'; } },
    { key: 'perifericos', sel: '.ap-per', eyebrow: function () { return 'Dispositivos periféricos'; } },
    { key: 'so', sel: '.ap-os', eyebrow: function () { return 'Sistema operativo'; } },
    { key: 'flujo', sel: '.ap-step', eyebrow: function (i) { return 'Etapa ' + (i + 1) + ' de 4'; } },
    { key: 'glosario', sel: '.ap-term', eyebrow: function () { return 'Glosario informático'; } }
  ];
  var current = null, opener = null;

  function textOf(el, sel) { var n = el.querySelector(sel); return n ? n.textContent.trim() : ''; }

  function build(group) {
    var els = document.querySelectorAll(group.sel), rows = A.data[group.key] || [], entries = [];
    els.forEach(function (el, i) {
      var d = rows[i];
      if (!d) { console.warn('Aprende: falta contenido para', group.key, i); return; }
      var title = group.key === 'glosario' ? textOf(el, 'b') + ' — ' + textOf(el, 'h3') : textOf(el, 'h3');
      var e = { el: el, group: group, i: i, title: title, entries: entries };
      if (group.key === 'glosario') {
        e.intro = '';
        e.secs = [['Significado', textOf(el, 'h3') + '. ' + textOf(el, 'p')], ['Explicación sencilla', d[0]], ['Para qué sirve', d[1]], ['Ejemplo', d[2]]];
      } else { e.intro = d[0]; e.secs = d[1]; }
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'ap-hit'; btn.setAttribute('aria-haspopup', 'dialog');
      btn.setAttribute('aria-label', 'Ver detalle: ' + title);
      el.setAttribute('data-ap-info', ''); el.appendChild(btn);
      e.btn = btn;
      btn.addEventListener('click', function () { open(e); });
      entries.push(e);
    });
  }

  function add(parent, tag, text, cls) {
    var n = document.createElement(tag); n.textContent = text; if (cls) n.className = cls; parent.appendChild(n); return n;
  }

  function render(e) {
    current = e; opener = e.btn;
    ui.eyebrow.textContent = e.group.eyebrow(e.i);
    ui.title.textContent = e.title;
    ui.intro.textContent = e.intro; ui.intro.hidden = !e.intro;
    ui.body.textContent = '';
    e.secs.forEach(function (s) { add(ui.body, 'h3', s[0]); add(ui.body, 'p', s[1]); });
    if (e.group.chips) {
      add(ui.body, 'h3', 'Temas que se estudiarán');
      var ul = add(ui.body, 'ul', '', 'ap-dialog__chips');
      e.secs.forEach(function (s) { add(ul, 'li', s[0]); });
    }
    e.entries.forEach(function (o) { o.el.classList.toggle('is-selected', o === e); });
    ui.prev.disabled = e.i === 0;
    ui.next.disabled = e.i === e.entries.length - 1;
    ui.prev.hidden = ui.next.hidden = e.entries.length < 2;
    ui.main.scrollTop = 0;
  }

  function open(e) {
    render(e);
    if (!dlg.open) {
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      document.body.classList.add('ap-lock');
    }
    $('ap-dlg-close').focus();
  }
  function close() {
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
    onClosed();
  }
  function onClosed() {
    document.body.classList.remove('ap-lock');
    if (opener) opener.focus();
  }

  dlg.addEventListener('close', onClosed);
  dlg.addEventListener('click', function (ev) { if (ev.target === dlg) close(); });
  $('ap-dlg-close').addEventListener('click', close);
  $('ap-dlg-done').addEventListener('click', close);
  ui.prev.addEventListener('click', function () { if (current && current.i > 0) render(current.entries[current.i - 1]); });
  ui.next.addEventListener('click', function () { if (current && current.i < current.entries.length - 1) render(current.entries[current.i + 1]); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && dlg.open && typeof dlg.showModal !== 'function') close();
  });

  groups.forEach(build);
  A.openInfo = open;
})();
