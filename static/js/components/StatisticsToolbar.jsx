import React from 'react';
import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';


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
          <div className="statistic___massive">
            <span className="statistic-h4"><i className="fa fa-home"></i> DOM: {this.state.CLIEDOM}  | </span>
          </div>
          <div className="statistic___isolated">

            <span className="statistic-h4"><i className="fa fa-bolt"></i> RED: {this.state.CLIERED}  | </span>
          </div>
          <div className="statistic___total">
            <span className="statistic-h4"><span><i className="fa fa-signal"></i></span> Total : {this.state.TOTALQTTY}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticsToolbar;
