

function genericLogin(user, pass, token){
  var url = "http://gisred.chilquinta.cl:5555/arcgis/tokens/generateToken";
  console.log(user, pass);

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
         console.log('Logging in to gisred');
         console.log('writing token into system');
         token.write(myToken);
         notifications("Logging in...","loginSucess");
         window.location.href = "interrupciones.html";
       } else {
         //alert("Login incorrecto, intente nuevamente.");
         notifications("Login incorrecto, intente nuevamente","loginIncorrect");
       }

    },
     error: (error) => {
       console.log("You are not authorized ):");
       console.log(error);
       notifications("Acceso no autorizado.","loginError");
     }
  });
  console.log('done');
}
function notifications(message, type){
  switch (type) {
    /*  case 'customer':
        $('.notificationBox').css('background-color','lightgreen');
        break;
      case 'SED':
        $('.notificationBox').css('background-color','lightcoral');
        break;
      case 'OK':
        $('.notificationBox').css('background-color','powderblue');
        break;
      case 'NoSED':
        $('.notificationBox').css('background-color','red');
        break;
      case 'info':
        $('.notificationBox').css('background-color','yellow');
        break;
      case 'Error':
        $('.notificationBox').css('background-color','blue');
          .append('<strong style="padding-left: 2em;">'+message+'</strong>');
        break;
      */
      case 'loginError':
      $('.notification-login')
        .empty()
        .css('visibility','visible')
        .append('<h4 style="padding-left: 3.5em;">'+message+'</h4>');

        console.log("login error");
        break;

      case 'loginIncorrect':
       $('.notification-login')
        .empty()
        .css('visibility','visible')
        .append('<h4 style="padding-left: 3.5em;">'+message+'</h4>');
        console.log("login inc");
         break;

      case 'loginSucess':
      $('.notification-login')
        .empty()
        .css('visibility','visible')
        .append('<h4 style="padding-left: 3.5em;">'+message+'</h4>');
        console.log("login inc");
        console.log("login su");
        break;


      default:
      break;
}
}

export { genericLogin };
