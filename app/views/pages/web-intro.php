<section id="intro">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12 botonera-intro">
            <div class="btn-intro btn-intro-comenza">
                <img src="assets/images/img/celconflecha.png" alt=""><p>Comenzá tu día <br><span>Registrá tu asistencia</span></p> <br>
                <i class="fas fa-arrow-right flecha"></i>
            </div>
            <div class="btn-intro btn-intro-map">
                <i class="fas fa-map-marker-alt"></i><p>Hoja de ruta <br><span>Mirá tu recorrido</span></p> <br>
                <i class="fas fa-arrow-right flecha"></i>
            </div>

            <div class="btn-intro btn-intro-order">
                <p>Orden de trabajo <br><span>Ingresá a tus Ots</span><br><img src="assets/images/img/dots.png"></p> <br>
                <i class="fas fa-arrow-right flecha"></i>
            </div>

            <div class="btn-intro" id="btn-intro-fot">
               <div id="agenda_intro">
                   <div class="div_fot">
                       <img width="55" src="assets/images/img/agenda.png"><br>
                   </div>
                   <p>Agenda</p>
               </div>
               <div id="replanteos_intro">
                   <div class="div_separa">
                        <i class="far fa-list-alt" style="font-size: 46px;"></i><br>
                    </div>
                    <p>Replanteos</p>
               </div>
               <div id="datos_intro">
                   <div class="div_fot">
                       <img width="100" src="assets/images/img/datos.png"><br>
                   </div>
                   <p>Datos</p>
               </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal_info_replanteo" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p class="descripcion_pedido">Es necesario que ingreses a una Orden de trabajo para generar un replanteo.</p> <br>
                    <button type="button" class="btn_nook" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</section>
<style>
#intro {
  font-family: 'Liberation Sans' !important;
}

#intro .botonera-intro {
  height: 90vh;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: (1fr)[4];
      grid-template-rows: repeat(4, 1fr);
  background: url(assets/images/img/back.jpg);
  background-size: cover;
  background-position: center center;
  z-index: 10;
}

#intro .btn-intro {
  width: 100%;
}

#intro .btn-intro-comenza {
  background: #fd5e13;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: left;
      -ms-flex-pack: left;
          justify-content: left;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

#intro .btn-intro-comenza p {
  margin-left: 30px;
  color: #fff;
  font-size: 25px;
  line-height: 17px;
  text-align: left;
  margin-bottom: 0;
}

#intro .btn-intro-comenza p span {
  font-size: 15px;
}

#intro .btn-intro-comenza .flecha {
  color: #fff;
  font-size: 25px;
  position: absolute;
  right: 30px;
  bottom: 20px;
}

#intro .btn-intro-comenza img {
  width: 40px;
  margin-left: 25px;
}

#intro .btn-intro-map {
  background: rgba(0, 0, 0, 0.4);
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: left;
      -ms-flex-pack: left;
          justify-content: left;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

#intro .btn-intro-map p {
  margin-left: 27px;
  color: #fff;
  font-size: 25px;
  line-height: 17px;
  text-align: left;
  margin-bottom: 0;
}

#intro .btn-intro-map p span {
  font-size: 15px;
}

#intro .btn-intro-map .flecha {
  color: #fd5e13;
  font-size: 25px;
  position: absolute;
  right: 30px;
  bottom: 20px;
}

#intro .btn-intro-map i {
  color: #fd5e13;
  font-size: 55px;
  margin-left: 25px;
}

#intro .btn-intro-order {
  background: transparent;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: left;
      -ms-flex-pack: left;
          justify-content: left;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

#intro .btn-intro-order p {
  margin-left: 90px;
  color: #fff;
  font-size: 25px;
  line-height: 17px;
  text-align: left;
  margin-bottom: 0;
}

#intro .btn-intro-order p span {
  font-size: 15px;
}

#intro .btn-intro-order .flecha {
  color: #fd5e13;
  font-size: 25px;
  position: absolute;
  right: 30px;
  bottom: 20px;
}

#intro .btn-intro-order img {
  margin-top: 15px;
}

#intro #btn-intro-fot {
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (1fr)[3];
      grid-template-columns: repeat(3, 1fr);
  z-index: 100;
}

#intro #btn-intro-fot div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-flow: column;
          flex-flow: column;
  cursor: pointer;
}

#intro #btn-intro-fot .div_separa {
  border-right: 2px #ccc solid;
  border-left: 2px #ccc solid;
  width: 100%;
  height: 76px;
}

#intro #btn-intro-fot .div_fot {
  width: 100%;
  height: 76px;
}

#intro #btn-intro-fot p {
  color: #fff;
  font-size: 13px;
  margin-bottom: 0;
}

#intro #modal_info_replanteo .modal-dialog {
  margin: 1.5rem;
}

#intro #modal_info_replanteo .modal-body {
  padding: 1rem 2rem;
}

#intro #modal_info_replanteo .modal-body p {
  color: #5c5c5c !important;
  margin-bottom: 20px;
  margin-top: 22px;
}

#intro #modal_info_replanteo .modal-body .btn_nook {
  border: none;
  background: transparent;
  color: #fd5e13;
  font-weight: bold;
}

#intro #modal_info_replanteo .modal-body h5 {
  color: #000;
  font-weight: 700;
  margin: 13px 0;
  font-size: 19px;
}
</style>