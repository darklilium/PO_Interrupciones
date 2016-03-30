import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';
import Highcharts from 'highcharts';
import HighchartsExport from 'highcharts/modules/exporting'

function getStatisticsSummary(){
  var reg=[]
  var qtty=[];

  var getQtty = createQueryTask({
    url: layers.read_qtty_comuna(),
    whereClause: "1=1",
    returnGeometry: false
  });

  getQtty((map,featureSet)=>{
      reg = featureSet.features.map((region)=>{
        return region.attributes.nm_comuna;
      });
      qtty = featureSet.features.map((q)=>{
        return q.attributes.Cantidad;
      });

      $('#container').highcharts({
          chart: {
              type: 'bar'
          },
          title: {
              text: 'Interrupciones por comuna'
          },
            xAxis: {
              categories: reg
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Cant. Clientes (u)',
                  align: 'high'
              },
              labels: {
                  overflow: 'justify'
              }
          },
          tooltip: {
              valueSuffix: ' '
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          /*legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -40,
              y: 80,
              floating: true,
              borderWidth: 1,
              backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
              shadow: true
          },*/
          credits: {
              enabled: false
          },
          series: [{
              name: 'Cant. Clientes',
              data: qtty
          }]
        });


  },(errorQtty)=>{
    console.log("Error doing query for regions quantity");
  });


}

function getStatisticPerOffice(){
  var office=[]
  var qtty=[];

  var getoffice = createQueryTask({
    url: layers.read_qtty_office(),
    whereClause: "1=1",
    returnGeometry: false
  });

  getoffice((map,featureSet)=>{
      office = featureSet.features.map((region)=>{
        return region.attributes.oficina;
      });
      qtty = featureSet.features.map((q)=>{
        return q.attributes.Cantidad;
      });

      $('#container2').highcharts({
          chart: {
              type: 'bar'
          },
          title: {
              text: 'Interrupciones por Oficina'
          },
            xAxis: {
              categories: office
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Cant. Clientes (u)',
                  align: 'high'
              },
              labels: {
                  overflow: 'justify'
              }
          },
          tooltip: {
              valueSuffix: ' '
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          /*legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -40,
              y: 80,
              floating: true,
              borderWidth: 1,
              backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
              shadow: true
          },*/
          credits: {
              enabled: false
          },
          series: [{
              name: 'Cant. Clientes',
              data: qtty
          }]
        });


  },(errorQtty)=>{
    console.log("Error doing query for office quantity");

  });

}

export {getStatisticsSummary ,getStatisticPerOffice};
