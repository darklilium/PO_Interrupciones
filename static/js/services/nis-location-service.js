import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';

//for getting some info about the nis, i mean the customers
function nisInformation(){
  var qTNISInfo = new esri.tasks.QueryTask(layers.read_layer_clie());
  var qNISInfo  = new esri.tasks.Query();
}
//for getting the nis location when the user clicks on the grid/table
function nisLocation (idorden){
  var map = mymap.getMap();
  console.log("searching for nis for the current order locations");
//  console.log(nis);
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
            esri.symbol.SimpleLineSymbol.STYLE_NULL,
            new esri.Color([0, 255, 255, 0.9]),
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
      }
    }else{
      console.log("No results for nis?");
    }
  },(errorInQuery)=>{
    console.log("An error performing the query for locating the nis\n",errorInQuery);
  });
}

export default nisLocation;
