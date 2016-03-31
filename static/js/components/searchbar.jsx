import React from 'react';
import mymap from '../services/map-service';
import layers from '../services/layers-service';
import {searchBar_NIS} from '../services/searchbar-service';
import {searchBar_Order} from '../services/searchbar-service';
import {getStatisticsSummary} from '../services/getstatistics-summary';

class SearchBar extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.onClickClearMap = this.onClickClearMap.bind(this);
    this.onClickSearchSelector = this.onClickSearchSelector.bind(this);
    this.state = {
      staClic : 0,
      selectorClick:0
    }
}
  onClickSearchSelector(){
    console.log("toggling search selector");
    if (this.state.selectorClick==0){
      this.setState({ selectorClick : 1 });
      $('.statisticsSummary').css('visibility', 'visible');
      $('.wrapper_statistics-summary').css('visibility', 'visible');
      getStatisticsSummary();


    }else{
      this.setState({ selectorClick : 0 });
      $('.statisticsSummary').css('visibility', 'hidden');
      $('.wrapper_statistics-summary').css('visibility', 'hidden');
    }
  }
  onClickToggle(mouseEvent){
    console.log("toggling table");
  }

  onClickStatistics(mouseEvent){
    console.log("toggling statistics");
    if (this.state.staClic==0){
      this.setState({ staClic : 1 });
      $('.statisticsSummary').css('visibility', 'visible');
      $('.wrapper_statistics-summary').css('visibility', 'visible');
      getStatisticsSummary();


    }else{
      this.setState({ staClic : 0 });
      $('.statisticsSummary').css('visibility', 'hidden');
      $('.wrapper_statistics-summary').css('visibility', 'hidden');
    }
  }

  onClick(){
  $('.notificationBox').empty().css('visibility', 'hidden');
    let searchType = this.refs.searchType.value;
    if (searchType=='nis') {
      console.log("searching for nis...");
      searchBar_NIS(this.refs.searchValue.value);
    }else if (searchType=='incidence') {
      console.log("searching for incidence...");
    }else{
      console.log("searching for order...");
      console.log(this.refs.searchValue.value);
      searchBar_Order(this.refs.searchValue.value);
    }
  }

  onClickClearMap(){
    console.log("clearing map");

    var map = mymap.getMap();
    map.graphics.clear();
    map.removeLayer(layers.read_graphicLayer());

    $('.notificationBox').empty().css('visibility', 'hidden');
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
      </select>

      {/* Input for searching NIS */}
        <input className="searchBox__searchInput" ref="searchValue" type="text" placeholder=" NIS" />
      {/* Button for searching NIS */}
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        </button>
      {/* Button for cleaning map */}
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickClearMap}>
          <span className="searchBox_icon"><i className="fa fa-eraser"></i></span></button>
      {/* Button for statistics per region*/}
        <button data-toggle="collapse" data-target="#collapseStatistics" type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickStatistics}>
            <span className="searchBox_icon"><i className="fa fa-pie-chart"></i></span>
        </button>

      {/* Button for toggle grid  */}
        <button data-toggle="collapse" data-target="#collapseMyGrid" type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickToggle}>
            <span className="searchBox_icon"><i className="fa fa-bars"></i></span>
        </button>


      </div>
      {/* Notification Box*/}
      <div className="notificationBox"></div>
      {/* SearchSelectorTab*/}

      </div>
    );
  }
}

export default SearchBar;
