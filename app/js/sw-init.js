'use strict'

const isOnline = ()=>{
    if(navigator.onLine) {
        alerts('success', '&#128077 La APP está ONLINE');
    }else {
        alerts('info', '&#128078 La APP está funcionando OFFLINE');
    }
}

// comprobamos conexión a internet!
window.addEventListener('onLine', isOnline);
window.addEventListener('offLine', isOnline);
isOnline();

// agregamos el SW.
if ( navigator.serviceWorker ) {

    console.log('%c [SW]: Se quiere agregar el SW', 'color: orange');

    if (url.includes('localhost') ) {
        swLocation = './sw.js';
    }

    navigator.serviceWorker.register( swLocation );
    console.log('%c [SW]: Se agregó el Service Worker', 'color: lime');
}