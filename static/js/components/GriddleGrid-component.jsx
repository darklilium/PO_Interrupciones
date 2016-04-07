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
  render(){
    return (
      <Griddle results={this.props.data}
               resultsPerPage={5}
               tableClassName="table"
               showFilter={true}
               showSettings={true}
               onRowClick={this.onRowClick}
               columns={["Tipo", "ID Orden", "ID Incidencia", "Estado", "Fecha creacion","Causa","Tiempo"]}/>
      );
  }
}
export default GriddleGrid;
