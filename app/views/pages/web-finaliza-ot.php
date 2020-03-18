<section style="display: none" id="panel-finaliza-ot">
    <div class="main_info_ots">
        <img src="assets/images/icon/operarios.png" alt="">
        <p id="empresa_ot">Amex</p>
        <p class="cod-ots">OT 60-01875/0</p>
        <p>Salón Vip</p>
        <p class="text_resaltado" id="desc_ot">1° Visita Mto.</p>
        <p >08:45hs. a 16:45hs</p> 
        <p class="type_duration"><span id="duration_job">8:00hs.</span><br><span id="type_job">Normal</span></p>
        <div class="caja_status">
            <div style="background: #92d050;" class="iportancia_ot"></div>
            <div class="item_pendiente"></div>
        </div>
    </div>
    <div class="main_finaliza_ot">

        <div class="total_time_ot">
            <div class="contenedor_mainf">
                <p>El tiempo total de la ejecución es de:</p>
                <span id="total_timeOt">01:45:33</span>
                <!-- <div class="bt_share_code" id="next_code">
                    <img src="assets/images/icon/share.png" alt="">
                    <p>Firma conformidad cliente</p>
                </div> -->
                <div class="btns_slider">
                    <button type="button" class="normal_btn" id="next_firmaAca">Firmar acá</button>
                    <button type="button" class="normal_btn" id="next_code">Firma desde<br>app cliente</button>
                </div>
            </div>
        </div>

        <div class="code_firma_ot">
            <div class="contenedor_mainf">
                <p>Compartí este codigo con el cliente:</p>
                <span id="code-ot">R62TL9</span>
                <div class="btns_slider">
                    <button type="button" class="btn_ok cierraOtAca"><img src="assets/images/img/tilde.png" alt="">Finalizar</button>
                </div>
            </div>
        </div>

        <div class="selectContact_ot">
            <div class="contenedor_mainf">
                <p>Selecciona el contacto que va a firmar la ejecución:</p>
                <div class="cont_signContact">
                    <i class="fas fa-caret-down"></i>
                    <select id="sign_contact"></select>
                </div>
                <div class="btns_slider">
                    <button type="button" class="btn_ok next_conformidad"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook back_to_timeOt">Volver</button>
                </div>
            </div>
        </div>

        <div class="conformidad">
            <div class="contenedor_mainf">
                <div class="bt_resumenOt">
                    <button>Resumen del Trabajo</button>
                </div>
                <div class="main-conformidad">
                    <div class="div_checkbox">
                        <img src="assets/images/img/face1.jpg" alt="">
                        <input type="radio" name="conformidad" value="4">
                    </div>
                    <div class="div_checkbox">
                        <img src="assets/images/img/face2.jpg" alt="">
                        <input type="radio" name="conformidad" value="3">
                    </div>  
                    <div class="div_checkbox">
                        <img src="assets/images/img/face3.jpg" alt="">
                        <input type="radio" name="conformidad" value="2">
                    </div>  
                    <div class="div_checkbox">
                        <img src="assets/images/img/face4.jpg" alt="">
                        <input type="radio" name="conformidad" value="1">
                    </div>  
                </div>       
                <div class="coment_conformidad">
                    <h5>Comentarios:</h5>
                    <textarea name="" id="final_coment" cols="30" rows="4" placeholder="Realizar comentario sobre el trabajo llevado a cabo por el técnico."></textarea>
                </div>

                <div class="btns_slider">
                    <button type="button" class="btn_ok next_firma" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook back_to_code" data-dismiss="modal">Volver</button>
                </div>
            </div>
        </div>

        <div class="firma">
            <div class="contenedor_mainf">
                <div id="signature-pad" class="signature-pad">
                    <div class="signature-pad--body" style="padding-left: 0px;">
                        <div class="description" id="firma_description"><span></span></div>
                        <canvas id="canvasFirma"></canvas>
                    </div>
                    <div class="signature-pad--footer" style="padding-left: 0px;">
                        <div class="signature-pad--actions">
                            <div class="">
                                <button type="button" class="buttonFirma clear" data-action="clear">Limpiar</button>
                            </div>
                            <!-- <div class="">
                                <button type="button" id="btn_send_firma" class="buttonFirma ok" data-action="ok">Confirmar</button>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="bt_share_code" id="bt-finaliza-otCliente">
                    <p>Finalizar</p>
                </div>
            </div>
        </div>

        <div class="resumen_finalOt">
            <div class="contieneAllOt">           
                
            </div>
            
            <div class="divBt_resumenOt">
                <div class="div_btn_close_ot">
                    <button type="button" class="btn_nook" id="back_conformidad">Volver</button>
                </div>
            </div>
        </div>

        <div class="modal fade modal_SIFR" id="modal_imageF" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="contenedor_imgF">
                        </div>
                        <button type="button" class="btn_nook" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>