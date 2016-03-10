console.log('i am right here tee hee');

/*FOR GISRED APP*/
import React from 'react';
import ReactDOM from 'react-dom';

// First Div to the left that shows all the widgets that the user has.
//Widget image
class MyWidgetImage extends React.Component{
  render() {
    return <img className="MyWidgetImage" src="../images/widget_icons/interrupciones.png" />;
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
// this class is for the logout button.
class LogOut extends React.Component{
  render(){
    return (
        <div className="LogOut">
          <img className="LogOut__image" src="../images/logout.png" />
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

//this is my main component for the website
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

ReactDOM.render(<GisredApp />, document.getElementById('myGisred'));
