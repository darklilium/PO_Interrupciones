import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';
import makeSymbol from '../services/makeSymbol-service';
import makeInfoWindow from '../services/makeinfowindow-service';
import createQueryTask from '../services/createquerytask-service';

//for getting some info about the nis, i mean the customers
function nisInformation(){
  //still not defined.
}

 //Draw SED's trail
function makeTrail(sed){
  var serviceTrail = createQueryTask({
    url: layers.read_layer_tramosBT(),
    whereClause: "sed="+sed
  });
  serviceTrail((map,featureSet)=>{
    console.log("Making the trail for BT\n", sed);
    if (featureSet.features.length != 0){

        for (let i = 0; i < featureSet.features.length; i++) {
          let lineSymbol = makeSymbol.makeLine();
          map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,lineSymbol));
        }
    }else{
      console.log("bt trail not found for this nis");
    }
  }, (errorTrail)=>{
    console.log("Error doing the tracing for this sed: "+ sed);
  });
}

//search for nis's sed
function nisStretch(nis,order,incident_id,pointGeometry){
  var serviceNIS = createQueryTask({
    url: layers.read_layer_ClieSED(),
    whereClause: "ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis="+nis,
    returnGeometry: false,
    outFields: ["ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed"]
  });

  serviceNIS((map,featureSet)=>{
    if (featureSet.features.length != 0){
       var sed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
       //Draw SED's trail
       makeTrail(sed);
       makeInfoWindow(nis,order,incident_id,sed, pointGeometry);
       console.log("Adding related NIS in the SED");
       relatedNISperSED(sed);
    }else{
       console.log("Sed for nis not found, we cannot make the stretch for BT");
    }
  },(errorNIS)=>{
    console.log("Error doing the tracing for this sed: "+ sed);
  });
}
//for getting the nis location when the user clicks on the grid/table.
// note: order and nis = 1:1
function nisLocation (idorder,incident_id){
  console.log("searching for nis for the current order locations...");
  var serviceLocation = createQueryTask({
    url: layers.read_layer_interr_clie(),
    whereClause: "ARCGIS.dbo.POWERON_CLIENTES.id_orden='"+idorder+"'"
  });

  serviceLocation((map,featureSet)=>{
      map.graphics.clear();

      $( "#myorderNotification" ).empty();
      $(".orderNotification").css("visibility","hidden");

      if (featureSet.features.length != 0){
          var searchSymbol = makeSymbol.makePoint();
          map.graphics.add(new esri.Graphic(featureSet.features[0].geometry,searchSymbol));
          map.centerAndZoom(featureSet.features[0].geometry,20);
          var nis = featureSet.features[0].attributes['ARCGIS.DBO.CLIENTES_XY_006.nis'];
          var pointGeometry = featureSet.features[0].geometry;
          //just in case if additional information for nis is required.
          nisInformation();
          //shows the relation about SED and BT electric connection
          nisStretch(nis,idorder,incident_id,pointGeometry);
          console.log("NIS Found");

      }else{
        console.log("no results for nis?");
        $(".orderNotification").css("visibility","initial");
        $("#myorderNotification")
                                .empty()
                                .append("<div><strong>No hay nis asociado a la orden seleccionada</strong></div>")
                                .attr("class", "alert alert-info")
      }

  },(errorLocation)=>{
    console.log("An error performing the query for locating the nis\n",errorLocation);
  });

}
//search for nis related to SED interruption
function relatedNISperSED(sed){
  var serviceRelatedNIS = createQueryTask({
    url: layers.read_layer_ClieSED(),
    whereClause: "ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed='"+sed+"'"
  });
  serviceRelatedNIS((map,featureSet)=>{
      map.graphics.clear();
        if (featureSet.features.length != 0){
            console.log("Drawing nis that could be affected with the interruption");
          for (let i = 0; i < featureSet.features.length; i++) {
            let searchSymbol = makeSymbol.makePointRelated();
            map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,searchSymbol));
          }
        }else{
          console.log("there are not more nis that can be affected by interruption");
        }
  },(errorRelated)=>{})

}

export default nisLocation;
