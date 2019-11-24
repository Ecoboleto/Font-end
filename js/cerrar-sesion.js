'use strict';
const input_cerrar_sesion = document.querySelector('#cajon-superior > nav > a');

const cerrar_sesion = () => {
    window.localStorage.clear();
    window.location = "http://127.0.0.1:5500/";
}

const sesion_inautorizada = () => {
    let valor = localStorage.removeItem('usuario_id');
    if (valor == '' || valor == undefined || valor == null) {
        window.localStorage.clear();
        window.location = "http://127.0.0.1:5500/";
    };
}

input_cerrar_sesion.addEventListener('click', cerrar_sesion);
sesion_inautorizada();