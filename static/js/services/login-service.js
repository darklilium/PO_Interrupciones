import {notifications} from '../utils/notifications';
import myLayers from './layers-service';
import token from '../services/token-service';
import env from '../services/config';
import {getTodaysDate} from '../utils/milliSecondsToDate';

function genericLogin(user, pass, token){
  const url = myLayers.read_tokenURL();

  const data = {
    username: user,
    password: pass,
    client: 'requestip',
    expiration: 10080,
    format: 'jsonp'
  };

  $.ajax({
    method: 'POST',
    url: url,
    data: data,
    dataType: 'html'
  })
  .done(myToken => {
    if(myToken.indexOf('Exception') >= 0) {
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    if (myToken.indexOf('error') >= 0){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }

    console.log('Requesting service access');
    console.log('Logging in to gisred-interruptions');
    //console.log('writing token into system');
    token.write(myToken);

    const page = env.SAVEAPPLICATIONMODULE
    const module = env.SAVEAPPLICATIONNAME;

    notifications("Logging in...","Login_Success", ".notification-login");
    window.location.href = "interrupciones.html";

    saveLogin(user,page,module,myToken);
  })
  .fail(error => {
    console.log("You are not authorized ):");
    console.log(error);
    notifications("Acceso no autorizado.","Login_Failed", ".notification-login");
  });

  console.log('done');
}

function saveLogin(user,page,mod, tkn){

  const data = {
    f: 'json',
    adds: JSON.stringify([{ attributes: { "usuario": user, "pagina": page, "modulo": mod, fecha: getTodaysDate()  }, geometry: {} }]),
    token: tkn
  };

  jQuery.ajax({
    method: 'POST',
    url: "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Admin/LogAccesos/FeatureServer/1/applyedits",
    dataType:'html',
    data: data
  })
  .done(d =>{
    console.log(d,"pase");
  })
  .fail(f=>{
    console.log(f,"no pase")
  });
}

export { genericLogin };
