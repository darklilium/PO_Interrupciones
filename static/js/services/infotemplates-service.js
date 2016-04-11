
function getInfoTemplate(){
  return {
    getSubFailure(){
      let chqSubInfoTemp= new esri.InfoTemplate();
      chqSubInfoTemp.setTitle("<b>SED: ${ARCGIS.DBO.SED_006.codigo}</b>");
      //var tipo_estado = ${'ARCGIS.DBO.SED_006.codigo'};
    //  console.log(tipo_estado);
      let chqSubInfoContent =
      "<div style=padding-top: 10px;>ID Orden: ${ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>ID Incidencia: ${ARCGIS.DBO.POWERON_ORDENES.id_incidencia}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Alimentador: ${ARCGIS.DBO.SED_006.alimentador}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Causa: ${ARCGIS.DBO.%view_tiempo_order_po_3.causa}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Comentario: ${ARCGIS.DBO.%view_tiempo_order_po_3.comentario}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Estado: ${ARCGIS.DBO.%view_tiempo_order_po_3.estado_orden}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Creación: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_creacion}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Asignación: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_asignacion}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Despacho: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_despacho}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Ruta: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_ruta}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Llegada: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_llegada}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Tiempo transcurrido: ${ARCGIS.DBO.%view_tiempo_order_po_3.TIEMPO_TRA}<br></div>";
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
      "<div style=padding-top: 10px;>Causa: ${ARCGIS.DBO.%view_tiempo_order_po_3.causa}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Comentario: ${ARCGIS.DBO.%view_tiempo_order_po_3.comentario}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Estado: ${ARCGIS.DBO.%view_tiempo_order_po_3.estado_orden}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Creación: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_creacion}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Asignación: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_asignacion}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Despacho: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_despacho}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Ruta: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_ruta}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Fecha Llegada: ${ARCGIS.DBO.%view_tiempo_order_po_3.fecha_llegada}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>Tiempo transcurrido: ${ARCGIS.DBO.%view_tiempo_order_po_3.TIEMPO_TRA}<br></div>";

      chqIsolatedNisTemp.setContent(chqIsolatedNisInfoContent);
      return chqIsolatedNisTemp;
    },
    getNisInfo(){

      let chqNisInfoTemp= new esri.InfoTemplate();
      chqNisInfoTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqNisInfoContent =
      "<div style=padding-top: 10px;>ID Orden: ${ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>ID Incidencia: ${ARCGIS.dbo.POWERON_TRANSFORMADORES.id_incidencia}<br></div>"+
      "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;>SED: ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed}<br></div>"+
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
