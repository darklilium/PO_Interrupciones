import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';
import {getStatisticsSummary} from '../services/getstatistics-summary';
import {getStatisticPerOffice} from '../services/getstatistics-summary';
import {getStatisticsRegionPercent} from '../services/getstatistics-summary';

import ReactTabs from 'react-tabs';

class StatisticsSummary extends React.Component {

  constructor(props){
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(index, last){
    //console.log('Selected tab: ' + index + ', Last tab: ' + last);
    if (index==0) {
      getStatisticsSummary();
    }else if (index==1) {
      getStatisticPerOffice();
    }else if (index==2) {
      getStatisticsRegionPercent();
    }else {
      //getStatisticsOfficePercent();
      //console.log("related to possible number 4 tab");
    }
  }

  componentDidMount(){
    var foo = function(){
      //loads the summary component first tab (0) each 10s
      getStatisticsSummary();
      //loads the summary component second tab (1) each 10s
      getStatisticPerOffice();
      //loads the summary percent by region on the 3r tab
        getStatisticsRegionPercent();
      //loads the summary percent by office on the 4th tab
        //getStatisticsOfficePercent();
      setTimeout(foo, 60000);
      console.log("updating chart");
    };

    foo = foo.bind(this);
    setTimeout(foo, 60000);
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
        <TabList className="statistics-tablist">
          <Tab>Por comuna</Tab>
          <Tab>Por Oficina</Tab>
          <Tab>% por comuna</Tab>
        </TabList>

        <TabPanel>
          <div id="container1" className="statistics-summary__chart"></div>
        </TabPanel>
        <TabPanel>
          <div id="container2" className="statistics-summary__chart"></div>
        </TabPanel>
        <TabPanel>
          <div id="container3" className="statistics-summary__chart"></div>
        </TabPanel>
  </Tabs>

  </div>
  );
  }
}
export default StatisticsSummary;
