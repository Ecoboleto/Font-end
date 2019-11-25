'use strict';

const input_correo = document.querySelector('#txt_correo');
const btn_enviar = document.querySelector('#btn-contrasenna');

const validar_correo = (correo) => {
    let error = false;

    input_correo.classList.remove('input--error');

    if (!validar_vacio_null(correo)) {
        error = true;
        input_correo.classList.add('input--error');
    }
    return error; 
}; 

let recuperar_contrasenna = () => {
    const correo = input_correo.value; 

    if (validar_correo(correo) ) {
       Swal.fire({
           icon: 'warning',
           title: 'Algunos de los campos se encuentran incorrectos',
           text: 'Por favor revise los campos en rojo',
           confirmButtonText: 'Entendido'
       })
   } else {

        if(enviar_contrasenna(correo)) {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña recuperada',
                text: 'Revise su correo electrónico.',
                confirmButtonText: 'Entendido'
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Correo incorrecto',
                text: 'El correo electrónico ingresado no se encuentra ' +
                'en nuestra base de datos',
                confirmButtonText: 'Entendido'
            })
        }
      
    }
};

btn_enviar.addEventListener('click', recuperar_contrasenna); 
