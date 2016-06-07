import token from '../services/token-service';
import myinfotemplate from '../utils/infoTemplates';
import mymap from '../services/map-service';
import {ap_infoWindow} from '../utils/makeInfowindow';

function myLayers(){
  const serviceMain = 'http://gisred.chilquinta/arcgis/';
  //change this for external connection:
  //const serviceMain = 'http://gisred.chilquinta.cl:5555/arcgis/';
  const serviceURL = serviceMain + 'rest/services/';
  var graphicLayer = new esri.layers.GraphicsLayer();

  return {
    //The following layers are for common use in any gisred app.
    read_tokenURL(){
      return serviceMain + "tokens/generateToken";
    },

    read_logAccess(){  /*using*/
        return serviceURL + "Admin/LogAccesos/FeatureServer/2?f=json&token=" + token.read();
    },
    //chq mapabase
    read_mapabase(){
      return serviceURL + "MapaBase/MapServer?f=json&token=" + token.read();
    },
    //dmps adresses
    read_cartography(){
      return serviceURL + "Cartografia/DMPS/MapServer/0?f=json&token=" + token.read();
    },

    //The following layers and services are just for Interruptions app. (interrupciones.html and interruptions.js)
    //Featurelayer for orders per sed (with graphics)

    read_layer_interr_sed(){ /*using : Layer: SED*/
      return serviceURL + "Interrupciones/PO_test/MapServer/0?f=json&token=" + token.read();
    },
    //Featurelayer for orders per customer (with graphics)
    read_layer_interr_clie(){ /*using: Layer Clientes*/
      return serviceURL + "Interrupciones/PO_test/MapServer/1?f=json&token=" + token.read();
    },
    //Feature layer for BT: Red BT
    read_layer_tramosBT(){ /*using Layer Tramos*/
      return serviceURL + "Interrupciones/PO_test/MapServer/2?f=json&token=" + token.read();
    },
    //Feature layer for getting the nis affected in the SED (green points)
    read_layer_ClienteSED(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO_test/MapServer/3?f=json&token=" + token.read();
    },
    read_layer_CriticalCustomers(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO_test/MapServer/4?f=json&token=" + token.read();
    },
    read_layer_CriticalPerSED(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO_test/MapServer/5?f=json&token=" + token.read();
    },
    //Table for PO Orders (without graphics)
    read_layer_poOrdenes(){ /*using*/
      return serviceURL + "Interrupciones/Interrupciones_clientes/MapServer/8?f=json&token=" + token.read();
    },
    //Feature layer for customers data  : Clientes (0)
    read_layer_ClieSED(){ /*using*/
      return serviceURL + "Interrupciones/PO_test/MapServer/9?f=json&token=" + token.read();
    },
    read_layer_countTotal(){ /*using*/
      return serviceURL + "Interrupciones/PO_test/MapServer/10?token=" + token.read();
    },
    read_layer_infoSED(){/*using for getting the sed information and location*/
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer/1?f=json&token=" + token.read();
    },
    read_layer_nisInfo(){
      return serviceURL + "Chilquinta_006/ClientesV2/MapServer/0?f=json&token=" + token.read();
    },
    save_graphicLayer(myGraphicsLayer){  /*using*/
      graphicLayer = myGraphicsLayer;
    },
    read_graphicLayer(){  /*using*/
      return graphicLayer;
    },
    read_dyn_layerClieSED(){  /*using*/
        return serviceURL + "Interrupciones/PO_test/MapServer?f=json&token=" + token.read();
    },
    read_qtty_comuna(){  /*using*/
        return serviceURL + "Interrupciones/PO_test/MapServer/11?f=json&token=" + token.read();
    },
    read_qtty_office(){  /*using*/
        return serviceURL + "Interrupciones/PO_test/MapServer/12?f=json&token=" + token.read();
    },
    read_qtty_total_comuna(){  /*using*/
        return serviceURL + "Interrupciones/PO_test/MapServer/13?f=json&token=" + token.read();
    },
    write_logAccess(){  /*using*/
        return serviceURL + "Admin/LogAccesos/FeatureServer/1/applyEdits?f=json&token=" + token.read();
    },

    read_layerAlimentador(){  /*using*/
        return serviceURL + "Chilquinta_006/Tramos_006/MapServer?f=json&token=" + token.read();
    },

    //layers for AP CHQ
    read_ap_comuna(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer/4?f=json&token=" + token.read();
    },
    //19-05-2016
    read_ap_modificaciones(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer?f=json&token=" + token.read();

    },
    read_ap_luminarias(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/1?f=json&token=" + token.read();

    }

  };
}

