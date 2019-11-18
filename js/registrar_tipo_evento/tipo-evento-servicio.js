'use strict';

let registrar_tipo_evento = async (tipo_evento) => {
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-tipo-evento',
            responseType: 'json',
            data: {
                tipo_evento: tipo_evento,
            }

        }
    )
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
                    title: 'No se pudo registrar el tipo de evento, el nombre ya existe',
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

let listar_tipo_evento = async () => {
    let lista_tipo_evento;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-tipo-evento',
        responseType: 'json',
    })
    .then(function(res){
        lista_tipo_evento = res.data.tipos_eventos;
    })
    .catch(function (error) {
        console.log(error);
    });
    return lista_tipo_evento;
};