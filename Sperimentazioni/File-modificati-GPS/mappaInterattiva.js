// ==========================
// MAPPA BASE
// ==========================
const map = L.map('map').setView([45.6983, 9.6773], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);

// ==========================
// PUNTI
// ==========================
const points = [
  { lat: 45.69116, lng: 9.67631, title: "A braccia incrociate - Punto 01", url: "points/point-01.html" },
  { lat: 45.69336, lng: 9.67568, title: "In memoria di Ernesto Rossi e Ada Rossi - Punto 02", url: "points/point-02.html" },
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
  { lat: 45.70083, lng: 9.66599, title: "Da Monastero a carcere - Punto 13", url: "points/point-13.html" },
  { lat: 45.70324, lng: 9.67282, title: "Il comando della gendarmeria - Punto 14", url: "points/point-14.html" },
  { lat: 45.70021, lng: 9.6773, title: "Caserma Montelungo - Punto 15", url: "points/point-15.html" },
  { lat: 45.69912, lng: 9.6752, title: "Pietre d'inciampo - Punto 16", url: "points/point-16.html" },
  { lat: 45.69876, lng: 9.67639, title: "La Banda Turani - Punto 17", url: "points/point-17.html" },
  { lat: 45.69844, lng: 9.67649, title: "Ferruccio Dell'Orto - Punto 18", url: "points/point-18.html" }
];

// ==========================
// ICONS
// ==========================
const userIcon = L.divIcon({ className: "user-marker", html: "●", iconSize: [20,20] });
const nearestIcon = L.divIcon({ className: "nearest-marker", html: "📍", iconSize: [24,24], iconAnchor:[12,24] });

// ==========================
// MARKERS E CARD
// ==========================
const pointMarkers = [];
const cardsContainer = document.getElementById("points-cards");
const pointCards = [];

points.forEach(p => {
  const marker = L.marker([p.lat, p.lng]).addTo(map)
    .bindPopup(`<b>${p.title}</b><br><a href="${p.url}">Vai alla pagina</a>`);
  pointMarkers.push({ ...p, marker });

  // card
  const card = document.createElement("div");
  card.className = "point-card";
  card.innerHTML = `
    <div class="point-title">${p.title}</div>
    <div class="point-distance" style="display:none;">Distanza: --</div>
    <div class="point-actions">
      <button class="btn-route">Indicazioni</button>
    </div>
  `;

  // click sulla card apre la pagina del punto
  card.addEventListener("click", (e) => {
    // evita che il click sul pulsante “Indicazioni” apra la pagina
    if (!e.target.classList.contains("btn-route")) {
      window.location.href = p.url;
    }
  });

  // click indicazioni Google Maps
  card.querySelector(".btn-route").addEventListener("click", (e) => {
    e.stopPropagation(); // non propagare il click alla card
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`);
  });

  cardsContainer.appendChild(card);
  pointCards.push({ ...p, card });
});


// ==========================
// GEOLOCALIZZAZIONE
// ==========================
const gpsStatus = document.getElementById("gpsStatus");
const gpsBtn = document.getElementById("gpsBtn");
let userMarker = null;
let accuracyCircle = null;
let watchId = null;
let nearestMarker = null;

function startTracking() {
  if (!navigator.geolocation) {
    gpsStatus.textContent = "Geolocalizzazione non supportata";
    gpsBtn.style.display = "none";
    return;
  }

  gpsStatus.textContent = "📡 Attivazione GPS in corso…";
  gpsBtn.style.display = "none";

  navigator.geolocation.getCurrentPosition(
    position => {
      gpsStatus.textContent = "📍 GPS attivo";
      gpsBtn.style.display = "none";
      updateUserPosition(position);

      watchId = navigator.geolocation.watchPosition(updateUserPosition,
        err=>{console.error(err);},
        { enableHighAccuracy:true, maximumAge:1000, timeout:10000 });
    },
    error => {
      gpsStatus.textContent = "";
      gpsBtn.style.display = "inline-block";
      console.error("GPS non attivo", error);
    },
    { enableHighAccuracy:true, timeout:10000 }
  );
}

gpsBtn.addEventListener("click", startTracking);

// al load prova ad avviare GPS
window.addEventListener("load",()=>startTracking());

// ==========================
// UPDATE POSIZIONE
// ==========================
function updateUserPosition(position){
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  map.setView([lat,lng],16);

  // marker utente
  if(!userMarker) userMarker = L.marker([lat,lng],{icon:userIcon}).addTo(map).bindPopup("🟢 Sei qui");
  else userMarker.setLatLng([lat,lng]);

  if(!accuracyCircle) accuracyCircle=L.circle([lat,lng],{radius:accuracy,color:"green",fillOpacity:0.15}).addTo(map);
  else accuracyCircle.setLatLng([lat,lng]).setRadius(accuracy);

  highlightNearestPoint(lat,lng);
}

// ==========================
// HIGHLIGHT PUNTO PIU VICINO
// ==========================
function highlightNearestPoint(userLat,userLng){
  let nearest=null;
  let minDistance=Infinity;

  pointMarkers.forEach(p=>{
    const dist = map.distance([userLat,userLng],[p.lat,p.lng]);
    if(dist<minDistance){minDistance=dist; nearest=p;}
  });

  pointCards.forEach(p=>{
    const distEl=p.card.querySelector(".point-distance");
    if(userLat && userLng){
      let d=minDistance;
      let txt;
      if(d>999){txt=(d/1000).toFixed(2)+" km";}else{txt=Math.round(d)+" m";}
      distEl.textContent="Distanza: "+txt;
      distEl.style.display="block";
    } else {
      distEl.style.display="none";
    }
    p.card.classList.remove("nearest");
  });

  if(!nearest) return;

  // highlight card
  const nearestCard = pointCards.find(p=>p.url===nearest.url);
  if(nearestCard) nearestCard.card.classList.add("nearest");

  // highlight marker
  if(nearestMarker && nearestMarker!==nearest.marker) nearestMarker.setIcon(new L.Icon.Default());
  nearest.marker.setIcon(nearestIcon);
  nearestMarker = nearest.marker;
  nearest.marker.bindTooltip(`📍 Punto più vicino (${Math.round(minDistance)} m)`,{permanent:false});
}
