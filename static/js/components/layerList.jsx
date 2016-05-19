import React from 'react';
import mymap from '../services/map-service';


import {setLayers} from '../services/layers-service';

class LayerList extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      activeChecks: this.props.show
    }
  }
  componentDidMount(){
    console.log(this.state.activeChecks);

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
        mapp.removeLayer(mapp.getLayer("gis_alimentadores"));
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

      case "check_ap_modificaciones":
          if (this.refs.check_ap_modificaciones.checked){
            mapp.addLayer(addAlimentadorLayer, 10);
          return;
          }

          mapp.graphics.clear();
          mapp.removeLayer(mapp.getLayer("gis_alimentadores"));

      break;
      default:

    }
  }

  render(){
    var visibilityStyle = {
      check_alimentador: {
        visibility: 'hidden',
        display: 'none'
      },
      check_cuadrillas:{
          visibility: 'hidden',
          display: 'none'
      },
      check_ap_modificaciones:{
          visibility: 'hidden',
          display: 'none'
      }
    };

    this.state.activeChecks.forEach(visible =>{

      switch (visible) {
        case "check_alimentador":

          visibilityStyle.check_alimentador.visibility= 'visible';
          visibilityStyle.check_alimentador.display= 'flex';
        break;

        case "check_cuadrillas":

          visibilityStyle.check_cuadrillas.visibility= 'visible';
            visibilityStyle.check_cuadrillas.display= 'flex';
        break;

        case "check_ap_modificaciones":

          visibilityStyle.check_ap_modificaciones.visibility= 'visible';
          visibilityStyle.check_ap_modificaciones.display= 'flex';
        break;

        default:

      }

    });

    return (
    <div className="layerlist__wrapper">
      <fieldset className="layerlist__fieldset">
        <legend className="layerlist__legend">Layers</legend>
          <div className="layerlist__checkbox-div">
            <input style={visibilityStyle.check_alimentador} className="layerlist__checkbox" type="checkbox" id="check_alimentador" ref="check_alimentador" onClick={this.onClick} ></input>
            <h6 style={visibilityStyle.check_alimentador} className="layerlist__h6">Alimentador</h6>
          </div>
          <div className="layerlist__checkbox-div">
            <input style={visibilityStyle.check_cuadrillas} className="layerlist__checkbox" type="checkbox" id="check_cuadrillas" ref="check_cuadrillas" onClick={this.onClick} ></input>
            <h6 style={visibilityStyle.check_cuadrillas} className="layerlist__h6">Cuadrillas</h6>
          </div>
          <div className="layerlist__checkbox-div">
            <input style={visibilityStyle.check_ap_modificaciones} className="layerlist__checkbox" type="checkbox" id="check_ap_modificaciones" ref="check_ap_modificaciones" onClick={this.onClick}  ></input>
            <h6 style={visibilityStyle.check_ap_modificaciones} className="layerlist__h6">Modificaciones</h6>
          </div>

      </fieldset>
    </div>);

  }
}

export default LayerList;
