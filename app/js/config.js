'use strict'

const PRODUCTION = false;
let url; // url proyecto
var swLocation = '/clientes/mecsrl/app/sw.js'; // url del service worker

if(PRODUCTION){
    url = 'http://localhost/clientes/mecsrl/app/'; // cambiar
}else{
    url = 'http://localhost/clientes/mecsrl/app/';
}