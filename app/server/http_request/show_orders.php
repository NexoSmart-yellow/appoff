<?php	
	require '../config/config.php';    

    if(isset($_POST['orders'])) {
        $orders = $_POST['orders'];
        foreach ($orders as $dato){ 
            // var_dump($dato['nombre']);
            $response .=   '<div class="div_ot_agenda" id="'.$dato['id_orden'].'">
                                <p id="empresa_ot">'.$dato['razon_social'].'</p>
                                <p id="lugar_ot">'.$dato['nombre'].'</p>
                                <p id="lugar2_ot">'.$dato['direccion'].'</p>
                                <p id="cod_ot">OT 60-01875/0</p>
                                <p class="text_resaltado" id="desc_ot">1° Visita Mto.</p>
                                <p id="time_ot">08:45hs. a 16:45hs</p> 
                                <p class="type_duration"><span id="duration_job">8:00hs.</span><br><span id="type_job">Normal</span></p>
                                <div class="caja_status">
                                    <div style="background: #92d050;" class="iportancia_ot"></div>
                                    <div class="item_pendiente"></div>
                                </div>
                            </div>';
        };
    }
        

    echo json_encode($response);
?>
