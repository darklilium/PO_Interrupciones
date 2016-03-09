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

       //window.location.href= "gisred.html";

     },
     error: (error) => {
       console.log("You are not authorized ):");
     }
  });

  console.log('done');
}

/*FOR GISRED APP*/

// First Div to the left that shows all the widgets that the user has.

//Widget image
class MyWidgetImage extends React.Component{
  render() {
    return <img className="MyWidgetImage" src="images/widget_icons/interrupciones.png" />;
  }
}

//Widget Content : name and description
class MyWidgetContent extends React.Component{
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Nombre</th>
            <td>this.props.name</td>
          </tr>
          <tr>
            <th>Descripción</th>
            <td>this.props.description</td>
          </tr>
          </tbody>
      </table>

    );
  }
}
// My widget object
class MyWidget extends React.Component{
  render(){
    return (
    <article className="MyWidget">
        <div className="MyWidget-container">
          <MyWidgetImage />
        </div>
        <div className="MyWidget-container">
          <MyWidgetContent />
        </div>
    </article>
    );
  }
}

class LogOut extends React.Component{
  render(){
    return (
        <div className="LogOut">
          <img className="LogOut__image" src="images/logout.png" />
        </div>
    );
  }
}

// this class has to make a list with the widgets that the user has and show them all. And also show the logout component
class MyWidgetContainer extends React.Component{
  render() {
    return (
      <section className="MyWidgetContainer">
        <MyWidget />
        <LogOut />
      </section>
    );
  }
}

// This class has to be shown when the user clicks in a widget
//  here i need to put the current widget objects from the selected widget. (it is dynamic and depends of each widget.)
class CurrentWidgetContainer extends React.Component{
  render(){
    return (
    <section className="CurrentWidgetContainer">
      <h1>Title of my current widget selected</h1>
      <p>Widget objects here</p>
    </section>
    );
  }
}

//here i need to interact with CurrentWidgetContainer to show the graphic results.
class MapContainer extends React.Component{
  render(){
    return (
    <section className="MapContainer">
      <h1>My map</h1>
    </section>
    );
  }
}


class GisredApp extends React.Component{
  render(){
    return (
      <div className="GisredApp">
        <MyWidgetContainer />
        <CurrentWidgetContainer />
        <MapContainer />
      </div>
    );
  }
}



/*FOR LOGIN APP*/
class LoginApp extends React.Component {
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

//ReactDOM.render(<LoginApp />, document.getElementById('myLogin'));
ReactDOM.render(<GisredApp />, document.getElementById('myGisred'));
