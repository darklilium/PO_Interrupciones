import layers from '../services/layers-service';
import myinfotemplate from '../services/infotemplates-service';
import mymap from '../services/map-service';


function clickSearch(mapPoint){

  var rectangle = new esri.geometry.Polygon(new esri.SpatialReference(mapPoint.spatialReference.wkid));
  rectangle.addRing(createRectangle(mapPoint,20));
  console.log(rectangle);
  var queryTask = new esri.tasks.QueryTask(layers.read_layer_interr_sed());
  var query = new esri.tasks.Query;
  query.spatialRelationship=esri.tasks.Query.SPATIAL_REL_CONTAINS;
  query.geometry = rectangle;
  query.outFields=['ARCGIS.DBO.SED_006.codigo'];
 query.returnGeometry = true;
  queryTask.execute(query,(featureSet)=>{
      console.log("found something here...what is it?");
      if(featureSet.features.length!=0){
        console.log(featureSet.features);
      }else console.log("nothing");

  },(error)=>{
    console.log("no encontre na" , error);
  });

 }

 function createRectangle(mapPoint,delta){
   	var arrayOfPoints = [];
				arrayOfPoints[0] = new esri.geometry.Point(mapPoint.x-delta,mapPoint.y-delta,mapPoint.spatialReference);
				arrayOfPoints[1] = new esri.geometry.Point(mapPoint.x-delta,mapPoint.y+delta,mapPoint.spatialReference);
				arrayOfPoints[2] = new esri.geometry.Point(mapPoint.x+delta,mapPoint.y+delta,mapPoint.spatialReference);
				arrayOfPoints[3] = new esri.geometry.Point(mapPoint.x+delta,mapPoint.y-delta,mapPoint.spatialReference);
				arrayOfPoints[4] = new esri.geometry.Point(mapPoint.x-delta,mapPoint.y-delta,mapPoint.spatialReference);

				return arrayOfPoints;
	}

 export default clickSearch;
