import layers from '../services/layers-service';
import myinfotemplate from '../services/infotemplates-service';
import createQueryTask from '../services/createquerytask-service';
import {relatedNISperSED} from '../services/nis-location-service';
import {makeTrail} from '../services/nis-location-service';
import mymap from '../services/map-service';

function clickSearch(element, type){
  var map = mymap.getMap();
//console.log(arguments);
  if(type=='SED'){
    //this fx doesnt add elements to the graphiclayer. Direct to the map graphiclayer (by default)
    makeTrail(element);
    relatedNISperSED(element);
  }else{
    //for nis , not defined yet.
  }
}


 export default clickSearch;
