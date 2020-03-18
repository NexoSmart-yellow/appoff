<!-- INFO: SECCION DONDE SE DECLARAN LOS MODAL. -->

<div class="modal fade" id="modal_showOpenOts" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h4 class="textOpenOts">Tenés Ordenes de trabajo sin cerrar:</h4>
                <div class="resultOpenOts"></div>
                <h5>Cerralas y volvé para finalizar la jornada.</h5> <br>
                <button type="button" id="bt_goCloseAllOts" class="btn_ok" data-dismiss="modal">Aceptar</button>
                <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_addFileOc" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
          <div class="modal-body">
              <span>Agregar foto de recibo de compra</span>
              <div class="div_foto_up add_pictureOc">
                  <label for="ocFile_foto"><span class="cont_element_foto"><img src="assets/images/icon/cam_ico.png" alt=""><p>Agregar foto</p></span></label>
                  <span class="ocFile_foto"><input class="field_item" style="display: none" id="ocFile_foto" type="file" accept="image/jpg,image/jpeg,image/png"/></span>
                  <span style="font-size: 15px; font-weight: 500;" id="name_ocFile_foto"></span>
              </div>  
              <button type="button" id="bt_sendfileOC" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
              <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
          </div>
      </div>
  </div>
</div>

<div class="modal fade" id="modal_files_OC" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h5>Archivos de la orden de compra</h5> <br>
                <div class="file_list"></div>
                <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_errorJornada" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p>Todavia no iniciaste la jornada</p>
                <i class="far fa-calendar-times"></i> <br>
                <h5>¿Querés comenzar tu día ahora?</h5> <br>
                <button type="button" id="bt_goComenzar" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_realiza_oc" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p>Estas por iniciar una orden de compra</p>
                <img src="assets/images/icon/operarios.png" alt=""> <br>
                <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                <input class="form-control" name="clave_gestion" id="clave_openOc" type="password" required="required" placeholder="*****"/>
                <span class="erroM_openOc"></span>
                <div>
                    <button type="button" class="btn_ok bt_inicia_oc"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button> 
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_finish_oc" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p>Estas por cerrar una orden de compra</p>
                <img src="assets/images/icon/operarios.png" alt=""> <br>
                <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                <input class="form-control" name="clave_gestion" id="clave_closeOc" type="password" required="required" placeholder="*****"/>
                <span class="erroM_closeOc"></span>
                <div>
                    <button type="button" class="btn_ok bt_close_oc"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button> 
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_alertLeaveStep" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h4>Estas por abandonar el item.</h4>
                <img src="assets/images/icon/people.png" alt=""> <br>
                <h5>¿Estas seguro?</h5> <br>
                <button type="button" id="bt_leave_ok_step" class="btn_ok" data-dismiss="modal">Aceptar</button>
                <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_detalleOt" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h5 class="titulo_pedido">¿Querés comenzar tu día ahora?</h5>
                <p class="descripcion_pedido">Todavia no iniciaste la jornada</p> <br>
                <div>
                  <button type="button" class="btn_nook" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_completeOt" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <!-- <h5 class="titulo_pedido">¿Querés comenzar tu día ahora?</h5> -->
                <p>¡La orden de trabajo se cerró correctamente!</p> <br>
                <div>
                  <button type="button" class="btn_nook" id="btn_completedOt" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_completeOC" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <!-- <h5 class="titulo_pedido">¿Querés comenzar tu día ahora?</h5> -->
                <p>¡La orden de compra se cerró correctamente!</p> <br>
                <div>
                  <button type="button" class="btn_nook" id="btn_completedOC" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_approvePresu" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Detalle de presupuesto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="presu_tit"></p>
                <span class="presu_detail"></span>
            </div>
            <div class="modal-footer">
                <button type="button" id="bt_apvPresupuesto" class="btn_ok" data-dismiss="modal"><img src="assets/images/img/tilde.png" alt="">Aprobar presupuesto</button>
                <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_msjPresupuesto" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h5 id="msjPresupuesto">El presupuesto aun no fue aprobado internamente.</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn_nook reloadPresupuestos" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="registro-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <img src="<?="//$url_web/"?>assets/images/logos/mec-logo.png" width="50%" alt="logo-login">        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <?php require('modal-content/register-content.php'); ?>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-salir-registro btn-secondary" data-dismiss="modal">Salir</button>
        <button type="button" id="btn_registrar" class="btn btn-continuar-registro btn-primary">Continuar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal edit-->
<div class="modal fade" id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <img src="<?="//$url_web/"?>assets/images/logos/mec-logo.png" width="50%" alt="logo-login">        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <?php require('modal-content/edit-content.php'); ?>
      </div>             
    </div>
  </div>
</div>

<!-- Modal info pedido-->
<div class="modal fade" id="info-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <img src="<?="//$url_web/"?>assets/images/logos/mec-logo.png" width="50%" alt="logo-login">        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <?php require('modal-content/info-content.php'); ?>
      </div>
    </div>
  </div>
</div>

<!-- Modal action pedido-->
<div class="modal fade" id="action-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <img src="<?="//$url_web/"?>assets/images/logos/mec-logo.png" width="50%" alt="logo-login">        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <?php require('modal-content/action-content.php'); ?>
      </div>
    </div>
  </div>
</div>
