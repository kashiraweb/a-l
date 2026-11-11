/* TECNO GUÍA · Módulo Herramientas (Fase 10: funcionalidad). Independiente de la web principal. */
(function () {
  'use strict';

  /* ===== Contenido de las fichas (solo texto educativo del proyecto) ===== */
  var FICHAS = {
    fis: [
      { t: 'Destornilladores de precisión', c: 'Herramienta física · Mantenimiento', s: [
        ['Descripción', 'Son herramientas manuales utilizadas para retirar y ajustar tornillos pequeños presentes en componentes electrónicos y computadoras.'],
        ['Función principal', 'Permiten realizar tareas de ajuste y mantenimiento que requieren instrumentos de precisión.'],
        ['Usos', ['Retirar cubiertas de equipos', 'Ajustar tornillos de componentes', 'Realizar desmontajes autorizados', 'Organizar el proceso de mantenimiento']],
        ['Recomendaciones', 'Utiliza la punta y el tamaño adecuados para evitar dañar los tornillos.'],
        ['Precauciones', 'Las tareas de desmontaje interno deben realizarse únicamente con capacitación, equipo desconectado y procedimientos apropiados.']] },
      { t: 'Brochas antiestáticas', c: 'Herramienta física · Limpieza', s: [
        ['Descripción', 'Son herramientas utilizadas para retirar polvo de determinadas superficies y zonas de difícil acceso.'],
        ['Función principal', 'Su diseño permite realizar una limpieza controlada sin utilizar materiales que puedan generar cargas electrostáticas perjudiciales.'],
        ['Usos', ['Retirar polvo de superficies y zonas de difícil acceso', 'Limpieza controlada de equipos electrónicos']],
        ['Recomendaciones', 'Utilízalas con el equipo apagado y desconectado, siguiendo las precauciones correspondientes.'],
        ['Precauciones', 'No todas las brochas son adecuadas para componentes electrónicos. Deben utilizarse herramientas apropiadas y evitar generar electricidad estática.']] },
      { t: 'Paño de microfibra', c: 'Herramienta física · Limpieza', s: [
        ['Descripción', 'Es un material de limpieza suave que permite retirar polvo, huellas y suciedad superficial.'],
        ['Función principal', 'Limpiar superficies externas siguiendo las recomendaciones del fabricante.'],
        ['Usos', ['Superficies externas', 'Carcasas', 'Pantallas, utilizando productos adecuados', 'Periféricos']],
        ['Recomendaciones', 'Sigue las indicaciones del fabricante del dispositivo.'],
        ['Precauciones', 'No debe utilizarse empapado ni sustituirse por materiales abrasivos. No apliques líquido directamente sobre los dispositivos electrónicos.']] },
      { t: 'Pulsera antiestática', c: 'Herramienta física · Protección', s: [
        ['Descripción', 'Es un elemento de protección que ayuda a reducir la acumulación de electricidad estática en el cuerpo durante determinadas tareas de manipulación de componentes.'],
        ['Función principal', 'Disminuir el riesgo de descargas electrostáticas hacia componentes sensibles.'],
        ['Usos', ['Tareas de manipulación de componentes electrónicos']],
        ['Recomendaciones', 'Su utilización debe seguir las instrucciones del fabricante y las recomendaciones de seguridad del entorno de trabajo.'],
        ['Precauciones', 'No debe confundirse con un dispositivo de protección frente a descargas eléctricas de la red. No sustituye las demás medidas de protección.']] },
      { t: 'Multímetro digital', c: 'Herramienta física · Diagnóstico', s: [
        ['Descripción', 'Es un instrumento de medición que permite medir magnitudes eléctricas, como tensión, corriente y resistencia, dependiendo del modelo y de la configuración.'],
        ['Función principal', 'Realizar mediciones eléctricas en contextos técnicos apropiados.'],
        ['Usos', ['Actividades de diagnóstico realizadas por personas capacitadas']],
        ['Recomendaciones', 'Las mediciones eléctricas deben quedar a cargo de personal capacitado.'],
        ['Precauciones', 'Advertencia: los estudiantes principiantes no deben utilizarlo para realizar mediciones en circuitos conectados a la red eléctrica ni abrir fuentes de alimentación.']] },
      { t: 'Organizador de tornillos y piezas', c: 'Herramienta física · Organización', s: [
        ['Descripción', 'Es un recipiente o sistema de compartimentos que permite separar y clasificar tornillos, conectores y piezas pequeñas durante una actividad de mantenimiento.'],
        ['Función principal', 'Mantener organizados tornillos, conectores y otras piezas pequeñas.'],
        ['Usos', ['Separar y clasificar piezas durante el desmontaje y el montaje']],
        ['Recomendaciones', 'Ayuda a evitar pérdidas, confusiones y errores durante el montaje.'],
        ['Precauciones', 'No requiere precauciones específicas más allá de mantener el área de trabajo organizada.']] },
      { t: 'Linterna de inspección', c: 'Herramienta física · Inspección', s: [
        ['Descripción', 'Es una herramienta de iluminación que permite observar espacios internos o zonas con poca luz.'],
        ['Función principal', 'Permitir identificar visualmente determinadas áreas externas o espacios de trabajo.'],
        ['Usos', ['Identificar acumulaciones de polvo', 'Observar conexiones sueltas visibles', 'Detectar elementos que requieren revisión']],
        ['Recomendaciones', 'Facilita la observación de zonas oscuras sin depender de la iluminación general del ambiente.'],
        ['Precauciones', 'Cualquier revisión interna debe hacerse con el equipo apagado y desconectado, y solo con la capacitación adecuada.']] },
      { t: 'Aire comprimido para limpieza', c: 'Herramienta física · Limpieza', s: [
        ['Descripción', 'Es un producto o herramienta diseñada para expulsar polvo de determinadas zonas mediante aire.'],
        ['Función principal', 'Ayudar a retirar partículas de polvo en procedimientos de limpieza compatibles con las indicaciones del fabricante.'],
        ['Usos', ['Retirar polvo de zonas donde un paño no resulta apropiado']],
        ['Recomendaciones', 'Utilízalo siguiendo las instrucciones del fabricante. Evita inclinar los envases que indiquen que deben mantenerse verticales y no permitas que el polvo expulsado se disperse hacia las personas.'],
        ['Precauciones', 'No debe utilizarse para hacer girar ventiladores a velocidades excesivas, ni de manera improvisada.']] }
    ],
    dig: [
      { t: 'Administrador de tareas', c: 'Herramienta digital · Windows', s: [
        ['Descripción', 'Es una utilidad de Windows que permite observar los programas y procesos que se están ejecutando.'],
        ['Función', 'Su función educativa es ayudar a comprender qué recursos utiliza una computadora.'],
        ['Información que proporciona', ['Aplicaciones abiertas', 'Procesos activos', 'Uso del procesador', 'Uso de memoria', 'Actividad del disco', 'Rendimiento general']],
        ['Cuándo puede resultar útil', 'Para comprender por qué una computadora puede estar utilizando muchos recursos. Por ejemplo, para identificar una aplicación que consume mucha memoria RAM.'],
        ['Precauciones', 'Antes de cerrar un proceso, comprueba que no sea necesario para el sistema ni contenga trabajo sin guardar.']] },
      { t: 'Administrador de dispositivos', c: 'Herramienta digital · Windows', s: [
        ['Descripción', 'Es una herramienta de Windows que muestra los dispositivos de hardware reconocidos por el sistema operativo.'],
        ['Función', 'Consultar el hardware reconocido e identificar determinados problemas relacionados con controladores.'],
        ['Información que proporciona', ['Adaptadores de pantalla', 'Controladores de sonido', 'Adaptadores de red', 'Unidades de disco', 'Dispositivos USB', 'Otros componentes']],
        ['Cuándo puede resultar útil', 'Cuando un dispositivo no funciona correctamente desde el punto de vista del sistema operativo.'],
        ['Precauciones', 'Úsala para consultar. No cambies configuraciones ni controladores que no comprendas.']] },
      { t: 'Administración de discos', c: 'Herramienta digital · Windows', s: [
        ['Descripción', 'Es una utilidad de Windows que permite visualizar las unidades de almacenamiento y sus particiones.'],
        ['Función', 'Sirve para comprender cómo se organiza el almacenamiento de una computadora.'],
        ['Información que proporciona', ['Discos disponibles', 'Particiones', 'Espacio asignado', 'Unidades conectadas']],
        ['Cuándo puede resultar útil', 'Para conocer cómo está organizado el almacenamiento del equipo.'],
        ['Precauciones', 'Modificar particiones puede ocasionar pérdida de información si se realiza incorrectamente. Hazlo solo con conocimientos y copias de seguridad adecuadas.']] },
      { t: 'Monitor de recursos', c: 'Herramienta digital · Windows', s: [
        ['Descripción', 'Es una herramienta que permite observar con mayor detalle el consumo de recursos del sistema.'],
        ['Función', 'Ayudar a comprender qué procesos utilizan los recursos disponibles.'],
        ['Información que proporciona', ['CPU', 'Memoria', 'Disco', 'Red']],
        ['Cuándo puede resultar útil', 'Cuando se necesita información más detallada sobre el comportamiento del sistema.'],
        ['Precauciones', 'Es una herramienta de consulta: observa antes de intervenir en procesos.']] },
      { t: 'Monitor de rendimiento', c: 'Herramienta digital · Windows', s: [
        ['Descripción', 'Es una utilidad que permite observar indicadores del funcionamiento de Windows durante un periodo determinado.'],
        ['Función', 'Facilitar el análisis del comportamiento del sistema.'],
        ['Información que proporciona', ['Indicadores de rendimiento', 'Recursos del sistema', 'Tendencias a lo largo del tiempo']],
        ['Cuándo puede resultar útil', 'En tareas de supervisión y análisis del comportamiento del sistema.'],
        ['Precauciones', 'Es una herramienta de consulta; interpreta los indicadores con criterio antes de actuar.']] },
      { t: 'Seguridad de Windows', c: 'Herramienta digital · Protección', s: [
        ['Descripción', 'Es una herramienta integrada en Windows que proporciona acceso a distintas funciones de protección.'],
        ['Función', 'Ayudar a proteger el dispositivo frente a software malicioso y otras amenazas.'],
        ['Información que proporciona', ['Protección antivirus', 'Protección contra amenazas', 'Firewall', 'Seguridad del dispositivo', 'Opciones de protección de cuentas']],
        ['Cuándo puede resultar útil', 'Para comprobar y administrar la protección del equipo.'],
        ['Precauciones', 'No ofrece protección absoluta: debe combinarse con buenas prácticas de seguridad.']] },
      { t: 'Liberador de espacio y recomendaciones de almacenamiento', c: 'Herramienta digital · Almacenamiento', s: [
        ['Descripción', 'Son herramientas que ayudan a identificar archivos que ocupan espacio y opciones para administrar el almacenamiento.'],
        ['Función', 'Facilitar la organización de los datos y el mantenimiento del espacio disponible.'],
        ['Información que proporciona', ['Estado del almacenamiento', 'Categorías de archivos', 'Archivos temporales', 'Opciones de limpieza']],
        ['Cuándo puede resultar útil', 'Cuando se quiere controlar el espacio disponible y mantener el almacenamiento organizado.'],
        ['Precauciones', 'Antes de eliminar cualquier archivo, comprueba qué contiene y si realmente puedes eliminarlo.']] },
      { t: 'Información del sistema', c: 'Herramienta digital · Windows', s: [
        ['Descripción', 'Es una utilidad que presenta información técnica del equipo.'],
        ['Función', 'Permitir conocer mejor las características técnicas de una computadora.'],
        ['Información que proporciona', ['Fabricante', 'Modelo', 'Procesador', 'Memoria instalada', 'Versión del sistema operativo', 'Información del BIOS', 'Componentes y recursos del sistema']],
        ['Cuándo puede resultar útil', 'Para conocer las características generales de un equipo.'],
        ['Precauciones', 'Es una herramienta de consulta; no modifiques datos de configuración que no comprendas.']] }
    ],
    sof: [
      { t: 'Visual Studio Code', c: 'Software · Desarrollo', s: [
        ['Descripción', 'Es un editor de código fuente utilizado para desarrollar proyectos de programación.'],
        ['Función principal', 'Escribir, organizar y revisar código.'],
        ['Características', ['HTML', 'CSS', 'JavaScript', 'Python', 'PHP', 'Otros lenguajes mediante extensiones']],
        ['Ejemplo de utilización', 'Escribir y organizar los archivos HTML, CSS y JavaScript de una página web.'],
        ['Útil para', 'Estudiantes y personas que programan o desarrollan aplicaciones.']] },
      { t: 'Google Chrome', c: 'Software · Navegador', s: [
        ['Descripción', 'Es un navegador web que permite acceder a páginas de Internet.'],
        ['Función principal', 'Navegar por la web y consultar recursos en línea.'],
        ['Características', ['Herramientas para desarrolladores', 'Inspección de elementos HTML', 'Revisión de estilos CSS', 'Análisis de errores JavaScript']],
        ['Ejemplo de utilización', 'Inspeccionar un elemento de una página para revisar su HTML y CSS.'],
        ['Útil para', 'Cualquier persona que navega por Internet y quienes desarrollan aplicaciones web.']] },
      { t: 'Mozilla Firefox', c: 'Software · Navegador', s: [
        ['Descripción', 'Es un navegador web que permite visitar páginas y utilizar herramientas de desarrollo para inspeccionar y analizar sitios web.'],
        ['Función principal', 'Navegar por la web y probar aplicaciones web.'],
        ['Características', ['Navegación', 'Gestión de marcadores', 'Herramientas para desarrolladores', 'Administración de extensiones']],
        ['Ejemplo de utilización', 'Comprobar cómo se ve y se comporta una página en un navegador alternativo.'],
        ['Útil para', 'Usuarios que navegan y personas que prueban o analizan sitios web.']] },
      { t: '7-Zip', c: 'Software · Compresión', s: [
        ['Descripción', 'Es un programa de compresión y descompresión de archivos.'],
        ['Función principal', 'Facilitar la organización y distribución de archivos.'],
        ['Características', ['Formato 7z', 'Formato ZIP', 'Formato TAR', 'Formato GZIP']],
        ['Ejemplo de utilización', 'Comprimir la carpeta de un proyecto para guardarla o enviarla.'],
        ['Útil para', 'Quienes necesitan almacenar, organizar o transferir archivos.']] },
      { t: 'Git', c: 'Software · Control de versiones', s: [
        ['Descripción', 'Es un sistema de control de versiones.'],
        ['Función principal', 'Registrar los cambios realizados en los archivos de un proyecto.'],
        ['Características', ['Registrar modificaciones', 'Consultar versiones anteriores', 'Trabajar con diferentes ramas']],
        ['Ejemplo de utilización', 'Registrar los cambios de un proyecto y consultar cómo estaba en una versión anterior.'],
        ['Útil para', 'Personas que programan y equipos que colaboran en un mismo proyecto.']] },
      { t: 'Postman', c: 'Software · Pruebas de API', s: [
        ['Descripción', 'Es una plataforma utilizada para probar y documentar APIs.'],
        ['Función principal', 'Enviar solicitudes HTTP y revisar las respuestas recibidas.'],
        ['Características', ['Crear solicitudes HTTP', 'Consultar respuestas', 'Organizar peticiones', 'Documentar y probar servicios']],
        ['Ejemplo de utilización', 'Enviar una solicitud a un servicio web y revisar la respuesta obtenida.'],
        ['Útil para', 'Quienes desarrollan o prueban servicios web y APIs.']] },
      { t: 'MySQL Workbench', c: 'Software · Bases de datos', s: [
        ['Descripción', 'Es una herramienta gráfica para trabajar con bases de datos MySQL.'],
        ['Función principal', 'Administrar y consultar bases de datos MySQL de forma visual.'],
        ['Características', ['Crear conexiones', 'Ejecutar consultas SQL', 'Administrar bases de datos', 'Diseñar modelos', 'Visualizar estructuras de tablas']],
        ['Ejemplo de utilización', 'Ejecutar una consulta SQL y observar la estructura de las tablas.'],
        ['Útil para', 'Quienes aprenden o administran bases de datos.']] },
      { t: 'XAMPP', c: 'Software · Entorno local', s: [
        ['Descripción', 'Es un paquete de software que facilita la creación de entornos locales de desarrollo web.'],
        ['Función principal', 'Practicar el desarrollo de aplicaciones web en un equipo local.'],
        ['Características', ['Apache', 'MariaDB', 'PHP', 'Perl']],
        ['Ejemplo de utilización', 'Ejecutar un servidor local para probar una aplicación web.'],
        ['Útil para', 'Quienes practican desarrollo web en su propio equipo.']] }
    ],
    pro: [
      { t: 'Protección antiestática', c: 'Protección', s: [
        ['Qué es', 'Son medidas y elementos destinados a reducir los riesgos relacionados con la electricidad estática durante la manipulación de componentes electrónicos.'],
        ['Para qué sirve', 'Para reducir el riesgo de descargas electrostáticas que pueden afectar a componentes sensibles.'],
        ['Cómo contribuye a proteger un equipo', 'Mediante elementos como pulseras antiestáticas y superficies apropiadas de trabajo.'],
        ['Cuándo puede resultar útil', 'Al manipular componentes electrónicos sensibles.'],
        ['Limitaciones', 'No protege frente a descargas eléctricas de la red y no sustituye las demás medidas de seguridad.']] },
      { t: 'Protección contra sobretensiones', c: 'Protección', s: [
        ['Qué es', 'Son dispositivos diseñados para ayudar a proteger los equipos frente a determinadas variaciones o picos de tensión.'],
        ['Para qué sirve', 'Para reducir el efecto de variaciones de la alimentación eléctrica sobre equipos eléctricos y electrónicos.'],
        ['Cómo contribuye a proteger un equipo', 'Mediante protectores de sobretensión apropiados para el equipo.'],
        ['Cuándo puede resultar útil', 'Cuando el equipo está conectado a una alimentación con posibles variaciones de tensión.'],
        ['Limitaciones', 'Ayudan frente a determinadas variaciones; no ofrecen protección absoluta.']] },
      { t: 'Sistemas de alimentación ininterrumpida (UPS)', c: 'Protección', s: [
        ['Qué es', 'Un UPS es un sistema de alimentación ininterrumpida que proporciona energía temporal mediante una batería cuando se interrumpe el suministro eléctrico.'],
        ['Para qué sirve', 'Mantener temporalmente la alimentación y facilitar el apagado adecuado del equipo.'],
        ['Cómo contribuye a proteger un equipo', 'Reduce determinados riesgos relacionados con cortes eléctricos. También puede ayudar a gestionar variaciones eléctricas, dependiendo de sus características.'],
        ['Cuándo puede resultar útil', 'Ante interrupciones del suministro eléctrico.'],
        ['Limitaciones', 'Proporciona energía solo de forma temporal y no ofrece protección absoluta.']] },
      { t: 'Copias de seguridad', c: 'Protección', s: [
        ['Qué es', 'Consisten en crear duplicados de información importante para poder recuperarla en caso de pérdida, daño o fallo de almacenamiento.'],
        ['Para qué sirve', 'Recuperar información cuando se produce una pérdida accidental.'],
        ['Cómo contribuye a proteger un equipo', 'Protege la información mediante medios como discos externos, almacenamiento en la nube u otros respaldos apropiados.'],
        ['Cuándo puede resultar útil', 'Ante pérdida, daño o fallo de almacenamiento, y antes de cambios importantes como modificar particiones.'],
        ['Limitaciones', 'Debe mantenerse organizada y verificarse periódicamente; una copia sin revisar puede no servir cuando se necesite.']] },
      { t: 'Software antivirus', c: 'Protección', s: [
        ['Qué es', 'Es un software diseñado para detectar, bloquear y ayudar a eliminar programas maliciosos.'],
        ['Para qué sirve', 'Analizar archivos, detectar amenazas y supervisar actividades sospechosas.'],
        ['Cómo contribuye a proteger un equipo', 'Ayuda a mantener el sistema protegido frente a software malicioso.'],
        ['Cuándo puede resultar útil', 'De forma continua, al descargar, abrir o analizar archivos.'],
        ['Limitaciones', 'Debe mantenerse actualizado y utilizarse junto con buenas prácticas de seguridad; no garantiza protección absoluta.']] },
      { t: 'Actualizaciones de seguridad', c: 'Protección', s: [
        ['Qué es', 'Son modificaciones de software que corrigen vulnerabilidades y mejoran la protección de los sistemas.'],
        ['Para qué sirve', 'Corregir vulnerabilidades y mejorar la protección del software.'],
        ['Cómo contribuye a proteger un equipo', 'Mantener los programas actualizados contribuye a reducir determinados riesgos informáticos.'],
        ['Cuándo puede resultar útil', 'Cada vez que los desarrolladores distribuyen correcciones para el sistema o los programas.'],
        ['Limitaciones', 'Reducen determinados riesgos, pero no los eliminan por completo.']] }
    ]
  };

  var header = document.querySelector('.navbar');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var toastEl, toastTimer, backTop;

  function norm(t) { return String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); }

  /* ===== Aviso accesible (para enlaces de páginas aún no integradas) ===== */
  function avisar(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 3600);
  }

  /* ===== Navegación: página actual y rutas futuras ===== */
  function inicializarMenu() {
    document.addEventListener('click', function (e) {
      var r = e.target.closest('[data-route]');
      if (!r) return;
      e.preventDefault();
      var nombre = r.textContent.trim();
      avisar(r.dataset.route === 'siguiente'
        ? 'La continuación del aprendizaje se conectará durante la integración.'
        : '«' + nombre + '» se conectará durante la integración de TECNO GUÍA.');
    });
  }

  /* ===== Desplazamiento interno con compensación del encabezado ===== */
  function irA(el) {
    if (!el) return;
    var off = header ? header.offsetHeight + 12 : 12;
    var top = el.id === 'top' ? 0 : el.getBoundingClientRect().top + window.pageYOffset - off;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce.matches ? 'auto' : 'smooth' });
  }
  function inicializarNavegacionInterna() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a || a.hasAttribute('data-route')) return;
      var id = a.getAttribute('href').slice(1);
      var destino = id ? document.getElementById(id) : null;
      e.preventDefault();
      if (!destino) return;
      irA(destino);
      if (history.replaceState) history.replaceState(null, '', '#' + id);
      if (!destino.hasAttribute('tabindex')) destino.setAttribute('tabindex', '-1');
      destino.focus({ preventScroll: true });
    });
  }

  /* ===== Categorías: tarjetas como accesos a su sección ===== */
  function inicializarCategorias() {
    document.querySelectorAll('.hr-catcard').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a') || String(window.getSelection())) return;
        var d = document.getElementById(card.dataset.target);
        irA(d);
        card.classList.add('is-flash');
        setTimeout(function () { card.classList.remove('is-flash'); }, 1700);
        if (d) { d.setAttribute('tabindex', '-1'); d.focus({ preventScroll: true }); }
      });
    });
  }

  /* ===== Modal reutilizable ===== */
  var modal = null, ultimoFoco = null;
  function crearModal() {
    var ov = document.createElement('div');
    ov.className = 'hr-modal'; ov.hidden = true;
    ov.innerHTML = '<div class="hr-modal__box" role="dialog" aria-modal="true" aria-labelledby="hr-modal-title" tabindex="-1">' +
      '<button type="button" class="hr-modal__close" aria-label="Cerrar ficha"><svg class="ico"><use href="#i-x"/></svg></button>' +
      '<span class="hr-cat" id="hr-modal-cat"></span><h3 id="hr-modal-title"></h3><div class="hr-modal__body" id="hr-modal-body"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) cerrarModal(); });
    ov.querySelector('.hr-modal__close').addEventListener('click', cerrarModal);
    ov.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = ov.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ov.firstChild)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    return ov;
  }
  function abrirModal(ficha, origen) {
    if (!ficha) return;
    if (!modal) modal = crearModal();
    if (!modal.hidden) return; // evita aperturas simultáneas
    ultimoFoco = origen || document.activeElement;
    modal.querySelector('#hr-modal-title').textContent = ficha.t;
    modal.querySelector('#hr-modal-cat').textContent = ficha.c;
    var body = modal.querySelector('#hr-modal-body');
    body.textContent = '';
    ficha.s.forEach(function (par) {
      var sec = document.createElement('section');
      var h = document.createElement('h4'); h.textContent = par[0];
      if (/^Precauci|^Limitac/.test(par[0])) sec.className = 'is-warn';
      sec.appendChild(h);
      if (Array.isArray(par[1])) {
        var ul = document.createElement('ul');
        par[1].forEach(function (x) { var li = document.createElement('li'); li.textContent = x; ul.appendChild(li); });
        sec.appendChild(ul);
      } else { var p = document.createElement('p'); p.textContent = par[1]; sec.appendChild(p); }
      body.appendChild(sec);
    });
    modal.hidden = false;
    document.body.classList.add('hr-lock');
    modal.querySelector('.hr-modal__box').scrollTop = 0;
    modal.querySelector('.hr-modal__close').focus();
  }
  function cerrarModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('hr-lock');
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }

  /* ===== Tarjetas: fichas informativas ===== */
  function inicializarTarjetas() {
    document.querySelectorAll('[data-ficha]').forEach(function (btn) {
      var partes = btn.dataset.ficha.split('-');
      var ficha = (FICHAS[partes[0]] || [])[Number(partes[1])];
      if (!ficha) { btn.hidden = true; return; }
      btn.addEventListener('click', function () { abrirModal(ficha, btn); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarModal(); });
  }

  /* ===== Glosario ===== */
  function inicializarGlosario() {
    var input = document.getElementById('gl-input'), clear = document.getElementById('gl-clear');
    var status = document.getElementById('gl-status'), empty = document.getElementById('gl-empty');
    var items = Array.prototype.slice.call(document.querySelectorAll('#gl-list .mini'));
    if (!input || !items.length) return;
    var datos = items.map(function (el) {
      return { el: el, hay: norm(el.querySelector('dt').textContent + ' ' + el.querySelector('dd').textContent) };
    });
    function filtrarGlosario() {
      var tokens = norm(input.value).split(/\s+/).filter(Boolean), n = 0;
      datos.forEach(function (d) {
        var ok = tokens.every(function (t) { return d.hay.indexOf(t) > -1; });
        d.el.hidden = !ok;
        if (ok) n++;
      });
      clear.hidden = !input.value;
      empty.hidden = n > 0;
      status.textContent = !tokens.length ? 'Mostrando los ' + datos.length + ' términos.'
        : n ? n + (n === 1 ? ' término encontrado.' : ' términos encontrados.') : 'Sin resultados para «' + input.value.trim() + '».';
    }
    input.addEventListener('input', filtrarGlosario);
    clear.addEventListener('click', function () { input.value = ''; filtrarGlosario(); input.focus(); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Escape' && input.value) { input.value = ''; filtrarGlosario(); } });
  }

  /* ===== Volver arriba ===== */
  function inicializarVolverArriba() {
    backTop = document.createElement('button');
    backTop.type = 'button'; backTop.className = 'to-top';
    backTop.setAttribute('aria-label', 'Volver arriba'); backTop.tabIndex = -1;
    backTop.innerHTML = '<svg class="ico"><use href="#i-arrow"/></svg>';
    document.body.appendChild(backTop);
    var tick = false;
    function actualizar() {
      var ver = window.pageYOffset > window.innerHeight * 0.8;
      backTop.classList.toggle('is-visible', ver);
      backTop.tabIndex = ver ? 0 : -1;
      tick = false;
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(actualizar); } }, { passive: true });
    backTop.addEventListener('click', function () { irA(document.getElementById('top')); });
    actualizar();
  }

  function inicializarHerramientas() {
    inicializarMenu();
    inicializarNavegacionInterna();
    inicializarCategorias();
    inicializarTarjetas();
    inicializarGlosario();
    inicializarVolverArriba();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inicializarHerramientas);
  else inicializarHerramientas();
})();
