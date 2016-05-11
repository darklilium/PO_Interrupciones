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
    let randomPicNumber = Math.floor((Math.random() * 6) + 1);
    //********Cambiar randomPicSrc para test/prod*******
    let randomPicSrc = "css/images/login_images/interrupciones_images/loginwall"+ randomPicNumber+ ".jpg"; //prod
    //let randomPicSrc = "static/css/images/login_images/interrupciones_images/loginwall"+ randomPicNumber+ ".jpg";//desarrollo
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
              <div className="aside_div">
                <img className="login_aside__img" />
                <h1 className="login_aside__h1"> Bienvenidos a GISRED PO</h1>
              </div>
              <div className="aside_div2">
                <p className="login_aside__p">Visualización de interrupciones de suministro de los clientes.<br />
                Búsquedas de órdenes, incidencias y clientes afectados.<br />
                La información contenida en este sitio se obtiene del sistema PowerOn.</p>
              </div>
          </aside>
        </div>



    );
  }
}

export default LoginApp;
