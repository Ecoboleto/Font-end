'use strict';

//Toma de variables
const input_nombre_empresa = document.querySelector('#txt_nombre_empresa');
const input_imagen = document.querySelector('#img_logo');
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
const otro_respuesta_checked = document.querySelector('#txt_otro_respuesta');


const obterner_datos = () => {
    let nombre_empresa = input_nombre_empresa.value;
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

    if (validar(nombre_empresa, cedula_empresa, nombre_comercial, annos_experiencia, provincia, canton, distrito, direccion_exacta, nombre_completo, correo_electonico, edad, telefono)) {
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






// OJO ESTO ES PARA APARECER EL INPUT
// const escucha_opcion_otro = () => {
//     if(rbt_otro.checked){
//         otro_respuesta.classList.remove('d-none')
//         otro_respuesta.classList.add('d-bloque');
//     } else if(rbt_masculino.checked == true || rbt_femenino.checked == true || rbt_sin_especificar.checked == true ) {
//         otro_respuesta.classList.remove('d-bloque');
//         otro_respuesta.classList.add('d-none');
//     }
// };

