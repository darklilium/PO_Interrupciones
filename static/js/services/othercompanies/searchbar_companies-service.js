import layers from '../../services/layers-service';
import mymap from '../../services/map-service';
import makeSymbol from '../../services/makeSymbol-service';
import {makeInfoWindow} from '../../services/makeinfowindow-service';
import createQueryTask from '../../services/createquerytask-service';

function sendNotification(level='warning', message){

}

function searchBar_NIS(nis, company){
var url_iso_interruptions, url_mass_interruptions;

var companyNumber;

    if (company=='Litoral'){
        console.log("Searching NIS in Litoral");
        return;
        //urlCustomersCompany = layers.read_layer_interr_clie_litoral();
    }else if(company=='Casablanca'){
        console.log("Searching NIS in Casablanca");
        //has to be all the setup for Casablanca queries
        urlCustCompanyInterr=layers.read_layer_casablanca_interr_clie();
        urlNisSed = layers.read_layer_casablanca_ClieSED();
        urlInterrSED = layers.read_layer_casablanca_interr_sed();
        return;
    }else if (company=='Linares') {
        //has to be all the setup for Linares queries
        console.log("Searching NIS in Linares");
        return;

    //for parral
    }else if (company=='Parral'){
        console.log("Searching NIS in Parral");
        //has to be all the setup for Parral queries
        return;

    }
  //FIRST: search in isolated orders for current nis
  var service = createQueryTask({
    url: urlCustCompanyInterr,
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

        sendNotification('info', 'NIS: '+ nis + ' presente en falla aislada');

        let myNis = featureSet.features[0].attributes['ARCGIS.DBO.CLIENTES_XY_006.nis'];
        let myOrder = featureSet.features[0].attributes['ARCGIS.dbo.POWERON_CLIENTES.id_orden'];
        let myIncidence = featureSet.features[0].attributes['ARCGIS.dbo.POWERON_CLIENTES.id_incidencia'];
        //get information about nis's SED
        let serviceSED = createQueryTask({
          url: urlNisSed,
          whereClause: `ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis=${nis}`,
          outFields: [`ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed`]
        });
        serviceSED((map,featureSet)=>{
              map.graphics.clear();
              if(featureSet.features.length!=0){
                let sed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
                console.log(featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed']);
                  makeInfoWindow(myNis,myOrder,myIncidence,sed, featureSet.features[0].geometry);
              }else{
                  sendNotification('warning', "NIS: " + nis + " no tiene sed");
              }

        },sendNotification.bind(null, 'error'));
      }
    } else {
      console.log("going to search into massive interruptions");
      var serviceMassive = createQueryTask({
        url: urlSEDCompany,
        whereClause: `ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis=${nis}`
      });
      serviceMassive((map,featureSet)=>{
        console.log(featureSet);
        if(featureSet.features.length != 0){
          let mySed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];

          searchMassive(mySed, nis, urlInterrSED);
        }else {
          sendNotification('info', "NIS: " + nis+ " no se ha encontrado o no existe");
        }

      },(error)=>{
          console.log("Error al ejecutar la query en Falla Masiva");
          sendNotification('info', "Error al buscar el NIS en falla masiva: " + nis);
      });
    }
  }, (error)=>{
    console.log("Error al ejecutar la query en Falla Aislada");
    sendNotification('warning', "Ingrese un NIS a buscar");
  //  sendNotification.bind(null, 'error')
  });

}

function searchMassive(sed, nis, urlInterr){
    //with the sed , to get interruptions massives on sed
    urlInterr
  var serviceSearchMassive = createQueryTask({
    url: layers.read_layer_interr_sed(),
    whereClause: `ARCGIS.DBO.SED_006.codigo=${sed}`
  });

  serviceSearchMassive((map,featureSet)=>{
    map.graphics.clear();
      if (featureSet.features != 0){
          console.log("interrupted customers in SED "+ featureSet.features[0].attributes['ARCGIS.DBO.SED_006.codigo']);
          for (let i = 0; i < featureSet.features.length; i++) {
            let pointSymbol = makeSymbol.makePoint();
            map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,pointSymbol));
            map.centerAndZoom(featureSet.features[0].geometry,20);
            console.log("Found in massive interruptions");
            sendNotification('danger',"NIS: " + nis +" presente en falla masiva");
          }
      }else {
        console.log("nis is not having any issue");
        sendNotification('success', "NIS: " + nis + " no presenta problemas");


      }

  },(error)=>{
    console.log("Problems getting the sed for massive interruption ");
    sendNotification('warning', "Error tratando de obtener la SED del NIS:" + nis);
  });
}

export default searchBar_NIS;
