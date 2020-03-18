<section style="display: none" id="panel-detalle-ots">
    <div class="main_info_ots">
        <img src="assets/images/icon/operarios.png" alt="">
        <p id="empresa_ot">Amex</p>
        <p class="cod-ots">OT 60-01875/0</p>
        <p>Salón Vip</p>
        <p class="text_resaltado" id="desc_ot">1° Visita Mto.</p>
        <p>08:45hs. a 16:45hs</p> 
        <p class="type_duration"><span id="duration_job">8:00hs.</span><br><span id="type_job">Normal</span></p>
        <div class="descripcion_ot"><i class="far fa-comment-alt"></i></div>
        <div class="caja_status">
            <div style="background: #92d050;" class="iportancia_ot"></div>
            <div class="item_pendiente"></div>
        </div>
    </div>
    <div class="div_items">
        <div class="all_items">
            <div class="item_ots">
                <h5>Item 1 <span id="img_several"></span></h5>
                <p>Cambio de lámparas en el salón</p>
                <img src="assets/images/icon/cam_ico_ots.png" alt="">
            </div>
            <div class="item_ots">
                <h5>Item 2</h5>
                <p>Repara puerta de acceso esta suelta</p>
                <img src="assets/images/icon/cam_ico_ots.png" alt="">
            </div>
            <div tabindex="0" class="item_ots pendiente" data-placement="top" data-toggle="popover" data-trigger="focus" data-content="Nos equivocamos en el modelo de tapa. Es línea Dama Capea. Cant,. 1">
                <h5>Item 3</h5>
                <p>Cambio de tapa de inodoro</p>
                <img src="assets/images/icon/cam_ico_ots.png" alt="">
                <div class="caja_status" style="top: 15px;">
                    <div class="item_pendiente"></div>
                    <input type="number">
                </div>
            </div>
        </div>
        <!-- <div class="bt_in_replanteo">
            <p>Ingresa Replanteos de nuevos trabajos</p>
            <div>
                <span id="num_replanteos">2</span>
                <img src="assets/images/img/operarios.png" alt="">
            </div>
        </div> -->
        <div class="div_mat_button">
            <div class="ask_material">
                <p><span>Pedir material</span></p>
            </div>
        </div>
        <div class="fix_button">
            <div class="realiza_ots">
                <p><span id="status_ot">Realizar</span><span class="ot_code">OT 60-01875/01</span></p>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_realiza_ot" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Estas por iniciar<br><span class='ot_code'>OT 60-01875/01</span></p>
                    <img src="assets/images/icon/operarios.png" alt=""> <br>
                    <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                    <input class="form-control" name="clave_gestion" id="clave_openItem" type="password" required="required" placeholder="*****"/>
                    <span class="erroM_openItem"></span>
                    <div>
                        <button type="button" class="btn_ok bt_inicia_ot"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                        <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal_finaliza_ot" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Cerrar y salir<br><span class='ot_code'>OT 60-01875/01</span></p>
                    <img src="assets/images/icon/operarios.png" alt=""> <br>
                    <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                    <input class="form-control" name="clave_gestion" id="clave_closeItem" type="password" required="required" placeholder="*****"/>
                    <span class="erroM_closeItem"></span>
                    <div>
                        <button type="button" id="bt_cierra_ot" class="btn_ok bt_end_ot"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                        <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal_inicia_ot" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Item <span class="num_item_all">1</span>:<br>Ya está iniciado por otro técnico.</p>
                    <img src="assets/images/icon/people.png" alt=""> <br>
                    <h5>Desea participar?</h5> <br>
                    <button type="button" id="bt_join_item" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_joined_ot" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <h4>Item en progreso</h4>
                    <img src="assets/images/icon/people.png" alt=""> <br>
                    <button type="button" id="bt_leave_item" class="btn_nook" data-dismiss="modal">Abandonar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_alertLeave" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <h4>Estas por abandonar el item.</h4>
                    <img src="assets/images/icon/people.png" alt=""> <br>
                    <h5>¿Estas seguro?</h5> <br>
                    <button type="button" id="bt_leave_ok" class="btn_ok" data-dismiss="modal">Aceptar</button>
                    <button type="button" id="bt_leave_cancel" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_itemClosed" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <h4>Se finalizó la ejecución del ítem</h4>
                    <img src="assets/images/icon/people.png" alt=""> <br>
                    <button type="button" id="bt_itemClosed" class="btn_nook" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_itemFinalizado" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <h5>¡Este item ya está finalizado!</h5>
                    <i class="far fa-check-square"></i> <br>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal carga manual material -->
    <div class="modal fade" id="modal_cargaManual_agenda" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>Carga manual de materiales</span>
                    <form id="form_add_materialA">
                        <p>Stock: <select class="stock_selectA" id="matdepo_cargaA">
                            <option value="">Stock en transito</option>
                        </select></p>
                        <p>Material: <input id="matName_cargaA" type="text" placeholder="Nombre del material"></p>
                        <p>Cantidad: <input id="matCant_cargaA" type="number" placeholder="2"></p>
                        <p>Unidad: <select id="matUnid_cargaA" class="select_Ucorrec">
                            <option value=""></option>
                        </select></p>
                        <!-- <p>Descripción: <input type="text" placeholder="Base de goma y masa de hierro fundido"></p> -->
                    </form>
                    <div class="div_foto_up">
                        <label for="materialA_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar foto</p></span></label>
                        <span class="materialA_foto"><input class="field_item" style="display: none" id="materialA_foto" type="file" accept="image/jpg,image/jpeg,image/png"/></span>
                        <span style="font-size: 15px; font-weight: 500;" id="name_materialA_foto"></span>
                    </div>  
                    <button type="button" id="bt_sendMaterial" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

</section>