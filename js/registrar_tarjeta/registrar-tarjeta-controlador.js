'use strict';

// Variables de los input y botón de registrar
const input_nombre = document.querySelector('#txt_nombre');
const input_numero = document.querySelector('#txt_numero');
const input_mes = document.querySelector('#txt_mes');
const input_anno = document.querySelector('#txt_anno');
const input_codigo = document.querySelector('#txt_codigo');
const btn_registrar = document.querySelector('#btn_registrar');

const validar = (pNombre, pNumero, pCodigo, pMes, pAnno, pFecha) => {
    let error = false;

    let regex_solo_letras = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/;
    let regex_solo_numeros = /^[0-9]+$/;
    let regex_letras_numeros = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ0-9]+$/;

    //removemo la clase error  
    input_nombre.classList.remove('input--error');
    input_numero.classList.remove('input--error');
    input_codigo.classList.remove('input--error');
    input_mes.classList.remove('input--error');
    input_anno.classList.remove('input--error');


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

    if (pAnno == pFecha[1]) {
        if (pMes < pFecha[0]) {
            error = true;
            input_mes.classList.add('input--error');
            input_anno.classList.add('input--error');
        }
    }

    return error;
};

// Función de registrar
const obtener_datos = () => {
    let nombre = input_nombre.value;
    let numero = Number(input_numero.value);
    let codigo = input_codigo.value;
    let mes = input_mes.value;
    let anno = input_anno.value;
    let fecha = [new Date().getMonth(), new Date().getFullYear()];

    if (validar(nombre, numero, codigo, mes, anno, fecha)) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran con valores incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    } else {

        registrar_tarjeta(nombre, numero, codigo, mes, anno);
        
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'La tarjeta se ha registrado con exito',
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

//Detectar tipo de tarjeta
input_numero.addEventListener('keyup', detectar_tarjeta);

// Acción al registro
btn_registrar.addEventListener('click', obtener_datos);

//Automatización de datos en los desplegables
colocar_meses();
colocar_anno();