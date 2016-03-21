import token from '../services/token-service';
import layers from '../services/layers-service';

function getCurrentInterruptions(){
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_interr_clie());
  var qInterruptions = new esri.tasks.Query();
    qInterruptions.where = "1=1";
    qInterruptions.returnGeometry = true;
    qInterruptions.outFields=["*"];
    //this guy returns a featureSet with all the interruptions in an object
    qTaskInterruptions.execute(qInterruptions, nowResults, nowError);
}

function nowResults(featureSet){
  console.log("Getting the results from current interruptions...");
  console.log(featureSet);

}

function nowError(){
  console.log("Error at getting the results from current interruptions");
}


export default nowResults();
