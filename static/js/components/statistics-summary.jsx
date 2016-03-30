import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';
import createQueryTask from '../services/createquerytask-service';

import getStatisticsSummary from '../services/getstatistics-summary';

class StatisticsSummary extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    var foo = function(){
      getStatisticsSummary();
      setTimeout(foo, 60000);
    };

    foo = foo.bind(this);
    setTimeout(foo, 60000);
  }
  render(){
  return (
  <div className="wrapper_statistics-summary">
    <div id="container" className="statistics-summary__chart1"></div>
  </div>
  );
  }
}
export default StatisticsSummary;
