import layers from '../services/layers-service';
import makeSymbol from '../utils/makeSymbol';
import {makeInfoWindow} from '../utils/makeInfowindow';
import {makeInfoWindowPerSED} from '../utils/makeInfowindow';
import {makeInfoWindowPerSEDInterrupted} from '../utils/makeInfowindow';
import {makeInfoWindowPerNisInfo} from '../utils/makeInfowindow';
import createQueryTask from '../services/createquerytask-service';
import {notifications} from '../utils/notifications';

function searchBar_NIS(nis){
  var service = createQueryTask({
    url: layers.read_layer_interr_clie(),
    whereClause: `ARCGIS.dbo.POWERON_CLIENTES.nis=${nis}`
  });

  service((map, featureSet) => {
    map.graphics.clear();
    //if NIS is in the layer for isolated orders
    let pointSymbol = makeSymbol.makePoint();
    if (featureSet.features.length != 0){
      let myresults = featureSet.features.map((feature)=>{
        return feature;
      });
      myresults.forEach((attribute)=>{
          console.log("Found in isolated interruptions");

          //search SED for the nis and add it to infowindow
          let myNis = attribute.attributes['ARCGIS.DBO.CLIENTES_XY_006.nis'];
          let myOrder = attribute.attributes['ARCGIS.dbo.POWERON_CLIENTES.id_orden'];
          let myIncidence = attribute.attributes['ARCGIS.dbo.POWERON_CLIENTES.id_incidencia'];
          let ETR = attribute.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.etr'];
          let serviceSED = createQueryTask({
            url: layers.read_layer_ClieSED(),
            whereClause: `nis=${nis}`,
            outFields: [`resp_id_sed, nm_tarifa, categoria, direccion_resu`]
          });
          serviceSED((map,featureSet) => {
            map.graphics.clear();

            if(!featureSet.features.length){
              let message = "NIS: " + nis + " no tiene sed";
              let type = "NoSED";
              notifications(message, "Searchbar_Without_SED", ".searchbar__notifications");
              return;
            }

            let sed = featureSet.features[0].attributes['resp_id_sed'];
            let address = featureSet.features[0].attributes['direccion_resu'];
            makeInfoWindow(myNis,myOrder,myIncidence,sed, attribute.geometry, 0, address, ETR );
            map.graphics.add(new esri.Graphic(attribute.geometry,pointSymbol));
            map.centerAndZoom(attribute.geometry,20);
            let message = 'NIS: '+ nis + ' presente en interrupción';
            notifications(message, "Searchbar_Isolated", ".searchbar__notifications");
          },(ErrorQuery)=>{
            let message = "NIS: " + nis + " no tiene sed";
            let type = "Searchbar_ErrorQuerySED";
            notifications(message, type, ".searchbar__notifications");
          });
      });

    } else {
      //if the nis is not in the isolated orders, search in SED interruptions orders, but first get
      //the SED code for the customer (NIS)
      console.log("going to search into massive interruptions");
      var serviceMassive = createQueryTask({
        url: layers.read_layer_nisInfo(),
        whereClause: `ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis=${nis}`
      });
      serviceMassive((map,featureSet)=>{
        if(!featureSet.features.length){
          let message = "NIS: " + nis+ " no se ha encontrado o no existe. Ingrese un NIS válido";
          let type = "Searchbar_NIS_Not_Found";
          notifications(message, type, ".searchbar__notifications");
          return;
        }
        let mySed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
        let address = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu'];
        let nisgeom = featureSet.features[0].geometry;

        //and then search for any problem in SED
        searchMassive(mySed, nis, address, nisgeom);
      },(ErrorQueryMassive)=>{
          console.log("Error al ejecutar la query en Falla Masiva");
          let message = "Error al buscar el NIS : " + nis + "en falla masiva";
          let type = "Searchbar_Error";
          notifications(message, type, ".searchbar__notifications");
      });
    }
  },(ErrorQueryIsolated)=>{
    console.log("Error al ejecutar la query en Falla Aislada");
    let message = "NIS no encontrado o no existe. Ingrese un NIS válido.";
    let type = "Searchbar_Error";
    notifications(message, type, ".searchbar__notifications");
  });

}

