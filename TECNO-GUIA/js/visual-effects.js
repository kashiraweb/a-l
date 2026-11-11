// Aparición progresiva al entrar en pantalla (se retira al terminar para no bloquear el hover).
(function () {
  'use strict';
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = document.querySelectorAll('.section__head, .big, .grid > *, .mini, .panel');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      io.unobserve(el);
      el.classList.add('is-visible');
      setTimeout(function () {
        el.classList.remove('reveal', 'is-visible');
        el.style.transitionDelay = '';
      }, 900);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  targets.forEach(function (el) {
    var i = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 3) * 80 + 'ms';
    io.observe(el);
  });
})();
