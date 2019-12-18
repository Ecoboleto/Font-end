let listar_organizador_evento = async () => {
    let lista_organizadores;
    
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-organizador-evento',
        responseType: 'json',
    })
    .then(function(res){
        lista_organizadores = res.data.datos;
    })
    .catch(function (error) {
        console.log(error);
    });
    return lista_organizadores;
};

// let obtener_organizador_id = async(_id) => {
//     try {
 
//         const response = await axios({
//             method: 'get',
//             params: { _id: _id },
//             url: `http://localhost:3000/api/listar-organizador-evento-id`,
//             responseType: 'json'
//         });
 
//         console.log(response);
        
//         return response.data.organizador;
//     } catch (error) {
//         console.log(error);
//     }
// };

const getEdad = (fecha_nacimiento) => {
    let aFecha_actual = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
    let aFecha_nacimiento = [new Date(fecha_nacimiento).getFullYear(), new Date(fecha_nacimiento).getMonth() + 1, new Date(fecha_nacimiento).getDate() + 1];
    let edad = aFecha_actual[0] - aFecha_nacimiento[0];
    let mes = aFecha_actual[1] - aFecha_nacimiento[1];

    if (mes < 0 || (mes === 0 && aFecha_actual[2] < aFecha_nacimiento[2])) {
        edad = edad - 1;
    }
    return edad;
}

let obtener_organizador_id = async(_id) => {
    // console.log(_id);
    
    let lista_organizadores;
    
    await axios({
        method: 'get',
        params: { _id: _id },
        url: 'http://localhost:3000/api/listar-organizador-evento-id',
        responseType: 'json',
    })
    .then(function(res){
        // console.log(res.data.organizador_evento);
        
        lista_organizadores = res.data.organizador_evento;
    })
    .catch(function (error) {
        console.log(error);
    });
    return lista_organizadores;
}

let modificar_organizador_eventos = async (id, nombre_empresa, logo, nombre_comercial, annos_experiencia, direccion_exacta, nombre_completo, correo_electronico, genero_respuesta, aTelefonos) => {
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/modificar-organizador-evento',
            responseType: 'json',
            data: {
                _id: id,
                nombre_empresa,
                log: logo,
                nombre_comercial,
                anos_experiencia: annos_experiencia,
                direccion_exacta,
                nombre_completo,
                correo_electronico,
                genero: genero_respuesta,
                telefonos: aTelefonos
            }
        }
    ).then(function (res) {
        if (res.data.estado) {
            Swal.fire({
                icon: 'success',
                title: 'Registro realizado con éxito',
                text: 'El organizador de eventos ha sido almacenado',
                confirmButtonText: 'Entendido',
                onAfterClose: () => {
                    window.location.href = "/vistas/listar-organizador-eventos.html";
                }
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro realizado con éxito',
                text: 'El organizador de eventos ha sido almacenado',
                confirmButtonText: 'Entendido',
                onAfterClose: () => {
                    window.location.href = "/vistas/listar-organizador-eventos.html";
                }
            });
        }
    }).catch(function (error) {
        Swal.fire({
            icon: 'warning',
            title: 'No se puede conectar con el servidor',
            confirmButtonText: 'Entendido'
        });
        console.log(error);
    })
};