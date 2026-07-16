# Cambios realizados — AIBE Technologies

## Landing principal y Redes Sociales Tenerife

- Eliminado “¿Por qué AIBE?” del menú superior de escritorio y móvil.
- Corregido el menú hamburguesa de la página de Redes Sociales Tenerife.
- Corregidos los botones de “Solicitar información” para que desplacen hasta el formulario.
- Reducido el ancho de los botones de solicitud de información en móvil.
- Recolocada la imagen de fondo del hero de Redes Sociales Tenerife en móvil.
- Mejoradas las proporciones y el aprovechamiento del ancho de las imágenes de la sección AIBE.
- Sustituido “Agendar llamada” por un enlace directo a WhatsApp.

## Footer

- Teléfono actualizado a +34 686 01 26 85.
- Enlace de WhatsApp actualizado al mismo número.
- Logo y texto de AIBE Technologies en blanco.
- Añadidos enlaces a Aviso legal y Política de privacidad.

## Legal

- Añadida la ruta `/es/aviso-legal`.
- Añadida la ruta `/es/politica-privacidad`.
- Actualizados los enlaces del formulario y del footer.
- Añadidas las rutas legales al sitemap.

## Validación realizada

- TypeScript: `npx tsc --noEmit` sin errores.
- ESLint de todos los archivos modificados: sin errores.
- Pruebas en Chromium a 390 × 844 y 1440 × 1000.
- Menús, desplazamiento al formulario, enlaces de WhatsApp, teléfono, páginas legales y rutas: comprobados.
- Las cuatro páginas principales probadas respondieron con HTTP 200.

> Los textos legales son un borrador y conviene que un profesional jurídico los revise antes de considerarlos definitivos.

## Nuevas landing pages de servicios

Se han creado cinco landing pages originales para AIBE, tomando los HTML facilitados únicamente como referencia temática:

- `/es/marketing-digital-tenerife`
- `/es/diseno-web-branding-tenerife`
- `/es/desarrollo-web-tenerife`
- `/es/automatizacion-ia-tenerife`

Cada landing incluye hero propio, propuesta de valor, servicios, proceso de trabajo, entregables, preguntas frecuentes y formulario de contacto. Comparten la identidad visual y la navbar del index, pero utilizan contenido y composición propios.

También se han añadido todas las páginas al desplegable de Servicios, al menú móvil, al footer y al sitemap.

## Validación de las nuevas landings

- TypeScript: `npx tsc --noEmit --incremental false` sin errores.
- ESLint de todos los archivos modificados: sin errores.
- Las cinco landings, el index y la landing de Redes Sociales compilaron en desarrollo y respondieron con HTTP 200.
- La compilación completa de producción se inició correctamente, pero superó el tiempo máximo disponible durante la fase de optimización.

## Ajuste de navegación y catálogo de servicios

- Rediseñado el desplegable de Servicios con enlaces separados, mejor jerarquía visual y estados hover/activo.
- Unificado en azul AIBE el color de Contacto, Servicios, Google y Buscadores con IA.
- Eliminada la landing de Sistemas y ciberseguridad de la configuración, navegación, footer y sitemap.
- Mejorado el contenedor de la navbar en la página inicial y en las landings de servicios.

## Navbar ajustada al diseño de referencia

- Barra blanca de ancho completo con margen exterior, borde azul muy suave, esquinas redondeadas y sombra ligera.
- Logo Aibe centrado entre los dos grupos de navegación.
- Enlaces principales uniformados en azul Aibe.
- Desplegable de Servicios simplificado con el encabezado “Soluciones AIBE” y una lista limpia, sin tarjetas ni iconos laterales.
- Mismo diseño aplicado al inicio y a todas las landing pages de servicios.
- Se mantiene el menú móvil responsive existente.

## Landings visuales y animadas

- Se ha renovado el componente compartido de las landing pages de servicios.
- Se han añadido composiciones fotográficas específicas para cada servicio.
- Se han incorporado animaciones de entrada al hacer scroll con Framer Motion.
- Se han añadido tarjetas flotantes, indicadores dinámicos, una banda de contenidos en movimiento y microinteracciones en tarjetas.
- El proceso, entregables y resultados incluyen ahora recursos visuales y capturas de apoyo.
- Las animaciones respetan `prefers-reduced-motion` para mejorar la accesibilidad.
- Se mantiene la navbar compartida y unificada en todas las páginas.
- Rutas comprobadas con respuesta HTTP 200: Redes Sociales, Marketing Digital, Diseño y Branding, Desarrollo Web y Automatización con IA.
## Corrección de CTA en móvil

- “Solicitar una valoración” ahora enlaza de forma nativa al formulario de las landings de servicios.
- “Solicitar información” y “Solicitar información ahora” ahora enlazan de forma nativa al formulario de la página principal.
- Añadido un destino de ancla específico y margen de desplazamiento para evitar que la cabecera tape el formulario.
- Mejorado el soporte táctil de los CTA en dispositivos móviles.

