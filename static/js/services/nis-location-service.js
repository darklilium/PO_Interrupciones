import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';
import makeSymbol from '../services/makeSymbol-service';

function makeInfoWindow(nis,order,incident_id,sed, point){
  var map = mymap.getMap();
  var contentVars = {
    nis: nis,
    order: order,
    incident_id: incident_id,
    sed: sed,
    pointGeometry: point
  };
  map.infoWindow.setTitle("Orden : "+contentVars.order);
  map.infoWindow.resize(200, 100);
  var content =
  "<div style=padding-top: 10px;>NIS: "+contentVars.nis+"<br></div>" +
  "<div style=padding-top: 10px;>SED: "+contentVars.sed+"<br></div>"+
  "<div style=padding-top: 10px;>ID Incidencia: "+contentVars.incident_id+"<br></div>";
  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(point), content));
  map.infoWindow.show(point, map.getInfoWindowAnchor(point));
}

function errorQuery(error){
  console.log("Error performing the query for: "+ error);
}

//for getting some info about the nis, i mean the customers
function nisInformation(){
  //still not defined.
}

 //Draw SED's trail
function makeTrail(sed){
  var map = mymap.getMap();
  console.log("Making the trail for BT\n", sed);
  var qTSearchTrailBT = new esri.tasks.QueryTask(layers.read_layer_tramosBT());
  var qSearchTrailBT= new esri.tasks.Query();
  qSearchTrailBT.where = "sed="+sed;
  qSearchTrailBT.returnGeometry=true;
  qTSearchTrailBT.execute(qSearchTrailBT,(featureSet)=>{

      if (featureSet.features.length != 0){

          for (var i = 0; i < featureSet.features.length; i++) {
            var lineSymbol = makeSymbol.makeLine();
            map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,lineSymbol));
          }

      }else{
        console.log("bt trail not found for this nis");

      }

  },errorQuery);
}

//search for nis's sed
function nisStretch(nis,order,incident_id,pointGeometry){
  var qTSearchSED = new esri.tasks.QueryTask(layers.read_layer_ClieSED());
  var qSearchSED= new esri.tasks.Query();
  qSearchSED.where = "ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis="+nis;
  qSearchSED.returnGeometry = false;
  qSearchSED.outFields=["ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed"];
  qTSearchSED.execute(qSearchSED, (featureSet)=>{

    if (featureSet.features.length != 0){
       var sed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
       //Draw SED's trail
       makeTrail(sed);
       makeInfoWindow(nis,order,incident_id,sed, pointGeometry);
    }else{
       console.log("Sed for nis not found, we cannot make the stretch for BT");
    }
  },errorQuery);

}
//for getting the nis location when the user clicks on the grid/table.
// note: order and nis = 1:1
function nisLocation (idorder,incident_id){
  var map = mymap.getMap();
  map.graphics.clear();
  $( "#myorderNotification" ).empty();
  $(".orderNotification").css("visibility","hidden");

  console.log("searching for nis for the current order locations");
  var qTNISLocation = new esri.tasks.QueryTask(layers.read_layer_clie());
  var qNISLocation = new esri.tasks.Query();
  qNISLocation.where = "ARCGIS.dbo.POWERON_CLIENTES.id_orden='"+idorder+"'";
  qNISLocation.returnGeometry = true;
  qNISLocation.outFields=["*"];
  qTNISLocation.execute(qNISLocation,(featureSet)=>{


    if (featureSet.features.length != 0){
        var searchSymbol = makeSymbol.makePoint();
        map.graphics.add(new esri.Graphic(featureSet.features[0].geometry,searchSymbol));
        map.centerAndZoom(featureSet.features[0].geometry,20);
        var nis = featureSet.features[0].attributes['ARCGIS.DBO.CLIENTES_XY_006.nis'];
        var pointGeometry = featureSet.features[0].geometry
        //just in case if additional information for nis is required.
        nisInformation();
        //shows the relation about SED and BT electric connection
        nisStretch(nis,idorder,incident_id,pointGeometry);
        console.log("NIS Found");
    }else{
      console.log("no results for nis?");
      $(".orderNotification").css("visibility","initial");
      $( "#myorderNotification" ).empty();
      $("#myorderNotification").append("<div><strong>No hay nis asociado a la orden seleccionada</strong></div>");
      $("#myorderNotification").attr("class", "alert alert-info");
    }
  },(errorInQuery)=>{
    console.log("An error performing the query for locating the nis\n",errorInQuery);
  });
}

export default nisLocation;
