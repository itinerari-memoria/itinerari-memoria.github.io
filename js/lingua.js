(function() {
    const userLang = navigator.language || navigator.userLanguage;
    const currentPage = window.location.pathname;

    // Se lingua NON italiana e pagina attuale NON è index-en.html
    if (!userLang.toLowerCase().startsWith('it') && !currentPage.endsWith('index-en.html')) {
        window.location.href = currentPage.replace('index.html', 'index-en.html');
    }
})();