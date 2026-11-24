# Product Context: Flag Drawer

## Proposito del Producto
La mayoria de los juegos de trivia sobre banderas utilizan mecanicas pasivas de seleccion multiple. Flag Drawer propone un desafio activo y creativo: dibujar la bandera de memoria en un lienzo interactivo, obligando al usuario a recordar proporciones, distribucion de colores, elementos geometricos y simbolos.

## Problemas que Resuelve
- **Pasividad en el aprendizaje:** Dibujar refuerza la memoria visual y el conocimiento geografico de forma significativamente mas efectiva que seleccionar entre cuatro opciones.
- **Dificultad asimetrica en banderas:** Algunas banderas pertenecen a paises mundialmente conocidos pero tienen diseños complejos (ej. Brasil, EE. UU.), mientras que otras de micronaciones tienen diseños de franjas muy simples. El producto resuelve esto ofreciendo dos enfoques de dificultad independientes: por Popularidad y por Complejidad de Diseno.
- **Frustracion por detalles heraldicos:** Dibujar escudos detallados (ej. Espana, Mexico, Argentina) en pantallas tactiles o con raton resulta sumamente dificil. El producto incluye un modo de "perdon de escudos" que enmascara y rellena automaticamente las areas heraldicas para evaluar solo los colores base si el usuario lo prefiere.

## Experiencia de Usuario (UX)
- **Flujo de juego rapido:** Se presenta el nombre del pais y su tier; el jugador dibuja con las herramientas seleccionadas; presiona "Evaluar Bandera" y obtiene puntuacion porcentual (0-100%), calificacion (S, B, C, F), desglose de errores y vista comparativa interactiva.
- **Controles de dibujo ergonomicos:** Selector de paleta cromatica optimizada para banderas, grosor de trazo ajustable, boton de deshacer (con historial de 25 estados), y modo espejo para banderas simetricas.
- **Diseno Visual Suizo:** Minimalista, estructurado con CSS Grid, tipografia limpia (Helvetica Neue / JetBrains Mono), ausencia de elementos distractores, transiciones rapidas de 200-300ms y paleta sobria con acentos directos.
