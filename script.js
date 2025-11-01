document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lbImage = lightbox.querySelector('img');
  const closeBtn = document.getElementById('close');

  // Add animation styles
  lightbox.style.transition = 'opacity 0.3s ease';
  lbImage.style.transition = 'transform 0.3s ease';

  // Open lightbox with animation
  function openLightbox(fullSrc) {
    lbImage.src = fullSrc;
    lightbox.style.display = 'flex';
    lightbox.style.opacity = '0';
    lbImage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      lightbox.style.opacity = '1';
      lbImage.style.transform = 'scale(1)';
    }, 10);
  }

  // Close lightbox with animation
  function closeLightbox() {
    lightbox.style.opacity = '0';
    lbImage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  }

  // Gallery image clicks - use data-full attribute for full-size image
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      const fullSrc = img.dataset.full || img.src;
      openLightbox(fullSrc);
    });
  });

  // Close events
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // ESC key to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });
});