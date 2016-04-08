import React from 'react';
import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';


class StatisticsToolbar extends React.Component {
  constructor(props){
    super(props);

    this.currentMassive = this.currentMassive.bind(this);
    this.currentIsolated = this.currentIsolated.bind(this);

    this.state = {
      massiveqtty: '...',
      isolatedqtty:'...',
      totalqtty: '...'
    };

    this.init();
  }

  init(){
    this.currentMassive();
    this.currentIsolated();
    this.currentTotal();
  }

  componentDidMount(){

    var foo = function(){

      this.currentMassive();
      this.currentIsolated();
      this.currentTotal();
      //console.log(this.state.massiveqtty, this.state.currentIsolated, this.state.currentTotal);
      setTimeout(foo, 10000);
    };

    foo = foo.bind(this);
    setTimeout(foo, 10000);
  }

  currentMassive(){
    var serviceCurrMass = createQueryTask({
      url: layers.read_layer_interr_sed(),
      whereClause: "1=1",
      returnGeometry: false
    });

    serviceCurrMass((map,featureSet)=>{
        this.setState({ massiveqtty: featureSet.features.length});
    }, (Error)=>{
      console.log("Error getting the current massiveqtty", Error);
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
      },(Error)=>{console.log("Error getting the current isolatedqtty", Error);
    });
  }

  currentTotal(){
    var serviceCurrTotal = createQueryTask({
      url: layers.read_layer_countTotal(),
      whereClause: "1=1"
    });

    serviceCurrTotal((map,featureSet)=>{
      this.setState({ totalqtty: featureSet.features[0].attributes['CANTIDAD']});

    },(errorCount) => {console.log("error getting the current total");});
  }

  render(){

    return (

      <div className="wrapper__statistics">
        <span><i className="statistic-span fa fa-signal"></i></span>
        <div className="statistic__kind">
          <div className="statistic___massive">
            <img className="statistic-img" src="images/widget_icons/massive.png" />
            <span className="statistic-h4">Falla SED: {this.state.massiveqtty}</span>
          </div>
          <div className="statistic___isolated">
            <img className="statistic-img" src="images/widget_icons/isolated.png" />
            <span className="statistic-h4">Falla Clientes: {this.state.isolatedqtty}</span>
          </div>
          <div className="statistic___total">
            <span><i className="fa fa-user"></i> Total Clientes Afectados: {this.state.totalqtty}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticsToolbar;
