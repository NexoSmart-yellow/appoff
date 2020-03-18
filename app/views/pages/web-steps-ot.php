<section style="display: none" id="panel-steps-ot">
    <div class="info_ots">
        <img src="assets/images/icon/operarios.png">
        <h5>Item <span class="num_item_all">1</span></h5>
        <p>Cambio de lámparas en el salón: <span>5 U.</span></p>
        <!-- <div><img src="assets/images/icon/ico_several.png"></div>        -->
    </div>
    <div class="main-steps-ot swiper-container2">

        <div class="bar_action_ot">
            <div class="div_bar_action_ot btn_action_ot0">
                <i class="fas fa-chevron-left back_slide"></i>
                <span>AVERIA</span>
            </div>
            <div class="div_steps_ot">
                <div style="background: #fd5e13;" id="step1_ot"></div>
                <div id="step2_ot"></div>
                <div id="step3_ot"></div>
                <div id="step4_ot"></div>
            </div>
        </div>

        <div class="swiper-wrapper">

            <div class="swiper-slide slide_correctivo1">
                <textarea class="field_item" name="txt_averia" id="txt_averia" cols="30" rows="10" placeholder="Describí la situación técnica actual a reparar"></textarea>
                <div>
                    <div class="div_foto_up">
                        <label for="averia_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar foto Actualidad</p></span></label>
                        <span class="averia_foto"><input class="field_item" style="display: none" id="averia_foto" type="file" accept="image/jpg,image/jpeg,image/png" multiple /></span>
                        <span id="name_averia_foto"></span>
                    </div>
                    <div class="btns_slider">
                        <button type="button" id="bt_go_reparacion" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                        <button type="button" class="btn_nook leave_item" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>

            <div class="swiper-slide slide_correctivo2">
                <textarea class="field_item" name="txt_reparacion" id="txt_reparacion" cols="30" rows="10" placeholder="Detalla técnicamente tu trabajo, Ubicación, materiales, medidas, alturas, calidad, limpieza, tareas previas."></textarea>
                <div>
                    <div class="div_foto_up">
                        <label for="reparacion_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar foto Reparación</p></span></label>
                        <span class="reparacion_foto"><input class="field_item" style="display: none" id="reparacion_foto" type="file" accept="image/jpg,image/jpeg,image/png" multiple /></span>
                        <span id="name_reparacion_foto"></span>
                    </div>
                    <div class="btns_slider">
                        <button type="button" id="bt_go_materiales" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                        <button type="button" class="btn_nook leave_item" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>

            <div class="swiper-slide slide_correctivo3">
                <div class="main-materiales-ot swiper-container3">
                    <div class="sub_bar_action_ot"></div>

                    <div class="main_pasos">                       
                        <div class="list_panels">
                            
                        </div>
                        <div class="paso1_slide">
                            <div class="tabla_materiales">
                                <div class="div_btn_paso2">
                                    <button type="button" id="bt_go_materials" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Siguiente</button>
                                </div>
                            </div>                            
                        </div>

                        
                        <div class="paso2_slide">
                            <div class="bar_select_rubro">
                                <select class="js-example-basic-single select_material"></select>
                            </div>
                            <div class="tabla_materiales">
                                <table class="table rubro_table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Cant.</th>
                                            <th scope="col">Unid.</th>
                                        </tr>
                                    </thead>
                                    <tbody class="body_rubroTable">
                                        
                                    </tbody>
                                </table>
                                <div class="div_btn_paso2">
                                    <button type="button" id="bt_go_resumen" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Siguiente</button>
                                    <button type="button" class="btn_nook back_subSlider" data-dismiss="modal">Atras</button>
                                </div>
                            </div>                            
                        </div>

                        <div class="paso3_slide">
                            <div class="tabla_resumen">
                                <table class="table resumen_table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Cant.</th>
                                            <th scope="col">Unid.</th>
                                        </tr>
                                    </thead>
                                    <tbody class="tbody_resumen">
                                        
                                    </tbody>
                                </table>
                                <div class="div_fixed_steps">
                                    <div class="carga_manual">
                                        <p>Cargar manualmente</p>
                                        <img src="assets/images/icon/rubro.png">
                                    </div>
                                    <div class="div_btn_paso3">
                                        <button type="button" id="btn_fin_mater" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png">Siguiente</button>
                                        <button type="button" class="btn_nook back_subSlider" data-dismiss="modal">Atras</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>

            <div class="swiper-slide slide_correctivo4">
                <div class="main_notes">
                    <textarea class="field_item" name="txt_notes" id="txt_notes" cols="30" rows="10" placeholder="Realizar comentario de novedades u observaciones del cliente o de la realización del trabajo"></textarea>
                    <div>
                        <div class="div_foto_up">
                            <label for="notes_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar foto Notas</p></span></label>
                            <span class="notes_foto"><input class="field_item" style="display: none" id="notes_foto" type="file" accept="image/jpg,image/jpeg,image/png" multiple /></span>
                            <span id="name_notes_foto"></span>
                        </div>                        
                        <div class="btns_slider">
                            <button type="button" class="btn_ok bt_go_resumen" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                            <button type="button" class="btn_nook leave_item" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>  

    </div>

    <!-- Modal delete material -->
    <div class="modal fade" id="modal_delete_mate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Vas a borrar el material de la lista<br>¿Estás seguro?</p>
                    <button type="button" id="btn_delete_material" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal carga manual material -->
    <div class="modal fade" id="modal_carga_manual" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>Carga manual de materiales</span>
                    <form id="form_add_material2" action="">
                        <p>Stock:</p>
                        <select class="stock_select" id="matdepo_carga">
                            <option value="">Stock en transito</option>
                        </select>
                        <p>Material:</p>
                        <input id="matName_carga" type="text" placeholder="Nombre del material">
                        <p>Cantidad:</p>
                        <input id="matCant_carga" type="number" placeholder="2">
                        <p>Unidad:</p>
                        <select id="matUnid_carga" class="select_Ucorrec">
                            <option value=""></option>
                        </select>
                        <!-- <p>Descripción: <input type="text" placeholder="Base de goma y masa de hierro fundido"></p> -->
                    </form>
                    <div class="div_foto_up">
                        <label for="material_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar foto</p></span></label>
                        <span class="material_foto"><input class="field_item" style="display: none" id="material_foto" type="file" accept="image/jpg,image/jpeg,image/png"/></span>
                        <span style="font-size: 15px; font-weight: 500;" id="name_material_foto"></span>
                    </div>  
                    <button type="button" id="bt_carga_manual" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_descItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <h4>Descripción del Ítem</h4> <br>
                    <h5 id="descItem"></h5> <br>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</section>
