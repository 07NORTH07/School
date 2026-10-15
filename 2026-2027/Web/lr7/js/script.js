let watchId = null;

// Координати коледжу (Коледж електронних приладів)
const ourCoords = {
    latitude: 48.943207,
    longitude: 24.7333504
};

const locationDiv = document.getElementById('location');
const distanceDiv = document.getElementById('distance');
const destForm = document.getElementById('destination-form');
const destLat = document.getElementById('dest-lat');
const destLng = document.getElementById('dest-lng');
const destMessage = document.getElementById('dest-message');

let map = null;
let destMarker = null;

document.addEventListener('DOMContentLoaded', getMyLocation);

// ==============================
// ГОЛОВНА ЛОГІКА
// ==============================
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);

        document.getElementById('watch').onclick = watchLocation;
        document.getElementById('clearWatch').onclick = clearWatch;
    } else {
        alert('Oops, no geolocation support');
    }
}

function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    locationDiv.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    locationDiv.innerHTML += ` (with ${position.coords.accuracy} meters accuracy)`;

    const km = computeDistance(position.coords, ourCoords);
    distanceDiv.innerHTML = `You are ${km} km from the College`;

    showOnMap(position.coords, position.timestamp);
}

function displayError(error) {
    const errorTypes = {
        0: 'Unknown error',
        1: 'Permission denied by user',
        2: 'Position is not available',
        3: 'Request timed out'
    };

    let errorMessage = errorTypes[error.code];

    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + ' ' + error.message;
    }

    locationDiv.innerHTML = errorMessage;
}

// ==============================
// ВІДСТАНЬ (формула гаверсинуса)
// ==============================
function computeDistance(startCoords, destCoords) {
    const startLatRads = degreesToRadians(startCoords.latitude);
    const startLongRads = degreesToRadians(startCoords.longitude);
    const destLatRads = degreesToRadians(destCoords.latitude);
    const destLongRads = degreesToRadians(destCoords.longitude);
    const Radius = 6371; // радіус Землі у км

    // Math.min захищає від NaN через похибку округлення
    const cosine = Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads);

    return Math.acos(Math.min(1, cosine)) * Radius;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// ==============================
// КАРТА (Leaflet)
// ==============================
function showOnMap(coords, timestamp) {
    const latlng = [coords.latitude, coords.longitude];

    if (!map) {
        map = L.map('map').setView(latlng, 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.panTo(latlng);
    }

    const time = new Date(timestamp).toLocaleTimeString('uk-UA');

    L.marker(latlng)
        .addTo(map)
        .bindPopup(
            `You are here: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}<br>` +
            `Time: ${time}`
        )
        .openPopup();
}

// ==============================
// ВІДСТЕЖЕННЯ
// ==============================
function watchLocation() {
    if (watchId === null) {
        watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
    }
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

// ==============================
// ПУНКТ ПРИЗНАЧЕННЯ
// ==============================
destForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const lat = parseFloat(destLat.value);
    const lng = parseFloat(destLng.value);

    if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        destMessage.textContent = 'Введіть коректні координати';
        return;
    }

    if (!map) {
        destMessage.textContent = 'Карта ще не завантажена: дозвольте доступ до геолокації';
        return;
    }

    destMessage.textContent = '';

    if (destMarker) {
        map.removeLayer(destMarker);
    }

    destMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`Destination: ${lat}, ${lng}`)
        .openPopup();

    map.flyTo([lat, lng], 15);
});
