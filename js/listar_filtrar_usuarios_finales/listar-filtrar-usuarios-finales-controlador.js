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
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['estado']
            fila.insertCell().innerHTML = lista_usuarios_finales[i]['genero']
            
            
            let celdaImagen = fila.insertCell();

            let btn_habilitar = document.createElement('button');
            btn_habilitar.innerHTML = '<i class="fas fa-eye"></i>';
            btn_habilitar.dataset._id = lista_usuarios_finales[i]['_id'];

            btn_habilitar.addEventListener('click', function(){
                localStorage.setItem('usuario_id', this.dataset._id)

                habilitar_usuario_final();
            });

            fila.insertCell().appendChild(btn_habilitar);



            let btn_deshabilitar = document.createElement('button'); 
            btn_deshabilitar.innerHTML = '<i class="fas fa-eye-slash"></i>';
            btn_deshabilitar.dataset._id = lista_usuarios_finales[i]['_id'];

            btn_deshabilitar.addEventListener('click', function(){
                localStorage.setItem('usuario_id', this.dataset._id)

                deshabilitar_usuario_final();
            });
              fila.insertCell().appendChild(btn_deshabilitar);



            let avatar = document.createElement('img'); 
            avatar.classList.add('avatar')
            if(lista_usuarios_finales[i]['avatar']){
                avatar.src = lista_usuarios_finales[i]['avatar']; 
            }else{
                avatar.src = '../imgs/avatar.jpg';
            }

            celdaImagen.appendChild(avatar);
        

            // const btn_habilitar = document.createElement('button');
            // btn_habilitar.type = 'button';
            // btn_habilitar.innerHTML = '<i class="fas fa-edit"></i>';
            // btn_habilitar.dataset._id = usuario._id;
        
            // fila.insertCell().appendChild(btn_habilitar);
        }
    };

};

llenar_tabla();
input_filtro.addEventListener('keyup', llenar_tabla);