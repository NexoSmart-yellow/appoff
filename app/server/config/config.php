<?php
$url_web = $_SERVER['SERVER_NAME'];

//$domain="mecsrl-online";
$domain="mecsimples-app";
//if( $_SERVER['SERVER_NAME']=="www.".$domain.".com" || $_SERVER['SERVER_NAME']==$domain.".com" ) {
if( $_SERVER['SERVER_NAME']=="www.".$domain.".com.ar" || $_SERVER['SERVER_NAME']==$domain.".com.ar" ) {
	
	// en servidor	
	// -> Direcciones para redireccion
	$base_url_web = "/app";	
	$url_web = $url_web.$base_url_web; 
	// -> Credenciales.
	$database = "mec_base"; 
	$pgsql_user = "mecadmin";
	$pgsql_password = "8qGIJpcv6X5psW4B";
	$pgsql_host = "localhost";

} else {

	// en local	
	// -> Direcciones para redireccion
	$base_url_web = "/clientes/mecsrl/app";
	$url_web = $url_web.$base_url_web; 	
	// -> Credenciales.
	$database = "mec_base"; 
	$pgsql_user = "postgres";
	$pgsql_password = "123";
	$pgsql_host = "localhost";
	

}


// -> Incluyo frameworks para el back
include(__DIR__."/../frameworks/nexosmart/functions.php");

// -> Conexión a la base de datos.
$dbConn = pg_connect("host=".$pgsql_host." dbname=".$database." user=".$pgsql_user." password=".$pgsql_password."");
// $dbConn = pg_connect($mysql_host, $database, $mysql_user, $mysql_password);
	if(!$dbConn) {
		echo 'Error M1. Administrador? config file.';
		exit;
	}

// if (!pg_set_charset($dbConn, "utf8")) {
//  		echo 'Error M2. Administrador?';
// 		exit;
// }

// -> Logout del CMS
if($_GET['logout']=="true") {
	foreach(array_keys($_SESSION) as $k) unset($_SESSION[$k]);
	$_SESSION = array();
	session_unset();
	session_destroy();
    $_SESSION = "";
	redireccionar("/", $url_web);
}

?>
