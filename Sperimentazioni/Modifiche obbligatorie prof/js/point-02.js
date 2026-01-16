document.addEventListener("DOMContentLoaded", function () {

    // Coordinate dell'Istituto Tecnico Vittorio Emanuele II
    const coordinates = [45.69255919897298, 9.67478728735614];

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
        .bindPopup("<b>Istituto Tecnico Vittorio Emanuele II</b><br>Bergamo")
        .openPopup();

    // Correzione rendering (utile se la mappa è in un container nascosto)
    setTimeout(() => {
        map.invalidateSize();
    }, 300);

});