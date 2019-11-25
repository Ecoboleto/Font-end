'use strict'

const input_correo = document.querySelector('#txt_correo');
const btn_enviar = document.querySelector('#btn-contrasenna');

const validar_correo = (correo) => {
    let error = false;

    input_correo.classList.remove('input--error');

    if (validar_vacio_null(correo)) {
        error = true;
        input_correo.classList.add('input--error');
    }
    return error; 
}; 

let recuperar_contrasenna = () => {
    let correo = input_correo.value; 

    if (validar_correo(correo) ) {
       Swal.fire({
           icon: 'warning',
           title: 'Algunos de los campos se encuentran incorrectos',
           text: 'Por favor revise los campos en rojo',
           confirmButtonText: 'Entendido'
       })
   } else {
       enviar_contrasenna(correo);
    }
};

btn_enviar.addEventListener('click', recuperar_contrasenna); 
