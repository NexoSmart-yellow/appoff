<section style="display: none" id="panel-listPresupuestos">
    <div class="tit_replanteos">
        <i class="fas fa-calculator"></i>
        <h5>PRESUPUESTOS</h5>
        <div id="bt_filterPres">
            <i class="fas fa-caret-down"></i>
        </div>
    </div>
    <div id="filterPres_menu">
        <span class="row_filter">Locación:</span>
        <span class="row_filter" id="bt_filterLocationPres"><i class="fas fa-caret-down"></i><span data-loc="" id="fLocationPres">locacion 1</span></span>
        <div class="collapse" id="collapseLocationPres">
            <span class="row_filter optionLocation">locacion 1</span>
            <span class="row_filter optionLocation">locacion 2</span>
        </div>
        <div class="bt_doFilterPres">
            <button>Filtrar</button>
        </div>        
    </div>
    <div class="main-presupuestos">
        <div class="div_ot_pedido ot_ejecutada">
            <p id="empresa_ot">Amex</p>
            <p id="lugar_ot">Aeropuerto Jorge Newbery</p>
            <p id="lugar2_ot">Salón Vip</p>
            <p id="cod_ot">OT 60-01875/0</p>
            <p id="time_ot">08:45hs. a 16:45hs</p> 
            <p class="type_duration"><span id="duration_job">8:00hs.</span><br><span id="type_job">Normal</span></p>
            <div class="caja_status">
                <span style='margin-right: 5px; font-weight: 700;'>Ejecutada</span>
                <div style="background: #92d050;" class="iportancia_ot"></div>
            </div>
        </div>
        <div class="div_ot_pedido inProgress">
            <p id="empresa_ot">Amex</p>
            <p id="lugar_ot">Aeropuerto Jorge Newbery</p>
            <p id="lugar2_ot">Salón Vip</p>
            <p id="cod_ot">OT 60-01877/0</p>
            <p id="time_ot">16:00hs. a 20:00hs</p> 
            <p class="type_duration"><span id="duration_job">4:00hs.</span><br><span id="type_job">Normal</span></p>
            <div class="caja_status">
                <span style='margin-right: 5px; font-weight: 700;'>Alta</span>
                <div style="background: #ff0000;" class="iportancia_ot"></div>
            </div>
        </div>
    </div>
</section>