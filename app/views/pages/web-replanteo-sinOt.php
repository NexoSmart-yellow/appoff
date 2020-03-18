<section style="display: none" id="panel-replanteo-sinOt">
    <div class="tit_replanteos">
        <img src="assets/images/img/operarios.png" alt="">
        <h5 id="tit_repledido">REPLANTEOS</h5>
    </div>
    <div class="main-steps-rep step1_repl">
        <h5>Cliente</h5>
        <div class="cont_inpEsp">
            <i class="fas fa-caret-down"></i>
            <select id="cliente_repl">
            </select>
        </div>
        <h5>Pedido por</h5>
        <div class="cont_inpEsp">
            <i class="fas fa-caret-down"></i>
            <select id="pedido_repl">
                <option selected disabled>Seleccioná un contacto</option>
            </select>
        </div>
        <h5>Locación</h5>
        <div class="cont_inpEsp">
            <i class="fas fa-caret-down"></i>
            <select id="locacion_repl">
                <option selected disabled>Seleccioná una locación</option>
            </select>
        </div>
        <div class="btns_slider">
            <button type="button" id="bt_next_replanteo" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Siguiente</button>
            <button type="button" class="btn_nook cancel_item" data-dismiss="modal">Cancelar</button>
        </div>
    </div>
    <div class="main-steps-rep step2_repl">
        <h5>Asunto</h5>
        <textarea name="tit_rep2" id="tit_rep2" cols="30" rows="4" placeholder='Escriba un título"'></textarea>
        <h5>Acción</h5>
        <div class="div_cot_ejec">
            <button id="bt_cotiza2" class="btn_cot_ejc2">Cotizar</button>
            <button id="bt_ejecuta2" class="btn_cot_ejc2">Ejecutar</button>
        </div>
        <h5>Prioridad</h5>
        <select name="priority_rep2" id="priority_rep2">
            <option value="normal">Normal</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
            <option value="pendiente">Pendiente</option>
        </select>
        <h5>Descripción de Averías</h5>
        <textarea name="desc_rep2" id="desc_rep2" cols="30" rows="4" placeholder='Describa las averías que a reparar en el establecimiento'></textarea>
        <div class="div_foto_up">
            <label for="replanteo2_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar fotos</p></span></label>
            <span class="replanteo2_foto"><input class="field_item" style="display: none" id="replanteo2_foto" type="file" accept="image/jpg,image/jpeg,image/png" multiple/></span>
            <span id="name_replanteo2_foto"></span>
        </div>
        
        <div class="btns_slider">
            <button type="button" id="bt_send_replanteoSO" class="btn_ok" data_user="app-empleado"><img src="assets/images/img/tilde.png" alt="">Enviar</button>
            <button type="button" id="bt_back_replanteo" class="btn_nook" >Volver</button>
        </div>
    </div>
</section>