import React from 'react';
import mymap from '../services/map-service';
import layers from '../services/layers-service';
import myinfotemplate from '../services/infotemplates-service';
import StatisticsToolbar from './StatisticsToolbar.jsx';
import SearchBar from './Searchbar.jsx';
import StatisticsSummary from './statistics-summary.jsx';
import GriddleGrid from './GriddleGrid-component.jsx';
import {saveResultsClass} from '../services/getInterruptionsByExtent';
class Interruptions extends React.Component {
  constructor(){
    super();
    this.state = {mydata: {}};
  }

  componentDidMount(){
    var map = mymap.createMap("map_div","topo",-71.2905 ,-33.1009,9);
    map.disableKeyboardNavigation();

    var interrClienteSED = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layerClieSED());
    interrClienteSED.setInfoTemplates({
      3: {infoTemplate: myinfotemplate.getNisInfo()},
      1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
      0: {infoTemplate: myinfotemplate.getSubFailure()}
    });

    interrClienteSED.refreshInterval = 1;
    map.addLayer(interrClienteSED);

    map.on('extent-change', ()=>{
    saveResultsClass(map.extent)

    //new Promise(saveResultsClass(map.extent)).then(v => this.setState({ mydata: v }));
      console.log(this.state.newProperty);
    });
  }

  render(){

    return (
    <div className="interruptions__wrapper">
      <div className="interruptions__header">
        {/*Search nis and orders with statistics button and table*/}
        <SearchBar />
        {/* StatisticsToolbar on top*/}
        <StatisticsToolbar />
      </div>
      {/* The map*/}
      <div className="map_div" id="map_div"></div>
      {/*Statistics per Region(qtty and percentual), office*/}
      <StatisticsSummary />
      {/*  <MyGrid /> */}
      <GriddleGrid/>
    </div>
    );
  }
}


export default Interruptions;
