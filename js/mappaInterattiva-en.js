const map = L.map('map').setView([45.6983, 9.6773], 13.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const points = [
  { lat: 45.69116, lng: 9.67631, title: "With Crossed Arms - Point 01", url: "points/point-01-en.html", id: "point-01" },
  { lat: 45.69336, lng: 9.67568, title: "In Memory of Ernesto Rossi and Ada Rossi - Point 02", url: "points/point-02-en.html", id: "point-02" },
  { lat: 45.69256, lng: 9.67478, title: "Controlling Education - Point 03", url: "points/point-03-en.html", id: "point-03" },
  { lat: 45.69416, lng: 9.67253, title: "Against Any Opposition - Point 04", url: "points/point-04-en.html", id: "point-04" },
  { lat: 45.69687, lng: 9.67407, title: "The Special Tribunal - Point 05", url: "points/point-05-en.html", id: "point-05" },
  { lat: 45.69659, lng: 9.6738, title: "Women in Arms - Point 06", url: "points/point-06-en.html", id: "point-06" },
  { lat: 45.69628, lng: 9.6731, title: "The Prefecture - Point 07", url: "points/point-07-en.html", id: "point-07" },
  { lat: 45.69591, lng: 9.67217, title: "La Stampa - Point 08", url: "points/point-08-en.html", id: "point-08" },
  { lat: 45.69562, lng: 9.67049, title: "Employment Offices - Point 09", url: "points/point-09-en.html", id: "point-09" },
  { lat: 45.69446, lng: 9.66834, title: "City Hall - Point 10", url: "points/point-10-en.html", id: "point-10" },
  { lat: 45.6946, lng: 9.66944, title: "At the Center of the City - Point 11", url: "points/point-11-en.html", id: "point-11" },
  { lat: 45.69722, lng: 9.66859, title: "Home, School, Temple - Point 12", url: "points/point-12-en.html", id: "point-12" },
  { lat: 45.70324, lng: 9.67282, title: "The Gendarmerie Command - Point 14", url: "points/point-14-en.html", id: "point-14" },
  { lat: 45.70021, lng: 9.6773, title: "Montelungo Barracks - Point 15", url: "points/point-15-en.html", id: "point-15" },
  { lat: 45.70083, lng: 9.66599, title: "From Monastery to Prison - Point 13", url: "points/point-13-en.html", id: "point-13" },
  { lat: 45.69912, lng: 9.6752, title: "Stumbling Stones - Point 16", url: "points/point-16-en.html", id: "point-16" },
  { lat: 45.69876, lng: 9.67639, title: "The Turani Gang - Point 17", url: "points/point-17-en.html", id: "point-17" },
  { lat: 45.69844, lng: 9.67649, title: "Ferruccio Dell'Orto - Point 18", url: "points/point-18-en.html", id: "point-18" }
];

// Custom icons
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

// Geolocation variables
const gpsStatus = document.getElementById("gpsStatus");
const gpsBtn = document.getElementById("gpsBtn");
const puntiDropdown = document.getElementById("puntiDropdown");
const puntiToggle = document.getElementById("puntiToggle");

let userMarker = null;
let accuracyCircle = null;
let nearestMarker = null;
let currentPosition = null;
let watchId = null;

// Add markers for each point
points.forEach(p => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;

  const marker = L.marker([p.lat, p.lng])
    .addTo(map)
    .bindPopup(`
      <b>${p.title}</b><br>
      <a href="${googleMapsUrl}" target="_blank" class="popup-link">📍 Directions</a><br><br>
      <a href="${p.url}" class="menu-btn">Go to page</a>
    `);
  
  // Add id to marker for reference
  marker.pointId = p.id;
});

// Function to open the dropdown menu
function openDropdown() {
  if (puntiDropdown && !puntiDropdown.classList.contains('active')) {
    if (typeof toggleDropdown === 'function') {
      toggleDropdown();
    } else {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      puntiToggle.dispatchEvent(event);
    }
  }
}

