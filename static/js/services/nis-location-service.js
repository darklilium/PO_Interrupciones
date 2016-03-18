import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';


function makeSymbol(type){

  switch (type) {
    case "point":
      console.log("making point");
    break;

    case "polyLine":
      console.log("making polyLines");
    break;

    case "polygon":
      console.log("making polygon");
    break;

    default:
        console.log("making nothing");
  }

}

function errorQuery(error){
  console.log("Error performing the query for: "+ error);
}

//for getting some info about the nis, i mean the customers
function nisInformation(){
  var qTNISInfo = new esri.tasks.QueryTask(layers.read_layer_clie());
  var qNISInfo  = new esri.tasks.Query();


}

function makeTrail(sed){
  console.log("Making the trail for BT\n", sed);
  var qTSearchTrailBT = new esri.tasks.QueryTask(layers.read_layer_BT());
  var qSearchTrailBT= new esri.tasks.Query();
  qSearchTrailBT.where = "sed="+sed;
  qTSearchTrailBT.execute(qSearchTrailBT,(featureSet)=>{
      if (featureSet.features.length != 0){
          for (var i = 0; i < featureSet.features.length; i++) {
            //here i go
          }
      }else{
        console.log("bt trail not found for this nis");
      }

  },errorQuery);
}


function nisStretch(nis){
  var qTSearchSED = new esri.tasks.QueryTask(layers.read_layer_ClieSED());
  var qSearchSED= new esri.tasks.Query();
  qSearchSED.where = "ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis="+nis;
  qSearchSED.returnGeometry = false;
  qSearchSED.outFields=["ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed"];
  qTSearchSED.execute(qSearchSED, (featureSet)=>{

    if (featureSet.features.length != 0){
       var sed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
       makeTrail(sed);

    }else{
       console.log("Sed for nis not found, we cannot make the stretch for BT");
    }
  },errorQuery);

}
//for getting the nis location when the user clicks on the grid/table
function nisLocation (idorden){
  var map = mymap.getMap();
  console.log("searching for nis for the current order locations");
  var qTNISLocation = new esri.tasks.QueryTask(layers.read_layer_clie());
  var qNISLocation = new esri.tasks.Query();
  qNISLocation.where = "ARCGIS.dbo.POWERON_CLIENTES.id_orden='"+idorden+"'";
  qNISLocation.returnGeometry = true;
  qNISLocation.outFields=["*"];
  qTNISLocation.execute(qNISLocation,(featureSet)=>{
    map.graphics.clear();
    if (featureSet.features.length != 0){
      for (var i = 0; i < featureSet.features.length; i++) {
        var searchSymbol = new esri.symbol.SimpleMarkerSymbol(
          esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
          20,
          new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([0, 40, 255, 0.9]),
            1
          ),
          new esri.Color([0, 255, 255, 0.5])
        );
        map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,searchSymbol));
        map.centerAndZoom(featureSet.features[0].geometry,20);
        console.log("NIS Found");
        var myNis = featureSet.features[0].attributes['ARCGIS.DBO.CLIENTES_XY_006.nis'];
        var myOrder = featureSet.features[0].attributes['ARCGIS.dbo.POWERON_CLIENTES.id_orden'];
        var myIncidence = featureSet.features[0].attributes['ARCGIS.dbo.POWERON_CLIENTES.id_incidencia'];

        map.infoWindow.setTitle("Orden : "+myOrder);
        map.infoWindow.resize(200, 100);
        var content =
        "<div style=padding-top: 10px;>NIS:"+myNis+"<br></div>" +
        "<div style=display:inline-block;width:8px;></div>"+
        "<div style=padding-top: 10px;>ID Incidencia:"+myIncidence+"<br></div>";
            map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(featureSet.features[0].geometry), content));
            map.infoWindow.show(featureSet.features[0].geometry, map.getInfoWindowAnchor(featureSet.features[0].geometry));
        //just in case if additional information for nis is required.
        nisInformation();
        //shows the relation about SED and BT electric connection
        nisStretch(myNis);
      }
    }else{
      console.log("No results for nis?");

    }
  },(errorInQuery)=>{
    console.log("An error performing the query for locating the nis\n",errorInQuery);
  });
}

export default nisLocation;
