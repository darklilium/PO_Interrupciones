import React from 'react';
import token from '../services/token-service';
import { genericLogin } from '../services/login-service';

class LoginApp extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    var userValue = "vialactea\\"+this.refs.username.value;
    var passValue = this.refs.password.value;

    genericLogin(userValue, passValue, token);
  }

  render(){
    return (
      <div className="wrapper">
        <img className="logo" src="images/logo_gisred500x500.png" />

        <div className="login">
          <input className="login__input" ref="username" type="text" placeholder="miusuario" defaultValue="ehernanr"  />
          <input className="login__input" ref="password" type="password" placeholder="password" defaultValue="Chilquinta5" />
          <input className="login__submit" type="submit" onClick={this.onClick} defaultValue="Entrar" />
        </div>

        <div className="footer">
          <img className="footer-image-chq" src="images/chq_i.png" />
          <p className="footer__p">Planificación y Gestión de la Información Operacional</p>
          <h6 className="footer__p-br">Av. Argentina N°1 Piso 7</h6>
        </div>
        <div className="notification notification-login"></div>
      </div>
    );
  }
}

export default LoginApp;
