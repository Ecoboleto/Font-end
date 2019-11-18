'use strict';

// Variables de los input y botón de registrar
const input_tipo_evento = document.querySelector('#txt_tipo_evento');
const btn_registrar = document.querySelector('#btn_registrar');

//Funcion de validar
let validar = () => {
    let error = false;

    let regex_letras_numeros = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ0-9]+$/;

    if (input_tipo_evento.value == '' || regex_letras_numeros.test(input_tipo_evento.value) == false) {
        error = true;
        input_tipo_evento.classList.add('error');
    } else {
        input_tipo_evento.classList.remove('error');
    }

    return error;
};

const resetear = () => {
    input_tipo_evento.value = "";
}

//Funcion de obtener datos
let obtenerTipoEvento = async () => {
    let tipo_evento = input_tipo_evento.value;

    //Si hay error entra al if
    if (validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Los espacios requeridos se encuentran en blanco o tienen un caracter no permitido',
            text: 'Por favor revise la informacion ingresada',
            confirmButtonText: 'Entendido'
        });

    } else {
        await registrar_tipo_evento(tipo_evento);
        resetear();
    };
};

//Eventos asociados a los botones o inputs
btn_registrar.addEventListener('click', obtenerTipoEvento);