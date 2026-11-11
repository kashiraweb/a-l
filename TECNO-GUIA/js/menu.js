// Menú principal y menú móvil (ARIA, Escape, clic fuera, cierre al elegir opción).
(function () {
  'use strict';
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var header = document.querySelector('.navbar');
  if (!burger || !nav || !header) return;
  var mobile = window.matchMedia('(max-width: 960px)');

  burger.setAttribute('aria-controls', 'nav');

  function setOpen(open, returnFocus) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) document.dispatchEvent(new CustomEvent('tecnoguia:menu-open'));
    if (!open && returnFocus) burger.focus();
  }
  function isOpen() { return nav.classList.contains('is-open'); }

  burger.addEventListener('click', function () { setOpen(!isOpen()); });
  nav.addEventListener('click', function (e) {
    if (mobile.matches && e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', function (e) {
    if (isOpen() && !header.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) setOpen(false, true);
  });
  window.addEventListener('resize', function () { if (!mobile.matches && isOpen()) setOpen(false); });
  document.addEventListener('tecnoguia:search-open', function () { setOpen(false); });
})();
