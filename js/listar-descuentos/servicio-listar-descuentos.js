'use strict';

let listar_descuentos = async()=>{
    let lista_descuentos;
    await axios ({
         method: 'get',
         url: 'http:localhost:3000/api/registrar-descuento',
         responseType: 'json'
     })
     .then(function(res){
        lista_descuentos = res.data.descuentos;
        //console.log(lista_descuentos);
     })
     .catch(function(error){
        //console.log(error);
         Swal.fire({
            title: 'Error de conexión en el servicio de la nube',
            text: 'Inténtalo más tarde o puedes revisar la conexión. Gracias',
            confirmButtonText: 'ok!'
        })
     });
     return lista_descuentos;
 };