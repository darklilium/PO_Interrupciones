import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';
import {getStatisticsSummary} from '../services/getstatistics-summary-service';
import {getStatisticPerOffice} from '../services/getstatistics-summary-service';
import {getStatisticsRegionPercent} from '../services/getstatistics-summary-service';
import ReactTabs from 'react-tabs';
import formatDate from '../utils/milliSecondsToDate';
import {exportToExcel} from '../utils/exportToExcel';

import exportGraphicsToPDF from '../utils/exportToPDF';

class StatisticsSummary extends React.Component {

  constructor(props){
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.onClickExport = this.onClickExport.bind(this);
    this.state = {
      tabWatcher: 0,
      selectedTab: 0
    };
    //to make sure the data to export.
    getStatisticsSummary();
    getStatisticPerOffice();
    getStatisticsRegionPercent();
  }

  handleSelect(index, last){
    this.setState({selectedTab: index});

    if (index==0) {
      getStatisticsSummary();
    }else if (index==1) {
      getStatisticPerOffice();
    }else {
      getStatisticsRegionPercent();
    }
  }

  onClickExport(e){
    exportGraphicsToPDF();
  }

  componentDidMount(){
    var foo = function(){
      //loads the summary component first tab (0) each 1min
      getStatisticsSummary();
      //loads the summary component second tab (1) each 1min
      getStatisticPerOffice();
      //loads the summary percent by region third (2) tab each 1min
      getStatisticsRegionPercent();

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
          selectedIndex={this.state.selectedTab}
        >
          <TabList className="statistics-tablist">
            <Tab>Por comuna</Tab>
            <Tab>Por Oficina</Tab>
            <Tab>% por comuna</Tab>
          </TabList>

          <TabPanel>
            <div id="container1" className="statistics-summary__chart"></div>
            <button className="statistics-export-btn btn btn-default" title="Exportar Datos" type="button"  onClick={this.onClickExport}>
                <span><i className="fa fa-download"></i></span>
            </button>
          </TabPanel>
          <TabPanel>
            <div id="container2" className="statistics-summary__chart"></div>
            <button className="statistics-export-btn btn btn-default" title="Exportar Datos" type="button"  onClick={this.onClickExport}>
                <span><i className="fa fa-download"></i></span>
            </button>
          </TabPanel>
          <TabPanel>
            <div id="container3" className="statistics-summary__chart"></div>
            <button className="statistics-export-btn btn btn-default" title="Exportar Datos" type="button"  onClick={this.onClickExport}>
                <span><i className="fa fa-download"></i></span>
            </button>
          </TabPanel>
    </Tabs>
    </div>

  );
  }
}
export default StatisticsSummary;
