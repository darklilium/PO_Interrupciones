import layers from '../services/layers-service';
import makeSymbol from '../services/makeSymbol-service';
import makeInfoWindow from '../services/makeinfowindow-service';
import createQueryTask from '../services/createquerytask-service';
import {notifications} from '../services/notifications-service';

function searchBar_NIS(nis){
  var service = createQueryTask({
    url: layers.read_layer_interr_clie(),
    whereClause: `ARCGIS.dbo.POWERON_CLIENTES.nis=${nis}`
  });

  service((map, featureSet) => {
    map.graphics.clear();
    //if NIS is in the layer for isolated orders
    if (featureSet.features.length != 0){
      for (let i = 0; i < featureSet.features.length; i++) {
        let pointSymbol = makeSymbol.makePoint();
        map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,pointSymbol));
        map.centerAndZoom(featureSet.features[0].geometry,20);
        console.log("Found in isolated interruptions");
        let message = 'NIS: '+ nis + ' presente en falla aislada';
        notifications(message, "Searchbar_Isolated", ".notificationBox");
        //search SED for the nis and add it to infowindow
        let myNis = featureSet.features[0].attributes['ARCGIS.DBO.CLIENTES_XY_006.nis'];
        let myOrder = featureSet.features[0].attributes['ARCGIS.dbo.POWERON_CLIENTES.id_orden'];
        let myIncidence = featureSet.features[0].attributes['ARCGIS.dbo.POWERON_CLIENTES.id_incidencia'];

        let serviceSED = createQueryTask({
          url: layers.read_layer_ClieSED(),
          whereClause: `ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis=${nis}`,
          outFields: [`ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed`]
        });

        serviceSED((map,featureSet) => {
          map.graphics.clear();

          if(!featureSet.features.length){
            let message = "NIS: " + nis + " no tiene sed";
            let type = "NoSED";
            notifications(message, "Searchbar_Without_SED", ".notificationBox");
            return;
          }

          let sed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
          makeInfoWindow(myNis,myOrder,myIncidence,sed, featureSet.features[0].geometry);
        },(ErrorQuery)=>{
          let message = "Fallo al realizar la query para capturar SED de cliente.";
          let type = "Searchbar_ErrorQuerySED";
          notifications(message, type, ".notificationBox");
        });
      }
    } else {
      //if the nis is not in the isolated orders, search in SED interruptions orders, but first get
      //the SED code for the customer (NIS)
      console.log("going to search into massive interruptions");
      var serviceMassive = createQueryTask({
        url: layers.read_layer_ClieSED(),
        whereClause: `ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis=${nis}`
      });
      serviceMassive((map,featureSet)=>{
        if(!featureSet.features.length){
          let message = "NIS: " + nis+ " no se ha encontrado o no existe";
          let type = "Searchbar_NIS_Not_Found";
          notifications(message, type, ".notificationBox");
          return;
        }

        let mySed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
        //and then search for any problem in SED
        searchMassive(mySed, nis);
      },(ErrorQueryMassive)=>{
          console.log("Error al ejecutar la query en Falla Masiva");
          let message = "Error al buscar el NIS : " + nis + "en falla masiva";
          let type = "Searchbar_Error";
          notifications(message, type, ".notificationBox");
      });
    }
  },(ErrorQueryIsolated)=>{
    console.log("Error al ejecutar la query en Falla Aislada");
    let message = "Ingrese un NIS a buscar";
    let type = "Searchbar_Error";
    notifications(message, type, ".notificationBox");
  });

}

function searchMassive(sed, nis){
  //search if the nis is in a SED interruption order
  var serviceSearchMassive = createQueryTask({
    url: layers.read_layer_interr_sed(),
    whereClause: `ARCGIS.DBO.SED_006.codigo=${sed}`
  });

  serviceSearchMassive((map,featureSet)=>{
    map.graphics.clear();
      if(!featureSet.features.length) {
        //if the nis is not in the SED interruption orders, the nis doesnt have any problem.
        console.log("nis is not having any issue");
        let message = "NIS: " + nis + " no presenta problemas";
        let type = "Searchbar_NIS_Without_Problems";
        notifications(message, type, ".notificationBox");
        return;
      }
      //when the order is found , show where the NIS is with the info.
      console.log("interrupted customers in SED "+ featureSet.features[0].attributes['ARCGIS.DBO.SED_006.codigo']);
      for (let i = 0; i < featureSet.features.length; i++) {
        let pointSymbol = makeSymbol.makePoint();
        map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,pointSymbol));
        map.centerAndZoom(featureSet.features[0].geometry,20);
        console.log("Found in massive interruptions");

        let myOrder = featureSet.features[0].attributes['ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden'];
        let myIncidence = featureSet.features[0].attributes['ARCGIS.dbo.POWERON_TRANSFORMADORES.id_incidencia'];
        let message = "NIS: " + nis +" presente en falla masiva";
        let type = "Searchbar_Massive";
        notifications(message, type, ".notificationBox");
        makeInfoWindow(nis,myOrder,myIncidence,sed, featureSet.features[0].geometry);
      }
  },(error)=>{
    console.log("Problems getting the sed for massive interruption ");
    let message = "Error tratando de obtener la SED del NIS:" + nis;
    let type = "Searchbar_Error";
    notifications(message, type, ".notificationBox");
  });
}

