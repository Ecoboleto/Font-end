'use strict'



let getEdad = (fecha_nacimiento) => {

    let hoy = new Date();
    let fechaNacimiento = new Date(fecha_nacimiento);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad = edad - 1;
    }
    return edad;
}


let registrar_usuario_final = async (correo, primer_nombre, segundo_nombre, primer_apellido,
    segundo_apellido, fecha_nacimiento, edad, provincia, canton, distrito, genero, avatar) => {

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-usuarios-finales',
        responseType: 'json',
        data: {
            correo: correo,
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            fecha_nacimiento: fecha_nacimiento,
            edad: edad,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            genero: genero,
            avatar: avatar
        }
    }
    ).then(function (res) {
        if (res.data.resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Registro realizado con éxito',
                text: 'La información ha sido almacenada',
                confirmButtonText: 'Entendido'
            }).then(function(){
                window.location.href = '../index.html';
            });

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'No se pudo registrar el correo electrónico ya existe',
                confirmButtonText: 'Entendido'
            });
        }
    }).catch(function (error) {
        
        Swal.fire({
            icon: 'warning',
            title: 'No se puede conectar con el servidor',
            confirmButtonText: 'Entendido'
        });
        console.log(error);
    });
};

let listar_usuarios_finales = async () => {
    let lista_usuarios_finales;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-filtrar-usuario-final',
        responseType: 'json'
    }).then(function (res) {

        lista_usuarios_finales = res.data.clientes;

    }).catch(function (error) {

        console.log(error);

    });

    return lista_usuarios_finales;
};



let obtener_cliente_id = async(_id) => {
    try {
 
        const response = await axios({
            method: 'get',
            params: { _id: _id },
            url: 'http://localhost:3000/api/listar-usuario-final-id',
            responseType: 'json'
        });
 
        return response.data.cliente;
    } catch (error) {
        console.log(error);
    }
};

let modificar_usuario_final = async (primer_nombre, segundo_nombre, primer_apellido,
    segundo_apellido, fecha_nacimiento, edad, provincia, canton, distrito, genero, avatar) => {

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/modificar-usuarios-finales',
        responseType: 'json',
        data: {
            
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            fecha_nacimiento: fecha_nacimiento,
            edad: edad,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            genero: genero,
            avatar: avatar
        }
    }
    ).then(function (res) {
        if (res.data.resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Información actualizada con éxito',
                text: 'La información ha sido modificada',
                confirmButtonText: 'Entendido'
            })
        } 
    }).catch(function (error) {
        
        Swal.fire({
            icon: 'warning',
            title: 'No se puede conectar con el servidor',
            confirmButtonText: 'Entendido'
        });
        console.log(error);
    });
};