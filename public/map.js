// Google Maps Configuration
let map;
let markers = [];
let routeLayer;
const ROUTE_COLOR = '#0fbab0';

function getGoogleMapsApiKey() {
    if (window.PBL_CONFIG && typeof window.PBL_CONFIG.getGoogleMapsApiKey === 'function') {
        return window.PBL_CONFIG.getGoogleMapsApiKey();
    }

    const params = new URLSearchParams(window.location.search);
    return (params.get('google_maps_api_key') || '').trim();
}

function loadGoogleMapsApi() {
    if (window.google && window.google.maps) {
        initMap();
        return;
    }

    if (document.getElementById('googleMapsScript')) {
        return;
    }

    const apiKey = getGoogleMapsApiKey();
    if (!apiKey) {
        return;
    }

    window.initPublicMap = initMap;
    const script = document.createElement('script');
    script.id = 'googleMapsScript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initPublicMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}

// Initialize map
function initMap() {
    if (map || !(window.google && window.google.maps)) {
        return;
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false
    });

    addBusStopMarkers();
}

// Bus stop coordinates (Delhi locations)
const busStops = {
    'Connaught Place': [28.6304, 77.2177],
    'India Gate': [28.6129, 77.2295],
    'Karol Bagh': [28.6517, 77.1892],
    'Rajiv Chowk': [28.6304, 77.2177], // Metro station near CP
    'Lajpat Nagar': [28.5783, 77.2400],
    'Nehru Place': [28.5494, 77.2500],
    'Punjabi Bagh': [28.6743, 77.1315]
};

function addBusStopMarkers() {
    Object.entries(busStops).forEach(([name, coords]) => {
        const marker = new google.maps.Marker({
            position: { lat: coords[0], lng: coords[1] },
            map,
            title: name
        });

        markers.push(marker);
    });
}

// Draw route on map
function drawRoute(path) {
    // Clear previous route
    if (routeLayer) {
        routeLayer.setMap(null);
    }

    if (!path || path.length < 2) return;

    const routeCoords = path.map(stop => {
        const [lat, lng] = busStops[stop];
        return { lat, lng };
    });

    routeLayer = new google.maps.Polyline({
        path: routeCoords,
        geodesic: true,
        strokeColor: ROUTE_COLOR,
        strokeOpacity: 0.85,
        strokeWeight: 5,
        map
    });

    const bounds = new google.maps.LatLngBounds();
    routeCoords.forEach(point => bounds.extend(point));
    map.fitBounds(bounds);
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        loadGoogleMapsApi();
    }
});
