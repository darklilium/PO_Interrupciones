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
       format: 'json'
     },
     success: (success) => {
       console.log('Requesting service access');
       console.log('Logging in to gisred');

       window.location.href= "gisred.html";

     },
     error: (error) => {
       console.log("You are not authorized ):");
     }
  });
  console.log('done');
}

export { genericLogin };
