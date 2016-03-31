import React from 'react';
import mymap from '../services/map-service';
import searchBar_NIS from '../services/searchbar-service';
import layers from '../services/layers-service';
import myinfotemplate from '../services/infotemplates-service';
import StatisticsToolbar from './StatisticsToolbar.jsx';
import MyGrid from './MyGrid.jsx';
import StatisticsSummary from './statistics-summary.jsx';
import {getStatisticsSummary} from '../services/getstatistics-summary';
class Interruptions extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.onClickClearMap = this.onClickClearMap.bind(this);

    this.state = {
      staClic : 0
    }
  }

  componentDidMount(){
    var map = mymap.createMap("myMapDiv","topo",-71.2905 ,-33.1009,9);
    map.disableKeyboardNavigation();

    var interrClienteSED = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layerClieSED());
    interrClienteSED.setInfoTemplates({
      3: {infoTemplate: myinfotemplate.getNisInfo()},
      1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
      0: {infoTemplate: myinfotemplate.getSubFailure()}
    });
    map.addLayer(interrClienteSED);
  }

  onClickToggle(mouseEvent){
    console.log("toggling table");
  }

  onClickStatistics(mouseEvent){
    console.log("toggling statistics");
    if (this.state.staClic==0){
      this.setState({ staClic : 1 });
      $('.statisticsSummary').css('visibility', 'visible');
      $('.wrapper_statistics-summary').css('visibility', 'visible');
      getStatisticsSummary();


    }else{
      this.setState({ staClic : 0 });
      $('.statisticsSummary').css('visibility', 'hidden');
      $('.wrapper_statistics-summary').css('visibility', 'hidden');
    }
  }

  onClick(){
    searchBar_NIS(this.refs.NIS.value);
  }

  onClickClearMap(){
    console.log("clearing map");

    var map = mymap.getMap();
    map.graphics.clear();
    map.removeLayer(layers.read_graphicLayer());

    $('.notificationBox').empty().css('visibility', 'hidden');
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
      {/* Button for toggle grid  */}
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
        <MyGrid /> {/*NOT USING FOR NOW*/}
      </div>
      {/*Statistics per Region*/}
      <StatisticsSummary className="statisticsSummary" />
      {/* For notifications about ORDER clicked and related NIS found in the grid*/}
      <div className="orderNotification">
        <div id="myorderNotification"></div>
      </div>
    </div>
    );
  }
}


export default Interruptions;
