# React + Vite

1. Introducción

Esta aplicación web es una Single Page Application (SPA) desarrollada en React. Su objetivo es mostrar información sobre candidatos al Balón de Oro 2025 en una página accesible, fácil de usar y navegable tanto con mouse como con teclado o lector de pantalla.

2. Características principales de accesibilidad
-Navegación por teclado
-Todos los elementos interactivos (botones, enlaces, formulario) pueden seleccionarse con la tecla Tab.
-Se resalta el foco activo con un contorno visible.
-Uso de roles y etiquetas ARIA role="banner", role="main", role="contentinfo", role="article" y aria-labels mejoran la comprensión para lectores de pantalla.
-Cada imagen tiene un atributo alt que describe su contenido.
-Tipografías sans-serif legibles y tamaños accesibles.
-Estructura semántica

3. Decisiones técnicas
-Framework elegido: React (con Vite).
Permite construir una SPA eficiente y con navegación interna sin recargar la página.
Se eligió por su soporte en buenas prácticas de accesibilidad y su ecosistema.
-Carpeta public/ para imágenes.
-Semántica en HTML. Uso de etiquetas correctas (<header>, <main>, <footer>, <article>).
-Esto mejora la comprensión para tecnologías de asistencia.
-Estilos con CSS embebido.
-Contraste de colores probado con herramientas WCAG.
-Fuente legible y suficiente espaciado para no sobrecargar la vista.
-Permite moverse entre páginas sin recargar.
-Formulario accesible.

4. Justificación de criterios de accesibilidad (WCAG 2.1)

-Perceptible: Texto alternativo en imágenes, contraste de colores, tipografía clara.
-Operable: Navegación completa con teclado, foco visible, rutas accesibles.
-Comprensible: Lenguaje simple, jerarquía clara de encabezados, retroalimentación en formularios.
-Robusto: Compatible con lectores de pantalla y adaptable a distintos dispositivos.

5. Instrucciones para usuarios con discapacidad

La aplicación ha sido diseñada siguiendo criterios de accesibilidad (WCAG 2.1), de manera que pueda ser usada por personas con diferentes necesidades:
A)Usuarios con discapacidad visual
-Todas las imágenes cuentan con texto alternativo (atributo alt), lo que permite a los lectores de pantalla describir el contenido.
-Los encabezados (h1, h2, h3) y roles ARIA facilitan la navegación estructurada con lectores de pantalla como NVDA, JAWS o VoiceOver.
-Los colores fueron seleccionados con suficiente contraste para usuarios con baja visión.
B)Usuarios con discapacidad motora
-La página es completamente navegable mediante teclado.
-Se puede usar la tecla Tab para avanzar entre los elementos interactivos (botones, enlaces, formulario).
-El foco es siempre visible para saber qué elemento está seleccionado.
C)Usuarios con discapacidad auditiva
-El contenido es totalmente textual y visual, sin depender de audio ni videos.
-No existen elementos multimedia que requieran subtítulos o transcripción.
D)Usuarios con discapacidad cognitiva
-El lenguaje es claro y sencillo, evitando tecnicismos innecesarios.
-La estructura visual está organizada en bloques y tarjetas fáciles de identificar.
-Los formularios muestran mensajes de error claros en caso de que falte información.
