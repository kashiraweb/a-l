/* TECNO GUÍA · Datos de las evaluaciones (Fase 12). Las respuestas correctas se usan solo para calcular resultados. */
(function(){'use strict';
window.TG_TEMAS={
 "T1": {
  "nombre": "Conceptos básicos de informática",
  "descripcion": "Repasa qué es la informática, el hardware y el software, y cómo se organiza el funcionamiento de una computadora."
 },
 "T2": {
  "nombre": "Entrada, procesamiento y salida",
  "descripcion": "Vuelve a estudiar cómo una computadora recibe, procesa y muestra la información, y qué dispositivos intervienen en cada etapa."
 },
 "T3": {
  "nombre": "Archivos y datos",
  "descripcion": "Repasa qué son los archivos, para qué sirven sus extensiones y cómo se organiza la información digital."
 },
 "T4": {
  "nombre": "Componentes internos de una computadora",
  "descripcion": "Te recomendamos repasar las funciones de los componentes internos, especialmente el procesador, la placa madre, la fuente de alimentación y los elementos relacionados con el procesamiento."
 },
 "T5": {
  "nombre": "Memoria y almacenamiento",
  "descripcion": "Repasa la diferencia entre la memoria temporal (RAM) y el almacenamiento permanente (SSD y HDD)."
 },
 "T6": {
  "nombre": "Software y sistemas operativos",
  "descripcion": "Vuelve a estudiar los tipos de software, las funciones del sistema operativo y la utilidad de los controladores."
 },
 "T7": {
  "nombre": "Protección y actualización del software",
  "descripcion": "Repasa qué hace un antivirus y por qué es importante actualizar los programas."
 },
 "T8": {
  "nombre": "Mantenimiento informático",
  "descripcion": "Repasa las diferencias entre mantenimiento preventivo y correctivo, las herramientas y las recomendaciones de seguridad."
 },
 "T9": {
  "nombre": "Seguridad en el trabajo técnico",
  "descripcion": "Repasa las precauciones al manipular equipos: electricidad estática, baterías, limpieza segura y cuándo pedir ayuda a una persona capacitada."
 },
 "T10": {
  "nombre": "Herramientas físicas",
  "descripcion": "Repasa para qué sirve cada herramienta física de mantenimiento y diagnóstico, y sus precauciones de uso."
 },
 "T11": {
  "nombre": "Herramientas digitales y de desarrollo",
  "descripcion": "Repasa las utilidades de Windows para consultar el sistema y los programas de desarrollo como Visual Studio Code, Git, Postman, MySQL Workbench y XAMPP."
 },
 "T12": {
  "nombre": "Diagnóstico y solución de problemas",
  "descripcion": "Repasa cómo observar los síntomas, identificar posibles causas y realizar comprobaciones seguras ante un problema informático."
 },
 "T13": {
  "nombre": "Protección de datos y almacenamiento",
  "descripcion": "Repasa la importancia de las copias de seguridad y las precauciones antes de modificar unidades de almacenamiento."
 },
 "T14": {
  "nombre": "Protección eléctrica y respaldo de energía",
  "descripcion": "Repasa cómo ayudan los sistemas de alimentación ininterrumpida (UPS) cuando se interrumpe el suministro eléctrico."
 }
};
window.TG_EVALUACIONES={
 "E01": {
  "codigo": "E01",
  "nombre": "Fundamentos de computación",
  "categoria": "Fundamentos de computación",
  "dificultad": "Básico",
  "preguntas": [
   {
    "id": "E01-P01",
    "pregunta": "¿Qué es la informática?",
    "opciones": [
     "El estudio exclusivo de los videojuegos.",
     "La ciencia que estudia el tratamiento automático de la información mediante sistemas informáticos.",
     "Una herramienta utilizada únicamente para escribir documentos.",
     "Un componente físico de la computadora."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "La informática estudia el tratamiento automático de la información mediante sistemas informáticos; no se limita a los videojuegos ni a un solo programa.",
    "categoria": "Fundamentos de computación",
    "tema": "T1"
   },
   {
    "id": "E01-P02",
    "pregunta": "¿Cuál de los siguientes elementos pertenece al hardware?",
    "opciones": [
     "Windows.",
     "Microsoft Word.",
     "Teclado.",
     "Navegador web."
    ],
    "respuestaCorrecta": 2,
    "explicacion": "El hardware son los componentes físicos: el teclado se puede tocar, mientras que Windows, Word y el navegador son software.",
    "categoria": "Fundamentos de computación",
    "tema": "T1"
   },
   {
    "id": "E01-P03",
    "pregunta": "¿Qué es el software?",
    "opciones": [
     "El conjunto de programas e instrucciones que permiten realizar tareas en una computadora.",
     "Una pieza física instalada en la placa madre.",
     "Un cable de alimentación.",
     "Un dispositivo de almacenamiento magnético."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El software es el conjunto de programas e instrucciones que permiten a la computadora realizar tareas; no es una pieza física.",
    "categoria": "Fundamentos de computación",
    "tema": "T1"
   },
   {
    "id": "E01-P04",
    "pregunta": "¿Cuál es la función principal de un sistema operativo?",
    "opciones": [
     "Fabricar componentes electrónicos.",
     "Administrar los recursos de la computadora y permitir la ejecución de aplicaciones.",
     "Aumentar físicamente la memoria RAM.",
     "Limpiar automáticamente todos los componentes."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "El sistema operativo administra los recursos del equipo (procesador, memoria, almacenamiento) y permite ejecutar aplicaciones.",
    "categoria": "Fundamentos de computación",
    "tema": "T6"
   },
   {
    "id": "E01-P05",
    "pregunta": "¿Qué componente ejecuta instrucciones y realiza operaciones fundamentales?",
    "opciones": [
     "Monitor.",
     "Teclado.",
     "CPU.",
     "Impresora."
    ],
    "respuestaCorrecta": 2,
    "explicacion": "La CPU es la unidad central de procesamiento. Ejecuta instrucciones y realiza operaciones fundamentales para el funcionamiento de una computadora.",
    "categoria": "Fundamentos de computación",
    "tema": "T4"
   },
   {
    "id": "E01-P06",
    "pregunta": "¿Cuál es una función de la memoria RAM?",
    "opciones": [
     "Almacenar temporalmente datos utilizados por programas en ejecución.",
     "Mostrar imágenes en el monitor.",
     "Proporcionar energía eléctrica.",
     "Conectar físicamente el teclado."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "La RAM almacena temporalmente los datos e instrucciones que usan los programas mientras se ejecutan.",
    "categoria": "Fundamentos de computación",
    "tema": "T5"
   },
   {
    "id": "E01-P07",
    "pregunta": "¿Cuál de los siguientes dispositivos permite introducir información?",
    "opciones": [
     "Monitor.",
     "Impresora.",
     "Teclado.",
     "Altavoz."
    ],
    "respuestaCorrecta": 2,
    "explicacion": "El teclado es un dispositivo de entrada: permite introducir información en la computadora. Monitor, impresora y altavoz entregan información.",
    "categoria": "Fundamentos de computación",
    "tema": "T2"
   },
   {
    "id": "E01-P08",
    "pregunta": "¿Qué representa la etapa de procesamiento?",
    "opciones": [
     "La ejecución de operaciones sobre los datos recibidos.",
     "La impresión de documentos.",
     "La conexión a Internet.",
     "La limpieza física del equipo."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El procesamiento es la etapa en la que se ejecutan operaciones sobre los datos recibidos.",
    "categoria": "Fundamentos de computación",
    "tema": "T2"
   },
   {
    "id": "E01-P09",
    "pregunta": "¿Cuál es un ejemplo de dispositivo de salida?",
    "opciones": [
     "Ratón.",
     "Teclado.",
     "Escáner.",
     "Monitor."
    ],
    "respuestaCorrecta": 3,
    "explicacion": "El monitor muestra información al usuario, por eso es un dispositivo de salida. Ratón, teclado y escáner son de entrada.",
    "categoria": "Fundamentos de computación",
    "tema": "T2"
   },
   {
    "id": "E01-P10",
    "pregunta": "¿Qué es un archivo informático?",
    "opciones": [
     "Una unidad de procesamiento.",
     "Un conjunto organizado de datos almacenados digitalmente.",
     "Un dispositivo físico de entrada.",
     "Un sistema de refrigeración."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Un archivo es un conjunto organizado de datos almacenados digitalmente, como un documento, una imagen o un programa.",
    "categoria": "Fundamentos de computación",
    "tema": "T3"
   }
  ]
 },
 "E02": {
  "codigo": "E02",
  "nombre": "Hardware y componentes",
  "categoria": "Hardware",
  "dificultad": "Básico",
  "preguntas": [
   {
    "id": "E02-P01",
    "pregunta": "¿Qué es el hardware?",
    "opciones": [
     "El conjunto de programas instalados.",
     "Los componentes físicos de una computadora.",
     "Una conexión a Internet.",
     "Un sistema operativo."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "El hardware está formado por los componentes físicos de una computadora, como el teclado, el monitor, el procesador y la memoria RAM.",
    "categoria": "Hardware",
    "tema": "T1"
   },
   {
    "id": "E02-P02",
    "pregunta": "¿Qué función cumple la placa madre?",
    "opciones": [
     "Mostrar imágenes.",
     "Conectar y permitir la comunicación entre diferentes componentes.",
     "Imprimir documentos.",
     "Almacenar exclusivamente fotografías."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "La placa madre conecta los componentes del equipo y permite que se comuniquen entre sí.",
    "categoria": "Hardware",
    "tema": "T4"
   },
   {
    "id": "E02-P03",
    "pregunta": "¿Qué componente almacena temporalmente los datos utilizados por los programas?",
    "opciones": [
     "RAM.",
     "HDD.",
     "Fuente de alimentación.",
     "Monitor."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "La RAM guarda de forma temporal los datos que usan los programas en ejecución.",
    "categoria": "Hardware",
    "tema": "T5"
   },
   {
    "id": "E02-P04",
    "pregunta": "¿Qué función cumple la fuente de alimentación?",
    "opciones": [
     "Procesar instrucciones.",
     "Proporcionar energía eléctrica adecuada a los componentes del equipo.",
     "Almacenar archivos.",
     "Controlar el navegador."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "La fuente de alimentación entrega energía eléctrica adecuada a los componentes del equipo.",
    "categoria": "Hardware",
    "tema": "T4"
   },
   {
    "id": "E02-P05",
    "pregunta": "¿Qué componente se utiliza principalmente para almacenar información de forma permanente?",
    "opciones": [
     "RAM.",
     "CPU.",
     "SSD.",
     "Ventilador."
    ],
    "respuestaCorrecta": 2,
    "explicacion": "Un SSD conserva la información de forma permanente, aunque el equipo se apague; la RAM es temporal.",
    "categoria": "Hardware",
    "tema": "T5"
   },
   {
    "id": "E02-P06",
    "pregunta": "¿Cuál es la función principal de la CPU?",
    "opciones": [
     "Ejecutar instrucciones y procesar datos.",
     "Mostrar imágenes.",
     "Refrigerar el equipo.",
     "Conectar dispositivos USB."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "La CPU ejecuta instrucciones y procesa datos.",
    "categoria": "Hardware",
    "tema": "T4"
   },
   {
    "id": "E02-P07",
    "pregunta": "¿Qué componente ayuda a procesar y generar gráficos?",
    "opciones": [
     "GPU.",
     "Teclado.",
     "Fuente de alimentación.",
     "Unidad óptica."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "La GPU (unidad de procesamiento gráfico) ayuda a procesar y generar gráficos.",
    "categoria": "Hardware",
    "tema": "T4"
   },
   {
    "id": "E02-P08",
    "pregunta": "¿Qué función cumplen los ventiladores de una computadora?",
    "opciones": [
     "Guardar documentos.",
     "Ayudar a mantener una temperatura adecuada mediante la circulación del aire.",
     "Ejecutar programas.",
     "Administrar archivos."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Los ventiladores hacen circular el aire para ayudar a mantener una temperatura adecuada dentro del equipo.",
    "categoria": "Hardware",
    "tema": "T4"
   },
   {
    "id": "E02-P09",
    "pregunta": "¿Cuál de estos elementos es un periférico de entrada?",
    "opciones": [
     "Monitor.",
     "Altavoz.",
     "Ratón.",
     "Impresora."
    ],
    "respuestaCorrecta": 2,
    "explicacion": "El ratón es un periférico de entrada. El monitor, el altavoz y la impresora entregan información (salida).",
    "categoria": "Hardware",
    "tema": "T2"
   },
   {
    "id": "E02-P10",
    "pregunta": "¿Qué diferencia principal existe entre RAM y almacenamiento SSD?",
    "opciones": [
     "La RAM es temporal y el SSD conserva información sin depender de que el equipo permanezca encendido.",
     "Ambos cumplen exactamente la misma función.",
     "El SSD procesa todas las instrucciones de la CPU.",
     "La RAM es un dispositivo de salida."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "La RAM es temporal y sirve a los programas en ejecución; el SSD conserva la información sin depender de que el equipo permanezca encendido.",
    "categoria": "Hardware",
    "tema": "T5"
   }
  ]
 },
 "E03": {
  "codigo": "E03",
  "nombre": "Software y sistemas operativos",
  "categoria": "Software",
  "dificultad": "Básico",
  "preguntas": [
   {
    "id": "E03-P01",
    "pregunta": "¿Qué es un sistema operativo?",
    "opciones": [
     "Un dispositivo físico.",
     "Un programa que administra los recursos del equipo y permite ejecutar aplicaciones.",
     "Un cable de datos.",
     "Un componente de refrigeración."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Un sistema operativo es el software principal que administra los recursos del equipo y permite ejecutar aplicaciones.",
    "categoria": "Software",
    "tema": "T6"
   },
   {
    "id": "E03-P02",
    "pregunta": "¿Cuál de los siguientes es un sistema operativo?",
    "opciones": [
     "Windows.",
     "HDMI.",
     "USB.",
     "RAM."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Windows es un sistema operativo. HDMI y USB son tipos de conexión y la RAM es un componente de hardware.",
    "categoria": "Software",
    "tema": "T6"
   },
   {
    "id": "E03-P03",
    "pregunta": "¿Qué es un controlador?",
    "opciones": [
     "Una herramienta de limpieza.",
     "Un programa que permite al sistema operativo comunicarse con un dispositivo de hardware.",
     "Un dispositivo de almacenamiento.",
     "Una pieza de la fuente de alimentación."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Un controlador permite que el sistema operativo se comunique con un dispositivo de hardware.",
    "categoria": "Software",
    "tema": "T6"
   },
   {
    "id": "E03-P04",
    "pregunta": "¿Cuál es la función de un navegador web?",
    "opciones": [
     "Permitir acceder y visualizar páginas web.",
     "Refrigerar el procesador.",
     "Aumentar la memoria RAM.",
     "Administrar la energía de la fuente."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Un navegador web permite acceder y visualizar páginas de Internet.",
    "categoria": "Software",
    "tema": "T6"
   },
   {
    "id": "E03-P05",
    "pregunta": "¿Qué es una aplicación informática?",
    "opciones": [
     "Un componente físico.",
     "Un programa diseñado para realizar determinadas tareas.",
     "Un cable de conexión.",
     "Una unidad de almacenamiento."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Una aplicación informática es un programa diseñado para realizar determinadas tareas, como escribir documentos o navegar.",
    "categoria": "Software",
    "tema": "T6"
   },
   {
    "id": "E03-P06",
    "pregunta": "¿Qué significa actualizar un programa?",
    "opciones": [
     "Eliminar permanentemente todos sus archivos.",
     "Instalar modificaciones que pueden corregir errores, mejorar funciones o reforzar la seguridad.",
     "Desconectar el equipo.",
     "Cambiar la placa madre."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Actualizar un programa instala modificaciones que pueden corregir errores, mejorar funciones o reforzar la seguridad.",
    "categoria": "Software",
    "tema": "T7"
   },
   {
    "id": "E03-P07",
    "pregunta": "¿Qué es un antivirus?",
    "opciones": [
     "Un programa de protección frente a software malicioso.",
     "Una herramienta para aumentar el almacenamiento físico.",
     "Un dispositivo de entrada.",
     "Un sistema de refrigeración."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Un antivirus es un programa que detecta, bloquea y ayuda a eliminar software malicioso.",
    "categoria": "Software",
    "tema": "T7"
   },
   {
    "id": "E03-P08",
    "pregunta": "¿Qué es un archivo ejecutable?",
    "opciones": [
     "Un documento exclusivamente impreso.",
     "Un archivo que contiene instrucciones que pueden ejecutarse mediante el sistema operativo.",
     "Una pieza electrónica.",
     "Una conexión de red."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Un archivo ejecutable contiene instrucciones que el sistema operativo puede ejecutar.",
    "categoria": "Software",
    "tema": "T3"
   },
   {
    "id": "E03-P09",
    "pregunta": "¿Qué es una extensión de archivo?",
    "opciones": [
     "Una indicación que identifica el tipo o formato de un archivo.",
     "Una memoria RAM adicional.",
     "Una parte del procesador.",
     "Una herramienta para limpiar pantallas."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "La extensión de archivo identifica el tipo o formato de un archivo.",
    "categoria": "Software",
    "tema": "T3"
   },
   {
    "id": "E03-P10",
    "pregunta": "¿Qué es un programa de código abierto?",
    "opciones": [
     "Un programa cuyo código fuente está disponible bajo una licencia que permite determinados usos, estudio y modificaciones.",
     "Un programa que siempre necesita Internet.",
     "Un archivo que no puede modificarse.",
     "Un sistema operativo sin archivos."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "En un programa de código abierto, el código fuente está disponible bajo una licencia que permite determinados usos, estudio y modificaciones.",
    "categoria": "Software",
    "tema": "T6"
   }
  ]
 },
 "E04": {
  "codigo": "E04",
  "nombre": "Mantenimiento informático",
  "categoria": "Mantenimiento informático",
  "dificultad": "Intermedio",
  "preguntas": [
   {
    "id": "E04-P01",
    "pregunta": "¿Qué es el mantenimiento preventivo?",
    "opciones": [
     "Una reparación realizada únicamente después de una avería.",
     "Un conjunto de acciones periódicas destinadas a reducir la posibilidad de fallos.",
     "La eliminación de todos los programas.",
     "El cambio obligatorio de la computadora."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "El mantenimiento preventivo reúne acciones periódicas para reducir la posibilidad de fallos.",
    "categoria": "Mantenimiento informático",
    "tema": "T8"
   },
   {
    "id": "E04-P02",
    "pregunta": "¿Qué es el mantenimiento correctivo?",
    "opciones": [
     "Una actividad destinada a solucionar fallos que ya se han presentado.",
     "Una limpieza diaria del escritorio.",
     "Una actualización de documentos.",
     "Una técnica de programación."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El mantenimiento correctivo busca solucionar fallos que ya se han presentado.",
    "categoria": "Mantenimiento informático",
    "tema": "T8"
   },
   {
    "id": "E04-P03",
    "pregunta": "¿Por qué es importante mantener limpia una computadora?",
    "opciones": [
     "Para cambiar su sistema operativo.",
     "Para reducir la acumulación de polvo que puede afectar el funcionamiento y la refrigeración.",
     "Para aumentar automáticamente su memoria.",
     "Para modificar su procesador."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "La limpieza reduce el polvo acumulado, que puede afectar la refrigeración y el funcionamiento del equipo.",
    "categoria": "Mantenimiento informático",
    "tema": "T8"
   },
   {
    "id": "E04-P04",
    "pregunta": "¿Qué se debe hacer antes de realizar una limpieza física del equipo?",
    "opciones": [
     "Mantenerlo conectado y encendido.",
     "Apagarlo y desconectarlo de la alimentación eléctrica cuando corresponda.",
     "Ejecutar todos los programas.",
     "Aumentar la velocidad del ventilador."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Antes de una limpieza física conviene apagar y desconectar el equipo, para reducir riesgos para la persona y para los componentes.",
    "categoria": "Mantenimiento informático",
    "tema": "T9"
   },
   {
    "id": "E04-P05",
    "pregunta": "¿Qué herramienta se utiliza para ajustar tornillos pequeños?",
    "opciones": [
     "Paño de microfibra.",
     "Destornillador de precisión.",
     "Monitor de recursos.",
     "Antivirus."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "El destornillador de precisión se utiliza para ajustar o retirar tornillos pequeños de dispositivos electrónicos.",
    "categoria": "Mantenimiento informático",
    "tema": "T10"
   },
   {
    "id": "E04-P06",
    "pregunta": "¿Qué es la electricidad estática?",
    "opciones": [
     "Una aplicación de Windows.",
     "La acumulación de cargas eléctricas en la superficie de un material.",
     "Un sistema de almacenamiento.",
     "Un tipo de memoria."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "La electricidad estática es la acumulación de cargas eléctricas en la superficie de un material.",
    "categoria": "Mantenimiento informático",
    "tema": "T9"
   },
   {
    "id": "E04-P07",
    "pregunta": "¿Qué puede ayudar a reducir los riesgos de descarga electrostática durante la manipulación de componentes?",
    "opciones": [
     "Una pulsera antiestática utilizada correctamente.",
     "Un navegador web.",
     "Una impresora.",
     "Un archivo comprimido."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Una pulsera antiestática, utilizada correctamente, ayuda a reducir la acumulación de electricidad estática y el riesgo de descargas electrostáticas.",
    "categoria": "Mantenimiento informático",
    "tema": "T9"
   },
   {
    "id": "E04-P08",
    "pregunta": "¿Qué práctica es recomendable para proteger información importante?",
    "opciones": [
     "Eliminar todos los archivos.",
     "Realizar copias de seguridad.",
     "Desconectar el almacenamiento durante su uso.",
     "Compartir contraseñas."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Las copias de seguridad son duplicados de información importante que permiten recuperarla ante una pérdida.",
    "categoria": "Mantenimiento informático",
    "tema": "T13"
   },
   {
    "id": "E04-P09",
    "pregunta": "¿Qué se debe hacer cuando se identifica una batería dañada o hinchada?",
    "opciones": [
     "Continuar utilizándola normalmente.",
     "Presionarla para reducir su tamaño.",
     "Evitar manipularla y solicitar asistencia técnica capacitada.",
     "Calentarla."
    ],
    "respuestaCorrecta": 2,
    "explicacion": "Una batería dañada o hinchada puede ser peligrosa: no se debe manipular y hay que solicitar asistencia técnica capacitada.",
    "categoria": "Mantenimiento informático",
    "tema": "T9"
   },
   {
    "id": "E04-P10",
    "pregunta": "¿Qué se debe hacer cuando una reparación supera los conocimientos de un principiante?",
    "opciones": [
     "Intentar cualquier procedimiento sin consultar.",
     "Solicitar ayuda a una persona capacitada.",
     "Manipular los circuitos conectados.",
     "Abrir la fuente de alimentación."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Cuando una tarea supera tus conocimientos, lo seguro es solicitar ayuda a una persona capacitada.",
    "categoria": "Mantenimiento informático",
    "tema": "T9"
   }
  ]
 },
 "E05": {
  "codigo": "E05",
  "nombre": "Herramientas tecnológicas",
  "categoria": "Herramientas tecnológicas",
  "dificultad": "Intermedio",
  "preguntas": [
   {
    "id": "E05-P01",
    "pregunta": "¿Para qué se utiliza un destornillador de precisión?",
    "opciones": [
     "Para ejecutar programas.",
     "Para ajustar o retirar tornillos pequeños.",
     "Para almacenar información.",
     "Para medir el rendimiento del procesador."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "El destornillador de precisión sirve para ajustar o retirar tornillos pequeños.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T10"
   },
   {
    "id": "E05-P02",
    "pregunta": "¿Qué función cumple un multímetro?",
    "opciones": [
     "Medir determinadas magnitudes eléctricas.",
     "Comprimir archivos.",
     "Crear páginas web.",
     "Administrar bases de datos."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El multímetro mide magnitudes eléctricas como tensión, corriente y resistencia; su uso corresponde a personas capacitadas.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T10"
   },
   {
    "id": "E05-P03",
    "pregunta": "¿Qué herramienta permite observar procesos y consumo de recursos en Windows?",
    "opciones": [
     "Administrador de tareas.",
     "7-Zip.",
     "Postman.",
     "Git."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El Administrador de tareas de Windows muestra procesos, aplicaciones y el uso de recursos como CPU, memoria y disco.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T11"
   },
   {
    "id": "E05-P04",
    "pregunta": "¿Para qué sirve el Administrador de dispositivos?",
    "opciones": [
     "Para mostrar y administrar dispositivos de hardware reconocidos por Windows.",
     "Para editar fotografías.",
     "Para comprimir archivos.",
     "Para programar páginas web."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El Administrador de dispositivos muestra los dispositivos de hardware reconocidos por Windows y ayuda a identificar problemas con controladores.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T11"
   },
   {
    "id": "E05-P05",
    "pregunta": "¿Qué programa permite escribir y editar código fuente?",
    "opciones": [
     "Visual Studio Code.",
     "Calculadora.",
     "Administrador de discos.",
     "Monitor de rendimiento."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Visual Studio Code es un editor de código fuente.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T11"
   },
   {
    "id": "E05-P06",
    "pregunta": "¿Para qué se utiliza Git?",
    "opciones": [
     "Para limpiar componentes físicos.",
     "Para registrar y administrar cambios en archivos de proyectos.",
     "Para medir temperatura ambiental.",
     "Para imprimir documentos."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Git es un sistema de control de versiones: registra y administra los cambios en los archivos de un proyecto.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T11"
   },
   {
    "id": "E05-P07",
    "pregunta": "¿Qué herramienta permite probar solicitudes a una API?",
    "opciones": [
     "Postman.",
     "Paño de microfibra.",
     "Pulsera antiestática.",
     "Linterna."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Postman permite enviar solicitudes HTTP a una API y revisar las respuestas.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T11"
   },
   {
    "id": "E05-P08",
    "pregunta": "¿Para qué se utiliza MySQL Workbench?",
    "opciones": [
     "Para administrar y trabajar gráficamente con bases de datos MySQL.",
     "Para refrigerar procesadores.",
     "Para limpiar pantallas.",
     "Para editar archivos de audio."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "MySQL Workbench es una herramienta gráfica para trabajar con bases de datos MySQL.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T11"
   },
   {
    "id": "E05-P09",
    "pregunta": "¿Qué es XAMPP?",
    "opciones": [
     "Un paquete que facilita la creación de entornos locales de desarrollo web.",
     "Un componente interno de una computadora.",
     "Una herramienta de limpieza física.",
     "Un sistema de alimentación ininterrumpida."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "XAMPP es un paquete que facilita crear un entorno local de desarrollo web, con herramientas como Apache, MariaDB, PHP y Perl.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T11"
   },
   {
    "id": "E05-P10",
    "pregunta": "¿Qué función cumple un UPS?",
    "opciones": [
     "Permitir crear documentos.",
     "Proporcionar energía temporal cuando se interrumpe el suministro eléctrico.",
     "Ejecutar aplicaciones.",
     "Administrar bases de datos."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Un UPS proporciona energía temporal mediante una batería cuando se interrumpe el suministro eléctrico.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T14"
   }
  ]
 },
 "E06": {
  "codigo": "E06",
  "nombre": "Problemas y soluciones",
  "categoria": "Problemas y soluciones",
  "dificultad": "Intermedio",
  "preguntas": [
   {
    "id": "E06-P01",
    "pregunta": "¿Qué se recomienda hacer cuando una computadora funciona lentamente?",
    "opciones": [
     "Eliminar todos los archivos del sistema.",
     "Revisar el uso de recursos y los programas en ejecución.",
     "Abrir la fuente de alimentación.",
     "Desconectar todos los componentes internos."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Ante la lentitud conviene revisar el uso de recursos y los programas en ejecución; las demás opciones son destructivas o peligrosas.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   },
   {
    "id": "E06-P02",
    "pregunta": "¿Qué puede provocar un sobrecalentamiento?",
    "opciones": [
     "Una refrigeración inadecuada o acumulación de polvo.",
     "Un documento de texto.",
     "El color del escritorio.",
     "Una carpeta vacía."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El sobrecalentamiento suele relacionarse con una refrigeración inadecuada o con acumulación de polvo.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   },
   {
    "id": "E06-P03",
    "pregunta": "¿Qué se debe revisar cuando un dispositivo USB no es reconocido?",
    "opciones": [
     "El color del fondo de pantalla.",
     "La conexión, el puerto y el reconocimiento del dispositivo en el sistema.",
     "La impresora.",
     "El brillo del monitor."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Si un dispositivo USB no es reconocido, se revisa la conexión, el puerto y si el sistema lo reconoce.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   },
   {
    "id": "E06-P04",
    "pregunta": "¿Qué es un diagnóstico informático?",
    "opciones": [
     "Un proceso de identificación y análisis de un problema.",
     "Una limpieza de archivos personales.",
     "Una actualización de imágenes.",
     "Un tipo de procesador."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El diagnóstico es el proceso de identificar y analizar un problema para determinar su posible causa.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   },
   {
    "id": "E06-P05",
    "pregunta": "¿Qué se debe hacer si un programa deja de responder?",
    "opciones": [
     "Borrar el sistema operativo inmediatamente.",
     "Revisar su estado y utilizar las opciones de cierre disponibles.",
     "Abrir físicamente el procesador.",
     "Desconectar todos los cables internos."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Si un programa deja de responder, se revisa su estado y se usan las opciones de cierre disponibles del sistema.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   },
   {
    "id": "E06-P06",
    "pregunta": "¿Qué puede ayudar a proteger los datos frente a una falla de almacenamiento?",
    "opciones": [
     "Copias de seguridad actualizadas.",
     "Cambiar el fondo de pantalla.",
     "Desactivar todas las actualizaciones.",
     "Eliminar los controladores."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Las copias de seguridad actualizadas permiten recuperar la información si falla el almacenamiento.",
    "categoria": "Problemas y soluciones",
    "tema": "T13"
   },
   {
    "id": "E06-P07",
    "pregunta": "¿Qué puede indicar un mensaje de error relacionado con un controlador?",
    "opciones": [
     "Que puede existir un problema de comunicación entre el sistema operativo y un dispositivo.",
     "Que el monitor necesita limpieza.",
     "Que la computadora no tiene teclado.",
     "Que todos los archivos están comprimidos."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Un error relacionado con un controlador puede indicar un problema de comunicación entre el sistema operativo y un dispositivo.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   },
   {
    "id": "E06-P08",
    "pregunta": "¿Qué se recomienda ante un problema que involucra circuitos eléctricos internos?",
    "opciones": [
     "Manipularlos sin preparación.",
     "Solicitar asistencia técnica capacitada.",
     "Introducir objetos metálicos.",
     "Mojar los componentes."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Los circuitos eléctricos internos son peligrosos: ante un problema de este tipo se debe solicitar asistencia técnica capacitada.",
    "categoria": "Problemas y soluciones",
    "tema": "T9"
   },
   {
    "id": "E06-P09",
    "pregunta": "¿Qué debe hacerse antes de realizar cambios importantes en una unidad de almacenamiento?",
    "opciones": [
     "Comprobar la información y realizar una copia de seguridad cuando sea necesario.",
     "Eliminar todas las particiones sin revisarlas.",
     "Desconectar la pantalla.",
     "Desactivar el sistema operativo."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Antes de cambios importantes en una unidad de almacenamiento, comprueba la información y realiza una copia de seguridad cuando sea necesario.",
    "categoria": "Problemas y soluciones",
    "tema": "T13"
   },
   {
    "id": "E06-P10",
    "pregunta": "¿Cuál es una buena práctica al investigar un problema informático?",
    "opciones": [
     "Cambiar varias configuraciones sin comprobar nada.",
     "Observar los síntomas, identificar posibles causas y realizar comprobaciones seguras.",
     "Eliminar todos los programas.",
     "Ignorar los mensajes de error."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Una buena práctica es observar los síntomas, identificar posibles causas y realizar comprobaciones seguras.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   }
  ]
 },
 "E07": {
  "codigo": "E07",
  "nombre": "Evaluación general de informática",
  "categoria": "General",
  "dificultad": "Intermedio",
  "preguntas": [
   {
    "id": "E07-P01",
    "pregunta": "¿Qué componente permite almacenar datos de manera temporal mientras se ejecutan programas?",
    "opciones": [
     "RAM.",
     "HDD.",
     "Monitor.",
     "Fuente de alimentación."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "La RAM almacena datos de forma temporal mientras se ejecutan los programas.",
    "categoria": "General",
    "tema": "T5"
   },
   {
    "id": "E07-P02",
    "pregunta": "¿Qué función cumple el sistema operativo?",
    "opciones": [
     "Administrar recursos del equipo.",
     "Fabricar componentes.",
     "Limpiar físicamente la computadora.",
     "Proporcionar energía."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El sistema operativo administra los recursos del equipo y permite ejecutar aplicaciones.",
    "categoria": "General",
    "tema": "T6"
   },
   {
    "id": "E07-P03",
    "pregunta": "¿Qué herramienta permite organizar y consultar cambios en un proyecto de programación?",
    "opciones": [
     "Git.",
     "Multímetro.",
     "Linterna.",
     "Pulsera antiestática."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Git permite organizar y consultar los cambios de un proyecto de programación.",
    "categoria": "General",
    "tema": "T11"
   },
   {
    "id": "E07-P04",
    "pregunta": "¿Qué significa realizar mantenimiento preventivo?",
    "opciones": [
     "Actuar antes de que aparezcan determinados fallos para reducir riesgos.",
     "Reparar únicamente después de una avería.",
     "Cambiar siempre todos los componentes.",
     "Eliminar todos los programas."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El mantenimiento preventivo actúa antes de que aparezcan determinados fallos para reducir riesgos.",
    "categoria": "General",
    "tema": "T8"
   },
   {
    "id": "E07-P05",
    "pregunta": "¿Qué dispositivo permite visualizar información de una computadora?",
    "opciones": [
     "Monitor.",
     "Ratón.",
     "Teclado.",
     "Escáner."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El monitor es un dispositivo de salida que permite visualizar la información de la computadora.",
    "categoria": "General",
    "tema": "T2"
   },
   {
    "id": "E07-P06",
    "pregunta": "¿Qué programa se utiliza para trabajar con bases de datos MySQL mediante una interfaz gráfica?",
    "opciones": [
     "MySQL Workbench.",
     "Git.",
     "7-Zip.",
     "Google Chrome."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "MySQL Workbench es la herramienta gráfica para trabajar con bases de datos MySQL.",
    "categoria": "General",
    "tema": "T11"
   },
   {
    "id": "E07-P07",
    "pregunta": "¿Qué es una copia de seguridad?",
    "opciones": [
     "Un duplicado de información importante para facilitar su recuperación.",
     "Una herramienta de limpieza.",
     "Un programa de edición de imágenes.",
     "Una actualización del procesador."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Una copia de seguridad es un duplicado de información importante que facilita su recuperación.",
    "categoria": "General",
    "tema": "T13"
   },
   {
    "id": "E07-P08",
    "pregunta": "¿Qué elemento permite conectar diferentes componentes de una computadora?",
    "opciones": [
     "Placa madre.",
     "Monitor.",
     "Impresora.",
     "Altavoz."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "La placa madre conecta los distintos componentes y permite su comunicación.",
    "categoria": "General",
    "tema": "T4"
   },
   {
    "id": "E07-P09",
    "pregunta": "¿Qué herramienta ayuda a consultar el uso del procesador y la memoria en Windows?",
    "opciones": [
     "Administrador de tareas.",
     "XAMPP.",
     "Postman.",
     "7-Zip."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El Administrador de tareas permite consultar el uso del procesador y de la memoria en Windows.",
    "categoria": "General",
    "tema": "T11"
   },
   {
    "id": "E07-P10",
    "pregunta": "¿Qué se debe hacer antes de realizar una limpieza física?",
    "opciones": [
     "Apagar y desconectar el equipo cuando corresponda.",
     "Mantener todos los componentes conectados a la corriente.",
     "Aplicar líquidos directamente.",
     "Introducir objetos metálicos."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Antes de una limpieza física se apaga y desconecta el equipo cuando corresponda; nunca se aplican líquidos directamente ni se introducen objetos metálicos.",
    "categoria": "General",
    "tema": "T9"
   },
   {
    "id": "E07-P11",
    "pregunta": "¿Qué es el software?",
    "opciones": [
     "El conjunto de programas e instrucciones que permiten realizar tareas en una computadora.",
     "Una pieza física instalada en la placa madre.",
     "Un cable de alimentación.",
     "Un dispositivo de almacenamiento magnético."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El software es el conjunto de programas e instrucciones que permiten a la computadora realizar tareas; no es una pieza física.",
    "categoria": "Fundamentos de computación",
    "tema": "T1"
   },
   {
    "id": "E07-P12",
    "pregunta": "¿Qué función cumple la fuente de alimentación?",
    "opciones": [
     "Procesar instrucciones.",
     "Proporcionar energía eléctrica adecuada a los componentes del equipo.",
     "Almacenar archivos.",
     "Controlar el navegador."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "La fuente de alimentación entrega energía eléctrica adecuada a los componentes del equipo.",
    "categoria": "Hardware",
    "tema": "T4"
   },
   {
    "id": "E07-P13",
    "pregunta": "¿Qué es un controlador?",
    "opciones": [
     "Una herramienta de limpieza.",
     "Un programa que permite al sistema operativo comunicarse con un dispositivo de hardware.",
     "Un dispositivo de almacenamiento.",
     "Una pieza de la fuente de alimentación."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Un controlador permite que el sistema operativo se comunique con un dispositivo de hardware.",
    "categoria": "Software",
    "tema": "T6"
   },
   {
    "id": "E07-P14",
    "pregunta": "¿Qué es la electricidad estática?",
    "opciones": [
     "Una aplicación de Windows.",
     "La acumulación de cargas eléctricas en la superficie de un material.",
     "Un sistema de almacenamiento.",
     "Un tipo de memoria."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "La electricidad estática es la acumulación de cargas eléctricas en la superficie de un material.",
    "categoria": "Mantenimiento informático",
    "tema": "T9"
   },
   {
    "id": "E07-P15",
    "pregunta": "¿Qué se debe hacer cuando se identifica una batería dañada o hinchada?",
    "opciones": [
     "Continuar utilizándola normalmente.",
     "Presionarla para reducir su tamaño.",
     "Evitar manipularla y solicitar asistencia técnica capacitada.",
     "Calentarla."
    ],
    "respuestaCorrecta": 2,
    "explicacion": "Una batería dañada o hinchada puede ser peligrosa: no se debe manipular y hay que solicitar asistencia técnica capacitada.",
    "categoria": "Mantenimiento informático",
    "tema": "T9"
   },
   {
    "id": "E07-P16",
    "pregunta": "¿Qué función cumple un UPS?",
    "opciones": [
     "Permitir crear documentos.",
     "Proporcionar energía temporal cuando se interrumpe el suministro eléctrico.",
     "Ejecutar aplicaciones.",
     "Administrar bases de datos."
    ],
    "respuestaCorrecta": 1,
    "explicacion": "Un UPS proporciona energía temporal mediante una batería cuando se interrumpe el suministro eléctrico.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T14"
   },
   {
    "id": "E07-P17",
    "pregunta": "¿Qué función cumple un multímetro?",
    "opciones": [
     "Medir determinadas magnitudes eléctricas.",
     "Comprimir archivos.",
     "Crear páginas web.",
     "Administrar bases de datos."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El multímetro mide magnitudes eléctricas como tensión, corriente y resistencia; su uso corresponde a personas capacitadas.",
    "categoria": "Herramientas tecnológicas",
    "tema": "T10"
   },
   {
    "id": "E07-P18",
    "pregunta": "¿Qué puede provocar un sobrecalentamiento?",
    "opciones": [
     "Una refrigeración inadecuada o acumulación de polvo.",
     "Un documento de texto.",
     "El color del escritorio.",
     "Una carpeta vacía."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El sobrecalentamiento suele relacionarse con una refrigeración inadecuada o con acumulación de polvo.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   },
   {
    "id": "E07-P19",
    "pregunta": "¿Qué debe hacerse antes de realizar cambios importantes en una unidad de almacenamiento?",
    "opciones": [
     "Comprobar la información y realizar una copia de seguridad cuando sea necesario.",
     "Eliminar todas las particiones sin revisarlas.",
     "Desconectar la pantalla.",
     "Desactivar el sistema operativo."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Antes de cambios importantes en una unidad de almacenamiento, comprueba la información y realiza una copia de seguridad cuando sea necesario.",
    "categoria": "Problemas y soluciones",
    "tema": "T13"
   },
   {
    "id": "E07-P20",
    "pregunta": "¿Qué es un diagnóstico informático?",
    "opciones": [
     "Un proceso de identificación y análisis de un problema.",
     "Una limpieza de archivos personales.",
     "Una actualización de imágenes.",
     "Un tipo de procesador."
    ],
    "respuestaCorrecta": 0,
    "explicacion": "El diagnóstico es el proceso de identificar y analizar un problema para determinar su posible causa.",
    "categoria": "Problemas y soluciones",
    "tema": "T12"
   }
  ]
 }
};
})();
