document.querySelectorAll('.popup-trigger').forEach(trigger => {
  const popup = document.getElementById(trigger.dataset.popup);

  // Apri popup
  trigger.addEventListener('click', () => {
    popup.classList.add('show');
  });

  // Chiudi popup con pulsante
  popup.querySelector('.popup-close')?.addEventListener('click', () => {
    popup.classList.remove('show');
  });

  // Chiudi popup cliccando sull'overlay
  popup.addEventListener('click', e => {
    if (e.target === popup) {
      popup.classList.remove('show');
    }
  });

  // Chiudi popup con ESC
  document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
      popup.classList.remove('show');
    }
  });
});