"use strict";

document.addEventListener('DOMContentLoaded', function() {
  // Prende tutti i trigger
  document.querySelectorAll('.popup-trigger').forEach(trigger => {
    const popupId = trigger.dataset.popup;
    const popup = document.getElementById(popupId);
    const closeBtn = popup.querySelector('.popup-close');

    // Mostra popup
    trigger.addEventListener('click', () => {
      popup.style.display = 'flex';
      setTimeout(() => popup.classList.add('show'), 10);
    });

    // Chiudi con pulsante
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('show');
      setTimeout(() => popup.style.display = 'none', 250);
    });

    // Chiudi cliccando fuori dal contenuto
    popup.addEventListener('click', e => {
      if (e.target === popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.style.display = 'none', 250);
      }
    });
  });
});
