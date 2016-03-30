import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';
import createQueryTask from '../services/createquerytask-service';
import {getStatisticsSummary} from '../services/getstatistics-summary';
import {getStatisticPerOffice} from '../services/getstatistics-summary';
import ReactTabs from 'react-tabs';

class StatisticsSummary extends React.Component {

  constructor(props){
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(index, last){
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
    if (index==0) {
      getStatisticsSummary();
    }else if (index==1) {
      getStatisticPerOffice();
    }
  }

  componentDidMount(){
    var foo = function(){
      //loads the summary component first tab (0) each 10s
      getStatisticsSummary();
      //loads the summary component second tab (1) each 10s
      getStatisticPerOffice();
      setTimeout(foo, 10000);
      console.log("updating chart");
    };

    foo = foo.bind(this);
    setTimeout(foo, 10000);
  }
  render(){
    var Tab = ReactTabs.Tab;
    var Tabs = ReactTabs.Tabs;
    var TabList = ReactTabs.TabList;
    var TabPanel = ReactTabs.TabPanel;

  return (
  <div className="wrapper_statistics-summary">
  <Tabs
        onSelect={this.handleSelect}
        selectedIndex={0}
      >
        <TabList>
          <Tab>Por comuna</Tab>
          <Tab>Por Oficina</Tab>
        </TabList>

        <TabPanel>
          <div id="container" className="statistics-summary__chart1"></div>
        </TabPanel>
        <TabPanel>
          <div id="container2" className="statistics-summary__chart1"></div>
        </TabPanel>
    </Tabs>

  </div>
  );
  }
}
export default StatisticsSummary;
