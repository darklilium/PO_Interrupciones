import layers from '../services/layers-service';
import makeSymbol from '../services/makeSymbol-service';
import makeInfoWindow from '../services/makeinfowindow-service';
import createQueryTask from '../services/createquerytask-service';

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
        let type = "customer";
        setNotificationBox(message, type);
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
            setNotificationBox(message, type);
            return;
          }

          let sed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
          console.log(featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed']);
          makeInfoWindow(myNis,myOrder,myIncidence,sed, featureSet.features[0].geometry);
        },setNotificationBox.bind(null, 'Error al realizar la búsqueda de la sed del nis',"Error"));
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
          let type = "info";
          setNotificationBox(message, type);
          return;
        }

        let mySed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
        //and then search for any problem in SED
        searchMassive(mySed, nis);
      },(error)=>{
          console.log("Error al ejecutar la query en Falla Masiva");
          let message = "Error al buscar el NIS en falla masiva: " + nis;
          let type = "Error";
          setNotificationBox(message, type);
      });
    }
  }, (error)=>{
    console.log("Error al ejecutar la query en Falla Aislada");
    let message = "Ingrese un NIS a buscar";
    let type = "info";
    setNotificationBox(message, type);
  });

}

function setNotificationBox(message, type){
  $('.notificationBox')
    .empty()
    .css('visibility','visible')
    .append('<strong style="padding-left: 2em;">'+message+'</strong>');

  switch (type) {
    case 'customer':
      $('.notificationBox').css('background-color','lightgreen');
      break;
    case 'SED':
      $('.notificationBox').css('background-color','lightcoral');
      break;
    case 'OK':
      $('.notificationBox').css('background-color','powderblue');
      break;
    case 'NoSED':
      $('.notificationBox').css('background-color','red');
      break;
    case 'info':
      $('.notificationBox').css('background-color','yellow');
      break;
    case 'Error':
      $('.notificationBox').css('background-color','blue');
      break;
    default:

  }
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
        let type = "OK";
        setNotificationBox(message, type);
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
        let type = "SED";
        setNotificationBox(message, type);
        makeInfoWindow(nis,myOrder,myIncidence,sed, featureSet.features[0].geometry);
      }
  },(error)=>{
    console.log("Problems getting the sed for massive interruption ");
    let message = "Error tratando de obtener la SED del NIS:" + nis;
    let type = "Error";
    setNotificationBox(message, type);
  });
}

export default searchBar_NIS;
