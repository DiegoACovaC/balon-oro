# React + Vite

1. Introducción

Esta aplicación web es una Single Page Application (SPA) desarrollada en React. Su objetivo es mostrar información sobre candidatos al Balón de Oro 2025 en una página accesible, fácil de usar y navegable tanto con mouse como con teclado o lector de pantalla.

2. Características principales de accesibilidad
Navegación por teclado

Todos los elementos interactivos (botones, enlaces, formulario) pueden seleccionarse con la tecla Tab.

Se resalta el foco activo con un contorno visible.

Uso de roles y etiquetas ARIA

role="banner", role="main", role="contentinfo", role="article" y aria-labels mejoran la comprensión para lectores de pantalla.

Cada imagen tiene un atributo alt que describe su contenido.

Contraste y legibilidad

Se utiliza un fondo oscuro con texto blanco y amarillo (#ffc107), asegurando un contraste suficiente según las WCAG 2.1.

Tipografías sans-serif legibles y tamaños accesibles.

Estructura semántica

Uso correcto de encabezados (h1, h2, h3) que guían la jerarquía del contenido.

Secciones (<section>) con identificadores y etiquetas claras.

 Formularios accesibles

Todos los campos tienen etiquetas asociadas (<label for="...">).

Los mensajes de error son visibles y claros.

 Enfoque y navegación interna

Al cambiar de vista (ej. detalle de un jugador), el foco se mueve automáticamente al título principal, lo que facilita a usuarios de lectores de pantalla seguir el flujo de navegación.

3. Decisiones técnicas

Framework elegido: React (con Vite).

Permite construir una SPA eficiente y con navegación interna sin recargar la página.

Se eligió por su soporte en buenas prácticas de accesibilidad y su ecosistema.

Carpeta public/ para imágenes.

Facilita la referencia directa a los recursos, manteniendo rutas simples (/pedri.jpg).

Semántica en HTML.

Uso de etiquetas correctas (<header>, <main>, <footer>, <article>).

Esto mejora la comprensión para tecnologías de asistencia.

Estilos con CSS embebido.

Contraste de colores probado con herramientas WCAG.

Fuente legible y suficiente espaciado para no sobrecargar la vista.

Implementación de rutas con hash (#/player/:id).

Asegura que los lectores de pantalla detecten el cambio de contenido.

Permite moverse entre páginas sin recargar.

Formulario accesible.

Incluye etiquetas claras y retroalimentación inmediata en caso de error.

4. Justificación de criterios de accesibilidad (WCAG 2.1)

Perceptible: Texto alternativo en imágenes, contraste de colores, tipografía clara.

Operable: Navegación completa con teclado, foco visible, rutas accesibles.

Comprensible: Lenguaje simple, jerarquía clara de encabezados, retroalimentación en formularios.

Robusto: Compatible con lectores de pantalla y adaptable a distintos dispositivos.
