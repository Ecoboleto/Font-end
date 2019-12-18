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
const slc_provincia = document.querySelector('#provincia');
const slc_canton = document.querySelector('#canton');
const slc_distrito = document.querySelector('#distrito');
const input_direccion_exacta = document.querySelector('#txt_direccion_exacta');
//Contacto Asociado
const input_nombre_completo = document.querySelector('#txt_nombre_completo');
const input_correoelectronico = document.querySelector('#txt_correo_electronico');
const input_fecha_de_nacimiento = document.querySelector('#txt_fecha_de_nacimiento');
const output_edad = document.querySelector('#txt_edad');
const input_agregar_telefono = document.querySelector('#txt_telefono');
const btn_agregar_telefono = document.querySelector('#agregar_telefono');
//Genero
const rbt_masculino = document.querySelector('#txt_masculino');
const rbt_femenino = document.querySelector('#txt_femenino');
const rbt_sin_especificar = document.querySelector('#txt_sin_especificar');
const rbt_otro = document.querySelector('#txt_otro');
const input_otro_respuesta = document.querySelector('#txt_otro_respuesta');
const genero_contenedor = document.querySelector('#genero_contenedor');
let ul_lista_telefono = document.querySelector('#ul-lista-telefono');
const ul_telefonos = document.querySelectorAll('#ul-lista-telefono li');
let telefonos = [];
let genero_registrar,
    cedula,
    edad;

const btn_registrar = document.querySelector('#btn_registrar');

rbt_fisica.disabled = true;
rbt_juridica.disabled = true;
input_cedula.disabled = true;
input_fecha_de_nacimiento.disabled = true;
output_edad.disabled = true;
slc_provincia.disabled = true;
slc_canton.disabled = true;
slc_distrito.disabled = true;


let _idorganizador = localStorage.getItem('_idorganizador');
// console.log(_idorganizador);

const validar_formulario = (pNombre_empresa, pLogo, pNombre_comercial, pDireccion_exacta, pNombre_completo, pCorreo_electronico, pGenero) => {
    let error = true;

    //removemos la clase error  
    input_nombre_empresa.classList.remove('input--error');
    input_logo.classList.remove('input--error');
    input_nombre_comercial.classList.remove('input--error');
    input_annos_experiencia.classList.remove('input--error');
    input_direccion_exacta.classList.remove('input--error');
    input_nombre_completo.classList.remove('input--error');
    input_correoelectronico.classList.remove('input--error');
    input_agregar_telefono.classList.remove('input--error');
    input_otro_respuesta.classList.remove('input--error');
    genero_contenedor.classList.remove('input--error');

    if (!validar_letras(pNombre_empresa)) {
        error = false;
        input_nombre_empresa.classList.add('input--error');
    }

    if (pLogo === '../imgs/image-solid.svg') {
        error = false;
        input_logo.classList.add('input--error');
    }

    if (!validar_vacio_null(pNombre_comercial)) {
        error = false;
        input_nombre_comercial.classList.add('input--error');
    }

    if (!validar_numeros_letros(pDireccion_exacta)) {
        error = false;
        input_direccion_exacta.classList.add('input--error');
    }

    if (!validar_letras(pNombre_completo)) {
        error = false;
        input_nombre_completo.classList.add('input--error');
    }

    if (!validar_correo_electronico(pCorreo_electronico)) {
        error = false;
        input_correoelectronico.classList.add('input--error');
    }

    // if (!validar_vacio_null(telefonos)) {
    //     error = false;
    //     input_agregar_telefono.classList.add('input--error');
    // }

    if (pGenero == undefined) {
        error = false;
        genero_contenedor.classList.add('input--error');
    }

    if (pGenero == 'Otro') {
        if (input_otro_respuesta.value == '') {
            input_otro_respuesta.classList.add('input--error');
        }
    };

    return error;
};

const validar_genero = (e) => {
    genero = e.srcElement.value;
    return genero;
};

const eliminar_telefono = () => {
    const li = event.srcElement.parentNode;
    li.remove();
};

//Obtien los telefonos de la etiqueta "#ul-lista-telefono>li" del atributo dato-telefono y 
//los retorna en un array
const obtener_telefonos = () => {
    telefonos = [];
    ul_telefonos.forEach(li => telefonos.push(li.getAttribute('dato-telefono')));
};

