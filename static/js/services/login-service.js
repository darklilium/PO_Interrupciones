import {notifications} from './notifications-service';
import myLayers from './layers-service';

function genericLogin(user, pass, token){
  var url = myLayers.read_tokenURL();

  var data = {
    username: user,
    password: pass,
    client: 'requestip',
    expiration: 1440,
    format: 'jsonp'
  };

  jQuery.ajax({
     type: 'POST',
     url: url,
     data: data,
     dataType:'html',
     success: (myToken) => {

       if (myToken.search("Exception") == -1) {
         console.log(myToken);
         console.log('Requesting service access');
         console.log('Logging in to gisred-interruptions');
         console.log('writing token into system');
         token.write(myToken);
         notifications("Logging in...","Login_Sucess", ".notification-login");
         window.location.href = "interrupciones.html";
       } else {
         notifications("Login incorrecto, intente nuevamente.","Login_Error",".notification-login");
       }

    },
     error: (error) => {
       console.log("You are not authorized ):");
       console.log(error);
       notifications("Acceso no autorizado.","Login_Failed", ".notification-login");
     }
  });
  console.log('done');
}

export { genericLogin };
