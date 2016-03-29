
function getInfoTemplate(){
  return {
    getSubFailure(){
      let chqSubInfoTemp= new esri.InfoTemplate();
      chqSubInfoTemp.setTitle("<b>Codigo Subestación: ${ARCGIS.DBO.SED_006.codigo}</b>");

      let chqSubInfoContent =
      "<div style=padding-top: 10px;>ID Orden: ${ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Alimentador: ${ARCGIS.DBO.SED_006.alimentador}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Causa: ${  ARCGIS.DBO.POWERON_ORDENES.causa}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Comentario: ${ARCGIS.DBO.POWERON_ORDENES.comentario}<br></div>";

      chqSubInfoTemp.setContent(chqSubInfoContent);
      return chqSubInfoTemp;
    },
    getIsolatedNisFailure(){

      let chqIsolatedNisTemp= new esri.InfoTemplate();
      chqIsolatedNisTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqIsolatedNisInfoContent =
      "<div style=padding-top: 10px;>ID Orden: ${ARCGIS.dbo.POWERON_CLIENTES.id_orden}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>ID Incidencia: ${ARCGIS.dbo.POWERON_CLIENTES.id_incidencia}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Causa: ${ARCGIS.DBO.POWERON_ORDENES.causa}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Comentario: ${ARCGIS.DBO.POWERON_ORDENES.comentario}<br></div>";

      chqIsolatedNisTemp.setContent(chqIsolatedNisInfoContent);
      return chqIsolatedNisTemp;
    },
    getNisInfo(){

      let chqNisInfoTemp= new esri.InfoTemplate();
      chqNisInfoTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqNisInfoContent =
      "<div style=padding-top: 10px;>Tipo Suministro: ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nm_tipo_suministro}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Categoría: ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.categoria}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
        "<div style=padding-top: 10px;>Dirección: ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Comuna: ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nm_comuna}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>";

      chqNisInfoTemp.setContent(chqNisInfoContent);
      return chqNisInfoTemp;
    }

  }
}

export default getInfoTemplate();
