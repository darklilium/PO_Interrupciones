import React from 'react';
import mymap from '../services/map-service';
import {addMapsAndLayers} from '../services/map-service';

import {setLayers} from '../services/map-service';

class LayerList extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);


  }
  onClick(check){
    var mapp = mymap.getMap();
    var addAlimentadorLayer = setLayers().alimentadores();
    var addCuadrillasLayer = setLayers().cuadrillas();

    switch (check.currentTarget.id) {
      case "check_alimentador":

        if (this.refs.check_alimentador.checked){
          mapp.addLayer(addAlimentadorLayer, 2);
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
    /*
    var mapp = mymap.getMap();
    var addAlimentadorLayer = setLayers().alimentadores();
    var addCuadrillasLayer = setLayers().cuadrillas();

    if (this.refs.check_alimentador.checked){
      mapp.addLayer(addAlimentadorLayer, 2);

    }else{
      console.log("entre");
      mapp.graphics.clear();
      mapp.removeLayer(mapp.getLayer("CHQAlimentadores"));
    }

    if(this.refs.check_cuadrillas.checked){
      //mapp.addLayer(addAlimentadorLayer, 2);
    }else{
      //mapp.removeLayer(mapp.getLayer("CHQCuadrillas"));
    }
    */
  }

  render(){
    return (
    <div className="layerlist__wrapper">
      <fieldset className="layerlist__fieldset">
        <legend className="layerlist__legend">Layers</legend>
          <div className="layerlist__checkbox-div">
            <input className="layerlist__checkbox" type="checkbox" id="check_alimentador" ref="check_alimentador" onClick={this.onClick} ></input><h6 className="layerlist__h6">Alimentador</h6>
          </div>
          <div className="layerlist__checkbox-div">
            <input className="layerlist__checkbox" type="checkbox" id="check_cuadrillas" ref="check_cuadrillas" onClick={this.onClick}  ></input><h6 className="layerlist__h6">Cuadrillas</h6>
          </div>
      </fieldset>
    </div>);

  }
}

export default LayerList;
