import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';
import createQueryTask from '../services/createquerytask-service';
import Highcharts from 'highcharts';
import HighchartsExport from 'highcharts/modules/exporting'

class StatisticsSummary extends React.Component {

  constructor(props){
  super(props);
  console.log(this.props.summaryArray);
  }
  componentDidMount(){
    var comunas = this.props.summaryArray.map( (comuna)=> {
      return comuna;
    });
    console.log(comunas);
    //console.log(this.props.comunasArray);
      $('#container').highcharts({
          chart: {
              type: 'bar'
          },
          title: {
              text: 'Interrupciones por comuna'
          },

          xAxis: {
              categories: this.props.summaryArray
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Population (millions)',
                  align: 'high'
              },
              labels: {
                  overflow: 'justify'
              }
          },
          tooltip: {
              valueSuffix: ' millions'
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -40,
              y: 80,
              floating: true,
              borderWidth: 1,
              backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
              shadow: true
          },
          credits: {
              enabled: false
          },
          series: [{
              name: 'Year 1800',
              data: [107, 31, 635, 203, 2]
          }, {
              name: 'Year 1900',
              data: [133, 156, 947, 408, 6]
          }, {
              name: 'Year 2012',
              data: [1052, 954, 4250, 740, 38]
          }]
      });
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
