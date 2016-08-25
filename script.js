function main() {
    cartodb.createVis('map', 'https://zacharyrobinson.carto.com/api/v2/viz/22e41d22-698b-11e6-b235-0ef24382571b/viz.json', {
        shareable: false,
        title: false,
        description: false,
        search: false,
        tiles_loader: true,
        center_lat: 35.110756,
        center_lon: -120.591667,
        zoom: 14
    })
    .done(function(vis, layers) {
          // layer 0 is the base layer, layer 1 is cartodb layer
          // setInteraction is disabled by default
          layers[1].setInteraction(true);
          layers[1].on('featureOver', function(e, latlng, pos, data) {
            cartodb.log.log(e, latlng, pos, data);
          });
          // you can get the native map to work with it
          var map = vis.getNativeMap();
          // now, perform any operations you need
          // map.setZoom(3);
          // map.panTo([50.5, 30.5]);
        })
        .error(function(err) {
          console.log(err);
        });
      }
window.onload = main;
