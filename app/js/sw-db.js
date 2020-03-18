'use strict'

// Logica para almacenar en el IndexDB

// creo la base de datos en el INDEXDB
const db = new PouchDB('mensajes-twittor');

function guardarMensaje(mensaje){
    mensaje._id = new Date().toISOString();
    
    return db.put(mensaje).then(() => {
        
        console.log('mensaje guardado para posterior posteo.');
        
        self.registration.sync.register('nuevo-post'); // registramos la tarea.

        // le paso esta resp al frontend para avisar que esta offline.
        const newResp = {
            ok: true,
            offline: true
        };

        return new Response(JSON.stringify(newResp)); // creamos una nueva respuesta

    });
};


// Posteamos mensajes a la API
function postearMensajes(){

    const posteos = [];

    return db.allDocs({ include_docs: true }).then(docs => {

        docs.rows.forEach(row => {
            const doc = row.doc;

            const fetchProm = fetch('api',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(doc)
            })
            .then(res => {
                // realizo el POSTEO.
                return db.remove(doc); // limpio la indexDB
            })
            .catch(err => {
                console.log('Error al postear mensaje', err);
            });

            posteos.push(fetchProm); // hay que esperar a que todas estas promesas terminen

        }); // fin foreach

        return Promise.all(posteos);
    });
}