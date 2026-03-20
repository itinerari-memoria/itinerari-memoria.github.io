const NAVBAR_CSS_PATH = "../css/navbar.css";

function ensureNavbarStylesheet() {
  const exists = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .some((l) => (l.getAttribute("href") || "").includes("navbar.css"));
  if (exists) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = NAVBAR_CSS_PATH;
  document.head.appendChild(link);
}

function getHeaderFile() {
  const path = window.location.pathname.toLowerCase();
  const docLang = (document.documentElement.lang || "").toLowerCase();
  const isEnglish = path.endsWith("index-en.html") || docLang.startsWith("en");
  return isEnglish ? "header-en.html" : "header-it.html";
}

function markActiveNav() {
  const links = document.querySelectorAll(".nav-links a, .mobile-links a");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  links.forEach((a) => {
    const href = a.getAttribute("href") || "";
    const targetPath = href.split("#")[0].split("/").pop();
    if (targetPath === currentPath) a.setAttribute("aria-current", "page");
  });
}

function getMobileNavItems() {
  const path = window.location.pathname.toLowerCase();
  const docLang = (document.documentElement.lang || "").toLowerCase();
  const isEnglish = path.includes("en") || docLang.startsWith("en");

  return {
    isEnglish,
    items: isEnglish
      ? [
          { href: "index-en.html#sezione-progetto", label: "The project" },
          { href: "index-en.html#sezione-itinerari", label: "Itinerary" },
          { href: "index-en.html#sezione-telecamera", label: "QR Code" },
          { href: "chi_siamo-en.html", label: "About us" },
        ]
      : [
          { href: "index.html#sezione-progetto", label: "Il progetto" },
          { href: "index.html#sezione-itinerari", label: "Itinerario" },
          { href: "index.html#sezione-telecamera", label: "QR Code" },
          { href: "chi_siamo-it.html", label: "Chi siamo" },
        ],
  };
}

function ensureMobilePanelLinks(container) {
  const panel = container.querySelector("[data-panel]");
  if (!panel) return;

  let nav = panel.querySelector(".mobile-links");
  if (!nav) {
    nav = document.createElement("nav");
    nav.className = "mobile-links";
    nav.setAttribute("aria-label", "Mobile");
    panel.appendChild(nav);
  }

  nav.innerHTML = "";

  const { isEnglish, items } = getMobileNavItems();

  // 🔹 Link normali
  items.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    nav.appendChild(link);
  });

  // 🔹 SWITCH FIGO
  const switchDiv = document.createElement("div");
  switchDiv.className = "mobile-lang-switch" + (isEnglish ? " en" : "");

  switchDiv.innerHTML = `
  <a href="index.html" class="lang-option ${!isEnglish ? "active" : ""}" data-lang="it">IT</a>
  <a href="index-en.html" class="lang-option ${isEnglish ? "active" : ""}" data-lang="en">EN</a>
  <span class="lang-slider"></span>
`;
  nav.appendChild(switchDiv);

  if(switchDiv) {
    switchDiv.classList.toggle("en", isEnglish);
  }
}


function initMobileMenu(container) {
  const btn = container.querySelector("#menuBtn");
  const dlg = container.querySelector("#mobileMenu");
  if (!btn || !dlg) return;

  if (dlg.parentElement !== document.body) {
    document.body.appendChild(dlg);
  }

  const panel = dlg.querySelector("[data-panel]");
  const overlay = dlg.querySelector("[data-overlay]");
  const closeBtn = dlg.querySelector("#closeBtn");
  const links = dlg.querySelectorAll("nav[aria-label='Mobile'] a");

  const lockScroll = (v) => {
    document.documentElement.style.overflow = v ? "hidden" : "";
  };

  function openMenu() {
    dlg.classList.remove("hidden");
    requestAnimationFrame(() => {
      panel.classList.remove("translate-x-full");
      btn.setAttribute("aria-expanded", "true");
      lockScroll(true);
    });
  }

  function closeMenu() {
    panel.classList.add("translate-x-full");
    btn.setAttribute("aria-expanded", "false");
    lockScroll(false);
    setTimeout(() => dlg.classList.add("hidden"), 200);
  }

  btn.addEventListener("click", openMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  links.forEach((a) => a.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dlg.classList.contains("hidden")) closeMenu();
  });

  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener?.("change", (ev) => {
    if (ev.matches) closeMenu();
  });
}

async function loadHeader() {
  ensureNavbarStylesheet();

  let container = document.getElementById("siteHeader");
  if (!container) {
    container = document.createElement("div");
    container.id = "siteHeader";
    document.body.prepend(container);
  }

  const response = await fetch(getHeaderFile());
  const html = await response.text();
  container.innerHTML = html;

  ensureMobilePanelLinks(container);
  initMobileMenu(container);
  markActiveNav();

  // 🔹 Inizializza il lang switch solo dopo che l'HTML è stato inserito
  initLangSwitch();
}

loadHeader().catch(console.error);

function initLangSwitch() {
  // Seleziona tutti gli switch lingua, desktop e mobile
  const switchEls = document.querySelectorAll('.mobile-lang-switch, .desktop-lang-link');

  switchEls.forEach(switchEl => {
    const options = switchEl.querySelectorAll('.lang-option, a');
    const slider = switchEl.querySelector('.lang-slider');

    // Determina la lingua della pagina
    const path = window.location.pathname.toLowerCase();
    const isEnglish = path.endsWith("index-en.html") || document.documentElement.lang.toLowerCase().startsWith("en");

    // Rimuove active da tutti i pulsanti
    options.forEach(btn => btn.classList.remove('active'));

    // Imposta il pulsante attivo
    const activeBtn = Array.from(options).find(btn => {
      const lang = btn.dataset.lang || btn.textContent.toLowerCase();
      return (isEnglish && lang === "en") || (!isEnglish && lang === "it");
    });

    if (activeBtn) activeBtn.classList.add('active');

    // Muove lo slider sotto il pulsante attivo
    if (slider && activeBtn) {
      const index = Array.from(options).indexOf(activeBtn);
      slider.style.transform = `translateX(${index * 100}%)`;
    }

    // Click sui pulsanti per cambiare pagina
    options.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const lang = btn.dataset.lang || btn.textContent.toLowerCase();
        if (lang === "en") window.location.href = "index-en.html";
        else window.location.href = "index.html";
      });
    });
  });
}
