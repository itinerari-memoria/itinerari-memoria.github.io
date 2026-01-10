"use strict";

document.addEventListener('DOMContentLoaded', function() {
  const trigger = document.querySelector('.popup-trigger');
  const popup = document.getElementById('popupBox');
  const closeBtn = document.getElementById('popupClose');

  // Mostra popup con animazione
  trigger.addEventListener('click', function() {
    popup.style.display = 'flex';
    // piccola pausa per attivare la transizione
    setTimeout(() => popup.classList.add('show'), 10);
  });

  // Chiudi popup con pulsante
  closeBtn.addEventListener('click', function() {
    popup.classList.remove('show');
    setTimeout(() => popup.style.display = 'none', 250); // attende fine animazione
  });

  // Chiudi popup cliccando fuori dal contenuto
  popup.addEventListener('click', function(e){
    if(e.target === popup){ // solo se clicchi sull'overlay, non sul contenuto
      popup.classList.remove('show');
      setTimeout(() => popup.style.display = 'none', 250);
    }
  });
});
