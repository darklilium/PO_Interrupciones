
import React from 'react';
import ReactDOM from 'react-dom';

class LoginApp extends React.Component{
  render(){
    return <div className="wrapper">
            <img className="wrapper__ImageLogo" src="images/logo_gisred500x500.png"></img>
            <div className="wrapper__Login">
              <input className="login__Inputs" id="txtUsuario" type="text"  />
              <input className="login__Inputs" id="txtPassword" type="text" />
              <input className="login__Submits" id="LoginBtn" type="submit"/>
            </div>

             <div className="wrapper__Footer">
               <img className="wrapper__ImageChq" src="images/chq_i.png"></img>
                <p className="wrapper__Footer__p">Planificación y Gestión</p><p className="wrapper__Footer__p">de la Información Operacional</p>
                <h6 className="wrapper__Footer__h6">Av. Argentina N°1 Piso 7</h6>
             </div>
          </div>;
  }
}

ReactDOM.render(<LoginApp />, document.getElementById('myLogin'));
