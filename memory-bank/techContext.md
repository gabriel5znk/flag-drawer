# Tech Context: Flag Drawer

## Tecnologías Utilizadas
- **HTML5:** Marcado semantico, soporte de accesibilidad (atributos ARIA, roles), elementos `<canvas>` optimizados con `willReadFrequently: true`.
- **CSS3:** Custom Properties (variables CSS) para cambio dinamico de temas (Dark / Light), CSS Grid y Flexbox para maquetacion asimetrica, media queries para soporte movil.
- **JavaScript (ES6+):** Modulos nativos (`import`/`export`), clases, `PointerEvents` API, `CanvasRenderingContext2D`, manipulacion directa de `ImageData`.
- **SVG (Scalable Vector Graphics):** Formato vectorial para las 143 banderas de referencia en `assets/flags/`.
- **Web Storage API:** `localStorage` para almacenamiento persistente del estado del jugador en el navegador.

## Entorno de Desarrollo y Ejecución
- No requiere runtime de Node.js obligatorio para ejecucion basica.
- Puede ejecutarse abriendo directamente `index.html` en un navegador web o mediante cualquier servidor HTTP estatico (ej. `python3 -m http.server`, `npx serve`, etc.).
- `js/bundle.js` unifica los modulos para garantizar funcionamiento inmediato a traves de `file://` donde la politica de CORS podria restringir modulos ES6 locales.

## Restricciones Técnicas
- El canvas de dibujo esta normalizado estrictamente a una proporcion fija de 300x200 pixeles (proporcion 3:2) para estandarizar la comparacion con los SVGs vectoriales.
- El rendimiento de flood fill e interpolacion pixel a pixel depende del acceso a `ImageData`, optimizado mediante buffers de 32 bits y contexto `willReadFrequently`.
- No se utilizan dependencias de terceros ni frameworks de frontend (React, Vue, Tailwind, etc.), manteniendo el codigo ligero y libre de dependencias externas.
