import React from 'react';
import ReactDOM from 'react-dom';

class LoginApp extends React.Component {
  render(){
    return (
      <div className="wrapper">
        <img className="logo" src="images/logo_gisred500x500.png" />

        <div className="login">
          <input className="login__input" id="txtUsuario" type="text" />
          <input className="login__input" id="txtPassword" type="text" />
          <input className="login__submit" id="loginBtn" type="submit" />
        </div>

        <div className="footer">
          <img className="image-chq" src="images/chq_i.png" />
          <p className="footer__p">Planificación y Gestión</p>
          <p className="footer__p">de la Información Operacional</p>
          <h6 className="footer__h6">Av. Argentina N°1 Piso 7</h6>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<LoginApp />, document.getElementById('myLogin'));
