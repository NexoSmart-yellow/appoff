<section style="display: none" id="panel-replanteo">
    <!-- <div class="info_ots">
        <img src="assets/images/icon/operarios.png">
        <h5>Amex</h5>
        <p>Salón VIP</p>   
    </div> -->
    <div class="tit_replanteos">
        <img src="assets/images/img/operarios.png" alt="">
        <h5>REPLANTEOS</h5>
    </div>
    <div class="main-steps-rep swiper-container4">
        <h5>Asunto</h5>
        <textarea name="tit_rep" id="tit_rep" cols="30" rows="4" placeholder='Escriba un título para el replanteo"'></textarea>
        <h5>Acción</h5>
        <div class="div_cot_ejec">
            <button id="bt_cotiza" class="btn_cot_ejc">Cotizar</button>
            <button id="bt_ejecuta" class="btn_cot_ejc">Ejecutar</button>
        </div>
        <h5>Prioridad</h5>
        <select name="priority_rep" id="priority_rep">
            <option value="normal">Normal</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
            <option value="pendiente">Pendiente</option>
        </select>
        <h5>Descripción de Averías</h5>
        <textarea name="desc_rep" id="desc_rep" cols="30" rows="4" placeholder='Describa las averías que a reparar en el establecimiento'></textarea>
        <div class="div_foto_up">
            <label for="replanteo_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar fotos</p></span></label>
            <span class="replanteo_foto"><input class="field_item" style="display: none" id="replanteo_foto" type="file" accept="image/jpg,image/jpeg,image/png" multiple/></span>
            <span id="name_replanteo_foto"></span>
        </div>
        
        <div class="btns_slider">
            <button type="button" class="btn_ok bt_send_replanteo" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
            <button type="button" class="btn_nook cancel_item" data-dismiss="modal">Cancelar</button>
        </div>
    </div>
</section>
