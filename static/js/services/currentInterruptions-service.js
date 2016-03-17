import React from 'react';
import ReactDOM from 'react-dom';
import token from '../services/token-service';
import layers from '../services/layers-service';

function currentInterruptions(){
    var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_poOrdenes());
    var qInterruptions = new esri.tasks.Query();
    qInterruptions.where = "1=1";
    qInterruptions.returnGeometry = true;
    qInterruptions.outFields=["*"];
    //this guy returns a featureSet with all the interruptions in an object
    qTaskInterruptions.execute(qInterruptions, nowResults(), nowError());
}

function nowResults(currentFs){
  console.log("Getting the results from current interruptions...");
  var results = currentFs.features.map(cf => ({ ...cf }) );
  return results;

}

function nowError(){
  var error = "error";
  return error;
  console.log("Error at getting the results from current interruptions");
}
