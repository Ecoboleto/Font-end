let listar_recinto_evento = async () => {
    let lista_recinto_evento;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-recinto-evento',
        responseType: 'json',
    })
        .then(function (res) {
            lista_recinto_evento = res.data.recintos;
        })
        .catch(function (error) {
            console.log(error);
        });
    return lista_recinto_evento;
};


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



let registrar_evento = async (nombre_evento, tipo_evento, foto_evento, recinto_evento, descripcion_evento, entrada_evento, asistentes_evento, limite_evento, fechas, impuestos, descuentos) => {
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-evento',
            responseType: 'json',
            data: {
                nombre_evento,
                tipo_evento,
                foto_evento,
                recinto_evento,
                descripcion_evento,
                entrada_evento,
                asistentes_evento,
                limite_evento,
                fechas,
                impuestos,
                descuentos
            }

        })


        .then(function (res) {
            if (res.data.resultado) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro realizado con éxito',
                    text: 'El tipo de evento ha sido almacenado',
                    confirmButtonText: 'Entendido'
                });

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'No se pudo registrar el evento, nombre del evento ya existe',
                    confirmButtonText: 'Entendido'
                });
            }
        })
        .catch(function (error) {

            Swal.fire({
                icon: 'warning',
                title: 'No se puede conectar con el servidor',
                confirmButtonText: 'Entendido'
            });
            console.log(error);

        })
};

let listar_evento = async () => {
    let lista_evento;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-evento',
        responseType: 'json',
    })
    .then(function(res){
        lista_evento = res.data.eventos;
    })
    .catch(function (error) {
        console.log(error);
    });
    return lista_evento;
};

let obtener_evento_id = async(pid) => {
    try {

        const response = await axios({
            method: 'get',
            params: { _id: pid },
            url: 'http://localhost:3000/api/obtener-evento-id',
            responseType: 'json'
        });

        return response.data.eventos;
    } catch (error) {
        console.log(error);
    }
};