<?php
    require "../config/config.php";

    $_POST['submit_edit'] = "submit_edit";
    $_POST['id'] = $_SESSION['id'];
    $_POST['type'] = 'cadete';
    $_POST['active'] = 1;
   
    // encriptamos contraseña
    $login = new login();
    $_POST['password'] = $login->encrypt_password($_POST['password']);

    $datos = [
        ["value" => "id", "required" => 1, "custom" => ""],
        ["value" => "name", "required" => 1, "custom" => "Error, debe ingresar un nombre"],
        ["value" => "lastname", "required" => 1, "custom" => "Error, debe ingresar un apellido"],
        ["value" => "email", "required" => 1, "custom" => "Error, debe ingresar un email"],
        ["value" => "password", "required" => 1, "custom" => "Error, debe ingresar una contraseña"],
        ["value" => "phone", "required" => 1, "custom" => "Error, debe ingresar un numero de Teléfono"],
        ["value" => "type", "required" => 1, "custom" => ""],
        ["value" => "active", "required" => 1, "custom" => ""],
    ];

    $error = get_form_cp($datos, "users", ""); 

    // var_dump($error);

    $to_return = null;

	if ($error['status'] == "updated") {
		$to_return = [ "success" => true ];
	}else {
		$to_return = [ "success" => false, "error" => $error ];
	}    

    echo json_encode($to_return);
?>