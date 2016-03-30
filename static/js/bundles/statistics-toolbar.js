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
    this.currentTotal();
    this.state = { massiveqtty: '...', isolatedqtty:'...', totalqtty: '...' };
  }
  componentDidMount(){
    var foo = function(){
      this.currentMassive();
      this.currentIsolated();
      this.currentTotal();
      setTimeout(foo, 60000);
    };

    foo = foo.bind(this);
    setTimeout(foo, 60000);
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

  currentTotal(){

    var serviceCurrTotal = createQueryTask({
      url: layers.read_layer_countTotal(),
      whereClause: "1=1"
    });

    serviceCurrTotal((map,featureSet)=>{

      this.setState({ totalqtty: featureSet.features[0].attributes['Cantidad']});
    },(errorCount)=>{
      console.log("error getting the current total");
    });
  }

  render(){
    return (
      <div className="wrapper_statistics">
        <span><i className="fa fa-signal"></i> Total Interrupciones: </span>
        <div className="statistic_kind">
          <div className="statistic___massive">
            <img className="statistic-img" src="images/widget_icons/massive.png" />
            <span className="statistic-h4">Falla Subestación: {this.state.massiveqtty}</span>
          </div>
          <div className="statistic___isolated">
            <img className="statistic-img" src="images/widget_icons/isolated.png" />

            <span className="statistic-h4">Falla Clientes: {this.state.isolatedqtty}</span>
          </div>
          <div className="statistic___total">
            <span><i className="fa fa-user"></i> Total Clientes: {this.state.totalqtty}</span>

          </div>
        </div>
      </div>

    );
  }
}

export default StatisticsToolbar;
