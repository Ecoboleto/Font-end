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
const rbt_masculino_checked = document.querySelector('#txt_masculino');
const rbt_femenino_checked = document.querySelector('#txt_femenino');
const rbt_sin_especificar_checked = document.querySelector('#txt_sin_especificar');
const rbt_otro_checked = document.querySelector('#txt_otro');
const input_otro_respuesta = document.querySelector('#txt_otro_respuesta');

const btn_registrar = document.querySelector('#btn_registrar');

const validar_formulario = (pNombre_empresa, pLogo, pCedula_empresa, pNombre_comercial, pAnnos_experiencia, pProvincia, pCanton, pDistrito, pDireccion_exacta, pNombre_completo, pCorreo_electonico, pEdad, pTelefono) => {
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
    input_otro_respuesta.classList.remove('input--error');
    

    //Valida que la edad sea mayorr de edad
    if (pEdad <= 17) {
        error = false;
        input_edad.classList.add('input--error');
    }

    if(!validar_letras(pNombre_empresa)){
        error = false;
        input_nombre_empresa.classList.add('input--error');
    }

    if(pLogo === '../imgs/image-solid.svg'){
        error = false;
        input_logo.classList.add('input--error');
    }

    //Valida el correo electrónico
    if (!validar_correo_electronico(pCorreo_electonico)) {
        error = false;
        input_correoelectronico.classList.add('input--error');
    }


















    //Valida el nombre
    // if (!validar_nombre_completo(input_nombre.value)) {
    //     error = false;
    //     input_nombre.classList.add('input--error');
    // }
    // //Valida la fecha de nacimiento
    // if (!validar_vacio_null(input_fecha_nacimiento.value)) {
    //     error = false;
    //     input_fecha_nacimiento.classList.add('input--error');
    // }

    // //Valida los telefonos
    // if (!validar_vacio_null(telefonos)) {
    //     error = false;
    //     input_agregar_telefono.classList.add('input--error');
    // }

    // //Valida el genero
    // if (!validar_vacio_null(genero)) {
    //     error = false;
    //     div_genero.classList.add('input--error')
    // }

    return error;
};

const obterner_datos = () => {
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
    let otro_respuesta = input_otro_respuesta;


    if (validar_formulario(nombre_empresa, logo, cedula_empresa, nombre_comercial, annos_experiencia, provincia, canton, distrito, direccion_exacta, nombre_completo, correo_electonico, edad, telefono, otro_respuesta)) {
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


btn_registrar.addEventListener('click', obterner_datos);