import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';
import Highcharts from 'highcharts';
import HighchartsExport from 'highcharts/modules/exporting'

function makeBarsGraphic(categories, data, divName, xTitle, seriesLabel){
  $("#"+divName).highcharts({
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Interrupciones por comuna'
      },
        xAxis: {
          categories: categories
      },
      yAxis: {
          min: 0,
          title: {
              text: xTitle,
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
          name: seriesLabel,
          data: data
      }]
    });
}

function getStatisticsSummary(){
  var getQtty = createQueryTask({
    url: layers.read_qtty_comuna(),
    whereClause: "1=1",
    returnGeometry: false
  });

  getQtty((map,featureSet)=>{
      var reg = featureSet.features.map((region)=>{
        return region.attributes.nm_comuna;
      });
      var qtty = featureSet.features.map((q)=>{
        return q.attributes.Cantidad;
      });
      makeBarsGraphic(reg, qtty, "container1", "Cantidad Clientes (u)", "Cant. Clientes")

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
      makeBarsGraphic(office, qtty, "container2", "Cant. Clientes (u)", "Cant. Clientes")

  },(errorQtty)=>{
    console.log("Error doing query for office quantity");

  });
}

function getStatisticsRegionPercent(){
  /*TO Do: obtain the last update for customers affected by any interruption in regions.
  and then calculate the percentaje */

  //Getting the last values by customers affected by interruptions in each region and the total amount of customers.
  var getQtty = createQueryTask({
    url: layers.read_qtty_comuna(),
    whereClause: "1=1",
    returnGeometry: false
  });

  getQtty((map,featureSet)=>{
    var region_qtty_now = featureSet.features.map((region)=>{
      let reg_qtty = {
        comuna: region.attributes.nm_comuna,
        cantidad: region.attributes.Cantidad
      }
      return reg_qtty;
    });
   //console.log(region_qtty_now, "cantidad de clientes afectados");
   getRegionTotal(region_qtty_now);
  },(errorQtty)=>{console.log("Error trying to get the qtty now for calculating region percent");});

}

function getRegionTotal(nowAffected){
  //Getting the total customers that lives in each region.
  var getRegionsTotalQtty = createQueryTask({
    url: layers.read_qtty_total_comuna(),
    whereClause: "1=1",
    returnGeometry: false
  });

  getRegionsTotalQtty((map,featureSet)=>{
      var region_qtty = featureSet.features.map((region)=>{
        let region_totalqtty = {
          comuna: region.attributes['nm_comuna'],
          cantidad: region.attributes['Total']
        };
        return region_totalqtty;
      });
      calculatePercentaje(region_qtty,nowAffected );
  },(errorQtty)=>{
    console.log("Error doing query for regions quantity");
  });
}

function calculatePercentaje(totalObj, affectedObj){

  /*Search if affected is in total objects*/
  var t = Array.from(totalObj);
  var a = Array.from(affectedObj);
  var r = [];
  var p = [];

  var afectados ={
      comunasAfectadas: a.map((res)=>{return res.comuna}),
      clientesAfectados: a.map((res)=>{return res.cantidad})
  };

  var totalClientesComuna = {
    comunas: t.map((res)=>{return res.comuna}),
    totalClientes: t.map((res)=>{return res.cantidad})
  };

  afectados['comunasAfectadas'].forEach((afectada, index)=>{
      var a = totalClientesComuna['comunas'].indexOf(afectada);
      r.push({
        comuna: totalClientesComuna['comunas'][a],
        totalClientes: totalClientesComuna['totalClientes'][a],
        clientesAfectados: afectados['clientesAfectados'][index],
        porcentajeAfectados: ((afectados['clientesAfectados'][index]*100)/totalClientesComuna['totalClientes'][a]).toFixed(1)
      });

  });

  var cat = r.map((res)=>{return res.comuna});
  var dat = r.map((res)=>{return parseFloat(res.porcentajeAfectados)});

  makeBarsGraphic(cat, dat, "container3", "% Clientes", "% Clientes")
}

export {getStatisticsSummary ,getStatisticPerOffice,getStatisticsRegionPercent};
