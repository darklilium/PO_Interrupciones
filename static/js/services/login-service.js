

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
       console.log('Requesting service access');
       console.log('Logging in to gisred');
       console.log('writing token into system');
       token.write(myToken);
        window.location.href = "interrupciones.html";
    },
     error: (error) => {
       console.log("You are not authorized ):");
       console.log(error);
       loginNotification("You are not authorized ):","loginError", ".notification notification-login");
     }
  });
  console.log('done');
}
function loginNotification(message, type, classNeim){

  $(classNeim)
    .empty()
    .css('visibility','visible')
    .append('<strong style="padding-left: 2em;">'+message+'</strong>');

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
        break;
      */
      case loginError:
        $(classNeim).css('background-color','lightcoral');
        break;
      default:
      break;
}
}

export { genericLogin };
