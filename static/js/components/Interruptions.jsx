import React from 'react';
import mymap from '../services/map-service';
import layers from '../services/layers-service';
import myinfotemplate from '../services/infotemplates-service';
import StatisticsToolbar from './StatisticsToolbar.jsx';
import MyGrid from './MyGrid.jsx';
import StatisticsSummary from './statistics-summary.jsx';
import SearchBar from './Searchbar.jsx'
class Interruptions extends React.Component {
  constructor(){
    super();


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

    interrClienteSED.refreshInterval = 1;
    map.addLayer(interrClienteSED);
  }

  render(){

    return (
    <div className="interruptions_wrapper">
      {/*Search nis and orders with statistics button and table*/}
      <SearchBar />
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
