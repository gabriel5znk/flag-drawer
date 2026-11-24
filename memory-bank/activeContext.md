# Active Context: Flag Drawer

## Estado Actual
El proyecto cuenta con una implementacion funcional completa en vanilla JavaScript, HTML5 y CSS3:
- Catalogo de 143 banderas SVG con metadatos de popularidad y complejidad en `js/flags.js` y `assets/flags/`.
- Motor de dibujo interactivo en `js/canvas.js` con soporte para PointerEvents, herramientas geometricas, flood fill y simetria.
- Motor de comparacion pixel a pixel en `js/comparator.js` con tolerancia cromatica delta-E simplificada y mascara de escudos.
- Interfaz de usuario completa en `index.html` y `style.css` fiel a la guia de diseno suizo (`design.md`).
- Empaquetado universal standalone en `js/bundle.js` para asegurar compatibilidad universal en navegadores sin requerir servidor HTTP.

## Foco de Trabajo Actual
- Evaluacion cromatica gradual y mas permisiva (`DEFAULT_THRESHOLD = 45`, `MAX_COLOR_TOLERANCE = 135`) con mapa de calor de intensidad verde a rojo.
- Simplificacion de la pantalla principal: cabecera minimalista con solo 3 botones (buscador de banderas, selector de dificultad desplegable cerrado por defecto, y opciones avanzadas con estadisticas integradas).
- Etiquetas de dificultad simplificadas (`Muy facil`, `Facil`, `Normal`, `Dificil`) y seleccion inicial por defecto en Tier 1 (`[1]`).
- Sincronizacion del empaquetado universal standalone `bundle.js`.

## Proximos Pasos Posibles
- Posible adicion de pruebas automatizadas o scripts de verificacion de integridad para el catalogo de banderas.
- Herramienta de pipeta (color picker de pixeles en el propio lienzo).
