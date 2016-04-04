import React from 'react';
import layers from '../services/layers-service';
import mymap from '../services/map-service';


function getInterruptionsByExtent(extent){
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
      console.log("for customers",featureSet.features.length);
      //then get the SED orders if theres any.
      if (featureSet.features.length==0) {
        console.log("No for customers, verifying in SED orders...");
        //verify into SED.

        getSEDByExtent(featureSet, extent);
      }else{
        getSEDByExtent(featureSet, extent);
      }

  }, (Errorq)=>{
    console.log(Errorq);
  });

}

function getSEDByExtent(featuresFound, extent){
//  console.log(featuresFound);
  var allOfThem = {
    customers: featuresFound
  };
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_interr_sed());
  var qInterruptions = new esri.tasks.Query();
  qInterruptions.where = "1=1";
  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = extent;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
  //this guy returns a featureSet with all the interruptions in an object
  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
      console.log("for sed", featureSet.features.length);

      //then get the SED orders if theres any.
      if (featureSet.features.length==0) {
        console.log("no hay ");
        allOfThem.seds= featureSet;
        getEverything(allOfThem);
      }else{
        allOfThem.seds= featureSet;
        getEverything(allOfThem);
      }

  }, (Errorq)=>{
    console.log(Errorq);
  });

}

function getEverything(all){
  return all;
}
export {getInterruptionsByExtent, getEverything};
