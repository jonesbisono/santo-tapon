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
    id: "tregua",
    title: "Tregua",
    image: "images/tregua.jpg",
    description: "Una tregua no es rendición; es el segundo exacto donde el cuerpo detiene la marcha para interrogar al cielo, sabiendo que aquí hasta el clima condiciona la supervivencia."
  },
  {
    id: "copilotos",
    title: "Copilotos",
    image: "images/copilotos.jpg",
    description: "¿Quién cuida a quién? En una ciudad que descarta lo frágil, estos copilotos de trapo humanizan la chatarra y le recuerdan al que va detrás que no todo lo viejo se bota."
  },
  {
    id: "dostiempos",
    title: "Dos Tiempos",
    image: "images/dostiempos.jpg",
    description: "A dos tiempos: el tiempo de un Estado ausente que te ignora y el tiempo del igual que te empuja. La solidaridad informal resolviendo lo que la infraestructura nunca aprendió."
  }
];

if (typeof window !== 'undefined') {
  window.SANTO_TAPON_PHOTOS = photos;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = photos;
}
