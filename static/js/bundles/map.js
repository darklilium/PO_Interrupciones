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

function mymap(div){
  var map = new esri.Map(div, {
        basemap: "topo",
        center:[-71.2905, -33.1009],
        zoom:9,
        logo: false
      });
}

const singleton;

export default function(div){
  if(singleton == null){
    singleton = mymap(div);
  }

  return singleton;
};
