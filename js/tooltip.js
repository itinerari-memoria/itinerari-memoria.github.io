"use strict";

document.addEventListener('DOMContentLoaded', function() {

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  document.querySelectorAll('.tooltip-hover').forEach(el => {
    const tooltip = el.querySelector('.tooltiptext-hover');

    function adjustPosition() {
      const rect = tooltip.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      let shiftX = 0;

      if(rect.left < 5) shiftX = 5 - rect.left;
      else if(rect.right > screenWidth - 5) shiftX = (screenWidth - 5) - rect.right;

      tooltip.style.left = '50%';
      tooltip.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
    }

    function showTooltip() {
      el.classList.add('show-tooltip');
      adjustPosition();
    }

    function hideTooltip() {
      el.classList.remove('show-tooltip');
      tooltip.style.transform = '';
    }

    // desktop hover/focus
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('focus', showTooltip);
    el.addEventListener('blur', hideTooltip);

    if(isTouch){
      // touch devices
      el.addEventListener('click', function(e){
        e.stopPropagation(); // importante: blocca il bubbling
        if(el.classList.contains('show-tooltip')) hideTooltip();
        else showTooltip();
      });
    }
  });

  if(isTouch){
    // chiudi tooltip se tocchi fuori
    document.addEventListener('click', function(e){
      document.querySelectorAll('.tooltip-hover.show-tooltip').forEach(el=>{
        if(!el.contains(e.target)){
          el.classList.remove('show-tooltip');
          el.querySelector('.tooltiptext-hover').style.transform = '';
        }
      });
    });
  }

  // aggiorna tooltip al resize della finestra
  window.addEventListener('resize', function(){
    document.querySelectorAll('.tooltip-hover.show-tooltip').forEach(el=>{
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
