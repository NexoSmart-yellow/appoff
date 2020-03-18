<?php
	if(!isset($_SESSION['id'])) redireccionar('/');
?>

<section id="home" class="home">
    <?php
        if ($_SESSION['tipo'] == "empleado") {
            require('web-intro.php');
            require('web-presentacion.php');
            require('web-orders.php');
            require('web-hoja.php');
            require('web-ots.php');
            require('web-servicios.php');
            require('web-expense.php');
            require('web-materiales.php');
            require('web-pedido-mh.php');
            require('web-stock-transito.php');
            require('web-correctivos.php');
            require('web-agenda.php');
            require('web-detalle-ots.php');
            require('web-detalle-oc.php');
            require('web-steps-ot.php');
            require('web-replanteo.php');
            require('web-replanteo-sinOt.php');
            require('web-espontaneos.php');
            require('web-finaliza-ot.php');
            require('web-resumen-item.php');
            require('web-comenza.php');
            require('web-movilidad.php');
            require('web-vehiculo.php');
            require('web-data-car.php');
            require('web-info-car.php');
            require('web-hoja_de_ruta.php');
            require('web-info.php');
            require('web-listEspontaneos.php');
            require('web-listReplanteos.php');
        }
        elseif($_SESSION['tipo'] == "contacto") {
            require('web-intro-cliente.php');
            require('web-clientSign.php');
            require('web-pedido-cliente.php');
            require('web-listPedidos.php');
            require('web-listPresupuestos.php');
            require('web-summaryOrder.php');
            require('web-infoPedido.php');
            require('web-replanteo-sinOt.php');
            require('web-getCodeOt.php');
        } 
    ?>
</section>
<div id="backSideNav"></div>
