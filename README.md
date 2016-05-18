# react_jsapi

<i>Español</i>
<h1>Proyecto inicial de Clientes Interrumpidos.</h1>

<strong>Objetivo: Crear una app web que permita mostrar los clientes interrumpidos y su información de acuerdo a la orden.</strong>

<b>Especificaciones:</b>

<ul>
<li>Mostrar en el mapa las Subestaciones interrumpidas a escala de zoom (por agrupamiento).</li>

<li>Mostrar Clientes interrumpidos a escala de zoom cercano.</li>

<li>Mostrar la información de un NIS o SED al hacer clic.</li>

<li>Graficar la cantidad de clientes por comuna.</li>

<li>Graficar la cantidad de clientes por oficina.</li>

<li>Graficar el % de clientes por comuna.</li>

<li>Buscar los siguientes elementos e indicar si está interrumpido y mostrar localización:
     <ul><li>NIS</li>
     <li>ID ORDEN</li>
     <li>ID INCIDENCIA</li>
     <li>SED</li>
     </ul>
    </li>

<li>Mostrar el tiempo de las ordenes según un color.
        <ul>
        <li>0 - 2   (verde claro)</li>
        <li>2 - 4   (verde oscuro)</li>
        <li>4 - 8   (gris)</li>
        <li>8 - 12  (amarillo)</li>
        <li>12 - 24 (naranja)</li>
        <li>24 - 48 (rojo)</li>
        <li>+  48   (púrpura)</li>
        </ul>
    </li>

<li>Generar un reporte de clientes interrumpidos según:
    <ul>
    <li>Tipo de Cliente (NIS o SED)</li>
    <li>ID Orden</li>
    <li>ID Incidencia</li>
    <li>Estado</li>
    <li>Fechas asociadas al estado de la orden</li>
    <li>Tiempo de interrupción</li>
    <li>ETR (Estimated Time Reposition)</li>
    </ul>
    </li>

<li> Mostrar las ordenes en una tabla según extent del mapa (la vista zoom del mapa referente al total de la visualización de la pantalla).</li>

<li>Mostrar dinámicamente la cantidad de:
     <ul>
     <li>Total de clientes domiciliarios (DOM) interrumpidos</li>
     <li>Total de clientes pertenecientes a una Subestación de Distribución interrumpidos (RED)</li>
     <li>Total de clientes interrumpidos</li>
     </ul>
    </li>

<li>Filtrar resultados en la tabla de ordenes.</li>

<li> Web compatible con dispositivos móviles (Tablet principalmente).</li>

</ul>

<hr></hr>

<i>English</i>

<h1>Customers Power Outage Project.</h1>

<strong>Objective: Create an APP for power outage reporting and status updates.</strong>

<b>Specifications:</b>

<ul>
<li>Show in the map distribution substations affected by Power Outage, also show the electricity network and costumers associated to them when you zoom in. (Group them when u zoom out)</li>

<li>Show POs in a closest zoom scale</li>

<li>Show information about NIS (customers unique ID) or distribution substations (SED) when the user clicks on them in the map.</li>

<li>Make a chart with the quantity of customers affected by: zone (region), per office and percentaje</li>


<li>Search the following elements and alert if they are affected for a PO (also show localization):
    <ul><li>NIS</li>
    <li>ORDER ID</li>
    <li>INCIDENT ID</li>
    <li>SED</li>
    </ul></li>

<li>Display the elapsed time of an order in colors (in hours)
    <ul>
    <li>0 - 2   (lightgreen)</li>
    <li>2 - 4   (darkgreen)</li>
    <li>4 - 8   (gray)</li>
    <li>8 - 12  (yellow)</li>
    <li>12 - 24 (orange)</li>
    <li>24 - 48 (red)</li>
    <li>+  48   (purple)</li>
    </ul>
    </li>

<li>Make a report with the customers affected by power outage according to::
    <ul>
    <li>NIS or SED</li>
    <li>Order ID</li>
    <li>Incident ID</li>
    <li>Current State</li>
    <li>Date and time according to the order status</li>
    <li>Elapsed time</li>
    <li>ETR (Estimated Time Reposition)</li>
    </ul>
    </li>

<li>Show in a table orders id and info associated to them according to the current map zoom.</li>

<li>Show dynamically the quantity of:
     <ul>
     <li>Total of domiciliary customers affected (DOM)</li>
     <li>Total of customers associated to a distribution substation(RED)</li>
     <li>Total of customers affected for PO</li>
     </ul>
    </li>

<li>Filter the results and information in the orders table.</li>

<li>Make a responsive website with compatibility with mobile dispositives (mainly tablet).</li>

</ul>
