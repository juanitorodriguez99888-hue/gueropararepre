# Mural digital — Residuos de la Construcción y Demolición (RCD)

Mural digital interactivo hecho en HTML, CSS y JavaScript puro. Sin frameworks, sin dependencias que instalar: abre `index.html` en el navegador y ya funciona.

## Estructura del proyecto

```
mural-rcd/
├── index.html      → todo el contenido y estructura
├── style.css       → estilos e identidad visual
├── script.js       → juego interactivo, animaciones y menú móvil
├── images/         → aquí van tus fotos (ver abajo)
└── README.md
```

## Cómo agregar tus propias fotos

En la sección **Galería** (`id="galeria"` en `index.html`) hay 6 bloques marcados con 📷 y una descripción de qué foto va ahí. Para reemplazar un bloque por una foto real:

1. Guarda tu imagen dentro de la carpeta `images/` (por ejemplo `images/cascajo-obra.jpg`).
2. En `index.html`, busca el bloque que quieres reemplazar, por ejemplo:
   ```html
   <div class="gallery-slot"><span>📷</span><p>Foto: montón de cascajo o escombro en una obra</p></div>
   ```
3. Cámbialo por:
   ```html
   <div class="gallery-slot gallery-slot--filled">
     <img src="images/cascajo-obra.jpg" alt="Montón de cascajo en una obra de construcción">
   </div>
   ```
4. Agrega este estilo una sola vez al final de `style.css` (ya deja las fotos recortadas bonito):
   ```css
   .gallery-slot--filled{ padding:0; border-style:solid; }
   .gallery-slot--filled img{ width:100%; height:100%; object-fit:cover; border-radius:6px; }
   ```

Repite lo mismo para cada foto que tengas. Si te sobran bloques, simplemente bórralos; si necesitas más, copia y pega un `<div class="gallery-slot">...</div>` extra dentro de `.gallery-grid`.

## Cómo subirlo a GitHub y levantarlo con GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público).
2. Sube estos archivos (`index.html`, `style.css`, `script.js`, la carpeta `images/`) a la raíz del repositorio.
   - Desde la web: botón **Add file → Upload files**.
   - Desde terminal:
     ```bash
     git init
     git add .
     git commit -m "Mural digital RCD"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
     git push -u origin main
     ```
3. En el repositorio, ve a **Settings → Pages**.
4. En "Build and deployment", elige **Deploy from a branch**, rama `main`, carpeta `/root`, y guarda.
5. Espera uno o dos minutos y GitHub te dará el link, algo como:
   `https://TU-USUARIO.github.io/TU-REPO/`
6. Copia ese link y súbelo a NEXUS.

## Contenido incluido

- Definición y clasificación de RCD (inertes, no peligrosos, peligrosos)
- Juego interactivo de clasificación de residuos
- Impacto ambiental
- Estadísticas reales de México, España y la Unión Europea (con fuentes)
- Gráfica de barras y gráfica de dona hechas en CSS puro (sin librerías externas)
- Jerarquía de gestión (reducir, reutilizar, reciclar, valorizar, disponer)
- Dos videos educativos embebidos de YouTube
- Sección de galería lista para tus fotos
- Lista de fuentes consultadas
