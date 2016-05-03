import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';
import Highcharts from 'highcharts';
import highcharts from 'highcharts/modules/exporting';


var graphicResults = {
  setResultsGraphic1: function(regions,domi,red){
    this.graphicResults = [regions,domi,red];
    return this.graphicResults;

  },
  getResultsGraphic: function(){
    return this.graphicResults;
  }
};

var graphicResults2 = {
  setResultsGraphic2: function(office,qtty){
    this.graphicResults2 = [office,qtty];
    return this.graphicResults2;
  },
  getResultsGraphic2: function(){
    return this.graphicResults2;
  }
}

var graphicResults3 = {
  setResultsGraphic3: function(categories,data){
    this.graphicResults3 = [categories,data];
    return this.graphicResults3;
  },
  getResultsGraphic3: function(){
    return this.graphicResults3;
  }
}

function makeStackedGraphic(categories, dataDOM, dataRED, divName, xTitle, textTitle){
  Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'arial'
        }
    }
  });
  $("#"+divName).highcharts({
    chart: {
            type: 'bar'
        },
        title: {
            text: textTitle
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: xTitle,
                align: 'high',
            },
            labels: {
                overflow: 'justify'
            },
            stackLabels: {

                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color:'black'
                }
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'DOM',
            data: dataRED
        }, {
            name: 'RED',
            data: dataDOM
        }]
    });
}

function makeBarsGraphic(categories, data, divName, xTitle, seriesLabel, textTitle){
  Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'arial'
        }
    }
  });
  $("#"+divName).highcharts({
      chart: {
          type: 'bar'
      },
      title: {
          text: textTitle,
          fontSize: '9px'
      },
      xAxis: {
          categories: categories,
          labels: {
                style: {
                    fontSize:'9px'
                }
            }
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
      }],
      exporting: {
          enabled: true
      }
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
      var qttyDOM = featureSet.features.map((q)=>{
        return q.attributes.DOM;
      });
      var qttyRED = featureSet.features.map((q)=>{
        return q.attributes.RED;
      });
      //makeBarsGraphic(reg, qtty, "container1", "Cant. Clientes (u)", "Cant. Clientes", "Interrupciones por comuna.")
        makeStackedGraphic(reg, qttyRED, qttyDOM, "container1", "Cant. Clientes (u)", "Interrupciones por comuna.");
        var sav = graphicResults.setResultsGraphic1(reg,qttyDOM,qttyRED);

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
      makeBarsGraphic(office, qtty, "container2", "Cant. Clientes (u)", "Cant. Clientes", "Interrupciones por oficina.");
      let sav = graphicResults2.setResultsGraphic2(office,qtty);

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
        cantidad: region.attributes.DOM + region.attributes.RED
      }
      return reg_qtty;
    });

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

  let sav = graphicResults3.setResultsGraphic3(cat, dat);
  makeBarsGraphic(cat, dat, "container3", "% Clientes", "% Clientes", "Interrupciones por comuna.")
}

export {getStatisticsSummary ,getStatisticPerOffice,getStatisticsRegionPercent, graphicResults, graphicResults2, graphicResults3};
