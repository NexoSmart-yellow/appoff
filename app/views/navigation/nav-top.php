<section id="nav-top">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" style="overflow-x: hidden">
        <div class="btn_spage">
            <button id="btn_menu"  onclick="openNav()" class="col icon-top navbar-toggler" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <i id="back-intro" class="fas fa-angle-left"></i>
        </div>
        <div class="col navbar-brand logo-top-nav" id="sidebar-action">
            <img src="<?="//$url_web/"?>assets/images/img/logomec.png" alt="logo-mec">
        </div>
        <div class="notification">
            <div class="bt_in_replanteo">
                <a href="#"><i class="far fa-list-alt"></i></a>
                <span class="badge" id="num_replanteos">0</span>
            </div>
            <a class="" href="#" onclick=""><i class="fas fa-comments"></i></a>
            <a href="#"><i class="fas fa-bell"></i></a>
        </div>

        <div id="mySidenav" class="sidenav close">
            <a id="id_comenza" href="#" class="btn-intro-comenza">Comenzar tu día</a>
            <a id="id_hoja" href="#" class="btn-intro-map">Hoja de ruta</a>
            <a id="id_ots" href="#" class="btn-intro-order">Orden de trabajo</a>
            <!-- <a id="btn-agenda" href="#">Agenda</a> -->
            <!-- <a href="#">Replanteos</a>
            <a href="#">Datos</a> -->
            <a href="#" id="back-dash">Volver a home</a>
            <a href="?logout=true">Salir App Mec</a>
            <span id="btn_sinc">Sincronizar</a>
        </div>
    </nav>
</section>

<separador_nav></separador_nav>
