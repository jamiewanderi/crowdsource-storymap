function main() {
    var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/zachrobinsonalta/citagtu5u000k2iqbtmpc09f3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFjaHJvYmluc29uYWx0YSIsImEiOiJjaXQyMjNucXQwc3NvMnBraHF5cnQ3M3g0In0.zXNUiATCOwYfTikOPJ311Q', {
    attribution: '© Mapbox © OpenStreetMap © DigitalGlobe'}),
        streets = L.tileLayer('https://api.mapbox.com/styles/v1/zachrobinsonalta/citahgib4000o2iqbp4k46wg1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFjaHJvYmluc29uYWx0YSIsImEiOiJjaXQyMjNucXQwc3NvMnBraHF5cnQ3M3g0In0.zXNUiATCOwYfTikOPJ311Q', {attribution: '© Mapbox © OpenStreetMap'});
    
    var map = L.map('map', {
        center: [35.1108, -120.5917],
        zoom: 14,
        layers: [streets, satellite]
    });
    
    var baseMaps = {
        "Streets": streets,
        "Satellite": satellite
    };
    
    L.control.layers(baseMaps,null,{
        collapsed:false,
        position: 'topleft'
    }).addTo(map);
    
    //map.on('click', function(e) {
        //if(typeof(eventMarker)==='undefined'){
            //eventMarker = new L.marker(e.latlng,{
                //draggable:true
            //});
            //eventMarker.addTo(map).bindPopup("Drag me!").openPopup();
        //}
        //else {
            //eventMarker.setLatLng(e.latlng);
        //}
    //});
    
    
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
    }, offset: '25%'
    });
    
    zoneTwo = new Waypoint({
    element: document.getElementById('zoneTwo'),
    handler: function(direction) {
        map.setView(new L.LatLng(35.115530, -120.591537),17);
    }, offset: '25%'
    });
    
    zoneThree = new Waypoint({
    element: document.getElementById('zoneThree'),
    handler: function(direction) {
        map.setView(new L.LatLng(35.109260, -120.591575),17);
    }, offset: '25%'
    });
    
    zoneFour = new Waypoint({
    element: document.getElementById('zoneFour'),
    handler: function(direction) {
        map.setView(new L.LatLng(35.102648, -120.591637),16);
    }, offset: '50%'
    });
    
    $('#dialogContent').dialog({
        autoOpen: false,
        width: 400,
        height: 375,
        title: false,
        draggable: true,
        position: { at: "center center", of:$('#rightside') }
    });
    $('#opener').click(function() {
        $('#dialogContent').dialog('open');
        $('.ui-dialog-titlebar').hide();
        return false;
    });
    $('#opener').click(function() {
        if(typeof(dropPin)==='undefined'){
            dropPin = new L.marker([35.120959, -120.591593],{
            draggable: true
        }).addTo(map).bindPopup("Drag Me!").openPopup();
        }
        else {
            dropPin.setLatLng(e.latlng);
        }
    });
    $('#closer').click(function() {
        $('#dialogContent').dialog('close');
        return false;
    })
    
    var comment = document.getElementById('comment')
    //var commentLen = userInput.width()
    $('#closer').click(function() {
        if(typeof(dropPin)!=='undefined') {
            dropPin.bindPopup(comment, {
                maxWidth: 1000,
            }).openPopup();
        }
    })
    
}
window.onload = main;