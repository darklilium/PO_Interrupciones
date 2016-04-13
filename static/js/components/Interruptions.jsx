import React from 'react';
import mymap from '../services/map-service';
import {addMapsAndLayers} from '../services/map-service';
import formatDate from '../utils/milliSecondsToDate';
import StatisticsToolbar from './StatisticsToolbar.jsx';
import SearchBar from './Searchbar.jsx';
import StatisticsSummary from './Statistics-summary.jsx';
import GriddleGrid from './GriddleGrid-component.jsx';
import {getClieInterruptionsByExtent} from '../services/getInterruptionsByExtent-service';
import {getSEDByExtent} from '../services/getInterruptionsByExtent-service';

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
        'Comentario': 0,
        'Tiempo': 0,
        'ETR': 0,
        'Geometry': 0
      }],
      mydatased:[{
        'Tipo' : 0 ,
        'ID Orden': 0,
        'ID Incidencia': 0,
        'Estado':0,
        'Fecha creacion': 0 ,
        'Causa': 0,
        'Comentario': 0,
        'Tiempo': 0,
        'ETR': 0,
        'Geometry': 0,
      }]
    };
  }

  componentDidMount(){

    var mapp = mymap.createMap("map_div","topo",-71.2905 ,-33.1009,9);
    mapp.disableKeyboardNavigation();
    //Put the locate button here.
    var locateButton = new esri.dijit.LocateButton({
      map: mapp
    }, "LocateButton");


    addMapsAndLayers((callback)=>{console.log(callback);});

    mapp.on('extent-change', ()=>{

      getClieInterruptionsByExtent((map.extent), (myresultsNis)=>{
        let nisresults = myresultsNis.map((result)=>{

          let mynewNis = {
            'Tipo': 'Cliente',
            'ID Orden': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.id_orden'],
            'ID Incidencia': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.id_incidencia'],
            'Estado': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.estado_orden'],
            'Fecha Creacion': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_creacion']),
            'Fecha Asignacion': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_asignacion']),
            'Fecha Despacho': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_despacho']),
            'Fecha Ruta': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_ruta']),
            'Fecha Llegada': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_llegada']),
            'Causa': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.causa'],
            'Comentario': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.comentario'],
            'Tiempo': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.TIEMPO_TRA'],
            'ETR': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.etr'],
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
            'Fecha Creacion': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_creacion']),
            'Fecha Asignacion': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_asignacion']),
            'Fecha Despacho': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_despacho']),
            'Fecha Ruta': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_ruta']),
            'Fecha Llegada': formatDate(result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.fecha_llegada']),
            'Causa': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.causa'],
            'Comentario': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.comentario'],
            'Tiempo': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.TIEMPO_TRA'],
            'ETR': result.attributes['ARCGIS.DBO.%view_tiempo_order_po_3.etr'],
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
        <SearchBar data ={[...this.state.mydatased,...this.state.mydatanis]} />
        {/* StatisticsToolbar on top*/}
        <StatisticsToolbar />
      </div>
      {/* The map*/}
      <div className="map_div" id="map_div">
        <div id="LocateButton"></div>
      </div>
      {/*Statistics per Region(qtty and percentual), office*/}
        <StatisticsSummary />
      {/*  <MyGrid /> */}
      <GriddleGrid data={[...this.state.mydatased,...this.state.mydatanis]}/>
    </div>
    );
  }
}

export default Interruptions;
