'use strict';

let listar_impuestos = async()=>{
    let lista_impuestos;
    await axios ({
         method: 'get',
         url: 'http:localhost:3000/api/registrar-impuesto',
         responseType: 'json'
     })
     .then(function(res){
        lista_impuestos = res.data.impuestos;
        console.log(lista_impuestos);
     })
     .catch(function(error){
         console.log(error);
         Swal.fire({
            title: 'Error de conexión en el servicio de la nube',
            text: 'Inténtalo más tarde o puedes revisar la conexión. Gracias',
            confirmButtonText: 'ok!'
        })
     });
     return lista_impuestos;
 };