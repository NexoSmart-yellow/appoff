<section style="display: none" id="panel-getCodeOt">
    <div class="tit_replanteos">
        <i class="fas fa-qrcode"></i>
        <h5>INGRESAR CODIGO</h5>
    </div>
    <div class="main-getCodeOt">
        <!-- <canvas style="width: 100%;"></canvas>
        <div id="result-qr">
        </div>   -->
        <p>Ingresá el código que te indique el técnico para valorar y firmar la ejecución de la orden de trabajo.</p>
        <div class="cont_signContact">
            <i class="fas fa-caret-right"></i>
            <input id="In_OtCode" type="text">
        </div>        
        <p class="err_codeClient">El código es incorrecto.</p>
        <div class="btns_slider">
            <button type="button" id="check_codeOk" class="btn_ok"><img src="assets/images/img/tilde.png" alt="">Siguiente</button>
            <button type="button" class="btn_nook back_homeCliente">Cancelar</button>
        </div>
    </div>
</section>
<!-- <script type="text/javascript">
    var arg = {
        resultFunction: function(result) {
            // $('#result-qr').html('<span>' + result.format + ': ' + result.code + '</span>');
            fetch('server/http_request/show_product_info_color.php?id='+result.code)
                .then(resp => resp.json())
                .then(resp => {                  
                    if(debug){ console.info('show_product_info_color.php', resp);  }        
                    for (const data of resp) {                
                        $('#descripcion-infoP').html(data.descripcion);
                        $('#info-countP').html(data.cantidad);
                        $('#marca_modelo_infoP').html(data.brand + ' - ' + data.model);
                        $('#cod_original_infoP').html(data.cod_original);
                        $('#stockP').html(data.stock);
                        $('#m-colorP').html(data.color_dep);
                        $('#m-estanteriaP').html(data.shelf);
                        $('#m-pisoP').html(data.floor);
                        $('#m-ubicacionP').html(data.depth);                
                    }                      
                })
                .catch(err => console.error('Error', err));           
        }
    };
    $("canvas").WebCodeCamJQuery(arg).data().plugin_WebCodeCamJQuery.play();
</script> -->