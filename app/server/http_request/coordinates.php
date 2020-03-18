<?php
	require "../config/config.php";
	
	// ini_set('display_errors', 1);
	// ini_set('display_startup_errors', 1);
	// error_reporting(E_ALL);

	$response = array();

	if (!empty($_POST))
	{
		$id_order = $_POST['id'];			
		$_POST['from_address'] = $_POST['origen'];
		$_POST['to_address'] = $_POST['destino'];
		
		$string = $_POST['from_address'];
		
	    $string = trim($string);
	 
	    $string = str_replace(
	        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
	        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
	        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
	        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
	        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
	        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('ñ', 'Ñ', 'ç', 'Ç'),
	        array('n', 'N', 'c', 'C',),
	        $string
	    );

	    $string = $string.",Bahia Blanca, Buenos Aires, Argentina";
	    $address = rawurlencode(utf8_encode($string));
	    
	     
	    // google map geocode api url
	    $url = "https://maps.googleapis.com/maps/api/geocode/json?address={$address}"."&key=AIzaSyD-r6h1sqaeJCQDeDzD5t4m5nuFKM8NGBc";

	    $resp_json = file_get_contents($url);

	    // decode the json
	    $resp = json_decode($resp_json, true);

	    $lati = 0;
	    $longi = 0;
	 
	    // response status will be 'OK', if able to geocode given address
	    if($resp['status']=='OK'){
	 
	        // get the important data
	        $lati = $resp['results'][0]['geometry']['location']['lat'];
			$longi = $resp['results'][0]['geometry']['location']['lng'];
			// var_dump($lati);
			// var_dump($longi);
	    }
	    else
	    {
	    	// var_dump($resp);
	    	// var_dump($address);
	    	$response['error'] = "ERRORDIR";
	    }

	    $string = $_POST['to_address'];

	    $string = trim($string);
	 
	    $string = str_replace(
	        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
	        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
	        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
	        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
	        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
	        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
	        $string
	    );
	 
	    $string = str_replace(
	        array('ñ', 'Ñ', 'ç', 'Ç'),
	        array('n', 'N', 'c', 'C',),
	        $string
	    );

	    $string = $string."";
	    $address = rawurlencode(utf8_encode($string));
	    
	     
	    // google map geocode api url
	    $url = "https://maps.googleapis.com/maps/api/geocode/json?address={$address}"."&key=AIzaSyD-r6h1sqaeJCQDeDzD5t4m5nuFKM8NGBc";

	    $resp_json = file_get_contents($url);

	    // decode the json
	    $resp = json_decode($resp_json, true);

	    $lati2 = 0;
	    $longi2 = 0;
	 
	    // response status will be 'OK', if able to geocode given address
	    if($resp['status']=='OK'){
	 
	        // get the important data
	        $lati2 = $resp['results'][0]['geometry']['location']['lat'];
			$longi2 = $resp['results'][0]['geometry']['location']['lng'];	
			// var_dump($lati2);
			// var_dump($longi2);         
	    }
	    else
	    {
	    	// var_dump($resp);
	    	// var_dump($address);
	    	$response['error'] = "ERRORDIR";
	    }		

		// actualizo la db.
		$sql_orders = mysqli_query(
			$dbConn,"UPDATE orders SET lat_origen=$lati, long_origen=$longi, lat_destino=$lati2, long_destino=$longi2  WHERE id = '$id_order'"
		  );		
		// var_dump($sql_orders);
	}

    echo json_encode($response);
?>