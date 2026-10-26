/**
 * ============================================================================
 * SANTO TAPÓN — Lógica de la Aplicación
 * Diseño Editorial de Una Sola Página con Disposición Staggered
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initGallery();
  initLightbox();
});

/* ==========================================================================
   1. GESTIÓN DE TEMA (NEGRO SÓLIDO / BEIGE CLARO)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('st_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Tema inicial: Negro Sólido (dark) o Beige Claro (light)
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
   2. RENDERIZADO DE LA GALERÍA STAGGERED (UNA SOLA PÁGINA)
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
    gallery.style.display = 'flex';
    gallery.innerHTML = '';

    photosList.forEach((photo, index) => {
      const section = document.createElement('section');
      const isReversed = index % 2 !== 0; // Alternado: pares a la izquierda, impares a la derecha
      section.className = `photo-row ${isReversed ? 'is-reversed' : ''}`;
      section.setAttribute('role', 'article');
      section.dataset.index = index;

      // Validación de longitud máxima estricta de 250 caracteres
      let cleanDesc = (photo.description || '').trim();
      if (cleanDesc.length > 250) {
        cleanDesc = cleanDesc.slice(0, 247) + '...';
      }

      const formattedNumber = String(index + 1).padStart(2, '0');

      section.innerHTML = `
        <div class="photo-media" tabindex="0" role="button" aria-label="Ver foto a pantalla completa: ${escapeHtml(photo.title || '')}">
          <img 
            class="photo-img" 
            src="${photo.image}" 
            alt="${escapeHtml(photo.title || 'Fotografía de Santo Domingo')}"
            loading="${index === 0 ? 'eager' : 'lazy'}"
          >
        </div>
        <div class="photo-info">
          <span class="photo-number">${formattedNumber} / Santo Domingo</span>
          <h2 class="photo-title">${escapeHtml(photo.title || 'Sin título')}</h2>
          <p class="photo-description">${escapeHtml(cleanDesc)}</p>
        </div>
      `;

      const mediaEl = section.querySelector('.photo-media');
      mediaEl.addEventListener('click', () => openLightbox(index));
      mediaEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      gallery.appendChild(section);
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
      if (diff > 0) navigateLightbox(-1);
      else navigateLightbox(1);
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
  document.body.style.overflow = 'hidden';
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
    imgEl.alt = item.title || 'Fotografía de Santo Domingo';
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

// Utilidad para sanitizar texto
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
