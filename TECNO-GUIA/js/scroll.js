// Desplazamiento suave con compensación del encabezado y botón "volver arriba".
(function () {
  'use strict';
  var ns = window.TecnoGuia = window.TecnoGuia || {};
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var header = document.querySelector('.navbar');

  ns.scrollToElement = function (el) {
    if (!el) return;
    var offset = header ? header.offsetHeight + 12 : 12;
    var top = el.id === 'top' ? 0 : el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce.matches ? 'auto' : 'smooth' });
  };

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute('data-route')) return;
    var id = link.getAttribute('href').slice(1);
    var target = id ? document.getElementById(id) : null;
    e.preventDefault();
    if (!target) return;
    ns.scrollToElement(target);
    if (history.replaceState) history.replaceState(null, '', '#' + id);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  var toTop = document.getElementById('to-top');
  if (!toTop) return;
  var ticking = false;
  function update() {
    var show = window.pageYOffset > window.innerHeight * 0.8;
    toTop.classList.toggle('is-visible', show);
    toTop.tabIndex = show ? 0 : -1;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  toTop.addEventListener('click', function () { ns.scrollToElement(document.getElementById('top')); });
  update();
})();
