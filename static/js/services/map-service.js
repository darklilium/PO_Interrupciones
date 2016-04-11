import layers from '../services/layers-service';
import myinfotemplate from '../utils/infoTemplates';

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
      var baseMapLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_mapabase(),{id:"CHQBasemap"});

      if(bm!='Chilquinta'){
          this.map.removeAllLayers();
          addMapsAndLayers((callback)=>{console.log("layers added again");});
          this.map.setBasemap(bm);
          return;
        }
      this.map.removeAllLayers();
      addMapsAndLayers((callback)=>{console.log("layers added again");});
      this.map.addLayer(baseMapLayer,0);

    }
};

function addMapsAndLayers(callback){
  var mapp = map.getMap();
  console.log("adding layers and mapabases...");

  var interrClienteSED = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layerClieSED(),{id:"CHQInterruptions"});
  interrClienteSED.setInfoTemplates({
    3: {infoTemplate: myinfotemplate.getNisInfo()},
    1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
    0: {infoTemplate: myinfotemplate.getSubFailure()}
  });
  interrClienteSED.refreshInterval = 1;
  mapp.addLayer(interrClienteSED, 1);

  callback("done");
}

export default map;
export {addMapsAndLayers};
