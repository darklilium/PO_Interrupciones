import React from 'react';
import ReactDOM from 'react-dom';

class LoginApp extends React.Component {
  render(){
    return <div>
      This is the login.
        <img src="images/logo_gisred500x500.png"></img>
      </div>
  }
}

ReactDOM.render(<LoginApp />, document.getElementById('myLogin'));
