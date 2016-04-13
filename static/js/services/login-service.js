import {notifications} from '../utils/notifications';
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
         var fecha = new Date();
         var pagina = "REACT_INTERRUPCIONES_WEB";
         var modulo = "PO_INTERRUPCIONES";
      //   saveLogin(user,fecha,pagina,modulo);
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

function saveLogin(user,fecha,pagina,modulo){
    var attributes = [{
                        "F" : {},
                        "attributes" : {
                          "usuario" : "Evelyn",
                          "modulo" : "ReactPO"
                        }
                      }];



    jQuery.ajax({
       type: 'POST',
       url: 'http://gisred.chilquinta.cl:5555/arcgis/rest/services/Admin/LogAccesos/FeatureServer/1/addFeatures',
       data: attributes,
       dataType:'html',
       success: (success) => {
         console.log(success);
       },
        error: (error) => {
            console.log(error);
          notifications("Acceso no autorizado.","Login_Failed", ".notification-login");
        }
/*
  var myFeature = new esri.layers.FeatureLayer(myLayers.write_logAccess());
  console.log(myFeature);
  myFeature.applyEdits([newGraphic],null,null,callback,errorBack);
  function callback(dat){
    console.log(dat);
    console.log("registrado");
    console.log(datos);
  }

  function errorBack(Error){
    console.log("error", Error);
  }
  */
});
}


export { genericLogin };
