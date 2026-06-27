# Miguel Trigoso — Sitio personal (UCSP)

Sitio web personal de **Miguel Angel Gael Trigoso Dávila**, estudiante de primer año de
Ciencia de la Computación en la Universidad Católica San Pablo (UCSP). Está construido como
una página tipo CV/portafolio: presentación personal, cursos del semestre, profesores y
compañeros de carrera.

Hecho solo con **HTML, CSS y JavaScript** (sin frameworks ni dependencias de build), pensado
para publicarse directamente con **GitHub Pages**.

## 🌑 Concepto visual

El diseño sigue el hilo de un eclipse: arranca en un cielo nocturno con la portada de Loomus
de fondo, semitransparente, detrás del nombre (hero); recorre tarjetas estilo "terminal/código"
para cursos, profesores y compañeros; y termina en el horizonte de un bosque al pie de página.
El pequeño botón circular fijo abajo a la derecha es un indicador de progreso de scroll con
forma de eclipse: la sombra se va cerrando a medida que avanzas en la página (haz clic en él
para volver arriba).

## 📂 Estructura del proyecto

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── images/
        ├── loomus-bg.jpg        # portada completa de Loomus, fondo del hero
        ├── forest-footer.jpg    # banda del bosque (portada de Soundgarden), tono nocturno
        └── wordcloud.jpg        # nube de tecnologías, fondo de la sección "Cursos"
```

## 🚀 Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `mi-pagina-ucsp`).
2. Sube todos los archivos de esta carpeta a la raíz del repositorio:
   ```bash
   git init
   git add .
   git commit -m "Primera versión del sitio"
   git branch -M main
   git remote add origin https://github.com/MiguelTrigoso/NOMBRE-DEL-REPO.git
   git push -u origin main
   ```
3. En GitHub, ve a **Settings → Pages**.
4. En "Build and deployment", elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
5. Guarda y espera uno o dos minutos. Tu sitio quedará disponible en:
   ```
   https://MiguelTrigoso.github.io/NOMBRE-DEL-REPO/
   ```

## ✏️ Cómo editar el contenido

- **Textos:** todo el contenido (nombre, descripción, cursos, profesores, compañeros) está
  directamente en `index.html`, dentro de cada `<section>`.
- **Colores y tipografía:** se controlan desde las variables al inicio de `css/style.css`
  (bloque `:root`).
- **Interactividad:** el menú móvil, el efecto de scroll, la animación de "terminal" y el
  indicador de progreso están en `js/script.js`.

## ♿ Accesibilidad

- Navegación con teclado y estados de foco visibles.
- Respeta `prefers-reduced-motion` (desactiva animaciones si el usuario lo prefiere).
- Enlace "Saltar al contenido" para lectores de pantalla.
