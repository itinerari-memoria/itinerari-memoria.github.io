document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('puntiToggle');
    const dropdown = document.getElementById('puntiDropdown');

    if (toggleBtn && dropdown) {
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Evita che il click si propaghi
            dropdown.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        });

        // Chiudi il dropdown se si clicca fuori
        document.addEventListener('click', function (event) {
            if (!toggleBtn.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
                toggleBtn.classList.remove('active');
            }
        });

        // Chiudi il dropdown se si clicca su un link
        const puntoLinks = document.querySelectorAll('.punto-btn');
        puntoLinks.forEach(link => {
            link.addEventListener('click', function () {
                dropdown.classList.remove('active');
                toggleBtn.classList.remove('active');
            });
        });
    }
});