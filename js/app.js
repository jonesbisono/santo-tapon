/**
 * ============================================================================
 * SANTO TAPÓN — Lógica de la Aplicación
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initGallery();
  initLightbox();
});

/* ==========================================================================
   1. GESTIÓN DE TEMA (MODO OSCURO / CLARO)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('st_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Tema inicial
  const activeTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', activeTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('st_theme', newTheme);
    });
  }

  // Escuchar cambios de preferencia del sistema si el usuario no ha fijado una
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('st_theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  });
}

/* ==========================================================================
   2. RENDERIZADO DE LA GALERÍA
   ========================================================================== */
let photosList = [];

function initGallery() {
  const gallery = document.getElementById('gallery');
  const emptyState = document.getElementById('empty-state');

  photosList = Array.isArray(window.SANTO_TAPON_PHOTOS) ? window.SANTO_TAPON_PHOTOS : [];

  if (photosList.length === 0) {
    if (gallery) gallery.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (gallery) {
    gallery.style.display = 'block';
    gallery.innerHTML = '';

    // Placeholder SVG elegante en caso de que la imagen aún no haya sido subida
    const fallbackSvg = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
        <rect width="100%" height="100%" fill="#1a1c23"/>
        <circle cx="300" cy="200" r="48" fill="#2d3139"/>
        <path d="M280 200 L320 200 M300 180 L300 220" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
        <text x="50%" y="280" font-family="-apple-system, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle">Imagen pendiente en images/</text>
      </svg>`
    );
    const fallbackDataUri = `data:image/svg+xml;utf8,${fallbackSvg}`;

    photosList.forEach((photo, index) => {
      const card = document.createElement('article');
      card.className = 'photo-card';
      card.setAttribute('role', 'article');
      card.setAttribute('tabindex', '0');
      card.dataset.index = index;

      // Validación de longitud máxima estricta de 250 caracteres
      let cleanDesc = (photo.description || '').trim();
      if (cleanDesc.length > 250) {
        cleanDesc = cleanDesc.slice(0, 247) + '...';
      }

      card.innerHTML = `
        <div class="card-media">
          <img 
            class="card-img" 
            src="${photo.image}" 
            alt="${photo.title || 'Foto de Santo Domingo'}"
            loading="lazy"
            onerror="this.onerror=null; this.src='${fallbackDataUri}';"
          >
        </div>
        <div class="card-body">
          <h2 class="card-title">${escapeHtml(photo.title || 'Sin título')}</h2>
          <p class="card-description">${escapeHtml(cleanDesc)}</p>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(index));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      gallery.appendChild(card);
    });
  }
}

/* ==========================================================================
   3. VISOR A PANTALLA COMPLETA (LIGHTBOX)
   ========================================================================== */
let currentIndex = 0;

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const overlay = lightbox?.querySelector('.lightbox-overlay');

  if (!lightbox) return;

  closeBtn?.addEventListener('click', closeLightbox);
  overlay?.addEventListener('click', closeLightbox);

  prevBtn?.addEventListener('click', () => navigateLightbox(-1));
  nextBtn?.addEventListener('click', () => navigateLightbox(1));

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Gestos táctiles (Swipe) en móviles
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigateLightbox(-1); // Deslizar a la derecha -> anterior
      else navigateLightbox(1);           // Deslizar a la izquierda -> siguiente
    }
  }
}

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !photosList[index]) return;

  currentIndex = index;
  updateLightboxContent();

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  if (photosList.length === 0) return;
  currentIndex = (currentIndex + direction + photosList.length) % photosList.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = photosList[currentIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');

  if (imgEl) {
    imgEl.src = item.image;
    imgEl.alt = item.title || 'Foto de Santo Domingo';
  }
  if (titleEl) titleEl.textContent = item.title || 'Sin título';
  if (descEl) {
    let cleanDesc = (item.description || '').trim();
    if (cleanDesc.length > 250) {
      cleanDesc = cleanDesc.slice(0, 247) + '...';
    }
    descEl.textContent = cleanDesc;
  }
}

// Utilidad para evitar inyección de HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}
