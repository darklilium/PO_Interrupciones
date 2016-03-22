import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';


class StatisticsToolbar extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    var foo = function(){
    
      setTimeout(foo, 80000);
    };

    foo = foo.bind(this);
    setTimeout(foo, 80000);
  }



  render(){
    return (
      <div className="wrapper_statistics">
        <span><i className="fa fa-signal"></i> Total Interrupciones: </span>
        <div className="statistic_toolbar-kind-of-interr">
          <img className="mytable-searchBox-img" src="images/widget_icons/massive.png" />
          <h4 className="mytable-searchBox-h4">Falla Masiva:  {this.props.massiveqtty} </h4>
          <img className="mytable-searchBox-img" src="images/widget_icons/isolated.png" />
          <h4 className="mytable-searchBox-h4">Falla Aislada: {this.props.isolatedqtty} </h4>
        </div>
      </div>

    );
  }
}

export default StatisticsToolbar;
