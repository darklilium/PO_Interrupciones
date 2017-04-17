import React from 'react';
import mymap from '../services/map-service';
import {addCertainLayer} from '../services/layers-service';
import formatDate from '../utils/milliSecondsToDate';
import StatisticsToolbar from './StatisticsToolbar.jsx';
import SearchBar from './Searchbar.jsx';
import StatisticsSummary from './Statistics-summary.jsx';
import GriddleGrid from './GriddleGrid-component.jsx';
import {getClieInterruptionsByExtent} from '../services/getInterruptionsByExtent-service';
import {getSEDByExtent} from '../services/getInterruptionsByExtent-service';
import token from '../services/token-service';
import LayerList from './LayerList.jsx';


function createDataObject(){
  return {
    'Tipo' : 0 ,
    'ID Orden': 0,
    'ID Incidencia': 0,
    'Estado':0,
    'Fecha creacion': 0 ,
    'Causa': 0,
    'Comentario': 0,
    'Tiempo': 0,
    'ETR': 0,
    'Alimentador': 0,
    'Comuna' : 0,
    'Cantidad': 0,
    'Geometry': 0
  };
}

class Interruptions extends React.Component {

  componentWillMount(){
    console.log("Renderizing Interruptions component...");
    if (!localStorage.getItem('token')){
        window.location.href = "index.html";
        return;
    }

    // if you are going to use the same object to represent both values
    // use a factory function to create both objects

    this.state = {
      mydatanis:[createDataObject()],
      mydatased:[createDataObject()]
    };
  }
  componentDidMount(){
    var map = mymap.createMap("map_div","topo",-71.2905 ,-33.1009,9);
    map.disableKeyboardNavigation();

    addCertainLayer('po_interrupciones',9,"");

    map.on('extent-change', ()=>{

      getClieInterruptionsByExtent((map.extent), (myresultsNis)=>{
        //console.log("CLIENTES", myresultsNis);
        let nisresults = myresultsNis.map((result)=>{

          let mynewNis = {
            'Tipo': 'DOM',
            'ID Orden': result.attributes['ARCGIS.dbo.view_tiempo_order_po.id_orden'],
            'ID Incidencia': result.attributes['ARCGIS.dbo.view_tiempo_order_po.id_incidencia'],
            'Estado': result.attributes['ARCGIS.dbo.view_tiempo_order_po.estado_orden'],
            'Fecha Creacion': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_creacion']),
            'Fecha Asignacion': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_asignacion']),
            'Fecha Despacho': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_despacho']),
            'Fecha Ruta': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_ruta']),
            'Fecha Llegada': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_llegada']),
            'Causa': result.attributes['ARCGIS.dbo.view_tiempo_order_po.causa'],
            'Comentario': result.attributes['ARCGIS.dbo.view_tiempo_order_po.comentario'],
            'Tiempo': result.attributes['ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA'],
            'ETR': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.etr']),
            'Alimentador': 'Por definir',
            'Comuna' : 'Por definir',
            'Cantidad': 1,
            'Geometry': result.geometry
          }

          return mynewNis;
        });
        this.setState({mydatanis:nisresults});
      });

      getSEDByExtent((map.extent), (myresultsSed)=>{
          //console.log("SED", myresultsSed);
          let sedresults = myresultsSed.map((result)=>{

          let mynewSed = {
            'Tipo': 'RED',
            'ID Orden': result.attributes['ARCGIS.dbo.view_tiempo_order_po.id_orden'],
            'ID Incidencia': result.attributes['ARCGIS.dbo.view_tiempo_order_po.id_incidencia'],
            'Estado': result.attributes['ARCGIS.dbo.view_tiempo_order_po.estado_orden'],
            'Fecha Creacion': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_creacion']),
            'Fecha Asignacion': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_asignacion']),
            'Fecha Despacho': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_despacho']),
            'Fecha Ruta': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_ruta']),
            'Fecha Llegada': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.fecha_llegada']),
            'Causa': result.attributes['ARCGIS.dbo.view_tiempo_order_po.causa'],
            'Comentario': result.attributes['ARCGIS.dbo.view_tiempo_order_po.comentario'],
            'Tiempo': result.attributes['ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA'],
            'ETR': formatDate(result.attributes['ARCGIS.dbo.view_tiempo_order_po.etr']),
            'Alimentador': result.attributes['ARCGIS.DBO.SED_006.alimentador'],
            'Comuna' : result.attributes['ARCGIS.DBO.SED_006.comuna'],
            'Cantidad' : 'Por definir',
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
    <div className="interruptions__symbology"><img className="interruptions__symbology-img"/></div>
      <div className="interruptions__header">
        {/*Search nis and orders with statistics button and table*/}
        <SearchBar data ={[...this.state.mydatased,...this.state.mydatanis]} />
        {/* StatisticsToolbar on top*/}
        <StatisticsToolbar />
      </div>
      {/* Layer List */}
      <LayerList show={["check_alimentador","check_SSEE"]}/>
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
