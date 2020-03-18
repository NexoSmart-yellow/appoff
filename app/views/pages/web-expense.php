<section style="display: none" id="panel-expense">

    <div class="cat_selected">
        <img src="assets/images/icon/ico_combustible.png">
        <span id="name_type_expense">Combustible</span>
        <div class="bt_more_expenses" role="group">
            <i id="btnGroupDrop1" class="fas fa-caret-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a class="dropdown-item bt_gasto" data-expense="combustible" href="#">Combustible</a>
            <a class="dropdown-item bt_gasto" data-expense="peaje" href="#">Peaje</a>
            <a class="dropdown-item bt_gasto" data-expense="estacionamiento" href="#">Estacionamiento</a>
            <a class="dropdown-item bt_gasto" data-expense="otros" href="#">Otros</a>
            </div>
        </div>
    </div>

    <div class="div_date">
        <span class="date_today">Sábado 17-02-2019</span>
    </div>

    <div class="main_expenses">
        <div>
            <p class="tipo_gasto" id="tipo_gasto">Combustible</p>
            <p class="dato_gasto" id="razon">YPF</p>
            <p class="dato_gasto" id="info_factura">Fact: A 0001-00002525</p>
            <img src="assets/images/icon/cam_ico.png" alt="">
            <p class="importe">$<span id="importe">600,00</span></p>
        </div>
        <div>
            <p class="tipo_gasto" id="tipo_gasto">Combustible</p>
            <p class="dato_gasto" id="razon">YPF</p>
            <p class="dato_gasto" id="info_factura">Fact: A 0001-00002525</p>
            <img src="assets/images/icon/cam_ico.png" alt="">
            <p class="importe">$<span id="importe">600,00</span></p>
        </div>
        <div>
            <p class="tipo_gasto" id="tipo_gasto">Combustible</p>
            <p class="dato_gasto" id="razon">YPF</p>
            <p class="dato_gasto" id="info_factura">Fact: A 0001-00002525</p>
            <img src="assets/images/icon/cam_ico.png" alt="">
            <p class="importe">$<span id="importe">600,00</span></p>
        </div>
    </div>
    <div class="add_comprobante">
        <p>Agregar Comprobante</span></p>
        <img width="35px" src="assets/images/icon/ico_add_comp.png" alt="">
    </div>

    <div class="modal fade" id="modal_add_comprobante" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>+Agregar</span>
                    <form id="form_add_expense" action="">
                        <input id="in_razon" type="text" placeholder="Razón Social">
                        <input id="in_date" type="date" placeholder="Fecha" >
                        <input id="in_factura" type="text" placeholder="Factura Tipo / Nro">
                        <input id="in_importe" type="number" placeholder="importe">
                        <div>
                            <img width="30" src="assets/images/icon/cam_ico.png">
                            <input style="border-bottom: 2px solid rgb(168, 168, 168);" id="in_foto" type="text" placeholder="Foto del Comprobante" placeholder="Fecha" onfocus="(this.type='file')" onblur="(this.type='text')">
                        </div>
                    </form>
                    <button type="button" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</section>