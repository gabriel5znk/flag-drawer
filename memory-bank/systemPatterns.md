# System Patterns: Flag Drawer

## Arquitectura General
El proyecto sigue una arquitectura modular en cliente (Client-Side Vanilla Architecture) sin frameworks externos:

```
[index.html]
    │
    ├── [style.css] (Diseno Suizo, variables CSS, layout Grid/Flex)
    │
    └── [js/bundle.js] (Script universal autocontenido)
             ▲
     (Generado / Reflejado desde modulos ES6)
             │
     ├── [js/flags.js] (Dataset, Tiers, Metadatos de Escudos)
     ├── [js/canvas.js] (Motor Canvas 2D, Herramientas, Undo Stack)
     ├── [js/comparator.js] (Algoritmo de contraste, Scoring, Mascaras)
     └── [js/app.js] (Orquestador UI, i18n, Estado, LocalStorage)
```

## Componentes y Responsabilidades

### 1. Motor de Dibujo (`js/canvas.js`)
- Gestiona un lienzo HTML5 Canvas principal y un overlay auxiliar para guias visuales (lineas de simetria).
- Dimensiones adaptativas por bandera: metodo `setDimensions(width, height)` que calcula la resolucion optima preservando una densidad uniforme (~60,000 px totales) sin deformar la proporcion nativa de la bandera.
- Utiliza la API unificada de `PointerEvents` (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) para soporte nativo fluido en raton, lapiz optico y pantallas tactiles.
- Implementa Flood Fill (relleno por inundacion) mediante recorrido basado en cola (queue-based flood fill) directo sobre `ImageData`.
- Mantiene una pila de estados anteriores (`undoStack`, limite de 25 pasos) almacenando snapshots con `getImageData` y `putImageData`.
- Soporta simetria de dibujo en tiempo real (modo espejo vertical u horizontal).

### 2. Evaluador Cromático y Scoring (`js/comparator.js`)
- Dibuja la bandera SVG objetivo sobre un canvas virtual de referencia escalado a las dimensiones exactas `(width, height)` del dibujo actual. Cada SVG en `assets/flags/` debe incluir atributos `width` y `height` explícitos en su elemento raíz `<svg>` para evitar recortes o deformaciones al rasterizarse con `drawImage`.
- En caso de banderas con escudos y modo casual activado, escala las coordenadas de la mascara de escudo desde la base 300x200 hacia la resolucion activa y toma la menor distancia entre el color oficial y `shield.fill`.
- Realiza una comparacion pixel a pixel con puntuacion gradual continua:
  - Distancia RGB <= `DEFAULT_THRESHOLD` (45): 100% de acierto (`1.0`).
  - Distancia RGB entre `45` y `MAX_COLOR_TOLERANCE` (135): decaimiento lineal de `1.0` a `0.0`.
  - Distancia RGB >= `135`: fallo (`0.0`).
- Genera un mapa de calor de diferencias (`diffCanvas`): los aciertos se pintan en verde con intensidad proporcional al puntaje del pixel (verde brillante en exactitud, verde tenue al alejarse) y los fallos en rojo.
- Asigna grados cuantitativos y cualitativos:
  - S: >= 90%
  - B: >= 70%
  - C: >= 40%
  - F: < 40%

### 3. Gestion de Banderas y Metadatos (`js/flags.js`)
- Catalogo de 143 paises con nombres en espanol e ingles.
- Clasificacion dual: `popTier` (1 a 4) y `designTier` (1 a 4).
- Metadatos de proporcion: `ratio` numerico y `aspectText` legible (ej. 1:1, 2:1, 3:2, 5:3, 11:9).
- Metadatos de escudo: coordenadas delimitadoras (`x: [min, max]`, `y: [min, max]`) y color de relleno supletorio.

### 4. Orquestador y Estado (`js/app.js`)
- Gestiona la persistencia en `localStorage`: racha actual, record maximo, banderas jugadas, niveles seleccionados, enfoque de dificultad activo, idioma y tema.
- Implementa internacionalizacion reactiva (i18n) en espanol e ingles actualizando los atributos de texto y `aria-label` en el DOM.
- Administra el flujo del juego: seleccion aleatoria dentro de los tiers activos, sincronizacion de relacion de aspecto en lienzo y marcos de modal, evaluacion, modal de resultados y atajos de teclado para PC.

## Patrones de Diseno Visual
- **Diseno Suizo:** Composicion asimetrica, tipografia Helvetica Neue dominante con jerarquia estricta, JetBrains Mono para metadatos numericos, ritmo vertical estandarizado en unidades de 8px, y eliminacion de gradientes decorativos o sombras pesadas.
- **Reticula Dual (Movil vs PC):** En movil mantiene una sola columna vertical optimizada para toques; en PC (>= 860px) se expande a un contenedor de hasta 1080px con reticula suiza a 2 columnas (lienzo + accion a la izquierda, barra de herramientas lateral fija a la derecha).
