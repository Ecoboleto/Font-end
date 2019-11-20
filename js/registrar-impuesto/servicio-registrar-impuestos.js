'use strict';

let registrarDatosDeLosImpuestos = async (nombre, porcentaje, estado) => {
    //id_codigo = 'imp-' + id_codigo;
    //console.log(id_codigo, nombre, porcentaje);
    nombre = nombre.toLowerCase();
    await axios({
        method: 'post',
        url: 'http:localhost:3000/api/registrar-impuesto',
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





let consultar_nombre_repetido = async (inptNombre, inptPorcentaje,estado) => {
    let ultimo_numero;
    let lista_impuestos;
    let id_nuevo_asignado;
    let varNombreRepetido = document.querySelector("#inpt-nombre").value;
    let banderaErrorDatoRepetido;

    await axios({
        method: 'get',
        url: 'http:localhost:3000/api/registrar-impuesto',
        responseType: 'json'
    })
        .then(function (res) {

            lista_impuestos = res.data.impuestos;

            for (let i = 0; i < lista_impuestos.length; i++) {
                if (varNombreRepetido == lista_impuestos[i]['nombre'] || inptNombre.toLowerCase() == lista_impuestos[i]['nombre']) {
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


            //console.log(lista_impuestos.length);

            if (lista_impuestos.length != 0) {
                if (banderaErrorDatoRepetido != true) {
                    estado = 'activo';
                    registrarDatosDeLosImpuestos(inptNombre, Number(inptPorcentaje), estado);
                    Swal.fire({
                        title: 'Datos registrados',
                        text: 'en el sistema',
                        icon: 'success',
                        confirmButtonText: 'ok!'
                    })
                }
            }
            if (lista_impuestos.length == 0) {
                if (banderaErrorDatoRepetido != true) {
                    estado = 'activo';
                    registrarDatosDeLosImpuestos(inptNombre, Number(inptPorcentaje), estado);
                    Swal.fire({
                        title: 'Datos registrados',
                        text: 'en el sistema',
                        icon: 'success',
                        confirmButtonText: 'ok!'
                    })
                }
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
