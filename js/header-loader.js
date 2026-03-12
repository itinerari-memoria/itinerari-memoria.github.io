const NAVBAR_CSS_PATH = "Sperimentazioni/css/navbar.css";

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
  const isEnglish = path.endsWith("index-en.html") || docLang.startsWith("en");

  if (isEnglish) {
    return [
      { href: "index-en.html#sezione-progetto", label: "Project" },
      { href: "index-en.html#sezione-itinerari", label: "Itineraries" },
      { href: "index-en.html#sezione-telecamera", label: "QR Code" },
      { href: "index.html", label: "Italiano", className: "mobile-lang-link" },
    ];
  }

  return [
    { href: "index.html#sezione-progetto", label: "Progetto" },
    { href: "index.html#sezione-itinerari", label: "Itinerari" },
    { href: "index.html#sezione-telecamera", label: "QR Code" },
    { href: "index-en.html", label: "English", className: "mobile-lang-link" },
  ];
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

  getMobileNavItems().forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    if (item.className) link.className = item.className;
    nav.appendChild(link);
  });
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
}

loadHeader().catch(console.error);
