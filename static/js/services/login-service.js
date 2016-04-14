import {notifications} from '../utils/notifications';
import myLayers from './layers-service';
import token from '../services/token-service';

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
         var fecha = new Date();
         var pagina = "REACT_INTERRUPCIONES_WEB";
         var modulo = "PO_INTERRUPCIONES";
         saveLogin();
        // window.location.href = "interrupciones.html";
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

function saveLogin(){


//refs:
//normal: return serviceURL + "Admin/LogAccesos/FeatureServer/1/applyEdits
//my url:  return serviceURL + "Admin/LogAccesos/FeatureServer/1/applyEdits?token=" + token.read();
var data = {
  adds: [{
    attributes: {
      "usuario": "Evelyn4"
    },
    geometry: {}
  }]
};


  jQuery.ajax({
    type: 'POST',
    url: myLayers.write_logAccess(),
    data: JSON.stringify(data),
    dataType:'jsonp',
    success: (success) => {
      console.log(success);
      console.log("pase");
    },
    error: (error) => {
      console.log(error);
      console.log("no pase");
    }
  });


/*
  var data = {
    "usuario": "Evelyn4"
  }

  var graphic = new esri.Graphic(null, null, data, null);
  var mylayer = new esri.layers.FeatureLayer(myLayers.write_logAccess());
  mylayer.applyEdits([graphic], null, null, function (add, update, del) {
   array.forEach(add, function (a) {
    console.log(a.status);
   });
  }, function (error) {
   console.log(error);
  });
*/
}


export { genericLogin };
