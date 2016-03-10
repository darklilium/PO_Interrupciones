function myLayers(){
  var sedLayer;
  var clientesLayer;
  var poTransLayer;
  var poClieLayer;
  var poOrdenesLayer;

  return {
    read_layer_sed(){
      return "http://143.47.57.116/arcgis/rest/services/Interrupciones/PO/MapServer/0";
    },
    read_layer_clie(){
      return "http://143.47.57.116/arcgis/rest/services/Interrupciones/PO/MapServer/1";
    },
    read_layer_trans(){
      return "http://143.47.57.116/arcgis/rest/services/Interrupciones/PO/MapServer/2";
    },
    read_layer_poClie(){
      return "http://143.47.57.116/arcgis/rest/services/Interrupciones/PO/MapServer/3";
    },

    read_layer_poOrdenes(){
      return "http://143.47.57.116/arcgis/rest/services/Interrupciones/PO/MapServer/4";
    }


  };
}
export default myLayers();
