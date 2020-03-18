<?php	
	require '../config/config.php';    
    
    $response = [];
    $id = $_GET['id'];    

    $orders = get_records_db('orders', "id = $id");   
    
    foreach ($orders as $dato){
        $response['id'] = $dato['id'];
        $response['origen'] = $dato['origen'];
        $response['depto_origen'] = $dato['depto_origen'];
        $response['destino'] = $dato['destino'];
        $response['depto_destino'] = $dato['depto_destino'];
        $response['tipo'] = $dato['tipo'];
        $response['destinatario'] = $dato['destinatario'];
        $response['descripcion'] = $dato['descripcion'];
        $response['user'] = $dato['user'];
        $id_user = $dato['user'];
        $response['cadete'] = $dato['cadete'];        
        $response['status'] = $dato['status'];
        $response['fModificacion'] = $dato['fModificacion'];
        $response['lat_origen'] = $dato['lat_origen'];
        $response['long_origen'] = $dato['long_origen'];
        $response['lat_destino'] = $dato['lat_destino'];
        $response['long_destino'] = $dato['long_destino'];
    };
    
    $user = get_records_db('users', "id = $id_user");
    
    foreach ($user as $info){
        $response['name'] = $info['name'];
        $response['lastname'] = $info['lastname'];
        $response['email'] = $info['email'];
        $response['phone'] = $info['phone'];        
    };

    echo json_encode($response);
?>