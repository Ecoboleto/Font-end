'use strict';

let registrarDatosDeLosImpuestos = async (nombre, porcentaje, estado) => {
    //id_codigo = 'imp-' + id_codigo;
    nombre = nombre.toLowerCase();
    await axios({
        method: 'post',
        url: 'http:localhost:3000/api/registrar-descuento',
        //body
        data: {
            nombre: nombre,
            porcentaje: porcentaje,
            estado: 'activo'
        }
    }
    )
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
            console.log(error);
        });
};





let consultar_ultimo_codigo = async (inptNombre, inptPorcentaje, estado) => {
    let ultimo_numero;
    let lista_descuentos;
    let id_nuevo_asignado;
    let varNombreRepetido = document.querySelector("#inpt-nombre").value;
    let banderaErrorDatoRepetido;

    await axios({
        method: 'get',
        url: 'http:localhost:3000/api/registrar-descuento',
        responseType: 'json'
    })
        .then(function (res) {
            
            lista_descuentos = res.data.descuentos;
        
            for(let i=0; i<lista_descuentos.length;i++){
                if(varNombreRepetido == lista_descuentos[i]['nombre'] || inptNombre.toLowerCase() == lista_descuentos[i]['nombre']){
                    //console.log('repetido');
                    Swal.fire({
                        title: 'Ha ocurrido un pequeño error(dato repetido).',
                        text: 'Existe un mismo nombre dentro del sistema.',
                        icon: 'error',
                        confirmButtonText: 'ok!'
                    })
                    banderaErrorDatoRepetido = true;
                }
            }


            //console.log(lista_descuentos.length);

            if (lista_descuentos.length != 0) {
                if (banderaErrorDatoRepetido != true) {
                    registrarDatosDeLosImpuestos(inptNombre, Number(inptPorcentaje), estado);
                    Swal.fire({
                        title: 'Datos registrados',
                        text: 'en el sistema',
                        icon: 'success',
                        confirmButtonText: 'ok!'
                    })
                }

            }
            if (lista_descuentos.length == 0) {

                    registrarDatosDeLosImpuestos(inptNombre, Number(inptPorcentaje), estado);
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
