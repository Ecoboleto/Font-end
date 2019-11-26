'use strict'; 


const tbody = document.querySelector('#tbl-usuarios-finales tbody');
const input_filtro = document.querySelector('#filtro');




let llenar_tabla = async() => {

    let filtro = input_filtro.value.toLowerCase();
    let lista_usuarios_finales = await listar_usuarios_finales();


    tbody.innerHTML = '';

    for (let i = 0; i < lista_usuarios_finales.length; i++) {
        let nombre = lista_usuarios_finales[i]['primer_nombre'].toLowerCase();
        let correo = lista_usuarios_finales[i]['correo_electronico'].toLowerCase();
        let tipo_usuario = lista_usuarios_finales[i]['tipo_usuario'];
        if ((nombre.includes(filtro) || correo.includes(filtro))  ) {

            let fila = tbody.insertRow();

            fila.insertCell().innerHTML = lista_usuarios_finales[i]['correo_electronico']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['primer_nombre']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['segundo_nombre']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['primer_apellido']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['segundo_apellido']
            fila.insertCell().innerHTML =  lista_usuarios_finales[i]['fecha_nacimiento']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['edad']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['provincia']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['canton']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['distrito']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['genero']
            
            let celdaImagen = fila.insertCell();


            let avatar = document.createElement('img'); 
            avatar.classList.add('avatar')
            if(lista_usuarios_finales[i]['avatar']){
                avatar.src = lista_usuarios_finales[i]['avatar']; 
            }else{
                avatar.src = '../imgs/avatar.jpg';
            }

            celdaImagen.appendChild(avatar);
        

        }
    };

};

llenar_tabla();
input_filtro.addEventListener('keyup', llenar_tabla);