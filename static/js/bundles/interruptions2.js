import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import StatisticsToolbar from '../bundles/statistics-toolbar';
import mymap from '../services/map-service';

import searchBar_NIS from '../services/othercompanies/searchbar_companies-service';

class Interruptions extends React.Component {

  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickStatistics = this.onClickStatistics.bind(this);
    this.onChange = this.onChange.bind(this);


  }

  componentDidMount(){
    var map = mymap.createMap("myMapDiv");
    map.disableKeyboardNavigation();


  }

  onClickToggle(mouseEvent){
    console.log("toggling table");

  }

  onClickStatistics(mouseEvent){
    console.log("toggling statistics");
  }

  onClick(){
    //console.log(this.refs.company.value);
    searchBar_NIS(this.refs.NIS.value, this.refs.company.value);
  }

  onChange(){
  //  console.log("this is for changing layers\n" , this.refs.company.value);
  this.setState({myCompanySelected : this.refs.company.value});
  }

  render(){
    var myCompanySelected;
    return (
    <div className="interruptions_wrapper">
      <div className="searchBox">
        <select className="searchbox__combobox" ref="company" onChange={this.onChange}>
          <option value="Casablanca">Casablanca</option>
          <option value="Linares">Linares</option>
          <option value="Litoral">Litoral</option>
          <option value="Parral">Parral</option>
        </select>

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

        
        <div className="orderNotification">
          <div id="myorderNotification"></div>
        </div>
      </div>
      <div className="myMapDiv" id="myMapDiv"></div>
        <StatisticsToolbar />
      <div className="collapse" id="collapseStatistics">

      </div>
      <div id="collapseMyGrid" className="collapse">
        <MyGridFiliales />
      </div>

    </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions2'));
