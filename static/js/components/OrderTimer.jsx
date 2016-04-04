import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';

class OrderTimer extends React.Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
    var foo = function(){
      setTimeout(foo, 60000);
      console.log("updating orderTimer");
    };

    foo = foo.bind(this);
    setTimeout(foo, 60000);
  }
  render(){
  return (
  <div className="wrapper_ordertimer">
    
  </div>
  );
  }
}
export default OrderTimer;
