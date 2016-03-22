import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';

function getCurrentInterruptions(){
  var results;

  var serviceCurrentInterr = createQueryTask({
    url: layers.read_layer_interr_clie(),
    whereClause: `1=1`
  });

  serviceCurrentInterr((map,featureSet)=>{
    console.log("Getting the results from current interruptions...");
    //console.log(featureSet);
    results = featureSet.features.map(cf => ({ ...cf }) );
      return results;
  },(errorCurrent)=>{
    results = "error";
      return results;
    console.log("Error at getting the results from current interruptions");
  });

}

export default getCurrentInterruptions();
