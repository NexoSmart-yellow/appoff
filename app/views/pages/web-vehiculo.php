<section style="display: none" id="panel-vehiculo"> 
    <div class="car_selected">
        <img src="assets/images/img/data_car.png">
        <span id="name_type_expense">Vehículo</span>
        <div class="bt_more_expenses" role="group">
            <i id="btnGroupDrop3" class="fas fa-caret-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
            <div class="dropdown-menu btnGroupDrop3" aria-labelledby="btnGroupDrop3">
                <a class="dropdown-item bt_car" href="#">AB-004-FC</a>
                <a class="dropdown-item bt_car" href="#">NUT-453</a>
                <a class="dropdown-item bt_car" href="#">AD-250-GH</a>
                <a class="dropdown-item bt_car" href="#">HOP 765</a>
                <a class="dropdown-item bt_car" href="#">AC-125-JM</a>
            </div>
        </div>
    </div>
    <div class="main-vehiculo">
        <div class="modal fade" id="modal_get_car" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Hola ;) <br> Vas a estar a Cargo de este vehículo</p>
                        <h5>Confirmar</h5>
                        <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                        <input class="form-control" name="clave_gestion" type="password" required="required" placeholder="*****"/>
                        <button type="button" id="btn_ok_getcar" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                        <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>