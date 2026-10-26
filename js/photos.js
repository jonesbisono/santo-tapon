/**
 * ============================================================================
 * SANTO TAPÓN — Base de Datos de Fotografías
 * ============================================================================
 * 
 * Reglas de formato:
 * 1. Cada foto debe tener: 'id', 'title', 'image', y 'description'.
 * 2. 'description' no debe superar los 250 caracteres.
 * 3. Las fotos se muestran en el orden en que aparecen aquí (la primera arriba).
 */

const photos = [
  {
    id: "copilotos",
    title: "Copilotos",
    image: "images/copilotos.jpg",
    description: "Descripción pendiente..."
  },
  {
    id: "dostiempos",
    title: "Dos Tiempos",
    image: "images/dostiempos.jpg",
    description: "Descripción pendiente..."
  },
  {
    id: "tregua",
    title: "Tregua",
    image: "images/tregua.jpg",
    description: "Descripción pendiente..."
  }
];

if (typeof window !== 'undefined') {
  window.SANTO_TAPON_PHOTOS = photos;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = photos;
}
