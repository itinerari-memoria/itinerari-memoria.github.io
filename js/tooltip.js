"use strict";

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.tooltip-hover').forEach(el => {
    const tooltip = el.querySelector('.tooltiptext-hover');

    function showTooltip() {
      el.classList.add('show-tooltip');
      adjustTooltipPosition();
    }

    function hideTooltip() {
      el.classList.remove('show-tooltip');
      tooltip.style.transform = '';
    }

    function adjustTooltipPosition() {
      const rect = tooltip.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      let shiftX = 0;

      if(rect.left < 5) shiftX = 5 - rect.left;
      else if(rect.right > screenWidth - 5) shiftX = (screenWidth - 5) - rect.right;

      tooltip.style.left = '50%';
      tooltip.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
    }

    // Eventi desktop
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('focus', showTooltip);
    el.addEventListener('blur', hideTooltip);

    // Eventi touch/mobile
    el.addEventListener('touchstart', function(e) {
      if(el.classList.contains('show-tooltip')) hideTooltip();
      else showTooltip();
    });
  });

  // Chiude tooltip se tocchi fuori su mobile
  document.addEventListener('touchstart', function(e){
    document.querySelectorAll('.tooltip-hover.show-tooltip').forEach(el=>{
      if(!el.contains(e.target)){
        el.classList.remove('show-tooltip');
        el.querySelector('.tooltiptext-hover').style.transform = '';
      }
    });
  });

  // Aggiorna posizione al resize della finestra
  window.addEventListener('resize', () => {
    document.querySelectorAll('.tooltip-hover.show-tooltip').forEach(el => {
      const tooltip = el.querySelector('.tooltiptext-hover');
      const rect = tooltip.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      let shiftX = 0;

      if(rect.left < 5) shiftX = 5 - rect.left;
      else if(rect.right > screenWidth - 5) shiftX = (screenWidth - 5) - rect.right;

      tooltip.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
    });
  });
});