//Agraga un nuevo teléfono a la lista
const agregar_telefono_lista = () => {
    const ul_lista_telefono = document.querySelector('#ul-lista-telefono');
    let telefono = input_agregar_telefono.value;
    telefono = Normaliza_string(telefono);

    if (!validar_telefono(telefono)) {
        Swal.fire({
            icon: 'warning',
            title: 'Ingrese un teléfono valido',
            confirmButtonText: 'Entendido',
            onAfterClose: () => {
                input_agregar_telefono.focus();
            }
        });
    } else {
        obtener_telefonos();
        //busca si el teléfono ya se agrego a la lista
        const resultado = telefonos.includes(telefono);
        if (resultado) {
            Swal.fire({
                icon: 'warning',
                title: 'EL teléfono se encuentra en la lista',
                confirmButtonText: 'Entendido',
                onAfterClose: () => {
                    input_agregar_telefono.focus();
                }
            });
        } else {
            const li = document.createElement("li");
            li.innerHTML = `${telefono}<span class="close" onclick="eliminar_telefono(this)">×</span>`;
            li.setAttribute("dato-telefono", telefono);
            ul_lista_telefono.appendChild(li);

            //limpiemos el el elemento text-agregar-telefono
            input_agregar_telefono.value = "";
            input_agregar_telefono.focus();
        }
    }
};

const calc_edad = (e) => {
    edad = getEdad(e);
    output_edad.classList.remove('gris--tipografia');
    output_edad.classList.add('gris-oscuro--tipografia');
    output_edad.classList.add('edad_numero'); //Esta clase está en registrar org eventos .css
    output_edad.innerHTML = edad;
};

const llenarFormulario = async () => {
    let organizador = await obtener_organizador_id(_idorganizador);
    // console.log(organizador);

    let telefonos = organizador['telefonos'];
    let genero = organizador['genero'];
    let tipo_cedula = organizador['tipo_cedula'];

    input_nombre_empresa.value = organizador['nombre_empresa'];
    input_logo.src = organizador['log'];
    if(tipo_cedula == 'Física'){
        rbt_fisica.checked = true;
    } else {
        rbt_juridica.checked = true;
    };
    input_cedula.value = organizador['cedula'];
    input_nombre_comercial.value = organizador['nombre_comercial'];
    input_annos_experiencia.value = organizador['anos_experiencia'];
    slc_provincia.value = organizador['provincia'];
    slc_canton.value = organizador['canton'];
    slc_distrito.value = organizador['distrito'];
    input_direccion_exacta.value = organizador['direccion_exacta'];
    input_nombre_completo.value = organizador['nombre_completo'];
    input_correoelectronico.value = organizador['correo_electronico'];
    input_fecha_de_nacimiento.value = organizador['fecha'].substr(0,10);
    
    window.onload = function(){
        calc_edad(input_fecha_de_nacimiento.value);
    };

    ul_lista_telefono.innerHTML = '<li>' + telefonos + '<span class="close" onclick="eliminar_telefono(this)">×</span></li>';
    
    if(genero == 'Masculino'){
        rbt_masculino.checked = true;
        genero_registrar = 'Masculino';
    } else if (genero == 'Femenino'){
        rbt_femenino.checked = true;
        genero_registrar = 'Femenino';
    } else if (genero == 'Prefiero no especificar'){
        rbt_sin_especificar.checked = true;
        genero_registrar = 'Prefiero no especificar';
    } else {
        rbt_otro.checked = true;
        genero_registrar = 'Otro';
    }
};

const obtener_datos = () => {
    obtener_telefonos();
    let nombre_empresa = input_nombre_empresa.value.trim();
    let logo = input_logo.src;
    let nombre_comercial = input_nombre_comercial.value.trim();
    let annos_experiencia = Number(input_annos_experiencia.value.trim());
    let direccion_exacta = input_direccion_exacta.value.trim();
    let nombre_completo = input_nombre_completo.value.trim();
    let correo_electronico = input_correoelectronico.value.trim();
    let genero_respuesta = genero_registrar;
    console.log(telefonos);
    
    let aTelefonos = telefonos;
    

    if(!validar_formulario(nombre_empresa, logo, nombre_comercial, direccion_exacta, nombre_completo, correo_electronico, genero_respuesta)) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran con valores incorrectos o en blanco',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    } else {
        if (genero_respuesta == 'Otro') {
            genero_respuesta = input_otro_respuesta.value;
        };

        modificar_organizador_eventos(_idorganizador, nombre_empresa, logo, nombre_comercial, annos_experiencia, direccion_exacta, nombre_completo, correo_electronico, genero_respuesta, aTelefonos);
    }
};

if (_idorganizador) {
    llenarFormulario();
} else {
    console.log('Seleccione un usuario para modificar');
}

//Agregar Telefono
btn_agregar_telefono.addEventListener('click', agregar_telefono_lista);

btn_registrar.addEventListener('click', obtener_datos);

//Genero
rbt_masculino.addEventListener('click', validar_genero);
rbt_femenino.addEventListener('click', validar_genero);
rbt_sin_especificar.addEventListener('click', validar_genero);
rbt_otro.addEventListener('click', validar_genero);

obtener_telefonos();