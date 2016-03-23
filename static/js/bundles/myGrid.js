import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import exportToExcel from '../services/exportToExcel';
import nisLocation from '../services/nis-location-service';
import relatedNISperSED from '../services/nis-location-service';
import mymap from '../services/map-service';
import createQueryTask from '../services/createquerytask-service';

function translator(interruption){
  var attr = interruption.attributes;

  var r = {
    id_orden: attr['id_orden'],
    tipo_orden: attr['tipo_orden'],
    estado_orden: attr['estado_orden'],
    fecha_creacion: new Date(attr['fecha_creacion']).toLocaleDateString(),
    fecha_asignacion: new Date(attr['fecha_asignacion']).toLocaleDateString(),
    fecha_despacho: new Date(attr['fecha_despacho']).toLocaleDateString(),
    fecha_ruta: new Date(attr['fecha_ruta']).toLocaleDateString(),
    fecha_llegada: new Date(attr['fecha_llegada']).toLocaleDateString(),
    id_incidencia: attr['id_incidencia'],
    causa: attr['causa'],
    subcausa: attr['subcausa'],
    comentario: attr['comentario'],
    tipo_equipo: attr['tipo_equipo'],
    fc_termino_t : new Date(attr['fc_termino_t']).toLocaleDateString(),
    fc_cierre: new Date(attr['fc_cierre']).toLocaleDateString(),
    fc_ult_modif: new Date(attr['fc_ult_modif']).toLocaleDateString(),
    id_owned: attr['id_owned']
  };

  return r;
}

function isTermInRow(obj, searchTerm){
  var coincidence = false;
  var translatedObject = translator(obj);

  [ "id_orden", "tipo_orden", "estado_orden",
    "fecha_creacion", "fecha_asignacion", "fecha_despacho",
    "fecha_ruta", "fecha_llegada", "id_incidencia",
    "causa", "subcausa", "comentario",
    "tipo_equipo","fc_termino_t","fc_cierre","fc_ult_modif","id_owned"
  ].forEach(function(field){
    var str = String(translatedObject[field]);
    if(str.indexOf(searchTerm) > -1){
      coincidence = true;
    }
  });

  return coincidence;
}

//for datagrid
class InterruptionRow extends React.Component {
  constructor(props){
    super(props);
    this.onClickRow = this.onClickRow.bind(this);
  }

  onClickRow(){
    $(".mytable-searchBox__relatedNIS").css("visibility","hidden");
    nisLocation(this.props.id_orden, this.props.id_incidencia);
  }

  render(){

    return (
      <tr className={this.props.styleClass} onClick={this.onClickRow}>
        <td>{this.props.id_orden}</td>
        <td>{this.props.tipo_orden}</td>
        <td>{this.props.estado_orden}</td>
        <td>{this.props.fecha_creacion}</td>
        <td>{this.props.fecha_asignacion}</td>
        <td>{this.props.fecha_despacho}</td>
        <td>{this.props.fecha_ruta}</td>
        <td>{this.props.fecha_llegada}</td>
        <td className="td_width">{this.props.id_incidencia}</td>
        <td>{this.props.causa}</td>
        <td>{this.props.subcausa}</td>
        <td>{this.props.comentario}</td>
        <td>{this.props.tipo_equipo}</td>
        <td>{this.props.fc_termino_t}</td>
        <td>{this.props.fc_cierre}</td>
        <td>{this.props.fc_ult_modif}</td>
        <td>{this.props.id_owned }</td>
      </tr>
    );
  }
}

class MyGrid extends React.Component{
  constructor(props){
    super(props);

    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickExport = this.onClickExport.bind(this);
    this.onClickClearSearch = this.onClickClearSearch.bind(this);
    this.onClickRelated = this.onClickRelated.bind(this);
    this.paginateElements = this.paginateElements.bind(this);
    this.currentInterruptions();
    this.state = {
      interruptions: [],
      interruptionsTemp: [],
      index: 0
    };
  }

  paginateElements(num){
    this.setState({ index : num });
  }

  //after component is rendered
  componentDidMount(){
    var foo = function(){
      this.currentInterruptions();
      setTimeout(foo, 8000);
    };

    foo = foo.bind(this);
    setTimeout(foo, 8000);
  }

