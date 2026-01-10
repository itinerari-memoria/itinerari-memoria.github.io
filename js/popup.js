document.querySelectorAll('.popup-trigger').forEach(trigger => {
  const popup = document.getElementById(trigger.dataset.popup);

  // Apri popup
  trigger.addEventListener('click', () => {
    popup.style.display = 'flex';
    setTimeout(() => popup.querySelector('.popup-content').style.opacity = 1, 10);
    setTimeout(() => popup.querySelector('.popup-content').style.transform = 'scale(1)', 10);
  });

  // Chiudi popup con pulsante
  popup.querySelector('.popup-close').addEventListener('click', () => {
    const content = popup.querySelector('.popup-content');
    content.style.opacity = 0;
    content.style.transform = 'scale(0.9)';
    setTimeout(() => popup.style.display = 'none', 250);
  });

  // Chiudi popup cliccando sull'overlay
  popup.addEventListener('click', e => {
    if (e.target === popup) {
      const content = popup.querySelector('.popup-content');
      content.style.opacity = 0;
      content.style.transform = 'scale(0.9)';
      setTimeout(() => popup.style.display = 'none', 250);
    }
  });
});
