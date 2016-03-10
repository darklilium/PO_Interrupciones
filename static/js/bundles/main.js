import React from 'react';
import ReactDOM from 'react-dom';

function genericLogin(user, pass){
  var url = "http://gisred.chilquinta.cl:5555/arcgis/tokens/generateToken";
  console.log(user, pass);

  jQuery.ajax({
     type: 'POST',
     url: url,
     data: {
       username: user,
       password: pass,
       client: 'requestip',
       format: 'json'
     },
     success: (success) => {
       console.log('Requesting service access');
       console.log('Logging in to gisred');

       window.location.href= "gisred.html";

     },
     error: (error) => {
       console.log("You are not authorized ):");
     }
  });
  console.log('done');
}

/*FOR LOGIN APP*/
class LoginApp extends React.Component {
/*
  propTypes(){
    username: React.PropTypes.string.isRequired;
    password: React.PropTypes.string.isRequired;
  }
*/
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    var userValue = this.refs.username.value;
    var passValue = this.refs.password.value;

    genericLogin(userValue, passValue);
  }

  render(){
    return (
      <div className="wrapper">
        <img className="logo" src="images/logo_gisred500x500.png" />

        <div className="login">
          <input className="login__input" ref="username" type="text" />
          <input className="login__input" ref="password" type="password" />
          <input className="login__submit" type="submit" onClick={this.onClick} />
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
