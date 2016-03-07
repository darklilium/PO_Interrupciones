// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/PluginAnalysisLayers","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/promise/all dojo/has ../../kernel".split(" "),function(e,b,f,k,g,h){var d=e(null,{constructor:function(a){b.mixin(this,a)},fetchData:function(){this._portal=this.parent._portal;var a;return this._fetchGroups().then(b.hitch(this,function(c){a=f.map(c||[],function(a){if(a)return'group:"'+a.id+'"'}).join(" OR ");return this._fetchGroupItems(a)}))},_fetchGroup:function(a,c){this._groups=this._groups||
[];return this._groups[a]||this._portal.queryGroups(c,!0).then(b.hitch(this,function(c){0<c.total&&c.results&&(this._groups[a]=c.results);return this._groups[a]||[]}))},_fetchGroupItems:function(a,c){var b='(type:"Map Service" OR type:"Feature Service") typekeywords:"Analysis Ready" ('+a+")"+(c?" "+c:"");this._portal.user.demographics||(b+=' -typekeywords:"Requires Credits"');return this.parent._fetchItems(b)},_fetchGroups:function(){return this._fetchEsriAnalysisLayers()},_fetchEsriAnalysisLayers:function(){var a;
this._portal&&this._portal.livingAtlasGroupQuery&&(a=this._portal.livingAtlasGroupQuery.replace('title:"Featured Maps And Apps"','title:"Living Atlas Analysis Layers"'));return this._fetchGroup("esriAnalysisLayers",{q:a,num:100,start:0}).then(b.hitch(this,function(a){return a}))}});b.mixin(d,{add:function(a,c){if(!a.plugIn){var b=c||{};b.parent=a;a.plugIn=new d(b)}},remove:function(a){a.plugIn&&(a.plugIn.destroy(),delete a.plugIn)}});g("extend-esri")&&b.setObject("dijit.analysis.PluginAnalysisLayers",
d,h);return d});