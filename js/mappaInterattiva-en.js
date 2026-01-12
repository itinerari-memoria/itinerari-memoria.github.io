// Centra la mappa su Bergamo
const map = L.map('map').setView([45.6983, 9.6773], 13);

// Tile OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Esempio punti cliccabili
const points = [
  { lat: 45.69116, lng: 9.67631, title: "Arms Crossed - Point 01", url: "points/point-01-en.html" },
  { lat: 45.69336, lng: 9.67568, title: "In Memory of Ernesto Rossi and Ada Rossi - Point 02", url: "points/point-02-en.html" },
  { lat: 45.69256, lng: 9.67478, title: "Control of Education - Point 03", url: "points/point-03-en.html" },
  { lat: 45.69416, lng: 9.67253, title: "Against Any Opposition - Point 04", url: "points/point-04-en.html" },
  { lat: 45.69687, lng: 9.67407, title: "The Special Tribunal - Point 05", url: "points/point-05-en.html" },
  { lat: 45.69659, lng: 9.6738, title: "Women in Arms - Point 06", url: "points/point-06-en.html" },
  { lat: 45.69628, lng: 9.6731, title: "The Prefecture - Point 07", url: "points/point-07-en.html" },
  { lat: 45.69591, lng: 9.67217, title: "The Press - Point 08", url: "points/point-08-en.html" },
  { lat: 45.69562, lng: 9.67049, title: "Employment Offices - Point 09", url: "points/point-09-en.html" },
  { lat: 45.69446, lng: 9.66834, title: "Town Hall - Point 10", url: "points/point-10-en.html" },
  { lat: 45.6946, lng: 9.66944, title: "At the City Center - Point 11", url: "points/point-11-en.html" },
  { lat: 45.69722, lng: 9.66859, title: "Home, School, Temple - Point 12", url: "points/point-12-en.html" },
  { lat: 45.70083, lng: 9.66599, title: "From Monastery to Prison - Point 13", url: "points/point-13-en.html" },
  { lat: 45.70324, lng: 9.67282, title: "The Gendarmerie Headquarters - Point 14", url: "points/point-14-en.html" },
  { lat: 45.70021, lng: 9.6773, title: "Montelungo Barracks - Point 15", url: "points/point-15-en.html" },
  { lat: 45.69912, lng: 9.6752, title: "Stumbling Stones - Point 16", url: "points/point-16-en.html" },
  { lat: 45.69876, lng: 9.67639, title: "The Turani Gang - Point 17", url: "points/point-17-en.html" },
  { lat: 45.69844, lng: 9.67649, title: "Ferruccio Dell'Orto - Point 18", url: "points/point-18-en.html" }
];

points.forEach(p => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
  
  L.marker([p.lat, p.lng])
    .addTo(map)
    .bindPopup(`
      <b>${p.title}</b><br>
      <a href="${p.url}" style="text-decoration:none;color:#007bff;">Vai alla pagina</a><br><br>
      <a href="${googleMapsUrl}" target="_blank" class="popup-btn">
        Directions on Google Maps
      </a>
    `);
});
