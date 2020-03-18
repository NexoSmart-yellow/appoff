<?php
	require('classes/OneSignal.php');

	/* Init app */
	$onesignal = new OneSignal("2429fc26-d53b-47fa-8589-6a23112ec210", "NTFjN2I3NWEtM2Y0Yi00ZGE4LTlkOGUtNWY3MDBmNDc4ZjI0", "en");
	/* Add user */
	$onesignal->addUser($_POST['onesignal_id']);
	/* Set title and message */
	$onesignal->setTitle($_POST['push_title']);
	$onesignal->setMessage($_POST['push_content']);
	/* Send */
	$response = $onesignal->send();
	echo json_encode($response);
?>