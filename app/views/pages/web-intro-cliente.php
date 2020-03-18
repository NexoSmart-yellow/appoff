<section id="intro-cliente">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12 botonera-intro">
            <div class="btn-intro btn-pedidoCliente">
                <img src="assets/images/img/celconflecha.png" alt=""><p>Hacer un pedido</span></p> <br>
                <i class="fas fa-arrow-right flecha"></i>
            </div>

            <div class="btn-intro btn-listPedidos" data-sect="pedido">
                <i class="far fa-list-alt"></i><p>Mis pedidos<br><span>Consultá el estado de tus pedidos</span></p> <br>
                <i class="fas fa-arrow-right flecha"></i>
            </div>

            <div class="btn-intro btn-intro-espont" data-sect="espontaneo">
                <img src="assets/images/img/espontaneo2.png" alt=""><p>Espontaneos<br><span>Controlá el estado de la ejecución</span></p> <br>
                <i class="fas fa-arrow-right flecha"></i>
            </div>
            
            <div class="btn-intro btn-intro-pres" data-sect="presupuesto">
                <i class="fas fa-calculator"></i><p>Presupuestos<br><span>Administrá tus presupuestos</span></p> <br>
                <i class="fas fa-arrow-right flecha"></i>
            </div>  

            <div class="btn-intro" id="btn-intro-fotCliente">
               <div id="agenda_introCliente">
                   <div class="div_fot">
                      <img width="55" src="assets/images/img/agenda.png"><br>
                   </div>
                   <p>Agenda</p>
               </div>
               <div id="code_introCliente">
                   <div class="div_separa">
                      <i class="fas fa-qrcode" style="font-size: 46px;"></i><br>
                    </div>
                    <p>ingresar código</p>
               </div>
               <div id="datos_introCliente">
                   <div class="div_fot">
                      <img width="100" src="assets/images/img/datos.png"><br>
                   </div>
                   <p>Datos</p>
               </div>
            </div>
        </div>
    </div>
</section>

<style>
#intro-cliente {
  font-family: 'Liberation Sans' !important;
}

#intro-cliente .botonera-intro {
  height: 90vh;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: (1fr)[5];
  grid-template-rows: repeat(5, 1fr);
  background: url(assets/images/img/back.jpg);
  background-size: cover;
  background-position: center center;
  z-index: 10;
}

#intro-cliente .btn-intro {
  width: 100%;
}

#intro-cliente .btn-pedidoCliente {
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

#intro-cliente .btn-pedidoCliente p {
  margin-left: 30px;
  color: #fff;
  font-size: 25px;
  line-height: 17px;
  text-align: left;
  margin-bottom: 0;
}

#intro-cliente .btn-pedidoCliente p span {
  font-size: 15px;
}

#intro-cliente .btn-pedidoCliente .flecha {
  color: #fff;
  font-size: 25px;
  position: absolute;
  right: 30px;
  bottom: 20px;
}

#intro-cliente .btn-pedidoCliente img {
  width: 40px;
  margin-left: 25px;
}

#intro-cliente .btn-listPedidos {
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

#intro-cliente .btn-listPedidos p {
  margin-left: 27px;
  color: #fff;
  font-size: 25px;
  line-height: 17px;
  text-align: left;
  margin-bottom: 0;
}

#intro-cliente .btn-listPedidos p span {
  font-size: 15px;
}

#intro-cliente .btn-listPedidos .flecha {
  color: #fd5e13;
  font-size: 25px;
  position: absolute;
  right: 30px;
  bottom: 20px;
}

#intro-cliente .btn-listPedidos i {
  color: #fd5e13;
  font-size: 55px;
  margin-left: 25px;
}

#intro-cliente .btn-intro-order {
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

#intro-cliente .btn-intro-order p {
  margin-left: 90px;
  color: #fff;
  font-size: 25px;
  line-height: 17px;
  text-align: left;
  margin-bottom: 0;
}

#intro-cliente .btn-intro-order p span {
  font-size: 15px;
}

#intro-cliente .btn-intro-order .flecha {
  color: #fd5e13;
  font-size: 25px;
  position: absolute;
  right: 30px;
  bottom: 20px;
}

#intro-cliente .btn-intro-order img {
  margin-top: 15px;
}

#intro-cliente #btn-intro-fotCliente {
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (1fr)[3];
      grid-template-columns: repeat(3, 1fr);
  z-index: 100;
}

#intro-cliente #btn-intro-fotCliente div {
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

#intro-cliente #btn-intro-fotCliente .div_separa {
  border-right: 2px #ccc solid;
  border-left: 2px #ccc solid;
  width: 100%;
  height: 76px;
}

#intro-cliente #btn-intro-fotCliente .div_fot {
  width: 100%;
  height: 76px;
}

#intro-cliente #btn-intro-fotCliente p {
  color: #fff;
  font-size: 13px;
  margin-bottom: 0;
}

#intro-cliente .btn-intro-espont {
  background: rgba(0, 0, 0, 0.6);
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

#intro-cliente .btn-intro-espont p {
  margin-left: 30px;
  color: #fff;
  font-size: 25px;
  line-height: 17px;
  text-align: left;
  margin-bottom: 0;
}

#intro-cliente .btn-intro-espont p span {
  font-size: 15px;
}

#intro-cliente .btn-intro-espont .flecha {
  color: #fd5e13;
  font-size: 25px;
  position: absolute;
  right: 30px;
  bottom: 20px;
}

#intro-cliente .btn-intro-espont img {
  width: 50px;
  margin-left: 25px;
}

#intro-cliente .btn-intro-pres {
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

#intro-cliente .btn-intro-pres p {
  margin-left: 30px;
  color: #fff;
  font-size: 25px;
  line-height: 17px;
  text-align: left;
  margin-bottom: 0;
}

#intro-cliente .btn-intro-pres p span {
  font-size: 15px;
}

#intro-cliente .btn-intro-pres i {
  font-size: 55px;
  margin-left: 25px;
  color: #fd5e13;
}

#intro-cliente .btn-intro-pres .flecha {
  color: #fd5e13;
  font-size: 25px;
  position: absolute;
  right: 30px;
  bottom: 20px;
}

</style>