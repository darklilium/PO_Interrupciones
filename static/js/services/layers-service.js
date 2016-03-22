import token from '../services/token-service';

function myLayers(){
  // var sedLayer;
  // var clientesLayer;
  // var poTransLayer;
  // var poClieLayer;
  // var poOrdenesLayer;
  const serviceURL = 'http://gisred.chilquinta.cl:5555/arcgis/rest/services/';

  return {
    //Featurelayer for sed (with graphics)
    read_layer_interr_sed(){
      return serviceURL + "Interrupciones/PO/MapServer/0?f=json&token=" + token.read();
    },
    //Featurelayer for customers (with graphics)
    read_layer_interr_clie(){
      return serviceURL + "Interrupciones/PO/MapServer/1?f=json&token=" + token.read();
    },
    //Table for transformers (without graphics)
    read_layer_trans(){
      return serviceURL + "Interrupciones/PO/MapServer/2?f=json&token=" + token.read();
    },
    //Table for PO customers (without graphics)
    read_layer_poClie(){
      return serviceURL + "Interrupciones/PO/MapServer/3?f=json&token=" + token.read();
    },
    //Table for PO Orders (without graphics)
    read_layer_poOrdenes(){
      return serviceURL + "Interrupciones/PO/MapServer/4?f=json&token=" + token.read();
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
      return serviceURL + "Chilquinta_006/Tramos_006/MapServer/1?f=json&token=" + token.read();
    },
    //Dynamic layer: Equipos Pto : SSEE(0), Subestaciones de Dist (1), Salida Alimentador (2), Equipos (3)
    read_layer_EquiposPto(){
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer?token=" + token.read();
    }
  };
}
export default myLayers();
