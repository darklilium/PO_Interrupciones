import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';

/*FOR LOGIN APP*/
class Interruptions extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    console.log('this is my token', token.read());
  }

  componentDidMount(){
    var map = new esri.Map("myMapDiv", {
          basemap: "topo",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
          center: [-122.45, 37.75], // longitude, latitude
          zoom: 13
        });
  }

  onClick(){
    console.log(token);
  }

  render(){
    return (
      <div className="interruptions_wrapper">
      <div className="searchBox">
        <input className="searchBox__searchInput" ref="NIS" type="text" />
        <input className="searchBox__searchSubmit" type="submit" onClick={this.onClick} />
      </div>
        <div className="myMapDiv" id="myMapDiv"></div>

      </div>
    );
  }
}

ReactDOM.render(<Interruptions />, document.getElementById('myInterruptions'));
