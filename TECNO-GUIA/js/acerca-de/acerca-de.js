/* =====================================================================
   TECNO GUÍA · Página «Acerca de» · FASE 14 (funcionalidad)
   Solo interacciones de interfaz: sin datos personales, sin red,
   sin almacenamiento y sin dependencias externas.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Rutas de las demás páginas.
     Esta página es un módulo independiente y la estructura real del
     proyecto aún no está integrada, así que NO se inventan rutas:
     cada destino queda preparado y vacío. Para conectarlo (FASE 15)
     basta con completar aquí la ruta o poner data-href="..." en el
     enlace correspondiente.
     --------------------------------------------------------------- */
  const ROUTES = {
    'inicio': '../index.html',
    'aprende': 'aprende.html',
    'mantenimiento': 'mantenimiento.html',
    'problemas-y-soluciones': 'problemas.html',
    'herramientas': 'herramientas.html',
    'evaluacion': 'evaluacion.html'
  };
  const CURRENT_ROUTE = 'acerca-de';

  const FLASH_MS = 1700;
  const TOAST_MS = 4200;
  const HEADER_GAP = 12;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.about-header');
  const toast = document.getElementById('toast');
  let toastTimer = 0;

  /* ----------------------------- utilidades ----------------------------- */

  function scrollBehavior() {
    return reduceMotion.matches ? 'auto' : 'smooth';
  }

  // El encabezado solo es fijo en pantallas grandes (en móvil es estático).
  function headerOffset() {
    if (!header) return HEADER_GAP;
    const sticky = window.getComputedStyle(header).position === 'sticky';
    return (sticky ? header.offsetHeight : 0) + HEADER_GAP;
  }

  // Posición del elemento en el documento SIN contar transformaciones
  // (las tarjetas tienen una animación de aparición con translateY que
  // falsearía getBoundingClientRect y dejaría el destino pegado al encabezado).
  function documentTop(el) {
    let y = 0;
    for (let node = el; node; node = node.offsetParent) y += node.offsetTop;
    return y;
  }

  function scrollToTarget(target) {
    const top = target.id === 'top' ? 0 : documentTop(target) - headerOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() });
  }

  function flash(target) {
    if (!target.classList.contains('about-card') && !target.classList.contains('about-step__card')) return;
    target.classList.remove('is-flash');
    void target.offsetWidth; // reinicia la animación si se repite
    target.classList.add('is-flash');
    window.setTimeout(function () { target.classList.remove('is-flash'); }, FLASH_MS);
  }

  function focusTarget(target) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(hideToast, TOAST_MS);
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove('is-visible');
    window.clearTimeout(toastTimer);
  }

  /* ------------------- navegación interna (anclas) ------------------- */

  function initInternalNavigation() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href^="#"]:not([data-route])');
      if (!link) return;

      const hash = link.getAttribute('href');
      if (hash.length < 2) return;

      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch (e) { return; }
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
      if (window.history && history.replaceState) history.replaceState(null, '', '#' + id);
      focusTarget(target);
      flash(target);
    });
  }

  /* --------- enlaces hacia otras páginas (encabezado y pie) --------- */

  function initRouteLinks() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[data-route]');
      if (!link) return;
      event.preventDefault();

      const route = link.dataset.route;
      if (route === CURRENT_ROUTE) {          // ya estamos en «Acerca de»
        scrollToTarget(document.getElementById('top'));
        if (window.history && history.replaceState) history.replaceState(null, '', window.location.pathname + window.location.search);
        return;
      }

      const href = link.dataset.href || ROUTES[route] || '';
      if (href) {
        window.location.href = href;
        return;
      }
      const name = link.textContent.trim() || 'Esta página';
      notify('«' + name + '» aún no está conectada; su enlace queda preparado para la integración.');
    });
  }

  /* ------------------------ accesibilidad ------------------------ */

  function initAccessibleControls() {
    // Solo «Acerca de» puede aparecer como página actual, en encabezado y pie.
    document.querySelectorAll('.about-nav a[data-route], .about-footer a[data-route]').forEach(function (link) {
      const isCurrent = link.dataset.route === CURRENT_ROUTE;
      link.classList.toggle('is-active', isCurrent && link.classList.contains('about-nav__link'));
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    // Escape cierra el aviso.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') hideToast();
    });

    // El contenido principal puede recibir el foco desde el enlace «Saltar al contenido».
    const skip = document.querySelector('.about-skip');
    const main = document.getElementById('contenido');
    if (skip && main) {
      skip.addEventListener('click', function (event) {
        event.preventDefault();
        scrollToTarget(main);
        focusTarget(main);
      });
    }
  }

  /* ------------------------------ inicio ------------------------------ */

  function init() {
    initInternalNavigation();
    initRouteLinks();
    initAccessibleControls();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
