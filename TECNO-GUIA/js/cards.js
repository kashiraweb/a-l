// Tarjetas de contenidos, mantenimiento, problemas y herramientas.
(function () {
  'use strict';
  var ns = window.TecnoGuia = window.TecnoGuia || {};
  var groups = [
    { sel: '#contenidos .card', type: 'categoria' },
    { sel: '#mantenimiento .big', type: 'mantenimiento' },
    { sel: '#problemas .card', type: 'problema' },
    { sel: '#herramientas .tool', type: 'herramienta' }
  ];
  var SELECTABLE = '.is-selectable, .mini[data-target]';

  function slug(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  groups.forEach(function (group) {
    document.querySelectorAll(group.sel).forEach(function (el) {
      var h = el.querySelector('h3');
      var name = h ? h.textContent.trim() : '';
      var id = slug(name);
      el.id = group.type + '-' + id;
      el.dataset.type = group.type;
      el.dataset.name = name;
      el.dataset.route = group.type + '/' + id; // sustituir por data-href al integrar
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-pressed', 'false');
      el.setAttribute('aria-label', name + ': seleccionar');
      el.classList.add('is-selectable');
    });
  });

  document.querySelectorAll('.mini[data-target]').forEach(function (el) {
    var h = el.querySelector('h3');
    el.setAttribute('role', 'link');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', (h ? h.textContent.trim() : '') + ': ir a la sección relacionada');
  });

  function choose(el) {
    document.querySelectorAll('.is-selectable[data-type="' + el.dataset.type + '"]').forEach(function (other) {
      var on = other === el;
      other.classList.toggle('is-selected', on);
      other.setAttribute('aria-pressed', String(on));
    });
    var went = ns.select({ type: el.dataset.type, id: el.dataset.route, name: el.dataset.name, href: el.dataset.href || '' });
    if (!went) ns.notify('Seleccionaste «' + el.dataset.name + '». Su página se conectará en la integración.');
  }

  function activate(el) {
    if (el.matches('.mini')) ns.scrollToElement(document.querySelector(el.dataset.target));
    else choose(el);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest(SELECTABLE);
    if (el && !String(window.getSelection())) activate(el);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest(SELECTABLE);
    if (!el || e.target !== el) return;
    e.preventDefault();
    activate(el);
  });
})();
