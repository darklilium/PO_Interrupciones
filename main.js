
import React from 'react';
import ReactDOM from 'react-dom';

class LoginApp extends React.Component {
  render(){
    return <div className="Container">
            <div className="Login">
              <img id="imgLogin" src="images/logo_gisred500x500.png" width="150px" height="150px"></img>
              <input id="txtUsuario" type="text"  />
              <input id="txtPassword" type="text" />
              <input id="LoginBtn" type="submit"/>
            </div>

             <div className="Footer">
              <h4>Planificación y Gestión de la Información Operacional</h4>
              <h6>Av. Argentina N°1 Piso 7</h6>
             </div>
          </div>;
  }
}

ReactDOM.render(<LoginApp />, document.getElementById('myLogin'));