//TO DO: this function sets the layers that will be added in the app, integrating the infowindow and their special properties.
function setLayers(){
  return {
    alimentadores(){
      var layerAlimentador = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_layerAlimentador(),{id:"gis_alimentadores"});
      layerAlimentador.setImageFormat("png32");
      layerAlimentador.setVisibleLayers([0]);
      layerAlimentador.setInfoTemplates({
        0: {infoTemplate: myinfotemplate.getAlimentadorInfoWindow()}
      });

      return layerAlimentador;
    },
    interrupciones(){
      var interrClienteSED = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_dyn_layerClieSED(),{id:"po_interrupciones"});
      interrClienteSED.setInfoTemplates({
        3: {infoTemplate: myinfotemplate.getNisInfo()},
        1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
        0: {infoTemplate: myinfotemplate.getSubFailure()}
      });
      interrClienteSED.refreshInterval = 1;
      interrClienteSED.setImageFormat("png32");
      interrClienteSED.on('update-end', (obj)=>{
        if(obj.error){
          console.log("Redirecting to login page, token for this session is ended...");
          window.location.href = "index.html";
        }
      });
        return interrClienteSED;
    },
    cuadrillas(){
      var cuadrillasLayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_dyn_layerClieSED(),{id:"po_cuadrillas"});
      /*cuadrillasLayer.setInfoTemplates({
        3: {infoTemplate: myinfotemplate.getNisInfo()},
        1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
        0: {infoTemplate: myinfotemplate.getSubFailure()}
      });
      */
      //interrClienteSED.refreshInterval = 1;
      cuadrillasLayer.setImageFormat("png32");
      return cuadrillasLayer;
    },
    ap_comuna(whereRegion, layerNumber){
      var apComunaLayer = new esri.layers.FeatureLayer(myLayers().read_ap_comuna(),{id:"ap_comuna"});
      apComunaLayer.setDefinitionExpression(whereRegion);
      console.log(whereRegion);
      return apComunaLayer;
    },
    ap_modificaciones(whereRegion, layerNumber){
      var apModificacionesLayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_ap_modificaciones(),{id:"ap_modificaciones"});
      apModificacionesLayer.setImageFormat("png32");
      apModificacionesLayer.setVisibleLayers([0]);
      var layerDefinitions = [];
      layerDefinitions[0] = whereRegion;
      apModificacionesLayer.setLayerDefinitions(layerDefinitions);

      return apModificacionesLayer;
    },
    ap_luminarias(whereRegion, layerNumber){
      var apLuminariasLayer = new esri.layers.FeatureLayer(myLayers().read_ap_luminarias(),{id:"ap_luminarias",
      mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
      minScale: 9000,
      outFields: ["*"]});
      apLuminariasLayer.setDefinitionExpression(whereRegion);

      apLuminariasLayer.on('mouse-over',(evt)=>{

        ap_infoWindow(evt.graphic.attributes['ID_LUMINARIA'],
          evt.graphic.attributes['ROTULO'],
          evt.graphic.attributes['TIPO_CONEXION'],
          evt.graphic.attributes['TIPO'],
          evt.graphic.attributes['PROPIEDAD'],
          evt.graphic.attributes['MEDIDO_TERRENO'],
          evt.graphic.geometry);

      });

      return apLuminariasLayer;
    }
  }
}

//TO DO: this function can be used to know the active layers in the map.
function layersActivated(){
  var activeLayers= [];
  var mapp = mymap.getMap();
  var activeLayersLength = mapp.layerIds.length;
  //console.log(mapp.layerIds.length);
  return {
    getMapLayers() {
      for (var j=0; j<activeLayersLength; j++) {
        var currentLayer = mapp.getLayer(mapp.layerIds[j]);
        activeLayers.push(currentLayer.id);
      //  alert("id: " + currentLayer.id);
      }
      //console.log(activeLayers);
      return activeLayers;

    }
  }
}

// TO DO: this function add the default and not defaults layer (from the layerlist) in the app.
function addCertainLayer(layerNameToAdd, order, where){
  var mapp = mymap.getMap();
  var myLayerToAdd;

  console.log("adding layer: ", layerNameToAdd);

  switch (layerNameToAdd) {

    case 'ap_comuna':
      myLayerToAdd = setLayers().ap_comuna(where, 4);
    break;

    case 'po_interrupciones':
      myLayerToAdd = setLayers().interrupciones();
    break;

    case 'gis_alimentadores':
      myLayerToAdd = setLayers().alimentadores();
    break;

    case 'ap_luminarias':
        myLayerToAdd = setLayers().ap_luminarias(where,5);
    break;

    case 'ap_modificaciones':
      myLayerToAdd = setLayers().ap_modificaciones(where,5);
    break;
    default:
  }

  mapp.addLayer(myLayerToAdd);

  //Set here if you add more layers in the layerlist.
  if (check_alimentador.checked){
    mapp.addLayer(setLayers().alimentadores(),1);
  }
  if (check_ap_modificaciones.checked){
    mapp.addLayer(setLayers().ap_modificaciones(), 1);
  }

}
export default myLayers();
export {setLayers,layersActivated,addCertainLayer};
