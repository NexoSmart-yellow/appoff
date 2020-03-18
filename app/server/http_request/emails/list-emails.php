<?php

// LISTA DE EMAILS PARA ENVIAR AL USUARIO O CADETE.

error_reporting(E_ALL);
ini_set('display_errors', '1');

// datos que necesito mostrar
$origen = $_POST['origen']; // direccion origen.
$dep_origen = $_POST['dep_origen']; // depto origen.
$dep_destino = $_POST['dep_destino']; // depto destino.
$destino = $_POST['destino']; // direccion destino.
$tipo = $_POST['tipo']; // tipo de viaje.
$descripcion = $_POST['descripcion']; // descripcion del viaje.
$destinatario = $_POST['destinatario']; // destinatario.

$email_user = $_POST['email_user']; // email user
$email_cadete = $_POST['email_cadete']; // email cadete


if ($_POST) {

$asunto = 'UPAQ';

// start -> PLANTILLAS EMAILS.

// USUARIO: email para usuario, cuando cadete ACEPTA un pedido.
$viaje_aceptado = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <style>
        * {
            font-family:"Open Sans";
            color: #424242;
            font-size:16px;
            text-align:left;
        }
        .content {
            margin:auto;
            max-width:400px;
            max-height:900px;
            background-color:#FFFFFF;
            border:1px solid #9E9E9E;
        }
        .content .first {
            padding:15px;
            background-color:#212121;
            height:50px;
        }
        .content .first .bonus1 {
            float:left;
            max-height:40px;
        }
        .content .first .bonus2 {
            max-height: 120px;
            float: right;
        }
        .content .second {
            padding:15px;
        }
        .content .second .title {
            font-weight:bold;
            font-size:35px;
        }
        .content .second .title span {
            color:#ff5840;
            font-weight:bold;
            font-size:35px;
        }
        .content .second .div {
            border-top:1px solid #9E9E9E;
            height:1px;
            width:100%;
            margin-top:30px;
            margin-bottom:30px;
        }
        .content .second .text2 {
            font-size:14px;
        }
        .content .second .fix-a {
            margin:auto;
            align-content:center;
            text-align:left;
        }
        .content .second .link {
            margin:auto;
            text-align:center;
            color:#FAFAFA;
            border: 1px solid #253d7a;;
                border-radius: 5px;
                -moz-border-radius: 5px;
                -webkit-border-radius: 5px;
                background-color:#253d7a;;
                padding:5px;
                text-decoration:none;
                font-weight:bold;
        }
        .content .second a:hover {
            color:#253d7a;
        }
        .content .second .text2 span a {
            color:#253d7a;;
        }
        .link{
            background:#ff5840;
            color: #fff;
        }
        .ico-red{
            width: 3em;
            padding: 2em 1em;            
        }
        .ico-red:hover{
            cursor:pointer;                        
            width: 4em;
            padding: 1em 1em;
        }
        .flex{
            justify-content: space-around;
            flex-direction: row;
            align-items: center;     
            margin: 0.5em auto;
            text-align: center;       
        }
    </style>
</head>
    <body>
        <div class="content">
            <div class="first">
                <img class="bonus1" src="https://www.upaq.com.ar/cms/assets/images/logos/upaqLogo.png" width="100"/>
                <img class="bonus2" src="https://www.upaq.com.ar/images/box-email.png" width="100"/>
            </div>
            <div class="second">
                <div class="title">Saludos desde <br> <span>UPAQ</span> </div>
                <div class="div"> </div>
                <div class="text">Muchas gracias por elegirnos</div>
                <div class="text flex">
                    <p>Uno de los cadetes a ACEPTADO </p>
                    <p>Ingresa en <a href="www.upaq.com.ar">UPAQ</a> para seguir todos tus pedidos</p>
                </div>
                <br/>            
                <br/>
                <div class="div"> </div>
                <div class="text2">
                    Por cualquier consulta comunicate con<br/>
                    <span style="color:#ff5840;font-weight:bold;">info@nexosmart.com.ar</span>
                </div>
            </div>
        </div>
    </body>
</html>';



// USUARIO: email para usuario, cuando cadete esta BUSCANDO un pedido.
$viaje_buscando = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <style>
        * {
            font-family:"Open Sans";
            color: #424242;
            font-size:16px;
            text-align:left;
        }
        .content {
            margin:auto;
            max-width:400px;
            max-height:900px;
            background-color:#FFFFFF;
            border:1px solid #9E9E9E;
        }
        .content .first {
            padding:15px;
            background-color:#212121;
            height:50px;
        }
        .content .first .bonus1 {
            float:left;
            max-height:40px;
        }
        .content .first .bonus2 {
            max-height: 120px;
            float: right;
        }
        .content .second {
            padding:15px;
        }
        .content .second .title {
            font-weight:bold;
            font-size:35px;
        }
        .content .second .title span {
            color:#ff5840;
            font-weight:bold;
            font-size:35px;
        }
        .content .second .div {
            border-top:1px solid #9E9E9E;
            height:1px;
            width:100%;
            margin-top:30px;
            margin-bottom:30px;
        }
        .content .second .text2 {
            font-size:14px;
        }
        .content .second .fix-a {
            margin:auto;
            align-content:center;
            text-align:left;
        }
        .content .second .link {
            margin:auto;
            text-align:center;
            color:#FAFAFA;
            border: 1px solid #253d7a;;
                border-radius: 5px;
                -moz-border-radius: 5px;
                -webkit-border-radius: 5px;
                background-color:#253d7a;;
                padding:5px;
                text-decoration:none;
                font-weight:bold;
        }
        .content .second a:hover {
            color:#253d7a;
        }
        .content .second .text2 span a {
            color:#253d7a;;
        }
        .link{
            background:#ff5840;
            color: #fff;
        }
        .ico-red{
            width: 3em;
            padding: 2em 1em;            
        }
        .ico-red:hover{
            cursor:pointer;                        
            width: 4em;
            padding: 1em 1em;
        }
        .flex{
            justify-content: space-around;
            flex-direction: row;
            align-items: center;     
            margin: 0.5em auto;
            text-align: center;       
        }
    </style>
</head>
    <body>
        <div class="content">
            <div class="first">
                <img class="bonus1" src="https://www.upaq.com.ar/cms/assets/images/logos/upaqLogo.png" width="100"/>
                <img class="bonus2" src="https://www.upaq.com.ar/images/box-email.png" width="100"/>
            </div>
            <div class="second">
                <div class="title">Saludos desde <br> <span>UPAQ</span> </div>
                <div class="div"> </div>
                <div class="text">Muchas gracias por elegirnos</div>
                <div class="text flex">
                    <p>El cadetes se encuentra en viaje a BUSCAR el paquete</p>
                    <p>Ingresa en <a href="www.upaq.com.ar">UPAQ</a> para seguir todos tus pedidos</p>
                </div>
                <br/>            
                <br/>
                <div class="div"> </div>
                <div class="text2">
                    Por cualquier consulta comunicate con<br/>
                    <span style="color:#ff5840;font-weight:bold;">info@nexosmart.com.ar</span>
                </div>
            </div>
        </div>
    </body>
</html>';


// USUARIO: email para usuario, cuando cadete esta ENTREGANDO un pedido.
$viaje_entregando = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <style>
        * {
            font-family:"Open Sans";
            color: #424242;
            font-size:16px;
            text-align:left;
        }
        .content {
            margin:auto;
            max-width:400px;
            max-height:900px;
            background-color:#FFFFFF;
            border:1px solid #9E9E9E;
        }
        .content .first {
            padding:15px;
            background-color:#212121;
            height:50px;
        }
        .content .first .bonus1 {
            float:left;
            max-height:40px;
        }
        .content .first .bonus2 {
            max-height: 120px;
            float: right;
        }
        .content .second {
            padding:15px;
        }
        .content .second .title {
            font-weight:bold;
            font-size:35px;
        }
        .content .second .title span {
            color:#ff5840;
            font-weight:bold;
            font-size:35px;
        }
        .content .second .div {
            border-top:1px solid #9E9E9E;
            height:1px;
            width:100%;
            margin-top:30px;
            margin-bottom:30px;
        }
        .content .second .text2 {
            font-size:14px;
        }
        .content .second .fix-a {
            margin:auto;
            align-content:center;
            text-align:left;
        }
        .content .second .link {
            margin:auto;
            text-align:center;
            color:#FAFAFA;
            border: 1px solid #253d7a;;
                border-radius: 5px;
                -moz-border-radius: 5px;
                -webkit-border-radius: 5px;
                background-color:#253d7a;;
                padding:5px;
                text-decoration:none;
                font-weight:bold;
        }
        .content .second a:hover {
            color:#253d7a;
        }
        .content .second .text2 span a {
            color:#253d7a;;
        }
        .link{
            background:#ff5840;
            color: #fff;
        }
        .ico-red{
            width: 3em;
            padding: 2em 1em;            
        }
        .ico-red:hover{
            cursor:pointer;                        
            width: 4em;
            padding: 1em 1em;
        }
        .flex{
            justify-content: space-around;
            flex-direction: row;
            align-items: center;     
            margin: 0.5em auto;
            text-align: center;       
        }
    </style>
</head>
    <body>
        <div class="content">
            <div class="first">
                <img class="bonus1" src="https://www.upaq.com.ar/cms/assets/images/logos/upaqLogo.png" width="100"/>
                <img class="bonus2" src="https://www.upaq.com.ar/images/box-email.png" width="100"/>
            </div>
            <div class="second">
                <div class="title">Saludos desde <br> <span>UPAQ</span> </div>
                <div class="div"> </div>
                <div class="text">Muchas gracias por elegirnos</div>
                <div class="text flex">
                    <p>El cadetes se encuentra en viaje a ENTREGAR el paquete</p>
                    <p>Ingresa en <a href="www.upaq.com.ar">UPAQ</a> para seguir todos tus pedidos</p>
                </div>
                <br/>            
                <br/>
                <div class="div"> </div>
                <div class="text2">
                    Por cualquier consulta comunicate con<br/>
                    <span style="color:#ff5840;font-weight:bold;">info@nexosmart.com.ar</span>
                </div>
            </div>
        </div>
    </body>
</html>';




// USUARIO: email para usuario, cuando cadete ha COMPLETADO un pedido.
$viaje_completado = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <style>
        * {
            font-family:"Open Sans";
            color: #424242;
            font-size:16px;
            text-align:left;
        }
        .content {
            margin:auto;
            max-width:400px;
            max-height:900px;
            background-color:#FFFFFF;
            border:1px solid #9E9E9E;
        }
        .content .first {
            padding:15px;
            background-color:#212121;
            height:50px;
        }
        .content .first .bonus1 {
            float:left;
            max-height:40px;
        }
        .content .first .bonus2 {
            max-height: 120px;
            float: right;
        }
        .content .second {
            padding:15px;
        }
        .content .second .title {
            font-weight:bold;
            font-size:35px;
        }
        .content .second .title span {
            color:#ff5840;
            font-weight:bold;
            font-size:35px;
        }
        .content .second .div {
            border-top:1px solid #9E9E9E;
            height:1px;
            width:100%;
            margin-top:30px;
            margin-bottom:30px;
        }
        .content .second .text2 {
            font-size:14px;
        }
        .content .second .fix-a {
            margin:auto;
            align-content:center;
            text-align:left;
        }
        .content .second .link {
            margin:auto;
            text-align:center;
            color:#FAFAFA;
            border: 1px solid #253d7a;;
                border-radius: 5px;
                -moz-border-radius: 5px;
                -webkit-border-radius: 5px;
                background-color:#253d7a;;
                padding:5px;
                text-decoration:none;
                font-weight:bold;
        }
        .content .second a:hover {
            color:#253d7a;
        }
        .content .second .text2 span a {
            color:#253d7a;;
        }
        .link{
            background:#ff5840;
            color: #fff;
        }
        .ico-red{
            width: 3em;
            padding: 2em 1em;            
        }
        .ico-red:hover{
            cursor:pointer;                        
            width: 4em;
            padding: 1em 1em;
        }
        .flex{
            justify-content: space-around;
            flex-direction: row;
            align-items: center;     
            margin: 0.5em auto;
            text-align: center;       
        }
    </style>
</head>
    <body>
        <div class="content">
            <div class="first">
                <img class="bonus1" src="https://www.upaq.com.ar/cms/assets/images/logos/upaqLogo.png" width="100"/>
                <img class="bonus2" src="https://www.upaq.com.ar/images/box-email.png" width="100"/>
            </div>
            <div class="second">
                <div class="title">Saludos desde <br> <span>UPAQ</span> </div>
                <div class="div"> </div>
                <div class="text">Muchas gracias por elegirnos</div>
                <div class="text flex">
                    <p>El cadetes ENTREGO el paquete con éxito</p>
                    <p>Ingresa en <a href="www.upaq.com.ar">UPAQ</a> para seguir todos tus pedidos</p>
                </div>
                <br/>            
                <br/>
                <div class="div"> </div>
                <div class="text2">
                    Por cualquier consulta comunicate con<br/>
                    <span style="color:#ff5840;font-weight:bold;">info@nexosmart.com.ar</span>
                </div>
            </div>
        </div>
    </body>
</html>';





// CADETE: nuevos viajes para todos los cadetes.
$new_viajes_cadetes = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <style>
        * {
            font-family:"Open Sans";
            color: #424242;
            font-size:16px;
            text-align:left;
        }
        .content {
            margin:auto;
            max-width:400px;
            max-height:900px;
            background-color:#FFFFFF;
            border:1px solid #9E9E9E;
        }
        .content .first {
            padding:15px;
            background-color:#212121;
            height:50px;
        }
        .content .first .bonus1 {
            float:left;
            max-height:40px;
        }
        .content .first .bonus2 {
            max-height: 120px;
            float: right;
        }
        .content .second {
            padding:15px;
        }
        .content .second .title {
            font-weight:bold;
            font-size:35px;
        }
        .content .second .title span {
            color:#ff5840;
            font-weight:bold;
            font-size:35px;
        }
        .content .second .div {
            border-top:1px solid #9E9E9E;
            height:1px;
            width:100%;
            margin-top:30px;
            margin-bottom:30px;
        }
        .content .second .text2 {
            font-size:14px;
        }
        .content .second .fix-a {
            margin:auto;
            align-content:center;
            text-align:left;
        }
        .content .second .link {
            margin:auto;
            text-align:center;
            color:#FAFAFA;
            border: 1px solid #253d7a;;
                border-radius: 5px;
                -moz-border-radius: 5px;
                -webkit-border-radius: 5px;
                background-color:#253d7a;;
                padding:5px;
                text-decoration:none;
                font-weight:bold;
        }
        .content .second a:hover {
            color:#253d7a;
        }
        .content .second .text2 span a {
            color:#253d7a;;
        }
        .link{
            background:#ff5840;
            color: #fff;
        }
        .ico-red{
            width: 3em;
            padding: 2em 1em;            
        }
        .ico-red:hover{
            cursor:pointer;                        
            width: 4em;
            padding: 1em 1em;
        }
        .flex{
            justify-content: space-around;
            flex-direction: row;
            align-items: center;     
            margin: 0.5em auto;
            text-align: center;       
        }
    </style>
</head>
    <body>
        <div class="content">
            <div class="first">
                <img class="bonus1" src="https://www.upaq.com.ar/cms/assets/images/logos/upaqLogo.png" width="100"/>
                <img class="bonus2" src="https://www.upaq.com.ar/images/box-email.png" width="100"/>
            </div>
            <div class="second">
                <div class="title">Saludos desde <br> <span>UPAQ</span> </div>
                <div class="div"> </div>
                <div class="text">Muchas gracias por elegirnos</div>
                <div class="text flex">
                    <p>Hay nuevos viajes disponibles </p>
                    <p>Ingresa en <a href="www.upaq.com.ar">UPAQ</a> para conseguirlos antes de que alguien más lo haga</p>
                </div>
                <br/>            
                <br/>
                <div class="div"> </div>
                <div class="text2">
                    Por cualquier consulta comunicate con<br/>
                    <span style="color:#ff5840;font-weight:bold;">info@nexosmart.com.ar</span>
                </div>
            </div>
        </div>
    </body>
</html>';



// CADETE: viaje aceptado se le pasa la info al cadete.
$new_viajes_cadetes = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <style>
        * {
            font-family:"Open Sans";
            color: #424242;
            font-size:16px;
            text-align:left;
        }
        .content {
            margin:auto;
            max-width:400px;
            max-height:900px;
            background-color:#FFFFFF;
            border:1px solid #9E9E9E;
        }
        .content .first {
            padding:15px;
            background-color:#212121;
            height:50px;
        }
        .content .first .bonus1 {
            float:left;
            max-height:40px;
        }
        .content .first .bonus2 {
            max-height: 120px;
            float: right;
        }
        .content .second {
            padding:15px;
        }
        .content .second .title {
            font-weight:bold;
            font-size:35px;
        }
        .content .second .title span {
            color:#ff5840;
            font-weight:bold;
            font-size:35px;
        }
        .content .second .div {
            border-top:1px solid #9E9E9E;
            height:1px;
            width:100%;
            margin-top:30px;
            margin-bottom:30px;
        }
        .content .second .text2 {
            font-size:14px;
        }
        .content .second .fix-a {
            margin:auto;
            align-content:center;
            text-align:left;
        }
        .content .second .link {
            margin:auto;
            text-align:center;
            color:#FAFAFA;
            border: 1px solid #253d7a;;
                border-radius: 5px;
                -moz-border-radius: 5px;
                -webkit-border-radius: 5px;
                background-color:#253d7a;;
                padding:5px;
                text-decoration:none;
                font-weight:bold;
        }
        .content .second a:hover {
            color:#253d7a;
        }
        .content .second .text2 span a {
            color:#253d7a;;
        }
        .link{
            background:#ff5840;
            color: #fff;
        }
        .ico-red{
            width: 3em;
            padding: 2em 1em;            
        }
        .ico-red:hover{
            cursor:pointer;                        
            width: 4em;
            padding: 1em 1em;
        }
        .flex{
            justify-content: space-around;
            flex-direction: row;
            align-items: center;     
            margin: 0.5em auto;
            text-align: center;       
        }
    </style>
</head>
    <body>
        <div class="content">
            <div class="first">
                <img class="bonus1" src="https://www.upaq.com.ar/cms/assets/images/logos/upaqLogo.png" width="100"/>
                <img class="bonus2" src="https://www.upaq.com.ar/images/box-email.png" width="100"/>
            </div>
            <div class="second">
                <div class="title">Saludos desde <br> <span>UPAQ</span> </div>
                <div class="div"> </div>
                <div class="text">Muchas gracias por elegirnos</div>
                <div class="text flex">
                    <p>Felicidades por ACEPTAR el viaje </p>
                    
                    <p><b>INFO:</b></p>
                    <p>Dirección de Origen: '.$origen.' - '.$dep_origen.'</p>
                    <p>Dirección de Destino: '.$destino.' - '.$dep_destino.'</p>
                    <p>Tipo de viaje: '.$tipo.'</p>
                    <p>Destinatario: '.$destinatario.'</p>
                    <p>Descripción: '.$descripcion.'</p>

                    <p>Ingresa en <a href="www.upaq.com.ar">UPAQ</a> para conseguirlos antes de que alguien más lo haga</p>
                </div>
                <br/>            
                <br/>
                <div class="div"> </div>
                <div class="text2">
                    Por cualquier consulta comunicate con<br/>
                    <span style="color:#ff5840;font-weight:bold;">info@nexosmart.com.ar</span>
                </div>
            </div>
        </div>
    </body>
</html>';

// end -> plantillas.

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

//direcci�n del remitente
$headers .= "From: UPAQ <no-response@upaq.com.ar>\r\n";

//mando el mail;
mail($email,$asunto,$plantilla,$headers);

$response = true;

} else {

$response = false;

}

echo json_encode($response);

?>