  currentInterruptions(){
    console.log("Getting the results from current interruptions...");
      var serviceCurr = createQueryTask({
        url: layers.read_layer_poOrdenes(),
        whereClause: "1=1",
        returnGeometry: true
      });

      serviceCurr((map,featureSet)=>{
          var results = featureSet.features.map(fs => ({ ...fs }) );
          this.setState({ interruptions: results , interruptionsTemp: results});
      },(errorCurrMass)=>{
          console.log("Error at getting the results from current interruptions");

      });
  }

  onClickSearch(){
    var searchValue = this.refs.searchvalue.value;
    var updateList = this.state.interruptionsTemp;

    var myFilteredList = updateList.filter(x => {
      return isTermInRow(x, searchValue);
    });

    this.setState({ interruptions: myFilteredList });
  }

  onClickExport(){
    var data = this.state.interruptions;
    var exportResults = data.map(data => translator(data));

    var d = new Date();
    var str = "day/month/year, hour:minute:second"
      .replace('day', d.getDate())
      .replace('month', d.getMonth() + 1)
      .replace('year', d.getFullYear())
      .replace('hour', d.getHours())
      .replace('minute', d.getMinutes())
      .replace('second', d.getSeconds());

    exportToExcel(exportResults, "Interrupciones " + str, true);
  }

  onClickClearSearch(){
    console.log("clearing search");
    this.currentInterruptions();
    txtBusqueda.value = "";
  }

  onClickRelated(){
      //show a list for related nis
  }

  render(){
    let interruptions = this.state.interruptions.map((interruption, index) => {
      let ceil = Math.floor(index / 5);
      let className = (ceil == this.state.index) ? '' : 'u-hidden';
      let data = translator(interruption);
      return <InterruptionRow key={"inte"+ index} styleClass={className} {...data} />;
    });

    let pages = Math.floor(interruptions.length / 5);

    return (
    <div className="mytable-Wrapper">
      <div className="mytable-searchBox">
        <h3 className="mytable-searchBox__title">Interrupciones: Ordenes</h3>
        {/* Search for filter */}
        <input id="txtBusqueda" className="mytable-searchBox__input" ref="searchvalue" type="text" placeholder="Busque para cualquier columna" />
        {/* Button for searching */}
        <button type="button" className="mytable-searchBox__submit btn btn-default" onClick={this.onClickSearch}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span></button>
        {/* Button for export to excel */}
        <button type="button" className="mytable-searchBox__submit btn btn-default" onClick={this.onClickExport}>
            <span className="searchBox_icon"><i className="fa fa-file-excel-o"></i></span></button>
        {/* Button for clear search values*/}
        <button type="button" className="mytable-searchBox__clear btn btn-default" onClick={this.onClickClearSearch}>
            <span className="searchBox_icon"><i className="fa fa-eraser"></i></span></button>
        {/* Button for see related nis asociated to the SED*/}
        <button type="button" className="mytable-searchBox__relatedNIS btn btn-default" onClick={this.onClickRelated}>
            <span className="searchBox_icon"><i className="fa fa-users"></i></span> Ver Resultados Relacionados</button>

      </div>
      <hr className="mytable_searchBox__hr"></hr>
      {/*Table*/}
      <table className="mytable-Wrapper__table table table-bordered" >
            <thead className="mytable-Wrapper__table-tr">
              <tr>
                <th>ID ORDEN</th>
                <th>TIPO</th>
                <th>ESTADO</th>
                <th>FECHA CREA</th>
                <th>FECHA ASIG</th>
                <th>FECHA DESP</th>
                <th>FECHA RUTA</th>
                <th>FECHA LLEGADA</th>
                <th>ID INDICENCIA</th>
                <th>CAUSA</th>
                <th>SUB CAUSA</th>
                <th>COMENTARIO</th>
                <th>TIPO EQUIPO</th>
                <th>FECHA TERM</th>
                <th>FECHA CIERRE</th>
                <th>FECHA ULT MODIF</th>
                <th>ID OWNED</th>
              </tr>
            </thead>
            <tbody>
              {interruptions}
            </tbody>
        </table>
        <Paginator pages={pages} clickHandler={this.paginateElements} />
    </div>
    );
  }
}

class Paginator extends React.Component {
  moveNextPage(i){
    var that = this;
    return function(){
      that.props.clickHandler(i);
    };
  }

  render(){
    var pages = [];

    var styles = {
      padding: "0.5em",
      border: "1px solid black",
      cursor: "pointer"
    };

    for(let i = 0; i < this.props.pages; i++){
      pages.push(<span style={styles} onClick={this.moveNextPage(i)}>{i + 1}</span>);
    }

    return <div>{pages}</div>;
  }
}

export default MyGrid;
