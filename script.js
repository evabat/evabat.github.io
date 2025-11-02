document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lbImage = lightbox.querySelector('img');
  const closeBtn = document.getElementById('close');
  
  // Create navigation arrows
  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '‹';
  prevBtn.className = 'lb-nav lb-prev';
  prevBtn.setAttribute('aria-label', 'Previous image');
  
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '›';
  nextBtn.className = 'lb-nav lb-next';
  nextBtn.setAttribute('aria-label', 'Next image');
  
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);

  // Add styles for navigation arrows
  const navStyle = document.createElement('style');
  navStyle.textContent = `
    .lb-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      font-size: 48px;
      padding: 20px 15px;
      cursor: pointer;
      z-index: 1002;
      transition: background 0.3s ease;
      font-weight: 300;
      line-height: 1;
    }
    .lb-nav:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    .lb-nav:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .lb-prev {
      left: 20px;
    }
    .lb-next {
      right: 20px;
    }
  `;
  document.head.appendChild(navStyle);

  // Track current image and gallery
  let currentImages = [];
  let currentIndex = 0;

  // Add animation styles
  lightbox.style.transition = 'opacity 0.3s ease';
  lbImage.style.transition = 'transform 0.3s ease';

  // Open lightbox with animation
  function openLightbox(fullSrc, allImages, index) {
    currentImages = allImages;
    currentIndex = index;
    
    lbImage.src = fullSrc;
    lightbox.style.display = 'flex';
    lightbox.style.opacity = '0';
    lbImage.style.transform = 'scale(0.9)';
    
    updateNavButtons();
    
    setTimeout(() => {
      lightbox.style.opacity = '1';
      lbImage.style.transform = 'scale(1)';
    }, 10);
  }

  // Update navigation button states
  function updateNavButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === currentImages.length - 1;
  }

  // Navigate to previous image
  function showPrevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      const fullSrc = currentImages[currentIndex].dataset.full || currentImages[currentIndex].src;
      lbImage.style.transform = 'scale(0.95)';
      setTimeout(() => {
        lbImage.src = fullSrc;
        lbImage.style.transform = 'scale(1)';
        updateNavButtons();
      }, 150);
    }
  }

  // Navigate to next image
  function showNextImage() {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      const fullSrc = currentImages[currentIndex].dataset.full || currentImages[currentIndex].src;
      lbImage.style.transform = 'scale(0.95)';
      setTimeout(() => {
        lbImage.src = fullSrc;
        lbImage.style.transform = 'scale(1)';
        updateNavButtons();
      }, 150);
    }
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
  document.querySelectorAll('.gallery').forEach(gallery => {
    const images = Array.from(gallery.querySelectorAll('img'));
    
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        const fullSrc = img.dataset.full || img.src;
        openLightbox(fullSrc, images, index);
      });
    });
  });

  // Navigation button events
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });

  // Close events
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });
});