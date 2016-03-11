import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';

/*FOR LOGIN APP*/
class Interruptions extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);

  }

  componentDidMount(){
    var map = new esri.Map("myMapDiv", {
          basemap: "topo",
          center:[-71.2905, -33.1009],
          zoom:9
        });

        //  var myFirstLayer = new esri.layers.FeatureLayer(layers.read_layer_sed());
          var myDynamicSedLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layer_PO());
          var myDynamicBTLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_layer_BT());
          var visibleLayers = [1];
          myDynamicBTLayer2.setVisibleLayers(visibleLayers);

          //map.addLayer(myDynamicSedLayer);
          map.addLayer(myDynamicSedLayer,2);
          map.addLayer(myDynamicBTLayer2,1);


  }

  onClick(){
    console.log(token.read());
  }

  render(){
    return (
      <div className="interruptions_wrapper">
      <div className="searchBox">
        <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        <input className="searchBox__searchInput" ref="NIS" type="text" />

        <input className="searchBox__searchSubmit" type="submit" onClick={this.onClick}  />
        <button type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-star"></span>Label
        </button>
      </div>
        <div className="myMapDiv" id="myMapDiv"></div>

      </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions'));
