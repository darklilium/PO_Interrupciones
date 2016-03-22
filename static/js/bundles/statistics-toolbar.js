import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import mymap from '../services/map-service';
import createQueryTask from '../services/createquerytask-service';

class StatisticsToolbar extends React.Component {
  constructor(props){
    super(props);
    this.currentMassive = this.currentMassive.bind(this);
    this.currentIsolated = this.currentIsolated.bind(this);

    this.currentMassive();
    this.currentIsolated();
    this.state = { massiveqtty: 0, isolatedqtty: 0 };
  }
  componentDidMount(){
    var foo = function(){
      this.currentMassive();
      this.currentIsolated();
      setTimeout(foo, 8000);
    };

    foo = foo.bind(this);
    setTimeout(foo, 8000);
  }

  currentMassive(){
    var serviceCurrMass = createQueryTask({
      url: layers.read_layer_interr_sed(),
      whereClause: "1=1",
      returnGeometry: false
    });

    serviceCurrMass((map,featureSet)=>{
        this.setState({ massiveqtty: featureSet.features.length});
    },(errorCurrMass)=>{

    });
  }

  currentIsolated(){
    var serviceCurrIso = createQueryTask({
      url: layers.read_layer_interr_clie(),
      whereClause: "1=1",
      returnGeometry: false
    });

    serviceCurrIso((map,featureSet)=>{
        this.setState({ isolatedqtty: featureSet.features.length});
    },(errorCurrMass)=>{

    });
  }

  render(){
    return (
      <div className="wrapper_statistics">
        <span><i className="fa fa-signal"></i> Total Interrupciones: </span>
        <div className="statistic_kind">
          <div className="statistic___massive">
            <img className="statistic-img" src="images/widget_icons/massive.png" />
            <h4 className="statistic-h4"> Falla Masiva: {this.state.massiveqtty} </h4>
          </div>
          <div className="statistic___isolated">
            <img className="statistic-img" src="images/widget_icons/isolated.png" />
            <h4 className="statistic-h4"> Falla Aislada:{this.state.isolatedqtty} </h4>
          </div>
        </div>
      </div>

    );
  }
}

export default StatisticsToolbar;
