'use strict'

// let getAge = (fecha_nacimiento) => {
//     let today = new Date();
//     let birthDate = new Date(fecha_nacimiento);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     let m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age = age - 1;
//     }

//     return age;

//     console.log(age);

// }


let registrar_usuario_final = async(correo, primer_nombre, segundo_nombre, primer_apellido,
    segundo_apellido, fecha_nacimiento, provincia, canton, distrito, genero) => {

    await axios({

                method: 'post',
                url: 'http://localhost:3000/api/registrar-usuario-final', 
                responseType: 'json',

                //falta pasarle la edad y el codigo de la contraseña
                data: {
                    correo: correo,
                    primer_nombre: primer_nombre,
                    segundo_nombre: segundo_nombre,
                    primer_apellido: primer_apellido,
                    segundo_apellido: segundo_apellido,
                    fecha_nacimiento: fecha_nacimiento,
                    provincia: provincia,
                    canton: canton,
                    distrito: distrito,
                    genero: genero,
                    // edad: edad
                }

            }


        ).then(function(res) {
            console.log(res.data);
        })
        .catch(function(error) {
            console.log(error);
        });
};

let listar_usuarios_finales = async() => {
    let lista_usuarios_finales;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-filtrar-usuario-final',
        responseType: 'json'
    })

    .then(function(res) {


        lista_usuarios_finales = res.data.clientes;

    })

    .catch(function(error) {
        console.log(error);
    });

    return lista_usuarios_finales;
};