import {notifications} from '../utils/notifications';
import myLayers from './layers-service';
import token from '../services/token-service';

function genericLogin(user, pass, token){
  const url = myLayers.read_tokenURL();

  const data = {
    username: user,
    password: pass,
    client: 'requestip',
    expiration: 1440,
    format: 'jsonp'
  };

  $.ajax({
    method: 'POST',
    url: url,
    data: data,
    dataType: 'html'
  })
  .done(myToken => {
    if(myToken.indexOf('Exception') >= 0){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    console.log(myToken);
    console.log('Requesting service access');
    console.log('Logging in to gisred-interruptions');
    console.log('writing token into system');
    token.write(myToken);

    const page = "REACT_INTERRUPCIONES_WEB";
    const module = "PO_INTERRUPCIONES";

    notifications("Logging in...","Login_Sucess", ".notification-login");
    window.location.href = "interrupciones.html";

    saveLogin(user,page,module);
  })
  .fail(error => {
    console.log("You are not authorized ):");
    console.log(error);
    notifications("Acceso no autorizado.","Login_Failed", ".notification-login");
  });

  console.log('done');
}

function saveLogin(user,page,module){

  const data = {
    f: 'json',
    adds: JSON.stringify([{ attributes: { "usuario": user, "pagina": page, "module": module  }, geometry: {} }])
  };

  jQuery.ajax({
    method: 'POST',
    url: myLayers.write_logAccess(),
    data: data,
    dataType:'json',
    success: (success) => {
      console.log(success);
      console.log("pase");
    },
    error: (error) => {
      console.log(error);
      console.log("no pase");
    }
  });
}

export { genericLogin };
