import React from 'react';
import mymap from '../services/map-service';
import layers from '../services/layers-service';
import searchBar_NIS from '../services/searchbar-service';
import {getStatisticsSummary} from '../services/getstatistics-summary';

class SearchBar extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.onClickClearMap = this.onClickClearMap.bind(this);

    this.state = {
      staClic : 0
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
    console.log("searching");
    searchBar_NIS(this.refs.NIS.value);
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
      {/* Input for searching NIS */}
        <input className="searchBox__searchInput" ref="NIS" type="text" placeholder=" NIS" />
      {/* Button for searching NIS */}
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClick}>
            <span className="searchBox_icon"><i className="fa fa-search"></i></span>
        </button>
      {/* Button for cleaning map */}
        <button type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickClearMap}>
          <span className="searchBox_icon"><i className="fa fa-eraser"></i></span></button>
      {/* Button for search orders and incidences */}
      <button type="button" className="searchBox__searchSubmit btn btn-default">
         <span className="searchBox_icon"><i className="fa fa-asterisk"></i></span>
      </button>

      {/* Button for toggle grid  */}
        <button data-toggle="collapse" data-target="#collapseMyGrid" type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickToggle}>
            <span className="searchBox_icon"><i className="fa fa-bars"></i></span>
        </button>

      {/* Button for statistics widget (not done yet)*/}
        <button data-toggle="collapse" data-target="#collapseStatistics" type="button" className="searchBox__searchSubmit btn btn-default" onClick={this.onClickStatistics}>
            <span className="searchBox_icon"><i className="fa fa-pie-chart"></i></span>
        </button>
      </div>
      {/* Notification Box*/}
      <div className="notificationBox"></div>
      </div>
    );
  }
}

export default SearchBar;
