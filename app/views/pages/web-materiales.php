<section style="display: none" id="panel-materiales">
    <div class="header-materiales">
        <!-- <div>
            <img src="assets/images/icon/ico_opm.png">
            <span>OPM</span>
        </div>
        <div>
            <img src="assets/images/icon/ico_oph.png">
            <span>OPH</span>
        </div>
        <div class="bt_lista_paneles" onclick="openList()">
            <i class="fas fa-caret-down"></i>
        </div> -->
        <div>
            <i class="far fa-credit-card"></i>
            <span>Ordenes de compra</span>
        </div>
    </div>
    <div class="main_materiales">
        <!-- <div class="list_panels">
            <a class="item_meteriales" data-expense="" href="#">Stock en Transito</a>
            <a class="item_meteriales" data-expense="" href="#">Preventivo</a>
            <a class="item_meteriales" data-expense="" href="#">Correctivo</a>
            <a class="item_meteriales" data-expense="" href="#">Obras</a>
            <a class="item_meteriales" data-expense="" href="#">Volver al Panel</a>
        </div> -->
        <div class="all_pedidosMC">
            <!-- <div class="pedido_otmh">
                <p>OT 60-01875/01-01 <span>OPM</span></p>
                <p><span style="color: #000 !important; font-weight: 800 !important;">Iberia - </span>Aeropuerto Jorge Newbery</p>
                <p>Salón Vip -  1° Visita Mto.</p>
                <div class="caja_status">
                    <div class="status_op"></div>
                </div>
            </div>
            <div class="pedido_otmh">
                <p>OT 60-01875/01-01 <span>OPM</span></p>
                <p><span style="color: #000 !important; font-weight: 800 !important;">Iberia - </span>Aeropuerto Jorge Newbery</p>
                <p>Salón Vip -  1° Visita Mto.</p>
                <div class="caja_status">
                    <div class="status_op"></div>
                </div>
            </div>
            <div class="pedido_otmh">
                <p>OT 60-01875/01-01 <span>OPM</span></p>
                <p><span style="color: #000 !important; font-weight: 800 !important;">Iberia - </span>Aeropuerto Jorge Newbery</p>
                <p>Salón Vip -  1° Visita Mto.</p>
                <div class="caja_status">
                    <div class="status_op"></div>
                </div>
            </div> -->
        </div>

        <!-- <div class="transit_stock">
            <p>Stock en Transito</p>
            <img width="35px" src="assets/images/icon/pedidos.png" alt="">
        </div> -->
    </div>
    <div class="modal fade" id="modal_busca_ot" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>Buscar OT</span>
                    <form id="form_add_material" action="">
                        <p><i class="fas fa-caret-down"></i>OT Nro.: <input type="text" placeholder="xx-xxx-xx"></p>
                        <p><i class="fas fa-caret-down"></i>Cliente: <input type="text" placeholder="Latam"></p>
                        <p><i class="fas fa-caret-down"></i>Locación: <input type="text" placeholder="Salon VIP EZE"></p>
                        <p><i class="fas fa-caret-down"></i>Titulo: <input type="number" placeholder="2° Visita de Mto"></p>
                    </form>
                    <button id="btn-search-done" type="button" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</section>