import mymap from '../services/map-service';

function makeInfoWindow(nis,order,incident_id,sed, point, time, address, etr){
  var map = mymap.getMap();

  var contentVars = {
    nis: nis,
    order: order,
    incident_id: incident_id,
    sed: sed,
    pointGeometry: point,
    time: time,
    address: address,
    etr: etr
  };

  map.infoWindow.setTitle("NIS : " + contentVars.nis);

  var content = `<div style=padding-top: 10px;>Orden: ${contentVars.order}<br /></div>
  <div style=padding-top: 10px;>ID Incidencia: ${contentVars.incident_id}<br /></div>
  <div style=padding-top: 10px;>Tiempo Transcurrido: ${contentVars.time}<br /></div>
  <div style=padding-top: 10px;>SED: ${contentVars.sed}<br /></div>
  <div style=padding-top: 10px;>Dirección: ${contentVars.address}<br />
  <div style=padding-top: 10px;>ETR: ${contentVars.etr}<br /></div>`;

  map.infoWindow.resize(450, 250);
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

  var content = `<div style=padding-top: 10px;>Nombre: ${contentVars.name}<br /></div>
  <div style=padding-top: 10px;>Comuna: ${contentVars.region}<br /></div>
  <div style=padding-top: 10px;>Alimentador: ${contentVars.alimentador}<br /></div>
  <div style=padding-top: 10px;>Propiedad: ${contentVars.property}<br /></div>`;

  map.infoWindow.resize(450, 250);
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

  var content = `<div style=padding-top: 10px; font-size:10px;>ID Orden: ${contentVars.order_id}<br /></div>
  <div style=padding-top: 10px;>ID Incidencia: ${contentVars.incident_id}<br /></div>
  <div style=padding-top: 10px;>Alimentador: ${contentVars.alimentador}<br /></div>
  <div style=padding-top: 10px;>Causa: ${contentVars.cause}<br /></div>
  <div style=padding-top: 10px;>Comentario: ${contentVars.commentary}<br /></div>`;

  map.infoWindow.resize(450, 250);
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

  var content = `<div style=padding-top: 10px;>SED: ${contentVars.sed}<br /></div>
  <div style=padding-top: 10px;>Dirección: ${contentVars.address}<br /></div>`;

  map.infoWindow.resize(450, 250);
  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(point), content));
  map.infoWindow.show(point, map.getInfoWindowAnchor(point));

}

function makeInfoWindowPerGridInfo(type,
                                  order_id,
                                  incident_id,
                                  cause,
                                  commentary,
                                  state,
                                  creaDate,
                                  assiDate,
                                  deliDate,
                                  routDate,
                                  arriDate,
                                  time,
                                  ETR,
                                  geometry){
var map = mymap.getMap();

var contentVars = {
  type: type,
  order_id: order_id,
  incident_id: incident_id,
  cause: cause,
  commentary:commentary,
  state: state,
  creaDate: creaDate,
  assiDate: assiDate,
  deliDate: deliDate,
  routDate: routDate,
  arriDate: arriDate,
  time: time,
  ETR: ETR,
  geometry: geometry
};

map.infoWindow.setTitle("Tipo : " + contentVars.type);

var content = `<div style=padding-top: 10px;>ID Orden: ${contentVars.order_id}<br /></div>
<div style=padding-top: 10px;>ID Incidencia: ${contentVars.incident_id}<br /></div>
<div style=padding-top: 10px;>Causa: ${contentVars.cause}<br /></div>
<div style=padding-top: 10px;>Comentario: ${contentVars.commentary}<br /></div>
<div style=padding-top: 10px;>Estado: ${contentVars.state}<br /></div>
<div style=padding-top: 10px;>Fecha Creación: ${contentVars.creaDate}<br /></div>
<div style=padding-top: 10px;>Fecha Asignación: ${contentVars.assiDate}<br /></div>
<div style=padding-top: 10px;>Fecha Despacho: ${contentVars.deliDate}<br /></div>
<div style=padding-top: 10px;>Fecha Ruta: ${contentVars.routDate}<br /></div>
<div style=padding-top: 10px;>Fecha Llegada: ${contentVars.arriDate}<br /></div>
<div style=padding-top: 10px;>Tiempo: ${contentVars.time}<br/></div>
<div style=padding-top: 10px;>ETR: ${contentVars.ETR}<br/></div>`;

map.infoWindow.resize(450, 250);
map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(geometry), content));
map.infoWindow.show(geometry, map.getInfoWindowAnchor(geometry));
}


export {makeInfoWindow, makeInfoWindowPerSED, makeInfoWindowPerSEDInterrupted,makeInfoWindowPerNisInfo,makeInfoWindowPerGridInfo };
