---
name: santo-tapon-blog-manager
description: >-
  Use this skill whenever the user wants to add, edit, remove, update photos, titles, or descriptions,
  or deploy changes to the 'Santo Tapón' photo blog of Santo Domingo. Ensures strict adherence to the
  blog design: title and <= 250 character description per photo, chronological order, and GitHub Pages sync.
---

# Santo Tapón — Gestor del Blog Fotográfico de Santo Domingo

Este skill rige el mantenimiento, actualización y publicación del blog de fotos **"Santo Tapón"** alojado en GitHub Pages (`https://jonesbisono.github.io/santo-tapon/`).

---

## 📁 Ubicación del Álbum de Origen (OneDrive)

* **Ruta de Fotos del Teléfono**: `C:\Users\gjone\OneDrive\Pictures\Santo Tapón`
* Las fotos tomadas con el teléfono se sincronizan en esta carpeta. Para agregarlas al blog, se copian desde allí hacia la carpeta `images/` del proyecto.

---

## 📌 Reglas Fundamentales de Diseño y Contenido

1. **Formato Estricto por Foto**:
   - Cada publicación contiene **exclusivamente**:
     - `id`: Identificador único (ej: `copilotos`).
     - `title`: Título de la fotografía.
     - `image`: Ruta relativa del archivo dentro de `images/` (ej: `images/copilotos.jpg`).
     - `description`: Descripción concisa de la fotografía en **no más de 250 caracteres**.
   - **PROHIBIDO**: No incluir fechas, etiquetas, categorías, ni metadatos adicionales en las tarjetas del blog.

2. **Validación del Límite de 250 Caracteres**:
   - Antes de escribir o actualizar `js/photos.js`, contar la longitud exacta de caracteres del campo `description`.
   - Si la descripción supera los 250 caracteres, avisar al usuario y proponer una versión ajustada que mantenga la esencia sin exceder el límite.

3. **Orden Cronológico**:
   - Las fotos más recientes **siempre deben colocarse al inicio** del arreglo `window.SANTO_TAPON_PHOTOS` en `js/photos.js`.

---

## 🛠️ Procedimiento Paso a Paso para Agregar o Modificar Fotos

### Paso 1: Importar Fotos desde OneDrive
- Revisar las fotos en `C:\Users\gjone\OneDrive\Pictures\Santo Tapón`.
- Copiar las nuevas fotos hacia la carpeta `images/` del repositorio con nombres en minúsculas y sin espacios (ej: `images/copilotos.jpg`).

### Paso 2: Edición de la Base de Datos (`js/photos.js`)
- Añadir el nuevo objeto al inicio del array `photos` en `js/photos.js`:
  ```javascript
  {
    id: "id-unico-en-kebab-case",
    title: "Título de la Foto",
    image: "images/nombre-archivo.jpg",
    description: "Texto descriptivo de máximo 250 caracteres."
  },
  ```

### Paso 3: Validación Local
- Comprobar sintaxis y formato:
  - Que no haya comas faltantes ni errores de sintaxis en `js/photos.js`.
  - Que el conteo de caracteres de `description` sea `<= 250`.
  - Que el archivo de imagen referenciado exista en `images/`.

### Paso 4: Publicación Automática a GitHub Pages
- Ejecutar los comandos de Git para sincronizar con el repositorio remoto:
  ```powershell
  git add images/ js/photos.js
  git commit -m "feat(gallery): agregar foto - [Título]"
  git push origin main
  ```
- El workflow de GitHub Actions desplegará la actualización automáticamente a:
  `https://jonesbisono.github.io/santo-tapon/`
