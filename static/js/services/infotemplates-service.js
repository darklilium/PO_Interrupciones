
function getInfoTemplate(){
  return {
    getSubFailure(){
      let chqSubInfoTemp= new esri.InfoTemplate();
      chqSubInfoTemp.setTitle("<b>Codigo Subestación: ${ARCGIS.DBO.SED_006.codigo}</b>");

      let chqSubInfoContent =
      "<div style=padding-top: 10px;>ID Orden: ${ARCGIS.DBO.POWERON_ORDENES.id_orden}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Alimentador: ${ARCGIS.DBO.SED_006.alimentador}<br></div>";
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
      "<div style=padding-top: 10px;>Causa: ${ARCGIS.DBO.POWERON_ORDENES.causa}<br></div>";

      chqIsolatedNisTemp.setContent(chqIsolatedNisInfoContent);
      return chqIsolatedNisTemp;
    }
  }
}

export default getInfoTemplate();
