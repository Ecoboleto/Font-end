'use strict';

let listar_usuarios = async()=>{
    let lista_productos;
    await axios ({
         method: 'get',
         url: 'http:localhost:8000/Backend/registrar-descuento',
         responseType: 'json'
     })
     .then(function(res){
        lista_productos = res.data.productos;
        console.log(lista_productos);
     })
     .catch(function(error){
         console.log(error);
         Swal.fire({
            title: 'Error de conexión en el servicio de la nube',
            text: 'Inténtalo más tarde o puedes revisar la conexión. Gracias',
            confirmButtonText: 'ok!'
        })
     });
     return lista_productos;
 };