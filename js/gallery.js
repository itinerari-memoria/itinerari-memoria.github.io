document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // ELEMENTI (SAFE CHECK)
  // =========================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  const videoLightbox = document.getElementById('video-lightbox');
  const lightboxVideo = document.getElementById('lightbox-video');

  // =========================
  // IMMAGINI
  // =========================
  const images = document.querySelectorAll('img[data-full]');

  if (lightbox && lightboxImg) {
    images.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.dataset.full;
        lightbox.style.display = 'flex';
      });
    });
  }

  // =========================
  // VIDEO THUMBNAIL
  // =========================
  const videos = document.querySelectorAll('.lightbox-video');

  if (videoLightbox && lightboxVideo) {
    videos.forEach(video => {
      video.addEventListener('click', () => {

        const source = video.querySelector('source');
        if (!source) return;

        lightboxVideo.src = source.src;
        videoLightbox.style.display = 'flex';

        lightboxVideo.play();
      });
    });
  }

  // =========================
  // CHIUSURA IMMAGINI
  // =========================
  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
      if (lightboxImg) lightboxImg.src = "";
    });

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImg.src = "";
      }
    });
  }

  // =========================
  // CHIUSURA VIDEO
  // =========================
  if (videoLightbox && lightboxVideo) {
    videoLightbox.addEventListener('click', e => {
      if (e.target === videoLightbox) {
        videoLightbox.style.display = 'none';
        lightboxVideo.pause();
        lightboxVideo.src = "";
      }
    });
  }

});