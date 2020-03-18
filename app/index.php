<?php
// ob_start();
include("server/config/config.php");
// debug_errors();
// header.
include("views/includes/header-web.php");

// login error?
if ($_GET['login'] == "false") { ?>
	<script>alert('Error al iniciar sesión. Email o contraseña incorrectos');</script>
<?php }

// Login
if ( !isset($_SESSION['id']) ) {
	include("views/pages/web-login.php");
} else {
// ?>
<script>
	$(document).ready(function() {
		getOnesignalId();
	});	
</script>
<div class="row">
    <div class="col-lg-12 col-md-12 col-xs-12">

        <!-- navegación-top -->
        <?php include("views/navigation/nav-top.php"); ?>

    </div>

    <div class="col-lg-12 col-md-12 col-xs-12">
	<div id="loader">
		<svg width="87px" height="87px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ellipsis" style="shape-rendering: auto; animation-play-state: running; animation-delay: 0s; background: none;"><!--circle(cx="16",cy="50",r="10")--><circle cx="84" cy="50" r="0" fill="#fd5e13" style="animation-play-state: running; animation-delay: 0s;"><animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="0s" style="animation-play-state: running; animation-delay: 0s;"></animate><animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="0s" style="animation-play-state: running; animation-delay: 0s;"></animate></circle><circle cx="84" cy="50" r="0.167471" fill="#fd5e13" style="animation-play-state: running; animation-delay: 0s;"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="-0.85s" style="animation-play-state: running; animation-delay: 0s;"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="-0.85s" style="animation-play-state: running; animation-delay: 0s;"></animate></circle><circle cx="83.4306" cy="50" r="10" fill="#fd5e13" style="animation-play-state: running; animation-delay: 0s;"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="-0.425s" style="animation-play-state: running; animation-delay: 0s;"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="-0.425s" style="animation-play-state: running; animation-delay: 0s;"></animate></circle><circle cx="49.4306" cy="50" r="10" fill="#fd5e13" style="animation-play-state: running; animation-delay: 0s;"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="0s" style="animation-play-state: running; animation-delay: 0s;"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="0s" style="animation-play-state: running; animation-delay: 0s;"></animate></circle><circle cx="16" cy="50" r="9.83253" fill="#fd5e13" style="animation-play-state: running; animation-delay: 0s;"><animate attributeName="r" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="0s" style="animation-play-state: running; animation-delay: 0s;"></animate><animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.7s" repeatCount="indefinite" begin="0s" style="animation-play-state: running; animation-delay: 0s;"></animate></circle></svg>
	</div>
        <!-- paáginas -->
        <?php
			switch ($_GET["go"]) {
				// Cada archivo agregado en index.php tiene que ser agregado en el archivo .htaccess también..
				case "home":
					include("views/pages/web-home.php");
					break;

				case "perfil":
					include("views/pages/web-perfil.php");
					break;

				case "end":
					include("views/pages/web-end.php");
					break;

				case "agenda":
					include("views/pages/web-calendar.php");
					break;

				default:
				   include("views/pages/web-home.php");

			}

			// incluyo los modals
			require('components/modal/modals.php');
		?>



    </div>
</div>
<?php

} // end login

// footer.
include("views/includes/footer-web.php");
// ob_end_flush(); // deshabilitar el almacenamiento en el búfer de salida.
?>

