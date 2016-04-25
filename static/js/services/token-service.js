function token(){
  return {
    read(){
      return localStorage.getItem('token');
    },
    write(tokenValue){
      localStorage.setItem('token', tokenValue);
    }
  };
}

function tokenValidator(){

  var t = localStorage.getItem('token');
  const exampleUrl = "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer?=json&token=" +t;
  const data = {
    token: t
  };
  console.log("een token validator");
  $.ajax({
    url: exampleUrl,
    dataType: 'json'
  })
  .done(isDone => {
    console.log("en token validator done", isDone);

  })
  .fail(error => {
    console.log("en token validator fail", error);

  });
}

export default token();
export {tokenValidator};
