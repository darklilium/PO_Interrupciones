function myLayers(){
  var sedLayer;
  var clientesLayer;
  var poTransLayer;
  var poClieLayer;
  var poOrdenesLayer;

  return {
    read_layer_sed(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/0";
    },
    read_layer_clie(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/1";
    },
    read_layer_trans(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/2";
    },
    read_layer_poClie(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/3";
    },

    read_layer_poOrdenes(){
      return "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer/4";
    }


  };
}
export default myLayers();
