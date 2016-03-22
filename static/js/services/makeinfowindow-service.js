import mymap from '../services/map-service';

function makeInfoWindow(nis,order,incident_id,sed, point){
  var map = mymap.getMap();

  var contentVars = {
    nis: nis,
    order: order,
    incident_id: incident_id,
    sed: sed,
    pointGeometry: point
  };

  map.infoWindow.setTitle("Orden : " + contentVars.order);
  map.infoWindow.resize(200, 100);

  var content = `<div style=padding-top: 10px;>NIS: ${contentVars.nis}<br /></div>
  <div style=padding-top: 10px;>SED: ${contentVars.sed}<br /></div>
  <div style=padding-top: 10px;>ID Incidencia: ${contentVars.incident_id}<br /></div>`;

  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(point), content));
  map.infoWindow.show(point, map.getInfoWindowAnchor(point));
}

export default makeInfoWindow;
