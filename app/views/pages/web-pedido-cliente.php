<section style="display: none" id="panel-pedido-cliente">
    <div class="tit_replanteos">
        <img src="assets/images/img/operarios.png" alt="">
        <h5>PEDIDO</h5>
    </div>
    <div class="main-steps-rep swiper-container4">
        <h5>Asunto</h5>
        <textarea name="tit_rep" id="tit_rep" cols="30" rows="4" placeholder='Escriba un título para el replanteo"'></textarea>
        <h5>Acción</h5>
        <div class="div_cot_ejec">
            <button id="bt_cotiza" class="btn_cot_ejc">Cotizar</button>
            <button id="bt_ejecuta" class="btn_cot_ejc">Ejecutar</button>
        </div>
        <h5>Descripción de Averías</h5>
        <textarea name="desc_rep" id="desc_rep" cols="30" rows="4" placeholder='Describa las averías que a reparar en el establecimiento'></textarea>
        <div class="div_foto_up">
            <label for="remplanteo_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar fotos</p></span></label>
            <span class="remplanteo_foto"><input class="field_item" style="display: none" id="desc_fPend" type="file" accept="image/jpg,image/jpeg,image/png"/></span>
            <span id="name_remplanteo_foto"></span>
        </div>
        
        <div class="btns_slider">
            <button type="button" id="bt_send_replanteo2" class="btn_ok" data_user="app-cliente"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
            <button type="button" class="btn_nook cancel_item" data-dismiss="modal">Cancelar</button>
        </div>
    </div>
</section>