/**
 * ============================================================================
 * SANTO TAPÓN — Base de Datos de Fotografías
 * ============================================================================
 * 
 * Reglas de formato:
 * 1. Cada foto debe tener: 'id', 'title', 'image', y 'description'.
 * 2. 'description' no debe superar los 250 caracteres.
 * 3. Las fotos se muestran en el orden en que aparecen aquí (la primera arriba).
 * 
 * Ejemplo para agregar una nueva foto:
 * {
 *   id: "foto-4",
 *   title: "Atardecer en el Malecón",
 *   image: "images/malecon-atardecer.jpg",
 *   description: "La brisa del mar Caribe golpeando los arrecifes al caer la tarde."
 * },
 */

const photos = [
  {
    id: "foto-1",
    title: "Foto 1",
    image: "images/foto1.jpg",
    description: "Texto descriptivo pendiente (hasta 250 caracteres)."
  },
  {
    id: "foto-2",
    title: "Foto 2",
    image: "images/foto2.jpg",
    description: "Texto descriptivo pendiente (hasta 250 caracteres)."
  },
  {
    id: "foto-3",
    title: "Foto 3",
    image: "images/foto3.jpg",
    description: "Texto descriptivo pendiente (hasta 250 caracteres)."
  }
];

if (typeof window !== 'undefined') {
  window.SANTO_TAPON_PHOTOS = photos;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = photos;
}
