import mymap from '../services/map-service';

function makeInfoWindow(nis,order,incident_id,sed, point, time, address){
  var map = mymap.getMap();

  var contentVars = {
    nis: nis,
    order: order,
    incident_id: incident_id,
    sed: sed,
    pointGeometry: point,
    time: time,
    address: address
  };

  map.infoWindow.setTitle("NIS : " + contentVars.nis);
  map.infoWindow.resize(320, 150);

  var content = `<div style=padding-top: 10px;>Orden: ${contentVars.order}<br /></div>
  <div style=padding-top: 10px;>ID Incidencia: ${contentVars.incident_id}<br /></div>
  <div style=padding-top: 10px;>Tiempo Transcurrido: ${contentVars.time}<br /></div>
  <div style=padding-top: 10px;>SED: ${contentVars.sed}<br /></div>
  <div style=padding-top: 10px;>Dirección: ${contentVars.address}<br /></div>`;

  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(point), content));
  map.infoWindow.show(point, map.getInfoWindowAnchor(point));
}

export default makeInfoWindow;
