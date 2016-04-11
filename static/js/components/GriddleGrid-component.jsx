import React from 'react';
import Griddle from 'griddle-react';
import getInterruptionsByExtent from '../services/getInterruptionsByExtent-service';
import mymap from '../services/map-service';
import makeSymbol from '../utils/makeSymbol';
import {makeInfoWindowPerGridInfo} from '../utils/makeInfowindow';

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
    console.log(gridRow.props.data);
    makeInfoWindowPerGridInfo(gridRow.props.data['Tipo'],
                              gridRow.props.data['ID Orden'],
                              gridRow.props.data['ID Incidencia'],
                              gridRow.props.data['Causa'],
                              gridRow.props.data['Comentario'],
                              gridRow.props.data['Estado'],
                              gridRow.props.data['Fecha Creacion'],
                              gridRow.props.data['Fecha Asignacion'],
                              gridRow.props.data['Fecha Despacho'],
                              gridRow.props.data['Fecha Ruta'],
                              gridRow.props.data['Fecha Llegada'],
                              gridRow.props.data['Tiempo'],
                              gridRow.props.data['Geometry']
                              );
  }

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
                      "Tiempo"]}/>
      );
  }
}
export default GriddleGrid;
