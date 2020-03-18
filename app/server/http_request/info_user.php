<?php
	require('../config/config.php');

    $id = (!empty($_SESSION['id_empleado'])) ? $_SESSION['id_empleado'] : $_SESSION['id_contacto'];

    if (!empty($id)) {
        $response['id']      = $id;
        $response['type_id'] = (!empty($_SESSION['id_empleado'])) ? $_SESSION['id_empleado'] : $_SESSION['id_cliente'];
        $response['name']    = "$_SESSION[nombre] $_SESSION[apellido]";
        $response['type']    = (!empty($_SESSION['id_empleado'])) ? 1 : 2;
        $response['email']   = $_SESSION['email'];
        $response['key']     = $_SESSION['clave_app'];
        $response['clave']   = $_SESSION['clave_app'];

        /* get locaciones */
        if (!empty($_SESSION['id_contacto'])) {
	        $locations = [];

	        $sql = "SELECT C.*
	        		FROM   contactos_locaciones C
	        		WHERE (id_contacto = $_SESSION[id_contacto])";
	        $query = pg_query($dbConn, $sql);
	        $locaciones = pg_fetch_all($query);
            
            if ($locaciones) {
    	        foreach ($locaciones as $key => $locacion) {
    	        	array_push($locations, $locacion['id_locacion']);
    	        }
            }

	        $response['locations'] = implode(";", $locations);
	        // $response['locations'] = $locations;
	    }
    }
    else {
        $response = [
            "success" => false,
            "error"   => "No hay ID de empleado",
        ];
    }

    echo json_encode($response);
?>
