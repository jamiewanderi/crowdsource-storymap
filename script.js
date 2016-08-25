function main() {

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map', {
    drawControl: true
}).setView([35.110756 , -120.591667], 14);

// add an OpenStreetMap tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFjaHJvYmluc29uIiwiYSI6IjZXWDh0enMifQ.P_x5U3esb8BJM9apOhn4Kg', {
    attribution: '© Mapbox © OpenStreetMap © DigitalGlobe'
}).addTo(map);
}

function draw(){
// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

}

window.onload = main;