function searchBar_Order(order_id){
  /*To do: search order.
  * if order is for isolated nis -> zoom to the result (1 nis : 1 order)
    else if order is on massive interruption for SED. (1 SED : * orders)
    else the order is not correct or not found.
  */
  var serviceOrder = createQueryTask({
    url: layers.read_layer_interr_clie(),
    whereClause: `ARCGIS.dbo.POWERON_CLIENTES.id_orden='${order_id}'`
  });
  serviceOrder((map,featureSet)=>{
    //if the order is not isolated nis, search in massive.
    if(!featureSet.features.length){
      //search in SED interruptions
      searchMassiveOrder(order_id);
      return;
    }
    let myresults = featureSet.features.map((feature)=>{
      return feature.geometry;
    });

    let pointSymbol = makeSymbol.makePoint();
    map.graphics.add(new esri.Graphic(myresults[0],pointSymbol));
    map.centerAndZoom(myresults[0],15);
    let message = "ID Orden: " + order_id + " encontrada en fallas de clientes";
    let type = "Searchbar_Isolated";
    notifications(message, type, ".notificationBox");

  }, (errorOrder)=>{
    console.log("Error doing query for getting orders associated to the customer");
    let message = "Error doing query for getting orders associated to the customer";
    let type = "Searchbar_Error";
    notifications(message, type, ".notificationBox");
  });
}

function searchMassiveOrder(order_id){
  console.log(order_id, "search in massive orders");
  var serviceOrderSED = createQueryTask({
    url: layers.read_layer_interr_sed(),
    whereClause: `ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden='${order_id}'`
  });

  serviceOrderSED((map,featureSet)=>{
    if (!featureSet.features.length){
      let message = "ID Orden: " + order_id + " no se ha encontrado o no existe";
      let type = "Searchbar_NIS_Not_Found";
      notifications(message, type, ".notificationBox");
      return;
    }
    let myresults = featureSet.features.map((feature)=>{
      return feature;
    });

    let pointSymbol = makeSymbol.makePoint();
      myresults.forEach((attr)=>{
        map.graphics.add(new esri.Graphic(attr.geometry,pointSymbol));
        map.centerAndZoom(attr.geometry,15);
      });
      let message = "ID Orden: " + order_id + " encontrada en fallas de SED";
      let type = "Searchbar_Massive";
      notifications(message, type, ".notificationBox");
  },(errorOrderSED)=>{
    console.log("Error doing query for getting orders associated to the SED");
    let message = "Error en query para obtener ordenes asociadas a la SED";
    let type = "Searchbar_ErrorQuerySED";
    notifications(message, type, ".notificationBox");
  });
}

function searchBar_Incidence(incidence_id){
  /*To do: search order.
  * if Incidence is for isolated nis -> zoom to the result (1 nis : 1 Incidence)
    else if Incidence is on massive interruption for SED. (1 SED : * Incidences)
    else the Incidence is not correct or not found.
  */
  var serviceIncidence = createQueryTask({
    url: layers.read_layer_interr_clie(),
    whereClause: `ARCGIS.dbo.POWERON_CLIENTES.id_incidencia=${incidence_id}`
  });
  serviceIncidence((map,featureSet)=>{
    //if the order is not isolated nis, search in massive.
    if(!featureSet.features.length){
      //search in SED interruptions
      searchMassiveIncidence(incidence_id);
      return;
    }
    let myresults = featureSet.features.map((feature)=>{
      return feature.geometry;
    });

    let pointSymbol = makeSymbol.makePoint();
    map.graphics.add(new esri.Graphic(myresults[0],pointSymbol));
    map.centerAndZoom(myresults[0],15);
    let message = "ID Incidencia: " + incidence_id + " encontrada en fallas de clientes";
    let type = "Searchbar_Isolated";
    notifications(message, type, ".notificationBox");

  }, (errorOrder)=>{
    console.log("Error doing query for getting orders associated to the customer");
    let message = "Error en query para obtener ordenes asociadas al NIS";
    let type = "Searchbar_Error";
    notifications(message, type, ".notificationBox");

  });
}

function searchMassiveIncidence(incidence_id){
  console.log(incidence_id, "search in massive orders");
  var serviceOrderSED = createQueryTask({
    url: layers.read_layer_interr_sed(),
    whereClause: `ARCGIS.dbo.POWERON_TRANSFORMADORES.id_incidencia=${incidence_id}`
  });

  serviceOrderSED((map,featureSet)=>{
    if (!featureSet.features.length){
      let message = "ID Incidencia: " + incidence_id + " no se ha encontrado o no existe";
      let type = "Searchbar_NIS_Not_Found";
      notifications(message, type, ".notificationBox");
      return;
    }
    let myresults = featureSet.features.map((feature)=>{
      return feature;
    });

    let pointSymbol = makeSymbol.makePoint();
      myresults.forEach((attr)=>{
        map.graphics.add(new esri.Graphic(attr.geometry,pointSymbol));
        map.centerAndZoom(attr.geometry,15);
      });
      let message = "ID Incidencia: " + incidence_id + " encontrada en fallas de SED";
      let type = "Searchbar_Massive";
      notifications(message, type, ".notificationBox");
  },(errorOrderSED)=>{
    console.log("Error doing query for getting orders associated to the SED");
    let message = "Error query para obtener ordenes asociadas a la SED";
    let type = "Searchbar_Error";
    notifications(message, type, ".notificationBox");
  });
}


export {searchBar_NIS, searchBar_Order, searchBar_Incidence};
