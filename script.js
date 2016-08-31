function main() {
    
    // create a map in the "map" div, set the view to a given place and zoom
    var map = L.map('map').setView([35.110756 , -120.591667], 14);

    // add a tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFjaHJvYmluc29uIiwiYSI6IjZXWDh0enMifQ.P_x5U3esb8BJM9apOhn4Kg', {
    attribution: '© Mapbox © OpenStreetMap © DigitalGlobe'
    }).addTo(map);
    
    // initialize the FeatureGroup to store editable layers
    var drawnItems = new L.FeatureGroup();
    
    //add previous data
    var url = "https://zacharyrobinson.carto.com/api/v2/sql?format=geojson&q=SELECT cartodb_id,the_geom FROM usercomments";
    $.getJSON(url, function(data) {
        geojsonLayer = L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                layer.cartodb_id = feature.properties.cartodb_id;
                drawnItems.addLayer(layer);
            }
        });
        map.addLayer(drawnItems);

    // initialize the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
            polyline: false,
            polygon: false,
            rectangle: false,
            circle: false,
            marker: true,
        },
        edit: {
            featureGroup: drawnItems
        }
    });
        
    map.addControl(drawControl);


    map.on('draw:created', function(e) {
        drawnItems.addLayer(e.layer);
        persistOnCartoDB("INSERT", e.layer);
    });

    map.on('draw:edited', function(e) {
        persistOnCartoDB("UPDATE", e.layers);
    });

    map.on('draw:deleted', function(e) {
        persistOnCartoDB("DELETE", e.layers);
    });

    function persistOnCartoDB(action, layers) {
        var cartodb_ids = [];
        var geojsons = [];

        switch (action) {
            case "UPDATE":
                if (layers.getLayers().length < 1) return;

                layers.eachLayer(function(layer) {
                    cartodb_ids.push(layer.cartodb_id);
                    geojsons.push("'" + JSON.stringify(layer.toGeoJSON()) + "'");
                });
                break;

            case "INSERT":
                cartodb_ids.push(-1);
                geojsons.push("'" + JSON.stringify(layers.toGeoJSON()) + "'");
                break;

            case "DELETE":
                layers.eachLayer(function(layer) {
                    cartodb_ids.push(layer.cartodb_id);
                    geojsons.push("''");
                });
                break;
        }

        var sql = "SELECT leaflet_upsert_usercomments(ARRAY[";
        sql += cartodb_ids.join(",");
        sql += "],ARRAY[";
        sql += geojsons.join(",");
        sql += "]);";

        console.log("persisting... https://zacharyrobinson.carto.com/api/v2/sql?q=" + sql);
        $.ajax({
            type: 'POST',
            url: 'https://zacharyrobinson.carto.com/api/v2/sql',
            crossDomain: true,
            data: {
                "q": sql
            },
            dataType: 'json',
            success: function(responseData, textStatus, jqXHR) {
                console.log("Data saved");

                if (action == "INSERT")
                    layers.cartodb_id = responseData.rows[0].cartodb_id;
            },
            error: function(responseData, textStatus, errorThrown) {
                console.log("Problem saving the data");
                console.log(responseData);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
});
}
window.onload = main;