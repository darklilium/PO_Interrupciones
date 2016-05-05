import React from 'react';
import mymap from '../services/map-service';
import layers from '../services/layers-service';
import {searchBar_NIS} from '../services/searchbar-service';
import {searchBar_Order} from '../services/searchbar-service';
import {searchBar_Incidence} from '../services/searchbar-service';
import {searchBar_SED} from '../services/searchbar-service';
import {getStatisticsSummary} from '../services/getstatistics-summary-service';
import {addMapsAndLayers} from '../services/map-service';
import {exportToExcel} from '../utils/exportToExcel';
import {translateInfo} from '../utils/exportToExcel';
import formatDate from '../utils/milliSecondsToDate';
import {setLayers} from '../services/layers-service';


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.onClickClearMap = this.onClickClearMap.bind(this);
    this.onClickOrderTimer = this.onClickOrderTimer.bind(this);
    this.onClickChangeMap = this.onClickChangeMap.bind(this);
    this.onClickExport = this.onClickExport.bind(this);
      this.state = {
        staClic : 0,
        gridClic : 0,
        mapClick : 0
      };
  }

  onClickStatistics(mouseEvent){
    console.log("toggling statistics");
    if (this.state.staClic==0){
      this.setState({ staClic : 1 });
      $('.wrapper_statistics-summary').css('visibility', 'visible');
      getStatisticsSummary();

    }else{
      this.setState({ staClic : 0 });
      $('.wrapper_statistics-summary').css('visibility', 'hidden');
    }
  }

  onClickSearch(){
    $('.searchbar__notifications').empty().css('visibility', 'hidden');
    let searchType = this.refs.searchType.value;
      if (searchType=='nis') {
        console.log("searching for nis...");
        searchBar_NIS(this.refs.searchValue.value);
      }else if (searchType=='incidence') {
        console.log("searching for incidence...");
        searchBar_Incidence(this.refs.searchValue.value);
      }else if (searchType=='order'){
        console.log("searching for order...");
        console.log(this.refs.searchValue.value);
        searchBar_Order(this.refs.searchValue.value);
      }else {
        console.log("searching for sed...");
        //console.log(this.refs.searchValue.value);
        searchBar_SED(this.refs.searchValue.value);
      }
  }

  onClickOrderTimer(){
    console.log("toggling grid");
    $( ".griddle-title" ).remove();
    var map = mymap.getMap();

    if (this.state.gridClic==0){
      this.setState({ gridClic : 1 });
      $('.griddle').css('visibility', 'visible');
      $( "<h4 class='griddle-title'>Interrupciones</h4>" ).appendTo( ".griddle" ).insertBefore(".griddle-filter");
      $( ".Griddle__export" ).appendTo( ".griddle" ).insertAfter(".griddle-filter");
      $( ".Griddle__export" ).css('visibility', 'visible');
    }else{
      this.setState({ gridClic : 0 });
      $('.griddle').css('visibility', 'hidden');
      $( ".Griddle__export" ).css('visibility', 'hidden');

    }
  }

  onClickChangeMap(){
    var map = mymap.getMap();


    if (this.state.mapClick==0){
      this.setState({ mapClick : 1 });
      mymap.changeBasemap("hybrid");

    }else if(this.state.mapClick==1){
      this.setState({ mapClick : 2 });
      mymap.changeBasemap("Chilquinta");

    }else {
      this.setState({ mapClick : 0 });
      mymap.changeBasemap("topo");
    }
  }

  onClickClearMap(){
    console.log("clearing map");
    this.refs.searchValue.value = '';
    var map = mymap.getMap();
    map.graphics.clear();
    map.removeLayer(layers.read_graphicLayer());
    $('.searchbar__notifications').empty().css('visibility', 'hidden');
  }

  onClickExport(){
    var mydata = translateInfo(this.props.data);
    console.log(mydata);
    var a = new Date();
    let str = formatDate(a);
    //exportToExcel(mydata, "Interrupciones " + str, true);
  }

  render(){
    return (
      <div className="wrapper__searchbar">
        <div className="searchbar__elements">
        {/* Button for search orders and incidences */}
          <select className="searchbar__elements-combobox" title="Elija una opción de búsqueda" ref="searchType">
            <option value="nis">NIS</option>
            <option value="incidence">INCIDENCIA</option>
            <option value="order">ORDEN</option>
            <option value="sed">SED</option>
          </select>

          {/* Input for searching NIS */}
            <input className="searchbar__elements-input" ref="searchValue" title="Ingrese NIS o ID a buscar" type="text" placeholder="" />
          {/* Button for searching NIS */}
            <button className="searchbar__elements-button btn btn-default" title="Buscar" type="button" onClick={this.onClickSearch}>
                <span><i className="fa fa-search"></i></span>
            </button>
          {/* Button for cleaning map */}
            <button className="searchbar__elements-button btn btn-default" title="Limpiar Mapa y Búsqueda" type="button"  onClick={this.onClickClearMap}>
              <span className="searchBox_icon"><i className="fa fa-eraser"></i></span></button>
          {/* Button for statistics per region*/}
            <button className="searchbar__elements-button btn btn-default" title="Ver Gráfico Estadísticas" type="button"  onClick={this.onClickStatistics}>
                <span><i className="fa fa-pie-chart"></i></span>
            </button>
          {/* Button for Orders*/}
          <button className="searchbar__elements-button btn btn-default" title="Ver Tabla" type="button" onClick={this.onClickOrderTimer}>
                <span><i className="fa fa-clock-o"></i></span>
          </button>
          {/* Button for maps*/}
            <button className="searchbar__elements-button btn btn-default" title="Cambiar Tipo Mapa" type="button"  onClick={this.onClickChangeMap}>
                <span><i className="fa fa-globe"></i></span>
            </button>
          {/* Button for export*/}
          <div className="Griddle__export">
            <button className="Griddle__export-btn btn btn-default" title="Exportar Datos" type="button"  onClick={this.onClickExport}>
                <span><i className="fa fa-file-excel-o"></i></span>
            </button>
          </div>
        </div>
      {/* Notification Box*/}
      <div className="searchbar__notifications"></div>
    </div>

    );
  }
}

export default SearchBar;
