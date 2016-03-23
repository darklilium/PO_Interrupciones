import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import StatisticsToolbar from '../bundles/statistics-toolbar';
import mymap from '../services/map-service';
import MyGrid from '../bundles/myGrid';
import searchBar_NIS from '../services/searchbar-service';
import maponclicksearch from '../services/searchbar-service';


class Interruptions extends React.Component {

  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.onClickClearMap = this.onClickClearMap.bind(this);
  }

  componentDidMount(){
    var sls = new esri.symbol.SimpleLineSymbol("solid", new esri.Color("#444444"), 3);
    var sfs = new esri.symbol.SimpleFillSymbol("solid", sls, new esri.Color([68, 68, 68, 0.25]));

    var popup = new esri.dijit.Popup({
        fillSymbol: sfs,
        lineSymbol: null,
        markerSymbol: null
      }, document.createElement('div'));

    var map = mymap.createMap("myMapDiv","topo",-71.2905 ,-33.1009,9,popup);
    map.on("click",(event)=>{
      console.log("doing click on map");
      console.log(event.mapPoint);
    });
    map.disableKeyboardNavigation();
  /**/
  var chqNISTemp= new esri.InfoTemplate();
    chqNISTemp.setTitle("<b>Codigo: ${ARCGIS.DBO.SED_006.codigo}</b>");

  var chqNISInfoContent = "<div style=padding-top: 10px;>Alimentador: ${ARCGIS.DBO.SED_006.alimentador}<br></div>";
    chqNISTemp.setContent(chqNISInfoContent);

    var myDynamicSedLayerOptions = {
           "id": "ORDENES PO",
           "opacity": 0.8,
           "showAttribution": false
         };
    var myDynamicSedLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layer_PO(),myDynamicSedLayerOptions);
    myDynamicSedLayer.setInfoTemplates({
      0: {InfoTemplate: chqNISTemp}
    });
    map.addLayer(myDynamicSedLayer,2);
    
    myDynamicSedLayer.setVisibleLayers([0,1]);
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

  onClickClearMap(){
    console.log("clearing map");
    var map = mymap.getMap();
    map.graphics.clear();
  }

  render(){
    return (
    <div className="interruptions_wrapper">
      <div className="searchBox">
      {/* Input for searching NIS */}
        <input className="searchBox__searchInput" ref="NIS" type="text" placeholder=" NIS" />
      {/* Button for searching NIS */}
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        </button>
      {/* Button for cleaning map */}
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickClearMap}>
          <span className="searchBox_icon"><i className="fa fa-eraser"></i></span></button>
      {/* Button for toggle grid */}
        <button data-toggle="collapse" data-target="#collapseMyGrid" type="button" className="searchBox__tableToggle btn btn-default" onClick={this.onClickToggle}>
            <span className="searchBox_icon"><i className="fa fa-bars"></i> Ver Tabla</span>
        </button>
      {/* Button for statistics widget (not done yet)*/}
        <button data-toggle="collapse" data-target="#collapseStatistics" type="button" className="searchBox__tableToggle btn btn-default" onClick={this.onClickStatistics}>
            <span className="searchBox_icon"><i className="fa fa-bar-chart"></i> Estadísticas</span>
        </button>
      </div>
      {/* The map*/}
      <div className="myMapDiv" id="myMapDiv"></div>
      {/* StatisticsToolbar on top*/}
      <StatisticsToolbar />
      {/* Statistics widget (not done yet)*/}
      <div className="collapse" id="collapseStatistics"></div>
      {/* For collapsing grid*/}
      <div id="collapseMyGrid" className="collapse">
        <MyGrid />
      </div>
      {/* For notifications about NIS found in the searchbar*/}
      <div className="searchNotification">
        <div id="myNotification"></div>
      </div>
      {/* For notifications about ORDER clicked and related NIS found in the grid*/}
      <div className="orderNotification">
        <div id="myorderNotification"></div>
      </div>
    </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions'));
