import layers from '../services/layers-service';
import myinfotemplate from '../utils/infoTemplates';
import token from '../services/token-service';
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

  //set here layers by default.
  var interrClienteSED = setLayers().interrupciones();
  mapp.addLayer(interrClienteSED, 1);

  callback("done");
}

function setLayers(){
  return {
    alimentadores(){
      var layerAlimentador = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_layerAlimentador(),{id:"CHQAlimentadores"});
      layerAlimentador.setImageFormat("png32");
      layerAlimentador.setInfoTemplates({
        0: {infoTemplate: myinfotemplate.getAlimentadorInfoWindow()}
      });
      layerAlimentador.setVisibleLayers([0]);

      return layerAlimentador;
    },
    interrupciones(){
      var interrClienteSED = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layerClieSED(),{id:"CHQInterruptions"});
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
      var cuadrillasLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layerClieSED(),{id:"CHQCuadrillas"});
      /*cuadrillasLayer.setInfoTemplates({
        3: {infoTemplate: myinfotemplate.getNisInfo()},
        1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
        0: {infoTemplate: myinfotemplate.getSubFailure()}
      });
      */
      //interrClienteSED.refreshInterval = 1;
      cuadrillasLayer.setImageFormat("png32");
      return cuadrillasLayer;
    }
  }
}



export default map;
export {addMapsAndLayers,setLayers};
