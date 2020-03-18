<section style="display: none" id="panel_comenza">
    <div class="div_header">
        <div>
            <img src="assets/images/img/celconflecha.png" alt=""><p>Comenzá tu día <br><span>Registrá <br><b>inicio y fin</b> de la jornada</span></p>
        </div>
    </div>
    <div class="main_comenza">
        <!-- <form action=""  method="post">
            <div class="login_white_box">
                <div class="form-group" style="margin-bottom: 0;">
                    <div class="col-lg-12 col-md-12 col-xs-12" style="padding: 0;">
                        <input class="form-control" type="text"
                            placeholder="Tu Clave de Gestión" required="required" />
                    </div>
                </div>
            </div>
            <button class="btn btn_ingresar_clave" type="submit">Ingresar / Terminar</button>
        </form> -->
        <div>
            <button class="btn btn_desempeño" type="submit">Tu Desempeño</button>
        </div>
        <div class="div_day_things">
            <button class="btn btn_ingresar_clave" type="submit">Iniciar</button>
            <div id="timer">
                <div id="hour">00</div>
                <div>:</div>
                <div id="minute">00</div>
                <div>:</div>
                <div id="second">00</div>                
            </div>
        </div>

        <div class="div_break_things">
            <button class="btn btn_iniciar_break" type="submit">Iniciar Break</button>
            <div id="timer_break">
                <div id="hour2">00</div>
                <div>:</div>
                <div id="minute2">00</div>
                <div>:</div>
                <div id="second2">00</div>                
            </div>
        </div>

        <div id="datos_gestion">
            <h5>Gracias por su labor.</h5>
            <p style="margin-bottom: 10px;">Tu desempeño de hoy</p>
            <!-- <p>1 Jornada Normal</p>
            <p>1 SFH - Ots 60-1120/01</p> -->
            <p id="operative_time"></p>
            <p id="break_time"></p>
            <!-- <p>Tiempo de tránsito: 0 hs.</p> -->
            <hr>
            <p class="p_gestion">Ots Realizadas <span id="otsRealizadas"></span></p>
            <p class="p_gestion">Items Realizados <span id="itemsRealizados"></span></p>
            <!-- <p class="p_gestion">Pendientes <span>1</span></p>
            <p class="p_gestion">Espontáneos <span>3</span></p>
            <p class="p_gestion">Replanteos <span>2</span></p> -->
        </div>

        <!-- MODAL START DAY -->

        <div class="modal fade modal_check_clave" id="modal_iniciar" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Hola ;) <br> Estás por comenzar tu dia laboral</p>
                        <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                        <input class="form-control" name="clave_gestion" id="claveG_inicio" type="password" required="required" />
                        <span id="errorM_inicio"></span>
                        <div>
                            <button id="btn_start" type="button" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                            <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL START BREAK -->

        <div class="modal fade modal_check_clave" id="modal_iniciar_break" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Inicia tu descanso</p>
                        <img width="70px" src="assets/images/img/break.png" style="margin-bottom: 30px;"> <br>
                        <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                        <input class="form-control" name="clave_gestion" id="claveG_inicio_br" type="password" required="required" />
                        <span id="errorM_inicio_br"></span>
                        <div>
                            <button id="btn_start_break" type="button" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                            <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL END BREAK -->

        <div class="modal fade modal_check_clave" id="modal_finalizar_break" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Volvamos a lo Nuestro</p>
                        <img width="70px" src="assets/images/img/break_end.png" style="margin-bottom: 30px;"> <br>
                        <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                        <input class="form-control" name="clave_gestion" id="claveG_fin_br" type="password" required="required" />
                        <span id="errorM_fin_br"></span>
                        <div>
                            <button id="btn_end_break" type="button" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                            <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL END DAY -->

        <div class="modal fade modal_check_clave" id="modal_finalizar_jornada" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Nos esperan, Gracias ;)</p>
                        <img width="70px" src="assets/images/img/end_day.png" style="margin-bottom: 30px;"> <br>
                        <label for="clave_gestion">Ingresa Tu Clave de Gestión</label>
                        <input class="form-control" name="clave_gestion" id="claveG_fin" type="password" required="required" />
                        <span id="errorM_fin"></span>
                        <div>
                            <button id="btn_end_day" type="button" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Aceptar</button>
                            <button type="button" class="btn_nook" data-dismiss="modal">Cancelar</button>
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>
   
