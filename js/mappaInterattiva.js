const map = L.map('map').setView([45.6983, 9.6773], 13.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const points = [
  { lat: 45.69116, lng: 9.67631, title: "A braccia incrociate - Punto 01", url: "points/point-01.html", id: "point-01" },
  { lat: 45.69336, lng: 9.67568, title: "In memoria di Ernesto Rossi e Ada Rossi - Punto 02", url: "points/point-02.html", id: "point-02" },
  { lat: 45.69256, lng: 9.67478, title: "Il controllo dell'educazione - Punto 03", url: "points/point-03.html", id: "point-03" },
  { lat: 45.69416, lng: 9.67253, title: "Contro qualsiasi opposizione - Punto 04", url: "points/point-04.html", id: "point-04" },
  { lat: 45.69687, lng: 9.67407, title: "Il tribunale speciale - Punto 05", url: "points/point-05.html", id: "point-05" },
  { lat: 45.69659, lng: 9.6738, title: "Donne in armi - Punto 06", url: "points/point-06.html", id: "point-06" },
  { lat: 45.69628, lng: 9.6731, title: "La prefettura - Punto 07", url: "points/point-07.html", id: "point-07" },
  { lat: 45.69591, lng: 9.67217, title: "La Stampa - Punto 08", url: "points/point-08.html", id: "point-08" },
  { lat: 45.69562, lng: 9.67049, title: "Uffici di collocamento - Punto 09", url: "points/point-09.html", id: "point-09" },
  { lat: 45.69446, lng: 9.66834, title: "Palazzo del Comune - Punto 10", url: "points/point-10.html", id: "point-10" },
  { lat: 45.6946, lng: 9.66944, title: "Al centro della città - Punto 11", url: "points/point-11.html", id: "point-11" },
  { lat: 45.69722, lng: 9.66859, title: "Casa, scuola, tempio - Punto 12", url: "points/point-12.html", id: "point-12" },
  { lat: 45.70324, lng: 9.67282, title: "Il comando della gendarmeria - Punto 14", url: "points/point-14.html", id: "point-14" },
  { lat: 45.70021, lng: 9.6773, title: "Caserma Montelungo - Punto 15", url: "points/point-15.html", id: "point-15" },
  { lat: 45.70083, lng: 9.66599, title: "Da Monastero a carcere - Punto 13", url: "points/point-13.html", id: "point-13" },
  { lat: 45.69912, lng: 9.6752, title: "Pietre d'inciampo - Punto 16", url: "points/point-16.html", id: "point-16" },
  { lat: 45.69876, lng: 9.67639, title: "La Banda Turani - Punto 17", url: "points/point-17.html", id: "point-17" },
  { lat: 45.69844, lng: 9.67649, title: "Ferruccio Dell'Orto - Punto 18", url: "points/point-18.html", id: "point-18" }
];

// Icone personalizzate
const userIcon = L.divIcon({ 
  className: "user-marker", 
  html: "●", 
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const nearestIcon = L.divIcon({ 
  className: "nearest-marker", 
  html: "📍", 
  iconSize: [24, 24], 
  iconAnchor: [12, 24]
});

// Variabili per la geolocalizzazione
const gpsStatus = document.getElementById("gpsStatus");
const gpsBtn = document.getElementById("gpsBtn");
const puntiDropdown = document.getElementById("puntiDropdown");
const puntiToggle = document.getElementById("puntiToggle");

let userMarker = null;
let accuracyCircle = null;
let nearestMarker = null;
let currentPosition = null;
let watchId = null;

// Aggiungi marker per ogni punto
points.forEach(p => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;

  const marker = L.marker([p.lat, p.lng])
    .addTo(map)
    .bindPopup(`
      <b>${p.title}</b><br>
      <a href="${googleMapsUrl}" target="_blank" class="popup-link">📍 Indicazioni stradali</a><br><br>
      <a href="${p.url}" class="menu-btn">Vai alla pagina</a>
    `);
  
  // Aggiungi l'id al marker per riferimento
  marker.pointId = p.id;
});

// Funzione per aprire il menu a tendina e calcolare l'altezza corretta
function openDropdown() {
  if (puntiDropdown && !puntiDropdown.classList.contains('active')) {
    // Apri il dropdown
    puntiDropdown.classList.add('active');
    puntiToggle.classList.add('active');
    
    // Calcola l'altezza necessaria dopo che il contenuto è stato renderizzato
    setTimeout(() => {
      const grid = document.querySelector('.punti-grid');
      if (grid) {
        // Calcola l'altezza totale della griglia
        const gridHeight = grid.scrollHeight;
        // Aggiungi il padding del dropdown (top + bottom)
        const dropdownPadding = 50 + 30; // 50px top + 30px bottom
        // Imposta l'altezza massima
        puntiDropdown.style.maxHeight = `${gridHeight + dropdownPadding + 50}px`;
      }
    }, 50); // Piccolo delay per assicurarsi che il contenuto sia renderizzato
  }
}

// Funzione per aggiornare le distanze nei bottoni
function updateDistancesInButtons(userLat, userLng) {
  const puntoButtons = document.querySelectorAll('.punto-btn');
  
  // Calcola tutte le distanze
  const distances = points.map(p => {
    const dist = map.distance([userLat, userLng], [p.lat, p.lng]);
    return { ...p, distance: dist };
  });
  
  // Trova il punto più vicino
  const nearestPoint = distances.reduce((prev, current) => 
    (prev.distance < current.distance) ? prev : current
  );
  
  // Aggiorna ogni bottone
  puntoButtons.forEach((button) => {
    const url = button.getAttribute('href');
    const punto = distances.find(p => p.url === url);
    
    if (punto) {
      // Rimuovi eventuali distanze esistenti
      const existingDistance = button.querySelector('.distanza-punto');
      if (existingDistance) existingDistance.remove();
      
      // Crea il nuovo elemento distanza
      const distanceSpan = document.createElement('span');
      distanceSpan.className = 'distanza-punto';
      
      // Formatta la distanza
      let distanceText;
      if (punto.distance > 999) {
        distanceText = (punto.distance / 1000).toFixed(1) + ' km';
      } else {
        distanceText = Math.round(punto.distance) + ' m';
      }
      
      distanceSpan.textContent = distanceText;
      
      // Inserisci la distanza dopo l'etichetta o il sottotitolo
      const etichetta = button.querySelector('.etichetta-punto');
      const sottotitolo = button.querySelector('.sottotitolo');
      
      if (etichetta) {
        etichetta.after(distanceSpan);
      } else if (sottotitolo) {
        sottotitolo.after(distanceSpan);
      } else {
        const titolo = button.querySelector('.titolo-principale');
        if (titolo) titolo.after(distanceSpan);
      }
      
      // Gestisci l'evidenziazione del punto più vicino
      button.classList.remove('punto-vicino');
      
      // Rimuovi eventuali indicatori precedenti
      const oldIndicator = button.querySelector('.piu-vicino-indicator');
      if (oldIndicator) oldIndicator.remove();
      
      if (punto.url === nearestPoint.url) {
        button.classList.add('punto-vicino');
        
        // Aggiungi indicatore "Più vicino"
        const indicator = document.createElement('span');
        indicator.className = 'piu-vicino-indicator';
        indicator.textContent = '📍 Più vicino';
        button.appendChild(indicator);
      }
    }
  });
  
  // Ricalcola l'altezza del dropdown dopo aver aggiunto le distanze
  setTimeout(() => {
    if (puntiDropdown.classList.contains('active')) {
      const grid = document.querySelector('.punti-grid');
      if (grid) {
        const gridHeight = grid.scrollHeight;
        const dropdownPadding = 50 + 30;
        puntiDropdown.style.maxHeight = `${gridHeight + dropdownPadding + 50}px`;
      }
    }
  }, 100);
}

// Funzione per aggiornare la posizione dell'utente
function updateUserPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const acc = position.coords.accuracy;
  
  currentPosition = { lat, lng };
  
  gpsStatus.textContent = "Localizzazione attiva";
  gpsStatus.classList.add('active');
  
  map.setView([lat, lng], 16);
  
  if (!userMarker) {
    userMarker = L.marker([lat, lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("🟢 Sei qui");
  } else {
    userMarker.setLatLng([lat, lng]);
  }
  
  if (!accuracyCircle) {
    accuracyCircle = L.circle([lat, lng], { 
      radius: acc, 
      color: "green", 
      fillOpacity: 0.15 
    }).addTo(map);
  } else {
    accuracyCircle.setLatLng([lat, lng]).setRadius(acc);
  }
  
  openDropdown();
  updateDistancesInButtons(lat, lng);
  highlightNearestPoint(lat, lng);
}

// Funzione per evidenziare il punto più vicino sulla mappa
function highlightNearestPoint(userLat, userLng) {
  if (nearestMarker) {
    nearestMarker.setIcon(new L.Icon.Default());
  }
  
  let nearest = null;
  let minDistance = Infinity;
  
  points.forEach(p => {
    const dist = map.distance([userLat, userLng], [p.lat, p.lng]);
    if (dist < minDistance) { 
      minDistance = dist; 
      nearest = p; 
    }
  });
  
  if (nearest) {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker && layer.getLatLng) {
        const latlng = layer.getLatLng();
        if (latlng.lat === nearest.lat && latlng.lng === nearest.lng) {
          layer.setIcon(nearestIcon);
          nearestMarker = layer;
        }
      }
    });
  }
}

