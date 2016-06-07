import {getFormatedDateNow} from './milliSecondsToDate';
function exportGraphicsToPDF(chartTitles, charts){
  //console.log(charts.chart1.chartData);

  var doc = new jsPDF('portrait', 'pt');
  doc.text("Reporte Estadísticas Interrupciones", 10, 30);
  doc.text("Fecha:" + getFormatedDateNow() , 10, 55);

  doc.text(chartTitles.chart1, 10, doc.autoTableEndPosY() + 90);
  doc.autoTable(charts.chart1.chartColumns,charts.chart1.chartData,{
      startY: 100,
      margin: {horizontal: 10},
        styles: {overflow: 'linebreak'},
      columnStyles: {text: {columnWidth: 250}}
  });

  doc.text(chartTitles.chart2, 10, doc.autoTableEndPosY() + 30);
  doc.autoTable(charts.chart2.chartColumns, charts.chart2.chartData, {
      startY: doc.autoTableEndPosY() + 45,
      margin: {horizontal: 10},
      styles: {overflow: 'linebreak'},
      columnStyles: {'CANTIDAD CLIENTES': {columnWidth: 160}}
  });

  doc.text(chartTitles.chart3, 10, doc.autoTableEndPosY() + 30);
  doc.autoTable(charts.chart3.chartColumns, charts.chart3.chartData, {
      startY: doc.autoTableEndPosY() + 45,
      margin: {horizontal: 10},
      styles: {overflow: 'linebreak'},
      columnStyles: {'PORCENTAJE CLIENTES': {columnWidth: 160}}
  });
  doc.save("Reporte_Interrupciones.pdf");
}

export default exportGraphicsToPDF;
