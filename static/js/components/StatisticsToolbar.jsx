import React from 'react';
import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';
import {tokenValidator} from '../services/token-service';
import token from '../services/token-service';
class StatisticsToolbar extends React.Component {
  constructor(props){
    super(props);

    this.currentTotal= this.currentTotal.bind(this);

    this.state = {
      CLIEDOM: '0',
      CLIERED:'0',
      TOTALQTTY: '0'
    };
      this.init();

  }

  init(){
    this.currentTotal();
  }

  componentDidMount(){

    var foo = function(){
      this.currentTotal();
      setTimeout(foo, 10000);
    };

    foo = foo.bind(this);
    setTimeout(foo, 10000);
  }

  currentTotal(){
    var serviceCurrTotal = createQueryTask({
      url: layers.read_layer_countTotal(),
      whereClause: "1=1"
    });

    serviceCurrTotal((map,featureSet)=>{
      this.setState({
        CLIEDOM: featureSet.features[1].attributes['CANTIDAD'],
        CLIERED: featureSet.features[0].attributes['CANTIDAD'],
        TOTALQTTY: featureSet.features[2].attributes['CANTIDAD']
      });

    },(errorCount) => {console.log("error getting the current total");});
  }

  render(){

    return (

      <div className="wrapper__statistics">

        <div className="statistic__kind">
          <div className="statistic__kind-elem">
            <span title="Clientes Domiciliarios" className="statistic-h4"><i title="Clientes Domiciliarios" className="fa fa-home"></i><h6 title="Clientes Domiciliarios" className="statistic-h6-label"> DOM:</h6> {this.state.CLIEDOM}  | </span>
          </div>
          <div className="statistic__kind-elem">

            <span title="Clientes por SED" className="statistic-h4"><i title="Clientes por SED" className="fa fa-bolt"></i><h6 title="Clientes por SED" className="statistic-h6-label"> RED:</h6> {this.state.CLIERED}  | </span>
          </div>
          <div className="statistic__kind-elem">
            <span title="Total Clientes Afectados" className="statistic-h4"><span><i title="Total Clientes Afectados" className="fa fa-signal"></i></span><h6 title="Total Clientes Afectados" className="statistic-h6-label"> Total:</h6> {this.state.TOTALQTTY}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticsToolbar;
