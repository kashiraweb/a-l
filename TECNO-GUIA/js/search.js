// Buscador general sobre el contenido real de la página.
(function () {
  'use strict';
  var ns = window.TecnoGuia = window.TecnoGuia || {};
  var panel = document.getElementById('search');
  var toggle = document.getElementById('search-toggle');
  var input = document.getElementById('search-input');
  var clearBtn = document.getElementById('search-clear');
  var status = document.getElementById('search-status');
  var list = document.getElementById('search-results');
  if (!panel || !toggle || !input || !list) return;

  var LABELS = { categoria: 'Contenidos', mantenimiento: 'Mantenimiento', problema: 'Problemas frecuentes', herramienta: 'Herramientas' };
  var KEYWORDS = {
    'categoria-fundamentos-de-computacion': 'informatica conceptos basicos funcionamiento procesador memoria ram almacenamiento',
    'categoria-hardware-y-software': 'componentes fisicos programas procesador cpu memoria ram almacenamiento disco duro placa madre sistema operativo',
    'categoria-mantenimiento-preventivo': 'limpieza revision cuidados prevencion fallas',
    'categoria-mantenimiento-correctivo': 'diagnostico reparacion fallas procedimientos',
    'categoria-problemas-y-soluciones': 'fallas errores soluciones',
    'categoria-herramientas-informaticas': 'instrumentos programas limpieza',
    'mantenimiento-mantenimiento-preventivo': 'limpieza revision componentes actualizacion sistema prevencion',
    'mantenimiento-mantenimiento-correctivo': 'diagnostico reparacion identificacion fallas comprobacion',
    'problema-computadora-lenta': 'lento lenta rendimiento velocidad',
    'problema-problemas-de-encendido': 'no enciende arranque apaga',
    'problema-sobrecalentamiento': 'temperatura calor ventilador',
    'problema-conexion-a-internet': 'red wifi conexion internet',
    'herramienta-brochas-antiestaticas': 'limpieza polvo',
    'herramienta-aire-comprimido': 'limpieza polvo ventilador',
    'herramienta-multimetro': 'voltaje continuidad resistencia',
    'herramienta-software-de-diagnostico': 'programas temperatura memoria ram disco almacenamiento rendimiento'
  };

  function norm(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  var index = Array.prototype.map.call(document.querySelectorAll('.is-selectable'), function (el) {
    var p = el.querySelector('p');
    var title = el.dataset.name;
    return { el: el, title: title, label: LABELS[el.dataset.type] || '', titleN: norm(title),
      hay: norm([title, p ? p.textContent : '', KEYWORDS[el.id] || ''].join(' ')) };
  });

  function items() { return list.querySelectorAll('.search__item'); }

  function render(query) {
    list.textContent = '';
    clearBtn.hidden = !input.value;
    var tokens = norm(query).split(/\s+/).filter(Boolean);
    if (!tokens.length) { status.textContent = 'Escribe una palabra para buscar.'; return; }
    var results = index.map(function (it) {
      if (!tokens.every(function (t) { return it.hay.indexOf(t) > -1; })) return null;
      return { it: it, score: tokens.reduce(function (s, t) { return s + (it.titleN.indexOf(t) > -1 ? 2 : 1); }, 0) };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 8);
    if (!results.length) {
      status.textContent = 'Sin coincidencias para «' + query.trim() + '». Prueba con otra palabra.';
      return;
    }
    status.textContent = results.length + (results.length === 1 ? ' resultado' : ' resultados') + ' para «' + query.trim() + '».';
    results.forEach(function (r) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      var tag = document.createElement('span');
      btn.type = 'button'; btn.className = 'search__item'; btn.dataset.target = r.it.el.id;
      btn.textContent = r.it.title; tag.textContent = r.it.label;
      btn.appendChild(tag); li.appendChild(btn); list.appendChild(li);
    });
  }

  function open() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.dispatchEvent(new CustomEvent('tecnoguia:search-open'));
    input.focus();
  }
  function close(returnFocus) {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }
  function go(id) {
    var target = document.getElementById(id);
    close(false);
    if (!target) return;
    ns.scrollToElement(target);
    target.focus({ preventScroll: true });
    target.classList.add('is-flash');
    setTimeout(function () { target.classList.remove('is-flash'); }, 1700);
  }

  toggle.addEventListener('click', function () { panel.hidden ? open() : close(true); });
  input.addEventListener('input', function () { render(input.value); });
  clearBtn.addEventListener('click', function () { input.value = ''; render(''); input.focus(); });
  list.addEventListener('click', function (e) {
    var btn = e.target.closest('.search__item');
    if (btn) go(btn.dataset.target);
  });
  panel.addEventListener('keydown', function (e) {
    var all = Array.prototype.slice.call(items());
    var pos = all.indexOf(document.activeElement);
    if (e.key === 'Escape') { close(true); }
    else if (e.key === 'ArrowDown' && all.length) { e.preventDefault(); all[Math.min(pos + 1, all.length - 1)].focus(); }
    else if (e.key === 'ArrowUp' && pos >= 0) { e.preventDefault(); (pos === 0 ? input : all[pos - 1]).focus(); }
    else if (e.key === 'Enter' && e.target === input && all.length) { e.preventDefault(); go(all[0].dataset.target); }
  });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !panel.contains(e.target) && !toggle.contains(e.target)) close(false);
  });
  document.addEventListener('tecnoguia:menu-open', function () { if (!panel.hidden) close(false); });
})();
