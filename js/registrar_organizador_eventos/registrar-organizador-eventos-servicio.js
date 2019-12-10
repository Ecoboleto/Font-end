'use strict';

const getEdad = (fecha_nacimiento) => {
    let aFecha_actual = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
    let aFecha_nacimiento = [new Date(fecha_nacimiento).getFullYear(), new Date(fecha_nacimiento).getMonth() + 1, new Date(fecha_nacimiento).getDate()+1];
    let edad = aFecha_actual[0] - aFecha_nacimiento[0];
    let mes = aFecha_actual[1] - aFecha_nacimiento[1];
    
    if (mes < 0 || (mes === 0 && aFecha_actual[2] < aFecha_nacimiento[2])) {
        edad = edad - 1;
    }
    return edad;
}

let registrar_organizador_eventos = async (nombre_empresa, logo, tipo_cedula, cedula_empresa, nombre_comercial, annos_experiencia, provincia, canton, distrito, direccion_exacta, nombre_completo, correo_electronico, fecha_nacimiento, genero_respuesta, aTelefonos) => {    
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
                fecha:fecha_nacimiento,
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
                    text: 'El organizador de eventos ha sido almacenado',
                    confirmButtonText: 'Entendido'
                });

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'No se pudo registrar el organizador de eventos, el correo electrónico ya existe',
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