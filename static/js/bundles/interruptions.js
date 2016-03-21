import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import StatisticsToolbar from '../bundles/statistics-toolbar';
import mymap from '../services/map-service';
import MyGrid from '../bundles/myGrid';
import searchBar_NIS from '../services/searchbar-service';

class Interruptions extends React.Component {

  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);

  }

  componentDidMount(){
    var map = mymap.createMap("myMapDiv");
    map.disableKeyboardNavigation();

    var myDynamicSedLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layer_PO());
    var dyn_Tramos = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_layer_Tramos());
    var dyn_EquiposPtoLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_layer_EquiposPto());

    var visibleLayers = [1];
      dyn_Tramos.setVisibleLayers(visibleLayers);
      dyn_EquiposPtoLayer.setVisibleLayers(visibleLayers);
      map.addLayer(myDynamicSedLayer,2);
      map.addLayer(dyn_Tramos,1);
      map.addLayer(dyn_EquiposPtoLayer,3);

  }

  onClickToggle(mouseEvent){
    console.log("toggling table");

  }

  onClickStatistics(mouseEvent){
    console.log("toggling statistics");
  }

  onClick(){
    searchBar_NIS(this.refs.NIS.value);
  }

  render(){
    return (
    <div className="interruptions_wrapper">
      <div className="searchBox">
        <input className="searchBox__searchInput" ref="NIS" type="text" placeholder=" NIS" />
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        </button>
        <button data-toggle="collapse" data-target="#collapseMyGrid" type="button" className="searchBox__tableToggle btn btn-default" onClick={this.onClickToggle}>
            <span className="searchBox_icon"><i className="fa fa-bars"></i> Ver Tabla</span>
        </button>
        <button data-toggle="collapse" data-target="#collapseStatistics" type="button" className="searchBox__tableToggle btn btn-default" onClick={this.onClickStatistics}>
            <span className="searchBox_icon"><i className="fa fa-bar-chart"></i> Estadísticas</span>
        </button>
      </div>
      <div className="myMapDiv" id="myMapDiv"></div>
        <StatisticsToolbar />
      <div className="collapse" id="collapseStatistics">

      </div>
      <div id="collapseMyGrid" className="collapse">
        <MyGrid />
      </div>
      <div className="searchNotification">
        <div id="myNotification"></div>
      </div>
      <div className="orderNotification">
        <div id="myorderNotification"></div>
      </div>
    </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions'));
