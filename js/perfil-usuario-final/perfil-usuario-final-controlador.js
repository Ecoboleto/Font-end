'use strict';

const input_correo = document.querySelector('#txt_correo');
const input_primer_nombre = document.querySelector('#txt_primer-nombre');
const input_segundo_nombre = document.querySelector('#txt_segundo-nombre');
const input_primer_apellido = document.querySelector('#txt_primer-apellido');
const input_segundo_apellido = document.querySelector('#txt_segundo-apellido');
const input_fecha_nacimiento = document.querySelector('#txt_fecha-nacimiento');
const input_edad = document.querySelector('#txt_edad');
const input_provincia = document.querySelector('#provincias');
const input_canton = document.querySelector('#cantones');
const input_distrito = document.querySelector('#distritos');
const input_genero = document.querySelector('.txt_genero');
const btn_editar = document.querySelector('#btn-editar');
const avatar_usuario = document.querySelector('#imgAvatar');
const input_tipo_evento =  document.querySelector('#txt_tipo_evento');
const btn_tipo_evento = document.querySelector('#btn_tipoevento');
let edad;

input_correo.disabled = true;
//input_edad.disabled = true; 

let idusuariofinal = localStorage.getItem('usuario_id'); 



let llenarinformacion = async() => {
    let usuariofinal =  await obtener_cliente_id(idusuariofinal);

    console.log(usuariofinal);

input_correo.value = usuariofinal['correo'];
input_primer_nombre.value = usuariofinal['primer_nombre'];
input_segundo_nombre.value = usuariofinal['segundo_nombre'];
input_primer_apellido.value = usuariofinal['primer_apellido'];
input_segundo_apellido.value = usuariofinal['segundo_apellido'];
input_fecha_nacimiento.value = usuariofinal['fecha_nacimiento'];
input_edad.value = usuariofinal['edad'];
input_provincia.value = usuariofinal['provincia'];
input_canton.value = usuariofinal['canton'];
input_distrito.value = usuariofinal['distrito'];
input_genero.value = usuariofinal['genero'];
}

if(idusuariofinal){
    llenarinformacion(); 
}else{
    console.log('datos vacios');
}
