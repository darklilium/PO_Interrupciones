import mylayers from '../services/layers-service';
import token from '../services/token-service';
import {setLayers} from '../services/layers-service';

//TO DO: this var sets the map to be used in the whole app.
var map = {
    createMap: function(div,basemap,centerx,centery,zoom){
        this.map = new esri.Map(div, {
          center:[centerx, centery],
          basemap: basemap,
          zoom:zoom,
          logo: false
        });
        return this.map;
    },
    getMap: function(){
      return this.map;
    },
    changeBasemap: function(bm){
      /* Removing all the layers first and then if chilquinta add the layer simulating a basemap.
      In other cases, set the esri basemap  */
      var baseMapLayer = new esri.layers.ArcGISDynamicMapServiceLayer(mylayers.read_mapabase(),{id:"CHQBasemap"});

      if(bm!='Chilquinta'){
          this.map.removeAllLayers();
          addMapsAndLayers((callback)=>{console.log("chilquinta layer added again");});
          this.map.setBasemap(bm);
          return;
        }

      this.map.removeAllLayers();
      addMapsAndLayers((callback)=>{console.log("interrupciones layer added again");});
      this.map.addLayer(baseMapLayer,0);

    }
};
// TO DO: this function add the default and not defaults layer (from the layerlist) in the app.
function addMapsAndLayers(callback){
  var mapp = map.getMap();
  console.log("adding layers and mapabases...");

  //set here layers by default.
  var interrClienteSED = setLayers().interrupciones();
  mapp.addLayer(interrClienteSED, 2);
  //Set here if you add more layers in the layerlist. Starting with a index position of 10.
  if (check_alimentador.checked){
    mapp.addLayer(setLayers().alimentadores(), 10);
  }
  callback("done");
}





export default map;
export {addMapsAndLayers};
