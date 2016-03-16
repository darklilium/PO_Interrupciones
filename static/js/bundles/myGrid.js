import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';

var results = [];
function translator(employee){
//  console.log(employee);
  var attr = employee.attributes;
  //console.log(attr);

  var r = {
    nis: attr['ARCGIS.DBO.CLIENTES_XY_006.nis'],
    orden: attr['ARCGIS.dbo.POWERON_CLIENTES.id_orden'],
    idIncidencia: attr['ARCGIS.dbo.POWERON_CLIENTES.id_incidencia'],
    tipoOrden: attr['ARCGIS.DBO.POWERON_ORDENES.tipo_orden'],
    estado: attr['ARCGIS.DBO.POWERON_ORDENES.estado_orden'],
    fechaCreacion: attr['ARCGIS.DBO.POWERON_ORDENES.fecha_creacion'],
    fechaAsignacion: attr['ARCGIS.DBO.POWERON_ORDENES.fecha_asignacion'],
    fechaDespacho: attr['ARCGIS.DBO.POWERON_ORDENES.fecha_despacho'],
    tipoEquipo: attr['ARCGIS.DBO.POWERON_ORDENES.tipo_equipo'],
    fechaTermino: attr['ARCGIS.DBO.POWERON_ORDENES.fc_termino_t'],
    fechaCierre: attr['ARCGIS.DBO.POWERON_ORDENES.fc_cierre'],
    fechaUltModificacion: attr['ARCGIS.DBO.POWERON_ORDENES.fc_ult_modif'],
    comentario: attr['ARCGIS.DBO.POWERON_ORDENES.comentario']
  };

  return r;
}

//for datagrid
class EmployeeRow extends React.Component {
  render(){
  //  console.log(this.props);

    return (
      <tr>
        <td>{this.props.nis}</td>
        <td className="td_width">{this.props.orden}</td>
        <td>{this.props.idIncidencia}</td>
        <td>{this.props.tipoOrden}</td>
        <td>{this.props.estado}</td>
        <td>{this.props.fechaCreacion}</td>
        <td>{this.props.fechaAsignacion}</td>
        <td>{this.props.fechaDespacho}</td>
        <td className="td_width">{this.props.tipoEquipo}</td>
        <td>{this.props.fechaTermino}</td>
        <td>{this.props.fechaCierre}</td>
        <td>{this.props.fechaUltModificacion}</td>
        <td>{this.props.comentario}</td>
      </tr>
    );
  }
}

class MyGrid extends React.Component{

  constructor(props){

    super(props);
    this.onClick = this.onClick.bind(this);
    this.nowResults = this.nowResults.bind(this);
    this.state = { empleados: [] };
  }

  //before the component is rendered
  componentWillMount(){
    this.currentInterruptions();
    this.setState({empleados: results})
  }

  //after component is rendered
  componentDidMount(){
    var foo = function(){
      this.currentInterruptions();
      setTimeout(foo, 10000);
    };

    foo = foo.bind(this);
    setTimeout(foo, 10000);
  }

  currentInterruptions(){
      var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_clie());
      var qInterruptions = new esri.tasks.Query();
      qInterruptions.where = "1=1";
      qInterruptions.returnGeometry = true;
      qInterruptions.outFields=["*"];
      //this guy returns a featureSet with all the interruptions in an object
      qTaskInterruptions.execute(qInterruptions, this.nowResults, this.nowError);
  }

  nowResults(currentFs){
    console.log("Getting the results from current interruptions...");
    var results = currentFs.features.map(cf => ({ ...cf }) );
    this.setState({ empleados: results });
  }

  nowError(){
    console.log("Error at getting the results from current interruptions");
  }

  onClick(){
    console.log("asd");
  }

  render(){
    var employees = this.state.empleados.map((employee, index)=>{
    var data = translator(employee);
      return <EmployeeRow key={"aa" + index} {...data} />;
    });

    return (
    <div className="mytable-Wrapper">
      <div className="mytable-searchBox">
        <h3 className="mytable-searchBox__title">Interrupciones</h3>
        <input className="mytable-searchBox__input" ref="NIS" type="text" />
        <button type="button" className="mytable-searchBox__submit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span></button>
        <button type="button" className="mytable-searchBox__submit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-file-excel-o"></i></span></button>
        <div className="mytable-searchBox__symbology">
          <h5 className="mytable-searchBox-h5">Simbología:  </h5>
          <img src="images/widget_icons/massive.png" /><h4 className="mytable-searchBox-h4">Falla Masiva</h4>
          <img src="images/widget_icons/isolated.png" /><h4 className="mytable-searchBox-h4">Falla Aislada</h4>
        </div>
      </div>
      <hr className="mytable_searchBox__hr"></hr>
      <table className="mytable-Wrapper__table table table-bordered" >
            <thead className="mytable-Wrapper__table-tr">
              <tr>
                <th>NIS</th>
                <th>ID ORDEN</th>
                <th>ID INCIDENCIA</th>
                <th>TIPO ORDEN</th>
                <th>ESTADO</th>
                <th>FECHA CREACION</th>
                <th>FECHA ASIGNACION</th>
                <th>FECHA DESPACHO</th>
                <th>TIPO EQUIPO</th>
                <th>FECHA TERMINO</th>
                <th>FECHA CIERRE</th>
                <th>FECHA MODIFICACION</th>
                <th>COMENTARIO</th>
              </tr>
            </thead>
            <tbody>
              {employees}
            </tbody>
          </table>
    </div>
    );
  }
}

export default MyGrid;
