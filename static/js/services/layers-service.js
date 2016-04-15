import token from '../services/token-service';

function myLayers(){
  const serviceMain = 'http://gisred.chilquinta/arcgis/';
  //change this for external connection:
  //  const serviceMain = 'http://gisred.chilquinta.cl:5555/arcgis/';
  const serviceURL = serviceMain + 'rest/services/';
  var graphicLayer = new esri.layers.GraphicsLayer();

  return {
  //The following layers and services are just for Chilquinta APP. (interrupciones.html and interruptions.js)
    //Featurelayer for orders per sed (with graphics)
    read_tokenURL(){
      return serviceMain + "tokens/generateToken";
    },
    read_mapabase(){
      return serviceURL + "MapaBase/MapServer?f=json&token=" + token.read();
    },
    read_cartography(){
      return serviceURL + "Cartografia/DMPS/MapServer/0?f=json&token=" + token.read();
    },
    read_layer_interr_sed(){ /*using : Layer: SED*/
      return serviceURL + "Interrupciones/PO/MapServer/0?f=json&token=" + token.read();
    },
    //Featurelayer for orders per customer (with graphics)
    read_layer_interr_clie(){ /*using: Layer Clientes*/
      return serviceURL + "Interrupciones/PO/MapServer/1?f=json&token=" + token.read();
    },
    //Feature layer for BT: Red BT
    read_layer_tramosBT(){ /*using Layer Tramos*/
      return serviceURL + "Interrupciones/PO/MapServer/2?f=json&token=" + token.read();
    },
    //Feature layer for getting the nis affected in the SED (green points)
    read_layer_ClienteSED(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO/MapServer/3?f=json&token=" + token.read();
    },
    read_layer_CriticalCustomers(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO/MapServer/4?f=json&token=" + token.read();
    },
    read_layer_CriticalPerSED(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO/MapServer/5?f=json&token=" + token.read();
    },
    //Table for PO Orders (without graphics)
    read_layer_poOrdenes(){ /*using*/
      return serviceURL + "Interrupciones/Interrupciones_clientes/MapServer/8?f=json&token=" + token.read();
    },
    //Feature layer for customers data  : Clientes (0)
    read_layer_ClieSED(){ /*using*/
      return serviceURL + "Interrupciones/PO/MapServer/9?f=json&token=" + token.read();
    },
    read_layer_countTotal(){ /*using*/
      return serviceURL + "Interrupciones/PO/MapServer/10?token=" + token.read();
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
        return serviceURL + "Interrupciones/PO/MapServer?f=json&token=" + token.read();
    },
    read_qtty_comuna(){  /*using*/
        return serviceURL + "Interrupciones/PO/MapServer/11?f=json&token=" + token.read();
    },
    read_qtty_office(){  /*using*/
        return serviceURL + "Interrupciones/PO/MapServer/12?f=json&token=" + token.read();
    },
    read_qtty_total_comuna(){  /*using*/
        return serviceURL + "Interrupciones/PO/MapServer/13?f=json&token=" + token.read();
    },
    write_logAccess(){  /*using*/
        return serviceURL + "Admin/LogAccesos/FeatureServer/1/applyEdits?token=" + token.read();
    }

  };
}
export default myLayers();
