'use strict';

// Variables de los input y botón de registrar
const input_nombre = document.querySelector('#txt_nombre');
const input_numero = document.querySelector('#txt_numero');

const input_codigo = document.querySelector('#txt_codigo');
const btn_registrar = document.querySelector('#btn_registrar');

const validar = (pNombre, pNumero, pCodigo) => {
    let error = false;

    let regex_solo_letras = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/;
    let regex_solo_numeros = /^[0-9]$/;
    let regex_letras_numeros = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ0-9]+$/;


    //removemo la clase error  
    input_nombre.classList.remove('input--error');
    input_numero.classList.remove('input--error');
    input_codigo.classList.remove('input--error');


    if (regex_solo_letras.test(pNombre) == false || pNombre == '' || pNombre == undefined || pNombre == null) {
        error = true;
        input_nombre.classList.add('input--error');
    }

    if (regex_solo_numeros.test(pNumero) == false || pNumero == '' || pNumero == undefined || pNumero == null || pNumero == NaN) {
        error = true;
        input_numero.classList.add('input--error');
    }

    if (regex_letras_numeros.test(pCodigo) == false || pCodigo == '' || pCodigo == undefined || pCodigo == null) {
        error = true;
        input_codigo.classList.add('input--error');
    }

    return error;
};

// Función de registrar
const registrar_tarjeta = () => {
    let nombre = input_nombre.value;
    let numero = input_numero.value;
    let codigo = input_codigo.value;


    /*
        Amex Card: ^3[47][0-9]{13}$
        Mastercard: ^5[1-5][0-9]{14}$
        Visa Card: ^4[0-9]{12}(?:[0-9]{3})?$
        Visa Master Card: ^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$
    */

    if (validar(nombre, numero, codigo)) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran con valores incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });

    } else {



        Swal.fire({
            icon: 'success',
            title: 'Algunos de los campos se encuentran incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    }

};

//Select meses
const colocar_meses = () => {
    let min = 1;
    let max = 12;
    const select = document.querySelector('#txt_mes');

    for (let i = min; i <= max; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    };
}

//Select años
const colocar_anno = () => {
    let min = 2019;
    let max = 2030;
    let select = document.querySelector('#txt_anno');

    for (let i = min; i <= max; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    };
}

//

// Acción al registro
btn_registrar.addEventListener('click', registrar_tarjeta);
colocar_meses();
colocar_anno();