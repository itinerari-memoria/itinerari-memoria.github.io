document.addEventListener("DOMContentLoaded", function () {

    // Coordinate dell'Istituto Tecnico Vittorio Emanuele II
    const coordinates = [45.69675345969597, 9.67369090785965];

    // Inizializza la mappa
    const map = L.map('map').setView(coordinates, 16);

    // Layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marker
    L.marker(coordinates)
        .addTo(map)
        .bindPopup("<b>Scuola media 'Eugenio Donadoni'</b><br>Bergamo")
        .openPopup();

    // Correzione rendering (utile se la mappa è in un container nascosto)
    setTimeout(() => {
        map.invalidateSize();
    }, 300);

});