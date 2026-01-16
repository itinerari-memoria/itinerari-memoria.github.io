// Centra la mappa su Bergamo
const map = L.map('map').setView([45.6983, 9.6773], 15);


// Tile OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Esempio punti cliccabili
const points = [
  { lat: 45.69116, lng: 9.67631, title: "A braccia incrociate - Punto 01", url: "points/point-01.html" },
  { lat: 45.69336, lng: 9.67568, title: "In memoria di Ernesto Rossi e Ada Rossi - Punto 02”", url: "points/point-02.html" },
  { lat: 45.69256, lng: 9.67478, title: "Il controllo dell'educazione - Punto 03", url: "points/point-03.html" },
  { lat: 45.69416, lng: 9.67253, title: "Contro qualsiasi opposizione - Punto 04", url: "points/point-04.html" },
  { lat: 45.69687, lng: 9.67407, title: "Il tribunale speciale - Punto 05", url: "points/point-05.html" },
  { lat: 45.69659, lng: 9.6738, title: "Donne in armi - Punto 06", url: "points/point-06.html" },
  { lat: 45.69628, lng: 9.6731, title: "La prefettura - Punto 07", url: "points/point-07.html" },
  { lat: 45.69591, lng: 9.67217, title: "La Stampa - Punto 08", url: "points/point-08.html" },
  { lat: 45.69562, lng: 9.67049, title: "Uffici di collocamento - Punto 09", url: "points/point-09.html" },
  { lat: 45.69446, lng: 9.66834, title: "Palazzo del Comune - Punto 10", url: "points/point-10.html" },
  { lat: 45.6946, lng: 9.66944, title: "Al centro della città - Punto 11", url: "points/point-11.html" },
  { lat: 45.69722, lng: 9.66859, title: "Casa, scuola, tempio - Punto 12", url: "points/point-12.html" },
  { lat: 45.70324, lng: 9.67282, title: "Il comando della gendarmeria - Punto 14", url: "points/point-14.html" },
  { lat: 45.70021, lng: 9.6773, title: "Caserma Montelungo - Punto 15", url: "points/point-15.html" },
  { lat: 45.70083, lng: 9.66599, title: "Da Monastero a carcere - Punto 13", url: "points/point-13.html" },
  { lat: 45.69912, lng: 9.6752, title: "Pietre d'inciampo - Punto 16", url: "points/point-16.html" },
  { lat: 45.69876, lng: 9.67639, title: "La Banda Turani - Punto 17", url: "points/point-17.html" },
  { lat: 45.69844, lng: 9.67649, title: "Ferruccio Dell'Orto - Punto 18", url: "points/point-18.html" }
];

points.forEach(p => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
  
  L.marker([p.lat, p.lng])
    .addTo(map)
    .bindPopup(`
      <b>${p.title}</b><br>
      <a href="${p.url}" style="text-decoration:none;color:#007bff;">Vai alla pagina</a><br><br>
      <a href="${googleMapsUrl}" target="_blank" class="menu-btn">
        Indicazioni su Google Maps
      </a>
    `);
});


