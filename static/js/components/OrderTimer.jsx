import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';
import mymap from '../services/map-service';

class ReactDataGridRow extends React.Component {
  constructor(props){
    super(props);
    this.onClickRow = this.onClickRow.bind(this);

  }

  render(){
   return (
      <tr onClick={this.onClickRow}>
        <td>{this.props.id_orden}</td>
        <td>{this.props.tiempo_transcurrido}</td>
        <td>{this.props.estado}</td>
        <td>{this.props.fecha_creacion}</td>
        <td>{this.props.causa}</td>
      </tr>
    );
  }
}

class ReactDataGrid extends React.Component{
  constructor(props){
    super(props);

    this.setState = {
      interruptionsSED: [],
      interruptionsCus: []
    }
  }
  componentDidMount(){
  //  console.log(this.props.map);
  }
  render(){

    /*let row = this.state.interruptions.map((interruption, index) => {
      let ceil = Math.floor(index / 3);
      let className = (ceil == this.state.index) ? '' : 'u-hidden';
      let data = translator(interruption);
      return <ReactDataGridRow key={"inte"+ index} styleClass={className} {...data} />;
    });
    */
  return (
    <div>
    {/*Table*/}
      <table className="mytable-Wrapper__table table table-bordered" >
            <thead className="mytable-Wrapper__table-tr">
              <tr>
                <th>ID ORDEN</th>
                <th>TIEMPO TRANSCURRIDO</th>
                <th>ESTADO</th>
                <th>FECHA CREA</th>
                <th>CAUSA</th>
              </tr>
            </thead>
            <tbody>
          </tbody>
        </table>

    </div>
    );
  }
}

class OrderTimer extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return (
      <div className="wrapper_ordertimer">
        <ReactDataGrid />
      </div>
  );
  }
}
export default OrderTimer;
