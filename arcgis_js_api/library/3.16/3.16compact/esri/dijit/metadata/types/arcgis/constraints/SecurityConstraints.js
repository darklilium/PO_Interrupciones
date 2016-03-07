// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/arcgis/constraints/templates/SecurityConstraints.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'SecConsts\',minOccurs:0,showHeader:false"\x3e\r\n    \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'useLimit\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.constraints.useLimit}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputTextArea"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e  \r\n    \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n      data-dojo-props\x3d"target:\'class\',minOccurs:1,showHeader:false"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'ClasscationCd\',minOccurs:1,showHeader:false"\x3e\r\n        \x3cdiv style\x3d"margin-top:8px;"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute"\r\n          data-dojo-props\x3d"target:\'value\',minOccurs:1,label:\'${i18nArcGIS.codelist.MD_ClassificationCode}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputSelectCode"\r\n            data-dojo-props\x3d"codelistType:\'MD_ClassificationCode\'"\x3e\r\n          \x3c/div\x3e          \r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e    \r\n    \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'classSys\',minOccurs:0,label:\'${i18nArcGIS.constraints.security.classSys}\'"\x3e\r\n    \x3c/div\x3e\r\n    \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'userNote\',minOccurs:0,label:\'${i18nArcGIS.constraints.security.userNote}\'"\x3e\r\n    \x3c/div\x3e\r\n    \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'handDesc\',minOccurs:0,label:\'${i18nArcGIS.constraints.security.handDesc}\'"\x3e\r\n    \x3c/div\x3e\r\n    \r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/arcgis/constraints/SecurityConstraints","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../base/Descriptor dojo/text!./templates/SecurityConstraints.html".split(" "),function(a,b,c,d,e,f){a=a(e,{templateString:f});c("extend-esri")&&b.setObject("dijit.metadata.types.arcgis.constraints.SecurityConstraints",a,d);return a});