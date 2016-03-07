// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/opsdashboard/core/ExtensionBase","dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/_base/Deferred ../../IdentityManager ../../Credential ../../request ./messageHandler ./errorMessages ./MessageReceiver ../MapWidgetProxy ../DataSourceProxy".split(" "),function(l,e,d,m,g,n,p,c,f,q,k,h){function r(a){function b(a){return c._sendMessageWithReply({functionName:"getCredential",args:{url:a}})}a&&(g.useSignInPage=!1,p.setRequestPreCallback(function(a){a.failOk=!0;return a}),g.signIn=function(a,
d){var c=new m;b(a).then(e.hitch(this,function(a){a=new n(a.credential);a.refreshToken=function(){return b(this.server).then(e.hitch(this,function(a){this.token=a.credential.token;this.expires=a.credential.expires?Number(a.credential.expires):null;this.creationTime=a.credential.creationTime;this.validity=a.credential.validity;this.onTokenChange()}))};c.callback(a)}),function(a){c.errback(a)});return c},g.setProtocolErrorHandler(function(){return!0}))}return l([q],{drawingType:{POINT:"point",LINE:"line",
POLYLINE:"polyline",FREEHAND_POLYLINE:"freehandpolyline",EXTENT:"extent",CIRCLE:"circle",POLYGON:"polygon",FREEHAND_POLYGON:"freehandpolygon"},_hostInitialized:!1,isNative:null,portalUrl:null,constructor:function(){this._dataSourceProxies={};this._mapWidgetProxies=[];c._sendMessageWithReply({functionName:"initialize"}).then(e.hitch(this,this._initializeResponseReceived)).then(e.hitch(this,this._hostReady)).then(function(){c._sendMessage({functionName:"afterInitialize"})}).otherwise(e.hitch(this,this._hostInitializationError))},
__messageReceived:function(a){switch(a.functionName.toLowerCase()){case "datasourceadded":return this._dataSourceAdded(a.args.dataSource);case "datasourceremoved":return this._dataSourceRemoved(a.args.dataSourceId);case "mapwidgetadded":return this._mapWidgetAdded(a.args.mapWidget);case "mapwidgetremoved":return this._mapWidgetRemoved(a.args.mapWidgetId);default:return this._messageReceived(a)}},_initializeResponseReceived:function(a){this.isNative=c.isNative;this._hostInitialized=!0;this.portalHelperServices=
a.helperServices;this.portalUrl=a.portalUrl;r(a.usePortalServices);this._setConfig(a.configuration);return(new d).resolve()},_isHostInitialized:function(){return this._hostInitialized},_hostReady:function(){this.hostReady();this.emit("host-ready")},hostReady:function(){},_hostInitializationError:function(a){this._hostInitialized=!1;this.hostInitializationError(a);this.emit("initialization-error",{error:a})},hostInitializationError:function(a){},getMapWidgetProxies:function(){return!this._isHostInitialized()?
(new d).reject(Error(f.hostNotReady)):this._mapWidgetProxies&&0<this._mapWidgetProxies.length?(new d).resolve(this._mapWidgetProxies):c._sendMessageWithReply({functionName:"getMapWidgets"}).then(e.hitch(this,function(a){return this._mapWidgetProxies=a.mapWidgets.map(function(a){return new k(a)},this)}))},getMapWidgetProxy:function(a){return!this._isHostInitialized()?(new d).reject(Error(f.hostNotReady)):!a?(new d).reject(Error(f.invalidArguments)):this.getMapWidgetProxies().then(function(b){for(var c=
0;c<b.length;c++)if(b[c].id===a)return b[c];return null})},_mapWidgetRemoved:function(a){for(var b=0;b<this._mapWidgetProxies.length;b++)if(this._mapWidgetProxies[b].id===a){this._mapWidgetProxies.splice(b,1);break}this.mapWidgetRemoved(a);this.emit("map-widget-removed",{mapWidgetId:a})},mapWidgetRemoved:function(a){},_mapWidgetAdded:function(a){a=new k(a);this._mapWidgetProxies.push(a);this.mapWidgetAdded(a);this.emit("map-widget-added",{mapWidgetProxy:a})},mapWidgetAdded:function(a){},getDataSourceProxies:function(){return!this._isHostInitialized()?
(new d).reject(Error(f.hostNotReady)):c._sendMessageWithReply({functionName:"getDataSources"}).then(e.hitch(this,function(a){this._dataSourceProxies={};return a.dataSources.map(function(a){var c=new h(a);return this._dataSourceProxies[a.id]=c},this)}))},getDataSourceProxy:function(a){if(!this._isHostInitialized())return(new d).reject(Error(f.hostNotReady));if(!a)return(new d).reject(Error(f.invalidArguments));var b=this._dataSourceProxies[a];return b?(new d).resolve(b):c._sendMessageWithReply({functionName:"getDataSource",
args:{dataSourceId:a}}).then(e.hitch(this,function(a){var b=new h(a.dataSource);return this._dataSourceProxies[a.dataSource.id]=b}))},_dataSourceRemoved:function(a){for(var b=0;b<this._dataSourceProxies.length;b++)if(this._dataSourceProxies[b].id===a){this._dataSourceProxies.splice(b,1);break}this.dataSourceRemoved(a);this.emit("data-source-removed",{dataSourceId:a})},dataSourceRemoved:function(a){},_dataSourceAdded:function(a){var b=new h(a);this._dataSourceProxies[a.dataSourceId]=b;this.dataSourceAdded(b);
this.emit("data-source-added",{dataSourceProxy:b})},dataSourceAdded:function(a){}})});