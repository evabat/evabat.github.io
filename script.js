document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lbImage = lightbox.querySelector('img');
  const closeBtn = document.getElementById('close');

  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lbImage.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
});