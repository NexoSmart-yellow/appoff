// INFO: ARCHIVO FUNCTIONS.JS SE USA PARA TRABAJAR CON "JQUERY".
// NOTA: si se prefiere trabajar con JavaScript puro usar el archivo src-es6/functionsES6.js y compilarlo con babel.
/*jshint esversion: 6 */
"use strict";
var mymap;
var calendar;
var nav_open = false;
var list_open = false;
var list_open_rubro = false;
var page_this = "";
var page_back = "";
var ic_slide = 0;
var estado_ot = 'closed';
var action_ot = '';
var inicio = '';
var app = {};
var id_item = "";
var num_item = "";
var orden_id = "";
var order_item_materials = [];
var order_materialAgenda = [];
var pend_item_materials = [];
var averia = "";
var averia_foto = "";
var reparacion = "";
var reparacion_foto = "";
var notes = "";
var notes_foto = "";
var saved_time_br = "";
var saved_time = "";
var jornada = "";
var descanso = "";
var tiempo_corriendo = null;
var tiempo_corriendo_br = null;
var exec_items_imgs = [];
var array_time_br = [];
var hour, minute, second;
var hour_br, minute_br, second_br;
var coordenadas = '';
var tipo_pedido = '';
var tipo_pedido2 = '';
var remplanteo_foto = "";
var Ttime_Ot = '';
var turno_tipo = '';
var recargoPag = 0;
var then = '';
var num_replanteos = 0;
var items_espontaneo = [];
var type_otc = '';
var getStatusItem = '';
var id_gente = '';
var id_clientSign = '';
var OneSignal = window.OneSignal || [];

$(document).ready(function() {
  // Invocamos funciones.
  // login_app();
  info_user();
  units();
  goIntro();
  goHoja_de_ruta();
  backHome(); // volver al home
  fullCalendar(); // muestro calendario
  goPerfil();
  goLogin();
  select_option_menu();
  check_intro();
  btnBack();
  choose_expense();
  date_today();
  popover();
  add_comprobante();
  dropdowns();
  busca_ot_materiales();
  open_modals();
  choose_data_car();
  firma_cliente();
  carga_manualCorr();
  show_numReplanteos();
  inputDate();
  Order_client();
});

function getOnesignalId() {			  
  OneSignal.push(function() {
    OneSignal.init({
      // appId: "..", // dev
      appId: '2429fc26-d53b-47fa-8589-6a23112ec210',
      autoRegister: true,
      notifyButton: {
        enable: false,
      },
    });
    
    OneSignal.isPushNotificationsEnabled().then(function(isPushEnabled) {
      OneSignal.getUserId(function(onesignal_id) {
        console.log(onesignal_id);
        $.ajax({
          url: "../api/save_onesignalId.php",
          type: "POST",
          dataType: "json",
          data: { 'user_id': app.current_user.type_id, 'onesignal_id': onesignal_id, 'user_type': app.current_user.type },
          success: function(response) {
            console.log(response);            
          },
          error: function() {
            errC();
          }
        });
      });
    });
  });
}


