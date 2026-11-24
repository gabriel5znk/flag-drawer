# Progress: Flag Drawer

## Lo Que Funciona
- **Lienzo de dibujo interactivo:**
  - Adaptabilidad dinamica de la relacion de aspecto segun la bandera actual (ej. Suiza 1:1, Reino Unido 2:1, Nepal 11:9, Estados Unidos 19:10, Espana 3:2, etc.) sin deformacion.
  - Resolucion del canvas calculada dinamicamente manteniendo una densidad constante de aproximadamente 60,000 pixeles.
  - Indicador visual de proporcion de aspecto en el encabezado del desafio y en la ventana de resultados.
  - Pincel libre con control de grosor.
  - Herramienta de linea recta con previsualizacion.
  - Figuras geometricas: rectangulo y circulo (con relleno solido).
  - Herramienta Flood Fill (relleno por cubo de pintura) optimizada.
  - Modo simetria/espejo (vertical y horizontal con lineas guia en overlay dinamico).
  - Historial de acciones con boton Deshacer (hasta 25 pasos) y Limpiar.
  - Paleta de colores preseleccionados optimizados para banderas.
  - Atajos de teclado para PC (B: pincel, L: linea, F: relleno, R: rectangulo, C: circulo, M: espejo, Ctrl+Z: deshacer, Enter: evaluar/continuar, Esc: cerrar modal).
- **Motor de evaluacion comparativa:**
  - Renderizado dinamico del SVG de referencia en canvas oculto con las dimensiones y relacion de aspecto exactas de la bandera.
  - Evaluacion gradual de tonos de color (tolerancia perfecta hasta distancia RGB 45 y decaimiento lineal permisivo hasta limite 135).
  - Mapa de calor de diferencias visualmente intuitivo: aciertos en verde con intensidad proporcional a la cercania cromatica y fallos en rojo.
  - Escalado proporcional de las mascaras de escudos heraldicos segun las dimensiones activas del canvas.
  - Sistema de perdon de escudos configurable (Casual vs Experto).
  - Clasificacion con grados S, B, C y F y porcentaje de precision.
- **Sistema de juego y progreso:**
  - Seleccion inicial por defecto en dificultad Muy facil (Tier 1).
  - Selector de dificultad desplegable (cerrado por defecto) con etiquetas simples (Muy facil, Facil, Normal, Dificil).
  - Buscador desplegable de banderas por nombre (insensible a acentos, bilingue) para practicar banderas especificas.
  - Estadisticas (Racha, Record, Jugadas) ubicadas dentro del menu de Opciones Avanzadas para mantener limpia la pantalla principal.
  - Seleccion de criterio de dificultad: por Popularidad (Fama) o por Complejidad grafica.
  - Opcion de saltar bandera actual o compartir resultado en portapapeles.
- **Interfaz y diseno:**
  - Maquetacion responsiva avanzada: vista optimizada en movil (columna vertical) y expansion en PC (reticula suiza a 2 columnas con barra de herramientas lateral fija y contenedor maximo de 1080px).
  - Cumplimiento con las especificaciones de Diseno Suizo (`design.md`).
  - Soporte de temas Claro y Oscuro con persistencia en `localStorage`.
  - Internacionalizacion bilingue completa (Espanol / Ingles).

## Estado Actual del Proyecto
- Version: Alpha / Estable funcional.
- 143 banderas integradas y verificadas.
- Base de codigo limpia y modular con empaquetado standalone (`bundle.js`).

## Mejoras Futuras Identificadas
- Posibilidad de anadir selector de proporciones para banderas especiales (ej. Suiza y Ciudad del Vaticano 1:1, Nepal no rectangular).
- Herramienta cuenta-gotas (color picker del propio dibujo).
- Modo desafio con tiempo limite (time attack).
- Exportacion o descarga del dibujo como imagen PNG.
