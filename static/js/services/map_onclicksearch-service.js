import layers from '../services/layers-service';
import myinfotemplate from '../services/infotemplates-service';
import mymap from '../services/map-service';

function clickSearch(mapPoint){
  var map = mymap.getMap();

  var params = {center: mapPoint,
            geodesic: true,
            radius: 1,
            radiusUnit: "esriMiles"
          };
  var circle = new esri.geometry.Circle(params);
  //hacer query que identifique que se seleccionó.
  var southCarolinaCounties = new FeatureLayer(layers.read_layer_ClieSED(), {
          mode: FeatureLayer.MODE_SNAPSHOT,
          outFields: ["*"]
        });
        southCarolinaCounties.setDefinitionExpression("ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis ="+nis);
 }

 export default clickSearch;
