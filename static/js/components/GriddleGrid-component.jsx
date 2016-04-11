import React from 'react';
import Griddle from 'griddle-react';
import getInterruptionsByExtent from '../services/getInterruptionsByExtent';
import mymap from '../services/map-service';
import makeSymbol from '../services/makeSymbol-service';

class GriddleGrid extends React.Component{
  constructor(props){
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
  }
  componentDidMount(){

  }
  onRowClick(gridRow, event){
    var map = mymap.getMap();
    map.graphics.clear();
    console.log(gridRow.props.data);
    let pointSymbol = makeSymbol.makePoint();
    map.graphics.add(new esri.Graphic(gridRow.props.data['Geometry'],pointSymbol));
    map.centerAndZoom(gridRow.props.data['Geometry'],15);
  }
  /*  'Fecha Creación': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_creacion']),
    'Fecha Asignación': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_asignacion']),
    'Fecha Despacho': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_despacho']),
    'Fecha Ruta': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_ruta']),
    'Fecha Llegada': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_llegada']),*/
  render(){
    return (
      <Griddle results={this.props.data}
               resultsPerPage={4}
               tableClassName="table"
               showFilter={true}
               showSettings={false}
               onRowClick={this.onRowClick}
               columns={["Tipo",
                      "ID Orden",
                      "ID Incidencia",
                      "Estado",
                      "Fecha Creacion",
                      "Fecha Asignacion",
                      "Fecha Despacho",
                      "Fecha Ruta",
                      "Fecha Llegada",
                      "Causa",
                      "Tiempo"]}/>
      );
  }
}
export default GriddleGrid;
