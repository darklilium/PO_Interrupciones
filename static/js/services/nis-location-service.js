import layers from '../services/layers-service';
import makeSymbol from '../services/makeSymbol-service';
import makeInfoWindow from '../services/makeinfowindow-service';
import createQueryTask from '../services/createquerytask-service';
import myinfotemplate from '../services/infotemplates-service';
import mymap from '../services/map-service';

//for getting some info about the nis, i mean the customers
function nisInformation(){
  //still not defined.
}

 //Draw SED's trail for chilquinta
function makeTrail(sed){
  var serviceTrail = createQueryTask({
    url: layers.read_layer_tramosBT(),
    whereClause: "ARCGIS.DBO.Tramos_BT_006.sed="+sed
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

//search for nis's sed in chilquinta
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
       //Draw SED's trail for chilquinta
       makeTrail(sed);
       //make infowindow (generic)
       makeInfoWindow(nis,order,incident_id,sed, pointGeometry);
       console.log("Adding related NIS in the SED");
       //see related nis for that sed
       //relatedNISperSED(sed, nis);
    }else{
       console.log("Sed for nis not found, we cannot make the stretch for BT");
    }
  },(errorNIS)=>{
    console.log("Error doing the tracing for this sed: "+ sed);
  });
}
//for getting the nis location when the user clicks on the grid/table.
// note: order and nis = 1:1 (for chilquinta)
function nisLocation (idorder,incident_id){
  console.log("searching for nis for the current order locations...");
  console.log(idorder);
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
          //nisInformation();
          //shows the relation about SED and BT electric connection
        //  nisStretch(nis,idorder,incident_id,pointGeometry);
          console.log("NIS Found");

          //makeInfoWindow(nis,idorder,incident_id,sed, pointGeometry);

      }else{
        console.log("Searching in sed interruptions");
        searchSEDInterruptions(idorder);
        /*
        $(".orderNotification").css("visibility","initial");
        $("#myorderNotification")
                                .empty()
                                .append("<div><strong>No hay nis asociado a la orden seleccionada</strong></div>")
                                .attr("class", "alert alert-info")
                                */
      }

  },(errorLocation)=>{
    console.log("An error performing the query for locating the nis\n",errorLocation);
  });

}

function searchSEDInterruptions(order_id){
  console.log(order_id);
  var serviceSEDLocation = createQueryTask({
    url: layers.read_layer_interr_sed(),
    whereClause: "ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden='"+order_id+"'"
  });

  serviceSEDLocation((map,featureSet)=>{
    if (featureSet.features.length != 0){
      var searchSymbol = makeSymbol.makePoint();
      map.graphics.add(new esri.Graphic(featureSet.features[0].geometry,searchSymbol));
      map.centerAndZoom(featureSet.features[0].geometry,20);
      var cod_sed = featureSet.features[0].attributes['ARCGIS.DBO.SED_006.codigo'];
      var pointGeometry = featureSet.features[0].geometry;
      //  makeTrail(cod_sed);
      //relatedNISperSED(cod_sed);
    }
    else{
      console.log();
      $(".orderNotification").css("visibility","initial");
      $("#myorderNotification")
                              .empty()
                              .append("<div><strong>No hay nada relacionado a la orden.</strong></div>")
                              .attr("class", "alert alert-info")

    }
  },(errorSEDLocation)=>{
    console.log("Impossible to make the query related to orders feature service");
  });

}


//search for nis related to SED interruption
function relatedNISperSED(sed){
 var graphicLayer = layers.read_graphicLayer();
  graphicLayer.clear();
  var map = mymap.getMap();
  map.graphics.clear();
  $(".mytable-searchBox__relatedNIS").css("visibility","visible");



  var serviceRelatedNIS = createQueryTask({
    url: layers.read_layer_ClieSED(),
    whereClause: "ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed='"+sed+"'"
  });

  serviceRelatedNIS((map,featureSet)=>{
    //  map.graphics.clear();

       var searchSymbol = makeSymbol.makePointRelated();
        if (featureSet.features.length != 0){
            console.log("Drawing nis that could be affected with the interruption");
            featureSet.features.forEach(function(item, index) {
                item.setSymbol(searchSymbol);
                item.setInfoTemplate(myinfotemplate.getNisInfo());
                graphicLayer.add(item);

            });
              map.addLayer(graphicLayer);
              layers.save_graphicLayer(graphicLayer);
        }else{
          console.log("there are not nis that can be affected by interruption");
        }
  //layers.write_graphicLayer(graphicLayer);
  },(errorRelated)=>{
    console.log("Error doing related query for getting NIS for this SED");
  })

}

export {nisLocation, relatedNISperSED, makeTrail};
