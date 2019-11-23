'use strict';

const otro_radio = document.querySelector('#txt_otro');
const otro_respuesta = document.querySelector('#txt_otro_respuesta');

const escucha_opcion_otro = () => {
    if(otro_radio.checked){
        otro_respuesta.classList.remove('d-none')
        otro_respuesta.classList.add('d-bloque');
    }
};

otro_radio.addEventListener('checked', escucha_opcion_otro);