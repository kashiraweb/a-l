// Enlaces hacia páginas futuras (data-route) y aviso accesible.
(function () {
  'use strict';
  var ns = window.TecnoGuia = window.TecnoGuia || {};
  var toast = document.getElementById('toast');
  var timer;

  ns.notify = function (message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('is-visible'); }, 3600);
  };

  // Punto de integración: si el elemento recibe data-href, navega; si no, solo emite el evento.
  ns.select = function (detail) {
    document.dispatchEvent(new CustomEvent('tecnoguia:select', { detail: detail }));
    if (detail.href) { window.location.href = detail.href; return true; }
    return false;
  };

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-route]');
    if (!link) return;
    e.preventDefault();
    var name = link.textContent.trim();
    var went = ns.select({ type: 'ruta', id: link.dataset.route, name: name, href: link.dataset.href || '' });
    if (!went) ns.notify('«' + name + '» aún no tiene página; su enlace queda listo para la integración.');
  });
})();
