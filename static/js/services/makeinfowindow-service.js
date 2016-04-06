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
  map.infoWindow.resize(320, 200);

  var content = `<div style=padding-top: 10px;>Orden: ${contentVars.order}<br /></div>
  <div style=padding-top: 10px;>ID Incidencia: ${contentVars.incident_id}<br /></div>
  <div style=padding-top: 10px;>Tiempo Transcurrido: ${contentVars.time}<br /></div>
  <div style=padding-top: 10px;>SED: ${contentVars.sed}<br /></div>
  <div style=padding-top: 10px;>Dirección: ${contentVars.address}<br /></div>`;

  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(point), content));
  map.infoWindow.show(point, map.getInfoWindowAnchor(point));
}

function makeInfoWindowPerSED(sed, point, name, region, alimentador, property){
  var map = mymap.getMap();

  var contentVars = {
    sed: sed,
    pointGeometry: point,
    name: name,
    region: region,
    alimentador: alimentador,
    property: property
  };

  map.infoWindow.setTitle("SED : " + contentVars.sed);
  map.infoWindow.resize(320, 200);

  var content = `<div style=padding-top: 10px;>Nombre: ${contentVars.name}<br /></div>
  <div style=padding-top: 10px;>Comuna: ${contentVars.region}<br /></div>
  <div style=padding-top: 10px;>Alimentador: ${contentVars.alimentador}<br /></div>
  <div style=padding-top: 10px;>Propiedad: ${contentVars.property}<br /></div>`;

  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(point), content));
  map.infoWindow.show(point, map.getInfoWindowAnchor(point));
}

function makeInfoWindowPerSEDInterrupted(sed, point, order_id, incident_id, alimentador, cause,commentary){
  var map = mymap.getMap();

  var contentVars = {
    sed: sed,
    pointGeometry: point,
    order_id: order_id,
    incident_id: incident_id,
    alimentador: alimentador,
    cause: cause,
    commentary: commentary
  };

  map.infoWindow.setTitle("SED : " + contentVars.sed);
  map.infoWindow.resize(320, 200);

  var content = `<div style=padding-top: 10px;>ID Orden: ${contentVars.order_id}<br /></div>
  <div style=padding-top: 10px;>ID Incidencia: ${contentVars.incident_id}<br /></div>
  <div style=padding-top: 10px;>Alimentador: ${contentVars.alimentador}<br /></div>
  <div style=padding-top: 10px;>Causa: ${contentVars.cause}<br /></div>
  <div style=padding-top: 10px;>Comentario: ${contentVars.commentary}<br /></div>`;

  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(point), content));
  map.infoWindow.show(point, map.getInfoWindowAnchor(point));
}

function makeInfoWindowPerNisInfo(nis,sed, point,address){
  var map = mymap.getMap();

  var contentVars = {
    nis: nis,
    sed: sed,
    pointGeometry: point,
    address: address
  };

  map.infoWindow.setTitle("NIS : " + contentVars.nis);
  map.infoWindow.resize(320, 200);

  var content = `<div style=padding-top: 10px;>SED: ${contentVars.sed}<br /></div>
  <div style=padding-top: 10px;>Dirección: ${contentVars.address}<br /></div>`;

  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(point), content));
  map.infoWindow.show(point, map.getInfoWindowAnchor(point));
}
export {makeInfoWindow, makeInfoWindowPerSED, makeInfoWindowPerSEDInterrupted,makeInfoWindowPerNisInfo };
