# Project Brief: Flag Drawer

## Descripcion General
Flag Drawer es una aplicacion web interactiva de tipo juego educativo en la que los usuarios deben dibujar banderas de paises de memoria y recibir una evaluacion automatizada mediante comparacion cromatica pixel a pixel contra el diseño vectorial real de cada bandera.

## Objetivos Principales
- Proporcionar una experiencia de juego fluida, responsiva y accesible tanto en dispositivos moviles como en escritorio (mobile-first).
- Ofrecer herramientas de dibujo intuitivas adaptadas a la vexilologia (pincel, linea recta, relleno por inundacion/flood fill, rectangulo, circulo, simetria en espejo vertical y horizontal).
- Calificar con precision los dibujos mediante un algoritmo de comparacion de imagen que tolera variaciones menores de tono y ofrece retroalimentacion visual clara (mapa de diferencias).
- Soportar clasificaciones de dificultad flexibles basadas tanto en popularidad/fama del pais como en complejidad grafica del diseño.
- Implementar una estetica refinada basada en el Estilo Tipografico Internacional (Diseno Suizo), priorizando la tipografia sans-serif, la composicion en reticula asimetrica y la economia visual sin ornamentos innecesarios.

## Alcance del Proyecto
- 143 banderas vectoriales (formato SVG) catalogadas con metadatos de dificultad y zonas de escudo/insignia.
- Sistema de evaluacion configurable: perdonar escudos heraldicos complejos o exigirlos para jugadores expertos.
- Interfaz completamente bilingue (espanol e ingles) con soporte para temas claro y oscuro.
- Arquitectura ligera sin dependencias externas pesadas, compatible tanto para ejecucion mediante servidor web local/remoto como a traves del protocolo directo `file://`.
