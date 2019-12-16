'use strict';

let registrarDatosDeLosDescuentos = async (nombre, porcentaje, estado) => {
    nombre = nombre.toLowerCase();
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-descuento',
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



