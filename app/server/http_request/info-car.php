<?php

require "../config/config.php";

$data_car = $_POST['data_car'];

$content = '';

switch ($data_car) {
    case 'documentos':
        $content = '
                        <img src="assets/images/img/docs.png">
                        <span id="name_type_expense">Documentos</span>
                        <div class="bt_options_info" role="group">
                            <i id="btnGroupDrop4" class="fas fa-caret-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                            <div class="dropdown-menu btnGroupDrop4" aria-labelledby="btnGroupDrop4">
                                <a class="dropdown-item bt_option_info" href="#">Cedula Verde</a>
                                <a class="dropdown-item bt_option_info" href="#">VTV</a>
                                <a class="dropdown-item bt_option_info" href="#">Seguro</a>
                                <a class="dropdown-item bt_option_info" href="#">Patente</a>
                                <a class="dropdown-item bt_option_info" href="#">Registro de Conducir</a>
                            </div>
                        </div>';
        break;

    case 'control':
        $content = ' 
                        <img src="assets/images/img/docs.png">
                        <span id="name_type_expense">Control</span>
                        <div class="bt_options_info" role="group">
                            <i id="btnGroupDrop4" class="fas fa-caret-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                            <div class="dropdown-menu btnGroupDrop4" aria-labelledby="btnGroupDrop4">
                                <a class="dropdown-item bt_option_info" href="#">Cedula Verde</a>
                                <a class="dropdown-item bt_option_info" href="#">VTV</a>
                                <a class="dropdown-item bt_option_info" href="#">Seguro</a>
                                <a class="dropdown-item bt_option_info" href="#">Patente</a>
                                <a class="dropdown-item bt_option_info" href="#">Registro de Conducir</a>
                            </div>
                        </div>';
        break;

    case 'mantenimiento':
        $content = ' 
                        <img src="assets/images/img/docs.png">
                        <span id="name_type_expense">Mantenimiento</span>
                        <div class="bt_options_info" role="group">
                            <i id="btnGroupDrop4" class="fas fa-caret-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                            <div class="dropdown-menu btnGroupDrop4" aria-labelledby="btnGroupDrop4">
                                <a class="dropdown-item bt_option_info" href="#">Cedula Verde</a>
                                <a class="dropdown-item bt_option_info" href="#">VTV</a>
                                <a class="dropdown-item bt_option_info" href="#">Seguro</a>
                                <a class="dropdown-item bt_option_info" href="#">Patente</a>
                                <a class="dropdown-item bt_option_info" href="#">Registro de Conducir</a>
                            </div>
                        </div>
                    ';
        break;

    case 'otros_car':
        $content = '
                        <img src="assets/images/img/docs.png">
                        <span id="name_type_expense">Otros</span>
                        <div class="bt_options_info" role="group">
                            <i id="btnGroupDrop4" class="fas fa-caret-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                            <div class="dropdown-menu btnGroupDrop4" aria-labelledby="btnGroupDrop4">
                                <a class="dropdown-item bt_option_info" href="#">Cedula Verde</a>
                                <a class="dropdown-item bt_option_info" href="#">VTV</a>
                                <a class="dropdown-item bt_option_info" href="#">Seguro</a>
                                <a class="dropdown-item bt_option_info" href="#">Patente</a>
                                <a class="dropdown-item bt_option_info" href="#">Registro de Conducir</a>
                            </div>
                        </div>
              ';
        break;
    
    default:
        # code...
        break;
}

$response['content'] = $content;

echo json_encode($response);

?>