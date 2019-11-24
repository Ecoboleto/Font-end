'use strict';

let registrar_organizador_eventos = async (nombre_empresa, logo, tipo_cedula, cedula_empresa, nombre_comercial, annos_experiencia, provincia, canton, distrito, direccion_exacta, nombre_completo, correo_electronico, edad, genero_respuesta, aTelefonos) => {
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-organizador-evento',
            responseType: 'json',
            data: {
                nombre_empresa,
                log: logo,
                tipo_cedula,
                cedula: cedula_empresa,
                nombre_comercial,
                anos_experiencia: annos_experiencia,
                provincia,
                canton,
                distrito,
                direccion_exacta,
                nombre_completo,
                correo_electronico,
                edad,
                genero:genero_respuesta,
                telefonos:aTelefonos
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