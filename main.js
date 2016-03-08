import React from 'react';
import ReactDOM from 'react-dom';

class LoginApp extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    var genericAccount = {
        username: 'vialactea\\ehernanr',
        password:'Chilquinta5',
        client: 'requestip'
      };
    var userValue = this.refs.username.value;
    var passValue = this.refs.password.value;

    genericLogin(genericAccount, userValue, passValue);

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


function genericLogin(genericAccount, username, password){
  console.log(username + " " + password + " "+ genericAccount.username + " " + genericAccount.password );
  var url = "http://143.47.57.116/arcgis/tokens/";

var jQuery = $.noConflict();
jQuery.ajax({
     type: 'GET',
     url: url,
     data: {
       username: genericAccount.username,
       password: genericAccount.password,
       client: genericAccount.client,
       format: 'json'
     },
     success: (success) =>{
       console.log("here i need to call to a function for requesting service access");

     },
     error: (error) => {
          console.log("sumthing happen ):");
     }
  });
}


//console.log(genericAccount.genericUser);