function searchMassive(sed, nis, address, nisgeom){
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
        notifications(message, type, ".searchbar__notifications");
        let pointSymbol = makeSymbol.makePoint();
        map.graphics.add(new esri.Graphic(nisgeom,pointSymbol));
        map.centerAndZoom(nisgeom,20);
        makeInfoWindowPerNisInfo(nis,sed, nisgeom,address);

        return;
      }
      //when the order is found , show where the NIS is with the info.
      console.log("interrupted customers in SED "+ featureSet.features[0].attributes['ARCGIS.DBO.SED_006.codigo']);
      let pointSymbol = makeSymbol.makePoint();
      let message = "NIS: " + nis +" presente en interrupción";
      let type = "Searchbar_Massive";
      notifications(message, type, ".searchbar__notifications");
      let myresults = featureSet.features.map((feature)=>{
        return feature;
      });
      myresults.forEach((attr)=>{
        console.log("Found in massive interruptions");
        let myOrder = attr.attributes['ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden'];
        let myIncidence = attr.attributes['ARCGIS.dbo.POWERON_TRANSFORMADORES.id_incidencia'];

        makeInfoWindow(nis,myOrder,myIncidence,sed, nisgeom, 0, address);
        map.graphics.add(new esri.Graphic(nisgeom,pointSymbol));
        map.centerAndZoom(nisgeom,20);
      });

  },(error)=>{
    console.log("Problems getting the sed for massive interruption ");
    let message = "Error tratando de obtener la SED del NIS:" + nis;
    let type = "Searchbar_Error";
    notifications(message, type, ".searchbar__notifications");
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
    let message = "ID Orden: " + order_id + " presente en interrupción";
    let type = "Searchbar_Isolated";
    notifications(message, type, ".searchbar__notifications");

  }, (errorOrder)=>{
    console.log("Error doing query for getting orders associated to the customer");
    let message = "Error doing query for getting orders associated to the customer";
    let type = "Searchbar_Error";
    notifications(message, type, ".searchbar__notifications");
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
      let message = "ID Orden " + order_id + " no se ha encontrado o no existe. Ingrese un ID válido.";
      let type = "Searchbar_NIS_Not_Found";
      notifications(message, type, ".searchbar__notifications");
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
      let message = "ID Orden: " + order_id + " presente en interrupción";
      let type = "Searchbar_Massive";
      notifications(message, type, ".searchbar__notifications");
  },(errorOrderSED)=>{
    console.log("Error doing query for getting orders associated to the SED");
    let message = "Error en query para obtener ordenes asociadas a la SED";
    let type = "Searchbar_ErrorQuerySED";
    notifications(message, type, ".searchbar__notifications");
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
    let message = "ID Incidencia: " + incidence_id + " presente en interrupción";
    let type = "Searchbar_Isolated";
    notifications(message, type, ".searchbar__notifications");

  }, (errorOrder)=>{
    console.log("Error doing query for getting orders associated to the customer");
    let message = "ID Incidencia no encontrada o no existe. Ingrese una válida.";
    let type = "Searchbar_Error";
    notifications(message, type, ".searchbar__notifications");

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
      let message = "ID Incidencia: " + incidence_id + " no se ha encontrado o no existe. Ingrese un ID válida.";
      let type = "Searchbar_NIS_Not_Found";
      notifications(message, type, ".searchbar__notifications");
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
      let message = "ID Incidencia: " + incidence_id + " presente en interrupción";
      let type = "Searchbar_Massive";
      notifications(message, type, ".searchbar__notifications");
  },(errorOrderSED)=>{
    console.log("Error doing query for getting orders associated to the SED");
    let message = "Error query para obtener ordenes asociadas a la SED";
    let type = "Searchbar_Error";
    notifications(message, type, ".searchbar__notifications");
  });
}

function searchBar_SED(sed){
 /*To DO: search for a SED in the searchbar and then.
    if the sed is not in any SED interruptions, search the location
    else, show where the SED is and put the message as massive interruption*/
  var service = createQueryTask({
    url: layers.read_layer_interr_sed(),
    whereClause: `ARCGIS.DBO.SED_006.codigo=${sed}`
  });

  service((map,featureSet)=>{
    if (!featureSet.features.length) {
      console.log("theres no interruptions for this sed..");
      console.log("searching for sed location");
      let message = "SED " + sed + " no presenta problemas";
      let type = "Searchbar_NIS_Without_Problems";
      notifications(message, type, ".searchbar__notifications");
      //search the sed location
      sedLocation(sed);
      return;
    }
    let message = "SED " + sed + " presente en interrupción";
    let type = "Searchbar_Massive";
    notifications(message, type, ".searchbar__notifications");
    let myresults = featureSet.features.map((feature)=>{
      return feature;
    });
    let pointSymbol = makeSymbol.makePoint();
    myresults.forEach((attribute)=>{
      map.graphics.add(new esri.Graphic(attribute.geometry,pointSymbol));
      map.centerAndZoom(attribute.geometry,15);
      //console.log(attr.attributes['nombre']);
      makeInfoWindowPerSEDInterrupted(sed,
                                      attribute.geometry,
                                      attribute.attributes['ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden'],
                                      attribute.attributes['ARCGIS.dbo.POWERON_TRANSFORMADORES.id_incidencia'],
                                      attribute.attributes['ARCGIS.DBO.SED_006.alimentador'],
                                      attribute.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.comentario'],
                                      attribute.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.causa']);
    });
//sed, point, order_id, incident_id, alimentador, cause,commentary
  },(errorSearchSed)=>{
      console.log(errorSearchSed);
      let message = "SED " + sed + " no se ha encontrado o no existe. Ingrese un código válido.";
      let type = "Searchbar_Error";
      notifications(message, type, ".searchbar__notifications");
  });
}


//for searching a SED
function sedLocation(sed){
  var service = createQueryTask({
    url: layers.read_layer_infoSED(),
    whereClause: `codigo=${sed}`
  });
  service((map,featureSet)=>{
      if(!featureSet.features.length){
        let message = "SED " + sed + " no se ha podido localizar en el mapa.";
        let type = "Searchbar_Error";
        notifications(message, type, ".searchbar__notifications");
        console.log("SED doesnt have geometry.");
        return;
      }
      let myresults = featureSet.features.map((feature)=>{
        return feature;
      });

      let pointSymbol = makeSymbol.makePoint();
        myresults.forEach((attr)=>{
          map.graphics.add(new esri.Graphic(attr.geometry,pointSymbol));
          map.centerAndZoom(attr.geometry,15);
          console.log(attr.attributes['nombre']);
          makeInfoWindowPerSED(sed, attr.geometry, attr.attributes['nombre'],
                              attr.attributes['comuna'], attr.attributes['alimentador'], attr.attributes['propiedad']);
        });
  });
}
export {searchBar_NIS, searchBar_Order, searchBar_Incidence, searchBar_SED};
