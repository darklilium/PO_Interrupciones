/*
function mymap(div){
  var map = new esri.Map(div, {
        basemap: "topo",
        center:[-71.2905, -33.1009],
        zoom:9,
        logo: false
      });
  return map;
}

export default mymap;
*/

function mymap(){
  var map;
  return {
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
}

export default mymap();

/* la misma cosa pero mas bonita :)
function mymap(){
  var map;

  return {
    createMap: function(div){
      map = new esri.Map(div, {
        basemap: "topo",
        center:[-71.2905, -33.1009],
        zoom:9,
        logo: false
      });
    },
    getMap: function(){
      return map;
    }
  };
}
*/
