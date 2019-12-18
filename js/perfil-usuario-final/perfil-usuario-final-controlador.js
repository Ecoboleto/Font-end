'use strict';

const input_correo = document.querySelector('#txt_correo');
const input_contrasenna = document.querySelector('#txt_contrasenna')
const input_primer_nombre = document.querySelector('#txt_primer-nombre');
const input_segundo_nombre = document.querySelector('#txt_segundo-nombre');
const input_primer_apellido = document.querySelector('#txt_primer-apellido');
const input_segundo_apellido = document.querySelector('#txt_segundo-apellido');
const input_fecha_nacimiento = document.querySelector('#txt_fecha-nacimiento');
const p_edad = document.querySelector('#txt_edad');
const input_provincia = document.querySelector('#provincias');
const input_canton = document.querySelector('#cantones');
const input_distrito = document.querySelector('#distritos');
let input_genero = document.querySelector('#txt_genero');
const btn_editar = document.querySelector('#btn-editar');
const avatar_usuario = document.querySelector('#imgAvatar');
let input_femenino = document.querySelector('#txt_mujer');
let input_masculino = document.querySelector('#txt_hombre');
let input_otro = document.querySelector('#txt_otro');

let edad;

input_correo.disabled = true;
//input_edad.disabled = true; 


let idusuariofinal = window.localStorage.getItem('usuario_id'); 

console.log(idusuariofinal); 

let llenarinformacion = async() => {
 
    let usuariofinal =  await obtener_cliente_id(idusuariofinal);

   
    console.log(usuariofinal);


    avatar_usuario.src = usuariofinal['avatar'];
    input_contrasenna.value = usuariofinal['contrasenna'];
    input_correo.value = usuariofinal['correo_electronico'];
    input_primer_nombre.value = usuariofinal['primer_nombre'];
    input_segundo_nombre.value = usuariofinal['segundo_nombre'];
    input_primer_apellido.value = usuariofinal['primer_apellido'];
    input_segundo_apellido.value = usuariofinal['segundo_apellido'];
    input_fecha_nacimiento.value = usuariofinal['fecha_nacimiento'];
    p_edad.innerHTML = `Edad:${usuariofinal['edad']}`
    input_provincia.value = usuariofinal['provincia'];
    input_canton.value = usuariofinal['canton'];
    input_distrito.value = usuariofinal['distrito'];
    input_genero = usuariofinal['genero'];
    
    switch (input_genero) {
        case "Hombre":
            input_masculino.checked = true;
            break;
        case "Mujer":
            input_femenino.checked = true;
            break;
        case "Otro":
            input_otro.checked = true;
            break;
        default:
            input_no_especificar.value = genero;
            break;
    }
    

}

let obtener_datos = () => {
    
    let primer_nombre = input_primer_nombre.value;
    let segundo_nombre = input_segundo_nombre.value;
    let primer_apellido = input_primer_apellido.value;
    let segundo_apellido = input_segundo_apellido.value;
    let fecha_nacimiento = input_fecha_nacimiento.value;
    edad = getEdad(input_fecha_nacimiento.value);
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let genero = input_genero.value;
    let avatar = avatar_usuario.src;


    if (!validar_edad(edad)) {

        Swal.fire({
            icon: 'warning',
            title: 'Datos incorrectos',
            text: 'Un menor de edad no puede ingresar dentro de la plataforma',
            confirmButtonText: 'Entendido'
        })
    } else {
        try {

            modificar_usuario_final(idusuariofinal,primer_nombre, segundo_nombre, primer_apellido,
                segundo_apellido, fecha_nacimiento, edad, provincia, canton, distrito, genero, avatar);

                
            } catch (error) {    
        }
    }
};

if(idusuariofinal){
    llenarinformacion(); 
}else{
    console.log('datos vacios');
}



btn_editar.addEventListener('click', obtener_datos);
