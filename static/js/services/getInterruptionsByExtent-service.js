import React from 'react';
import layers from '../services/layers-service';
import mymap from '../services/map-service';

/**
 *  callback is a function that will do what we need with the result of the
 *  asynchronous call
 */
function getClieInterruptionsByExtent(extent, callback){
/*  To Do: Search interruptions for clients and SED with map extent and show'em all.
*/
  //search orders with current extent in customers.

  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_interr_clie());
  var qInterruptions = new esri.tasks.Query();
  qInterruptions.where = "1=1";
  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.groupByFields = ['ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden']
  qInterruptions.geometry = extent;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing interruptions nis by extent");
      return 0;
  });

}

function getSEDByExtent(extent, callback){
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_interr_sed());
  var qInterruptions = new esri.tasks.Query();
  qInterruptions.where = "1=1";
  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = extent;
  qInterruptions.groupByFields = ['ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden'];
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
  //this guy returns a featureSet with all the interruptions in an object
  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    //console.log("for sed", featureSet);
    callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing interruptions sed by extent");
    return 0;
  });

}

export {getClieInterruptionsByExtent,getSEDByExtent};
