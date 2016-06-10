import React from 'react';
import mymap from '../services/map-service';
//import my_AP_Settings from '../services/ap_services/ap_settings-service';

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
    // checkbox setup n° 4
    var mapp = mymap.getMap();


    /*19/05/2016*/
    switch (check.currentTarget.id) {
      case "check_alimentador":
        var addAlimentadorLayer = setLayers().alimentadores();
        if (this.refs.check_alimentador.checked){
          mapp.addLayer(addAlimentadorLayer, 10);
          return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("gis_alimentadores"));
        break;

      case "check_cuadrillas":
        var addCuadrillasLayer = setLayers().cuadrillas();
        /*if (this.refs.check_cuadrillas.checked){
        mapp.addLayer(addCuadrillasLayer, 3);
        return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("CHQCuadrillas"));
        */
        break;

      case "check_ap_modificaciones":
        //dev build
        //let myRegionSaved = my_AP_Settings.read();
        console.log(myRegionSaved.comuna);
        var addModificacionesLayer = setLayers().ap_modificaciones("Comuna='"+myRegionSaved.comuna+"'",10);

        //prod build
        /*
        console.log(this.props.settings.comuna);
        var addModificacionesLayer = setLayers().ap_modificaciones("Comuna='"+this.props.settings.comuna+"'",10);
        */
        if (this.refs.check_ap_modificaciones.checked){
          mapp.addLayer(addModificacionesLayer, 10);
          return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("ap_modificaciones"));
      break;

      case "check_factigis_distribucion":
        var addDistribucionLayer = setLayers().factigis_distribucion("",8);
        if (this.refs.check_factigis_distribucion.checked){
          mapp.addLayer(addDistribucionLayer);
          return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("factigis_distribucion"));
      break;
      case "check_factigis_transmision":
        var addDistribucionLayer = setLayers().factigis_transmision("",8);
        if (this.refs.check_factigis_transmision.checked){
          mapp.addLayer(addDistribucionLayer);
          return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("factigis_transmision"));
      break;
      case "check_factigis_vialidad":
        var addDistribucionLayer = setLayers().factigis_vialidad("",8);
        if (this.refs.check_factigis_vialidad.checked){
          mapp.addLayer(addDistribucionLayer);
          return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("factigis_vialidad"));
      break;

      case "check_SSEE":
        var addDistribucionLayer = setLayers().gis_SSEE("",8);
        if (this.refs.check_SSEE.checked){
          mapp.addLayer(addDistribucionLayer);
          return;
        }

        mapp.graphics.clear();
        mapp.removeLayer(mapp.getLayer("gis_SSEE"));
      break;
      default:

    }
  }

  render(){
    //checkbox setup n° 3
    var visibilityStyle = {
      check_alimentador: {
        visibility: 'hidden',
        display: 'none',
        margin: '9px 0 0 0'
      },
      check_cuadrillas:{
          visibility: 'hidden',
          display: 'none',
          margin: '9px 0 0 0'
      },
      check_ap_modificaciones:{
          visibility: 'hidden',
          display: 'none',
          margin: '9px 0 0 0'
      },
      check_factigis_distribucion:{
          visibility: 'hidden',
          display: 'none',
          margin: '9px 0 0 0'
      },
      check_factigis_transmision:{
          visibility: 'hidden',
          display: 'none',
          margin: '9px 0 0 0'
      },
      check_factigis_vialidad:{
          visibility: 'hidden',
          display: 'none',
          margin: '9px 0 0 0'
      },
      check_SSEE:{
          visibility: 'hidden',
          display: 'none',
          margin: '9px 0 0 0'
      }
    };

    this.state.activeChecks.forEach(visible =>{
      // checkbox setup n°2
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
        case "check_factigis_distribucion":

          visibilityStyle.check_factigis_distribucion.visibility= 'visible';
          visibilityStyle.check_factigis_distribucion.display= 'flex';
        break;
        case "check_factigis_transmision":

          visibilityStyle.check_factigis_transmision.visibility= 'visible';
          visibilityStyle.check_factigis_transmision.display= 'flex';
        break;
        case "check_factigis_vialidad":

          visibilityStyle.check_factigis_vialidad.visibility= 'visible';
          visibilityStyle.check_factigis_vialidad.display= 'flex';
        break;
        case "check_SSEE":
          visibilityStyle.check_SSEE.visibility= 'visible';
          visibilityStyle.check_SSEE.display= 'flex';
        break;

        default:

      }

    });
    //checkbox setup n° 1
    return (
    <div className="LayerList__wrapper">
      <fieldset className="LayerList__fieldset">
        <legend className="LayerList__legend">Layers</legend>
          <div className="LayerList__checkbox-div">
            <input style={visibilityStyle.check_alimentador} className="LayerList__checkbox" type="checkbox" id="check_alimentador" ref="check_alimentador" onClick={this.onClick} ></input>
            <h6 style={visibilityStyle.check_alimentador} className="LayerList__h6">Alimentador</h6>
          </div>
          <div className="LayerList__checkbox-div">
            <input style={visibilityStyle.check_cuadrillas} className="LayerList__checkbox" type="checkbox" id="check_cuadrillas" ref="check_cuadrillas" onClick={this.onClick} ></input>
            <h6 style={visibilityStyle.check_cuadrillas} className="LayerList__h6">Cuadrillas</h6>
          </div>
          <div className="LayerList__checkbox-div">
            <input style={visibilityStyle.check_ap_modificaciones} className="LayerList__checkbox" type="checkbox" id="check_ap_modificaciones" ref="check_ap_modificaciones" onClick={this.onClick}></input>
            <h6 style={visibilityStyle.check_ap_modificaciones} className="LayerList__h6">Modificaciones</h6>
          </div>
          <div className="LayerList__checkbox-div">
            <input style={visibilityStyle.check_factigis_distribucion} className="LayerList__checkbox" type="checkbox" id="check_factigis_distribucion" ref="check_factigis_distribucion" onClick={this.onClick} ></input>
            <h6 style={visibilityStyle.check_factigis_distribucion} className="LayerList__h6">Distribucion</h6>
          </div>
          <div className="LayerList__checkbox-div">
            <input style={visibilityStyle.check_factigis_transmision} className="LayerList__checkbox" type="checkbox" id="check_factigis_transmision" ref="check_factigis_transmision" onClick={this.onClick} ></input>
            <h6 style={visibilityStyle.check_factigis_transmision} className="LayerList__h6">Transmision</h6>
          </div>
          <div className="LayerList__checkbox-div">
            <input style={visibilityStyle.check_factigis_vialidad} className="LayerList__checkbox" type="checkbox" id="check_factigis_vialidad" ref="check_factigis_vialidad" onClick={this.onClick} ></input>
            <h6 style={visibilityStyle.check_factigis_vialidad} className="LayerList__h6">Vialidad</h6>
          </div>
          <div className="LayerList__checkbox-div">
            <input style={visibilityStyle.check_SSEE} className="LayerList__checkbox" type="checkbox" id="check_SSEE" ref="check_SSEE" onClick={this.onClick} ></input>
            <h6 style={visibilityStyle.check_SSEE} className="LayerList__h6">SSEE</h6>
          </div>
      </fieldset>
    </div>);

  }
}

export default LayerList;
