<section style="display: none" id="panel-summaryOrder">
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
        </div>
    </div>
    <div class="main_finaliza_ot">
        <div class="resumen_finalPedido">
            <div class="contieneAllOt">           
                <div class="info_ots">
                    <h5>Item 1</h5>
                </div>
                <div class="main_resumen">
                    <div class="div_paso_resumen">
                        <div class="edit_paso_averia">
                            <h5>Avería</h5>
                            <p>Descripcion de averia test Amex</p>
                        </div>            
                        <img class="open_img_modalR" data_section="averias" data_url="${item.exec.averia_foto}" src="assets/images/icon/cam_ico.png">
                    </div>
                    <div class="div_paso_resumen">
                        <div class="edit_paso_repar">
                            <h5>Reparación</h5>
                            <p>Descripcion de Reparación test Amex</p>
                        </div>            
                        <img class="open_img_modalR" data_section="reparaciones" data_url="${item.exec.reparacion_foto}" src="assets/images/icon/cam_ico.png">
                    </div>
                    <div class="div_paso_resumen2">
                        <div class="div_resume_material">
                            <h5>Rubro</h5>
                            <p>Cant. 1 U.</p>
                            <p>Escalera</p>
                        </div>
                    </div>
                    <div class="div_paso_resumen">
                        <div class="edit_paso_notas">
                            <h5>Notas y aclaraciones</h5>
                            <p>Notas para test Amex</p>
                        </div>          
                        <img class="open_img_modalR" data_section="notas" data_url="${item.exec.notas_foto}" src="assets/images/icon/cam_ico.png">
                    </div>
                </div>
            </div>
            
            <div class="divBt_backPedido">
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