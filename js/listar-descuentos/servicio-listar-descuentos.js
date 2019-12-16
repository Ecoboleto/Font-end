'use strict';

let listar_descuentos = async () => {
   let lista_descuentos;
   await axios({
       method: 'get',
       url: 'http://localhost:3000/api/listar-descuentos',
       responseType: 'json',
   })
       .then(function (res) {
           lista_descuentos = res.data.descuentos;
       })
       .catch(function (error) {
           console.log(error);
       });
   return lista_descuentos;
};

let obtener_descuento_id = async (pid)=>{
    try{
        const response = await axios ({
            method:'get',
            params:{_id:pid},
            url: 'http://localhost:3000/api/modificar-descuento-id',
            responseType:'json'
        });
        return response.data.descuento;
    }catch(error){
        console.log(error);
    }
}

let editar_descuento = async(id,inptNombre, inptPorcentaje, estado)=>{
    await axios({
        method:'post',
        url:'http://localhost:3000/api/modificar-descuento',
        responseType:'json',
        //body
        data:{
            id:id,
            nombre:inptNombre,
            porcentaje:inptPorcentaje,
            estado:estado
        }
    })
    .then(function(res){
        console.log(res.data);
        Swal.fire({
            type:'succes',
            title:'El producto fue modificado con éxito',
            confirmButtonText:'Entendido',
            onClose: function(){
                location.href='listar-filtrar-descuentos.html';
            }
        });
    })
    .catch(function(error){
        Swal.fire({
            title: 'Ha ocurrido un pequeño error',
            text: 'Al enviar los datos',
            icon: 'error',
            confirmButtonText: 'ok!'
        })
    });
}

let editar_estado_descuento = async(id,inptNombre, inptPorcentaje, estado)=>{
    await axios({
        method:'post',
        url:'http://localhost:3000/api/modificar-estado-descuento',
        responseType:'json',
        //body
        data:{
            id:id,
            nombre:inptNombre,
            porcentaje:inptPorcentaje,
            estado:estado
        }
    })
    .then(function(res){
        console.log(res.data);
    })
    .catch(function(error){
        console.log(error);
    });
}

