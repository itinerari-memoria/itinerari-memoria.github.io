(() => {
  const btn = document.getElementById('menuBtn');
  const dlg = document.getElementById('mobileMenu');
  if (!btn || !dlg) return;

  const panel   = dlg.querySelector('[data-panel]');
  const overlay = dlg.querySelector('[data-overlay]');
  const closeBtn = document.getElementById('closeBtn');
  const links = dlg.querySelectorAll('nav[aria-label="Mobile"] a');

  const lockScroll = (v) => { document.documentElement.style.overflow = v ? 'hidden' : ''; };

  function openMenu(){
    dlg.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    lockScroll(true);
  }
  function closeMenu(){
    dlg.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    lockScroll(false);
  }

  btn.addEventListener('click', openMenu);
  overlay && overlay.addEventListener('click', closeMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  links.forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dlg.classList.contains('open')) closeMenu();
  });

  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener?.('change', (ev) => { if (ev.matches) closeMenu(); });
})();
