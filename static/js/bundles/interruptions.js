import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';

var map;
var searchSymbol;
var popupTemplate;
var results = [];

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
    return (
    <div className="mytable-Wrapper">
      <div className="mytable-searchBox">
        <h3 className="mytable-searchBox__title">Interrupciones</h3>
        <input className="mytable-searchBox__input" ref="NIS" type="text" />
        <button type="button" className="mytable-searchBox__submit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span></button>
        <button type="button" className="mytable-searchBox__submit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-file-excel-o"></i></span></button>
      </div>
      <hr className="mytable_searchBox__hr"></hr>
      <table className="mytable-Wrapper__table table table-bordered" >
            <thead>
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
              </tr>
            </thead>
            <tbody>
              <tr><td>{this.state.empleados.nis}</td>
              <td>{this.state.empleados.orden}</td>
              <td>{this.state.empleados.idIncidencia}</td>
              <td>{this.state.empleados.tipoOrden}</td>
              <td>{this.state.empleados.estado}</td>
              <td>{this.state.empleados.fechaCreacion}</td>
              <td>{this.state.empleados.fechaAsignacion}</td>
              <td>{this.state.empleados.fechaDespacho}</td>
              <td>{this.state.empleados.tipoEquipo}</td>
              <td>{this.state.empleados.fechaTermino}</td>
              <td>{this.state.empleados.fechaCierre}</td>
              <td>{this.state.empleados.fechaUltModificacion}</td>
              </tr>
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

}
  componentDidMount(){
        map = new esri.Map("myMapDiv", {
              basemap: "topo",
              center:[-71.2905, -33.1009],
              zoom:9,
              logo: false
            });
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
    queryTaskNIS.execute(queryNIS, this.searchLocation, this.errorInQuery);
  }
  
  searchLocation(featureSet){
    console.log("searching for location...");
    map.graphics.clear();
    console.log(featureSet);

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
      }
    }else {
      console.log("i dont have anything to show");
    }
  }
  errorInQuery(error){
    //  $("#warning").css("visibility","visible");
    console.log("U must proavide a NIS for searching");
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
        <MyGrid />
    </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions'));
