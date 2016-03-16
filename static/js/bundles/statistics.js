import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';


class Statistics extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="wrapper_statistics">
        <span><i className="fa fa-signal"></i> Total Interrupciones: </span>
        <h5 className="interruptions_qty-h5">Nis en Falla Masiva: {this.props.massiveQtty}</h5>
        <h5 className="interruptions_qty-h5">Nis en Falla Aislada: {this.props.isolatedQtty}</h5>
      </div>

    );
  }
}

export default Statistics;
