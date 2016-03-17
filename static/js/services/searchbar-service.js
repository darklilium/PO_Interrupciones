import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';


function searchBar_NIS(nis){
var map = mymap.getMap();
var queryTaskNIS = new esri.tasks.QueryTask(layers.read_layer_clie());
var queryNIS = new esri.tasks.Query();
queryNIS.where = "ARCGIS.dbo.POWERON_CLIENTES.nis="+nis;
queryNIS.returnGeometry = true;
queryNIS.outFields=["*"];
queryTaskNIS.execute(queryNIS,
  (featureSet)=>{
    map.graphics.clear();
    //if NIS is in the layer for isolated orders
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
        console.log("Found in isolated interruptions");
        $(".searchNotification").css("visibility","initial");
        $( "#myNotification" ).empty();
        $("#myNotification").append("<div><strong>NIS: " + nis +" presente en falla aislada</strong></div>");
        $("#myNotification").attr("class", "alert alert-info");

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
    }else {
      console.log("going to search into massive interruptions");
      var qTaskMassive = new esri.tasks.QueryTask(layers.read_layer_ClieSED());
      var qMassive = new esri.tasks.Query();
      qMassive.where = "ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis="+nis;
      qMassive.returnGeometry = true;
      qMassive.outFields=["*"];
      qTaskMassive.execute(qMassive,
        (featureSet)=>{
          if(featureSet.features.length != 0){
            var mySed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
            searchMassive(mySed, nis);
          }else {
            $(".searchNotification").css("visibility","initial");
            $( "#myNotification" ).empty();
            $("#myNotification").append("<div><strong>NIS: " + nis +" no se ha encontrado o no existe</strong></div>");
            $("#myNotification").attr("class", "alert alert-info");
          }
        },(massiveError)=>{
          console.log("Error al ejecutar la query en Falla Masiva");
          $(".searchNotification").css("visibility","initial");
          $( "#myNotification" ).empty();
          $("#myNotification").append("<div><strong>Error al buscar el NIS: " + nis +"</strong></div>");
          $("#myNotification").attr("class", "alert alert-info");
        }
      );
    }
}, errorInQuery());

}

function errorInQuery(error){
  //  $("#warning").css("visibility","visible");
  console.log("U must proavide a NIS for searching");
  $(".searchNotification").css("visibility","initial");
  $( "#myNotification" ).empty();
  $("#myNotification").append("<div><strong>Ingrese un NIS para buscar</strong></div>");
  $("#myNotification").attr("class", "alert alert-warning");
}

function searchMassive(sed, nis){
  var map = mymap.getMap();
  console.log(sed + " searching in massive interruptions");
  var qTMass = new esri.tasks.QueryTask(layers.read_layer_sed());
  var qMass = new esri.tasks.Query();
  qMass.where = "ARCGIS.DBO.SED_006.codigo="+sed;
  qMass.returnGeometry = true;
  qMass.outFields=["*"];
  qTMass.execute(qMass, (featureSet)=>{
  map.graphics.clear();
    if (featureSet.features != 0){
      console.log("interrupted customers in SED "+ featureSet.features[0].attributes['ARCGIS.DBO.SED_006.codigo']);
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
        console.log("Found in massive interruptions");

        $(".searchNotification").css("visibility","initial");
        $( "#myNotification" ).empty();
        $("#myNotification").append("<div><strong>NIS: " + nis +" presente en falla masiva</strong></div>");
        $("#myNotification").attr("class", "alert alert-danger");
      }
    }else {
      console.log("nis is not having any issue");
      $(".searchNotification").css("visibility","initial");
      $( "#myNotification" ).empty();
      $("#myNotification").append("<div><strong>NIS: " + nis +" no presenta problemas</strong></div>");
      $("#myNotification").attr("class", "alert alert-success");
    }
  },(errorMassive)=>{
    console.log("Problems getting the sed for massive interruption ");
    $(".searchNotification").css("visibility","initial");
    $( "#myNotification" ).empty();
    $("#myNotification").append("<div><strong>Error tratando de obtener la SED del NIS:" + nis +"</strong></div>");
    $("#myNotification").attr("class", "alert alert-warning");
  });
}

export default searchBar_NIS;
