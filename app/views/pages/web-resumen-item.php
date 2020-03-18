<section style="display: none" id="panel-resumen-item">
    <div class="main_info_ots_resumen">
    </div>
    <div class="info_ots">
        <h5>Item 1</h5>
        <p>Cambio de lámparas en el salón</p>
        <!-- <div><img src="assets/images/icon/ico_several.png"></div>        -->
    </div>
    <div class="main_resumen">

        <div class="div_paso_resumen">
            <div class="edit_paso_averia">
                <h5>Avería</h5>
                <p id="desc_averia">Se encuentra lampara AR111 quemada en el salón en el sector de doble altura de trabajo h=6,00, total 5 lámparas.</p>
            </div>            
            <img id="foto_averiaS" class="open_img_modal" data-photos="" data_section="averia" src="assets/images/icon/cam_ico.png">
        </div>

        <div class="div_paso_resumen">
            <div class="edit_paso_repar">
                <h5>Reparación</h5>
                 <p id="desc_reparacion">Se cambio lampara AR111, luz neutra en el salón en el sector de altura de trabajo h=6,00, total 5 lámparas.</p>
            </div>            
            <img id="foto_reparacionS" class="open_img_modal" data-photos="" data_section="reparacion" src="assets/images/icon/cam_ico.png">
        </div>

        <div class="div_paso_resumen2">
            <h5>Materiales</h5>
            <div class="div_resume_material">
                <h5>Pintura</h5>
                <p>Cant. 2 Lts.</p>
                <p>Sintético blanco</p>
            </div>
            <div class="div_resume_material">
                <h5>Lamparas</h5>
                <p>Cant. 3</p>
                <p>PLL 18W – Luz Neutra</p>
            </div>
            <!-- <img src="assets/images/icon/cam_ico.png"> -->
        </div>

        <div class="div_paso_resumen">
            <div class="edit_paso_notas">
                <h5>Notas y aclaraciones</h5>
                <p  id="desc_notes">Se prolongo el tiempo por la cantidad de personas en el lugar.</p>
            </div>          
            <img id="foto_notesS" class="open_img_modal" data-photos="" data_section="notes" src="assets/images/icon/cam_ico.png">
        </div>

        <div class="bar_pendiente">
            <img src="assets/images/icon/alert.png" alt="">
            <span>Pendiente</span>
        </div>
        
        <div class="div_btn_close_ot">
            <p>Terminar Ítem</p>
            <div>
                <button type="button" id="btn_fin_item" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                <button type="button" class="btn_nook leave_item" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
    <div class="main_pendientes">
        <div class="div_main_pendientes">
            <div class="bar_pendiente_page">
                <img src="assets/images/icon/alert.png" alt="">
                <span>Pendiente</span>
            </div>
            <div class="content_pendientes">
                <h5>Tareas</h5>
                <label for="desc_pend">Descripción:</label>
                <textarea name="desc_pend" id="desc_pend" cols="30" rows="4" placeholder="Realizar descripción de los trabajos a realizar."></textarea>
                <div>
                    <span>Cantidad: </span>
                    <input name="cant_pend" id="cant_pend" type="text" >
                </div>
                <div style="margin-bottom: 20px;">
                    <span>Unidad: </span>
                    <select id="uni_pend" class="select_Ucorrec">
                        <option value=""></option>
                    </select></p>                        
                </div>
                <h5>Materiales</h5>
                <div class="all_materials_pend">

                </div>
                <button class="carga_mat_pend">+ Agregar</button>
                <h5>Notas y aclaraciones</h5>
                <textarea name="note_pend" id="note_pend" cols="30" rows="4" placeholder="Descripción y detalles, herramientas, horarios, precauciones."></textarea>
                <!-- <div class="div_foto_up">
                    <label for="note_fPend"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar fotos</p></span></label>
                    <span class="note_fPend"><input class="field_item" style="display: none" id="note_fPend" type="file" accept="image/jpg,image/jpeg,image/png"/></span>
                    <span id="name_note_fPend"></span>
                </div> -->
                <!-- <div class="bar_pendiente_more">
                    <img src="assets/images/icon/alert.png" alt="">
                    <span>+ Pendiente</span>
                </div> -->
                <div class="div_btn_paso3">
                    <button type="button" class="btn_ok add_pendiente" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook cancel_pendiente" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- modals -->

    <div class="modal fade modal_edit_step" id="modal_edit_averia" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>Editar avería</span>
                    <form class="form_add_material3" action="">
                        <p>Descripción: <textarea name="" id="edit_averia" cols="30" rows="4" placeholder="Se encuentra lampara AR111 quemada en el salón en el sector de doble altura de trabajo h=6,00, total 5 lámparas"></textarea></p>
                    </form>
                    <button type="button" class="btn_ok" id="bt_edit_averia" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade modal_edit_step" id="modal_edit_reparacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>Editar reparación</span>
                    <form class="form_add_material3" action="">
                        <p>Descripción: <textarea name="" id="edit_reparacion" cols="30" rows="4" placeholder="Se cambio lampara AR111, luz neutra en el salón en el sector de altura de trabajo h=6,00, total 5 lámparas."> </textarea></p>
                    </form>
                    <button type="button" class="btn_ok" id="bt_edit_reparacion" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade modal_edit_step" id="modal_edit_notas" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>Editar Notas</span>
                    <form class="form_add_material3" action="">
                        <p>Comentario: <textarea name="" id="edit_notas" cols="30" rows="4" placeholder="Se prolongo el tiempo por la cantidad de personas en el lugar."></textarea></p>
                    </form>
                    <button type="button" class="btn_ok" id="bt_edit_notas" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- edit material -->
    <div class="modal fade modal_edit_step" id="modal_edit_mat" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" data-dismiss="modal" class="btn_addMaterial">+ Agregar</button>
                    <span>Editar Material</span>
                    <form class="form_add_material3" action="">
                        <!-- <p>Stock: <select class="stock_select">
                            <option value="">Stock en transito</option>
                        </select></p>
                        <p>Rubro: <select class="rubro_select">
                            <option value="">Varios</option>
                        </select></p> -->
                        <p>Material: <span style="font-weight: normal; font-size: 17px;" id="material-edit-name">-</span></p>
                        <p>Cantidad: <input type="number" id="material-edit-cant" data-material-id=""> <span id="material-edit-unit" style="font-weight: normal; font-size: 17px;">-</span></p>
                        <!-- <p>Descripción: <input type="text" placeholder="Base de goma y masa de hierro fundido"></p> -->
                    </form>
                    <button type="button" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_delete" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Eliminar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade modal_edit_step" id="modal_addMaterial_pend" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>Agregar Material</span>
                    <form class="form_add_material3" action="">
                        <p>Stock: <select class="stock_select">
                            <option value="">Ingresa un stock</option>
                        </select></p>
                        <!-- <p>Rubro: <select class="rubro_select">
                            <option value="">Varios</option>
                        </select></p> -->
                        <p>Material: <input type="text" id="matName_pend" placeholder="Ingresa un nombre"></p>
                        <p>Cantidad: <input type="number" id="matCant_pend" placeholder="2"></p>
                        <p>Unidad: <select id="matUnid_pend" class="select_Ucorrec">
                            <option value=""></option>
                        </select></p>
                        <!-- <p>Descripción: <input type="text" id="matDesc_pend" placeholder="Ingresa una descripción"></p> -->
                    </form>
                    <div class="div_foto_up">
                        <label for="materialPen_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar foto</p></span></label>
                        <span class="materialPen_foto"><input class="field_item" style="display: none" id="materialPen_foto" type="file" accept="image/jpg,image/jpeg,image/png"/></span>
                        <span style="font-size: 15px; font-weight: 500;" id="name_materialPen_foto"></span>
                    </div> 
                    <button type="button" class="btn_ok" id="bt_cargaMaterP" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</section>
