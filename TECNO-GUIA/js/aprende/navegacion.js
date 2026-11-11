// Menú móvil, desplazamiento suave y enlaces preparados para páginas futuras.
(function () {
  'use strict';
  var A = window.Aprende = window.Aprende || {};
  var header = document.querySelector('.ap-header');
  var nav = document.getElementById('ap-nav');
  var burger = document.getElementById('ap-burger');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 960px)');
  var toast = null, timer;

  A.notify = function (msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'ap-toast'; toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = msg; toast.classList.add('is-visible');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('is-visible'); }, 3500);
  };

  A.scrollTo = function (el) {
    if (!el) return;
    var top = 0;
    if (el.id !== 'ap-top') {
      var anchor = el.tagName === 'SECTION' ? (el.querySelector('.ap-head') || el) : el;
      top = anchor.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight : 0) - 24;
    }
    window.scrollTo({ top: Math.max(0, top), behavior: reduce.matches ? 'auto' : 'smooth' });
  };

  function setMenu(open, returnFocus) {
    if (!nav || !burger) return;
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (!open && returnFocus) burger.focus();
  }
  function menuOpen() { return nav && nav.classList.contains('is-open'); }

  if (burger && nav) {
    burger.addEventListener('click', function () { setMenu(!menuOpen()); });
    document.addEventListener('click', function (e) {
      if (menuOpen() && !header.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen()) setMenu(false, true);
    });
    window.addEventListener('resize', function () { if (!mobile.matches && menuOpen()) setMenu(false); });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    if (nav && nav.contains(link) && mobile.matches) setMenu(false);
    if (link.hasAttribute('data-route')) {
      e.preventDefault();
      A.notify('«' + link.textContent.trim() + '» aún no está disponible; su enlace queda listo para la integración.');
      return;
    }
    var href = link.getAttribute('href') || '';
    if (href.charAt(0) !== '#' || href.length < 2) return;
    var target = document.getElementById(href.slice(1));
    e.preventDefault();
    if (!target) return;
    A.scrollTo(target);
    if (history.replaceState) history.replaceState(null, '', href);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
})();
