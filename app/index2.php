<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Simple OneSignal</title>
	
	<!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> 

	<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script> -->
	<script>
		
		// function getOnesignalId() {
			// var onesignal_id = "";
	
			//   var OneSignal = window.OneSignal || [];
			//   OneSignal.push(function() {
			// 	console.log('amsbdkasbdkasbdksbadkbadaksdbk')

			// 	OneSignal.init({
			// 		  appId: '2429fc26-d53b-47fa-8589-6a23112ec210',
			// 	});

			// 	OneSignal.isPushNotificationsEnabled().then(function(isPushEnabled) {
			// 		OneSignal.getUserId(function(device_id) {
			// 			onesignal_id = device_id;
			// 			  console.log(onesignal_id);
			// 		});
			// 	});
			//   });			
		// }

		// getOnesignalId();


	  	function sendPush() {
	  		$.ajax({
	  			url: 'push.php',
	  			type: 'POST',
	  			dataType: 'json',
	  			data: {
	  				onesignal_id: onesignal_id,
	  				push_title: $('[name=push_title]').val(),
	  				push_content: $('[name=push_content]').val(),
	  			},
	  		})
	  		.done(function(response) {
	  			console.log('¡SENDED!')
	  			console.log(response);
	  		})
	  		.fail(function(error) {
	  			console.warning('¡ERROR!');
	  			console.log(error);
	  		});
	  	}
	</script>
</head>
<body>
	<p>Simple OneSignal example with JS+PHP</p>

	<input type="text" name="push_title" placeholder="Push title">
	<input type="text" name="push_content" placeholder="Push content">
	<button onclick="sendPush()">Send push</button>
</body>
</html>