// Function to update distances on buttons
function updateDistancesInButtons(userLat, userLng) {
  // Collect all point buttons
  const puntoButtons = document.querySelectorAll('.punto-btn');
  
  // Calculate distances for each point
  const distances = points.map(p => {
    const dist = map.distance([userLat, userLng], [p.lat, p.lng]);
    return { ...p, distance: dist };
  });
  
  // Find the nearest point
  const nearestPoint = distances.reduce((prev, current) => 
    (prev.distance < current.distance) ? prev : current
  );
  
  // Update each button
  puntoButtons.forEach(button => {
    const url = button.getAttribute('href');
    
    // Try to find matching point
    let punto = distances.find(p => p.url === url);
    
    // If not found, try to match by ID
    if (!punto) {
      const buttonId = button.dataset.id || button.id;
      if (buttonId) {
        punto = distances.find(p => p.id === buttonId);
      }
    }
    
    // If still not found, try to match by title or partial URL
    if (!punto) {
      const buttonText = button.textContent.toLowerCase();
      punto = distances.find(p => 
        p.title.toLowerCase().includes(buttonText) || 
        buttonText.includes(p.id)
      );
    }
    
    if (punto) {
      // Remove any existing distance spans
      const existingDistance = button.querySelector('.distanza-punto');
      if (existingDistance) existingDistance.remove();
      
      // Add distance
      const distanceSpan = document.createElement('span');
      distanceSpan.className = 'distanza-punto';
      
      // Format the distance
      let distanceText;
      if (punto.distance > 999) {
        distanceText = (punto.distance / 1000).toFixed(1) + ' km';
      } else {
        distanceText = Math.round(punto.distance) + ' m';
      }
      
      distanceSpan.textContent = distanceText;
      
      // Try to add after the emoji or at the end of the button
      const emojiSpan = button.querySelector('.icona-emoji');
      if (emojiSpan) {
        emojiSpan.parentNode.insertBefore(distanceSpan, emojiSpan.nextSibling);
      } else {
        button.appendChild(distanceSpan);
      }
      
      // Remove any previous highlights
      button.classList.remove('punto-vicino');
      
      // Highlight the nearest point
      if (punto.url === nearestPoint.url) {
        button.classList.add('punto-vicino');
      }
    }
  });
}

// Function to update user position
function updateUserPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const acc = position.coords.accuracy;
  
  currentPosition = { lat, lng };
  
  // Update GPS status
  gpsStatus.textContent = "Location active";
  gpsStatus.classList.add('active');
  
  // Center map on user position
  map.setView([lat, lng], 16);
  
  // Update or create user marker
  if (!userMarker) {
    userMarker = L.marker([lat, lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("🟢 You are here");
  } else {
    userMarker.setLatLng([lat, lng]);
  }
  
  // Update or create accuracy circle
  if (!accuracyCircle) {
    accuracyCircle = L.circle([lat, lng], { 
      radius: acc, 
      color: "green", 
      fillOpacity: 0.15 
    }).addTo(map);
  } else {
    accuracyCircle.setLatLng([lat, lng]).setRadius(acc);
  }
  
  // Open dropdown menu if not already open
  openDropdown();
  
  // Update distances on buttons
  updateDistancesInButtons(lat, lng);
  
  // Highlight nearest point on map
  highlightNearestPoint(lat, lng);
}

// Function to highlight the nearest point on the map
function highlightNearestPoint(userLat, userLng) {
  // Remove previous highlight
  if (nearestMarker) {
    nearestMarker.setIcon(new L.Icon.Default());
  }
  
  // Find the nearest point
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
    // Find the corresponding marker
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

// Function to start GPS tracking
function startTracking() {
  if (!navigator.geolocation) {
    gpsStatus.textContent = "Geolocation not supported";
    gpsBtn.style.display = "none";
    return;
  }
  
  gpsStatus.textContent = "📍 Looking for your location...";
  gpsBtn.disabled = true;
  
  // First immediate request
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
  
  // Continue tracking position
  watchId = navigator.geolocation.watchPosition(
    updateUserPosition,
    handleGeolocationError,
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
  );
}

// Function to handle geolocation errors
function handleGeolocationError(error) {
  console.error("GPS Error:", error);
  
  switch(error.code) {
    case error.PERMISSION_DENIED:
      gpsStatus.textContent = "Location permission denied";
      break;
    case error.POSITION_UNAVAILABLE:
      gpsStatus.textContent = "Location unavailable";
      break;
    case error.TIMEOUT:
      gpsStatus.textContent = "Location request timed out";
      break;
    default:
      gpsStatus.textContent = "Location error";
  }
  
  gpsStatus.classList.remove('active');
  gpsBtn.disabled = false;
}

// Stop GPS tracking
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
  
  // Remove distances from buttons
  const distanceSpans = document.querySelectorAll('.distanza-punto');
  distanceSpans.forEach(span => span.remove());
  
  // Remove point highlighting
  const puntoButtons = document.querySelectorAll('.punto-btn');
  puntoButtons.forEach(btn => btn.classList.remove('punto-vicino'));
}

// Add event listener to GPS button
if (gpsBtn) {
  gpsBtn.addEventListener('click', function() {
    if (!watchId) {
      startTracking();
      this.textContent = "📍 Stop Location";
    } else {
      stopTracking();
      this.textContent = "📍 Enable Location";
    }
  });
}

// Automatically start GPS on page load (optional)
// window.addEventListener('load', startTracking);