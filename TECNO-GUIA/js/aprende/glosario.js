// Búsqueda del glosario: filtra mientras se escribe.
(function () {
  'use strict';
  var input = document.getElementById('ap-gq');
  var clearBtn = document.getElementById('ap-gclear');
  var status = document.getElementById('ap-gstatus');
  var terms = document.querySelectorAll('.ap-term');
  if (!input || !terms.length) return;
  var EXTRA = { 'CPU': 'procesador', 'RAM': 'memoria', 'ROM': 'memoria', 'HDD': 'disco almacenamiento', 'SSD': 'disco almacenamiento', 'USB': 'conexion puerto', 'GPU': 'grafica tarjeta video', 'BIOS': 'arranque sistema', 'S.O.': 'sistema operativo', 'Periférico': 'dispositivo', 'Hardware': 'fisico', 'Software': 'programas' };
  var norm = function (s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };
  var index = Array.prototype.map.call(terms, function (el) {
    var key = el.querySelector('b').textContent.trim();
    return { el: el, hay: norm(el.textContent + ' ' + (EXTRA[key] || '')) };
  });

  function run() {
    var q = norm(input.value.trim()), n = 0;
    clearBtn.hidden = !input.value;
    index.forEach(function (it) {
      var ok = !q || q.split(/\s+/).every(function (t) { return it.hay.indexOf(t) > -1; });
      it.el.hidden = !ok; if (ok) n++;
    });
    if (!q) status.textContent = 'Mostrando los ' + index.length + ' términos.';
    else if (!n) status.textContent = 'No hay términos que coincidan con «' + input.value.trim() + '».';
    else status.textContent = n + (n === 1 ? ' término encontrado' : ' términos encontrados') + ' para «' + input.value.trim() + '».';
  }
  input.addEventListener('input', run);
  input.addEventListener('keydown', function (e) { if (e.key === 'Escape' && input.value) { input.value = ''; run(); } });
  clearBtn.addEventListener('click', function () { input.value = ''; run(); input.focus(); });
  run();
})();
