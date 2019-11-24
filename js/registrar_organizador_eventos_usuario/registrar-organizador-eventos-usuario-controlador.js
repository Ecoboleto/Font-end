'use strict';

//Toma de variables
const input_nombre_empresa = document.querySelector('#txt_nombre_empresa');
const input_logo = document.querySelector('.logo--img');
//Cédula 
const rbt_fisica = document.querySelector('#txt_fisica');
const rbt_juridica = document.querySelector('#txt_juridica');
const input_cedula = document.querySelector('#txt_ced');
//Datos
const input_nombre_comercial = document.querySelector('#txt_nombre_comercial');
const input_annos_experiencia = document.querySelector('#txt_annos_experiencia');
const slc_provincia = document.querySelector('#provincias');
const slc_canton = document.querySelector('#cantones');
const slc_distrito = document.querySelector('#distritos');
const input_direccion_exacta = document.querySelector('#txt_direccion_exacta');
//Contacto Asociado
const input_nombre_completo = document.querySelector('#txt_nombre_completo');
const input_correoelectronico = document.querySelector('#txt_correo_electronico');
const input_edad = document.querySelector('#txt_edad');
const input_telefono = document.querySelector('#txt_telefono');
//Genero
const rbt_masculino = document.querySelector('#txt_masculino');
const rbt_femenino = document.querySelector('#txt_femenino');
const rbt_sin_especificar = document.querySelector('#txt_sin_especificar');
const rbt_otro = document.querySelector('#txt_otro');
const input_otro_respuesta = document.querySelector('#txt_otro_respuesta');
const genero_contenedor = document.querySelector('#genero_contenedor');
let genero,
    cedula;

const btn_registrar = document.querySelector('#btn_registrar');

const validar_formulario = (pNombre_empresa, pLogo, pCedula_empresa, pNombre_comercial, pAnnos_experiencia, pProvincia, pCanton, pDistrito, pDireccion_exacta, pNombre_completo, pCorreo_electonico, pEdad, pTelefono, pGenero) => {
    let error = true;

    //removemos la clase error  
    input_nombre_empresa.classList.remove('input--error');
    input_logo.classList.remove('input--error');
    input_cedula.classList.remove('input--error');
    input_nombre_comercial.classList.remove('input--error');
    input_annos_experiencia.classList.remove('input--error');
    slc_provincia.classList.remove('input--error');
    slc_canton.classList.remove('input--error');
    slc_distrito.classList.remove('input--error');
    input_direccion_exacta.classList.remove('input--error');
    input_nombre_completo.classList.remove('input--error');
    input_correoelectronico.classList.remove('input--error');
    input_edad.classList.remove('input--error');
    input_telefono.classList.remove('input--error');
    genero_contenedor.classList.remove('input--error');

    if (!validar_letras(pNombre_empresa)) {
        error = false;
        input_nombre_empresa.classList.add('input--error');
    }

    if (pLogo === '../imgs/image-solid.svg') {
        error = false;
        input_logo.classList.add('input--error');
    }

    if (!validar_numeros(pCedula_empresa)) {
        error = false;
        input_cedula.classList.add('input--error');
    }

    if (!validar_letras(pNombre_comercial)) {
        error = false;
        input_nombre_comercial.classList.add('input--error');
    }

    if (!validar_numeros(pAnnos_experiencia)) {
        error = false;
        input_annos_experiencia.classList.add('input--error');
    }

    if (pProvincia == 0) {
        error = false;
        slc_provincia.classList.add('input--error');
    }

    if (pCanton == 0) {
        error = false;
        slc_canton.classList.add('input--error');
    }

    if (pDistrito == 0) {
        error = false;
        slc_distrito.classList.add('input--error');
    }

    if (!validar_numeros_letros(pDireccion_exacta)) {
        error = false;
        input_direccion_exacta.classList.add('input--error');
    }

    if (!validar_letras(pNombre_completo)) {
        error = false;
        input_nombre_completo.classList.add('input--error');
    }

    if (!validar_correo_electronico(pCorreo_electonico)) {
        error = false;
        input_correoelectronico.classList.add('input--error');
    }

    if (!validar_edad(pEdad)) {
        error = false;
        input_edad.classList.add('input--error');
    }

    if (!validar_telefono(pTelefono)) {
        error = false;
        input_telefono.classList.add('input--error');
    }    

    if (pGenero == undefined) {
        error = false;
        genero_contenedor.classList.add('input--error');
    }

    return error;
};

const validar_genero = (e) => {
    genero = e.srcElement.value;
    return genero;
};

const validar_cedula_empresa = (e) => {
    cedula = e.srcElement.value;

    if (cedula == 'Fisica') {
        input_cedula.setAttribute('minlength', '1');
        input_cedula.setAttribute('maxlength', '9');
        input_cedula.setAttribute('size', '9');
        input_cedula.setAttribute('placeholder', 123456789);
    } else if (cedula == 'Juridica') {
        input_cedula.setAttribute('minlength', '1');
        input_cedula.setAttribute('maxlength', '10');
        input_cedula.setAttribute('size', '10');
        input_cedula.setAttribute('placeholder', 123456789);
    };
};

const obtener_datos = () => {
    let nombre_empresa = input_nombre_empresa.value;
    let logo = input_logo.src;
    let cedula_empresa = input_cedula.value;
    let nombre_comercial = input_nombre_comercial.value;
    let annos_experiencia = input_annos_experiencia.value;
    let provincia = slc_provincia.value;
    let canton = slc_canton.value;
    let distrito = slc_distrito.value;
    let direccion_exacta = input_direccion_exacta.value;
    let nombre_completo = input_nombre_completo.value;
    let correo_electonico = input_correoelectronico.value;
    let edad = input_edad.value;
    let telefono = input_telefono.value;
    let genero_respuesta = genero;
    


    if (!validar_formulario(nombre_empresa, logo, cedula_empresa, nombre_comercial, annos_experiencia, provincia, canton, distrito, direccion_exacta, nombre_completo, correo_electonico, edad, telefono, genero_respuesta)) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran con valores incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    } else {

        // registrar_organizador(nombre_empresa, logo, cedula_empresa, nombre_comercial, annos_experiencia, provincia, canton, distrito, direccion_exacta, nombre_completo, correo_electonico, edad, telefono);

        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'El organizador de eventos se ha registrado con exito',
            confirmButtonText: 'Entendido'
        });
    }
};

//Cedula
rbt_fisica.addEventListener('click', validar_cedula_empresa);
rbt_juridica.addEventListener('click', validar_cedula_empresa);

//Genero
rbt_masculino.addEventListener('click', validar_genero);
rbt_femenino.addEventListener('click', validar_genero);
rbt_sin_especificar.addEventListener('click', validar_genero);
rbt_otro.addEventListener('click', validar_genero);

//Registrar
btn_registrar.addEventListener('click', obtener_datos);