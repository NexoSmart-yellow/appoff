<section style="display: none" id="panel-clientSign">
    <div class="tit_replanteos">
        <i class="fas fa-file-signature"></i>
        <h5>CONFORMIDAD Y FIRMA</h5>
    </div>
    <div class="main-clientSign">
        <div class="conformidad_client">
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
                <button type="button"  class="btn_ok" id="go_firmaCliente"><img src="assets/images/img/tilde.png" alt="">Siguiente</button>
                <button type="button" class="btn_nook back_homeCliente">Cancelar</button>
            </div>
        </div>

        <div class="firma_client">
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
                <div class="bt_share_code" id="bt-finaliza-ot">
                    <p>Finalizar</p>
                </div>
            </div>
        </div>

        <div class="resumen_finalOt">
            <div class="contieneAllOt">           
                
            </div>
            
            <div class="divBt_resumenOt">
                <div class="div_btn_close_ot">
                    <button type="button" class="btn_nook" id="back_conformidadC">Volver</button>
                </div>
            </div>
        </div>
    </div>
</section>