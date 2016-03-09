import React from 'react';
import ReactDOM from 'react-dom';
import esri from './arcgis_js_api';

function genericLogin(genericAccount, username, password){
  var url = "http://gisred.chilquinta.cl:5555/arcgis/tokens/generateToken";

  console.log(genericAccount);
  console.log(username, password);

  jQuery.ajax({
     type: 'POST',
     url: url,
     data: {
       username: genericAccount.username,
       password: genericAccount.password,
       client: genericAccount.client,
       format: 'json'
     },
     success: (success) => {
       //Part 2: if the user has access , go to the next page.
        console.log("Success :) : The generic account is working, verifying the user permissions... " );
        console.log(success);

/*
        define(["esri/tasks/query"

      ], function(Query){

      });
*/
     },
     error: (error) => {
       console.log("Error :( : The main account is having some issue, please notify to the administrator ");
     }
  });

  console.log('done');
}

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
