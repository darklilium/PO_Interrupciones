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
     }
  });
  console.log('done');
}

export { genericLogin };
