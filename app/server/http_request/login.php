<?php
require '../config/config.php';

$user = (isset($_POST['user_email']) && !empty($_POST['user_email'])) ? $_POST['user_email'] : "";
$pass = (isset($_POST['user_password']) && !empty($_POST['user_password'])) ? $_POST['user_password'] : "";

// try to login
if (!empty($user)) {
	// $get_user = get_records_db("app_users", "(user_email = '$user')", 1);
	$sql = "SELECT * 
			FROM public.app_users
			WHERE public.app_users.user_email = '$user' 
			LIMIT 1";

	$query = pg_query($dbConn, $sql);
	$get_user = pg_fetch_all($query);
	// exists
	if ($get_user) {
		// check password
		if (!empty($pass)) {
			$c_login = new login();
			$pass_encrypt = $c_login->encrypt_password($pass);
			// compare
			if ($get_user[0]['user_password'] == $pass_encrypt) {
				// login
				$response = [
					"success" => true,
					"logged" => true,
				];

                $fields = [
                    "app_users",
					"user_email",
					"user_password",
                    "en_US"
                ];
                $_POST['user_email'] = $_GET['user_email'];
                $_POST['user_password'] = $_GET['user_password'];
                $_POST['submit'] = "submit";

                $login = new login();
				$login = $login->start_login($fields);
			}
			// password wrong
			else {
				$response = [
					"success" => false,
					"error"   => "C1",
					"logged"  => false,
				];
			}
		}
		// no pass
		else {
			$response = [
				"success" => false,
				"error"   => "C2",
				"logged"  => false,
			];
		}
	}
	// no results
	else {
		$response = [
			"success" => false,
			"error"   => "U1",
			"logged"  => false,
		];
	}
}
// no user
else {
	$response = [
		"success" => false,
		"error"   => "U2",
		"logged"  => false,
	];
}
// -> json
echo json_encode($response);
?>