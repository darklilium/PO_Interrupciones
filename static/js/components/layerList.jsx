import React from 'react';
import mymap from '../services/map-service';
import {addMapsAndLayers} from '../services/map-service';

import {setLayers} from '../services/layers-service';

class LayerList extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);

  }
  componentDidMount(){
      this.setState({activeLayers : {alimentadores: true}});
  }
  onClick(check){
    var mapp = mymap.getMap();
    var addAlimentadorLayer = setLayers().alimentadores();
    var addCuadrillasLayer = setLayers().cuadrillas();

    switch (check.currentTarget.id) {
      case "check_alimentador":

        if (this.refs.check_alimentador.checked){
          mapp.addLayer(addAlimentadorLayer, 10);
          return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("CHQAlimentadores"));
        break;

      case "check_cuadrillas":
        /*if (this.refs.check_cuadrillas.checked){
        mapp.addLayer(addCuadrillasLayer, 3);
        return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("CHQCuadrillas"));
        */
        break;

      default:

    }
  }

  render(){
    return (
    <div className="layerlist__wrapper">
      <fieldset className="layerlist__fieldset">
        <legend className="layerlist__legend">Layers</legend>
          <div className="layerlist__checkbox-div">
            <input className="layerlist__checkbox" type="checkbox" id="check_alimentador" ref="check_alimentador" onClick={this.onClick} ></input><h6 className="layerlist__h6">Alimentador</h6>
          </div>
          {/*<div className="layerlist__checkbox-div">
            <input className="layerlist__checkbox" type="checkbox" id="check_cuadrillas" ref="check_cuadrillas" onClick={this.onClick}  ></input><h6 className="layerlist__h6">Cuadrillas</h6>
          </div>
          */}
      </fieldset>
    </div>);

  }
}

export default LayerList;
