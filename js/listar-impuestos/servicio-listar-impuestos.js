'use strict';

let listar_impuestos = async () => {
    let lista_impuestos;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-impuestos',
        responseType: 'json',
    })
        .then(function (res) {
            lista_impuestos = res.data.impuestos;
        })
        .catch(function (error) {
            console.log(error);
        });
    return lista_impuestos;
 };
 
 let obtener_impuesto_id = async (pid)=>{
     try{
         const response = await axios ({
             method:'get',
             params:{_id:pid},
             url: 'http://localhost:3000/api/modificar-impuesto-id',
             responseType:'json'
         });
         return response.data.impuesto;
     }catch(error){
         console.log(error);
     }
 }
 
 let editar_impuesto = async(id,inptNombre, inptPorcentaje, estado)=>{
     await axios({
         method:'post',
         url:'http://localhost:3000/api/modificar-impuesto',
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
                 location.href='listar-filtrar-impuestos.html';
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
 let editar_estado_impuesto = async(id,inptNombre, inptPorcentaje, estado)=>{
    await axios({
        method:'post',
        url:'http://localhost:3000/api/modificar-estado-impuesto',
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