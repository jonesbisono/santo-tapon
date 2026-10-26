# Santo Tapón 🚗📸

> Colección fotográfica de la ciudad de Santo Domingo, República Dominicana.  
> Fotografías capturadas desde teléfono celular con título y descripción (máximo 250 caracteres).

**Sitio web publicado en GitHub Pages**: [https://jonesbisono.github.io/santo-tapon/](https://jonesbisono.github.io/santo-tapon/)

---

## 🎨 Características

- **Diseño Ultra Minimalista**: Solo el nombre de la colección y el selector de tema en la cabecera.
- **Modo Oscuro / Claro**: Detección automática según el sistema operativo y memoria de preferencia con `localStorage`.
- **Galería Adaptable (Masonry / Grid)**: Excelente visualización tanto para fotos verticales (portrait) como horizontales (landscape) tomadas con el celular.
- **Visor a Pantalla Completa (Lightbox)**: Clic en cualquier foto para verla en alta definición, con soporte para teclado (Esc, Flechas) y gestos táctiles (Swipe) en móviles.
- **Sin Dependencias ni Compiladores**: Construido 100% con HTML5 semántico, CSS3 moderno y Vanilla JavaScript.
- **Regla Estricta de Contenido**: Solo Título y Descripción de hasta 250 caracteres por fotografía.

---

## 📁 Estructura del Proyecto

```text
Photo-Collection-Blog/
├── .agents/
│   └── skills/
│       └── santo-tapon-blog-manager/
│           └── SKILL.md          # Skill para gestionar y actualizar el blog automáticamente
├── css/
│   └── styles.css               # Diseño, variables CSS y soporte responsive
├── images/                      # Carpeta donde se guardan las fotos del celular
│   ├── foto1.jpg
│   ├── foto2.jpg
│   └── foto3.jpg
├── js/
│   ├── app.js                   # Lógica del visor, tema y renderizado
│   └── photos.js                # Base de datos central de fotos
├── .nojekyll                    # Indicador para despliegue en GitHub Pages
├── index.html                   # Página principal
└── README.md                    # Documentación
```

---

## 🚀 Cómo Agregar Nuevas Fotos

Cada vez que quieras añadir o modificar fotos, puedes hacerlo directamente a través de nuestro chat de Antigravity o siguiendo estos pasos:

1. Guarda la foto en la carpeta `images/` (ej: `images/malecon-atardecer.jpg`).
2. Abre `js/photos.js` y agrega la entrada al inicio de la lista:
   ```javascript
   {
     id: "foto-nueva",
     title: "Título de la foto",
     image: "images/malecon-atardecer.jpg",
     description: "Tu descripción de hasta 250 caracteres aquí."
   },
   ```
3. Guarda y sube los cambios a GitHub (`git add .`, `git commit -m "..."`, `git push origin main`).
