import React from 'react';
import mymap from '../services/map-service';
import layers from '../services/layers-service';
import {searchBar_NIS} from '../services/searchbar-service';
import {searchBar_Order} from '../services/searchbar-service';
import {searchBar_Incidence} from '../services/searchbar-service';
import {searchBar_SED} from '../services/searchbar-service';
import {getStatisticsSummary} from '../services/getstatistics-summary';
import StatisticsSummary from './statistics-summary.jsx';
import MyGrid from '../components/MyGrid.jsx';

class SearchBar extends React.Component {
  constructor(){
    super();
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.onClickClearMap = this.onClickClearMap.bind(this);
    this.onClickOrderTimer = this.onClickOrderTimer.bind(this);
    this.state = {
      staClic : 0,
      timerClic : 0
    }
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
    $('.notificationBox').empty().css('visibility', 'hidden');
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

  onClickClearMap(){
    console.log("clearing map");

    var map = mymap.getMap();
    map.graphics.clear();
    map.removeLayer(layers.read_graphicLayer());

    $('.notificationBox').empty().css('visibility', 'hidden');
  }

  onClickOrderTimer(){
    console.log("toggling order timer");
    var map = mymap.getMap();

    if (this.state.timerClic==0){
      this.setState({ timerClic : 1 });
      $('.mytable-Wrapper').css('visibility', 'visible');
      $('.mygrid').css('visibility', 'visible');

    }else{
      this.setState({ timerClic : 0 });
      $('.mytable-Wrapper').css('visibility', 'hidden');
        $('.mygrid').css('visibility', 'hidden');

    }
  }

  render(){

    return (

      <div>
      <div className="searchBox">
      {/* Button for search orders and incidences */}
      <select className="searchbox__combobox" ref="searchType">
        <option value="nis">NIS</option>
        <option value="incidence">INCIDENCIA</option>
        <option value="order">ORDEN</option>
        <option value="sed">SED</option>
      </select>

      {/* Input for searching NIS */}
        <input className="searchBox__searchInput" ref="searchValue" type="text" placeholder=" NIS" />
      {/* Button for searching NIS */}
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickSearch}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        </button>
      {/* Button for cleaning map */}
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickClearMap}>
          <span className="searchBox_icon"><i className="fa fa-eraser"></i></span></button>
      {/* Button for statistics per region*/}
        <button data-toggle="collapse" data-target="#collapseStatistics" type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickStatistics}>
            <span className="searchBox_icon"><i className="fa fa-pie-chart"></i></span>
        </button>

      {/* Button for OrderTimer*/}
      <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickOrderTimer}>
            <span className="searchBox_icon"><i className="fa fa-clock-o"></i></span>
      </button>

      </div>
      {/* Notification Box*/}
      <div className="notificationBox"></div>
      {/*Statistics per Region(qtty and percentual), office*/}
      <StatisticsSummary className="statisticsSummary" />
      <MyGrid className="mygrid" />
    </div>

    );
  }
}

export default SearchBar;
