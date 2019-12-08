'use strict';
//REVISAR QUE LA FECHA DE NACIMIENTO ESTÉ BIEN PROGRAMADA Y QUE APAREZCA CORRECTAMENTE LA EDAD
//REVISAR QUE LA FECHA DE NACIMIENTO ESTÉ VALIDADA Y APAREZCA EL CORRESPONDIENTE PLACEHOLDER CON EL ORDEN CORRESPONDIENTE


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
let telefonos = [];
let genero,
    cedula,
    tipo_de_cedula,
    edad;

const btn_registrar = document.querySelector('#btn_registrar');

const validar_formulario = (pNombre_empresa, pLogo, pCedula_empresa, pNombre_comercial, pAnnos_experiencia, pProvincia, pCanton, pDistrito, pDireccion_exacta, pNombre_completo, pCorreo_electronico, pfecha_de_nacimiento, pEdad, pGenero) => {
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
    output_edad.classList.remove('input--error');
    input_agregar_telefono.classList.remove('input--error');
    input_otro_respuesta.classList.remove('input--error');
    genero_contenedor.classList.remove('input--error');

    // if (!validar_letras(pNombre_empresa)) {
    //     error = false;
    //     input_nombre_empresa.classList.add('input--error');
    // }

    // if (pLogo === '../imgs/image-solid.svg') {
    //     error = false;
    //     input_logo.classList.add('input--error');
    // }

    // if (!validar_numeros(pCedula_empresa)) {
    //     error = false;
    //     input_cedula.classList.add('input--error');
    // }

    // if (!validar_vacio_null(pNombre_comercial)) {
    //     error = false;
    //     input_nombre_comercial.classList.add('input--error');
    // }

    // if (!validar_numeros(pAnnos_experiencia)) {
    //     error = false;
    //     input_annos_experiencia.classList.add('input--error');
    // }

    // if (pProvincia == 0) {
    //     error = false;
    //     slc_provincia.classList.add('input--error');
    // }

    // if (pCanton == 0) {
    //     error = false;
    //     slc_canton.classList.add('input--error');
    // }

    // if (pDistrito == 0) {
    //     error = false;
    //     slc_distrito.classList.add('input--error');
    // }

    // if (!validar_numeros_letros(pDireccion_exacta)) {
    //     error = false;
    //     input_direccion_exacta.classList.add('input--error');
    // }

    // if (!validar_letras(pNombre_completo)) {
    //     error = false;
    //     input_nombre_completo.classList.add('input--error');
    // }

    // if (!validar_correo_electronico(pCorreo_electronico)) {
    //     error = false;
    //     input_correoelectronico.classList.add('input--error');
    // }

    // if (!validar_edad(pEdad)) {
    //     error = false;
    //     output_edad.classList.add('input--error');
    // }

    // if (!validar_vacio_null(telefonos)) {
    //     error = false;
    //     input_agregar_telefono.classList.add('input--error');
    // }

    // if (pGenero == undefined) {
    //     error = false;
    //     genero_contenedor.classList.add('input--error');
    // }

    // if (pGenero == 'Otro') {
    //     if (input_otro_respuesta.value == '') {
    //         input_otro_respuesta.classList.add('input--error');
    //     }
    // };

    return error;
};

const validar_genero = (e) => {
    // genero = e.srcElement.value;
    // return genero;
};

const validar_cedula_empresa = (e) => {
    // cedula = e.srcElement.value;

    // if (cedula == 'Fisica') {
    //     input_cedula.setAttribute('minlength', '1');
    //     input_cedula.setAttribute('maxlength', '9');
    //     input_cedula.setAttribute('size', '9');
    //     input_cedula.setAttribute('placeholder', 123456789);
    // } else if (cedula == 'Juridica') {
    //     input_cedula.setAttribute('minlength', '1');
    //     input_cedula.setAttribute('maxlength', '10');
    //     input_cedula.setAttribute('size', '10');
    //     input_cedula.setAttribute('placeholder', 123456789);
    // };

    // tipo_de_cedula = cedula;
    // return tipo_de_cedula;
};

//e equivale a event para escuchar el evento de cambio que se produce en el DOM
//viene una acción desde el HTML en el campo de input de la fecha de nacimiento
const calc_edad = (e) => {
    // console.log(e);
    // console.log(target);
    // console.log(e.target.value);
    edad = getEdad(e.target.value);
    output_edad.classList.remove('gris--tipografia');
    output_edad.classList.add('gris-oscuro--tipografia');
    output_edad.classList.add('edad_numero'); //Esta clase está en registrar org eventos .css
    output_edad.innerHTML = edad;
};

//Elimina un teléfono de la lista
const eliminar_telefono = () => {
    const li = event.srcElement.parentNode;
    li.remove();
};

//Obtien los telefonos de la etiqueta "#ul-lista-telefono>li" del atributo dato-telefono y 
//los retorna en un array
const obtener_telefonos = () => {
    const ul_telefonos = document.querySelectorAll('#ul-lista-telefono li');
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
            title: 'Ingrese un teléfono validó',
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
            li.innerHTML = `${telefono}<span class="close" onclick="eliminar_telefono(this)">×</span>`;;
            li.setAttribute("dato-telefono", telefono)
            ul_lista_telefono.appendChild(li);

            //limpiemos el el elemento text-agregar-telefono
            input_agregar_telefono.value = "";
            input_agregar_telefono.focus()
        }
    }
};

const obtener_datos = () => {
    obtener_telefonos();
    let nombre_empresa = input_nombre_empresa.value.trim();
    let logo = input_logo.src;
    let tipo_cedula = cedula;
    let cedula_empresa = input_cedula.value.trim();
    let nombre_comercial = input_nombre_comercial.value.trim();
    let annos_experiencia = input_annos_experiencia.value.trim();
    let provincia = slc_provincia.options[slc_provincia.selectedIndex].text;
    let canton = slc_canton.options[slc_canton.selectedIndex].text;
    let distrito = slc_distrito.options[slc_distrito.selectedIndex].text;
    let direccion_exacta = input_direccion_exacta.value.trim();
    let nombre_completo = input_nombre_completo.value.trim();
    let correo_electronico = input_correoelectronico.value.trim();
    let fecha_de_nacimiento = input_fecha_de_nacimiento.value;
    let genero_respuesta = genero;
    let aTelefonos = telefonos;
    

    if (!validar_formulario(nombre_empresa, logo, cedula_empresa, nombre_comercial, annos_experiencia, provincia, canton, distrito, direccion_exacta, nombre_completo, correo_electronico, fecha_de_nacimiento, edad, genero_respuesta)) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran con valores incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    } else if ( canton == undefined || distrito == undefined ){
        Swal.fire({
            icon: 'warning',
            title: 'Recuerde que debe de verificar que todos los campos esten completos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    } else {

        if( genero_respuesta == 'Otro' ){
            genero_respuesta = input_otro_respuesta.value;
        };

        registrar_organizador_eventos(nombre_empresa, logo, tipo_cedula, cedula_empresa, nombre_comercial, annos_experiencia, provincia, canton, distrito, direccion_exacta, nombre_completo, correo_electronico, fecha_de_nacimiento, genero_respuesta, aTelefonos);

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

//Agregar Telefono
btn_agregar_telefono.addEventListener('click', agregar_telefono_lista);

//Genero
rbt_masculino.addEventListener('click', validar_genero);
rbt_femenino.addEventListener('click', validar_genero);
rbt_sin_especificar.addEventListener('click', validar_genero);
rbt_otro.addEventListener('click', validar_genero);

//Registrar
btn_registrar.addEventListener('click', obtener_datos);