// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71], // center of the US
    zoom: 5
});

// Add a tile layer (the background map image) to our map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to determine marker size based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 20000;
}

// Function to determine marker color based on earthquake depth
function markerColor(depth) {
    if (depth > 90) return "#ff0000";
    else if (depth > 70) return "#ff6600";
    else if (depth > 50) return "#ffcc00";
    else if (depth > 30) return "#ffff00";
    else if (depth > 10) return "#ccff00";
    else return "#00ff00";
}

// Fetch the JSON data and add it to the map
d3.json(link).then(function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, {
                radius: markerSize(feature.properties.mag),
                color: markerColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.75
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag +
                            "<br>Depth: " + feature.geometry.coordinates[2] +
                            "<br>Location: " + feature.properties.place);
        }
    }).addTo(myMap);
});