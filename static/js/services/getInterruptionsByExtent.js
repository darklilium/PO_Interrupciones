import React from 'react';
import layers from '../services/layers-service';
import mymap from '../services/map-service';

var allCustomers = [];
function getClieInterruptionsByExtent(extent){
/*  To Do: Search interruptions for clients and SED with map extent and show'em all.
*/
  //search orders with current extent in customers.

  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_interr_clie());
  var qInterruptions = new esri.tasks.Query();
  qInterruptions.where = "1=1";
  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = extent;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
  //this guy returns a featureSet with all the interruptions in an object
  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
      //console.log("for customers",featureSet.features.length);
      return featureSet.features;
  }, (Errorq)=>{
    console.log(Errorq);
      return 0;
  });

}

function getSEDByExtent(extent){
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_interr_sed());
  var qInterruptions = new esri.tasks.Query();
  qInterruptions.where = "1=1";
  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = extent;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
  //this guy returns a featureSet with all the interruptions in an object
  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
      //console.log("for sed", featureSet.features.length);
      return featureSet.features;

  }, (Errorq)=>{
    console.log(Errorq);
    return 0;
  });

}

function saveResultsClass(extent){
  var myResults = {
    nisResults: getClieInterruptionsByExtent(extent),
    sedResults: getSEDByExtent(extent)
  };
  console.log(myResults);
}


export {saveResultsClass};
