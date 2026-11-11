/* TECNO GUÍA · Módulo Evaluación (Fase 12: funcionalidad). Independiente de la web principal. */
(function () {
  'use strict';
  var EVS = window.TG_EVALUACIONES, TEMAS = window.TG_TEMAS || {};
  if (!EVS) return;

  var STORAGE_KEY = 'tecnoguia.evaluacion.resultados.v1';
  var MAX_HIST = 50;
  var LETRAS = ['A', 'B', 'C', 'D'];
  var CLASES = [
    { min: 90, id: 'excelente', nombre: 'Excelente', msg: 'Excelente trabajo. Has demostrado una comprensión muy sólida de los contenidos evaluados.' },
    { min: 80, id: 'muybien', nombre: 'Muy bien', msg: '¡Muy buen resultado! Comprendes gran parte de los conceptos y puedes seguir fortaleciendo tus conocimientos.' },
    { min: 70, id: 'bien', nombre: 'Bien', msg: 'Buen trabajo. Has comprendido varios conceptos importantes. Repasa las preguntas que te resultaron difíciles.' },
    { min: 60, id: 'proceso', nombre: 'En proceso', msg: 'Vas avanzando. Te recomendamos repasar algunos temas y volver a practicar.' },
    { min: 0, id: 'reforzar', nombre: 'Necesitas reforzar', msg: 'Esta evaluación te permite identificar qué temas necesitan más estudio. Revisa las lecciones y vuelve a intentarlo cuando estés preparado.' }
  ];

  var header = document.querySelector('.navbar');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var app = document.getElementById('app');
  var live = document.getElementById('ev-live');
  var estado = null;      // estado independiente de la evaluación en curso
  var origen = null;      // elemento que abrió la evaluación
  var toastEl, toastTimer, dlgCfg = null, dlgFoco = null;

  /* ---------- utilidades ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ic(n) { return '<svg class="ico" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  function anunciar(t) { if (live) { live.textContent = ''; setTimeout(function () { live.textContent = t; }, 30); } }
  function irA(el) {
    if (!el) return;
    var off = header ? header.offsetHeight + 12 : 12;
    var top = el.id === 'top' ? 0 : el.getBoundingClientRect().top + window.pageYOffset - off;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce.matches ? 'auto' : 'smooth' });
  }
  function avisar(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div'); toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg; toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 3600);
  }
  function clasificar(pct) { for (var i = 0; i < CLASES.length; i++) if (pct >= CLASES[i].min) return CLASES[i]; return CLASES[CLASES.length - 1]; }
  function fechaLarga(iso) {
    var d = new Date(iso);
    return isNaN(d) ? '—' : d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* ---------- almacenamiento local ---------- */
  function obtenerHistorial() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var lista = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(lista)) return [];
      return lista.filter(function (r) {
        return r && EVS[r.evaluacion] && typeof r.porcentaje === 'number' && isFinite(r.porcentaje) &&
          typeof r.fecha === 'string' && typeof r.clasificacion === 'string';
      });
    } catch (e) { return []; }
  }
  function guardarResultado(r) {
    try {
      var lista = obtenerHistorial();
      lista.push({ evaluacion: r.codigo, fecha: r.fecha, preguntas: r.total, correctas: r.correctas,
        incorrectas: r.incorrectas, porcentaje: r.porcentaje, clasificacion: r.clase.nombre });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lista.slice(-MAX_HIST)));
      return true;
    } catch (e) { return false; }
  }
  function ultimoResultado(codigo) {
    var l = obtenerHistorial().filter(function (r) { return r.evaluacion === codigo; });
    return l.length ? l[l.length - 1] : null;
  }

  /* ---------- vistas ---------- */
  function mostrarVista(nombre, htmlTexto) {
    app.querySelectorAll('[data-vista]').forEach(function (v) { v.hidden = v.dataset.vista !== nombre; });
    var vista = app.querySelector('[data-vista="' + nombre + '"]');
    if (htmlTexto != null) vista.innerHTML = htmlTexto;
    estado.vista = nombre;
    window.scrollTo({ top: 0, behavior: 'auto' });
    return vista;
  }
  function enfocar(el) { if (el) { el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); } }

  /* ---------- selección y preparación ---------- */
  function seleccionarEvaluacion(codigo, desde) {
    var ev = EVS[codigo];
    if (!ev) return;
    origen = desde || null;
    estado = { codigo: codigo, ev: ev, idx: 0, resp: [], vista: 'intro', terminada: false, res: null };
    document.body.classList.add('ev-modo');
    app.hidden = false;
    prepararEvaluacion();
  }
  function prepararEvaluacion() {
    var ev = estado.ev, ult = ultimoResultado(ev.codigo);
    var previo = ult ? '<p class="ev-prev">' + ic('clipboard') + 'Último resultado en este navegador: <b>' + ult.porcentaje + ' %</b> (' + esc(ult.clasificacion) + '), el ' + esc(fechaLarga(ult.fecha)) + '.</p>' : '';
    var v = mostrarVista('intro',
      '<div class="ev-screen"><span class="tag">' + esc(ev.codigo) + ' · ' + esc(ev.categoria) + '</span>' +
      '<h2 class="section__title" data-foco>' + esc(ev.nombre) + '</h2>' +
      '<ul class="ev-meta"><li>' + ic('layers') + '<b>Categoría:</b> ' + esc(ev.categoria) + '</li><li>' + ic('target') + '<b>Nivel:</b> ' + esc(ev.dificultad) + '</li><li>' + ic('list') + '<b>Preguntas:</b> ' + ev.preguntas.length + '</li></ul>' +
      '<div class="ev-box"><h3>Antes de comenzar</h3><p>Lee cuidadosamente cada pregunta y selecciona la alternativa que consideres correcta. Cuando hayas respondido todas las preguntas, podrás finalizar la evaluación y consultar tus resultados.</p>' +
      '<ul class="hr-list ev-instr">' + ['Lee cada pregunta con atención.', 'Selecciona una sola alternativa.', 'Puedes regresar a preguntas anteriores.', 'Revisa tus respuestas antes de finalizar.', 'La evaluación se corregirá cuando la termines.'].map(function (t) { return '<li>' + ic('check') + '<span>' + t + '</span></li>'; }).join('') + '</ul>' + previo + '</div>' +
      '<div class="ev-actions"><button type="button" class="btn btn--primary btn--lg" data-act="comenzar">Comenzar evaluación ' + ic('arrow') + '</button><button type="button" class="btn btn--ghost btn--lg" data-act="volver">Volver a evaluaciones</button></div></div>');
    anunciar('Evaluación: ' + ev.nombre + '. Pantalla de introducción.');
    enfocar(v.querySelector('[data-foco]'));
  }

  /* ---------- inicio ---------- */
  function iniciarEvaluacion() {
    estado.idx = 0; estado.resp = estado.ev.preguntas.map(function () { return null; });
    estado.terminada = false; estado.res = null;
    mostrarPregunta(true);
  }

  /* ---------- pregunta ---------- */
  function contarRespondidas() { return estado.resp.filter(function (r) { return r !== null; }).length; }
  function mostrarPregunta(mover) {
    var ev = estado.ev, q = ev.preguntas[estado.idx], n = ev.preguntas.length, ultima = estado.idx === n - 1;
    var opciones = q.opciones.map(function (t, i) {
      var sel = estado.resp[estado.idx] === i;
      return '<li><label class="ev-opt' + (sel ? ' is-sel opcion-seleccionada' : '') + '"><input class="sr-only" type="radio" name="resp" value="' + i + '"' + (sel ? ' checked' : '') + '><span class="ev-let">' + LETRAS[i] + '</span><span class="ev-opt__t">' + esc(t) + '</span><span class="ev-opt__ok">' + ic('check') + '</span></label></li>';
    }).join('');
    var nav = ev.preguntas.map(function (_, i) { return '<li><button type="button" class="ev-n" data-act="ir" data-i="' + i + '"></button></li>'; }).join('');
    var v = mostrarVista('quiz',
      '<div class="ev-ui"><aside class="ev-ui__side"><span class="ev-cat">' + esc(ev.codigo) + '</span><h3>' + esc(ev.nombre) + '</h3>' +
      '<ul class="ev-ui__info"><li><span>Categoría</span><b>' + esc(ev.categoria) + '</b></li><li><span>Nivel</span><b>' + esc(ev.dificultad) + '</b></li><li><span>Preguntas</span><b>' + n + '</b></li></ul>' +
      '<div class="ev-bar" role="progressbar" aria-label="Avance de la evaluación" aria-valuemin="0" aria-valuemax="100"><i></i></div><p class="ev-prog__t" id="ev-pt"></p>' +
      '<p class="ev-prog__t" id="ev-cnt"></p><h4 class="ev-sidetitle">Preguntas</h4><ol class="ev-navq" aria-label="Navegación de preguntas">' + nav + '</ol>' +
      '<p class="ev-prog__t ev-leyenda"><span><i class="c-act"></i>Actual</span><span><i class="c-res"></i>Respondida</span><span><i class="c-pen"></i>Pendiente</span></p></aside>' +
      '<div class="ev-ui__main"><div class="ev-ui__card"><div class="ev-ui__top"><span class="tag" id="ev-ptag"></span></div>' +
      '<fieldset class="ev-fs"><legend class="ev-ui__q" data-foco id="ev-q-t">' + esc(q.pregunta) + '</legend><ul class="ev-ui__opts">' + opciones + '</ul></fieldset>' +
      '<p class="ev-legend">Selecciona una sola alternativa. Puedes cambiarla antes de finalizar.</p></div>' +
      '<div class="ev-ui__nav"><button type="button" class="btn btn--ghost btn--lg" data-act="prev"' + (estado.idx === 0 ? ' disabled' : '') + '>' + ic('left') + ' Pregunta anterior</button>' +
      '<button type="button" class="btn btn--primary btn--lg" data-act="next">' + (ultima ? 'Revisar evaluación ' : 'Siguiente pregunta ') + ic('arrow') + '</button></div>' +
      '<p class="ev-exit"><button type="button" class="btn btn--ghost btn--sm" data-act="volver">Volver a evaluaciones</button></p></div></div>');
    actualizarProgreso();
    anunciar('Pregunta ' + (estado.idx + 1) + ' de ' + n + '.');
    if (mover) enfocar(v.querySelector('[data-foco]'));
  }
  function seleccionarRespuesta(i) {
    estado.resp[estado.idx] = i;
    app.querySelectorAll('.ev-opt').forEach(function (l, k) {
      l.classList.toggle('is-sel', k === i); l.classList.toggle('opcion-seleccionada', k === i);
    });
    actualizarProgreso();
  }

  /* ---------- navegación ---------- */
  function siguientePregunta() {
    if (estado.idx < estado.ev.preguntas.length - 1) { estado.idx++; mostrarPregunta(true); }
    else revisarEvaluacion();
  }
  function preguntaAnterior() { if (estado.idx > 0) { estado.idx--; mostrarPregunta(true); } }
  function irAPregunta(i) {
    if (i < 0 || i >= estado.ev.preguntas.length) return;
    estado.idx = i; mostrarPregunta(true);
  }

  /* ---------- progreso ---------- */
  function actualizarProgreso() {
    var n = estado.ev.preguntas.length, pos = estado.idx + 1, pct = Math.round(pos / n * 100), r = contarRespondidas();
    var bar = app.querySelector('.ev-bar');
    if (!bar) return;
    bar.setAttribute('aria-valuenow', pct); bar.setAttribute('aria-valuetext', 'Pregunta ' + pos + ' de ' + n);
    bar.firstElementChild.style.width = pct + '%';
    app.querySelector('#ev-pt').textContent = 'Pregunta ' + pos + ' de ' + n + ' · ' + pct + ' % de avance';
    app.querySelector('#ev-cnt').textContent = 'Respondidas: ' + r + ' · Pendientes: ' + (n - r);
    app.querySelector('#ev-ptag').textContent = 'Pregunta ' + pos + ' de ' + n;
    app.querySelectorAll('.ev-n').forEach(function (b, i) {
      var resp = estado.resp[i] !== null, act = i === estado.idx;
      b.textContent = i + 1;
      b.className = 'ev-n ' + (act ? 'is-act ' : '') + (resp ? 'is-res pregunta-respondida' : 'is-pen pregunta-pendiente');
      b.setAttribute('aria-label', 'Pregunta ' + (i + 1) + ': ' + (act ? 'actual, ' : '') + (resp ? 'respondida' : 'pendiente'));
      if (act) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
  }

  /* ---------- revisión previa ---------- */
  function revisarEvaluacion() {
    var n = estado.ev.preguntas.length, r = contarRespondidas(), pend = n - r;
    var pendLista = estado.resp.map(function (x, i) { return x === null ? '<button type="button" class="ev-n is-pen" data-act="ir" data-i="' + i + '" aria-label="Ir a la pregunta ' + (i + 1) + ' sin responder">' + (i + 1) + '</button>' : ''; }).join('');
    var v = mostrarVista('review',
      '<div class="ev-screen"><span class="tag">' + esc(estado.ev.nombre) + '</span><h2 class="section__title" data-foco>Revisa tus respuestas antes de finalizar.</h2>' +
      '<p class="section__text">Puedes regresar a cualquier pregunta para modificar tu selección. Cuando estés seguro, finaliza la evaluación para conocer tus resultados.</p>' +
      '<ul class="ev-sum"><li><b>' + n + '</b><span>Total de preguntas</span></li><li><b>' + r + '</b><span>Respondidas</span></li><li><b>' + pend + '</b><span>Sin responder</span></li></ul>' +
      (pend ? '<div class="ev-alert" role="alert">' + ic('alert') + '<div><b>Atención</b><span>Todavía tienes preguntas sin responder. Puedes regresar para completarlas o finalizar de todas formas. Las preguntas sin responder se contabilizarán como incorrectas.</span><div class="ev-navq-inline">' + pendLista + '</div></div></div>' : '<p class="ev-ok">' + ic('check') + 'Has respondido todas las preguntas.</p>') +
      '<div class="ev-actions"><button type="button" class="btn btn--ghost btn--lg" data-act="volverquiz">' + ic('left') + ' Volver a la evaluación</button><button type="button" class="btn btn--primary btn--lg" data-act="finalizar">Finalizar evaluación ' + ic('flag') + '</button></div></div>');
    anunciar('Revisión de la evaluación. ' + r + ' de ' + n + ' preguntas respondidas.');
    enfocar(v.querySelector('[data-foco]'));
  }

  /* ---------- corrección ---------- */
  function calcularResultados() {
    var ev = estado.ev, total = ev.preguntas.length, c = 0, sin = 0;
    var detalle = ev.preguntas.map(function (q, i) {
      var sel = estado.resp[i];
      var estadoP = sel === null ? 'sin' : (sel === q.respuestaCorrecta ? 'ok' : 'mal');
      if (estadoP === 'ok') c++; if (estadoP === 'sin') sin++;
      return { q: q, sel: sel, estado: estadoP };
    });
    var pct = Math.round(c / total * 100);
    return { codigo: ev.codigo, nombre: ev.nombre, categoria: ev.categoria, fecha: new Date().toISOString(), total: total,
      correctas: c, incorrectas: total - c, sinResponder: sin, porcentaje: pct, clase: clasificar(pct), detalle: detalle };
  }
  function finalizarEvaluacion() {
    var res = calcularResultados();
    estado.terminada = true; estado.res = res;
    res.guardado = guardarResultado(res);
    mostrarResultados();
  }

  /* ---------- resultados ---------- */
  function mostrarResultados() {
    var r = estado.res, cl = r.clase;
    var v = mostrarVista('result',
      '<div class="ev-screen ev-res resultado-' + cl.id + '"><span class="tag">' + esc(r.codigo) + '</span><h2 class="section__title" data-foco>Resultados de tu evaluación</h2>' +
      '<div class="ev-res__grid"><div class="ev-ring" style="--p:' + r.porcentaje + '" role="img" aria-label="Porcentaje final: ' + r.porcentaje + ' por ciento"><div><b>' + r.porcentaje + ' %</b><span>' + esc(cl.nombre) + '</span></div></div>' +
      '<div><div class="ev-badge ev-badge--' + cl.id + '">' + esc(cl.nombre) + '</div><p class="ev-res__msg">' + esc(cl.msg) + '</p>' +
      '<dl class="ev-dl"><div><dt>Evaluación</dt><dd>' + esc(r.nombre) + '</dd></div><div><dt>Categoría</dt><dd>' + esc(r.categoria) + '</dd></div><div><dt>Fecha</dt><dd>' + esc(fechaLarga(r.fecha)) + '</dd></div><div><dt>Total de preguntas</dt><dd>' + r.total + '</dd></div><div><dt>Respuestas correctas</dt><dd>' + r.correctas + '</dd></div><div><dt>Respuestas incorrectas</dt><dd>' + r.incorrectas + '</dd></div><div><dt>Sin responder</dt><dd>' + r.sinResponder + '</dd></div><div><dt>Porcentaje final</dt><dd>' + r.porcentaje + ' %</dd></div></dl></div></div>' +
      '<p class="ev-note">Las preguntas sin responder se cuentan como incorrectas. ' + (r.guardado ? 'Este resultado se guardó solo en este navegador; no es un registro oficial.' : 'No se pudo guardar el resultado en este navegador.') + '</p>' +
      '<div class="ev-actions"><button type="button" class="btn btn--primary btn--lg" data-act="revisarresp">Revisar respuestas ' + ic('arrow') + '</button><button type="button" class="btn btn--ghost btn--lg" data-act="reintentar">Intentar nuevamente</button><button type="button" class="btn btn--ghost btn--lg" data-act="volver">Volver a evaluaciones</button></div></div>');
    anunciar('Resultados de tu evaluación. ' + r.porcentaje + ' por ciento, ' + cl.nombre + '. ' + r.correctas + ' de ' + r.total + ' respuestas correctas.');
    enfocar(v.querySelector('[data-foco]'));
  }

  /* ---------- revisión detallada ---------- */
  var ESTADOS = { ok: ['Correcta', 'check'], mal: ['Incorrecta', 'x'], sin: ['Sin responder', 'help'] };
  function mostrarRevisionRespuestas() {
    var r = estado.res;
    var items = r.detalle.map(function (d, i) {
      var q = d.q, e = ESTADOS[d.estado];
      var ops = q.opciones.map(function (t, k) {
        var marcas = [];
        if (k === d.sel) marcas.push('Tu respuesta');
        if (k === q.respuestaCorrecta) marcas.push('Respuesta correcta');
        var cls = k === q.respuestaCorrecta ? ' respuesta-correcta' : (k === d.sel ? ' respuesta-incorrecta' : '');
        return '<li class="ev-rop' + cls + '"><span class="ev-let">' + LETRAS[k] + '</span><span class="ev-rop__t">' + esc(t) + '</span>' + (marcas.length ? '<em>' + marcas.join(' · ') + '</em>' : '') + '</li>';
      }).join('');
      return '<li class="ev-rq ev-rq--' + d.estado + '"><div class="ev-rq__head"><span class="ev-q__n">' + (i + 1) + '</span><span class="ev-st ev-st--' + d.estado + '">' + ic(e[1]) + e[0] + '</span></div>' +
        '<p class="ev-q__t">' + esc(q.pregunta) + '</p><ol class="ev-ropts" type="A">' + ops + '</ol>' +
        '<div class="ev-expl">' + ic('bulb') + '<div><b>Explicación</b><span>' + esc(q.explicacion) + '</span></div></div></li>';
    }).join('');
    var v = mostrarVista('detail',
      '<div class="ev-screen ev-screen--wide"><span class="tag">' + esc(r.nombre) + '</span><h2 class="section__title" data-foco>Revisión de tus respuestas</h2>' +
      '<p class="section__text">Resultado: ' + r.correctas + ' de ' + r.total + ' respuestas correctas (' + r.porcentaje + ' %).</p>' +
      '<ol class="ev-rqs">' + items + '</ol><div class="ev-rec" id="ev-rec"></div>' +
      '<div class="ev-actions"><button type="button" class="btn btn--primary btn--lg" data-act="resultado">' + ic('left') + ' Volver a los resultados</button><button type="button" class="btn btn--ghost btn--lg" data-act="reintentar">Intentar nuevamente</button><button type="button" class="btn btn--ghost btn--lg" data-act="volver">Volver a evaluaciones</button></div></div>');
    generarRecomendaciones(v.querySelector('#ev-rec'));
    anunciar('Revisión detallada de respuestas.');
    enfocar(v.querySelector('[data-foco]'));
  }

  /* ---------- recomendaciones (solo desde preguntas incorrectas o sin responder) ---------- */
  function generarRecomendaciones(cont) {
    var fallos = estado.res.detalle.map(function (d, i) { return { d: d, n: i + 1 }; }).filter(function (x) { return x.d.estado !== 'ok'; });
    var html = '<h3>Temas que puedes reforzar</h3>';
    if (!fallos.length) { cont.innerHTML = html + '<p class="ev-ok">' + ic('check') + '¡Excelente! No se han identificado respuestas incorrectas en esta evaluación.</p>'; return; }
    var grupos = {}, orden = [];
    fallos.forEach(function (x) {
      var t = x.d.q.tema; if (!grupos[t]) { grupos[t] = []; orden.push(t); } grupos[t].push(x.n);
    });
    orden.sort(function (a, b) { return grupos[b].length - grupos[a].length; });
    cont.innerHTML = html + '<ul class="ev-rec__list">' + orden.map(function (t) {
      var info = TEMAS[t] || { nombre: t, descripcion: '' };
      return '<li class="card tone-2"><span class="ev-cat">Tema recomendado</span><h4>' + esc(info.nombre) + '</h4><p>' + esc(info.descripcion) + '</p><span class="ev-rel">Preguntas relacionadas: ' + grupos[t].join(', ') + '</span></li>';
    }).join('') + '</ul>';
  }

  /* ---------- repetición y salida ---------- */
  function reiniciarEvaluacion() {
    var codigo = estado.codigo;
    estado = { codigo: codigo, ev: EVS[codigo], idx: 0, resp: [], vista: 'intro', terminada: false, res: null };
    iniciarEvaluacion();
  }
  function salirALista() {
    var desde = origen;
    estado = null; app.hidden = true;
    app.querySelectorAll('[data-vista]').forEach(function (v) { v.hidden = true; v.innerHTML = ''; });
    document.body.classList.remove('ev-modo');
    var dest = document.getElementById('disponibles');
    irA(dest);
    if (desde && document.body.contains(desde)) desde.focus({ preventScroll: true });
    anunciar('Lista de evaluaciones.');
  }
  function volverAEvaluaciones() {
    if (!estado) return;
    var enCurso = !estado.terminada && (estado.vista === 'quiz' || estado.vista === 'review');
    if (!enCurso) { salirALista(); return; }
    confirmar({ titulo: '¿Deseas salir de esta evaluación?', texto: 'El progreso de este intento se perderá.',
      a: 'Continuar evaluación', b: 'Salir', onB: salirALista });
  }

  /* ---------- confirmación accesible ---------- */
  function confirmar(cfg) {
    var dlg = document.getElementById('ev-dlg');
    dlgCfg = cfg; dlgFoco = document.activeElement;
    dlg.querySelector('#ev-dlg-t').textContent = cfg.titulo;
    dlg.querySelector('#ev-dlg-d').textContent = cfg.texto;
    dlg.querySelector('#ev-dlg-a').textContent = cfg.a;
    dlg.querySelector('#ev-dlg-b').textContent = cfg.b;
    dlg.hidden = false; document.body.classList.add('hr-lock');
    dlg.querySelector('#ev-dlg-a').focus();
  }
  function cerrarConfirmacion(ejecutar) {
    var dlg = document.getElementById('ev-dlg');
    if (dlg.hidden) return;
    dlg.hidden = true; document.body.classList.remove('hr-lock');
    var cfg = dlgCfg; dlgCfg = null;
    if (ejecutar && cfg && cfg.onB) cfg.onB();
    else if (dlgFoco && dlgFoco.focus && document.body.contains(dlgFoco)) dlgFoco.focus();
  }
  function inicializarDialogo() {
    var dlg = document.getElementById('ev-dlg');
    if (!dlg) return;
    dlg.querySelector('#ev-dlg-a').addEventListener('click', function () { cerrarConfirmacion(false); });
    dlg.querySelector('#ev-dlg-b').addEventListener('click', function () { cerrarConfirmacion(true); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); cerrarConfirmacion(false); }
      if (e.key === 'Tab') {
        var f = dlg.querySelectorAll('button'), a = f[0], b = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); }
        else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); }
      }
    });
  }

  /* ---------- eventos ---------- */
  function inicializarEvaluaciones() {
    inicializarDialogo();
    document.addEventListener('click', function (e) {
      var lanz = e.target.closest('[data-ev]');
      if (lanz) { seleccionarEvaluacion(lanz.dataset.ev, lanz); return; }
      var ruta = e.target.closest('[data-route]');
      if (ruta) { e.preventDefault(); avisar('«' + ruta.textContent.trim() + '» se conectará durante la integración de TECNO GUÍA.'); return; }
      var enlace = e.target.closest('a[href^="#"]');
      if (enlace && !enlace.closest('#app')) {
        var id = enlace.getAttribute('href').slice(1), dest = id ? document.getElementById(id) : null;
        e.preventDefault();
        if (dest) { irA(dest); if (history.replaceState) history.replaceState(null, '', '#' + id); }
        return;
      }
      var b = e.target.closest('[data-act]');
      if (!b || !estado || !app.contains(b)) return;
      switch (b.dataset.act) {
        case 'comenzar': iniciarEvaluacion(); break;
        case 'volver': volverAEvaluaciones(); break;
        case 'prev': preguntaAnterior(); break;
        case 'next': siguientePregunta(); break;
        case 'ir': irAPregunta(Number(b.dataset.i)); break;
        case 'volverquiz': mostrarPregunta(true); break;
        case 'finalizar': finalizarEvaluacion(); break;
        case 'revisarresp': mostrarRevisionRespuestas(); break;
        case 'resultado': mostrarResultados(); break;
        case 'reintentar': reiniciarEvaluacion(); break;
      }
    });
    app.addEventListener('change', function (e) {
      if (e.target.name === 'resp' && estado && estado.vista === 'quiz') seleccionarRespuesta(Number(e.target.value));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !estado || document.getElementById('ev-dlg').hidden === false) return;
      if (estado.vista === 'quiz' || estado.vista === 'review') volverAEvaluaciones();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inicializarEvaluaciones);
  else inicializarEvaluaciones();
})();
