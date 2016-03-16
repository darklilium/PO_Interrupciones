import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import Statistics from '../bundles/statistics';
import mymap from '../bundles/map';

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

//for datagrid
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

class Interruptions extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.searchMassive = this.searchMassive.bind(this);
}
  componentDidMount(){
    var map = mymap("myMapDiv");

    var myDynamicSedLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layer_PO());
    var myDynamicBTLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_layer_BT());
    var visibleLayers = [1];
        myDynamicBTLayer2.setVisibleLayers(visibleLayers);
        map.addLayer(myDynamicSedLayer,2);
        map.addLayer(myDynamicBTLayer2,1);
        map.disableKeyboardNavigation();
  }


//NIS: 139035 for reference data
  onClick(){
    console.log(token.read());
    var queryTaskNIS = new esri.tasks.QueryTask(layers.read_layer_clie());
    var queryNIS = new esri.tasks.Query();
    queryNIS.where = "ARCGIS.dbo.POWERON_CLIENTES.nis="+this.refs.NIS.value;
    queryNIS.returnGeometry = true;
    queryNIS.outFields=["*"];
    //this guy returns a featureSet object with the queryResult
    queryTaskNIS.execute(queryNIS, (featureSet)=>{
      map.graphics.clear();
      //if NIS is in the layer for isolated orders
      if (featureSet.features != 0){
        for (var i = 0; i < featureSet.features.length; i++) {
            var searchSymbol = new esri.symbol.SimpleMarkerSymbol(
              esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
              20,
              new esri.symbol.SimpleLineSymbol(
                esri.symbol.SimpleLineSymbol.STYLE_NULL,
                new esri.Color([0, 255, 255, 0.9]),
                1
              ),
              new esri.Color([0, 255, 255, 0.5])
            );
          map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,searchSymbol));
          map.centerAndZoom(featureSet.features[0].geometry,20);
          console.log("Found in isolated interruptions");
          $(".searchNotification").css("visibility","initial");
            $( "#myNotification" ).empty();
          $("#myNotification").append("<div><strong>NIS presente en falla aislada</strong></div>");
          $("#myNotification").attr("class", "alert alert-info");

        }
      }else {
          console.log("going to search into massive interruptions");
          var qTaskMassive = new esri.tasks.QueryTask(layers.read_layer_ClieSED());
          var qMassive = new esri.tasks.Query();
          qMassive.where = "ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis="+this.refs.NIS.value;
          qMassive.returnGeometry = true;
          qMassive.outFields=["*"];
          qTaskMassive.execute(qMassive, (featureSet)=>{
          //  console.log(featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed']);
            var mySed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
            this.searchMassive(mySed);
          },this.errorInQuery)
      }
    }, this.errorInQuery);
  }

  errorInQuery(error){
    //  $("#warning").css("visibility","visible");
    console.log("U must proavide a NIS for searching");
    $(".searchNotification").css("visibility","initial");
      $( "#myNotification" ).empty();
    $("#myNotification").append("<div><strong>Ingrese un NIS para buscar</strong></div>");
    $("#myNotification").attr("class", "alert alert-warning");
  }

  searchMassive(sed){
    console.log(sed + " searching in massive interruptions");
    var qTMass = new esri.tasks.QueryTask(layers.read_layer_sed());
    var qMass = new esri.tasks.Query();
    qMass.where = "ARCGIS.DBO.SED_006.codigo="+sed;
    qMass.returnGeometry = true;
    qMass.outFields=["*"];
    qTMass.execute(qMass, (featureSet)=>{

      map.graphics.clear();
      if (featureSet.features != 0){
        console.log("interrupted customers in SED "+ featureSet.features[0].attributes['ARCGIS.DBO.SED_006.codigo']);
        for (var i = 0; i < featureSet.features.length; i++) {
            var searchSymbol = new esri.symbol.SimpleMarkerSymbol(
              esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
              20,
              new esri.symbol.SimpleLineSymbol(
                esri.symbol.SimpleLineSymbol.STYLE_NULL,
                new esri.Color([0, 255, 255, 0.9]),
                1
              ),
              new esri.Color([0, 255, 255, 0.5])
            );
          map.graphics.add(new esri.Graphic(featureSet.features[i].geometry,searchSymbol));
          map.centerAndZoom(featureSet.features[0].geometry,20);
          console.log("Found in massive interruptions");

          $(".searchNotification").css("visibility","initial");
          $( "#myNotification" ).empty();
          $("#myNotification").append("<div><strong>NIS presente en falla masiva</strong></div>");
          $("#myNotification").attr("class", "alert alert-danger");
        }
      }else {
        console.log("nis is not having any issue");
        $(".searchNotification").css("visibility","initial");
          $( "#myNotification" ).empty();
        $("#myNotification").append("<div><strong>NIS no presenta problemas</strong></div>");
        $("#myNotification").attr("class", "alert alert-success");
      }
    },(errorMassive)=>{
      console.log("Problems getting the massive interruption");
      $(".searchNotification").css("visibility","initial");
        $( "#myNotification" ).empty();
      $("#myNotification").append("<div><strong>NIS no presenta problemas</strong></div>");
      $("#myNotification").attr("class", "alert alert-warning");
    });
  }
  render(){
    return (
    <div className="interruptions_wrapper">
      <div className="searchBox">
        <input className="searchBox__searchInput" ref="NIS" type="text" />
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        </button>
      </div>
      <div className="myMapDiv" id="myMapDiv"></div>
      <Statistics />
      <MyGrid />
      <div className="searchNotification">
        <div id="myNotification"></div>
      </div>
    </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions'));
