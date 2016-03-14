import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';


var map;
var searchSymbol;
var popupTemplate;
/*FOR LOGIN APP*/
class Interruptions extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);

  }
  componentDidMount(){
        map = new esri.Map("myMapDiv", {
              basemap: "topo",
              center:[-71.2905, -33.1009],
              zoom:9

            });

        //  var myFirstLayer = new esri.layers.FeatureLayer(layers.read_layer_sed());
    var myDynamicSedLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layer_PO());
    var myDynamicBTLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_layer_BT());
    var visibleLayers = [1];
        myDynamicBTLayer2.setVisibleLayers(visibleLayers);
        map.addLayer(myDynamicSedLayer,2);
        map.addLayer(myDynamicBTLayer2,1);
  }
//139035
  onClick(){
    console.log(token.read());
    var queryTaskNIS = new esri.tasks.QueryTask(layers.read_layer_clie());
    var queryNIS = new esri.tasks.Query();
    queryNIS.where = "ARCGIS.dbo.POWERON_CLIENTES.nis="+this.refs.NIS.value;
    queryNIS.returnGeometry = true;
    queryNIS.outFields=["*"];
    //this guy returns a featureSet object with the queryResult
    queryTaskNIS.execute(queryNIS, this.searchLocation, this.errorInQuery);
  }
  searchLocation(featureSet){
    console.log("searching for location...");
    map.graphics.clear();
    console.log(featureSet);

    for (var i = 0; i < featureSet.features.length; i++) {
      if (featureSet.features.length != 0) {
        var searchSymbol = new esri.symbol.SimpleMarkerSymbol(
          esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
          20,
          new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_NULL,
            new esri.Color([0, 255, 255, 0.9]),
            1
          ),
          new esri.Color([0, 255, 255, 0.5])
        );


      map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,searchSymbol));
      map.centerAndZoom(featureSet.features[0].geometry,20);

      } else {
        console.log("i dont have data");
        //  $("#warning").css("visibility","visible");
      }
    }
  }
  errorInQuery(error){
    //  $("#warning").css("visibility","visible");
    console.log("U must provide a NIS for searching");
  }

  render(){
    return (
      <div className="interruptions_wrapper">
      <div className="searchBox">

        <input className="searchBox__searchInput" ref="NIS" type="text" />
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        </button>
      </div>
        <div className="myMapDiv" id="myMapDiv"></div>
        <div className="popUpInfo" id ="popUpInfo"></div>
      </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions'));
