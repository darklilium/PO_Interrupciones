import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import StatisticsToolbar from '../bundles/statistics-toolbar';
import mymap from '../services/map-service';
import MyGrid from '../bundles/myGrid';


class Interruptions extends React.Component {

  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.searchMassive = this.searchMassive.bind(this);
  }

  componentDidMount(){
    var map = mymap.createMap("myMapDiv");
    map.disableKeyboardNavigation();

    var myDynamicSedLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_dyn_layer_PO());
    var myDynamicBTLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_layer_BT());
    var visibleLayers = [1];
      myDynamicBTLayer2.setVisibleLayers(visibleLayers);
      map.addLayer(myDynamicSedLayer,2);
      map.addLayer(myDynamicBTLayer2,1);
      /*map.on("click",(evt)=>{
        // show info window
        var content =
        "<div style=padding-top: 10px;>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}<br></div>" +
        "<div style=display:inline-block;width:8px;></div>"+
        "<div style=padding-top: 10px;>ID Orden: ${ARCGIS.dbo.POWERON_CLIENTES.id_orden}<br></div>";
            map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(evt.mapPoint), content));
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
      });
*/
  }

  onClickToggle(mouseEvent){
    console.log("toggling table");
  }

  onClickStatistics(mouseEvent){
    console.log("toggling statistics");
  }

//NIS: 139035 for reference data
  onClick(){
    var map = mymap.getMap();
    console.log(token.read());
    var queryTaskNIS = new esri.tasks.QueryTask(layers.read_layer_clie());
    var queryNIS = new esri.tasks.Query();
    queryNIS.where = "ARCGIS.dbo.POWERON_CLIENTES.nis="+this.refs.NIS.value;
    queryNIS.returnGeometry = true;
    queryNIS.outFields=["*"];
    //this guy returns a featureSet object with the queryResult
    queryTaskNIS.execute(queryNIS,
      (featureSet)=>{
        map.graphics.clear();
        //if NIS is in the layer for isolated orders
        if (featureSet.features.length != 0){
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
            $("#myNotification").append("<div><strong>NIS: " + this.refs.NIS.value +" presente en falla aislada</strong></div>");
            $("#myNotification").attr("class", "alert alert-info");
          }
        }else {
          console.log("going to search into massive interruptions");
          var qTaskMassive = new esri.tasks.QueryTask(layers.read_layer_ClieSED());
          var qMassive = new esri.tasks.Query();
          qMassive.where = "ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis="+this.refs.NIS.value;
          qMassive.returnGeometry = true;
          qMassive.outFields=["*"];
          qTaskMassive.execute(qMassive,
            (featureSet)=>{
              if(featureSet.features.length != 0){
                var mySed = featureSet.features[0].attributes['ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed'];
                this.searchMassive(mySed);
              }else {
                $(".searchNotification").css("visibility","initial");
                $( "#myNotification" ).empty();
                $("#myNotification").append("<div><strong>NIS: " + this.refs.NIS.value +" no se ha encontrado o no existe</strong></div>");
                $("#myNotification").attr("class", "alert alert-info");
              }
            },(massiveError)=>{
              console.log("Error al ejecutar la query en Falla Masiva");
              $(".searchNotification").css("visibility","initial");
              $( "#myNotification" ).empty();
              $("#myNotification").append("<div><strong>Error al buscar el NIS: " + this.refs.NIS.value +"</strong></div>");
              $("#myNotification").attr("class", "alert alert-info");
            }
          );
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
    var map = mymap.getMap();
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
          $("#myNotification").append("<div><strong>NIS: " + this.refs.NIS.value +" presente en falla masiva</strong></div>");
          $("#myNotification").attr("class", "alert alert-danger");
        }
      }else {
        console.log("nis is not having any issue");
        $(".searchNotification").css("visibility","initial");
        $( "#myNotification" ).empty();
        $("#myNotification").append("<div><strong>NIS: " + this.refs.NIS.value +" no presenta problemas</strong></div>");
        $("#myNotification").attr("class", "alert alert-success");
      }
    },(errorMassive)=>{
      console.log("Problems getting the sed for massive interruption ");
      $(".searchNotification").css("visibility","initial");
      $( "#myNotification" ).empty();
      $("#myNotification").append("<div><strong>Error tratando de obtener la SED del NIS:" + this.refs.NIS.value +"</strong></div>");
      $("#myNotification").attr("class", "alert alert-warning");
    });
  }

  render(){
    return (
    <div className="interruptions_wrapper">
      <div className="searchBox">
        <input className="searchBox__searchInput" ref="NIS" type="text" placeholder=" NIS" />
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        </button>
        <button data-toggle="collapse" data-target="#collapseMyGrid" type="button" className="searchBox__tableToggle btn btn-default" onClick={this.onClickToggle}>
            <span className="searchBox_icon"><i className="fa fa-bars"></i> Ver Tabla</span>
        </button>
        <button data-toggle="collapse" data-target="#collapseStatistics" type="button" className="searchBox__tableToggle btn btn-default" onClick={this.onClickStatistics}>
            <span className="searchBox_icon"><i className="fa fa-bar-chart"></i> Estadísticas</span>
        </button>
      </div>
      <div className="myMapDiv" id="myMapDiv"></div>
        <StatisticsToolbar />
      <div className="collapse" id="collapseStatistics">

      </div>
      <div id="collapseMyGrid" className="collapse">
        <MyGrid />
      </div>
      <div className="searchNotification">
        <div id="myNotification"></div>
      </div>
    </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions'));
