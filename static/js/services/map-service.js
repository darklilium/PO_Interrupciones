function mymap(){
  var map;

  var wrapper = {
    createMap(div){
      map = new esri.Map(div, {
        basemap: "topo",
        center:[-71.2905, -33.1009],
        zoom:9,
        logo: false
      });

      return map;
    },
    getMap(){
      return map;
    },
    onClick(){
      map.on("click",(mouseEvent)=>{
         return console.log("thinking on map onClick for infowindow");
      });
    }

  };

  return wrapper;
}

export default mymap();
