import React from 'react';
import mymap from '../services/map-service';
import layers from '../services/layers-service';
import myinfotemplate from '../services/infotemplates-service';
import StatisticsToolbar from './StatisticsToolbar.jsx';
import SearchBar from './Searchbar.jsx';
import StatisticsSummary from './statistics-summary.jsx';
import GriddleGrid from './GriddleGrid-component.jsx';
import {getClieInterruptionsByExtent} from '../services/getInterruptionsByExtent';
import {getSEDByExtent} from '../services/getInterruptionsByExtent';

class Interruptions extends React.Component {
  constructor(){
    super();
    this.state = {
      mydatanis:[{
        'Tipo' : 0 ,
        'ID Orden': 0,
        'ID Incidencia': 0,
        'Estado':0,
        'Fecha creacion': 0 ,
        'Causa': 0,
        'Tiempo': 0,
        'Geometry': 0
      }],
      mydatased:[{
        'Tipo' : 0 ,
        'ID Orden': 0,
        'ID Incidencia': 0,
        'Estado':0,
        'Fecha creacion': 0 ,
        'Causa': 0,
        'Tiempo': 0,
        'Geometry': 0,
      }]
    };
  }

  componentDidMount(){
    var map = mymap.createMap("map_div","topo",-71.2905 ,-33.1009,9);
    map.disableKeyboardNavigation();

    var interrClienteSED = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layerClieSED());
    interrClienteSED.setInfoTemplates({
      3: {infoTemplate: myinfotemplate.getNisInfo()},
      1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
      0: {infoTemplate: myinfotemplate.getSubFailure()}
    });

    interrClienteSED.refreshInterval = 1;
    map.addLayer(interrClienteSED);

    map.on('extent-change', ()=>{

      getClieInterruptionsByExtent((map.extent), (myresultsNis)=>{
        let nisresults = myresultsNis.map((result)=>{
          let mynewNis = {
            'Tipo': 'Cliente',
            'ID Orden': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.id_orden'],
            'ID Incidencia': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.id_incidencia'],
            'Estado': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.estado_orden'],
            'Fecha creacion': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_creacion'],
            'Causa': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.causa'],
            'Tiempo': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.TIEMPO_TRA'],
            'Geometry': result.geometry
          }
          return mynewNis;
        });
        this.setState({mydatanis:nisresults});
      });

      getSEDByExtent((map.extent), (myresultsSed)=>{
          let sedresults = myresultsSed.map((result)=>{
          let mynewSed = {
            'Tipo': 'SED',
            'ID Orden': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.id_orden'],
            'ID Incidencia': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.id_incidencia'],
            'Estado': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.estado_orden'],
            'Fecha creacion': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_creacion'],
            'Causa': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.causa'],
            'Tiempo': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.TIEMPO_TRA'],
            'Geometry': result.geometry
          }
          return mynewSed;
        });
        this.setState({mydatased:sedresults});
      });
    });
  }

  render(){

    return (
    <div className="interruptions__wrapper">
    <div className="interruptions__symbology"><img className="interruptions__symbology-img" src="images/widget_icons/symbology.png"/></div>
  
      <div className="interruptions__header">
        {/*Search nis and orders with statistics button and table*/}
        <SearchBar />
        {/* StatisticsToolbar on top*/}
        <StatisticsToolbar />
      </div>
      {/* The map*/}
      <div className="map_div" id="map_div"></div>
      {/*Statistics per Region(qtty and percentual), office*/}
        <StatisticsSummary />
      {/*  <MyGrid /> */}
      <GriddleGrid data={[...this.state.mydatased,...this.state.mydatanis]}/>
    </div>
    );
  }
}

export default Interruptions;
