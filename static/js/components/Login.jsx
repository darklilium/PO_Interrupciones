import React from 'react';
import token from '../services/token-service';
import { genericLogin } from '../services/login-service';
import {notifications} from '../utils/notifications';
class LoginApp extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount(){
    //change the loginwall dinamically
    let randomPicNumber = Math.floor((Math.random() * 5) + 1);
    let randomPicSrc = "/images/login_images/loginwall"+ randomPicNumber+ ".png";
    $('.login_wrapper').css("background-image", "url("+randomPicSrc+")");
  }

  onClick(){

    var userValue = this.refs.username.value;
    var passValue = this.refs.password.value;

    if (userValue=="" || passValue==""){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    if (userValue.includes('vialactea\\')){
      genericLogin(userValue, passValue, token);
    }else{
      userValue =  'vialactea\\'+this.refs.username.value;
      genericLogin(userValue, passValue, token);
    }

  }

  render(){
    return (
        <div className="login_wrapper_content">
          <article className="login_article">
            <input className="login__input" ref="username" type="text" placeholder="miusuario" />
            <input className="login__input" ref="password" type="password" placeholder="password" />
            <input className="login__submit" type="submit" onClick={this.onClick} defaultValue="Entrar" />

          </article>
          <aside className="login_aside">
              <img className="login_aside__img" src="images/logo_gisred500x500.png" />
              <h1 className="login_aside__h1"> Bienvenidos a GISRED PO</h1>
              <p className="login_aside__p">Página dedicada a la visualización de interrucpciones de suministro de los clientes.<br />
              Podrás realizar busquedas de órdenes, incidencias y clientes afectados.<br />
              La información contenida en este sitio se obtiene del sistema PowerOn.</p>
          </aside>
        </div>



    );
  }
}

export default LoginApp;
