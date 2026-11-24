# Active Context: Flag Drawer

## Estado Actual
El proyecto cuenta con una implementacion funcional completa en vanilla JavaScript, HTML5 y CSS3:
- Catalogo de 143 banderas SVG con metadatos de popularidad y complejidad en `js/flags.js` y `assets/flags/`.
- Motor de dibujo interactivo en `js/canvas.js` con soporte para PointerEvents, herramientas geometricas, flood fill y simetria.
- Motor de comparacion pixel a pixel en `js/comparator.js` con tolerancia cromatica delta-E simplificada y mascara de escudos.
- Interfaz de usuario completa en `index.html` y `style.css` fiel a la guia de diseno suizo (`design.md`).
- Empaquetado universal standalone en `js/bundle.js` para asegurar compatibilidad universal en navegadores sin requerir servidor HTTP.

## Foco de Trabajo Actual
- Adaptacion dinamica del lienzo segun la relacion de aspecto de cada bandera (1:1, 2:1, 3:2, 11:9, etc.).
- Expansion y optimizacion de la vista de PC / escritorio (reticula suiza a 2 columnas con contenedor de 1080px y barra de herramientas lateral fija).
- Integracion de atajos de teclado para PC (B, L, F, R, C, M, Ctrl+Z, Enter, Esc).
- Sincronizacion del empaquetado universal standalone `bundle.js`.

## Proximos Pasos Posibles
- Posible adicion de pruebas automatizadas o scripts de verificacion de integridad para el catalogo de banderas.
- Herramienta de pipeta (color picker de pixeles en el propio lienzo).
