var token;

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
       expiration: 1440,
       format: 'jsonp'
     },
     dataType:'html',
     success: (myToken) => {
       console.log('Requesting service access');
       console.log('Logging in to gisred');
       token = myToken;
       //console.log(token);
      window.location.href= "interrupciones.html";
    },
     error: (error) => {
       console.log("You are not authorized ):");
       console.log(error);
     }
  });
  console.log('done');
}


export { genericLogin };
export default token;
