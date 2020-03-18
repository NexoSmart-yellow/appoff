<section style="display: none" id="panel-listPedidos">
    <div class="tit_replanteos">
        <i class="far fa-list-alt"></i>
        <h5 id="otOrEsp">MIS PEDIDOS</h5>
        <div id="bt_filterOt">
            <i class="fas fa-caret-down"></i>
        </div>
    </div>
    <div id="filterOt_menu">
        <span class="row_filter">Locación:</span>
        <span class="row_filter" id="bt_filterLocation"><i class="fas fa-caret-down"></i><span data-loc="" id="fLocationOt">locacion 1</span></span>
        <div class="collapse" id="collapseLocation">
            <span class="row_filter optionLocation">locacion 1</span>
            <span class="row_filter optionLocation">locacion 2</span>
        </div>
        <span class="row_filter">Estado:</span>
        <span class="row_filter" id="bt_filterStatus"><i class="fas fa-caret-down"></i><span data-status="" id="fStatusOt">Todas</span></span>
        <div class="collapse" id="collapsestatus">
            <span class="row_filter optionStatus" data-status="">Todas</span>
            <span class="row_filter optionStatus" data-status="to_exec">Programadas</span>
            <span class="row_filter optionStatus" data-status="to_prog">Sin programar</span>
            <span class="row_filter optionStatus" data-status="in_exec">Ejecutadas</span>
        </div>
        <div class="bt_doFilter">
            <button>Filtrar</button>
        </div>        
    </div>
    <div class="main-pedidosC">
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