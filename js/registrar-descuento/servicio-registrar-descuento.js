'use strict';

let registrarDatosDeLosImpuestos = async (id_codigo, nombre, porcentaje) => {
    //id_codigo = 'imp-' + id_codigo;
    console.log(id_codigo, nombre, porcentaje);
    await axios({
        method: 'post',
        url: 'http:localhost:3000/Backend/registrar-descuento',
        //body
        data: {
            id_codigo: id_codigo,
            nombre: nombre,
            porcentaje: porcentaje
        }
    }
    )
        .then(function (res) {
            let banderaError = false;
            //console.log(res.data);
            //console.log(res.data.Impuesto.nombre);


            Swal.fire({
                title: res.data.value,
                text: 'en el sistema',
                icon: 'success',
                confirmButtonText: 'ok!'
            })
        })
        .catch(function (error) {
            console.log(error);
        });
};





let consultar_ultimo_codigo = async (inptNombre, inptPorcentaje) => {
    let ultimo_numero;
    let lista_impuestos;
    let id_nuevo_asignado;
    let varNombreRepetido = document.querySelector("#inpt-nombre").value;
    let banderaErrorDatoRepetido;

    await axios({
        method: 'get',
        url: 'http:localhost:3000/Backend/registrar-descuento',
        responseType: 'json'
    })
        .then(function (res) {
            
            lista_impuestos = res.data.productos;
        
            for(let i=0; i<lista_impuestos.length;i++){
                if(varNombreRepetido == lista_impuestos[i]['nombre']){
                    //console.log('repetido');
                    Swal.fire({
                        title: 'Ha ocurrido un pequeño error(dato repetido).',
                        text: 'Existe un mismo nombre dentro del sistema.',
                        icon: 'error',
                        confirmButtonText: 'ok!'
                    })
                    banderaErrorDatoRepetido = true;
                    return;
                }
            }


            //console.log(lista_impuestos.length);

            if (lista_impuestos.length != 0) {

                ultimo_numero = Number(lista_impuestos[lista_impuestos.length - 1]['id_codigo'].charAt(0));
                id_nuevo_asignado = String(ultimo_numero + 1);
                //console.log(lista_impuestos);
                //console.log(id_nuevo_asignado);
                //console.log(res.data.resultado);
                //console.log(varNombreRepetido);



                   
                 
                    registrarDatosDeLosImpuestos(id_nuevo_asignado, inptNombre, Number(inptPorcentaje));
                    Swal.fire({
                        title: 'Datos registrados',
                        text: 'en el sistema',
                        icon: 'success',
                        confirmButtonText: 'ok!'
                    })
                

            }
            if (lista_impuestos.length == 0) {

                    registrarDatosDeLosImpuestos('1', inptNombre, Number(inptPorcentaje));
                    Swal.fire({
                        title: 'Datos registrados',
                        text: 'en el sistema',
                        icon: 'success',
                        confirmButtonText: 'ok!'
                    })
                

            }
        })
        .catch(function (error) {
            console.log(error);
            Swal.fire({
                title: 'Error de conexión en el servicio de la nube',
                text: 'Inténtalo más tarde o puedes revisar la conexión. Gracias',
                confirmButtonText: 'ok!'
            })

        });
    return ultimo_numero;
};
