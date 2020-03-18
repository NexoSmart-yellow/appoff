<?php

debug_errors();

if(isset($_POST['submit'])) {
    $email    = (!empty($_POST['user_email'])) ? secure_input($_POST['user_email']) : "";
    $password = (!empty($_POST['user_password'])) ? secure_input($_POST['user_password']) : "";

    // encrypt pw
    $login    = new login();
    $password = $login->encrypt_password($password);

    // empleado?
    $sql = "SELECT E.*
            FROM empleados E
            WHERE (E.email = '$email')
            LIMIT 1";
    $query = pg_query($dbConn, $sql);
    $user = pg_fetch_all($query);

    // empleado founded
    if ($user) {
        $user = $user[0];

        // check password
        if ($user['password'] == $password) {
            $_SESSION         = $user;
            $_SESSION['id']   = 1;
            $_SESSION['tipo'] = "empleado";
            if( $_SERVER['SERVER_NAME']=="www.".$domain.".com.ar" || $_SERVER['SERVER_NAME']==$domain.".com.ar" ) {
                echo '<script>window.location.href = "/app/?login=true";</script>';
            } else {
                echo '<script>window.location.href = "?login=true";</script>';
            }
        }
        // password not match
        else {
            if( $_SERVER['SERVER_NAME']=="www.".$domain.".com.ar" || $_SERVER['SERVER_NAME']==$domain.".com.ar" ) {
                echo '<script>window.location.href = "/app/?login=false";</script>';
            } else {
                echo '<script>window.location.href = "?login=false";</script>';
            }
            
            // var_dump('Empleado - Contraseñas no coinciden');
            // exit;
        }
    }
    // empleado not found
    // check for contacto
    else {
        $sql = "SELECT C.*
                FROM contactos C
                WHERE (C.email = '$email')
                LIMIT 1";
        $query = pg_query($dbConn, $sql);
        $user = pg_fetch_all($query);

        if ($user) {
            $user = $user[0];

            // check password
            if ($user['password'] == $password) {
                $_SESSION         = $user;
                $_SESSION['id']   = 1;
                $_SESSION['tipo'] = "contacto";
                if( $_SERVER['SERVER_NAME']=="www.".$domain.".com.ar" || $_SERVER['SERVER_NAME']==$domain.".com.ar" ) {
                    echo '<script>window.location.href = "/app/?login=true";</script>';
                } else {
                    echo '<script>window.location.href = "?login=true";</script>';
                }               
            }
            // password not match
            else {
                if( $_SERVER['SERVER_NAME']=="www.".$domain.".com.ar" || $_SERVER['SERVER_NAME']==$domain.".com.ar" ) {
                    echo '<script>window.location.href = "/app/?login=false";</script>';
                } else {
                    echo '<script>window.location.href = "?login=false";</script>';
                }
                // var_dump('Contacto - Contraseñas no coinciden');
                // exit;
            }
        }
        // contacto not found
        else {
            if( $_SERVER['SERVER_NAME']=="www.".$domain.".com.ar" || $_SERVER['SERVER_NAME']==$domain.".com.ar" ) {
                echo '<script>window.location.href = "/app/?login=false";</script>';
            } else {
                echo '<script>window.location.href = "?login=false";</script>';
            }
            
            // var_dump('No existe el usuario');
            // exit;
        }
    }
}
else {
?>

<section class="row login-container" id="splash">
    <div class="col-xs-12 col-lg-12 col-md-12 splash-div">
        <p class="text-big">HOLA : ) <br>BIENVENIDO</p>
        <br>
        <p class="text-small">Sonreí</p>
        <p class="text-small">Ponete a prueba</p>
        <p class="text-small">Mostra tu mejor versión</p>
        <p class="text-small">Da lo mejor de vos</p>
        <p class="text-small">Acompañá a tu equipo</p>
        <p class="text-small">Sorprendé</p>
        <p class="text-small">Disfrutá lo que haces</p>
        <br>
        <p class="text-small">Se <b>Vos</b>, se <b>MEC</b></p>
    </div>
    <div class="col-xs-12 col-lg-12 col-md-12 splash-div-2">
        <div class="div-img"><img src="<?="//$url_web/"?>assets/images/img/logomec.png"></div>
        <div id="div-login-splash"><img src="<?="//$url_web/"?>assets/images/img/boton1.png"><span>Login</span></div>
    </div>
</section>
<section class="login-container" id="login" style="display: none;padding: 0;height: 100%;background: rgb(253,94,19);">
    <div id="top-bar">
        <div>
            <img src="<?="//$url_web/"?>assets/images/img/celconflecha.png">
            <p>Ingresá a la APP</p> <br>
        </div>
    </div>
    <div class="login-body">
        <form action="<?="//$url_web/"?>" class="form-horizontal" method="post" style="width:100%">
            <div class="login_white_box">
                <div class="form-group" style="margin-bottom: 0;">
                    <input name="user_email" class="form-control" type="email" placeholder="Tu usuario de ingreso a la App" required="required" />
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <input name="user_password" class="form-control" type="password" placeholder="Tu Clave" required="required"/>
                </div>
            </div>
            <button class="btn btn_ingresar" type="submit" name="submit" value="Enviar">Ingresar</button>
            <a href="#" class="btn btn-link btn-block" style="font-size: 15px; color: #fff; margin-top: 15px;">¿No recuerda su contraseña?</a>
        </form>
    </div>
</section>
    <?php
// incluyo los modals
require('components/modal/modals.php');
}
?>