// Funzione per iniziare il tracking GPS
function startTracking() {
  if (!navigator.geolocation) {
    gpsStatus.textContent = "Geolocalizzazione non supportata";
    gpsBtn.style.display = "none";
    return;
  }
  
  gpsStatus.textContent = "📍 Cercando la tua posizione...";
  gpsBtn.disabled = true;
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      updateUserPosition(position);
      gpsBtn.disabled = false;
    },
    (error) => {
      handleGeolocationError(error);
      gpsBtn.disabled = false;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
  
  watchId = navigator.geolocation.watchPosition(
    updateUserPosition,
    handleGeolocationError,
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
  );
}

// Funzione per gestire errori di geolocalizzazione
function handleGeolocationError(error) {
  console.error("Errore GPS:", error);
  
  switch(error.code) {
    case error.PERMISSION_DENIED:
      gpsStatus.textContent = "Permesso di localizzazione negato";
      break;
    case error.POSITION_UNAVAILABLE:
      gpsStatus.textContent = "Posizione non disponibile";
      break;
    case error.TIMEOUT:
      gpsStatus.textContent = "Tempo scaduto per la localizzazione";
      break;
    default:
      gpsStatus.textContent = "Errore di localizzazione";
  }
  
  gpsStatus.classList.remove('active');
  gpsBtn.disabled = false;
}

// Ferma il tracking GPS
function stopTracking() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  if (userMarker) {
    map.removeLayer(userMarker);
    userMarker = null;
  }
  
  if (accuracyCircle) {
    map.removeLayer(accuracyCircle);
    accuracyCircle = null;
  }
  
  if (nearestMarker) {
    nearestMarker.setIcon(new L.Icon.Default());
    nearestMarker = null;
  }
  
  gpsStatus.textContent = "";
  gpsStatus.classList.remove('active');
  currentPosition = null;
  
  const distanceSpans = document.querySelectorAll('.distanza-punto');
  distanceSpans.forEach(span => span.remove());
  
  const puntoButtons = document.querySelectorAll('.punto-btn');
  puntoButtons.forEach(btn => btn.classList.remove('punto-vicino'));
}

// Aggiungi event listener al pulsante GPS
if (gpsBtn) {
  gpsBtn.addEventListener('click', function() {
    if (!watchId) {
      startTracking();
      this.textContent = "📍 Ferma localizzazione";
    } else {
      stopTracking();
      this.textContent = "📍 Attiva localizzazione";
    }
  });
}

// Opzionale: avvia automaticamente il GPS al caricamento della pagina
// window.addEventListener('load', startTracking);