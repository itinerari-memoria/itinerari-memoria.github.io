document.addEventListener("DOMContentLoaded", function () {

    // Coordinate dell'Istituto Tecnico Vittorio Emanuele II
    const coordinates = [45.69862687331072, 9.676518180835286];

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
        .bindPopup("<b>Via Pignolo 13</b><br>Bergamo")
        .openPopup();

    // Correzione rendering (utile se la mappa è in un container nascosto)
    setTimeout(() => {
        map.invalidateSize();
    }, 300);

});