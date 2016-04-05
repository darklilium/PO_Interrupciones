import React from 'react';
import mymap from '../services/map-service';
import layers from '../services/layers-service';
import StatisticsToolbar from './StatisticsToolbar.jsx';
import SearchBar from './Searchbar.jsx'
import myinfotemplate from '../services/infotemplates-service';
import {getInterruptionsByExtent} from '../services/getInterruptionsByExtent';

class Interruptions extends React.Component {
  constructor(){
    super();
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
    </div>
    );
  }
}


export default Interruptions;
