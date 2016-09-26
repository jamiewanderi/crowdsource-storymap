$('#splash').dialog({
    autoOpen: false,
    modal: true,
    open: function(){
        $('.ui-dialog-titlebar').hide();
    },
    width: 600,
    height: 375,
    title: false,
    draggable: false,
    position: { at: "center"},
});

// Welcome Dialog
$(document).ready(function(){
    $('#splash').dialog('open');
})

$('#closesplash').click(function(){
    $('#splash').dialog('close');
})

function main() {
    var my_layer;
    
    var tableName = 'point_collection';
    
    var lat1;
    var lat2;
    var lat3;
    var lat4;
    
    var lon1;
    var lon2;
    var lon3;
    var lon4;
    
    var desc1;
    var desc2;
    var desc3;
    var desc4;
    
    var coords1;
    var coords2;
    var coords3;
    var coords4;
    
    var streets = L.tileLayer('https://api.mapbox.com/styles/v1/zachrobinsonalta/citahgib4000o2iqbp4k46wg1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFjaHJvYmluc29uYWx0YSIsImEiOiJjaXQyMjNucXQwc3NvMnBraHF5cnQ3M3g0In0.zXNUiATCOwYfTikOPJ311Q', {attribution: '© Mapbox © OpenStreetMap'}),
        satellite = L.tileLayer('https://api.mapbox.com/styles/v1/zachrobinsonalta/citagtu5u000k2iqbtmpc09f3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFjaHJvYmluc29uYWx0YSIsImEiOiJjaXQyMjNucXQwc3NvMnBraHF5cnQ3M3g0In0.zXNUiATCOwYfTikOPJ311Q', {attribution: '© Mapbox © OpenStreetMap © DigitalGlobe'});
    
    var map = L.map('map', {
        center: [35.1108, -120.5917],
        zoom: 14,
        layers: [streets]
    });
    
    var basemaps = {
        "Streets": streets,
        "Satellite": satellite
    }

    cartodb.createLayer(map, {
          user_name: 'zacharyrobinson',
          type: 'cartodb',
          sublayers: [{
            sql: "SELECT * FROM point_collection",
            cartocss: '#point_collection{marker-fill-opacity: 0.9; marker-line-color: #FFF;  marker-line-width: 1;  marker-line-opacity: 1;  marker-placement: point;  marker-type: ellipse;  marker-width: 15;  marker-fill: #0066FF;  marker-allow-overlap: true;}'
          }]
        })
        .addTo(map)
        .done(function(layer) {
            my_layer = layer;
            var overlay = {
                "Public Comments": my_layer
            };
            L.control.layers(basemaps, overlay, {collapsed: false}).addTo(map);
            cartodb.vis.Vis.addInfowindow(map, layer, ['description'])
        });
    
    // Waypoints
    var extent = new Waypoint({
    element: document.getElementById('extent'),
    handler: function(direction) {
        map.setView(new L.LatLng(35.1108, -120.5917),14);
    }
    });
    
    zoneOne = new Waypoint({
    element: document.getElementById('zoneOne'),
    handler: function(direction) {
        map.setView(new L.LatLng(35.120959, -120.591593),17);
    }, offset: '75%'
    });
    
    zoneTwo = new Waypoint({
    element: document.getElementById('zoneTwo'),
    handler: function(direction) {
        map.setView(new L.LatLng(35.115530, -120.591537),17);
    }, offset: '75%'
    });
    
    zoneThree = new Waypoint({
    element: document.getElementById('zoneThree'),
    handler: function(direction) {
        map.setView(new L.LatLng(35.109260, -120.591575),17);
    }, offset: '75%'
    });
    
    zoneFour = new Waypoint({
    element: document.getElementById('zoneFour'),
    handler: function(direction) {
        map.setView(new L.LatLng(35.102648, -120.591637),16);
    }, offset: '75%'
    });
    
    
    // Dialog 1
    $('#dialogContent1').dialog({
        autoOpen: false,
        width: 400,
        height: 300,
        title: false,
        draggable: true,
        position: { at: "center"}
    });
   
    
    $('#opener1').click(function() {
        $('#dialogContent1').dialog('open');
        $('.ui-dialog-titlebar').hide();
        if(typeof(dropPin1)==='undefined'){
            dropPin1 = new L.marker([35.120959, -120.591593],{
            draggable: true
        }).addTo(map).bindPopup("Drag Me!").openPopup();
        }
        else {
            dropPin1.setLatLng(e.latlng);
            map.addLayer(dropPin1);
        }
    });
    
    $('#closer1').click(function() {
        $('#dialogContent1').dialog('close');
        dropPin1.bindPopup('Comment Submitted').openPopup().addTo(map);
        dropPin1.dragging.disable();
        coords1 = dropPin1.getLatLng();
        lat1 = coords1.lat;
        lon1 = coords1.lng;
        desc1 = document.getElementById("desc1").value;
       
        var sql = new cartodb.SQL({ user: 'zacharyrobinson' });
    
        sql.execute("SELECT * FROM insertpoint("+lon1+","+lat1+",'"+desc1+"','"+tableName+"')");
    
        my_layer.redraw();
        //map.removeLayer(dropPin1);
        $('#opener1').css("display", "none");
        $('#success1').css("display", "block");
    });
    
    $('#cancel1').click(function() {
        $('#dialogContent1').dialog('close');
        map.removeLayer(dropPin1);
    });
    
    // Dialog 2
    $('#dialogContent2').dialog({
        autoOpen: false,
        width: 400,
        height: 300,
        title: false,
        draggable: true,
        position: { at: "center"}
    });
   
    
    $('#opener2').click(function() {
        $('#dialogContent2').dialog('open');
        $('.ui-dialog-titlebar').hide();
        if(typeof(dropPin2)==='undefined'){
            dropPin2 = new L.marker([35.115530, -120.591537],{
            draggable: true
        }).addTo(map).bindPopup("Drag Me!").openPopup();
        }
        else {
            dropPin2.setLatLng(e.latlng);
            map.addLayer(dropPin2);
        }
    });
    
    $('#closer2').click(function() {
        $('#dialogContent2').dialog('close');
        dropPin2.bindPopup('Comment Submitted').openPopup().addTo(map);
        dropPin2.dragging.disable();
        coords2 = dropPin2.getLatLng();
        lat2 = coords2.lat;
        lon2 = coords2.lng;
        desc2 = document.getElementById("desc2").value;
       
        var sql = new cartodb.SQL({ user: 'zacharyrobinson' });
    
        sql.execute("SELECT * FROM insertpoint("+lon2+","+lat2+",'"+desc2+"','"+tableName+"')");
    
        my_layer.redraw();
        //map.removeLayer(dropPin2);
        $('#opener2').css("display", "none");
        $('#success2').css("display", "block");
    });
    
    $('#cancel2').click(function() {
        $('#dialogContent2').dialog('close');
        map.removeLayer(dropPin2);
    });
    
    // Dialog 3
    $('#dialogContent3').dialog({
        autoOpen: false,
        width: 400,
        height: 300,
        title: false,
        draggable: true,
        position: { at: "center"}
    });
   
    
    $('#opener3').click(function() {
        $('#dialogContent3').dialog('open');
        $('.ui-dialog-titlebar').hide();
        if(typeof(dropPin3)==='undefined'){
            dropPin3 = new L.marker([35.109260, -120.591575],{
            draggable: true
        }).addTo(map).bindPopup("Drag Me!").openPopup();
        }
        else {
            dropPin3.setLatLng(e.latlng);
            map.addLayer(dropPin3);
        }
    });
    
    $('#closer3').click(function() {
        $('#dialogContent3').dialog('close');
        dropPin3.bindPopup('Comment Submitted').openPopup().addTo(map);
        dropPin3.dragging.disable();
        coords3 = dropPin3.getLatLng();
        lat3 = coords3.lat;
        lon3 = coords3.lng;
        desc3 = document.getElementById("desc3").value;
       
        var sql = new cartodb.SQL({ user: 'zacharyrobinson' });
    
        sql.execute("SELECT * FROM insertpoint("+lon3+","+lat3+",'"+desc3+"','"+tableName+"')");
    
        my_layer.redraw();
        //map.removeLayer(dropPin3);
        $('#opener3').css("display", "none");
        $('#success3').css("display", "block");
    });
    
    $('#cancel3').click(function() {
        $('#dialogContent3').dialog('close');
        map.removeLayer(dropPin3);
    });
    
    // Dialog 4
    $('#dialogContent4').dialog({
        autoOpen: false,
        width: 400,
        height: 300,
        title: false,
        draggable: true,
        position: { at: "center"}
    });
   
    
    $('#opener4').click(function() {
        $('#dialogContent4').dialog('open');
        $('.ui-dialog-titlebar').hide();
        if(typeof(dropPin4)==='undefined'){
            dropPin4 = new L.marker([35.102648, -120.591637],{
            draggable: true
        }).addTo(map).bindPopup("Drag Me!").openPopup();
        }
        else {
            dropPin4.setLatLng(e.latlng);
            map.addLayer(dropPin4);
        }
    });
    
    $('#closer4').click(function() {
        $('#dialogContent4').dialog('close');
        dropPin4.bindPopup('Comment Submitted').openPopup().addTo(map);
        dropPin4.dragging.disable();
        coords4 = dropPin4.getLatLng();
        lat4 = coords4.lat;
        lon4 = coords4.lng;
        desc4 = document.getElementById("desc4").value;
       
        var sql = new cartodb.SQL({ user: 'zacharyrobinson' });
    
        sql.execute("SELECT * FROM insertpoint("+lon4+","+lat4+",'"+desc4+"','"+tableName+"')");
    
        my_layer.redraw();
        //map.removeLayer(dropPin4);
        $('#opener4').css("display", "none");
        $('#success4').css("display", "block");
    });
    
    $('#cancel4').click(function() {
        $('#dialogContent4').dialog('close');
        map.removeLayer(dropPin4);
    });
}


window.onload = main;