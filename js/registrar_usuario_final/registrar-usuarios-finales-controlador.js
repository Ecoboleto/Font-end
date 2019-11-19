'use strict';


const input_correo = document.querySelector('#txt_correo');
const input_primer_nombre = document.querySelector('#txt_primer-nombre');
const input_segundo_nombre = document.querySelector('#txt_segundo-nombre');
const input_primer_apellido = document.querySelector('#txt_primer-apellido');
const input_segundo_apellido = document.querySelector('#txt_segundo-apellido');
const input_fecha_nacimiento = document.querySelector('#txt_fecha-nacimiento');
const input_provincia = document.querySelector('#txt_provincia');
const input_canton = document.querySelector('#txt_canton');
const input_distrito = document.querySelector('#txt_distrito');
const input_genero = document.querySelector('.txt_genero');
const btn_guardar = document.querySelector('#btn-guardar');

let validar_datos = () => {
    let error = false;

    if (input_correo.value == '') {
        error = true;
        input_correo.classList.add('error');
    } else {
        input_correo.classList.remove('error');
    }


    if (input_primer_nombre.value == '') {
        error = true;
        input_primer_nombre.classList.add('error');
    } else {
        input_primer_nombre.classList.remove('error');
    }


    if (input_primer_apellido.value == '') {
        error = true;
        input_primer_apellido.classList.add('error');
    } else {
        input_primer_apellido.classList.remove('error');
    }


    if (input_fecha_nacimiento.value == '') {
        error = true;
        input_fecha_nacimiento.classList.add('error');
    } else {
        input_fecha_nacimiento.classList.remove('error');
    }


    if (input_provincia.value == '') {
        error = true;
        input_provincia.classList.add('error');
    } else {
        input_provincia.classList.remove('error');
    }


    if (input_canton.value == '') {
        error = true;
        input_canton.classList.add('error');
    } else {
        input_canton.classList.remove('error');
    }

    if (input_distrito.value == '') {
        error = true;
        input_distrito.classList.add('error');
    } else {
        input_distrito.classList.remove('error');
    }


    if (input_genero.value == '') {
        error = true;
        input_genero.classList.add('error');
    } else {
        input_genero.classList.remove('error');
    }

    return error;
};



let registrar_usuarios_finales = () => {

    let correo = input_correo.value;
    let primer_nombre = input_primer_nombre.value;
    let segundo_nombre = input_segundo_nombre.value;
    let primer_apellido = input_primer_apellido.value;
    let segundo_apellido = input_segundo_apellido.value;
    let fecha_nacimiento = input_fecha_nacimiento.value;
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let genero = input_genero.value;
    //TAMBIEN TENGO QUE PASARLE LA EDAD

    if (validar_datos()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })

    } else {


        registrar_usuario_final(correo, primer_nombre, segundo_nombre, primer_apellido,
            segundo_apellido, fecha_nacimiento, provincia, canton, distrito, genero);

        Swal.fire({
            icon: 'success',
            title: 'Registro realizado con exito',
            text: 'El usuario ha sido almacenado',
            confirmButtonText: 'Entendido'
        })
    }





};



btn_guardar.addEventListener('click', registrar_usuarios_finales);