function login_app() {
  $('#btn_login').off('click')
  $('#btn_login').on('click', function() {
    console.log('entra');
    $('#loader').css('display', 'flex');
    $.ajax({
      url: "server/http_request/login.php",
      type: "POST",
      dataType: "json",
      data: { 'user_email': $('input[name=user_email]').val(), 'user_password': $('input[name=user_password]').val(), 'submit': 'submit'},
      success: function(response) {
        console.log(response);
        $('#loader').css('display', 'none');
        if (response.success == true) {

        } else if (response.success == false && response.error == 'C1') {
          alert('Contraseña incorrecta');
        } else if (response.success == false && response.error == 'C2') {
          alert('Ingrese una contraseña');
        } else if (response.success == false && response.error == 'U1') {
          alert('Email incorrecto');
        } else if (response.success == false && response.error == 'U2') {
          alert('Ingrese un email');
        }
      },
      error: function() {
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });
}

var getLocation = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function info_user() {
  $.ajax({
    url: "server/http_request/info_user.php",
    type: "POST",
    dataType: "json",
    success: function(response) {
      if (response) {
        console.log(response);
        $('#loader').css('display', 'none');
        app.current_user = response;
        get_locationClient();
      } else {
        console.log("error response ajax");
      }
    },
    error: function(jqXHR, textStatus, error) {
      console.log(jqXHR + "-" + textStatus + "-" + error);
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function units() {
  $.ajax({
    url: "../api/get_units.php",
    type: "GET",
    dataType: "json",
    success: function(response) {
      if (response.success == true) {
        console.log(response);
        app.units = response.units;
        var data_select = '';
        for (var i = 0; i < app.units.length; i++) {
          data_select += `<option value="${app.units[i].id_unidad}">`+app.units[i].descripcion+`</option>`;
          $('.select_Ucorrec').html(data_select);
        }
      } else {
        console.log("error response ajax -> get_units.php");
      }
    },
    error: function() {
      console.log('error ajax -> get_units.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

// declaro mis funciones.
function sideBar() {
  $("#sidebar-action").on("click", function() {
    $("#sidebar").toggleClass("active");
  });
}

function goLogin(){
  $("#div-login-splash").click(function(){
    $("section#splash").hide();
    $("section#login").show();
  });
}

// obtengo mi posición en tiempo real.
function myPositionNow(){
  mymap.locate({setView: true, maxZoom: 14}); // obtengo la posición del usuario.
  myPositionAction();
}

// acción cuando encuentra/o no la posición actual.
function myPositionAction(){
  function onLocationFound(e) { // si la geolocalización tiene exito.
    var mylat = e.latitude;
    var mylong = e.longitude;

    var marker = L.marker([mylat, mylong]).addTo(mymap);

    console.log(`lat: ${mylat} and long: ${mylong}`);
    // lookForPackages(mylat, mylong);
  }
  mymap.on('locationfound', onLocationFound);


  function onLocationError(e) { // si falla la geolocalización.
      console.log(e.message);
      errorAlert('Error', 'No podemos acceder a su ubicación');
  }
  mymap.on('locationerror', onLocationError);
}


// inicializo el mapa
function initMap() {
  var time_animation;
  getLocation()
  .then(function(position) {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    var map;

    var puntoA = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var puntoB = new google.maps.LatLng(-34.6036436,-58.3809258);

    var mapOptions = {
      zoom: 15,
      center: puntoA
    };

    map = new google.maps.Map(document.getElementById('map_ruta'), mapOptions);

    directionsDisplay.setMap(map);

    function calculateAndDisplayRoute(directionsService, directionsDisplay, address) {
      directionsService.route({
        origin: puntoA,
        destination: address,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          console.log(response.routes[0].legs[0].duration.text);
          $('#distance_time').html(response.routes[0].legs[0].duration.text)
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    $('.div_viaje').off('click').on('click', function() {
      clearTimeout(time_animation);
      var calle = $(this).find('#lugar2_ot').text() == 'null' || $(this).find('#lugar2_ot').text() == 'undefined' ? '' : $(this).find('#lugar2_ot').text() + ', ';
      var localidad = $(this).find('#loc_ot').text() == 'null' || $(this).find('#loc_ot').text() == 'undefined' ? '' : $(this).find('#loc_ot').text() + ', ';
      var provincia = $(this).find('#prov_ot').text() == 'null' || $(this).find('#prov_ot').text() == 'undefined' ? '' : $(this).find('#prov_ot').text() + ', ';
      var address = calle + localidad + provincia + 'Argentina'
      console.log(address);
      calculateAndDisplayRoute(directionsService, directionsDisplay, address);
      $('.Gmaps_btn a').attr('href', 'https://www.google.com/maps/dir/'+puntoA+'/'+address);
      $('.Gmaps_btn').css('display', 'flex');
      $('.div_distanceTime').fadeIn(600).css('display', 'flex');
      time_animation = setTimeout(function() {
        $('.div_distanceTime').fadeOut(600);
      },4000);
    });
  });
}


// limpia los campos
function limpiarCampos() {
  // info order
  $("#id_order_value").attr("value", "");
  $("#origen").html("");
  $("#destino").html("");
  $("#tipo").html("");
  $("#destinatario").html("");
  $("#descripcion").html("");
}

// limpiar mapa
function limpiarMapa() {
  myMap.remove();
}

// ### SOLO MOSTRAR 1..n ELEMENTOS [jQuery].
function showSection(hideFunction, ...pages){
  var hideall = hideFunction();
  for (var i = 0; i < pages.length; i++) {
    $("#"+pages[i]).show();
  }
}

// oculto todo.
function hideAllSections(){
  $("#login").hide();
  $("#orders").hide();
  $("#presentacion").hide();
  $("#pedidos").hide();
  $('#agenda').hide();
  $("#info").hide();
  $("#end").hide();
  $("#perfil").hide();
  $("#btn-float").hide();
  $("#intro").hide();
  $("#intro-cliente").hide();
  $("#hoja").hide();
  $("#panel-ots").hide();
  $("#panel-servicios").hide();
  $("#panel-expense").hide();
  $("#panel-materiales").hide();
  $("#panel-pedido-mh").hide();
  $("#panel-stock-transito").hide();
  $("#panel-correctivos").hide();
  $("#panel-listPedidos").hide();
  $("#panel-getCodeOt").hide();
  $("#panel-clientSign").hide();
  $("#panel-listEspontaneos").hide();
  $("#panel-listReplanteos").hide();
  $("#panel-listPresupuestos").hide();
  $("#panel-pedido-cliente").hide();
  $("#panel-vehiculo").hide();
  $("#panel-data-car").hide();
  $("#panel-info-car").hide();
  $("#panel-agenda").hide();
  $("#panel-detalle-ots").hide();
  $("#panel-detalle-oc").hide();
  $("#panel-finaliza-ot").hide();
  $("#panel-steps-ot").hide();
  $("#panel-replanteo").hide();
  $("#panel-replanteo-sinOt").hide();
  $("#panel-espontaneos").hide();
  $("#panel-resumen-item").hide();
  $("#panel_comenza").hide();
  $("#movilidad").hide();
  $("#hoja_de_ruta").hide();
  $("#panel-summaryOrder").hide();
  $("#panel-infoPedido").hide();
}

// muestra la tabla de ordenes
function seePerfil() {
  showSection(hideAllSections, 'perfil');
}

function seeIntro() {
  showSection(hideAllSections, 'intro');
  page_this = '';
}

function seeIntro_cliente() {
  showSection(hideAllSections, 'intro-cliente');
}

// muestra la tabla de ordenes
function seeOrders() {
  showSection(hideAllSections, 'orders', 'presentacion');
}

// muestra la seccion de info
function seeInfo() {
  showSection(hideAllSections, 'info', 'btn-float');
  mymap.invalidateSize(); // mejora la carga del mapa.
}

// muestra la seccion de mis pedidos
function seePedidos() {
    showSection(hideAllSections, 'pedidos', 'presentacion');
}

// muestra la seccion Hoja de ruta
function seeHoja() {
  showSection(hideAllSections, 'hoja');
  page_this = 'hoja';
}

// muestra la seccion Orden de trabajo
function seePanel_ots() {
  showSection(hideAllSections, 'panel-ots');
  page_this = 'ots';
}

function seePanel_getCodeOt() {
  showSection(hideAllSections, 'panel-getCodeOt');
  page_back = 'intro-cliente';
  btnBack();
}

function seePanel_clientSign() {
  console.log('entra');
  showSection(hideAllSections, 'panel-clientSign');
  page_back = 'panel-getCodeOt';
  btnBack();
}


// muestra la seccion Comenza tu dia
function seePanel_comenza() {
  showSection(hideAllSections, 'panel_comenza');
  page_this = 'comenza';
}

// muestra mensaje de cierre
function seeEnd() {
  $("#end").show();
  showSection(hideAllSections, 'end', 'presentacion');
}

// muestra agenda
function seeCalendar() {
  showSection(hideAllSections, 'agenda', 'presentacion');
}

// function goAgenda(){
//   $("#btn-agenda").on('click', function(){
//     seeCalendar();
//   })
// }

function goPerfil(){
  $("#btn-perfil").on('click', function(){
    seePerfil();
  })
}

function goPedidos(){
  $('#btn-pedidos').on('click', function(){
    seePedidos();
  });
}

// vuelve al home
function backHome() {
  $("#back-home").on("click", () => {
    seeOrders();
    limpiarMapa();
  });
}

// teste obtener coordenadas.
function testCoordenadas() {
  $("#test").on("click", () => {
    var origen = "alem 625";
    var destino = "alem 1000";
    var id = "1";

    $.ajax({
      url: "server/http_request/coordinates.php",
      type: "POST",
      dataType: "json",
      data: { id, origen, destino },
      success: function(data) {
        console.log(data);
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR + "-" + textStatus + "-" + error);
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });
}
function day_calendar() {
  console.log("hola");
}

function change_turnoTipo(parameter) {
  switch (parameter) {
    case 'normal':
      turno_tipo = 'Normal';
      break;
    case 'interior20':
      turno_tipo = 'Interior 20%';
      break;
    case 'interior50':
      turno_tipo = 'Interior 50%';
      break;
    case 'sfh':
      turno_tipo = 'SFH';
      break;
    case 'guardia':
      turno_tipo = 'Guardia Semanal';
      break;
    case 'asistencia':
      turno_tipo = 'Asistencia de Guardia';
      break;
    case 'domingo':
      turno_tipo = 'Domingo';
      break;
    case 'nocturno':
      turno_tipo = 'Nocturno';
      break;
  }
}

function fullCalendar(){
  var today = moment().format('YYYY-MM-DD');
  var format_today = moment().format('LL');
  $('.date_selected').html(format_today);
  var today_day = moment().format('DD');
  var mes = "";
  var array_dias = [];
  today_day = parseInt(today_day);
  calendar = new CalendarYvv();
  calendar.diaSeleccionado = today;
  calendar.etiqueta = "#calendar";
  calendar.createCalendar();
  $("#btn-panel-agenda, #agenda_intro, #btn-agenda").on("click", function() {
    $('#loader').css('display', 'flex');
    var empleado_id = app.current_user.type_id;
    $.ajax({
      url: "../api/get_orders.php",
      type: "GET",
      dataType: "json",
      data: { empleado_id: empleado_id},
      success: function(response) {
        if (response.success == true) {
          $('#loader').css('display', 'none');
          calendar = new CalendarYvv();
          calendar.etiqueta = "#calendar";
          calendar.diaSeleccionado = today;
          calendar.primerDia = "lunes";
          calendar.bg = "#fff";
          calendar.textColor = "#000";
          console.log(response);
          mes = $('.current_month').text().split('-');
          var num_month = moment(mes[0], 'MMMM').format('MM');
          for (var i = 0; i < response.orders.length; i++) {
            var array_fecha = response.orders[i].fecha.split('-');
            if (array_fecha[1] == num_month) {
              array_dias.push(parseInt(array_fecha[2]));
            }
          }
          calendar.diasResal = array_dias;
          calendar.funcPer = function(ev){
            console.log(ev)
            var fecha_ll = moment(ev.currentSelected).format('LL');
            $('.date_selected').html(fecha_ll);
            $.ajax({
              url: "../api/get_orders.php",
              type: "GET",
              dataType: "json",
              data: { empleado_id: empleado_id, fecha: ev.currentSelected},
              success: function(response) {
                if (response.success == true) {
                  $('#loader').css('display', 'none');
                  console.log(response);
                  var data_order = '';
                  var importancia = '';
                  var txt_importancia = '';
                  var pendiente = '';
                  var back_ot = '';
                  for (var i = 0; i < response.orders.length; i++) {
                    switch (response.orders[i].tipo) {
                      case 'normal':
                        importancia = '92d050';
                        txt_importancia = 'Normal';
                        break;
                      case 'media':
                        importancia = 'FFFF00';
                        txt_importancia = 'Media';
                        break;
                      case 'alta':
                        importancia = 'ff0000';
                        txt_importancia = 'Alta';
                        break;
                      case 'critica':
                        importancia = '7030A0';
                        txt_importancia = 'Crítica';
                        break;
                      default:
                        importancia = '92d050';
                        break;
                    }
                    if (response.orders[i].order_item_pendings == true) {
                      pendiente = '<div class="item_pendiente"></div>';
                    } else {
                      pendiente = '';
                    }

                    if (response.orders[i].locacion_nombre == null) {
                      response.orders[i].locacion_nombre = '';
                    }

                    if (response.orders[i].locacion_direccion == null) {
                      response.orders[i].locacion_direccion = response.orders[i].direccion;
                    }

                    if (response.orders[i].order_items > 0 && response.orders[i].order_items == response.orders[i].order_items_finished) {
                      back_ot = '#e7e7e7';
                      txt_importancia = 'Ejecutada';
                    } else {
                      back_ot = '#fff';
                    }

                    var start = response.orders[i].fecha+' '+response.orders[i].hora_desde;
                    var end = response.orders[i].fecha+' '+response.orders[i].hora_hasta;
                    Ttime_Ot =  moment.utc(moment(end,"YYYY-MM-DD HH:mm").diff(moment(start,"YYYY-MM-DD HH:mm"))).format("HH:mm");
                    var horaDesde = response.orders[i].hora_desde.slice(0, -3);
                    var horaHasta = response.orders[i].hora_hasta.slice(0, -3);

                    turno_tipo = response.orders[i].turno_tipo;
                    change_turnoTipo(turno_tipo);

                    data_order +=  `<div style="background: ${back_ot}" class="div_ot_agendaI" id="`+ response.orders[i].id_orden +`">
                                      <p id="empresa_ot">`+ response.orders[i].razon_social +`</p>
                                      <p id="lugar_ot">`+ response.orders[i].descripcion +`</p>
                                      <p id="lugar_ot">`+ response.orders[i].locacion_nombre +`</p>
                                      <p id="lugar2_ot">`+ response.orders[i].locacion_direccion +`</p>
                                      <p id="cod_ot">OT `+ response.orders[i].id_ot +`</p>
                                      <p id="time_ot">`+horaDesde+`hs. a `+horaHasta+`hs</p>
                                      <p class="type_duration"><span id="duration_job">`+Ttime_Ot+`hs.</span><br><span id="type_job">${turno_tipo}</span></p>
                                      <div class="caja_status">
                                          <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                                          <div style="background: #${importancia};" class="iportancia_ot"></div>
                                          ${pendiente}
                                      </div>
                                    </div>`;
                    $('.main-agenda').html(data_order);
                  }
                  $('#loader').css('display', 'none');
                  // seePanel_vistaOt();
                  seePanel_agenda();
                  showCalendar();
                } else {
                    $('.main-agenda').html('<p class="message_error">No hay Ordenes de Trabajo para la fecha seleccionada.</p>');
                    $('#loader').css('display', 'none');
                }
              },
              error: function(jqXHR, textStatus, error) {
                console.log(jqXHR + "-" + textStatus + "-" + error);
                $('#loader').css('display', 'none');
                errC();
              }
            });
            // for (var i = 0; i < response.orders.length; i++) {
            //   console.log(ev.currentSelected +' / '+ response.orders[i].fecha)
            //   if (ev.currentSelected == response.orders[i].fecha) {
            //     $('#'+response.orders[i].id_orden).css('display', 'flex');
            //   } else {
            //     $('#'+response.orders[i].id_orden).css('display', 'none');
            //   }
            // }
          };
          calendar.createCalendar();

          calendar.funcNext = function() {
            array_dias = [];
            mes = $('.current_month').text().split('-');
            var num_month = moment(mes[0], 'MMMM').format('MM');
            for (var i = 0; i < response.orders.length; i++) {
              var array_fecha = response.orders[i].fecha.split('-');
              if (array_fecha[1] == num_month) {
                array_dias.push(parseInt(array_fecha[2]));
              }
            }
            calendar.diasResal = array_dias;
            calendar.createCalendar();
          };
          calendar.funcPrev = function() {
            array_dias = [];
            mes = $('.current_month').text().split('-');
            var num_month = moment(mes[0], 'MMMM').format('MM');
            for (var i = 0; i < response.orders.length; i++) {
              var array_fecha = response.orders[i].fecha.split('-');
              if (array_fecha[1] == num_month) {
                array_dias.push(parseInt(array_fecha[2]));
                calendar.diasResal = array_dias;
                calendar.createCalendar();
              }
            }
            calendar.diasResal = array_dias;
            calendar.createCalendar();
          };
        } else {

        }
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR + "-" + textStatus + "-" + error);
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });
}

function into_agenda() {
  $('#loader').css('display', 'flex');
  var id_empleado = app.current_user.type_id;
  $.ajax({
    url: "../api/check_employee_hour.php",
    type: "GET",
    dataType: "json",
    data: { id_empleado },
    success: function(response) {
      if (response.success == true) {
        $('#loader').css('display', 'none');
        console.log(response.last_break.tipo);
        console.log(response.last_day.tipo)
        // is open? -> set
        if (response.last_day.tipo == 'd.0') {
          jornada = "open";
          console.log('jornada abierta');
          var now = moment().format('HH:mm:ss');
          var then = response.last_day.hora;
          saved_time = moment.utc(moment(now,"HH:mm:ss").diff(moment(then,"HH:mm:ss"))).format("HH:mm:ss");
          /**
           * check break
           */
          if (response.last_break.tipo == "b.0") {
            // set break
            descanso = 'open';
            console.log('Tenes un break pá');
            var now_br = moment().format('HH:mm:ss');
            var then_br = response.last_break.hora;
            saved_time_br = moment.utc(moment(now_br,"HH:mm:ss").diff(moment(then_br,"HH:mm:ss"))).format("HH:mm:ss");
            $(".div_break_things").css('display', 'block');
            iniciar_jornada();
            seePanel_comenza();
          } else {
            descanso = 'closed';
            // check if in the day, exists a closed break
            var break_end = `${response.last_break.fecha} ${response.last_break.hora}`,
                day_start = `${response.last_day.fecha} ${response.last_day.hora}`;

            if (response.last_break.tipo == undefined) {
              console.log('nuevo, todavia no se tomo el descanso');
              // you have a break yet
              // -> show break
              $(".div_break_things").css('display', 'block');
              iniciar_jornada();
              seePanel_comenza();
            } else if (break_end > day_start) {
              // not more breaks
              // -> hide break
              $(".div_break_things").css('display', 'none');
              iniciar_jornada();
              seePanel_comenza();
              console.log('ya se tomo el descanso');
            } else {
              console.log('todavia no se tomo el descanso');
              // you have a break yet
              // -> show break
              $(".div_break_things").css('display', 'block');
              iniciar_jornada();
              seePanel_comenza();
            }
          }
        }
        // new hour -> init
        else {
          jornada = "closed";
          $('#loader').css('display', 'none');
          console.log('jornada cerrada');
          if (response.last_break.tipo == undefined) {
            console.log('nuevo, todavia no se tomo el descanso');
            $(".div_break_things").css('display', 'block');
            iniciar_jornada();
            seePanel_comenza();
          }
          iniciar_jornada();
          seePanel_comenza();
        }
      } else {
        console.log(response.error, response.sql)
      }
    },
    error: function() {
      console.log('error ajax -> save_employee_hour.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function goIntro(){
  // cliente

  $('#code_introCliente').off('click').on('click', function() {
    $('#In_OtCode').html('');
    seePanel_getCodeOt();
    sign_cliente();
  });

  $('.btn-intro-pres').off('click').on('click', function() {
    get_allPresupuestos(app.current_user.locations);
  });

  $('.btn-listPedidos, .btn-intro-espont').off('click').on('click', function() {
    $(this).attr('data-sect') == 'espontaneo' ? type_otc = 'ot-espontaneo' : type_otc = '';
    if (type_otc == 'ot-espontaneo') {
      $('#otOrEsp').html('ESPONTANEOS');
      $('#bt_filterOt').css('display', 'none')
      }else {
        $('#otOrEsp').html('MIS PEDIDOS');
        $('#bt_filterOt').css('display', 'flex')
    }
    var id_cliente = app.current_user.type_id;
    console.log(app.current_user.type_id);
    $('#loader').css('display', 'flex');
    $.ajax({
      url: "../api/get_client_orders.php",
      type: "GET",
      dataType: "json",
      data: { 'id_cliente': id_cliente, 'tipo': type_otc, 'locations': app.current_user.locations },
      success: function(response) {
        if (response.success == true) {
          $('#loader').css('display', 'none');
          console.log(response);
          get_ordersClient(response);
        } else {
            $('.main-pedidosC').html('<p class="message_error">No hay Ordenes de trabajo para ver.</p>');
            $('#loader').css('display', 'none');
            seePanel_listPedidos();
        }
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR + "-" + textStatus + "-" + error);
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });

  // Operario

  $('#back-dash').off('click');
  $('#back-dash').on('click', () =>{
    if (app.current_user.type == 1) {
      seeIntro();
    } else {
      seeIntro_cliente();
    }
  })

  $('.btn-intro-comenza').off('click');
  $('.btn-intro-comenza').on('click', ()=>{
    if (recargoPag == 0) {
      into_agenda();
      recargoPag = 1;
    } else {
      seePanel_comenza();
    }
  });

  $('.btn-intro-map').off('click');
  $('.btn-intro-map').on('click', ()=>{
    seeHoja();
  });

  $('.btn-intro-order').off('click');
  $('.btn-intro-order').on('click', ()=>{
    $('#loader').css('display', 'flex');
    var empleado_id = app.current_user.type_id;
    $.ajax({
      url: "../api/get_ots_summary.php",
      type: "GET",
      dataType: "json",
      data: { empleado_id: empleado_id},
      success: function(response) {
        if (response.success == true) {
          $('#loader').css('display', 'none');
          console.log(response);
          seePanel_ots();
          document.getElementById('cant_agenda').innerHTML = response.agenda;
          document.getElementById('cant_servicios').innerHTML = response.servicios;
          document.getElementById('cant_preventivo').innerHTML = response.OCs;
          document.getElementById('cant_obras').innerHTML = response.obras;         
        } else {
          console.log('error ajax response -> get_ots_summary.php.php');
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> get_ots_summary.php.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });

  $('#btn-panel-serv').off('click');
  $('#btn-panel-serv').on('click', function() {
    loadInfoServicesPanel();
  });

  $('.bt_gasto').off('click').on('click', ()=>{
    seePanel_expense();
  });

  $('#btn-panel-materiales').off('click').on('click', ()=>{
    $('#loader').css('display', 'flex');
    $.ajax({
      url: "../api/get_purchaseOrders.php",
      type: "GET",
      dataType: "json",
      data: { 'id_empleado': app.current_user.type_id},
      success: function(response) {
        $('#loader').css('display', 'none');
        var data_purchase = '';
        if (response.success == true) {
          console.log(response);
          for (var i = 0; i < response.purchases.length; i++) {
            var date_order = moment(response.purchases[i].agenda).format('DD-MM-YYYY');
            data_purchase +=  `<div class="pedido_otmh" data-id="`+ response.purchases[i].id_compra +`">
                                <p class="empresa_ot">`+ response.purchases[i].cliente +`</p> 
                                <p class="text_resaltado">`+ response.purchases[i].prov_name +`</p>
                                <p class="text_resaltado">`+ response.purchases[i].prov_direccion +`</p>
                                <p class="text_resaltado">`+ response.purchases[i].prov_localidad +`</p>
                                <div class="caja_status">
                                    <div class="status_op"></div>
                                </div>
                                <span class="date_otClient">${date_order}</span>
                            </div>`;
            $('.all_pedidosMC').html(data_purchase);
          }

          $('#loader').css('display', 'none');
          seePanel_materiales();
        } else {
          $('#loader').css('display', 'none');
          data_purchase +=  `<p class="cero_espontaneos">No hay Ordenes de compra para mostrar.</p>`;
          $('.all_pedidosMC').html(data_purchase);
          seePanel_materiales();
        }
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR + "-" + textStatus + "-" + error);
        errC();
      }
    });
    
  });

  $('#link_vehiculo').off('click').on('click', ()=>{
    seePanel_vehiculo();
  });

  $('#btn_ok_getcar').off('click').on('click', ()=>{
    seePanel_data_car();
  });

  $('.bt_info_car').off('click').on('click', ()=>{
    seePanel_info_car();
  });

  $('#btn-search-done').off('click').on('click', ()=>{
    seePanel_pedido_mh();
  });

  $('.transit_stock').off('click').on('click', ()=>{
    seePanel_stock_transito();
  });

  $('.btn_panel_correctivo, .btn_panel_urgente, .btn_panel_preventivo, #link_hoja , .btn_panel_obra').off('click');
  $('.btn_panel_correctivo, .btn_panel_urgente, .btn_panel_preventivo, #link_hoja , .btn_panel_obra').on('click', function(){
    var typeOt = $(this).attr('class').split('_');
    console.log(typeOt[2])
    if (typeOt[2] == 'all') {
      typeOt[2] = '';
    }
    $('#loader').css('display', 'flex');
    var empleado_id = app.current_user.type_id;
    var fecha = moment().format('YYYY-MM-DD');
    $.ajax({
      url: "../api/get_orders.php",
      type: "GET",
      dataType: "json",
      data: { empleado_id: empleado_id, fecha: fecha, clasificacion: typeOt[2] },
      success: function(response) {
        if (response.success == true) {
          $('#loader').css('display', 'none');
          console.log(response);
          var data_order = '';
          var importancia = '';
          var txt_importancia = '';
          var pendiente = '';
          var back_ot = '';
          var class_ot = '';
          for (var i = 0; i < response.orders.length; i++) {
            switch (response.orders[i].tipo) {
              case 'normal':
                importancia = '92d050';
                txt_importancia = 'Normal';
                break;
              case 'media':
                importancia = 'FFFF00';
                txt_importancia = 'Media';
                break;
              case 'alta':
                importancia = 'ff0000';
                txt_importancia = 'Alta';
                break;
              case 'critica':
                importancia = '7030A0';
                txt_importancia = 'Critica';
                break;
              default:
                importancia = '92d050';
                break;
            }
            if (response.orders[i].order_item_pendings == true) {
              pendiente = '<div class="item_pendiente"></div>';
            } else {
              pendiente = '';
            }

            if (response.orders[i].locacion_nombre == null) {
              response.orders[i].locacion_nombre = '';
            }

            if (response.orders[i].locacion_direccion == null) {
              response.orders[i].locacion_direccion = response.orders[i].direccion;
            }

            if (response.orders[i].order_items > 0 && response.orders[i].order_items == response.orders[i].order_items_finished) {
              back_ot = '#e7e7e7';
              txt_importancia = 'Ejecutada';
            } else {
              back_ot = '#fff';
            }

            var start = response.orders[i].fecha+' '+response.orders[i].hora_desde;
            var end = response.orders[i].fecha+' '+response.orders[i].hora_hasta;
            Ttime_Ot =  moment.utc(moment(end,"YYYY-MM-DD HH:mm").diff(moment(start,"YYYY-MM-DD HH:mm"))).format("HH:mm");

            var horaDesde = response.orders[i].hora_desde.slice(0, -3);
            var horaHasta = response.orders[i].hora_hasta.slice(0, -3);

            turno_tipo = response.orders[i].turno_tipo;
            change_turnoTipo(turno_tipo);

            if (typeOt[2] == '') {
              class_ot = 'div_viaje';
            } else {
              class_ot = 'div_ot_agenda';
            }

            data_order +=  `<div style="background: ${back_ot}" class="${class_ot}" id="`+ response.orders[i].id_orden +`">
                              <p id="empresa_ot">`+ response.orders[i].razon_social +`</p>
                              <p>`+ response.orders[i].descripcion +`</p>
                              <p id="lugar_ot">`+ response.orders[i].locacion_nombre +`</p>
                              <p class="hidden_input"  id="lugar2_ot">`+ response.orders[i].locacion_direccion +`</p>
                              <p class="hidden_input" id="loc_ot">`+ response.orders[i].locacion_localidad +`</p>
                              <p class="hidden_input" id="prov_ot">`+ response.orders[i].locacion_provincia +`</p>
                              <p id="cod_ot">OT `+ response.orders[i].id_ot +`</p>
                              <p id="time_ot">`+horaDesde+`hs. a `+horaHasta+`hs</p>
                              <p class="type_duration"><span id="duration_job">`+Ttime_Ot+`hs.</span><br><span id="type_job">${turno_tipo}</span></p>
                              <div class="caja_status">
                                  <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                                  <div style="background: #${importancia};" class="iportancia_ot"></div>
                                  ${pendiente}
                              </div>
                            </div>`;
                            
            $('.main-correctivos, .main_viajes').html(data_order);
          }

          $('#loader').css('display', 'none');
          if (typeOt[2] == '') {
            $('.Gmaps_btn').hide();
            seeHojaDeRuta();
            initMap();
          } else {
            seePanel_vistaOt();
          }

        } else {
            $('.main-correctivos, .main_viajes').html('<p class="message_error">No hay Ordenes de trabajo a realizar para hoy.</p>');
            $('#loader').css('display', 'none');
            if (typeOt[2] == '') {
              $('.Gmaps_btn').hide();
              seeHojaDeRuta();
            } else {
              seePanel_vistaOt();
            }
        }
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR + "-" + textStatus + "-" + error);
        $('#loader').css('display', 'none');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });

  $('#replanteos_intro').off('click');
  $('#replanteos_intro').on('click', function () {
      $('#priority_rep2').val('normal');
      $('#tit_rep2').val('');
      $('#desc_rep2').val('');
      $(".btn_cot_ejc2").removeClass("active_bt");
      seePanel_replanteo_sinOt();
  });

  $('#btn-panel-agenda, #agenda_intro, #btn-agenda').off('click');
  $('#btn-panel-agenda, #agenda_intro, #btn-agenda').on('click', ()=>{
    $('#loader').css('display', 'flex');
    var empleado_id = app.current_user.type_id;
    var fecha = moment().format('YYYY-MM-DD');
    console.log(empleado_id);
    $.ajax({
      url: "../api/get_orders.php",
      type: "GET",
      dataType: "json",
      data: { empleado_id: empleado_id, fecha: fecha},
      success: function(response) {
        if (response.success == true) {
          $('#loader').css('display', 'none');
          console.log(response);
          var data_order = '';
          var importancia = '';
          var txt_importancia = '';
          var pendiente = '';
          var back_ot = '';
          for (var i = 0; i < response.orders.length; i++) {
            switch (response.orders[i].tipo) {
              case 'normal':
                importancia = '92d050';
                txt_importancia = 'Normal';
                break;
              case 'media':
                importancia = 'FFFF00';
                txt_importancia = 'Media';
                break;
              case 'alta':
                importancia = 'ff0000';
                txt_importancia = 'Alta';
                break;
              case 'critica':
                importancia = '7030A0';
                txt_importancia = 'Critica';
                break;
              default:
                importancia = '92d050';
                break;
            }
            if (response.orders[i].order_item_pendings == true) {
              pendiente = '<div class="item_pendiente"></div>';
            } else {
              pendiente = '';
            }

            if (response.orders[i].locacion_nombre == null) {
              response.orders[i].locacion_nombre = '';
            }

            if (response.orders[i].locacion_direccion == null) {
              response.orders[i].locacion_direccion = response.orders[i].direccion;
            }

            if (response.orders[i].order_items > 0 && response.orders[i].order_items == response.orders[i].order_items_finished) {
              back_ot = '#e7e7e7';
              txt_importancia = 'Ejecutada';
            } else {
              back_ot = '#fff';
            }

            var start = response.orders[i].fecha+' '+response.orders[i].hora_desde;
            var end = response.orders[i].fecha+' '+response.orders[i].hora_hasta;
            Ttime_Ot =  moment.utc(moment(end,"YYYY-MM-DD HH:mm").diff(moment(start,"YYYY-MM-DD HH:mm"))).format("HH:mm");

            var horaDesde = response.orders[i].hora_desde.slice(0, -3);
            var horaHasta = response.orders[i].hora_hasta.slice(0, -3);

            turno_tipo = response.orders[i].turno_tipo;
            change_turnoTipo(turno_tipo);

            data_order +=  `<div style="background: ${back_ot}" class="div_ot_agendaI" id="`+ response.orders[i].id_orden +`">
                              <p id="empresa_ot">`+ response.orders[i].razon_social +`</p>
                              <p id="lugar_ot">`+ response.orders[i].locacion_nombre +`</p>
                              <p id="lugar2_ot">`+ response.orders[i].locacion_direccion +`</p>
                              <p id="cod_ot">OT `+ response.orders[i].id_ot +`</p>
                              <p id="time_ot">`+horaDesde+`hs. a `+horaHasta+`hs</p>
                              <p class="type_duration"><span id="duration_job">`+Ttime_Ot+`hs.</span><br><span id="type_job">${turno_tipo}</span></p>
                              <div class="caja_status">
                                  <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                                  <div style="background: #${importancia};" class="iportancia_ot"></div>
                                  ${pendiente}
                              </div>
                            </div>`;
            $('.main-agenda').html(data_order);
          }

          $('#loader').css('display', 'none');
          seePanel_agenda();
          showCalendar();
        } else {
            $('.main-agenda').html('<p class="message_error">No hay Orenes de Trabajo para hoy.</p>');
            $('#loader').css('display', 'none');
            seePanel_agenda();
            showCalendar();
        }
      },
      error: function(jqXHR, textStatus, error) {
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });

  $('.btn_panel_espontaneos').off('click');
  $('.btn_panel_espontaneos').on('click', function(){
    seePanel_espontaneos();
  });

  $('.bt_in_replanteo').off('click');
  $('.bt_in_replanteo').on('click', ()=>{
    $('#tit_rep').val('');
    $('#desc_rep').val('');
    $(".btn_cot_ejc").removeClass("active_bt");
    seePanel_replanteo();
  });

  $('#btn-intro-doc').off('click');
  $('#btn-intro-doc').on('click', ()=>{
    alert('próximamente..');
  });

  $('#link_movilidad').off('click');
  $('#link_movilidad').on('click', function(){
    seeMovilidad();
  });

  // $('#link_hoja').off('click');
  // $('#link_hoja').on('click', function(){
  //   seeHojaDeRuta();
  // });
}

function loadInfoServicesPanel() {
  $('#loader').css('display', 'flex');
  var empleado_id = app.current_user.type_id;
  var fecha = moment().format('YYYY-MM-DD');
  $.ajax({
    url: "../api/get_orders_summary.php",
    type: "GET",
    dataType: "json",
    data: { empleado_id: empleado_id, fecha: fecha },
    success: function(response) {
      if (response.success == true) {
        $('#loader').css('display', 'none');
        console.log(response);
        document.getElementById('cant_urgentes').innerHTML = response.urgente;
        document.getElementById('cant_preventivos').innerHTML = response.preventivo;
        document.getElementById('cant_correctivos').innerHTML = response.correctivo;
        document.getElementById('cant_espontaneos').innerHTML = response.espontaneo;
        seePanel_servicios();
      } else {
        console.log('error ajax response -> get_orders_summary.php');
        errA();
      }
    },
    error: function() {
      console.log('error ajax -> get_orders_summary.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function check_intro(){
  if ($("#splash").is(":visible")) {
    $("#btn_menu").hide();
  }
}

function openNav() {
  if (app.current_user.type == 2) {
    $('#id_comenza, #id_hoja, #id_ots, #btn-agenda').css('display', 'none');
  }
  var sidenav = $("#mySidenav");
  if (nav_open == false) {
      switch(page_this) {
        case 'hoja':
          $('#id_hoja').addClass('this_page');
          $('#id_comenza').removeClass('this_page');
          $('#id_ots').removeClass('this_page');
          break;
        case 'comenza':
          $('#id_comenza').addClass('this_page');
          $('#id_hoja').removeClass('this_page');
          $('#id_ots').removeClass('this_page');
          break;

        case 'ots':
          $('#id_ots').addClass('this_page');
          $('#id_comenza').removeClass('this_page');
          $('#id_hoja').removeClass('this_page');
          break;

          default:
            $('#id_ots').removeClass('this_page');
            $('#id_comenza').removeClass('this_page');
            $('#id_hoja').removeClass('this_page');
            break;
      }
      sidenav.removeClass("close").addClass("open");
      nav_open = true;
      $('#backSideNav').css('display', 'block');
    } else {
      sidenav.removeClass("open").addClass("close");
      nav_open = false;
      $('#backSideNav').css('display', 'none');
  }
}

function select_option_menu() {
  $('#mySidenav > a, #backSideNav').on('click', function() {
    openNav();
  });
}

//***************************************************
//*   CRONOMETROS COMENZAR TU DIA                   *
//***************************************************

function iniciar_jornada() {
  hour = $("#hour");
  minute = $("#minute");
  second = $("#second");
  hour_br = $("#hour2");
  minute_br = $("#minute2");
  second_br = $("#second2");

  tiempo_corriendo = null;
  if (jornada == 'open') {
    $(".btn_ingresar_clave").text('Finalizar');
    var array_time = saved_time.split(":");
    var tiempo = {
        hora: parseInt(array_time[0]),
        minuto: parseInt(array_time[1]),
        segundo: parseInt(array_time[2])
    };
    tiempo_corriendo = setInterval(function(){
        // Segundos
        tiempo.segundo++;
        if(tiempo.segundo >= 60)
        {
            tiempo.segundo = 0;
            tiempo.minuto++;
        }
        // Minutos
        if(tiempo.minuto >= 60)
        {
            tiempo.minuto = 0;
            tiempo.hora++;
        }

        hour.text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
        minute.text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
        second.text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
    }, 1000);
    $(".btn_ingresar_clave").click(function(){
      var id_empleado = app.current_user.type_id;
      $('#loader').css('display', 'flex');
      $.ajax({
        url: "../api/check_employee_hour.php",
        type: "GET",
        dataType: "json",
        data: { 'id_empleado': id_empleado, 'check': true},
        success: function(response) {
          $('#loader').css('display', 'none');
          if (response.success == true) {
            var openOts = '';
            console.log(response);
            if (response.open_ots != null && response.open_ots.length > 0) {
              response.open_ots.forEach(ot => {
                openOts += `<li> ${ot.id_ot}</li>`;               
              });
              $('.resultOpenOts').html(openOts)
              $('#modal_showOpenOts').modal();
              $('#bt_goCloseAllOts').off('click').on('click', function() {
                loadInfoServicesPanel();                
              })
            }
            else {
              $('#modal_finalizar_jornada').modal();
  
              /* finish the day */
              end_day();
            }           
          } else {
            console.log(response.error, response.sql);
            errA();
          }
        },
        error: function() {
          console.log('error ajax -> check_employee_hour.php');
          $('#loader').css('display', 'none');
          errC();
        }
      });      
      
    });

  } else {
    $(".btn_ingresar_clave").off('click');
    $(".btn_ingresar_clave").click(function(){
      $('#errorM_fin').html('');
      $('#errorM_inicio').html('');
      if ( $(this).text() == 'Iniciar' ) {
        $('#datos_gestion').hide();
        $('#modal_iniciar').modal();
        $("#btn_start").off('click');
        $("#btn_start").click(function() {
          if ($('#claveG_inicio').val() == app.current_user.clave) {
            getLocation()
            .then(function(position) {
              coordenadas = position.coords.latitude+', '+position.coords.longitude;
              $('#modal_iniciar').modal('hide');
              var id_empleado = app.current_user.type_id;
              var tipo = "d.0";
              console.log(coordenadas);
              $('#loader').css('display', 'flex');
              $.ajax({
                url: "../api/save_employee_hour.php",
                type: "POST",
                dataType: "json",
                data: { id_empleado, tipo, coordenadas},
                success: function(response) {
                  $('#loader').css('display', 'none');
                  if (response.success == true) {
                      console.log("Inició la jornada");
                      $(".btn_ingresar_clave").text('Finalizar');
                      $(".div_break_things").css('display', 'block');
                      var tiempo = {
                          hora: 0,
                          minuto: 0,
                          segundo: 0
                      };
                      tiempo_corriendo = setInterval(function(){
                          // Segundos
                          tiempo.segundo++;
                          if(tiempo.segundo >= 60)
                          {
                              tiempo.segundo = 0;
                              tiempo.minuto++;
                          }
                          // Minutos
                          if(tiempo.minuto >= 60)
                          {
                              tiempo.minuto = 0;
                              tiempo.hora++;
                          }

                          hour.text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
                          minute.text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
                          second.text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
                      }, 1000);

                  } else {
                     console.log(response.error, response.sql)
                     errA();
                  }
                },
                error: function() {
                  console.log('error ajax -> save_employee_hour.php');
                  $('#loader').css('display', 'none');
                  errC();
                }
              });
            });
          } else {
            $('#errorM_inicio').html('Ingrese una clave valida');
          }
        })
      } else {
        $('#modal_finalizar_jornada').modal();
        end_day();
      }
    })
  }

  tiempo_corriendo_br = null;
  if (descanso == 'open') {
    $(".btn_iniciar_break").text('Finalizar Break');
    hour_br.text('00');
    minute_br.text('00');
    second_br.text('00');
    array_time_br = saved_time_br.split(":");
    var tiempo_br = {
        hora: parseInt(array_time_br[0]),
        minuto: parseInt(array_time_br[1]),
        segundo: parseInt(array_time_br[2])
    };
    tiempo_corriendo_br = setInterval(function(){
      // Segundos
      tiempo_br.segundo++;
      if(tiempo_br.segundo >= 60)
      {
          tiempo_br.segundo = 0;
          tiempo_br.minuto++;
      }

      // Minutos
      if(tiempo_br.minuto >= 60)
      {
          tiempo_br.minuto = 0;
          tiempo_br.hora++;
      }

      hour_br.text(tiempo_br.hora < 10 ? '0' + tiempo_br.hora : tiempo_br.hora);
      minute_br.text(tiempo_br.minuto < 10 ? '0' + tiempo_br.minuto : tiempo_br.minuto);
      second_br.text(tiempo_br.segundo < 10 ? '0' + tiempo_br.segundo : tiempo_br.segundo);
    }, 1000);
    $(".btn_iniciar_break").off('click');
    $(".btn_iniciar_break").click(function(){
      /* finish the break */
      end_break();
    });

  } else {
    $(".btn_iniciar_break").off('click');
    $(".btn_iniciar_break").click(function(){
      $('#errorM_inicio_br').html('');
      $('#errorM_fin_br').html('');
      if ( $(this).text() == 'Iniciar Break' ) {
        $('#modal_iniciar_break').modal();
        $("#btn_start_break").off('click');
        $("#btn_start_break").click(function(){
          if ($('#claveG_inicio_br').val() == app.current_user.clave) {
            getLocation()
            .then(function(position) {
              coordenadas = position.coords.latitude+', '+position.coords.longitude;
              $('#modal_iniciar_break').modal('hide');
              var id_empleado = app.current_user.type_id;
              var tipo = "b.0";
              $('#loader').css('display', 'flex');
              $.ajax({
                url: "../api/save_employee_hour.php",
                type: "POST",
                dataType: "json",
                data: { id_empleado, tipo, coordenadas },
                success: function(response) {
                  $('#loader').css('display', 'none');
                  if (response.success == true) {
                    console.log("Inició el descanso");
                    $(".btn_iniciar_break").text('Finalizar Break');
                    hour_br.text('00');
                    minute_br.text('00');
                    second_br.text('00');

                    var tiempo_br = {
                        hora: 0,
                        minuto: 0,
                        segundo: 0
                    };
                    tiempo_corriendo_br = setInterval(function(){
                        // Segundos
                        tiempo_br.segundo++;
                        if(tiempo_br.segundo >= 60)
                        {
                            tiempo_br.segundo = 0;
                            tiempo_br.minuto++;
                        }

                        // Minutos
                        if(tiempo_br.minuto >= 60)
                        {
                            tiempo_br.minuto = 0;
                            tiempo_br.hora++;
                        }

                        hour_br.text(tiempo_br.hora < 10 ? '0' + tiempo_br.hora : tiempo_br.hora);
                        minute_br.text(tiempo_br.minuto < 10 ? '0' + tiempo_br.minuto : tiempo_br.minuto);
                        second_br.text(tiempo_br.segundo < 10 ? '0' + tiempo_br.segundo : tiempo_br.segundo);
                    }, 1000);
                  } else {
                    console.log(response.error, response.sql)
                  }
                },
                error: function() {
                  console.log('error ajax -> save_employee_hour.php');
                  $('#loader').css('display', 'none');
                  errC();
                }
              });
            });
          } else {
            $('#errorM_inicio_br').html('Ingrese una clave valida');
          }
        })
      }
      else {
        end_break();
      }
    });
  }
}

// muestra la sub-seccion movilidad
function seeMovilidad() {
  showSection(hideAllSections, 'movilidad');
  page_back = 'hoja';
  btnBack();
}

// muestra la sub-seccion Hoja de ruta
function seeHojaDeRuta() {
  showSection(hideAllSections, 'hoja_de_ruta');
  page_back = 'hoja';
  btnBack();
}

function seePanel_servicios() {
  showSection(hideAllSections, 'panel-servicios');
  page_back = 'panel-ots';
  btnBack();
}

function seePanel_expense() {
  showSection(hideAllSections, 'panel-expense');
  page_back = 'movilidad';
  btnBack();
}

function seePanel_materiales() {
  showSection(hideAllSections, 'panel-materiales');
  page_back = 'panel-ots';
  btnBack();
  
  $('.pedido_otmh').off('click').on('click', function() {
    var id_oc = $(this).data('id');
    $('#loader').css('display', 'flex');
    var id_empleado = app.current_user.type_id;
    $.ajax({
      url: "../api/check_employee_hour.php",
      type: "GET",
      dataType: "json",
      data: { id_empleado, id_oc },
      success: function(response) {
        $('#loader').css('display', 'none');
        if (response.success == true) {
          console.log(response);
          // is open? -> set
          if (response.last_day.tipo == 'd.0') {
            if (response.last_oc.tipo == 'oc.0') {
              // the OC is open, so I show it
              show_OC(id_oc)
            } 
            else {
              // the OC is not open, so I open it
              $('#clave_openOc').val('');
              $('#modal_realiza_oc').modal();
              $('.bt_inicia_oc').off('click');
              $('.bt_inicia_oc').click(function() {
                if ($('#clave_openOc').val() == app.current_user.clave) {
                  $('#loader').css('display', 'flex');
                  getLocation()
                  .then(function(position) {
                    coordenadas = position.coords.latitude+', '+position.coords.longitude;
                    var id_empleado = app.current_user.type_id,
                        tipo = "oc.0";
                    // save to db
                    $.ajax({
                      url: "../api/save_employee_hour.php",
                      type: "POST",
                      dataType: "json",
                      data: {'id_empleado': id_empleado, 'tipo': tipo, 'tipo_id': id_oc, 'coordenadas': coordenadas },
                      success: function(response) {
                        if (response.success) {
                          console.log('Se inició la OC');
                          $('#modal_realiza_oc').modal('hide');                        
                          show_OC(id_oc);
                        } else {
                          console.log(response.error, response.sql)
                          errA();
                        }
                      },
                      error: function() {
                        console.log('error ajax -> save_employee_hour.php -> status ot');
                        $('#loader').css('display', 'none');
                        errC();
                      }
                    });
                  });
                } else {
                  $('.erroM_openOc').html('ingresá una clave válida.');
                }
              });
            }
          } else {
            $('#modal_errorJornada').modal();
            $('#bt_goComenzar').off('click');
            $('#bt_goComenzar').on('click', function() {
              into_agenda();
            });
          }
        } else {
          console.log(response.error, response.sql);
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> check_employee_hour.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });
}


function show_OC(id_oc) {
  $('#loader').css('display', 'flex');
  $.ajax({
    url: "../api/get_purchaseOrder.php",
    type: "GET",
    dataType: "json",
    data: { 'id_empleado': app.current_user.type_id, 'id_oc': id_oc},
    success: function(response) {
      $('#loader').css('display', 'none');
      if (response.success == true) {
        console.log(response);
        var data_purchase = '';
        var data_material = '';
        var btn_printOT = '<button class="print_oc" data-print="'+ response.order.id_compra +'"><i class="fas fa-print"></i></button>';

        data_purchase = `<img src="assets/images/icon/operarios.png" alt="">
                          <p id="empresa_ot">`+ response.order.cliente +`</p>
                          <p class="cod-ots">`+ response.order.prov_name +`</p>
                          <p>`+ response.order.prov_direccion +`</p>
                          <p>`+ response.order.prov_localidad +`</p>
                          <p class="cod-ots">OC N°: `+ response.order.numero +`</p>
                          <div class="div_filesOC">
                            <i class="far fa-file-alt"></i>
                          </div>
                          ${btn_printOT}
                          `;
                          
        $('.main_info_ots').html(data_purchase);

        var data_filesOc = '';
        if (response.order.archivos != "") {
          var files_oc = response.order.archivos.split(';');
          files_oc.forEach(function(file_oc) {
            var route_file = file_oc.split('>>');
            console.log(route_file[1]);
            data_filesOc += `<li><a href="https://mecsimples-app.com.ar${route_file[1]}" target="_blank">${route_file[0]}</a></li>`;
          });
          $('.file_list').html(data_filesOc);
        }  else {
          data_filesOc = '<span>No hay archivos para ver</span>';
          $('.file_list').html(data_filesOc);
        }

        $('.print_oc').off('click').on('click', function() {
          var id_purchase = $(this).attr('data-print') * 87;
          window.open("../print_compra.php?actionSet=1&selectID[]="+$(this).attr('data-print'));
        })

        if (response.order.order_materials.length > 0) {
          response.order.order_materials.forEach(function(material, index) {
            
            data_material +=  `<div style="position: relative">
                                <div style="flex-direction: row" class="item_watch" id_material="`+ material.id_compra_material +`" num_material="`+(index + 1)+`">
                                  <span style="width: 85%">${material.descripcion}</span>
                                  <span style="width: 15%; text-align: right; color: #fd5e13;">${material.cantidad} U.</span>
                                </div>
                              </div>`;

            $('.all_items').html(data_material);
          });

          seePanel_detalle_oc();

          $('.div_filesOC').off('click').on('click', function() {
            $('#modal_files_OC').modal(); 
          });

          showName_foto('ocFile');

          $('.btnAdd_fileOc').off('click').on('click', function() {
            $('#name_ocFile_foto').html('');
            $('#ocFile_foto').val('');
            $('#modal_addFileOc').modal(); 
          });

          $('#bt_sendfileOC').off('click').on('click', function() {
            $('#loader').css('display', 'flex');
            var to_sendOc = new FormData;
            to_sendOc .append('id_oc', id_oc);
            var ins = document.getElementById('ocFile_foto').files.length;
            for (var x = 0; x < ins; x++) {
              to_sendOc.append('archivos[]', document.getElementById('ocFile_foto').files[x]);
            }
            console.log(to_sendOc);
            $.ajax({
              url: "../api/update_oc.php",
              type: "POST",
              dataType: "json",
              data: to_sendOc,
              cache: false,
              contentType: false,
              processData: false,
              success: function(response) {
                $('#loader').css('display', 'none');
                if (response) {
                  if (response.success == true) {
                    console.log('archivo guardado');
                    $('#modal_addFileOc').modal('hide'); 
                  }
                } else {
                  console.log("error response ajax -> new_request.php");
                }
              },
              error: function() {
                console.log('error ajax -> new_request.php');
                $('#loader').css('display', 'none');
                errC();
              }
            });                                 
          });

          
          $('.btn_closeOC').off('click').on('click', function() {
            $('#clave_openOc').val('');
            $('#modal_finish_oc').modal();
            $('.bt_close_oc').off('click');
            $('.bt_close_oc').click(function() {
              if ($('#clave_closeOc').val() == app.current_user.clave) {
                $('#loader').css('display', 'flex');
                getLocation()
                .then(function(position) {
                  coordenadas = position.coords.latitude+', '+position.coords.longitude;
                  var id_empleado = app.current_user.type_id,
                      tipo = "oc.1";
                  // save to db
                  $.ajax({
                    url: "../api/save_employee_hour.php",
                    type: "POST",
                    dataType: "json",
                    data: {'id_empleado': id_empleado, 'tipo': tipo, 'tipo_id': id_oc, 'coordenadas': coordenadas },
                    success: function(response) {
                      $('#loader').css('display', 'none');
                      $('#modal_finish_oc').modal('hide');
                      $('#modal_completeOC').modal();                     
                      seePanel_materiales();
                    },
                    error: function() {
                      console.log('error ajax -> save_employee_hour.php -> status ot');
                      $('#loader').css('display', 'none');
                      errC();
                    }
                  });
                });
              } else {
                $('.erroM_closeOc').html('ingresá una clave válida.');
              }
            });
          });

        } else {
          data_material =  `<p class="message_error">No hay items en ésta Orden de trabajo.</p>`;
          $('.all_items').html(data_material);
          $('#loader').css('display', 'none');
          seePanel_detalle_oc();
        }                             
        modal_infoPedido(response.order.descripcion, response.order.detalle);                                                              
      } else {
        console.log(response);
      }
    },
    error: function(jqXHR, textStatus, error) {
      console.log(jqXHR + "-" + textStatus + "-" + error);
      errC();
    }
  });
}


function seePanel_pedido_mh() {
  showSection(hideAllSections, 'panel-pedido-mh');
  slider_materiales();
  page_back = 'panel-materiales';
  btnBack();
}

function seePanel_stock_transito() {
  showSection(hideAllSections, 'panel-stock-transito');
  page_back = 'panel-materiales';
  btnBack();
  slider_stock_transito();
}

function replanteos_pedidos() {
  $('#locacion_repl').prop('disabled', 'disabled');
  $('#pedido_repl').prop('disabled', 'disabled');
  var data_locations = '<option hidden selected value="">Seleccioná una locación</option>';

  showName_foto('replanteo2');
  $(".step1_repl").css('display', 'block');
  $(".step2_repl").css('display', 'none');

  if (app.current_user.type == 1) {
    showSection(hideAllSections, 'panel-replanteo-sinOt');
    page_back = 'panel-listReplanteos';
    btnBack();

    $(".cancel_item").off('click');
    $(".cancel_item").on('click', function() {
      showSection(hideAllSections, 'intro');
    });
  } else {
    $('#tit_repledido').html('PEDIDO');
    showSection(hideAllSections, 'panel-replanteo-sinOt');
    page_back = 'intro-cliente';
    btnBack();
    $(".cancel_item").off('click');
    $(".cancel_item").on('click', function() {
      showSection(hideAllSections, 'intro-cliente');
    });
  }

  $("#bt_next_replanteo").off('click');
  $("#bt_next_replanteo").on('click', function() {
    $(".step1_repl").css('display', 'none');
    $(".step2_repl").css('display', 'block');
    console.log($('#locacion_repl').val());
  });

  $("#bt_back_replanteo").off('click');
  $("#bt_back_replanteo").on('click', function() {
    $(".step1_repl").css('display', 'block');
    $(".step2_repl").css('display', 'none');
  });

  var btns2 = $(".btn_cot_ejc2");

  btns2.click(function(){
    btns2.removeClass("active_bt");
    $(this).addClass("active_bt");
  });

  $('#bt_cotiza2').on('click', function() {
    tipo_pedido2 = 'cotizar';
  })

  $('#bt_ejecuta2').on('click', function() {
    tipo_pedido2 = 'ejecutar';
  })

  $.ajax({
    url: "../api/get_clients.php",
    type: "GET",
    dataType: "json",
    data: { 'id_empleado': app.current_user.type_id },
    success: function(response) {
      if (response) {
        console.log(response.clients);
        var data_clients = '<option hidden selected value="">Seleccioná el cliente</option>';
        if (app.current_user.type == 1) {
          for (var i = 0; i < response.clients.length; i++) {
            data_clients += `<option value="${response.clients[i].id_cliente}">${response.clients[i].apodo}</option>`;
          }
          $('#cliente_repl').html(data_clients);
          $('#cliente_repl').select2();
        } else {
          var id_cliente = app.current_user.type_id;
          for (var i = 0; i < response.clients.length; i++) {
            if (response.clients[i].id_cliente == id_cliente) {
              data_clients += `<option value="${response.clients[i].id_cliente}">${response.clients[i].apodo}</option>`;
            }
          }
          $('#cliente_repl').html(data_clients);
          $('#cliente_repl').select2();
        }
      } else {
        console.log("error response ajax -> get_clients.php");
        errA();
      }
    },
    error: function() {
      console.log('error ajax -> get_clients.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
  
  $('#cliente_repl').off('change').on('change', function() {
    var id_client = $(this).val();
    $.ajax({
      url: "../api/get_contacts.php",
      type: "GET",
      dataType: "json",
      data: { 'id_cliente': id_client },
      success: function(response) {
        if (response) {
          var data_contacts = `<option hidden selected value="${app.current_user.id}">${app.current_user.name}</option>`;
          console.log(response);
          if (response.success == false) {
            data_contacts += `<option selected disabled>No hay contacto para elegir</option>`;
          } else {
            for (var i = 0; i < response.contacts.length; i++) {
              data_contacts += `<option value="${response.contacts[i].id_contacto}">${response.contacts[i].nombre + ' ' + response.contacts[i].apellido}</option>`;
            }
          }
          $('#pedido_repl').html(data_contacts)
          $('#pedido_repl').prop('disabled', false);
          changeInputLocation();
        } else {
          console.log("error response ajax -> get_contacts.php");
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> get_contacts.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });

  $('#pedido_repl').off('change').on('change', function() {
    changeInputLocation();
  });

  function changeInputLocation() {
    var id_contact = $('#pedido_repl').val();
    $.ajax({
      url: "../api/get_locations.php",
      type: "GET",
      dataType: "json",
      data: { 'id_contacto': id_contact },
      success: function(response) {
        $('#loader').css('display', 'none');
        if (response) {
          data_locations = '<option hidden selected value="">Seleccioná una locación</option>';
          if (response.success == false) {
            data_locations = `<option value="" selected disabled>No hay locaciones para elegir</option>`;
          } else {
            for (var i = 0; i < response.locations.length; i++) {
              data_locations += `<option value="${response.locations[i].id_locacion}">${response.locations[i].nombre}</option>`;
            }
          }
          $('#locacion_repl').html(data_locations)
          $('#locacion_repl').prop('disabled', false);
        } else {
          console.log("error response ajax -> get_locations.php");
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> get_locations.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  }




  $('#bt_send_replanteo2, #bt_send_replanteoSO').off('click');
  $('#bt_send_replanteo2, #bt_send_replanteoSO').on('click', function() {
    $('#loader').css('display', 'flex');
    var desde = app.current_user.type == 2 ? 'app-cliente' : 'app-empleado';
    var id_empleado = app.current_user.type_id;
    var clasificacionR2 = 'correctivo';
    var tipoR2 = '';

    switch (tipo_pedido2) {
      case 'ejecutar':
        tipoR2 = 'ot-pedido';
        break;
      case 'cotizar':
        tipoR2 = 'cot-presupuesto';
        break;
      default:
        tipoR2 = '';
        break;
    }

    var to_sendR2 = new FormData;
    to_sendR2.append('id_cliente', $('#cliente_repl').val());
    to_sendR2.append('id_empleado', id_empleado);
    to_sendR2.append('id_locacion', $('#locacion_repl').val());
    to_sendR2.append('id_contacto', $('#pedido_repl').val());
    to_sendR2.append('clasificacion', clasificacionR2);
    to_sendR2.append('tipo', $('#priority_rep2').val());
    to_sendR2.append('prioridad', tipoR2);
    to_sendR2.append('descripcion', $('#tit_rep2').val());
    to_sendR2.append('detalle', $('#desc_rep2').val());
    to_sendR2.append('desde', desde);
    to_sendR2.append('cargado_por', app.current_user.id);
    // to_sendR.append('replanteo_foto', $('#replanteo_foto')[0].files[0]);
    /* replanteo fotos */
    var ins = document.getElementById('replanteo2_foto').files.length;
    for (var x = 0; x < ins; x++) {
      to_sendR2.append('archivos[]', document.getElementById('replanteo2_foto').files[x]);
    }
    $.ajax({
      url: "../api/new_request.php",
      type: "POST",
      dataType: "json",
      data: to_sendR2,
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
        if (response) {
          $('#loader').css('display', 'none');
          if (response.success == true) {
            console.log('Pedido enviado');
            if (app.current_user.type == 1) {
              showSection(hideAllSections, 'intro');
              num_replanteos = num_replanteos + 1;
              show_numReplanteos();
            } else {
              showSection(hideAllSections, 'intro-cliente');
            }
          }
        } else {
          console.log("error response ajax -> new_request.php");
          alert('Error en el envio del replanteo');
          showSection(hideAllSections, 'intro');
        }
      },
      error: function() {
        console.log('error ajax -> new_request.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });
}

function seePanel_listReplanteos() {

  if (app.current_user.type == 1) {
    showSection(hideAllSections, 'panel-listReplanteos');
    page_back = 'intro';
    btnBack();
  } else {
    replanteos_pedidos();
  }

  $('#btnNew_replanteo').off('click').on('click', function() {
    replanteos_pedidos();
  });
}

function seePanel_listEspontaneos() {
  showSection(hideAllSections, 'panel-listEspontaneos');
  page_back = 'panel-servicios';
  btnBack();

  $('#new_espontaneo').off('click').on('click', function() {
    showSection(hideAllSections, 'panel-espontaneos');
    page_back = 'panel-listEspontaneos';
    btnBack();
    var item_num = 1;
    $('.err_espon').html('');
    $('.itemEsp_num').html(item_num);
    $('#tit_otEsp').val('');
    $('#pedido_espon').html('<option hidden selected value="">Seleccioná un contacto</option>');
    $('#locacion_espon').html('<option hidden selected value="">Seleccioná una locación</option>')
    $('#desc_itemEsp').val('');
    $('#num_itemEsp').val('');
  
  
    $(".cancel_expontaneo").off('click').on('click', function() {
      showSection(hideAllSections, 'panel-servicios');
    });
  
    $('#bt_next_espontaneo').off('click').on('click', function() {  
      if ($('#cliente_espon').val() == '' || $('#pedido_espon').val() == '' || $('#tit_otEsp').val() == '') {
        $('.err_espon').html('Faltan completar campos.');
      } else {
        $('.err_espon').html('');
        $('.step2_esp').show();
        $('.step1_esp').hide();
      }
    });
  
    $('#locacion_espon').prop('disabled', 'disabled');
    $('#pedido_espon').prop('disabled', 'disabled');
    var data_locations = '<option hidden selected value="">Seleccioná una locación</option>';
  
    showName_foto('espontaneo');
  
    $('.step1_esp').show();
    $('.step2_esp').hide();
    $('.step3_esp').hide();
  
    // $("#").off('click');
    // $("#").on('click', function() {
    //   $('.step1_esp').show();
    //   $('.step2_esp').hide();
    // });
  
    $.ajax({
      url: "../api/get_clients.php",
      type: "GET",
      dataType: "json",
      data: { 'id_empleado': app.current_user.type_id },
      success: function(response) {
        console.log('hola');
        if (response) {
          console.log(response);
          var data_clients = '<option hidden selected value="">Seleccioná el cliente</option>';
            for (var i = 0; i < response.clients.length; i++) {
              data_clients += `<option value="${response.clients[i].id_cliente}">${response.clients[i].apodo}</option>`;
            }
            $('#cliente_espon').html(data_clients);
            $('#cliente_espon').select2();
        } else {
          console.log("error response ajax -> get_clients.php");
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> get_clients.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  
    $('#cliente_espon').off('change');
    $('#cliente_espon').on('change', function() {
      var id_client = $(this).val();
      $.ajax({
        url: "../api/get_locations.php",
        type: "GET",
        dataType: "json",
        data: { 'id_cliente': id_client },
        success: function(response) {
          $('#loader').css('display', 'none');
          if (response) {
            data_locations = '<option hidden selected value="">Seleccioná una locación</option>';
            if (response.success == false) {
              data_locations = `<option value="" selected disabled>No hay locaciones para elegir</option>`;
            } else {
              for (var i = 0; i < response.locations.length; i++) {
                data_locations += `<option value="${response.locations[i].id_locacion}">${response.locations[i].nombre}</option>`;
              }
            }
            $('#locacion_espon').html(data_locations)
            $('#locacion_espon').prop('disabled', false);
          } else {
            console.log("error response ajax -> get_locations.php");
            errA();
          }
        },
        error: function() {
          console.log('error ajax -> get_locations.php');
          $('#loader').css('display', 'none');
          errC();
        }
      });
  
      
      $.ajax({
        url: "../api/get_contacts.php",
        type: "GET",
        dataType: "json",
        data: { 'id_cliente': id_client },
        success: function(response) {
          if (response) {
            var data_contacts = '<option hidden selected value="">Seleccioná un contacto</option>';
            console.log(response);
            if (response.success == false) {
              data_contacts += `<option selected disabled>No hay contacto para elegir</option>`;
            } else {
              for (var i = 0; i < response.contacts.length; i++) {
                data_contacts += `<option value="${response.contacts[i].id_contacto}">${response.contacts[i].nombre + ' ' + response.contacts[i].apellido}</option>`;
              }
            }
            $('#pedido_espon').html(data_contacts)
            $('#pedido_espon').prop('disabled', false);
          } else {
            console.log("error response ajax -> get_contacts.php");
            errA();
          }
        },
        error: function() {
          console.log('error ajax -> get_contacts.php');
          $('#loader').css('display', 'none');
          errC();
        }
      });
    });
  
    items_espontaneo = [];
  
    function save_item() {
      return new Promise(function(resolve, reject) {
        var archivos_esp = [];
        var cant = document.getElementById('espontaneo_foto').files.length;
        console.log(cant);
        for (var x = 0; x < cant; x++) {
          archivos_esp.push(document.getElementById('espontaneo_foto').files[x]);
        }
        var fields_item = {
          cant: $('#num_itemEsp').val(),
          unit: $('#unit_itemEsp').val(),
          description: $('#desc_itemEsp').val(),
          archivos: archivos_esp
        };
        items_espontaneo.push(fields_item);
        resolve('se agrego el item');
      });
    }
  
    $('.addItem_esp span').off('click').on('click', function() {
      if ($('#num_itemEsp').val() == '' || $('#desc_itemEsp').val() == '' || $('#unit_itemEsp').val() == null) {
        $('.err_espon2').html('Faltan completar campos.');
      } else {
        $('.err_espon2').html('');
        save_item()
        .then(function(response) {
          console.log(response);
          item_num = item_num + 1;
          $('.itemEsp_num').html(item_num);
          $('#num_itemEsp').val('');
          $('#unit_itemEsp').val('');
          $('#desc_itemEsp').val('');
          $('#espontaneo_foto').val('');
          $('#name_espontaneo_foto').html('');
      });
      }   
    })
  
    $('#bt_send_espontaneo').off('click').on('click', function() {
      if ($('#num_itemEsp').val() == '' || $('#desc_itemEsp').val() == '' || $('#unit_itemEsp').val() == null) {
        $('.err_espon2').html('Faltan completar campos.');
      } else {
        $('.err_espon2').html('');
        $('#loader').css('display', 'flex');
        save_item()
        .then(function(response) {
          console.log(response);
          var archivos = '';
          var ot_info = `
                          <img src="assets/images/icon/operarios.png" alt="">
                          <p id="empresa_ot">${$('#cliente_espon').find('option:selected').text()}</p>
                          <p>${$('#locacion_espon').find('option:selected').text() != 'No hay locaciones para elegir' ? $('#locacion_espon').find('option:selected').text() : ''}</p>
                          <p class="text_resaltado">${$('#tit_otEsp').val()}</p>
                          <p class="text_resaltado">Pedido por: ${$('#pedido_espon').find('option:selected').text()}</p>
                        `;
  
          $('.step3_esp .main_info_ots').html(ot_info);
  
          var data_itemsEsp = '';
          var photos = '';
          function show_itemEsp() {
            return new Promise(function(resolve, reject) {
              items_espontaneo.forEach(function(item, index){
                photos = '';
                getEspontaneoFoto(item.archivos).then(function(response) {
                  photos = response.join('>>');
  
                  if (!photos) {
                    var archivos = '';
                  } else {
                    var archivos = "<p>";
                    response.forEach(function(photo, i) {
                      archivos += `<img src="${photo}" data-test="..">`;
                    });
                    archivos += "</p>";
                    items_espontaneo[index].archivos = archivos;
                    
                    archivos = `<img style="margin-right: 5px;" src="assets/images/icon/cam_ico_ots.png" class="photos_itemEsp" data-photos="${photos}">`;
                  }
                  
                  var getUnit = app.units.find(unit => unit.id_unidad == String(item.unit));
                  
                  data_itemsEsp += `<div class="item_otsEsp">
                                      <h5>Item ${(index + 1)} <span id="img_several"></span></h5>
                                      <p>${item.description}</p>
                                      ${archivos}
                                      <span class="cu_item">${item.cant + ' ' + getUnit.descripcion}</span>
                                    </div>`;
                  $('.step3_esp .all_items').html(data_itemsEsp);
                  resolve(data_itemsEsp);
                });
              });
            });
          }
        
          show_itemEsp()
          .then(function(response) { 
            setTimeout(function(){
              $('.photos_itemEsp').off('click').on('click', function() {
                console.log('si entra');
                var img = '';
                var src = $(this).attr('data-photos');
                var caption = "Fotos item";
                var imgs = [];
                src = src.split('>>');
      
                src.forEach(function(photo, index) {
                  img = {
                    src: photo,
                    opts: {
                      caption: caption,
                    },
                  };
                  imgs.push(img);
                });
      
                $.fancybox.open(imgs, {loop : false});
              });
      
              $('.step1_esp').hide();
              $('.step2_esp').hide();
              $('.step3_esp').show();
              $('#loader').css('display', 'none');
            });
          }, 2000)             
        });
      } 
      
    })
  
    $('.request_approval').off('click').on('click', function() {
      $('#loader').css('display', 'flex');
      var id_empleado = app.current_user.type_id;
   
      console.log(items_espontaneo);
      var to_sendE = new FormData;
      to_sendE .append('id_cliente', $('#cliente_espon').val());
      to_sendE .append('id_empleado', id_empleado);
      to_sendE .append('id_locacion', $('#locacion_espon').val());
      to_sendE .append('id_contacto', $('#pedido_espon').val());
      to_sendE .append('clasificacion', 'correctivo');
      to_sendE .append('tipo', 'normal');
      to_sendE .append('prioridad', 'ot-espontaneo');
      to_sendE .append('descripcion', $('#tit_otEsp').val());
      // to_sendR2 .append('detalle', $('#desc_rep2').val());
      to_sendE .append('desde', 'app-empleado');
      to_sendE.append('items', JSON.stringify(items_espontaneo));
  
      $.ajax({
        url: "../api/new_espontaneo.php",
        type: "POST",
        dataType: "json",
        data: to_sendE,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
          if (response) {
            $('#loader').css('display', 'none');
            if (response.success == true) {
              console.log('espontaneo enviado');
              showSection(hideAllSections, 'intro');
            } else {
              showSection(hideAllSections, 'intro');
            }
          } else {
            console.log("error response ajax -> new_request.php");
            alert('Error en el envio del espontaneo');
            showSection(hideAllSections, 'intro');
          }
        },
        error: function() {
          console.log('error ajax -> new_request.php');
          $('#loader').css('display', 'none');
          errC();
        }
      });
    });
  })
}

function seePanel_listPedidos() {
  showSection(hideAllSections, 'panel-listPedidos');
  page_back = 'intro-cliente';
  btnBack();
  actions_orderClient();

  $('#bt_filterOt').off('click').on('click', function() {
    openList();
  })

  $('.bt_doFilter button').off('click').on('click', function() {
    var fStatusOt = $('#fStatusOt').attr('data-status');
    var fLocationOt = $('#fLocationOt').attr('data-loc');
    var id_cliente = app.current_user.type_id;
    $('#loader').css('display', 'flex');
    $.ajax({
      url: "../api/get_client_orders.php",
      type: "GET",
      dataType: "json",
      data: { 'id_cliente': id_cliente, 'exec': fStatusOt, 'id_locacion': fLocationOt, 'locations': app.current_user.locations},
      success: function(response) {
        $('#loader').css('display', 'none');
        if (response) {
          console.log(response);
          if (response.success) {
            if (response.total > 0) {
              get_ordersClient(response)                         
            } else {
              $('.main-pedidosC').html('<p class="message_error">No hay Ordenes de trabajo para ver.</p>');
              $('#loader').css('display', 'none');
              seePanel_listPedidos();
            }
          } else {
            $('.main-pedidosC').html('<p class="message_error">No hay Ordenes de trabajo para ver.</p>');
            $('#loader').css('display', 'none');
            seePanel_listPedidos();
          }
        } else {
          console.log(response.error, response.sql)
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> get_orders.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
    openList();
  })

  $('#bt_filterStatus').off('click').on('click', function() {
    $('#collapsestatus').collapse('toggle');
  })

  $('.optionStatus').off('click').on('click', function() {
    $('#bt_filterStatus span').html($(this).text());
    $('#bt_filterStatus span').attr('data-status', $(this).attr('data-status'));
    $('#collapsestatus').collapse('hide');
  })

  $('#bt_filterLocation').off('click').on('click', function() {
    $('#collapseLocation').collapse('toggle');
  })
  
  $('.optionLocation').off('click').on('click', function() {
    $('#bt_filterLocation span').html($(this).text());
    console.log($(this).attr('data-loc'));
    $('#bt_filterLocation span').attr('data-loc', $(this).attr('data-loc'));
    $('#collapseLocation').collapse('hide');
  })

}

function seePanel_listPresupuestos() {
  showSection(hideAllSections, 'panel-listPresupuestos');
  page_back = 'intro-cliente';
  btnBack();
  
  $('#bt_filterPres').off('click').on('click', function() {
    console.log('presupuestos')
    openList();
  })

  $('#bt_filterLocationPres').off('click').on('click', function() {
    $('#collapseLocationPres').collapse('toggle');
  })
  
  $('.optionLocation').off('click').on('click', function() {
    $('#bt_filterLocationPres span').html($(this).text());
    console.log($(this).attr('data-loc'));
    $('#bt_filterLocationPres span').attr('data-loc', $(this).attr('data-loc'));
    $('#collapseLocationPres').collapse('hide');
  })

  $('.bt_doFilterPres').off('click').on('click', function() {
    var fLocationPres = $('#fLocationPres').attr('data-loc');
    get_allPresupuestos(fLocationPres);
    openList();
  })
  
  $('.div_presupuesto').off('click').on('click', function() {
    var locations_pres = app.current_user.locations;
    var fechaPres = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
    var id_presu = $(this).attr('id');
    $('#loader').css('display', 'flex');
    $.ajax({
      url: "../api/get_presupuestos.php",
      type: "GET",
      dataType: "json",
      data: { 'locaciones': locations_pres, 'fecha': fechaPres },
      success: function(response) {
        if (response.success == true) {
          $('#loader').css('display', 'none');
          var getPresupuesto = response.presupuestos.find(presu => presu.id_presupuesto == id_presu);
          console.log(getPresupuesto);
          if (getPresupuesto.avance == 'pendiente' || getPresupuesto.avance == 'borrador') {
            $('#msjPresupuesto').html('El presupuesto aun no fue aprobado internamente.')
            $('#modal_msjPresupuesto').modal(); 
          } else if (getPresupuesto.avance == 'interno') {
            $('.presu_tit').html(getPresupuesto.titulo);
            $('.presu_detail').html(getPresupuesto.detalle);
            $('#modal_approvePresu').modal();
            console.log(id_presu);
            $('#bt_apvPresupuesto').off('click').on('click', function() {
              $('#loader').css('display', 'flex');
              $.ajax({
                url: "../api/apro_presupuesto.php",
                type: "POST",
                dataType: "json",
                data: { 'id_presupuesto': id_presu },
                success: function(response) {
                  if (response.success == true) {
                    $('#loader').css('display', 'none');
                    $('#msjPresupuesto').html('¡Listo! El presupuesto ya está aprobado.')
                    $('#modal_msjPresupuesto').modal();
                    $('.reloadPresupuestos').off('click').on('click', function() {
                      get_allPresupuestos(app.current_user.locations);
                    })
                  } else {
                    console.log('error -> get_presupuestos.php');
                    errA();
                  }
                },
                error: function(jqXHR, textStatus, error) {
                  console.log(jqXHR + "-" + textStatus + "-" + error);
                  $('#loader').css('display', 'none');
                  errC();
                }
              }); 
            });
          } 
                   
        } else {
          console.log('error -> get_presupuestos.php');
          errA();
        }
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR + "-" + textStatus + "-" + error);
        $('#loader').css('display', 'none');
        errC();
      }
    });   
  })
}

function seePanel_pedidosCliente() {
  showSection(hideAllSections, 'panel-pedido-cliente');
  page_back = 'intro-cliente';
  btnBack();
}

function seePanel_summaryOrder() {
  showSection(hideAllSections, 'panel-summaryOrder');
  page_back = 'panel-listPedidos';
  btnBack();
}

function seePanel_infoPedido() {
  showSection(hideAllSections, 'panel-infoPedido');
  page_back = 'panel-listPedidos';
  btnBack();
}

function seePanel_vistaOt() {
  showSection(hideAllSections, 'panel-correctivos');
  page_back = 'panel-servicios';
  btnBack();

  $('.div_ot_agenda').off('click');
  $('.div_ot_agenda').click(function() {
    $('#loader').css('display', 'flex');
    orden_id = this.id;
    var id_empleado = app.current_user.type_id;
    $.ajax({
      url: "../api/check_employee_hour.php",
      type: "GET",
      dataType: "json",
      data: { 'id_empleado': id_empleado, 'id_ot': orden_id },
      success: function(response) {
        $('#loader').css('display', 'none');
        if (response.success == true) {
          console.log(response)
          // is open? -> set
          if (response.last_ot.tipo == 'ot.0') {
            $('#status_ot').html('Cerrar');
            estado_ot = 'open';
            console.log('la ot estaba abierta');
            $('.bt_in_replanteo').css('display', 'flex');
            action_ot = 'eject';
            get_items();
          }
          else {
            $('#status_ot').html('Realizar');
            estado_ot = 'closed';
            action_ot = 'eject';
            get_items();
          }
        } else {
          console.log(response.error, response.sql);
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> check_employee_hour.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });
}

function seePanel_vehiculo() {
  showSection(hideAllSections, 'panel-vehiculo');
  page_back = 'hoja';
  btnBack();
}

function seePanel_data_car() {
  showSection(hideAllSections, 'panel-data-car');
  page_back = 'panel-vehiculo';
  btnBack();
}

function seePanel_info_car() {
  showSection(hideAllSections, 'panel-info-car');
  page_back = 'panel-data-car';
  btnBack();
}

function seePanel_agenda() {
  showSection(hideAllSections, 'panel-agenda');
  page_back = 'panel-ots';
  btnBack();

  $('.div_ot_agendaI').off('click');
  $('.div_ot_agendaI').click(function() {
    orden_id = this.id;
    action_ot = 'watch';
    get_items();
  });
}

function seePanel_detalle_ots() {
  if (action_ot == 'watch') {
    showSection(hideAllSections, 'panel-detalle-ots');
    page_back = 'panel-agenda';
    btnBack();
  } else {
    showSection(hideAllSections, 'panel-detalle-ots');
    page_back = 'panel-correctivos';
    btnBack();
  }
}

function seePanel_detalle_oc() {
    showSection(hideAllSections, 'panel-detalle-oc');
    page_back = 'panel-materiales';
    btnBack();
}

function seePanel_finaliza_ot() {
  $('#loader').css('display', 'flex');
  var id_empleado = app.current_user.type_id;
  $.ajax({
    url: "../api/check_employee_hour.php",
    type: "GET",
    dataType: "json",
    data: { 'id_empleado': id_empleado, 'id_ot': orden_id },
    success: function(response) {
      console.log(response);
      console.log(response.last_ot.tipo);
      $('#loader').css('display', 'none');
      if (response.success == true) {
        if (response.last_ot.tipo == 'ot.0') {
          var now = moment().format('YYYY-MM-DD, HH:mm:ss');
          then = response.last_ot.fecha + ', ' +response.last_ot.hora;
          var total_time = moment.utc(moment(now,"YYYY-MM-DD, HH:mm:ss").diff(moment(then,"YYYY-MM-DD, HH:mm:ss"))).format("HH:mm:ss");
          $('#total_timeOt').html(total_time);
          showSection(hideAllSections, 'panel-finaliza-ot');
          $('.code_firma_ot, .resumen_finalOt, .conformidad, .firma').hide();
          $('.total_time_ot').show();
          page_back = 'panel-detalle-ots';
          btnBack();
        }
        else {
          console.log('Error, la OT no está abierta');
        }
      } else {
        console.log(response.error, response.sql);
        errA();
      }
    },
    error: function() {
      console.log('error ajax -> check_employee_hour.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function seePanel_steps_ots() {
  console.log(id_item);
  $('#loader').css('display', 'flex');
  getStatusItem = "";
  $.ajax({
    url: "../api/get_order.php",
    type: "GET",
    dataType: "json",
    data: { orden_id },
    success: function(response) {
      $('#loader').css('display', 'none');
      if (response.success == true) {
        getStatusItem = response.order.order_items.find(item => item.id_orden_item == id_item);

        if (getStatusItem.open == null) {

          $.ajax({
            url: "../api/new_item_gente.php",
            type: "POST",
            dataType: "json",
            data: { 'id_item': id_item, 'id_empleado': app.current_user.type_id },
            success: function(response) {
              if (response.success == true) {
                id_gente = response.id_gente;
                $.ajax({
                  url: "../api/get_item.php",
                  type: "GET",
                  dataType: "json",
                  data: { 'item_id': id_item },
                  success: function(response) {
                    if (response) {
                      $('#loader').css('display', 'none');
                      console.log(response);
                      seePanel_detalle_ots();
                      if (response.success == true) {
                        var descripcion = response.item.descripcion.substring(0, 35);
                        var data_item =  `<img src="assets/images/icon/operarios.png">
                                          <h5>Item <span class="num_item_all">`+num_item+`</span></h5>
                                          <p>`+descripcion+`... : <span>`+ response.item.cantidad + ` ` + response.item.unidad_nombre + `</span></p>
                                          <div style="display: none;"><img src="assets/images/icon/ico_several.png"></div>`;
              
                        var data_item2 =  `<h5>Item <span class="num_item_all">`+num_item+`</span></h5>
                                          <p>`+descripcion+`... : <span>`+ response.item.cantidad + ` ` + response.item.unidad_nombre + `</span></p>
                                          <div style="display: none;"><img src="assets/images/icon/ico_several.png"></div>`;
              
                        $('#panel-steps-ot .info_ots').html(data_item);
                        $('#panel-resumen-item .info_ots').html(data_item2);
                        $('#descItem').html(response.item.descripcion);
                        $('#panel-steps-ot .info_ots').off('click').on('click', function() {
                          $('#modal_descItem').modal();
                        });
                        showSection(hideAllSections, 'panel-steps-ot');
                        page_back = 'panel-detalle-ots';
                        slider_correctivos();
                        btnBack();
                      }
                    } else {
                      console.log("error response ajax -> get_item.php");
                      errA();
                    }
                  },
                  error: function() {
                    console.log('error ajax -> get_item.php');
                    $('#loader').css('display', 'none');
                    errC();
                  }
                });

              } else {
                console.log(response.error, response.sql);
                errA();
              }
            },
            error: function() {
              console.log('error ajax -> get_order.php');
              $('#loader').css('display', 'none');
              errC();
            }
          });

        } else {
          $('#modal_realiza_ot').modal('hide');
          if (getStatusItem.open.iniciado_por == app.current_user.type_id) {
            console.log('sos admin, continua con el item');
            $.ajax({
              url: "../api/get_item.php",
              type: "GET",
              dataType: "json",
              data: { 'item_id': id_item },
              success: function(response) {
                if (response) {
                  $('#loader').css('display', 'none');
                  console.log(response);
                  seePanel_detalle_ots();
                  if (response.success == true) {
                    var descripcion = response.item.descripcion.substring(0, 35);
                    var data_item =  `<img src="assets/images/icon/operarios.png">
                                      <h5>Item <span class="num_item_all">`+num_item+`</span></h5>
                                      <p>`+descripcion+`... : <span>`+ response.item.cantidad + ` ` + response.item.unidad_nombre + `</span></p>
                                      <div style="display: none;"><img src="assets/images/icon/ico_several.png"></div>`;
          
                    var data_item2 =  `<h5>Item <span class="num_item_all">`+num_item+`</span></h5>
                                      <p>`+descripcion+`... : <span>`+ response.item.cantidad + ` ` + response.item.unidad_nombre + `</span></p>
                                      <div style="display: none;"><img src="assets/images/icon/ico_several.png"></div>`;
          
                    $('#panel-steps-ot .info_ots').html(data_item);
                    $('#panel-resumen-item .info_ots').html(data_item2);
                    $('#descItem').html(response.item.descripcion);
                    $('#panel-steps-ot .info_ots').off('click').on('click', function() {
                      $('#modal_descItem').modal();
                    });
                    showSection(hideAllSections, 'panel-steps-ot');
                    page_back = 'panel-detalle-ots';
                    slider_correctivos();
                    btnBack();
                  }
                } else {
                  console.log("error response ajax -> get_item.php");
                  errA();
                }
              },
              error: function() {
                console.log('error ajax -> get_item.php');
                $('#loader').css('display', 'none');
                errC();
              }
            });
          } else {
            var tecnicos = getStatusItem.open.gente.split(';');        
            var joined = tecnicos.includes(app.current_user.type_id);
            if (joined == true) {
              $('#loader').css('display', 'none');
              console.log('ya estabas unido');
              $('#modal_joined_ot').modal();
              check_OpenItem();
            } else {
              $('#modal_inicia_ot').modal();
              $('#bt_join_item').off('click').on('click', function() {
                $('#loader').css('display', 'flex');
                $.ajax({
                  url: "../api/join_item_gente.php",
                  type: "POST",
                  dataType: "json",
                  data: { 'id_gente': getStatusItem.open.id_gente, 'id_empleado': app.current_user.type_id },
                  success: function(response) {
                    if (response.success == true) {
                      $('#loader').css('display', 'none');
                      console.log('listo, te uniste');
                      $('#modal_joined_ot').modal();
                      check_OpenItem();                        
                    } else {
                      console.log(response.error, response.sql);
                      errA();
                    }
                  },
                  error: function() {
                    console.log('error ajax -> join_item_gente.php');
                    $('#loader').css('display', 'none');
                    errC();
                  }
                });
              })
            }
          }

          $('#bt_leave_item').off('click').on('click', function() {
            $('#modal_alertLeave').modal();
            $('#bt_leave_ok').off('click').on('click', function() {
              $('#loader').css('display', 'flex');
              $.ajax({
                url: "../api/leave_item_gente.php",
                type: "POST",
                dataType: "json",
                data: { 'id_gente': id_gente, 'id_empleado': app.current_user.type_id },
                success: function(response) {
                  if (response.success == true) {
                    $('#loader').css('display', 'none');
                    console.log('abandonaste el item');                      
                  } else {
                    console.log(response.error, response.sql)
                    errA();
                  }
                },
                error: function() {
                  console.log('error ajax -> leave_item_gente.php');
                  $('#loader').css('display', 'none');
                  errC();
                }
              });
            })
            $('#bt_leave_cancel').off('click').on('click', function() {
              $('#modal_joined_ot').modal();      
            })
          })         
        }
      } else {
        console.log(response.error, response.sql)
      }
    },
    error: function() {
      console.log('error ajax -> get_order.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function check_OpenItem() {
  var interval_check = setInterval(() => {
    $.ajax({
      url: "../api/get_order.php",
      type: "GET",
      dataType: "json",
      data: { orden_id },
      success: function(response) {
        if (response.success == true) {
          getStatusItem = response.order.order_items.find(item => item.id_orden_item == id_item); 
          if (getStatusItem.item_status == '2') {
            clearInterval(interval_check);
            console.log('finalizo la ejecucion del item');
            $('#modal_joined_ot').modal('hide');
            $('#modal_itemClosed').modal();
            $('#bt_itemClosed').off('click').on('click', function() {
              showSection(hideAllSections, 'intro');
            })
          } else {
            console.log('el item esta en ejecución')
          }
        } else {
          console.log(response.error, response.sql)
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> get_order.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  }, 10000);
}

function seePanel_replanteo() {

  showName_foto('replanteo');

  showSection(hideAllSections, 'panel-replanteo');
  page_back = 'panel-detalle-ots';
  btnBack();

  $(".cancel_item").off('click');
  $(".cancel_item").on('click', function() {
    if (app.current_user.type == 1) {
      showSection(hideAllSections, 'panel-detalle-ots');
      slider_correctivos();
    } else {
      showSection(hideAllSections, 'intro-cliente');
    }
  });

  var btns = $(".btn_cot_ejc");

  btns.click(function(){
    btns.removeClass("active_bt");
    $(this).addClass("active_bt");
  });

  $('#bt_cotiza').on('click', function() {
    tipo_pedido = 'cotizar';
  })

  $('#bt_ejecuta').on('click', function() {
    tipo_pedido = 'ejecutar';
  })

  $('.bt_send_replanteo').on('click', function() {
    console.log('hola')
    $('#loader').css('display', 'flex');
    var id_empleado = app.current_user.type_id;
    $.ajax({
      url: "../api/get_order.php",
      type: "GET",
      dataType: "json",
      data: { orden_id },
      success: function(response) {
        if (response) {
          console.log(response.order.id_contacto);
          var clasificacionR = 'correctivo',
              tipoR = '';


          switch (tipo_pedido) {
            case 'ejecutar':
              tipoR = 'ot-replanteo';
              break;
            case 'cotizar':
              tipoR = 'cot-replanteo';
              break;
            default:
              tipoR = '';
              break;
          }

          var to_sendR = new FormData;
          to_sendR.append('id_cliente', response.order.id_cliente);
          to_sendR.append('id_empleado', response.order.id_empleado);
          to_sendR.append('id_locacion', response.order.id_locacion);
          to_sendR.append('id_contacto', response.order.id_contacto);
          to_sendR.append('locacion', response.order.locacion_nombre);
          to_sendR.append('clasificacion', clasificacionR);
          to_sendR.append('tipo', $('#priority_rep').val());
          to_sendR.append('prioridad', tipoR);
          to_sendR.append('descripcion', $('#tit_rep').val());
          to_sendR.append('detalle', $('#desc_rep').val());
          to_sendR.append('desde', 'app-empleado');
          to_sendR.append('cargado_por', app.current_user.id);
          // to_sendR.append('replanteo_foto', $('#replanteo_foto')[0].files[0]);
          /* replanteo fotos */
          var ins = document.getElementById('replanteo_foto').files.length;
          for (var x = 0; x < ins; x++) {
            to_sendR.append('archivos[]', document.getElementById('replanteo_foto').files[x]);
          }
          to_sendR.append('reparacion', reparacion);
          $.ajax({
            url: "../api/new_request.php",
            type: "POST",
            dataType: "json",
            data: to_sendR,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
              if (response) {
                $('#loader').css('display', 'none');
                if (response.success == true) {
                  console.log('Pedido enviado');
                  showSection(hideAllSections, 'panel-detalle-ots');
                  slider_correctivos();
                  num_replanteos = num_replanteos + 1;
                  show_numReplanteos();
                }
              } else {
                console.log("error response ajax -> new_request.php");
                alert('Error en el envio del replanteo');
                showSection(hideAllSections, 'panel-detalle-ots');
                slider_correctivos();
              }
            },
            error: function() {
              console.log('error ajax -> new_request.php');
              $('#loader').css('display', 'none');
              errC();
            }
          });
        } else {
          console.log("error response ajax get_order.php");
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> get_order.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  });
}

function show_numReplanteos() {
  if (num_replanteos > 0) {
    $('#num_replanteos').html(num_replanteos);
    $('#num_replanteos').css('display', 'flex');
  }
}

function seePanel_replanteo_sinOt() {
  $('#loader').css('display', 'flex');
  $.ajax({
    url: "../api/get_replanteos.php",
    type: "GET",
    dataType: "json",
    data: { 'id_empleado': app.current_user.type_id },
    success: function(response) {
      var data_order = '';
      if (response.success == true) {
        console.log(response);
        var importancia = '';
        var txt_importancia = '';
        var pendiente = '';
        var back_ot = '';
        var class_eject = '';
        var status_esp = '';
        for (var i = 0; i < response.orders.length; i++) {

        if (response.orders[i].order_item_pendings == true) {
            pendiente = '<div class="item_pendiente"></div>';
        } else {
            pendiente = '';
        }

        if (response.orders[i].locacion_nombre == null) {
            response.orders[i].locacion_nombre = response.orders[i].direccion;
        }

        if (response.orders[i].locacion_direccion == null) {
            response.orders[i].locacion_direccion = response.orders[i].direccion;
        }

        if (response.orders[i].order_items > 0 && response.orders[i].order_items == response.orders[i].order_items_finished) {
            back_ot = '#e7e7e7';
            txt_importancia = 'Ejecutada';
            class_eject = 'ot_ejecutada';
        } else {
            back_ot = '#fff';
            class_eject = 'div_ot_pedido';
            switch (response.orders[i].tipo) {
            case 'normal':
                importancia = '92d050';
                txt_importancia = 'Normal';
                break;
            case 'media':
                importancia = 'FFFF00';
                txt_importancia = 'Media';
                break;
            case 'alta':
                importancia = 'ff0000';
                txt_importancia = 'Alta';
                break;
            case 'critica':
                importancia = '7030A0';
                txt_importancia = 'Critica';
                break;
            default:
                importancia = '92d050';
                txt_importancia = '';
                break;
            }
        }

        if (type_otc == 'ot-espontaneo' && response.orders[i].apro_cliente == 'f') {
          status_esp = '<i style="color: #dc0000;" class="fas fa-check-circle esp_status"></i>';
        } else if (type_otc == 'ot-espontaneo' && response.orders[i].apro_cliente == 't'){
          status_esp = '<i style="color: green;" class="fas fa-check-circle esp_status"></i>';
        } else {
          status_esp = '';
        }

        var date_rep = response.orders[i].fecha.split(' ');
        date_rep[1];
        var time_rep_all = date_rep[1].split(':');
        var time_rep = time_rep_all[0] + ':' + time_rep_all[1] + ' hs';



        data_order +=  `<div style="background: ${back_ot}" class="single_espon" id="`+ response.orders[i].id_orden +`">
                            <p id="empresa_ot">`+ response.orders[i].razon_social +`</p>
                            <p id="lugar_ot">`+ response.orders[i].locacion_nombre +`</p>
                            
                            <p class="text_resaltado">`+ response.orders[i].descripcion +`</p>
                            <p id="cod_ot">OT `+ response.orders[i].id_ot +`</p>
                            <div class="caja_status">
                                <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                                <div style="background: #${importancia};" class="iportancia_ot"></div>
                                ${pendiente}
                            </div>
                            <span id="date_otClient">${time_rep}</span>
                            ${status_esp}
                            
                        </div>`;
        $('.main-listReplanteos').html(data_order);
        }

        $('#loader').css('display', 'none');
        seePanel_listReplanteos();
      } else {
        $('#loader').css('display', 'none');
        data_order +=  `<p class="cero_espontaneos">No hay replanteos para mostrar.</p>`;
        $('.main-listReplanteos').html(data_order);
        seePanel_listReplanteos();
      }
    },
    error: function() {
      console.log('error ajax -> get_espontaneos.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function seePanel_espontaneos() {
  $('#loader').css('display', 'flex');
  $.ajax({
    url: "../api/get_espontaneos.php",
    type: "GET",
    dataType: "json",
    data: { 'id_empleado': app.current_user.type_id },
    success: function(response) {
      console.log(response);
      var data_order = '';
      if (response.success == true) {
        console.log(response);
        var importancia = '';
        var txt_importancia = '';
        var pendiente = '';
        var back_ot = '';
        var class_eject = '';
        var status_esp = '';
        for (var i = 0; i < response.orders.length; i++) {

        if (response.orders[i].order_item_pendings == true) {
            pendiente = '<div class="item_pendiente"></div>';
        } else {
            pendiente = '';
        }

        if (response.orders[i].locacion_nombre == null) {
            response.orders[i].locacion_nombre = response.orders[i].direccion;
        }

        if (response.orders[i].locacion_direccion == null) {
            response.orders[i].locacion_direccion = response.orders[i].direccion;
        }

        if (response.orders[i].order_items > 0 && response.orders[i].order_items == response.orders[i].order_items_finished) {
            back_ot = '#e7e7e7';
            txt_importancia = 'Ejecutada';
            class_eject = 'ot_ejecutada';
        } else {
            back_ot = '#fff';
            class_eject = 'div_ot_pedido';
            switch (response.orders[i].tipo) {
            case 'normal':
                importancia = '92d050';
                txt_importancia = 'Normal';
                break;
            case 'media':
                importancia = 'FFFF00';
                txt_importancia = 'Media';
                break;
            case 'alta':
                importancia = 'ff0000';
                txt_importancia = 'Alta';
                break;
            case 'critica':
                importancia = '7030A0';
                txt_importancia = 'Critica';
                break;
            default:
                importancia = '92d050';
                txt_importancia = '';
                break;
            }
        }

        if (type_otc == 'ot-espontaneo' && response.orders[i].apro_cliente == 'f') {
          status_esp = '<i style="color: #dc0000;" class="fas fa-check-circle esp_status"></i>';
        } else if (type_otc == 'ot-espontaneo' && response.orders[i].apro_cliente == 't'){
          status_esp = '<i style="color: green;" class="fas fa-check-circle esp_status"></i>';
        } else {
          status_esp = '';
        }

        data_order +=  `<div style="background: ${back_ot}" class="single_espon" id="`+ response.orders[i].id_orden +`">
                            <p id="empresa_ot">`+ response.orders[i].razon_social +`</p>
                            <p id="lugar_ot">`+ response.orders[i].locacion_nombre +`</p>
                            
                            <p class="text_resaltado">`+ response.orders[i].descripcion +`</p>
                            <p id="cod_ot">OT `+ response.orders[i].id_ot +`</p>
                            <div class="caja_status">
                                <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                                <div style="background: #${importancia};" class="iportancia_ot"></div>
                                ${pendiente}
                            </div>
                            <span id="date_otClient">${response.orders[i].fecha}</span>
                            ${status_esp}
                            
                        </div>`;
        $('.main-listEspontaneo').html(data_order);
        }

        $('#loader').css('display', 'none');
        seePanel_listEspontaneos();
      } else {
        $('#loader').css('display', 'none');
        data_order +=  `<p class="cero_espontaneos">No hay espontaneos para mostrar.</p>`;
        $('.main-listEspontaneo').html(data_order);
        seePanel_listEspontaneos();
      }
    },
    error: function() {
      console.log('error ajax -> get_espontaneos.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function seePanel_resumen_item() {
  showSection(hideAllSections, 'panel-resumen-item');
  page_back = 'panel-steps-ot';
  btnBack();
  edit_paso();

}

function goHoja_de_ruta() {
  // $('#link_movilidad').on('click', function(){
  //   seeMovilidad();
  // });
  // $('#link_hoja').on('click', function(){
  //   seeHojaDeRuta();
  // });
}

function btnBack() {
  if (page_back != '') {
    $("#btn_menu").hide();
    $("#back-intro").show();

    $("#back-intro").off('click');
    $("#back-intro").on('click', function() {
      if (page_back == 'panel-servicios') {
        showSection(hideAllSections, 'panel-servicios');
        page_back = 'panel-ots';
        btnBack()
      } else {
        showSection(hideAllSections, page_back);
        $("#btn_menu").show();
        $("#back-intro").hide();
      }
    });
  }
}

function choose_expense() {
    $(".bt_gasto").click(function() {
        var id = $(this).attr("data-expense");
        var id_text = id.charAt(0).toUpperCase() + id.slice(1);
        $(".main_expenses .tipo_gasto").text(id_text);
        $("#name_type_expense").text(id_text);
        $(".cat_selected img").attr("src","assets/images/icon/ico_" + id + ".png");
    });
}

function date_today() {
  var day = moment().locale('es').format('dddd');
  var day = day.charAt(0).toUpperCase() + day.slice(1);
  var today = moment().locale('es').format('L');
  $(".date_today").text(day + ' ' + today);
}

function popover() {
  $('.pendiente').popover({
    trigger: 'focus'
  })
}

function add_comprobante() {
  $('.add_comprobante').click( function() {
    $('#modal_add_comprobante').modal();
  })
}

function dropdowns() {
  $('.dropdown-toggle').dropdown()
}

function openList() {
  var list_opmh = $('.list_panels, #filterOt_menu, #filterPres_menu');
  if (list_open == false) {
      list_opmh.removeClass("close_list").addClass("open_list");
      list_open = true;
  } else {
      list_opmh.removeClass("open_list").addClass("close_list");
      list_open = false;
  }
}

function openList2() {
  var list_opmh2 = $('.list_panels2');
  if (list_open_rubro == false) {
      list_opmh2.removeClass("close_list").addClass("open_list2");
      list_open_rubro = true;
  } else {
      list_opmh2.removeClass("open_list2").addClass("close_list");
      list_open_rubro = false;
  }
}

function busca_ot_materiales() {
  $('.item_meteriales').click( function() {
    $('#modal_busca_ot').modal();
    $('.list_panels').removeClass("open_list").addClass("close_list");

  })
}

function pedido_materiales() {
    var step = paso1;

    switch (step) {
      case paso1:

        break;

      default:
        break;
    }
}

function get_items() {
  $('#loader').css('display', 'flex');
  console.log(orden_id);
  $.ajax({
    url: "../api/get_order.php",
    type: "GET",
    dataType: "json",
    data: { orden_id },
    success: function(response) {
      console.log(response);
      if (response) {
        id_clientSign = response.order.id_cliente;
        var importancia = '';
        var pendiente = '';
        var txt_importancia = '';
        switch (response.order.tipo) {
          case 'normal':
            importancia = '92d050';
            txt_importancia = 'Normal';
            break;
          case 'media':
            importancia = 'FFFF00';
            txt_importancia = 'Media';
            break;
          case 'alta':
            importancia = 'ff0000';
            txt_importancia = 'Alta';
            break;
          case 'critica':
            importancia = '7030A0';
            txt_importancia = 'Critica';
            break;
          default:
            importancia = '92d050';
            break;
        }
        if (response.order.order_item_pendings == true) {
          pendiente = '<div class="item_pendiente"></div>';
        } else {
          pendiente = '';
        }
        if (response.order.locacion_nombre == null) {
          response.order.locacion_nombre = '';
        }
        if (response.order.locacion_direccion == null) {
          response.order.locacion_direccion = response.order.direccion;
        }

        var data_order = `<img src="assets/images/icon/operarios.png" alt="">
                          <p id="empresa_ot">`+ response.order.razon_social +`</p>
                          <p class="cod-ots">OT `+ response.order.id_ot +`</p>
                          <p>`+ response.order.locacion_nombre +`</p>
                          <p class="cod-ots">`+ response.order.descripcion +`</p>
                          <p class="type_duration"><span id="duration_job">`+Ttime_Ot+`hs.</span><br><span id="type_job">${turno_tipo}</span></p>
                          <div class="descripcion_ot"><i class="far fa-comment-alt"></i></div>
                          <div class="caja_status">
                              <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                              <div style="background: #${importancia};" class="iportancia_ot"></div>
                              ${pendiente}
                          </div>`;

        var data_orderRes =  `<img src="assets/images/icon/operarios.png" alt="">
                              <p id="empresa_ot">`+ response.order.razon_social +`</p>
                              <p class="cod-ots">OT `+ response.order.id_ot +`</p>
                              <p>`+ response.order.locacion_nombre +`</p>`;
                              // <p class="text_resaltado" id="desc_ot">`+ response.order.locacion_direccion +`</p>`;

        var data_orderRep =  `<img src="assets/images/icon/operarios.png" alt="">
                              <h5>`+ response.order.razon_social +`</h5>
                              <p>`+ response.order.locacion_nombre +`</p>`;

        $('.ot_code').html('OT '+ response.order.id_ot);
        $('.main_info_ots').html(data_order);
        $('.main_info_ots_resumen').html(data_orderRes);
        $('.info_ots').html(data_orderRep);
        modal_infoPedido(response.order.descripcion, response.order.detalle);

        if (action_ot == 'watch') {
          $('.div_mat_button').css('display', 'none');
          carga_manualAgenda();
        } else {
          $('.div_mat_button').css('display', 'none');
        }

        if ((response.order.order_items.length > 0 && response.order.order_items.length == response.order.order_items_finished && estado_ot == 'closed') || action_ot == 'watch') {
          $('.fix_button').css('display', 'none');
        } else if (response.order.order_items.length > 0 && response.order.order_items.length != response.order.order_items_finished && estado_ot == 'open') {
          $('.fix_button').css('display', 'flex');
        } else {
          $('.fix_button').css('display', 'flex');
        }

        orden_id = response.order.id_orden;
        $.ajax({
          url: "../api/get_items.php",
          type: "GET",
          dataType: "json",
          data: { orden_id },
          success: function(response) {
            if (response) {
              console.log(response);
              if (response.success == true) {
                $('.all_items').html("");
                var data_item = '',
                    iPendiente = '',
                    finished = '',
                    class_pendiente = '',
                    tit_item = '',
                    class_action = 'item_ots',
                    data_rubro = '',
                    archivos = '';
                for (var i = 0; i < response.items.length; i++) {
                  var index_item = response.items.map(function(e) { return e.id_orden_item; }).indexOf(response.items[i].item_from);
                  if (response.items[i].item_status == 3) {
                    class_action = 'item_ots';
                    finished = '';
                    iPendiente = '<div class="item_pendiente"></div>';
                    class_pendiente = 'class_pendiente';
                    tit_item = 'Pendiente de item ' + (index_item + 1);
                  } else if (response.items[i].item_status == 2) {
                    class_action = 'item_otsFin';
                    class_pendiente = '';
                    iPendiente = '';
                    if (response.items[i].items_pendings > 0 && !(response.items[i].item_from > 0)) {
                      finished = '<img class="item_finished" src="assets/images/icon/alert.png">';
                      tit_item = 'Item '+ (i + 1);
                    } else if (response.items[i].items_pendings == 0 && response.items[i].item_from > 0){
                      finished = '<img class="item_finished" src="assets/images/img/tilde.png">';
                      tit_item = 'Pendiente de item ' + (index_item + 1);
                      class_pendiente = 'class_pendiente';
                      iPendiente = '<div class="item_pendiente"></div>';
                    } else if (response.items[i].items_pendings == 0 && !(response.items[i].item_from > 0)){
                      finished = '<img class="item_finished" src="assets/images/img/tilde.png">';
                      tit_item = 'Item '+ (i + 1);
                    }
                  } else {
                    finished = '';
                    iPendiente = '';
                    class_pendiente = '';
                    class_action = 'item_ots';
                    finished = '';
                    tit_item = 'Item '+ (i + 1);
                  }

                  if (action_ot == 'watch') {
                    class_action = 'item_watch';
                  }

                  if (response.items[i].rubro_name != null) {
                    data_rubro = `<span class="">${response.items[i].rubro_name.replace(/\b\w/g, l => l.toUpperCase())}</span>`;
                  } else {
                    data_rubro = '';
                  }

                  if ((response.items[i].archivos == null) || (response.items[i].archivos == '')) {
                    archivos = '';
                  } else {
                    archivos = `<img style="height: 27px; margin-right: 5px;" src="assets/images/icon/cam_ico_ots.png" class="photos_item" data-photos="${response.items[i].archivos}">`;
                  }

                  data_item +=  `<div style="position: relative">
                                    <div class="${class_action} `+class_pendiente+`" id_item="`+ response.items[i].id_orden_item +`" num_item="`+(i + 1)+`">
                                      <h5>`+tit_item+` <span id="img_several"></span></h5>
                                      ${data_rubro}
                                      <p>`+ response.items[i].descripcion +`</p>
                                    </div>
                                    <div class="caja_status_item">
                                      ${archivos}
                                      ${iPendiente}
                                      ${finished}
                                    </div>
                                  </div>`;

                  $('.all_items').html(data_item);
                  // if (response.items[i].item_status == 3) {
                  //   $('.item_ots p').css('color', '#00B0F0');
                  // }
                }
                var img = '';
                $('.photos_item').on('click', function() {
                  var src = $(this).attr('data-photos'),
                    caption = "Fotos item",
                    imgs = [];
                    src = src.split('>>');

                  src.forEach(function(photo, index) {
                    img = {
                      src: photo,
                      opts: {
                        caption: caption,
                      },
                    };
                    imgs.push(img);
                  });

                  $.fancybox.open(imgs, {loop : false});
                })
                $('#loader').css('display', 'none');
                seePanel_detalle_ots();
                open_modals();
              } else {
                var data_item =  `<p class="message_error">No hay items en ésta Orden de trabajo.</p>`;
                $('.all_items').html(data_item);
                $('#loader').css('display', 'none');
                seePanel_detalle_ots();
                open_modals();
              }
            } else {
              console.log("error response ajax -> get_items.php");
              errA();
            }
          },
          error: function() {
            console.log('error ajax -> get_items.php');
            $('#loader').css('display', 'none');
            errC();
          }
        });
      } else {
        console.log("error response ajax get_items.php");
        errA();
      }
    },
    error: function(jqXHR, textStatus, error) {
      console.log(jqXHR + "-" + textStatus + "-" + error);
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function modal_infoPedido(titulo, descripcion) {
  $('.descripcion_ot').off('click');
  $('.descripcion_ot').on('click', function() {
    $('.titulo_pedido').html(titulo);
    $('.descripcion_pedido').html(descripcion);
    $('#modal_detalleOt').modal();
  });
}

function process_startOt() {
  $('#modal_realiza_ot').modal();
  $('.bt_inicia_ot').off('click');
  $('.bt_inicia_ot').click(function() {
    if ($('#clave_openItem').val() == app.current_user.clave) {
      $('#loader').css('display', 'flex');
      getLocation()
      .then(function(position) {
        coordenadas = position.coords.latitude+', '+position.coords.longitude;
        var id_empleado = app.current_user.type_id,
            tipo = "ot.0";
        // save to db
        $.ajax({
          url: "../api/save_employee_hour.php",
          type: "POST",
          dataType: "json",
          data: {'id_empleado': id_empleado, 'tipo': tipo, 'tipo_id': orden_id, 'coordenadas': coordenadas },
          success: function(response) {
            if (response.success) {
              console.log('Se inició la OT');
              $('#loader').css('display', 'none');
              $('#modal_realiza_ot').modal('hide');
              $('#status_ot').html('Cerrar');
              $('.bt_in_replanteo').css('display', 'flex');
              estado_ot = 'open';
              if (inicio == 'item') {
                seePanel_steps_ots();
              } else {

              }
            } else {
              console.log(response.error, response.sql)
              errA();
            }
          },
          error: function() {
            console.log('error ajax -> save_employee_hour.php -> status ot');
            $('#loader').css('display', 'none');
            errC();
          }
        });
      });
    } else {
      $('.erroM_openItem').html('ingresá una clave válida.');
    }
  });
}

function open_modals() {
  $('.bt_car').click( function() {
    $('#modal_get_car').modal();
  })
  var status_ot = $('#status_ot');

  $('.realiza_ots').off('click');
  $('.realiza_ots').on('click', function() {
    $('#loader').css('display', 'flex');
    var id_empleado = app.current_user.type_id;
    $.ajax({
      url: "../api/check_employee_hour.php",
      type: "GET",
      dataType: "json",
      data: { id_empleado },
      success: function(response) {
        $('#loader').css('display', 'none');
        if (response.success == true) {
          // is open? -> set
          if (response.last_day.tipo == 'd.0') {
            inicio = 'boton';
            $('.erroM_openItem').html('');
            if (estado_ot == 'closed') {
              process_startOt();
            } else {
              $('.erroM_closeItem').html('');
              $('#modal_finaliza_ot').modal();
              $('.bt_end_ot').on('click', function() {
                if ($('#clave_closeItem').val() == app.current_user.clave) {
                  $('#modal_finaliza_ot').modal('hide');
                  seePanel_finaliza_ot();
                } else {
                  $('.erroM_closeItem').html('ingresá una clave válida.');
                }

              });
            }
          } else {
            $('#modal_errorJornada').modal();
            $('#bt_goComenzar').on('click');
            $('#bt_goComenzar').on('click', function() {
              into_agenda();
            });
          }
        } else {
          console.log(response.error, response.sql)
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> check_employee_hour.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  })

  $('.item_ots').off('click').on('click', function() {
    order_item_materials = []; //vacia
    num_item = $(this).attr('num_item');
    id_item = $(this).attr('id_item');
    $('#loader').css('display', 'flex');
    var id_empleado = app.current_user.type_id;
    $.ajax({
      url: "../api/check_employee_hour.php",
      type: "GET",
      dataType: "json",
      data: { id_empleado },
      success: function(response) {
        $('#loader').css('display', 'none');
        if (response.success == true) {
          // is open? -> set
          if (response.last_day.tipo == 'd.0') {
            $('.material-cant').val('');
            $('.field_item').val('');
            $('#clave_openItem').val('');
            $('.erroM_openItem').html('');
            console.log(num_item, id_item);
            $('.num_item_all').html(num_item);
            console.log('la OT está ' + estado_ot);
            inicio = 'item';
            if (estado_ot == 'closed') {
              process_startOt();
            } else {
              seePanel_steps_ots();
            }

            $(".bar_action_ot").html(
              "<div class='div_bar_action_ot btn_action_ot0'>" +
                  "<i class='fas fa-chevron-left'></i>" +
                  "<span>AVERIA</span>" +
              "</div>"+
              "<div class='div_steps_ot'>" +
                  "<div style='background: #fd5e13;' id='step_ot1'></div>" +
                  "<div id='step2'></div>" +
                  "<div id='step3'></div>" +
                  "<div id='step4'></div>" +
              "</div>"
            )
          } else {
            $('#modal_errorJornada').modal();
            $('#bt_goComenzar').off('click');
            $('#bt_goComenzar').on('click', function() {
              into_agenda();
            });
          }
        } else {
          console.log(response.error, response.sql);
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> check_employee_hour.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  })

  $('.item_otsFin').off('click');
  $('.item_otsFin').click(function() {
    $('#modal_itemFinalizado').modal();
    // console.log($(this).attr('id_item'));
    // $.ajax({
    //   url: "../api/get_order.php",
    //   type: "GET",
    //   dataType: "json",
    //   data: { orden_id },
    //   success: function(response) {
    //     if (response) {
    //       console.log(response.order.order_items);
    //     } else {
    //       console.log(response.error, response.sql);
    //     }
    //   },
    //   error: function() {
    //     console.log('error ajax -> get_order.php resumen del item');
    //   }
    // });
  });
}

function choose_data_car() {
  $(".bt_info_car").click(function() {
      var data_car = $(this).attr("data-car");
      $.ajax({
        url: "server/http_request/info-car.php",
        type: "POST",
        dataType: "json",
        data: { data_car },
        success: function(response) {
          if (response) {

            console.log("llego el ajax y todo bien");
            $('.cat_info_car').html(response.content);
            choose_subdata_car();

          } else {
            console.log("llego el ajax y todo mal");
          }
        },
        error: function(jqXHR, textStatus, error) {
          console.log(jqXHR + "-" + textStatus + "-" + error);
          $('#loader').css('display', 'none');
          errC();
        }
      });
  });
}

function choose_subdata_car() {
  $(".bt_option_info").click(function() {
      $.ajax({
        url: "server/http_request/subinfo-car.php",
        type: "POST",
        dataType: "json",
        success: function(response) {
          if (response) {
            $('.main-info-car').html(response.content);

            $('#back-intro').click(function () {
              $('.main-info-car').html('');
            })

          } else {
            console.log("variable response error");
          }
        },
        error: function(jqXHR, textStatus, error) {
          console.log(jqXHR + "-" + textStatus + "-" + error);
          $('#loader').css('display', 'none');
          errC();
        }
      });
  });
}

function slider_materiales() {
  var mySwiper = new Swiper ('.swiper-container', {
    setWrapperSize: true,
    allowSlideNext: false
  });


  var index_slide = mySwiper.activeIndex;

  $(".btn_type_stock, #bt_go_res_mater").click(function() {
    mySwiper.allowSlideNext = true;
    mySwiper.slideNext();
  });

  var select_cant = '<select name="">'+
                      '<option value=""></option>' +
                      '<option value="1">1</option>'+
                      '<option value="2">2</option>'+
                      '<option value="3">3</option>'+
                      '<option value="4">4</option>'+
                      '<option value="5">5</option>'+
                    '</select>';

  var select_unid = '<select name="">'+
                      '<option value=""></option>'+
                      '<option value="1">kg.</option>'+
                      '<option value="2">lts.</option>'+
                      '<option value="3">U.</option>'+
                      '<option value="4">ml.</option>'+
                    '</select>';


  $(".btn_type_stock").click(function() {
    $('.select_cant').html(select_cant);
    $('.select_unid').html(select_unid);
  });

  $(".cancel_item, #fin_load_material").click(function() {
    showSection(hideAllSections, 'panel-materiales');
  });

  mySwiper.on('slideChange', function () {

    index_slide = mySwiper.activeIndex;
    mySwiper.allowSlideNext = false;

    switch (index_slide) {
      case 0:
        $(".bar_action").html(
          "<div class='div_bar_action btn_action0'>" +
              "<i class='fas fa-caret-down'></i>" +
              "<span>RUBRO</span>" +
          "</div>"+
          "<div class='div_steps'>" +
              "<div style='background: #fd5e13;' id='step1'></div>" +
              "<div id='step2'></div>" +
              "<div id='step3'></div>" +
          "</div>"
        );
        mySwiper.allowSlideNext = false;
        break;

      case 1:
        $(".bar_action").html(
          "<div class='div_bar_action btn_action1'>" +
              "<i class='fas fa-caret-down'></i>" +
              "<span>MATERIAL</span>" +
          "</div>"+
          "<div class='div_steps'>" +
              "<div style='background: #fd5e13;' id='step1'></div>" +
              "<div style='background: #fd5e13;' id='step2'></div>" +
              "<div id='step3'></div>" +
          "</div>"
        );
        mySwiper.allowSlideNext = false;
        break;

      case 2:
        $(".bar_action").html(
          "<div class='div_bar_action btn_action2'>" +
              "<i class='fas fa-caret-down'></i>" +
              "<span>RESUMEN</span>" +
          "</div>"+
          "<div class='div_steps'>" +
              "<div style='background: #fd5e13;' id='step1'></div>" +
              "<div style='background: #fd5e13;' id='step2'></div>" +
              "<div style='background: #fd5e13;' id='step3'></div>" +
          "</div>"
        );
        mySwiper.allowSlideNext = false;
        break;

      default:
        break;
    }

  });

}

function slider_stock_transito() {
  var mySwiper_stock = new Swiper ('.swiper-container-stock', {
    setWrapperSize: true,
    allowSlideNext: false
  });


  var index_slide = mySwiper_stock.activeIndex;

  $(".btn_type_stock_tran, #bt_go_res_stock").click(function() {
    mySwiper_stock.allowSlideNext = true;
    mySwiper_stock.slideNext();
  });

  var select_cant = '<select name="">'+
                      '<option value=""></option>' +
                      '<option value="1">1 lts</option>'+
                      '<option value="2">2 lts</option>'+
                      '<option value="3">3 lts</option>'+
                      '<option value="4">4 lts</option>'+
                      '<option value="5">5 lts</option>'+
                    '</select>';

  $('.select_cant').html(select_cant);

  $(".cancel_item, #fin_load_material_stock").click(function() {
    showSection(hideAllSections, 'panel-materiales');

    $(".bar_action_stock").html(
      "<div class='div_bar_action btn_action0'>" +
          "<i class='fas fa-caret-down'></i>" +
          "<span>RUBRO</span>" +
      "</div>"+
      "<div class='div_steps'>" +
          "<div style='background: #fd5e13;' id='step1_stock'></div>" +
          "<div id='step2_stock'></div>" +
          "<div id='step3_stock'></div>" +
      "</div>"
    );
  });

  mySwiper_stock.on('slideChange', function () {

    index_slide = mySwiper_stock.activeIndex;
    mySwiper_stock.allowSlideNext = false;

    switch (index_slide) {
      case 0:
        $(".bar_action_stock").html(
          "<div class='div_bar_action btn_action0'>" +
              "<i class='fas fa-caret-down'></i>" +
              "<span>RUBRO</span>" +
          "</div>"+
          "<div class='div_steps'>" +
              "<div style='background: #fd5e13;' id='step1_stock'></div>" +
              "<div id='step2_stock'></div>" +
              "<div id='step3_stock'></div>" +
          "</div>"
        );
        mySwiper_stock.allowSlideNext = false;
        break;

      case 1:
        $(".bar_action_stock").html(
          "<div class='div_bar_action btn_action1'>" +
              "<i class='fas fa-caret-down'></i>" +
              "<span>MATERIAL</span>" +
          "</div>"+
          "<div class='div_steps'>" +
              "<div style='background: #fd5e13;' id='step1_stock'></div>" +
              "<div style='background: #fd5e13;' id='step2_stock'></div>" +
              "<div id='step3_stock'></div>" +
          "</div>"
        );
        mySwiper_stock.allowSlideNext = false;
        break;

      case 2:
        $(".bar_action_stock").html(
          "<div class='div_bar_action btn_action2'>" +
              "<i class='fas fa-caret-down'></i>" +
              "<span>RESUMEN</span>" +
          "</div>"+
          "<div class='div_steps'>" +
              "<div style='background: #fd5e13;' id='step1_stock'></div>" +
              "<div style='background: #fd5e13;' id='step2_stock'></div>" +
              "<div style='background: #fd5e13;' id='step3_stock'></div>" +
          "</div>"
        );
        mySwiper_stock.allowSlideNext = false;
        break;

      default:
        break;
    }

  });

}

function slider_correctivos() {

  var mySwiper = new Swiper ('.swiper-container2', {
    setWrapperSize: true,
    allowSlideNext: false
  });

  function back_slide() {
    $('.back_slide').click(function() {
      mySwiper.slidePrev();
    })
  }

  $("#bt_go_reparacion").click(function() {
    averia = $('#txt_averia').val();
    mySwiper.allowSlideNext = true;
    mySwiper.slideNext();
    console.log(document.getElementById('averia_foto').files);
  });

  showName_foto('averia');
  showName_foto('reparacion');
  showName_foto('notes');
  showName_foto('material');

  // $('.open_img_modal').off('click');
  // $('.open_img_modal').click(function() {
  //   var data_section = $(this).attr('data_section');
  //   var el_section = `#foto_${data_section}S`;
  //   $('#modal_section').html(data_section);
  //   $('.foto_section').hide();
  //   $(el_section).show();
  //   $('#modal_image').modal();
  // })

  // completa reparaación, pasa a materiales
  $('#bt_go_materiales').off('click');
  $("#bt_go_materiales").click(function() {
    reparacion = $('#txt_reparacion').val();
    mySwiper.allowSlideNext = true;
    mySwiper.slideNext();
    sub_slider();
  });

  $('#bt_go_notas').off('click');
  $("#bt_go_notas").click(function() {
    mySwiper.allowSlideNext = true;
    mySwiper.slideNext();
  });
  // completa materiales, pasa a notas
  $('#btn_fin_mater').off('click');
  $("#btn_fin_mater").click(function() {
    mySwiper.allowSlideNext = true;
    mySwiper.slideNext();
  });
  $('.bt_go_resumen').off('click');
  $('.bt_go_resumen').click(function() {
    notes = $('#txt_notes').val();
    $('#desc_averia').html(averia);
    $('#desc_reparacion').html(reparacion);
    $('#desc_notes').html(notes);
    seePanel_resumen_item();

    $('.open_img_modal').on('click', function() {
      var img = '';
      var src = $(this).attr('data-photos'),
          sec = $(this).attr('data_section'),
          caption = "Fotos "+ sec + " item",
          imgs = [];
      src = src.split('>>');

      src.forEach(function(photo, index) {
        img = {
          src: photo,
          opts: {
            caption: caption,
          },
        };
        imgs.push(img);
      });

      $.fancybox.open(imgs, {loop : false});
    })
  });

  $("#btn_fin_item").off('click');
  $("#btn_fin_item").click(function() {
    $('#loader').css('display', 'flex');
    var tipo = 'it.1';
    var id_empleado = app.current_user.type_id;
    $.ajax({
      url: "../api/get_order.php",
      type: "GET",
      dataType: "json",
      data: { orden_id },
      success: function(response) {
        if (response.success == true) {
          getStatusItem = response.order.order_items.find(item => item.id_orden_item == id_item);
          console.log(getStatusItem);
          $.ajax({
            url: "../api/save_employee_hour.php",
            type: "POST",
            dataType: "json",
            data: {'id_empleado': id_empleado, 'tipo': tipo, 'tipo_id': id_item, 'coordenadas': coordenadas },
            success: function(response) {
              if (response.success) {
                // prepare form data to send
                var to_send = new FormData;
                to_send.append('id_empleado', app.current_user.type_id);
                to_send.append('id_orden', orden_id);
                to_send.append('id_item', id_item);
                to_send.append('averia', averia);
                /* averia fotos */
                var ins = document.getElementById('averia_foto').files.length;
                for (var x = 0; x < ins; x++) {
                  to_send.append('averia_foto[]', document.getElementById('averia_foto').files[x]);
                  // to_send.append('averia_foto[]', $('#averia_foto')[0].files[0]);
                }
                to_send.append('reparacion', reparacion);
                /* reparacion fotos */
                var ins = document.getElementById('reparacion_foto').files.length;
                for (var x = 0; x < ins; x++) {
                  to_send.append('reparacion_foto[]', document.getElementById('reparacion_foto').files[x]);
                  // to_send.append('reparacion_foto[]', $('#reparacion_foto')[0].files[0]);
                }
                to_send.append('notas', notes);
                /* notas fotos */
                var ins = document.getElementById('notes_foto').files.length;
                for (var x = 0; x < ins; x++) {
                  to_send.append('notas_foto[]', document.getElementById('notes_foto').files[x]);
                  // to_send.append('notas_foto[]', $('#notas_foto')[0].files[0]);
                }
                to_send.append('materiales', JSON.stringify(order_item_materials));
                order_item_materials.forEach(function(material, index) {
                  if (material.photo) {
                    to_send.append('materiales_ids[]', index);
                    to_send.append('materiales_fotos[]', material.photo);
                  }
                });
                to_send.append('id_gente', id_gente);
                // to_send.append('photo_material', document.getElementById('material_foto').files);

                $.ajax({
                  url: "../api/exec_item.php",
                  type: "POST",
                  dataType: "json",
                  data: to_send,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success: function(response) {
                    if (response) {
                      console.log(response);
                      seePanel_detalle_ots();
                      if (response.success == true) {
                        console.log('successful upload');
                        action_ot = 'eject';
                        $.ajax({
                          url: "../api/close_item_gente.php",
                          type: "POST",
                          dataType: "json",
                          data: { 'id_gente': getStatusItem.open.id_gente, 'id_empleado': app.current_user.type_id },
                          success: function(response) {
                            if (response) {
                              $('#loader').css('display', 'none');
                              console.log('se cerro la sala del item')
                              get_items();
                              showSection(hideAllSections, 'panel-detalle-ots');
                              slider_correctivos();
                            } else {
                              console.log("error response ajax -> close_item_gente.php");
                              $('#loader').css('display', 'none');
                              errP('Error al cerrar la sesión del item (1).');
                            }
                          },
                          error: function() {
                            console.log('error ajax -> exec_item.php');
                            $('#loader').css('display', 'none');
                            errP('Error al cerrar la sesión del item (2).');
                          }
                        });                
                      } else {
                        $('#loader').css('display', 'none');
                        errP('Error al completar ejecución del item (1).');
                        console.log(response.error, response.sql);
                      }
                    } else {
                      $('#loader').css('display', 'none');
                      errP('Error al completar ejecución del item (2).');
                      console.log("error response ajax -> exec_item.php");
                    }
                  },
                  error: function() {
                    console.log('error ajax -> exec_item.php');
                    $('#loader').css('display', 'none');
                    errP('Error al completar ejecución del item (3).');
                  }
                });
              } else {
                console.log(response.error, response.sql);
                $('#loader').css('display', 'none');
                errP('Error al guardar ubicacion del empleado (1).');
              }
            },
            error: function() {
              console.log('error ajax -> save_employee_hour.php -> status ot');
              $('#loader').css('display', 'none');
              errP('Error al completar ejecución del item (2).');
            }
          });

        } else {
          console.log(response.error, response.sql);
          $('#loader').css('display', 'none');
          errP('Error al obtener datos de la OT (1).');
        }
      },
      error: function() {
        console.log('error ajax -> get_order.php');
        $('#loader').css('display', 'none');
        errP('Error al obtener datos de la OT (2).');
      }
    });

  });

  $(".leave_item").off('click').on('click', function() {
    $('#modal_alertLeaveStep').modal();
    $('#bt_leave_ok_step').off('click').on('click', function() {
      $('#loader').css('display', 'flex');
      var id_leaveGente = '';
      if (id_gente == '') {
        id_leaveGente = getStatusItem.open.id_gente;
      } else {
        id_leaveGente = id_gente;
      }
      $.ajax({
        url: "../api/leave_item_gente.php",
        type: "POST",
        dataType: "json",
        data: { 'id_gente': id_leaveGente, 'id_empleado': app.current_user.type_id },
        success: function(response) {
          if (response.success == true) {
            $('#loader').css('display', 'none');
            console.log('cancelaste el item');
            showSection(hideAllSections, 'panel-detalle-ots');
            slider_correctivos();                 
          } else {
            console.log(response.error, response.sql)
          }
        },
        error: function() {
          console.log('error ajax -> leave_item_gente.php');
          $('#loader').css('display', 'none');
          errC();
        }
      });        
    })
  });

  $(".bar_pendiente").off('click');
  $('.bar_pendiente').click(function() {
    $('.main_info_ots_resumen').hide();
    $('#panel-resumen-item .info_ots').hide();
    // $('#modal_main_pendiente').modal();
    $('.main_pendientes').css('display', 'block');
    $('.main_resumen').css('display', 'none');
    showName_foto_pend('desc');
    showName_foto_pend('note');

    $(".carga_mat_pend").off('click');
    $('.carga_mat_pend').click(function() {
      $('#matCant_pend').val(''),
      $('#matName_pend').val(''),
      $('#matDesc_pend').val(''),
      showName_foto('materialPen');
      $('#modal_addMaterial_pend').modal();

      $('#bt_cargaMaterP').off('click');
      $('#bt_cargaMaterP').click(function() {
        var pMaterial = {
          id: 0,
          cant: $('#matCant_pend').val(),
          name: $('#matName_pend').val(),
          unidad: $('#matUnid_pend').find('option:selected').text(),
          id_unidad: $('#matUnid_pend').val(),
        };
        pend_item_materials.push(pMaterial);
        drawMaterials_pend();
      })
    });
  });

  $(".cancel_pendiente").off('click');
  $('.cancel_pendiente').click(function() {
    $('.main_info_ots_resumen').show();
    $('#panel-resumen-item .info_ots').show();
    $('#desc_pend').val('');
    $('#cant_pend').val('');
    $('#uni_pend').val('');
    $('#note_pend').val('');
    $('.main_pendientes').css('display', 'none');
    $('.main_resumen').css('display', 'flex');
  });

  $(".add_pendiente").off('click');
  $('.add_pendiente').click(function() {
    // prepare form data to send
    var descripcion_pend = $('#desc_pend').val(),
        cantidad_pend = $('#cant_pend').val(),
        unidad_pend = $('#uni_pend').val();

    var to_sendP = new FormData;
    to_sendP.append('id_orden', orden_id);
    to_sendP.append('descripcion', descripcion_pend);
    to_sendP.append('cantidad', cantidad_pend);
    to_sendP.append('id_unidad', unidad_pend);
    to_sendP.append('item_from', id_item);
    to_sendP.append('materiales',  JSON.stringify(pend_item_materials));

    $('#loader').css('display', 'flex');
    $.ajax({
      url: "../api/new_item.php",
      type: "POST",
      dataType: "json",
      data: to_sendP,
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
        if (response) {
          $('.main_info_ots_resumen').show();
          $('#panel-resumen-item .info_ots').show();
          $('#loader').css('display', 'none');
          console.log(response);
          if (response.success == true) {
            console.log('successful pending upload');
            $('.main_pendientes').css('display', 'none');
            $('.main_resumen').css('display', 'flex');
          } else {
            console.log(response.error, response.sql);
          }
        } else {
          console.log("error response ajax -> new_item.php");
        }
      },
      error: function() {
        console.log('error ajax -> new_item.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });

  });

  mySwiper.on('slideChange', function () {
    ic_slide = mySwiper.activeIndex;
    mySwiper.allowSlideNext = false;
    switch (ic_slide) {
      case 0:
        $(".bar_action_ot").html(
          "<div class='div_bar_action_ot btn_action_ot0'>" +
              "<i class='fas fa-chevron-left back_slide'></i>" +
              "<span>AVERIA</span>" +
          "</div>"+
          "<div class='div_steps_ot'>" +
              "<div style='background: #fd5e13;' id='step_ot1'></div>" +
              "<div id='step2'></div>" +
              "<div id='step3'></div>" +
              "<div id='step4'></div>" +
          "</div>"
        )
        back_slide()
        mySwiper.allowSlideNext = false;
        break;

        case 1:
        $(".bar_action_ot").html(
          "<div class='div_bar_action_ot btn_action_ot1'>" +
              "<i class='fas fa-chevron-left back_slide'></i>" +
              "<span>REPARACIÓN</span>" +
          "</div>"+
          "<div class='div_steps_ot'>" +
              "<div style='background: #fd5e13;' id='step_ot1'></div>" +
              "<div style='background: #fd5e13;' id='step_ot2'></div>" +
              "<div id='step3'></div>" +
              "<div id='step4'></div>" +
          "</div>"
        )
        back_slide()
        mySwiper.allowSlideNext = false;
        break;

      case 2:
        $(".bar_action_ot").html(
          "<div class='div_bar_action_ot btn_action_ot2'>" +
              "<i class='fas fa-chevron-left back_slide'></i>" +
              "<span>MATERIALES</span>" +
          "</div>"+
          "<div class='div_steps_ot'>" +
              "<div style='background: #fd5e13;' id='step_ot1'></div>" +
              "<div style='background: #fd5e13;' id='step_ot2'></div>" +
              "<div style='background: #fd5e13;' id='step_ot3'></div>" +
              "<div id='step4'></div>" +
          "</div>"
        )
        back_slide()
        mySwiper.allowSlideNext = false;
        break;

      case 3:
        $(".bar_action_ot").html(
          "<div class='div_bar_action_ot btn_action_ot3'>" +
              "<i class='fas fa-chevron-left back_slide'></i>" +
              "<span>NOTAS</span>" +
          "</div>"+
          "<div class='div_steps_ot'>" +
              "<div style='background: #fd5e13;' id='step_ot1'></div>" +
              "<div style='background: #fd5e13;' id='step_ot2'></div>" +
              "<div style='background: #fd5e13;' id='step_ot3'></div>" +
              "<div style='background: #fd5e13;' id='step_ot4'></div>" +
          "</div>"
        )
        back_slide()
        mySwiper.allowSlideNext = false;
        break;

      default:
        break;
    }

  });

}

var paso_mat = 1;
function sub_slider() {
  paso_mat = 1;
  $('.body_rubroTable').html('');
  $('#loader').css('display', 'flex');
  $.ajax({
    url: "../api/get_deposits.php",
    type: "GET",
    dataType: "json",
    // data: to_send,
    success: function(response) {
      if (response) {
        $('#loader').css('display', 'none');
        if (response.success == true) {
          console.log('depositos: '+response.deposits);
          var data_stock = '',
              data_stockManual = '';

          for (var i = 0; i < response.deposits.length; i++) {
            // data_stock +=  `<a class="item_list_corre" href="#">${response.deposits[i].deposito}</a>`;
            data_stockManual += `<option value="${response.deposits[i].id_proveedor}">${response.deposits[i].nombre}</option>`;
            $('.stock_select').html(data_stockManual);
            $('.list_panels').html(data_stock);
          }

          change_paso();

          $('.back_subSlider').off('click');
          $('.back_subSlider').click(function () {
            paso_mat = paso_mat - 1;
            change_paso();
          });

          $('.item_list_corre, #bt_go_materials').off('click');
          $(".item_list_corre, #bt_go_materials").click(function() {
            paso_mat = 2;
            change_paso();
            $('.list_panels').removeClass("open_list").addClass("close_list");
            $('.tabla_materiales').show();

            console.log('click en: ' + $(this).text());
            var deposito = $(this).text();
            if (deposito == 'Siguiente') {
              deposito = '';
            }
            console.log(deposito);
            $('.select_material').select2({
              placeholder: 'Selecciona un material',
              delay: 250,
              ajax: {
                url: "../api/get_stock.php",
                dataType: 'json',
                data: function (params) {
                  return {
                    descripcion: params.term, deposito
                  };
                },
                processResults: function (response) {
                  return {
                    results: response.stock
                  };
                },
              }
            });
            // var data_materials = '';
            $('.select_material').off('change');
            $('.select_material').on('change', function() {
              var data_select = '';
              for (var i = 0; i < app.units.length; i++) {
                data_select += `<option value="${app.units[i].id_unidad}">`+app.units[i].descripcion+`</option>`;
              }
              var materialName = $('.select_material option:selected').text(),
                  materialId = $('.select_material option:selected').val();
              console.log($('.select_material option:selected').text());
              var data_materials =  `<tr class="tr_tableC">
                                      <td class="name_materR" data-deposito="${deposito}" data-material-id="${materialId}">${materialName}</td>
                                      <td class="select_cant">
                                          <input type="number" data-material-id="${materialId}" class="material-cant">
                                      </td>
                                      <td class="td_selectR">
                                          <select class="select_Ucorrec" data-material-id="${materialId}">
                                          ${data_select};
                                          </select>
                                      </td>
                                    </tr>`;
              $('.body_rubroTable').append(data_materials);
            });
          });



          $('#bt_go_resumen').off('click');
          $('#bt_go_resumen').click(function () {
            $('.tbody_resumen').html('');
            order_item_materials = [];
            $('table.rubro_table tbody tr').each(function(index, el) {
              // has cant?
              var cant = $(this).find('.select_cant input').val();
              // -> store
              if (cant > 0) {
                var material = {
                  id: $(this).find('.select_cant input').attr('data-material-id'),
                  cant: $(this).find('.select_cant input').val(),
                  name: $(this).find('.name_materR').text(),
                  unidad: $(this).find('.td_selectR select option:selected').text(),
                  id_unidad: $(this).find('.td_selectR select').val(),
                  deposito: $(this).find('.name_materR').attr('data-deposito'),
                };
                order_item_materials.push(material);
              }
            });
            drawMaterials();

            $('.link_material').off('click');
            $('.link_material').click(function () {
              var material = $(this).parent();
              $("#modal_delete_mate").modal();
              $("#btn_delete_material").click(function() {
                material.css('display', 'none');
                material.html('');
              })
            });
            paso_mat = 3;
            change_paso();
          });
        } else {
          console.log(response.error, response.sql);
        }
      } else {
        console.log("error response ajax -> get_stock.php");
      }
    },
    error: function() {
      console.log('error ajax -> get_stock.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function carga_manualCorr() {
  $('.carga_manual').off('click');
  $('.carga_manual').click(function() {
    $('#matName_carga').val('');
    $('#matCant_carga').val('');
    $('#material_foto').val('');
    $('#name_material_foto').html('');
    $('#modal_carga_manual').modal();
    $('#bt_carga_manual').off('click');
    $('#bt_carga_manual').click(function() {
      if ($('#matName_carga').val() == '' || $('#matCant_carga').val() == '') {
        Snackbar.show({customClass: 'noti_style', pos: 'bottom-center', text: 'Completa todos los campos para continuar.', showAction: false,backgroundColor: '#d00000'});
      } else {
        $('#modal_carga_manual').modal('hide');
        var photo_material = '';
        console.log(document.getElementById('material_foto').files );
        document.getElementById('material_foto').files.length == 0 ? photo_material = '' : photo_material = document.getElementById('material_foto').files[0];
        var material = {
          id: 0,
          cant: $('#matCant_carga').val(),
          name: $('#matName_carga').val(),
          unidad: $('#matUnid_carga').find('option:selected').text(),
          id_unidad: $('#matUnid_carga').val(),
          deposito: $('#matdepo_carga').find('option:selected').val(),
          photo: photo_material 
        };
        console.log(material);
        order_item_materials.push(material);
        // archivos_esp.push(document.getElementById('espontaneo_foto').files[x]);
  
        drawMaterials();
  
        $('.link_material').off('click');
        $('.link_material').click(function () {
          var material = $(this).parent();
          var index_material = material.index();
          $("#modal_delete_mate").modal();
          $("#btn_delete_material").click(function() {
            order_item_materials.splice(index_material, 1);
            material.css('display', 'none');
            material.html('');
          })
        });
      }
    })
  })
}

function carga_manualAgenda() {
  $('#loader').css('display', 'flex');
  $.ajax({
    url: "../api/get_deposits.php",
    type: "GET",
    dataType: "json",
    success: function(response) {
      if (response) {
        $('#loader').css('display', 'none');
        if (response.success == true) {
          var data_stockManualA = '';

          for (var i = 0; i < response.deposits.length; i++) {
            data_stockManualA += `<option value="${response.deposits[i].deposito}">${response.deposits[i].deposito}</option>`;
            $('.stock_selectA').html(data_stockManualA);
          }

          $('.ask_material').off('click');
          showName_foto('materialA');
          $('.ask_material').on('click', function () {
            $('#modal_cargaManual_agenda').modal()
            $('#bt_sendMaterial').off('click');
            $('#bt_sendMaterial').click(function() {
              var material_Agenda = {
                id: 0,
                cant: $('#matCant_cargaA').val(),
                name: $('#matName_cargaA').val(),
                id_unidad: $('#matUnid_cargaA').val(),
                // unidad: $('#matUnid_cargaA').find('option:selected').text(),
                // deposito: $('#matdepo_cargaA').find('option:selected').text()
              };
              order_materialAgenda.push(material_Agenda);
            })
          })
        } else {
          console.log(response.error, response.sql);
        }
      } else {
        console.log("error response ajax -> get_stock.php");
      }
    },
    error: function() {
      console.log('error ajax -> get_stock.php');
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function change_paso() {
  switch (paso_mat) {
    case 1:
      $(".sub_bar_action_ot").html(
          "<div class='sub_div_bar'>" +
              "<img src='assets/images/icon/pedidos.png'>" +
              "<span>Selección de Stock</span>" +
          "</div>" +
          "<div class='pasos_lista'>" +
              "<div class='div_pasos'>" +
                "<div style='background: #fd5e13;' id='paso1'></div>" +
                "<div id='paso2'></div>" +
                "<div id='paso3'></div>" +
              "</div>" +
              "<div class='bt_lista_mate' onclick='openList()'>" +
                "<i class='fas fa-caret-down'></i>" +
              "</div>" +
          "</div>"
      );
      $('.paso1_slide').show();
      $('.paso2_slide').hide();
      $('.paso3_slide').hide();

      break;

      case 2:
      $(".sub_bar_action_ot").html(
          "<div class='sub_div_bar'>" +
              "<img src='assets/images/icon/pedidos.png'>" +
              "<span>Selección de Stock</span>" +
          "</div>" +
          "<div class='pasos_lista'>" +
              "<div class='div_pasos'>" +
                "<div style='background: #fd5e13;' id='paso1'></div>" +
                "<div style='background: #fd5e13;' id='paso2'></div>" +
                "<div id='paso3'></div>" +
              "</div>" +
              "<div class='bt_lista_mate' onclick='openList()'>" +
                "<i class='fas fa-caret-down'></i>" +
              "</div>" +
          "</div>"
      );
      $('.paso1_slide').hide();
      $('.paso3_slide').hide();
      $('.paso2_slide').show();
      break;

    case 3:
      $(".sub_bar_action_ot").html(
          "<div class='sub_div_bar'>" +
              "<img src='assets/images/img/resumen.png'>" +
              "<span>Resumen</span>" +
          "</div>" +
          "<div class='pasos_lista'>" +
              "<div class='div_pasos'>" +
                "<div style='background: #fd5e13;' id='paso1'></div>" +
                "<div style='background: #fd5e13;' id='paso2'></div>" +
                "<div style='background: #fd5e13;' id='paso3'></div>" +
              "</div>" +
          "</div>"
      );
      $('.paso1_slide').hide();
      $('.paso2_slide').hide();
      $('.paso3_slide').show();
      break;
  }
}

function edit_paso() {
  $('.edit_paso_averia').click(function () {
    $('#edit_averia').val(averia);
    $('#modal_edit_averia').modal();
    $('#bt_edit_averia').off('click');
    $('#bt_edit_averia').click(function() {
      $('#desc_averia').html($('#edit_averia').val())
      averia = $('#edit_averia').val();
    });
  })

  $('.edit_paso_repar').click(function () {
    $('#edit_reparacion').val(reparacion);
    $('#modal_edit_reparacion').modal();
    $('#bt_edit_reparacion').off('click');
    $('#bt_edit_reparacion').click(function() {
      $('#desc_reparacion').html($('#edit_reparacion').val())
      reparacion = $('#edit_reparacion').val();
    });
  })

  $('.edit_paso_notas').click(function () {
    $('#edit_notas').val(notes);
    $('#modal_edit_notas').modal();
    $('#bt_edit_notas').off('click');
    $('#bt_edit_notas').click(function() {
      $('#desc_notes').html($('#edit_notas').val())
      notes = $('#edit_notas').val();
    });
  })

  // $('.div_resume_material').click(function () {
  //   loadMaterial($(this).attr('data-material-id'));
  //   $('#modal_edit_mat').modal();

    // $('.btn_addMaterial').click(function(){
    //   $('#modal_addMaterial').modal();
    // })
  // })
}

function show_resumenOt() {
  $('.bt_resumenOt').off('click');
  $('.bt_resumenOt').on('click', function () {
    $('#loader').css('display', 'flex');
    $.ajax({
      url: "../api/get_order.php",
      type: "GET",
      dataType: "json",
      data: { orden_id },
      success: function(response) {
        if (response.success) {
          var data_url = '';
          var data_divImg = '';
          var data_ot = '';
          var data_section = '';
          for (var i = 0; i < response.order.order_items.length; i++) {
            var item = response.order.order_items[i];
            if (item.item_status == 2) {
              console.log(item.exec.averia);

              // var arrMaterials = JSON.parse(item.exec.materiales);

              var list_materials = '<h5>Materiales</h5>';
              item.materiales.forEach(function(material, index) {
                var cantidad = material.cantidad.split('.');
                list_materials += `<div class="div_resume_material">
                                      <h5>${material.descripcion}</h5>
                                      <p>Cant. ${cantidad[0]} U</p>
                                    </div>`;
              });

              function filter_photo(files, section) {
                var photo_section = '';
                if ((files == null) || (files == '')) {
                  photo_section = '';
                } else {
                  photo_section = `<img class="open_img_modalR" data_section="${section}" data_url="${files}" src="assets/images/icon/cam_ico.png">`;
                }                 
                return photo_section;
              }


              data_ot += `<div class="info_ots">
                              <h5>Item ${(i+1)}</h5>
                          </div>
                          <div class="main_resumen">
                              <div class="div_paso_resumen">
                                  <div class="edit_paso_averia">
                                      <h5>Avería</h5>
                                      <p>${item.exec.averia}</p>
                                  </div>
                                  ${filter_photo(item.exec.averia_foto, 'averia')}
                              </div>
                              <div class="div_paso_resumen">
                                  <div class="edit_paso_repar">
                                      <h5>Reparación</h5>
                                      <p>${item.exec.reparacion}</p>
                                  </div>
                                  ${filter_photo(item.exec.reparacion_foto, 'reparación')}
                              </div>
                              <div class="div_paso_resumen2">
                                  ${list_materials}
                              </div>
                              <div class="div_paso_resumen">
                                  <div class="edit_paso_notas">
                                      <h5>Notas y aclaraciones</h5>
                                      <p>${item.exec.notas}</p>
                                  </div>
                                  ${filter_photo(item.exec.notas_foto, 'notas')}
                              </div>
                          </div>`
            }
          }

          $('.contieneAllOt').html(data_ot);

          if (app.current_user.type == 2) {
            $('.conformidad_client, .firma_client').hide();
          } else {
            $('.total_time_ot, .conformidad, .code_firma_ot, .firma').hide();
          }

          var img = '';
          $('.open_img_modalR').on('click', function() {
            var sec = $(this).attr('data_section');
            var src = $(this).attr('data_url'),
              caption = "Fotos " + sec + " item",
              imgs = [];
              src = src.split(';');

            src.forEach(function(photo, index) {
              img = {
                src: photo,
                opts: {
                  caption: caption,
                },
              };
              console.log(img);
              imgs.push(img);
            });

            $.fancybox.open(imgs, {loop : false});
          })
          $('.resumen_finalOt').show();
          $('#loader').css('display', 'none');
        } else {
          console.log(response.error, response.sql)
        }
      },
      error: function() {
        console.log('error ajax -> get_order.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
  })
}

function firma_cliente() {
  $('#next_firmaAca, .back_to_code').off('click');
  $('#next_firmaAca, .back_to_code').on('click', function () {
    $.ajax({
      url: "../api/get_contacts.php",
      type: "GET",
      dataType: "json",
      data: { 'id_cliente': id_clientSign },
      success: function(response) {
        if (response) {
          var data_contactsSign = `<option hidden selected value="">Seleccioná un contacto</option>`;
          console.log(response);
          if (response.success == false) {
            data_contactsSign += `<option selected disabled>No hay contacto para elegir</option>`;
          } else {
            for (var i = 0; i < response.contacts.length; i++) {
              data_contactsSign += `<option value="${response.contacts[i].id_contacto}">${response.contacts[i].nombre + ' ' + response.contacts[i].apellido}</option>`;
            }
          }
          $('#sign_contact').html(data_contactsSign)
          $('#sign_contact').prop('disabled', false);
          $('.total_time_ot, .resumen_finalOt, .conformidad, .firma, .code_firma_ot').hide();
          $('.selectContact_ot').show();
        } else {
          console.log("error response ajax -> get_contacts.php");
          errA();
        }
      },
      error: function() {
        console.log('error ajax -> save_employee_hour.php -> status ot');
        $('#loader').css('display', 'none');
        errC();
      }
    });
    
  })

  $('#next_code').off('click').on('click', function() {

    $('#loader').css('display', 'flex');
    $.ajax({
      url: "../api/get_order.php",
      type: "GET",
      dataType: "json",
      data: { orden_id },
      success: function(response) {
        if (response.success) {
          var hour_desde = then.split(', ');
          var now = moment().format('HH:mm:ss');
          var id_empleado = app.current_user.type_id;
          var data = {
            'id_empleado': id_empleado,
            'id_orden': orden_id,
            'numero': response.order.id_ot,
            'monto': '',
            'hora_desde': hour_desde[1],
            'hora_hasta': now,
            'estado': 'sin_firmar'
            // 'id_contacto': id_contactoSign
          }
          $.ajax({
            url: "../api/exec_ot.php",
            type: "POST",
            dataType: "json",
            data: data,
            success: function(response) {
              if (response.success) {
                $('#code-ot').html(response.id_ejecucion);
                getLocation()
                .then(function(position) {
                  coordenadas = position.coords.latitude+', '+position.coords.longitude;
                  var id_empleado = app.current_user.type_id,
                      tipo = "ot.1";
                  // save to db
                  $.ajax({
                    url: "../api/save_employee_hour.php",
                    type: "POST",
                    dataType: "json",
                    data: {'id_empleado': id_empleado, 'tipo': tipo, 'tipo_id': orden_id, 'coordenadas': coordenadas},
                    success: function(response) {
                      if (response.success) {
                        console.log('Se cerró la OT');
                        $('#loader').css('display', 'none');
                        $('#status_ot').html('Realizar');
                        estado_ot = 'closed';
                        orden_id = "";
                        
                        $('.total_time_ot, .resumen_finalOt, .conformidad, .firma, .selectContact_ot').hide();
                        $('.code_firma_ot').show();

                        $('.cierraOtAca').off('click').on('click', function() {
                          // $('#modal_completeOt').modal();
                          // $('#btn_completedOt').off('click').on('click', function() {
                            showSection(hideAllSections, 'intro');
                            $('.bt_in_replanteo').css('display', 'none');                                  
                          // })
                        })
                      } else {
                        console.log(response.error, response.sql)
                      }
                    },
                    error: function() {
                      console.log('error ajax -> save_employee_hour.php -> status ot');
                      $('#loader').css('display', 'none');
                      errC();
                    }
                  });
                });
              } else {
                console.log(response.error, response.sql)
              }
            },
            error: function() {
              console.log('error ajax -> exec_ot.php -> status ot');
              $('#loader').css('display', 'none');
              errC();
            }
          });
        } else {
          console.log(response.error, response.sql)
        }
      },
      error: function() {
        console.log('error ajax -> get_order.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });
    
  })

  show_resumenOt()

  $('#back_conformidad').off('click');
  $('#back_conformidad').on('click', function () {
    $('.total_time_ot, .resumen_finalOt, .code_firma_ot, .firma').hide();
    $('.conformidad').show();
  })

  $('.next_conformidad').off('click');
  $('.next_conformidad').on('click', function () {
    if ($('#sign_contact').val() == '') {
      Snackbar.show({customClass: 'noti_style', pos: 'bottom-left', text: 'Tenés que seleccionar un contacto para continuar', showAction: false, backgroundColor: '#d00000'});
    } else {
      $('input[name=conformidad]', '.main-conformidad').prop('checked',false);
      $('#final_coment').val('');
      $('.total_time_ot, .resumen_finalOt, .code_firma_ot, .firma, .selectContact_ot').hide();
      $('.conformidad').show();
    }
  })


  $('.back_to_timeOt').off('click');
  $('.back_to_timeOt').on('click', function () {
    $('.total_time_ot').show();
    $('.code_firma_ot, .resumen_finalOt, .conformidad, .firma, .selectContact_ot').hide();
  })

  $('.next_firma').off('click');
  $('.next_firma').on('click', function () {
    if ($('input[name=conformidad]:checked', '.main-conformidad').val() == undefined || $('#final_coment').val() == '') {
      Snackbar.show({customClass: 'noti_style', pos: 'bottom-left', text: 'Completá los campos para continuar', showAction: false, backgroundColor: '#d00000'});
    } else {
      $('.total_time_ot, .resumen_finalOt, .code_firma_ot, .conformidad').hide();
      $('.firma').show();
      firma()
    }
    
  })
}

function firma() {
  var wrapper = document.getElementById("signature-pad");
  var clearButton = wrapper.querySelector("[data-action=clear]");
  var canvas = wrapper.querySelector("canvas");
  var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)'
  });

  function resizeCanvas() {

    var ratio =  Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);

    signaturePad.clear();
  }

  resizeCanvas();
  window.onresize = resizeCanvas;

  function download(dataURL, filename) {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
      window.open(dataURL);
    } else {
      var blob = dataURLToBlob(dataURL);
      var url = window.URL.createObjectURL(blob);

      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }


  function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
  });

  signaturePad.penColor = "#1a57a2";

  $("#bt-finaliza-otCliente").off('click').on('click',function(){ 
    if (signaturePad.isEmpty()) {
      Snackbar.show({customClass: 'noti_style', pos: 'bottom-left', text: 'Es necesaria su firma para continuar', showAction: false, backgroundColor: '#d00000'});
    } else {

      var miCanvas = document.querySelector("#canvasFirma");
      var miCanvasWidth = miCanvas.width;
      var miCanvasHeight = miCanvas.height;

      var newCanvas = document.createElement('canvas'); // creo nuevo canvas
      newCanvas.width = miCanvasWidth;
      newCanvas.height = miCanvasHeight;

      var ctx = newCanvas.getContext('2d'); // false: si el navegadorno lo soporta.

      //draw image to canvas. scale to target dimensions
      ctx.drawImage(miCanvas, 0, 0, newCanvas.width, newCanvas.height);

      var dataURI = newCanvas.toDataURL('img/png');

      $('#loader').css('display', 'flex');
      var id_contactoSign = $('#sign_contact').val();
      $.ajax({
        url: "../api/get_order.php",
        type: "GET",
        dataType: "json",
        data: { orden_id },
        success: function(response) {
          if (response.success) {
            var hour_desde = then.split(', ');
            var now = moment().format('HH:mm:ss');
            var comentario = $('#final_coment').val();
            var valoracion = $('input[name=conformidad]:checked', '.main-conformidad').val();
            var id_empleado = app.current_user.type_id;
            var data = {
              'id_empleado': id_empleado,
              'id_orden': orden_id,
              'numero': response.order.id_ot,
              'monto': '',
              'hora_desde': hour_desde[1],
              'hora_hasta': now,
              // 'comentario': comentario,
              // 'valoracion': valoriacion,
              // 'firma': dataURI,
              'id_contacto': id_contactoSign,
              'estado': 'pendiente'
            }
            $.ajax({
              url: "../api/exec_ot.php",
              type: "POST",
              dataType: "json",
              data: data,
              success: function(response) {
                if (response.success) {
                  $.ajax({
                    url: "../api/update_ejecucion.php",
                    type: "POST",
                    dataType: "json",
                    data: { 'comentario': comentario, 'valoracion': valoracion, 'firma': dataURI, 'id_ejecucion': response.id_ejecucion, 'id_contacto': id_contactoSign },
                    success: function(response) {
                      if (response.success) {
                        getLocation()
                        .then(function(position) {
                          coordenadas = position.coords.latitude+', '+position.coords.longitude;
                          var id_empleado = app.current_user.type_id,
                              tipo = "ot.1";
                          // save to db
                          $.ajax({
                            url: "../api/save_employee_hour.php",
                            type: "POST",
                            dataType: "json",
                            data: {'id_empleado': id_empleado, 'tipo': tipo, 'tipo_id': orden_id, 'coordenadas': coordenadas},
                            success: function(response) {
                              if (response.success) {
                                console.log('Se cerró la OT');
                                $('#loader').css('display', 'none');
                                $('#status_ot').html('Realizar');
                                estado_ot = 'closed';
                                orden_id = "";
                                $('#modal_completeOt').modal();
                                $('#btn_completedOt').off('click').on('click', function() {
                                  showSection(hideAllSections, 'intro');
                                  $('.bt_in_replanteo').css('display', 'none');                                  
                                })
                              } else {
                                console.log(response.error, response.sql)
                                errA();
                              }
                            },
                            error: function() {
                              console.log('error ajax -> save_employee_hour.php -> status ot');
                              errC();
                            }
                          });
                        });
                      } else {
                        console.log(response.error, response.sql)
                      }
                    },
                    error: function() {
                      console.log('error ajax -> exec_ot.php -> status ot');
                      $('#loader').css('display', 'none');
                      errC();
                    }
                  });
                  
                } else {
                  errA();
                  console.log(response.error, response.sql);
                }
              },
              error: function() {
                console.log('error ajax -> exec_ot.php -> status ot');
                $('#loader').css('display', 'none');
                errC();
              }
            });
          } else {
            console.log(response.error, response.sql);
            errA();
          }
        },
        error: function() {
          console.log('error ajax -> get_order.php');
          $('#loader').css('display', 'none');
          errC();
        }
      });
    }
  });
}

/**
 * Draw OT materials table and list
 */
function drawMaterials() {
  var table_summary = "",
      list_summary = "<h5>Materiales</h5>";

  order_item_materials.forEach(function(material, index) {
    // draw table
    table_summary += `<tr class="tr_table" data-deposito="${material.deposito}" data-material-id="${material.id}">
                        <td class="link_material">${material.name}</td>
                        <td class="td_selectResumen">
                          ${material.cant}
                        </td>
                        <td>
                          ${material.unidad}
                        </td>
                      </tr>`;
    // draw list
    list_summary += `<div class="div_resume_material" data-material-id="${material.id}">
                        <h5>${material.name}</h5>
                        <p>Cant. ${material.cant} ${material.unidad}</p>
                        <p>${material.deposito}</p>
                    </div>`;
  });
  console.log(order_item_materials);
  $('table.resumen_table tbody').html(table_summary);
  $('div.div_paso_resumen2').html(list_summary);

  /* load resume listeners */
  $('.div_resume_material').off('click');
  $('.div_resume_material').on('click', function () {
    loadMaterial($(this).attr('data-material-id'));
    $('#modal_edit_mat').modal();

    $('.btn_addMaterial').click(function(){
      // addMaterial();
      $('#modal_addMaterial').modal();
    })
  })
}

function drawMaterials_pend() {
  var mat_pend = "";

  pend_item_materials.forEach(function(pMaterial, index) {
    // draw list
    mat_pend += `<div class="div_resume_materialP" data-material-id="${pMaterial.id}">
                      <h5>${pMaterial.name}</h5>
                      <p>Cant. ${pMaterial.cant} ${pMaterial.unidad}</p>
                      <p>Rubro</p>
                  </div>`;
  });
  $('.all_materials_pend').html(mat_pend);
  console.log('se carga');
}

/**
 * Load material info to edit in modal
 * @param {Integer} material_id
 */
function loadMaterial(material_id) {
  order_item_materials.forEach(function(material, index) {
    if (material.id == material_id) {
      $('#modal_edit_mat #material-edit-name').text(material.name);
      $('#modal_edit_mat #material-edit-cant').val(material.cant);
      $('#modal_edit_mat #material-edit-cant').attr('data-material-id', material.id);
      $('#modal_edit_mat #material-edit-unit').text(material.unidad);
    }
  });

  /* update material */
  $('#modal_edit_mat .btn_ok').off('click');
  $('#modal_edit_mat .btn_ok').on('click', function(event) {
    event.preventDefault();

    var new_cant = $('#modal_edit_mat #material-edit-cant').val(),
        id_material = $('#modal_edit_mat #material-edit-cant').attr('data-material-id');

    order_item_materials.forEach(function(material, index) {
      if (material.id == id_material) {
        order_item_materials[index].cant = new_cant;
      }
    });
    drawMaterials();
  });
  /* delete material */
  $('#modal_edit_mat .btn_delete').off('click');
  $('#modal_edit_mat .btn_delete').on('click', function(event) {
    event.preventDefault();

    var new_cant = $('#modal_edit_mat #material-edit-cant').val(),
        id_material = $('#modal_edit_mat #material-edit-cant').attr('data-material-id');

    order_item_materials.forEach(function(material, index) {
      if (material.id == id_material) {
        order_item_materials.splice(index, 1);
      }
    });
    drawMaterials();
  });
}

/* End day listener */
function end_day() {
  $('#btn_end_day').off('click');
  $("#btn_end_day").click(function(){
    if ($('#claveG_fin').val() == app.current_user.clave) {
      getLocation()
      .then(function(position) {
        coordenadas = position.coords.latitude+', '+position.coords.longitude;
        $('#modal_finalizar_jornada').modal('hide');
        clearInterval(tiempo_corriendo);
        clearInterval(tiempo_corriendo_br);
        var id_empleado = app.current_user.type_id;
        var tipo = "d.1";
        $('#loader').css('display', 'flex');
        // save to db
        $.ajax({
          url: "../api/save_employee_hour.php",
          type: "POST",
          dataType: "json",
          data: { id_empleado, tipo, coordenadas },
          success: function(response) {
            if (response.success) {
              var today = moment().format('YYYY-MM-DD');
              $.ajax({
                url: "../api/get_day_summary.php",
                type: "GET",
                dataType: "json",
                data: { 'id_empleado': id_empleado, 'fecha': today },
                success: function(response) {
                  if (response.success) {
                    console.log(response);
                    // close break?
                    // if (response.break) {
                    //   console.log('Finalizó el descanso ('+hour_br.text()+':'+minute_br.text()+':'+second_br.text()+')');
                    //   $(".btn_iniciar_break").text('Iniciar Break');
                    //   clearInterval(tiempo_corriendo_br);
                    //   $(".div_break_things").hide();
                    // }
                    // console.log('Finalizó la jornada ('+hour.text()+':'+minute.text()+':'+second.text()+')');
                    var hours_rested = response.hours_rested.split(':');
                    var hours_worked = response.hours_worked.split(':');

                    var t1 = new Date();
                    var t2 = new Date();

                    t1.setHours(hours_worked[0], hours_worked[1], hours_worked[2]);
                    t2.setHours(hours_rested[0], hours_rested[1], hours_rested[2]);

                    //Imprimo el resultado de operativas
                    $('#operative_time').text("Tiempo Operativo: " + (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " hs." : " h.") : "") + (t1.getMinutes() ? (t1.getHours() ? " y " : "") + t1.getMinutes() + (t1.getMinutes() > 1 ? " min." : " min.") : ""));
                    //Imprimo el resultado de descanso
                    $('#break_time').text("Tiempo de descanso: " + (t2.getHours() ? t2.getHours() + (t2.getHours() > 1 ? " hs." : " h.") : "") + (t2.getMinutes() ? (t2.getHours() ? " y " : "") + t2.getMinutes() + (t2.getMinutes() > 1 ? " min." : " min.") : ""));
                    //Imprimo el resto de los datos
                    $('#otsRealizadas').text(response.ots)
                    $('#itemsRealizados').text(response.items)

                    $(".div_break_things, .div_day_things").hide();
                    $('.btn_desempeño').show();
                    $('#datos_gestion').show();

                    $('#loader').css('display', 'none');
                  }
                  else {
                    console.log(response.error, response.sql)
                  }
                },
                error: function() {
                  console.log('error ajax -> get_day_summary.php');
                  $('#loader').css('display', 'none');
                  errC();
                }
              });
            }
            else {
              console.log(response.error, response.sql)
            }
          },
          error: function() {
            console.log('error ajax -> save_employee_hour.php');
            $('#loader').css('display', 'none');
            errC();
          }
        });
      });
    } else {
      $('#errorM_fin').html('Ingrese una clave valida');
    }
  });
}

function end_break() {
  $('#modal_finalizar_break').modal();
  $("#btn_end_break").on("click", function() {
    if ($('#claveG_fin_br').val() == app.current_user.clave) {
      getLocation()
      .then(function(position) {
        coordenadas = position.coords.latitude+', '+position.coords.longitude;
        $('#modal_finalizar_break').modal('hide');
        clearInterval(tiempo_corriendo_br);
        var id_empleado = app.current_user.type_id;
        var tipo = "b.1"

        // save to db
        $.ajax({
          url: "../api/save_employee_hour.php",
          type: "POST",
          dataType: "json",
          data: { id_empleado, tipo, coordenadas },
          success: function(response) {
            if (response.success == true) {
              console.log('Finalizó el descanso ('+hour_br.text()+':'+minute_br.text()+':'+second_br.text()+')');
              $(".btn_iniciar_break").text('Iniciar Break');
              clearInterval(tiempo_corriendo_br);
              $(".div_break_things").hide();
            } else {
              console.log(response.error, response.sql)
            }
          },
          error: function() {
            console.log('error ajax -> save_employee_hour.php');
            $('#loader').css('display', 'none');
            errC();
          }
        });
      });
    } else {
      $('#errorM_fin_br').html('Ingrese una clave valida');
    }
  })
}

function showPhoto(input, element) {
  getEspontaneoFoto(input.files).then(function(response) {
    var photos = response.join('>>');
    $(element).attr('data-photos', photos);
  }); 
}

function showName_foto(section) {
  $("img[data_section='"+section+"']").hide();
  $('#'+section+'_foto').val('');
  $('#name_'+section+'_foto').html('');
  $('#'+section+'_foto').off('change');
  $('#'+section+'_foto').change(function() {
    var file = this.files[0];
    var imagefile = file.type;
    var match= ["image/jpeg","image/png","image/jpg"];
    if (match.indexOf(imagefile.toLowerCase()) === -1) {
      $('#name_'+section+'_foto').html('Por favor ingrese una imagen valida (JPEG/JPG/PNG).');
      $('#'+section+'_foto').val('');
      return false;
    } else {
      var filename = $('#'+section+'_foto').val().split('\\').pop();
      $('#name_'+section+'_foto').html(filename);
    }
    var id_element = '#foto_'+section+'S'
    showPhoto(this, id_element);
    $("img[data_section='"+section+"']").show();
  });
}

function showName_foto_pend(section) {
  $('#'+section+'_fPend').off('change');
  $('#'+section+'_fPend').change(function() {
    var file = this.files[0];
    var imagefile = file.type;
    var match= ["image/jpeg","image/png","image/jpg"];
    if (match.indexOf(imagefile.toLowerCase()) === -1) {
      $('#name_'+section+'_fPend').html('Por favor ingrese una imagen valida (JPEG/JPG/PNG).');
      $('#'+section+'_fPend').val('');
      return false;
    } else {
      var filename = $('#'+section+'_fPend').val().split('\\').pop();
      $('#name_'+section+'_fPend').html(filename);
    }
    // var id_element = '#foto_'+section+'S'
    // showPhoto(this, id_element);
    // $("img[data_section='"+section+"']").show();
  });
}

function showCalendar() {
  $('#btn_showCalendar').off('click');
  $('#btn_showCalendar').on('click', function() {
    $('#calendar').toggle('fast');
    if ($('#btn_showCalendar').text() == 'Mostrar calendario') {
      $('.main-agenda').css('height', 'calc(90vh - 522px)')
      $('#btn_showCalendar').text('Ocultar calendario');
    } else {
      $('.main-agenda').css('height', 'calc(90vh - 75px)')
      $('#btn_showCalendar').text('Mostrar calendario');
    }
  });
}

function actions_orderClient() {
  $('.ot_ejecutada').off('click');
  $('.ot_ejecutada').on('click', function() {
    $('#loader').css('display', 'flex');
    orden_id = this.id;
    $.ajax({
      url: "../api/get_order.php",
      type: "GET",
      dataType: "json",
      data: { orden_id },
      success: function(response) {
        console.log(response);
        if (response.success) {
          var importancia = '';
          var pendiente = '';
          var txt_importancia = '';
          switch (response.order.tipo) {
            case 'normal':
              importancia = '92d050';
              txt_importancia = 'Normal';
              break;
            case 'media':
              importancia = 'FFFF00';
              txt_importancia = 'Media';
              break;
            case 'alta':
              importancia = 'ff0000';
              txt_importancia = 'Alta';
              break;
            case 'critica':
              importancia = '7030A0';
              txt_importancia = 'Critica';
              break;
            default:
              importancia = '92d050';
              break;
          }
          if (response.order.order_item_pendings == true) {
            pendiente = '<div class="item_pendiente"></div>';
          } else {
            pendiente = '';
          }
          if (response.order.locacion_nombre == null) {
            response.order.locacion_nombre = '';
          }
          if (response.order.locacion_direccion == null) {
            response.order.locacion_direccion = response.order.direccion;
          }

          var data_order = `<img src="assets/images/icon/operarios.png" alt="">
                            <p id="empresa_ot">`+ response.order.razon_social +`</p>
                            <p class="cod-ots">OT `+ response.order.id_ot +`</p>
                            <p>`+ response.order.locacion_nombre +`</p>                           
                            <p class="cod-ots">`+ response.order.descripcion +`</p>
                            <p class="date_otClient">`+ response.order.fecha +`</p>
                            <div class="descripcion_ot"><i class="far fa-comment-alt"></i></div>
                            <div class="caja_status">
                                <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                                <div style="background: #${importancia};" class="iportancia_ot"></div>
                                ${pendiente}
                            </div>`;

          $('.main_info_ots').html(data_order);

          modal_infoPedido(response.order.descripcion, response.order.detalle);
          
          var data_url = '';
          var data_divImg = '';
          var data_ot = '';
          var data_section = '';
          for (var i = 0; i < response.order.order_items.length; i++) {
            var item = response.order.order_items[i];
            if (item.item_status == 2) {
              // var arrMaterials = JSON.parse(item.materiales);

              var list_materials = '<h5>Materiales</h5>';
              item.materiales.forEach(function(material, index) {
                var cantidad = material.cantidad.split('.');
                list_materials += `<div class="div_resume_material">
                                      <h5>${material.descripcion}</h5>
                                      <p>Cant. ${cantidad[0]} U</p>
                                    </div>`;
              });

              function filter_photo(files, section) {
                var photo_section = '';
                if ((files == null) || (files == '')) {
                  photo_section = '';
                } else {
                  photo_section = `<img class="open_img_modalR" data_section="${section}" data_url="${files}" src="assets/images/icon/cam_ico.png">`;
                }                 
                return photo_section;
              }


              data_ot += `<div class="info_ots">
                              <h5>Item ${(i+1)}</h5>
                          </div>
                          <div class="main_resumen">
                              <div class="div_paso_resumen">
                                  <div class="edit_paso_averia">
                                      <h5>Avería</h5>
                                      <p>${item.exec.averia}</p>
                                  </div>
                                  ${filter_photo(item.exec.averia_foto, 'averia')}
                              </div>
                              <div class="div_paso_resumen">
                                  <div class="edit_paso_repar">
                                      <h5>Reparación</h5>
                                      <p>${item.exec.reparacion}</p>
                                  </div>
                                  ${filter_photo(item.exec.reparacion_foto, 'reparación')}
                              </div>
                              <div class="div_paso_resumen2">
                                  ${list_materials}
                              </div>
                              <div class="div_paso_resumen">
                                  <div class="edit_paso_notas">
                                      <h5>Notas y aclaraciones</h5>
                                      <p>${item.exec.notas}</p>
                                  </div>
                                  ${filter_photo(item.exec.notas_foto, 'notas')}
                              </div>
                          </div>`
            }
          }

          $('.contieneAllOt').html(data_ot);

          var img = '';
          $('.open_img_modalR').on('click', function() {
            var sec = $(this).attr('data_section');
            var src = $(this).attr('data_url'),
              caption = "Fotos " + sec + " item",
              imgs = [];
              src = src.split(';');

            src.forEach(function(photo, index) {
              img = {
                src: photo,
                opts: {
                  caption: caption,
                },
              };
              console.log(img);
              imgs.push(img);
            });

            $.fancybox.open(imgs, {loop : false});
          })

          // $('.open_img_modalR').off('click');
          // $('.open_img_modalR').click(function() {
          //   data_url = $(this).attr('data_url');
          //   data_section = $(this).attr('data_section');
          //   if (!(data_url == '')) {
          //     data_divImg = `<img class="foto_RF" id="foto_averiaRF" src="${data_url}">`;
          //     $('.contenedor_imgF').html(data_divImg);
          //   } else {
          //     data_divImg = `<p>No hay ninguna imagen para mostrar sobre las ${data_section}</p>`;
          //     $('.contenedor_imgF').html(data_divImg);
          //   }
          //   // $('.foto_RF').attr('src').val(data_url);
          //   $('#modal_imageF').modal();
          // })
          seePanel_summaryOrder();
          $('#loader').css('display', 'none');
        } else {
          console.log(response.error, response.sql)
        }
      },
      error: function() {
        console.log('error ajax -> get_order.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });

    $('.divBt_backPedido').off('click');
    $('.divBt_backPedido').on('click', function() {
      seePanel_listPedidos();
    })
  })

  $('.div_ot_pedido , .ot_sinProg').off('click').on('click', function() {
    orden_id = this.id;
    $('#loader').css('display', 'flex');
    console.log(orden_id);
    $.ajax({
      url: "../api/get_order.php",
      type: "GET",
      dataType: "json",
      data: { orden_id },
      success: function(response) {
        console.log(response);
        if (response) {
          if ((type_otc == 'ot-espontaneo') && (response.order.apro_cliente == 'f')) {
            $('#bt_aceptEjec').css('display', 'block');           
            console.log('Espontaneo sin aceptar');
          } else {
            console.log('Espontaneo aceptado');
            $('#bt_aceptEjec').css('display', 'none');
          }

          var importancia = '';
          var pendiente = '';
          var txt_importancia = '';
          switch (response.order.tipo) {
            case 'normal':
              importancia = '92d050';
              txt_importancia = 'Normal';
              break;
            case 'media':
              importancia = 'FFFF00';
              txt_importancia = 'Media';
              break;
            case 'alta':
              importancia = 'ff0000';
              txt_importancia = 'Alta';
              break;
            case 'critica':
              importancia = '7030A0';
              txt_importancia = 'Critica';
              break;
            default:
              importancia = '92d050';
              break;
          }
          if (response.order.order_item_pendings == true) {
            pendiente = '<div class="item_pendiente"></div>';
          } else {
            pendiente = '';
          }
          if (response.order.locacion_nombre == null) {
            response.order.locacion_nombre = '';
          }
          if (response.order.locacion_direccion == null) {
            response.order.locacion_direccion = response.order.direccion;
          }

          var data_order = `<img src="assets/images/icon/operarios.png" alt="">
                            <p id="empresa_ot">`+ response.order.razon_social +`</p>
                            <p class="cod-ots">OT `+ response.order.id_ot +`</p>
                            <p>`+ response.order.locacion_nombre +`</p>
                            <p class="cod-ots">`+ response.order.descripcion +`</p>
                            <p class="date_otClient">`+ response.order.fecha +`</p>
                            <div class="descripcion_ot"><i class="far fa-comment-alt"></i></div>
                            <div class="caja_status">
                                <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                                <div style="background: #${importancia};" class="iportancia_ot"></div>
                                ${pendiente}
                            </div>`;

          $('.main_info_ots').html(data_order);

          modal_infoPedido(response.order.descripcion, response.order.detalle);

          orden_id = response.order.id_orden;
          $.ajax({
            url: "../api/get_items.php",
            type: "GET",
            dataType: "json",
            data: { orden_id },
            success: function(response) {
              if (response) {
                console.log(response);
                if (response.success == true) {
                  $('.all_items').html("");
                  var data_item = '',
                      iPendiente = '',
                      finished = '',
                      class_pendiente = '',
                      tit_item = '',
                      data_rubro = '',
                      archivos = '';
                  for (var i = 0; i < response.items.length; i++) {
                    var index_item = response.items.map(function(e) { return e.id_orden_item; }).indexOf(response.items[i].item_from);
                    if (response.items[i].item_status == 3) {
                      finished = '';
                      iPendiente = '<div class="item_pendiente"></div>';
                      class_pendiente = 'class_pendiente';
                      tit_item = 'Pendiente de item ' + (index_item + 1);
                    } else if (response.items[i].item_status == 2) {
                      class_pendiente = '';
                      iPendiente = '';
                      if (response.items[i].items_pendings > 0 && !(response.items[i].item_from > 0)) {
                        finished = '<img class="item_finished" src="assets/images/icon/alert.png">';
                        tit_item = 'Item '+ (i + 1);
                      } else if (response.items[i].items_pendings == 0 && response.items[i].item_from > 0){
                        finished = '<img class="item_finished" src="assets/images/img/tilde.png">';
                        tit_item = 'Pendiente de item ' + (index_item + 1);
                        class_pendiente = 'class_pendiente';
                        iPendiente = '<div class="item_pendiente"></div>';
                      } else if (response.items[i].items_pendings == 0 && !(response.items[i].item_from > 0)){
                        finished = '<img class="item_finished" src="assets/images/img/tilde.png">';
                        tit_item = 'Item '+ (i + 1);
                      }
                    } else {
                      finished = '';
                      iPendiente = '';
                      class_pendiente = '';
                      finished = '';
                      tit_item = 'Item '+ (i + 1);
                    }

                    if (response.items[i].rubro_name != null) {
                      data_rubro = `<span class="">${response.items[i].rubro_name.replace(/\b\w/g, l => l.toUpperCase())}</span>`;
                    } else {
                      data_rubro = '';
                    }

                    if ((response.items[i].archivos == null) || (response.items[i].archivos == '')) {
                      archivos = '';
                    } else {
                      archivos = `<img style="height: 27px; margin-right: 5px;" src="assets/images/icon/cam_ico_ots.png" class="photos_item" data-photos="${response.items[i].archivos}">`;
                    }

                    data_item +=  `<div style="position: relative">
                                      <div class="item_pedido `+class_pendiente+`" id_item="`+ response.items[i].id_orden_item +`" num_item="`+(i + 1)+`">
                                        <h5>`+tit_item+` <span id="img_several"></span></h5>
                                        ${data_rubro}
                                        <p>`+ response.items[i].descripcion +`</p>
                                      </div>
                                      <div class="caja_status_item">
                                        ${archivos}
                                        ${iPendiente}
                                        ${finished}
                                      </div>
                                    </div>`;

                    $('.all_items').html(data_item);

                  }
                  var img = '';
                  $('.photos_item').on('click', function() {
                    var src = $(this).attr('data-photos'),
                      caption = "Fotos item",
                      imgs = [];
                      src = src.split('>>');

                    src.forEach(function(photo, index) {
                      img = {
                        src: photo,
                        opts: {
                          caption: caption,
                        },
                      };
                      imgs.push(img);
                    });

                    $.fancybox.open(imgs, {loop : false});
                  })
                  $('#loader').css('display', 'none');
                  seePanel_infoPedido();
                  aceptEspontaneo();
                  
                } else {
                  var data_item =  `<p class="message_error">No hay items en ésta Orden de trabajo.</p>`;
                  $('.all_items').html(data_item);
                  $('#loader').css('display', 'none');
                  seePanel_infoPedido();
                  open_modals();
                }
              } else {
                console.log("error response ajax -> get_items.php");
              }
            },
            error: function() {
              console.log('error ajax -> get_items.php');
              $('#loader').css('display', 'none');
              errC();
            }
          });
        } else {
          console.log("error response ajax get_items.php");
        }
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR + "-" + textStatus + "-" + error);
      }
    });
    $('#back_pedidos').off('click');
    $('#back_pedidos').on('click', function() {
      seePanel_listPedidos();
    })
  })
}

function aceptEspontaneo() {
  $('#bt_aceptEjec').off('click').on('click', function() {
    $.ajax({
      url: "../api/update_ot_apro.php",
      type: "POST",
      dataType: "json",
      data: { 'id_orden': orden_id, 'apro': 'apro_cliente' },
      success: function(response) {
        if (response) {
          console.log(response);
          $('#loader').css('display', 'none');
          $('#modal_aprovEs').modal();       
          $('#bt_aceptEjec').css('display', 'none');
        } else {
          console.log("error response ajax");
        }
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR + "-" + textStatus + "-" + error);
        $('#loader').css('display', 'none');
        errC();
      }
    }); 
  })
}

function inputDate() {
  $('#in_date').valueAsDate = new Date();
}

function Order_client() {
  $('.btn-pedidoCliente').off('click').on('click', function() {
    $('#priority_rep2').val('normal');
    $('#tit_rep2').val('');
    $('#desc_rep2').val('');
    $(".btn_cot_ejc2").removeClass("active_bt");
    seePanel_listReplanteos();
  });
}

function getFileSrc(element) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var src =  e.target.result;
      // photos += src + '>>';
      resolve(src);
    }
    reader.readAsDataURL(element);
  })
}

function getEspontaneoFoto(photos) {
  return new Promise(function(resolve, reject) {
    var promises = [];

    var cant_files = photos.length;
    for (var x = 0; x < cant_files; x++) {
      promises.push(getFileSrc(photos[x]));
    }

    Promise.all(promises)
      .then(function(response) {
        resolve(response);
      });
  });
}

function get_locationClient() {
    var id_cliente = app.current_user.id;
    $('#loader').css('display', 'flex');
    var itemLocations_filter = `<span class="row_filter optionLocation" data-loc="">Todas</span>`
    $.ajax({
        url: "../api/get_locations.php",
        type: "GET",
        dataType: "json",
        data: { 'id_contacto': id_cliente },
        success: function(response) {
          $('#loader').css('display', 'none');
          if (response.success == true) {
            console.log(response.locations)
            response.locations.forEach(function(location, index) {
                itemLocations_filter += `<span class="row_filter optionLocation" data-loc="${location.id_locacion}">${location.nombre}</span>`;
            });
            $('#collapseLocation, #collapseLocationPres').html(itemLocations_filter);
            $('#bt_filterLocation span, #bt_filterLocationPres span').html('Todas');
            $('#bt_filterLocation span, #bt_filterLocatioPres span').attr('data-loc', '');
          }
        },
        error: function(jqXHR, textStatus, error) {
          console.log(jqXHR + "-" + textStatus + "-" + error);
          $('#loader').css('display', 'none');
          errC();
        }
    });
}

function get_ordersClient(response) {
    var data_order = '';
    var importancia = '';
    var txt_importancia = '';
    var pendiente = '';
    var back_ot = '';
    var class_eject = '';
    var status_esp = '';
    var btn_printOT = '';
    for (var i = 0; i < response.orders.length; i++) {

    if (type_otc == 'ot-espontaneo') {
        $('#otOrEsp').html('ESPONTANEOS');
    } else {
        $('#otOrEsp').html('MIS PEDIDOS');
    }

    if (response.orders[i].order_item_pendings == true) {
        pendiente = '<div class="item_pendiente"></div>';
    } else {
        pendiente = '';
    }

    if (response.orders[i].locacion_nombre == null) {
        response.orders[i].locacion_nombre = response.orders[i].direccion;
    }

    if (response.orders[i].locacion_direccion == null) {
        response.orders[i].locacion_direccion = response.orders[i].direccion;
    }

    if (response.orders[i].order_items > 0 && response.orders[i].order_items == response.orders[i].order_items_finished) {
        back_ot = '#e7e7e7';
        txt_importancia = 'Ejecutada <br> sin controlar';
        class_eject = 'ot_ejecutada';
        btn_printOT = '<button class="print_pedido" data-print="'+ response.orders[i].id_orden +'"><i class="fas fa-print"></i></button>';
    } else {
        btn_printOT = '';
        back_ot = '#fff';
        class_eject = 'div_ot_pedido';
        switch (response.orders[i].tipo) {
        case 'normal':
            importancia = '92d050';
            txt_importancia = 'Normal';
            break;
        case 'media':
            importancia = 'FFFF00';
            txt_importancia = 'Media';
            break;
        case 'alta':
            importancia = 'ff0000';
            txt_importancia = 'Alta';
            break;
        case 'critica':
            importancia = '7030A0';
            txt_importancia = 'Critica';
            break;
        default:
            importancia = '92d050';
            txt_importancia = '';
            break;
        }
    }

    if (response.orders[i].estado == "controlado" && response.orders[i].order_items > 0 && response.orders[i].order_items == response.orders[i].order_items_finished) {
      back_ot = '#e7e7e7';
      txt_importancia = 'Ejecutada';
      class_eject = 'ot_ejecutada';
      btn_printOT = '<button class="print_pedido" data-print="'+ response.orders[i].id_orden +'"><i class="fas fa-print"></i></button>';
    }

    if (type_otc == 'ot-espontaneo' && response.orders[i].apro_cliente == 'f') {
      status_esp = '<i style="color: #dc0000;" class="fas fa-check-circle esp_status"></i>';
    } else if (type_otc == 'ot-espontaneo' && response.orders[i].apro_cliente == 't'){
      status_esp = '<i style="color: green;" class="fas fa-check-circle esp_status"></i>';
    } else {
      status_esp = '';
    }
    
    var fecha_ot = ''
    if (response.orders[i].fecha == null) {
      fecha_ot = '';
    } else {
      fecha_ot = response.orders[i].fecha;
      fecha_ot = moment(fecha_ot).format('DD-MM-YYYY');
      var today = moment().format('DD-MM-YYYY');
      if ((class_eject == 'div_ot_pedido') && (fecha_ot < today)) {
        fecha_ot = '<span style="color: #ff3300">Vencida <br>'+ fecha_ot + '</span>' ;
      }
      else {
        fecha_ot = fecha_ot;
      }
    }  

    data_order +=  `<div style="background: ${back_ot}" class="${class_eject}" id="`+ response.orders[i].id_orden +`">
                        <p id="empresa_ot">`+ response.orders[i].apodo +`</p>
                        <p id="lugar_ot" style="max-width: 195px;">`+ response.orders[i].locacion_nombre +`</p>
                        
                        <p class="text_resaltado">`+ response.orders[i].descripcion +`</p>
                        <p id="cod_ot">OT `+ response.orders[i].id_ot +`</p>
                        <div class="caja_status">
                            <span style='margin-right: 5px; font-weight: 700;'>${txt_importancia}</span>
                            <div style="background: #${importancia};" class="iportancia_ot"></div>
                            ${pendiente}
                        </div>
                        ${btn_printOT}
                        <span id="date_otClient">${fecha_ot}</span>
                        ${status_esp}
                        
                    </div>`;
    $('.main-pedidosC').html(data_order);
    }

    $('.print_pedido').off('click').on('click', function() {
      var id_presup = $(this).attr('data-print') * 87;
      window.open("../pdfs/ordenes.php?io="+$(this).attr('data-print'));
    })
    $('#loader').css('display', 'none');
    seePanel_listPedidos();
}

function get_allPresupuestos(locations) {
  // var locations_pres = app.current_user.locations;
  var locations_pr = locations;
  var fechaPres = moment().subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
  $('#loader').css('display', 'flex');
  $.ajax({
    url: "../api/get_presupuestos.php",
    type: "GET",
    dataType: "json",
    data: { 'locaciones': locations_pr, 'fecha': fechaPres },
    success: function(response) {
      if (response.success == true) {
        $('#loader').css('display', 'none');
        console.log(response);
        var data_presu = '';
        for (var i = 0; i < response.presupuestos.length; i++) {
          var presupuesto_date = moment(response.presupuestos[i].fecha).format('DD-MM-YYYY');
          data_presu +=  `<div class="div_presupuesto" id="`+ response.presupuestos[i].id_presupuesto +`">
                            <p id="empresa_ot">`+ response.presupuestos[i].razon_social +`</p>
                            <p id="lugar_ot">`+ response.presupuestos[i].locacion_direccion +`</p>
                            
                            <p>`+ response.presupuestos[i].locacion_nombre +`</p>
                            <p class="text_resaltado">`+ response.presupuestos[i].titulo +`</p>
                            <span id="date_otClientUp">${presupuesto_date}</span>
                            <button class="print_pres" data-print="`+ response.presupuestos[i].id_presupuesto +`"><i class="fas fa-print"></i></button>
                          </div>`;                         
        }

        $('.main-presupuestos').html(data_presu);

        $('#loader').css('display', 'none');
        seePanel_listPresupuestos();
        $('.print_pres').off('click').on('click', function() {
          var id_presup = $(this).attr('data-print') * 87;
          window.open("../print_presupuesto.php?actionSet=1&v="+id_presup+"&selectID[]="+$(this).attr('data-print')+"&replanteo=true");
        })
      } else {
          $('.main-presupuestos').html('<p class="message_error">No hay presupuestos de trabajo para ver.</p>');
          $('#loader').css('display', 'none');
          seePanel_listPresupuestos();
      }
    },
    error: function(jqXHR, textStatus, error) {
      console.log(jqXHR + "-" + textStatus + "-" + error);
      $('#loader').css('display', 'none');
      errC();
    }
  });
}

function errC() {
  $('#loader').css('display', 'none');
  Snackbar.show({customClass: 'noti_style', pos: 'bottom-center', text: 'Error en la conexión', showAction: false, backgroundColor: '#d00000'});
}

function errA() {
  $('#loader').css('display', 'none');
  Snackbar.show({customClass: 'noti_style', pos: 'bottom-center', text: 'Hubo un problema, intentalo de nuevo.', showAction: false, backgroundColor: '#d00000'});
}

function errP(error) {
  $('#loader').css('display', 'none');
  Snackbar.show({customClass: 'noti_style', pos: 'bottom-center', text: error, showAction: false, backgroundColor: '#d00000'});
}


function sign_cliente() {
  $('.back_homeCliente').off('click').on('click', function() {
    seeIntro_cliente();
  })

  $("#check_codeOk").off('click').on('click',function(){ 
    var code_ot = $('#In_OtCode').val();
    $('#loader').css('display', 'flex');
    $.ajax({
      url: "../api/get_ejecucion.php",
      type: "GET",
      dataType: "json",
      data: { 'id_ejecucion': code_ot },
      success: function(response) {
        if (response.success) {
          show_resumenOt()          
          $('#loader').css('display', 'none');
          orden_id = response.ejecucion.id_orden;
          $('.conformidad_client').show();
          $('.firma_client, .resumen_finalOt').hide();

          $('#back_conformidadC').off('click').on('click', function () {
            $('.firma_client, .resumen_finalOt').hide();
            $('.conformidad_client').show();
          })
          
          $('input[name=conformidad]', '.main-conformidad').prop('checked',false);
          $('#final_coment').val('');
          seePanel_clientSign();
          $('#go_firmaCliente').off('click').on('click', function() {
            if ($('input[name=conformidad]:checked', '.main-conformidad').val() == undefined || $('#final_coment').val() == '') {
              Snackbar.show({customClass: 'noti_style', pos: 'bottom-left', text: 'Completá los campos para continuar', showAction: false, backgroundColor: '#d00000'});
            } else {
              $('.conformidad_client').css('display', 'none');
              $('.firma_client').css('display', 'flex');

              var wrapper = document.getElementById("signature-pad");
              var clearButton = wrapper.querySelector("[data-action=clear]");
              var canvas = wrapper.querySelector("canvas");
              var signaturePad = new SignaturePad(canvas, {
                backgroundColor: 'rgb(255, 255, 255)'
              });

              function resizeCanvas2() {

                var ratio =  Math.max(window.devicePixelRatio || 1, 1);

                canvas.width = canvas.offsetWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                canvas.getContext("2d").scale(ratio, ratio);

                signaturePad.clear();
              }

              resizeCanvas2();
              window.onresize = resizeCanvas2;

              clearButton.addEventListener("click", function (event) {
                signaturePad.clear();
              });

              signaturePad.penColor = "#1a57a2";

              $('#bt-finaliza-ot').off('click').on('click', function() {
                if (signaturePad.isEmpty()) {
                  Snackbar.show({customClass: 'noti_style', pos: 'bottom-left', text: 'Es necesaria su firma para continuar', showAction: false, backgroundColor: '#d00000'});
                } else {
      
                  var miCanvas = document.querySelector("#canvasFirma");
                  var miCanvasWidth = miCanvas.width;
                  var miCanvasHeight = miCanvas.height;
      
                  var newCanvas = document.createElement('canvas'); // creo nuevo canvas
                  newCanvas.width = miCanvasWidth;
                  newCanvas.height = miCanvasHeight;
      
                  var ctx = newCanvas.getContext('2d'); // false: si el navegadorno lo soporta.
      
                  //draw image to canvas. scale to target dimensions
                  ctx.drawImage(miCanvas, 0, 0, newCanvas.width, newCanvas.height);
      
                  var dataURI = newCanvas.toDataURL('img/png');
      
                  var comentario = $('#final_coment').val();
                  var valoracion = $('input[name=conformidad]:checked', '.main-conformidad').val();
                  var id_contactoSign = app.current_user.id;
                  
                  $('#loader').css('display', 'flex');
                  $.ajax({
                    url: "../api/update_ejecucion.php",
                    type: "POST",
                    dataType: "json",
                    data: { 'comentario': comentario, 'valoracion': valoracion, 'firma': dataURI, 'id_ejecucion': response.ejecucion.id_orden_ejecucion, 'id_contacto': id_contactoSign, 'estado': 'pendiente' },
                    success: function(response) {
                      $('#loader').css('display', 'none');
                      if (response.success) {
                        $('#modal_completeOt').modal();
                        $('#btn_completedOt').off('click').on('click', function() {
                          showSection(hideAllSections, 'intro-cliente');
                        }) 
                      } else {
                        console.log(response.error, response.sql);
                        errA();
                      }
                    },
                    error: function() {
                      console.log('error ajax -> exec_ot.php -> status ot');
                      $('#loader').css('display', 'none');
                      errC();
                    }
                  });
                } 
              })
            }
          })
          
        } else {
          $('#loader').css('display', 'none');
          Snackbar.show({customClass: 'noti_style', pos: 'bottom-left', text: 'Ingrese un codigo válido para continuar.', showAction: false, backgroundColor: '#d00000'});
          console.log(response.error, response.sql)
        }
      },
      error: function() {
        console.log('error ajax -> get_ejecucion.php');
        $('#loader').css('display', 'none');
        errC();
      }
    });

    
  });
}
