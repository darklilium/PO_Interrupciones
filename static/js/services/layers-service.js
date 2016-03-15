import token from '../services/token-service';
function myLayers(){
  var sedLayer;
  var clientesLayer;
  var poTransLayer;
  var poClieLayer;
  var poOrdenesLayer;

  return {
    read_layer_sed(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/0?f=json&token="+token.read();
    },
    read_layer_clie(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/1?f=json&token="+token.read();
    },
    read_layer_trans(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/2?f=json&token="+token.read();
    },
    read_layer_poClie(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/3?f=json&token="+token.read();
    },

    read_layer_poOrdenes(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/4?f=json&token="+token.read();
    },

    read_dyn_layer_PO(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer?token="+token.read();
    },
    read_layer_BT(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Chilquinta_006/Tramos_006/MapServer?token="+ token.read();
    },

    read_layer_BT2(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/MapaBase/MapServer?token="+ token.read();
    },
    read_layer_ClieSED(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Chilquinta_006/ClientesV2/MapServer/0?f=json&token="+ token.read();
    }

  };
}
export default myLayers();
