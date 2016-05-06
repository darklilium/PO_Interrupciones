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
      <div className="main">
          <div className="wrapper_login">
            <article className="login">
              <input className="login__input" ref="username" type="text" placeholder="miusuario" />
              <input className="login__input" ref="password" type="password" placeholder="password" />
              <input className="login__submit" type="submit" onClick={this.onClick} defaultValue="Entrar" />
              <div className="notification notification-login"></div>
            </article>

            <aside className="aside_login">
              <div className="aside_login__div">
                <img className="aside_login__div__img" src="images/logo_gisred500x500.png" />
                <h1 className="aside_login__div__h1">Bienvenidos a GISRED PO</h1>
                <p className="aside_login__div__p">Página dedicada a la visualización de interrucpciones de suministro de los clientes.<br />
                Podrás realizar busquedas de órdenes, incidencias y clientes afectados.<br />
                La información contenida en este sitio se obtiene del sistema Poweron.</p>
              </div>
            </aside>
          </div>

        <footer className="footer">
          <div className="footer__div">
            <p className="footer__div__p">&copy; 2016 Planificación y Gestión de la Información Operacional</p>
            <hr/>
            <img className="footer__imageChq" src="images/chq_i.png" />
          </div>
        </footer>

      </div>
    );
  }
}

export default LoginApp;
