<section style="display: none" id="panel-espontaneos">
    <div class="step1_esp">
        <div class="tit_espontaneos">
            <img src="assets/images/icon/ico_espon.png" alt="">
            <h5>Selecciona el cliente</h5>
        </div>
        <div class="main-steps-rep">
            <h5>Cliente</h5>
            <div class="cont_inpEsp">
                <i class="fas fa-caret-down"></i>
                <select id="cliente_espon">
                    <option value="">LATAM</option>
                    <option value="">AMEX</option>
                </select>
            </div>
            <h5>Locación</h5>
            <div class="cont_inpEsp">
                <i class="fas fa-caret-down"></i>
                <select id="locacion_espon">
                    <option selected disabled>Seleccioná una locación</option>
                </select>
            </div>
            <h5>Pedido por</h5>
            <div class="cont_inpEsp">
                <i class="fas fa-caret-down"></i>
                <select id="pedido_espon">
                    <option selected disabled>Seleccioná un contacto</option>
                </select>
            </div>
            <h5>Título de la avería</h5>
            <div class="cont_inpEsp">
                <input id="tit_otEsp" type="text">
            </div>
            <p class="err_espon"></p>
            <div class="btns_slider">
                <button type="button" id="bt_next_espontaneo" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Siguiente</button>
                <button type="button" class="btn_nook cancel_expontaneo" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
    <div class="step2_esp">
        <div class="tit_espontaneos">
            <img src="assets/images/icon/ico_espon.png" alt="">
            <h5>Agregar tareas</h5>
        </div>
        <div class="main-steps-rep">
            <h5>Item <span class='itemEsp_num'></span></h5>
            <div class="cantYunid">
                <span>Cant. <input id="num_itemEsp"  type="number"></span>
                <span>Unid. <select id="unit_itemEsp" class="select_Ucorrec"></select></span>
            </div>
            <textarea id="desc_itemEsp" rows="7" placeholder="Realizar descripción de los trabajos a realizar."></textarea>
            <div class="div_foto_up">
                <label for="espontaneo_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar fotos</p></span></label>
                <span class="espontaneo_foto"><input class="field_item" style="display: none" id="espontaneo_foto" type="file" accept="image/jpg,image/jpeg,image/png" multiple/></span>
                <span id="name_espontaneo_foto"></span>
            </div>
            <div class="addItem_esp">
                <span>+ Agregar Ítem</span>
            </div>
            <p class="err_espon2"></p>
            <div class="btns_slider2">
                <button type="button" id="bt_send_espontaneo" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Siguiente</button>
                <button type="button" class="btn_nook cancel_expontaneo">Cancelar</button>
            </div>
        </div>
    </div>
    <div class="step3_esp">
        <div class="main_info_ots">
            <img src="assets/images/icon/operarios.png" alt="">
            <p id="empresa_ot">Amex</p>
            <p>Salón Vip</p>
            <p class="text_resaltado" id="desc_ot">1° Visita Mto.</p>
        </div>
        <div class="div_items">
            <div class="all_items">
                <div class="item_otsEsp">
                    <h5>Item 1 <span id="img_several"></span></h5>
                    <p>Cambio de lámparas en el salón</p>
                    <img src="assets/images/icon/cam_ico_ots.png" alt="">
                </div>
            </div>

            <div class="fix_buttonEs">
                <div class="request_approval">
                    <p><span id="status_ot">Solicitar aprobación de ejecución</p>
                </div>
            </div>
        </div>
    </div>
</section>