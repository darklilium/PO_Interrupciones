// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/TimeExtent",["dojo/_base/declare","dojo/_base/lang","dojo/has","./kernel"],function(l,m,n,p){var k=l(null,{declaredClass:"esri.TimeExtent",constructor:function(a){if(1<arguments.length)this._create(arguments[0],arguments[1]);else if(a)if(m.isArray(a)){var c=a[0],b=a[1];this.startTime=null===c||"null"===c?null:new Date(c);this.endTime=null===b||"null"===b?null:new Date(b)}else a instanceof Date&&this._create(a,null)},offset:function(a,c){var b=new k,d=this.startTime,e=this.endTime;d&&
(b.startTime=this._getOffsettedDate(d,a,c));e&&(b.endTime=this._getOffsettedDate(e,a,c));return b},intersection:function(a){return this._intersection(this,a)},toJson:function(){var a=[],c=this.startTime;a.push(c?c.getTime():"null");c=this.endTime;a.push(c?c.getTime():"null");return a},_create:function(a,c){this.startTime=a?new Date(a.getTime()):null;this.endTime=c?new Date(c.getTime()):null},_refData:{esriTimeUnitsMilliseconds:{getter:"getUTCMilliseconds",setter:"setUTCMilliseconds",multiplier:1},
esriTimeUnitsSeconds:{getter:"getUTCSeconds",setter:"setUTCSeconds",multiplier:1},esriTimeUnitsMinutes:{getter:"getUTCMinutes",setter:"setUTCMinutes",multiplier:1},esriTimeUnitsHours:{getter:"getUTCHours",setter:"setUTCHours",multiplier:1},esriTimeUnitsDays:{getter:"getUTCDate",setter:"setUTCDate",multiplier:1},esriTimeUnitsWeeks:{getter:"getUTCDate",setter:"setUTCDate",multiplier:7},esriTimeUnitsMonths:{getter:"getUTCMonth",setter:"setUTCMonth",multiplier:1},esriTimeUnitsYears:{getter:"getUTCFullYear",
setter:"setUTCFullYear",multiplier:1},esriTimeUnitsDecades:{getter:"getUTCFullYear",setter:"setUTCFullYear",multiplier:10},esriTimeUnitsCenturies:{getter:"getUTCFullYear",setter:"setUTCFullYear",multiplier:100}},_intersection:function(a,c){if(a&&c){var b=a.startTime,d=a.endTime,e=c.startTime,f=c.endTime,b=b?b.getTime():-Infinity,e=e?e.getTime():-Infinity,d=d?d.getTime():Infinity,f=f?f.getTime():Infinity,g,h;e>=b&&e<=d?g=e:b>=e&&b<=f&&(g=b);d>=e&&d<=f?h=d:f>=b&&f<=d&&(h=f);if(!isNaN(g)&&!isNaN(h))return b=
new k,b.startTime=-Infinity===g?null:new Date(g),b.endTime=Infinity===h?null:new Date(h),b}return null},_getOffsettedDate:function(a,c,b){var d=this._refData;a=new Date(a.getTime());c&&b&&(d=d[b],a[d.setter](a[d.getter]()+c*d.multiplier));return a}});n("extend-esri")&&(p.TimeExtent=k);return k});