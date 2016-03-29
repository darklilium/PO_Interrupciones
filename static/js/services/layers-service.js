import token from '../services/token-service';

function myLayers(){
  const serviceURL = 'http://gisred.chilquinta.cl:5555/arcgis/rest/services/';
  var graphicLayer = new esri.layers.GraphicsLayer();

  return {
  //The following layers and services are just for Chilquinta APP. (interrupciones.html and interruptions.js)
    //Featurelayer for orders per sed (with graphics)
    read_layer_interr_sed(){
      return serviceURL + "Interrupciones/PO/MapServer/0?f=json&token=" + token.read();
    },
    //Featurelayer for orders per customer (with graphics)
    read_layer_interr_clie(){
      return serviceURL + "Interrupciones/PO/MapServer/1?f=json&token=" + token.read();
    },
    //Table for Po orders per transformer (without graphics)
    read_layer_trans(){
      return serviceURL + "Interrupciones/PO/MapServer/2?f=json&token=" + token.read();
    },
    //Table for PO order per customer (without graphics)
    read_layer_poClie(){
      return serviceURL + "Interrupciones/PO/MapServer/3?f=json&token=" + token.read();
    },
    //Table for PO Orders (without graphics)
    read_layer_poOrdenes(){
      return serviceURL + "Interrupciones/Interrupciones_clientes/MapServer/6?f=json&token=" + token.read();
    },
    //Dynamic layer for PowerOn, ordenes de clientes segun: SED(0) Clientes (1)
    read_dyn_layer_PO(){
      return serviceURL + "Interrupciones/PO/MapServer?token=" + token.read();
    },
    //Dynamic layer for Tramos: MT(0), BT(1). AP(2)
    read_layer_Tramos(){
      return serviceURL + "Chilquinta_006/Tramos_006/MapServer?token=" + token.read();
    },
    //Dynamic layer for basemap: Mapabase => solera abierta (0), cerrada(1), calles(2), predios(3), comuna(4), provincia(5), region(6)
    read_layer_BaseMap(){
      return serviceURL + "MapaBase/MapServer?token=" + token.read();
    },
    //Feature layer for customers data  : Clientes (0)
    read_layer_ClieSED(){
      return serviceURL + "Chilquinta_006/ClientesV2/MapServer/0?f=json&token=" + token.read();
    },
    //Feature layer for BT: Red BT (1)
    read_layer_tramosBT(){
      return serviceURL + "Interrupciones/PO/MapServer/2?f=json&token=" + token.read();
    },
    //Dynamic layer: Equipos Pto : SSEE(0), Subestaciones de Dist (1), Salida Alimentador (2), Equipos (3)
    read_layer_EquiposPto(){
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer?token=" + token.read();
    },
    read_layer_ClienteSED(){ /*using*/
      return serviceURL + "Interrupciones/PO/MapServer/3?token=" + token.read();
    },

    read_layer_countTotal(){ /*using*/
      return serviceURL + "Interrupciones/PO/MapServer/8?token=" + token.read();
    },

    //The following layers and services are just for subsidiaries (filiales). (nterrupciones2.html and interruptions2.js)

    //LAYERS FOR CASABLANCA
    //Featurelayer for orders per sed (with graphics)
    read_layer_casablanca_interr_sed(){
      //return serviceURL + "Interrupciones/PO_CASABLANCA/MapServer/0?f=json&token=" + token.read();
    },
    //Featurelayer for orders per customer (1:1) (with graphics)
    read_layer_casablanca_interr_clie(){
    //  return serviceURL + "Interrupciones/PO_CASABLANCA/MapServer/1?f=json&token=" + token.read();
    },
    //Table for orders per(without graphics)
    read_layer_casablanca_trans(){
    //  return serviceURL + "Interrupciones/PO_CASABLANCA/MapServer/2?f=json&token=" + token.read();
    },
    //Table for PO orders per clie(without graphics)
    read_layer_casablanca_poClie(){
    //  return serviceURL + "Interrupciones/PO_CASABLANCA/MapServer/3?f=json&token=" + token.read();
    },
    //Table for PO Orders (without graphics)
    read_layer_casablanca_poOrdenes(){
    //  return serviceURL + "Interrupciones/PO_CASABLANCA/MapServer/4?f=json&token=" + token.read();
    },
    //DEFINED: OK - u can get SED from here
    read_casablanca_SED(){
      //http://gisred.chilquinta.cl:5555/arcgis/rest/services/Chilquinta_028/Chilquinta_028/MapServer/0
      return serviceURL + "Chilquinta_028/Chilquinta_028/MapServer/0?f=json&token=" + token.read();
    },

    //Feature layer for customers information: Clientes (0) y su sed asociada
    read_layer_casablanca_ClieSED(){
      //http://gisred.chilquinta.cl:5555/arcgis/rest/services/Chilquinta_028/Clientes_028/MapServer/0
      return serviceURL + "Chilquinta_028/Clientes_028/MapServer/0?f=json&token=" + token.read();
    },
    save_graphicLayer(myGraphicsLayer){
    //  console.log(arguments);
      graphicLayer = myGraphicsLayer;
    },
    read_graphicLayer(){
      return graphicLayer;
    }


  };
}
export default myLayers();
