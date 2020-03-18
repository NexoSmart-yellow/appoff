<?php	
	require '../config/config.php';    
    
    $response = [];
    $id = $_SESSION['id'];
    
    $response['orders'] = count(get_records_db('orders', "user = $id"));
    $user = get_records_db('users', "id = $id");   

    foreach ($user as $dato){
        $response['name'] = $dato['name'];
        $response['lastname'] = $dato['lastname'];
        $response['email'] = $dato['email'];
        $response['password'] = $dato['password'];
        $response['phone'] = $dato['phone'];
    }
    
    echo json_encode($response);
?>