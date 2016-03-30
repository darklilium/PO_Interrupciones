import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import StatisticsToolbar from '../bundles/statistics-toolbar';
import mymap from '../services/map-service';
import MyGrid from '../bundles/myGrid';
import searchBar_NIS from '../services/searchbar-service';
import clickSearch from '../services/map_onclicksearch-service';
import myinfotemplate from '../services/infotemplates-service';

class Interruptions extends React.Component {

  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.onClickClearMap = this.onClickClearMap.bind(this);
  }

  componentDidMount(){
    var map = mymap.createMap("myMapDiv","topo",-71.2905 ,-33.1009,9);
    map.disableKeyboardNavigation();

    var sedInterrLayer = new esri.layers.FeatureLayer(layers.read_layer_interr_sed(),{
       mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
       infoTemplate: myinfotemplate.getSubFailure(),
       outFields: ["*"]
    });

    var clieInterrLayer = new esri.layers.FeatureLayer(layers.read_layer_interr_clie(),{
       mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
       infoTemplate: myinfotemplate.getIsolatedNisFailure(),
       outFields: ["*"]
    });

    var interrTramos = new esri.layers.FeatureLayer(layers.read_layer_tramosBT());

    var interrClienteSED = new esri.layers.FeatureLayer(layers.read_layer_ClienteSED(),{
      infoTemplate: myinfotemplate.getNisInfo(),
      outFields: ["*"]
    });

    map.addLayer(interrTramos);
    map.addLayer(sedInterrLayer);
    map.addLayer(interrClienteSED);
    map.addLayer(clieInterrLayer);
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
    map.removeLayer(layers.read_graphicLayer());

    $('.notificationBox').empty();
    $('.notificationBox').css('visibility', 'hidden');
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
      {/* Notification Box*/}
      <div className="notificationBox"></div>
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
