(function() {
    // =========================
    // 1️⃣ Controllo lingua browser
    // =========================
    const userLang = navigator.language || navigator.userLanguage;
  
    // Se lingua NON italiana e non siamo già sulla pagina EN
    if (!userLang.toLowerCase().startsWith('it')) {
      if (!window.location.pathname.includes('-en')) {
        window.location.href = window.location.pathname.replace('index.html', 'index-en.html');
      }
    }})();