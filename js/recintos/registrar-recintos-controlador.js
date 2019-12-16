'use strict';
const input_nombre_recinto = document.querySelector('#txt_nombre_recinto');
const sl_encargado_recinto = document.querySelector('#encargado-recinto');

const txt_area_direccion_exacta = document.querySelector('#txt_direccion_exacta');
const input_cap_tradicionales = document.querySelector('#txt_capacidad_asientos_tradicionales');
const input_cap_especiales = document.querySelector('#txt_capacidad_asientos_especiales');
const input_capacidad = document.querySelector('#txt_capacidad');

const img_imagen = document.querySelector('#img_imagen');
const btn_img = document.querySelector('#btn-guardarImagen');
const btn_registrar = document.querySelector('#btn_registrar');
const form_recinto = document.querySelector('#form-recinto');

//Valida el formulario, returna true si todo esta correcto
const validar_formulario = () => {
    let error = true;

    //removemos la clase error  
    input_nombre_recinto.classList.remove('input--error');
    img_imagen.classList.remove('input--error');
    sl_provincia.classList.remove('input--error');
    sl_canton.classList.remove('input--error');
    sl_distrito.classList.remove('input--error');
    txt_area_direccion_exacta.classList.remove('input--error');
    input_cap_tradicionales.classList.remove('input--error');
    input_cap_especiales.classList.remove('input--error');
    sl_encargado_recinto.classList.remove('input--error');


    let nombre_recinto = input_nombre_recinto.value;
    let fotos = img_imagen.src;

    let direccion_exacta = txt_area_direccion_exacta.value;
    let capacidad_asientos_tradicionales = input_cap_tradicionales.value;
    let capacidad_asientos_especiales = input_cap_especiales.value;

    //Valida el nombre recinto
    if (!validar_vacio_null(nombre_recinto)) {
        error = false;
        input_nombre_recinto.classList.add('input--error');
    }

    if (fotos == 'http://127.0.0.1:5500/imgs/image-solid.svg') {
        error = false;
        img_imagen.classList.add('input--error');
    }


    if (sl_provincia.selectedIndex == -1 || sl_provincia.selectedIndex == 0) {
        error = false;
        sl_provincia.classList.add('input--error');
    }

    if (sl_canton.selectedIndex == -1 || sl_canton.selectedIndex == 0) {
        error = false;
        sl_canton.classList.add('input--error');
    }

    if (sl_distrito.selectedIndex == -1 || sl_distrito.selectedIndex == 0) {
        error = false;
        sl_distrito.classList.add('input--error');
    }

    if (sl_encargado_recinto.selectedIndex == -1 || sl_encargado_recinto.selectedIndex == 0) {
        error = false;
        sl_encargado_recinto.classList.add('input--error');
    }

    if (!validar_vacio_null(direccion_exacta)) {
        error = false;
        txt_area_direccion_exacta.classList.add('input--error');
    }

    if (capacidad_asientos_tradicionales < 1) {
        error = false;
        input_cap_tradicionales.classList.add('input--error');
    }

    if (capacidad_asientos_especiales < 0) {
        error = false;
        input_cap_especiales.classList.add('input--error');
    }

    return error;
};

const resetear_formulario = () => {
    form_recinto.reset();
    input_nombre_recinto.focus();
    input_capacidad.innerHTML = "capacidad total: 0"
    img_imagen.src = "../imgs/image-solid.svg";
    sl_canton.selectedIndex = 0;
    sl_distrito.selectedIndex = 0;
    sl_canton.disabled = true;
    sl_distrito.disabled = true;
}

//Registra de recinto
const recinto = async () => {

    //Realizamos las demas validaciones   
    if (validar_formulario()) {

        try {
            let nombre_recinto = input_nombre_recinto.value;
            let fotos = img_imagen.src;
            let provincia = sl_provincia.options[sl_provincia.selectedIndex].text;
            let canton = sl_canton.options[sl_canton.selectedIndex].text;
            let distrito = sl_distrito.options[sl_distrito.selectedIndex].text;
            let direccion_exacta = txt_area_direccion_exacta.value;
            let capacidad_asientos_tradicionales = Number(input_cap_tradicionales.value);
            let capacidad_asientos_especiales = Number(input_cap_especiales.value);
            let capacidad = Number(capacidad_asientos_tradicionales) + Number(capacidad_asientos_especiales);
            let encargado_asociado_id = sl_encargado_recinto.options[sl_encargado_recinto.selectedIndex].value;

            await registrar_recinto(nombre_recinto, fotos, provincia, canton, distrito, direccion_exacta, geolocalizacion,
                capacidad_asientos_tradicionales, capacidad_asientos_especiales, capacidad, encargado_asociado_id)
                .then(resultado => {
                    if (resultado.estado) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registro realizado con éxito',
                            text: 'El recinto ha sido almacenado',
                            confirmButtonText: 'Entendido',
                            onAfterClose: () => {
                                resetear_formulario();
                                input_nombre_recinto.focus();
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: resultado.msg,
                            confirmButtonText: 'Entendido',
                            onAfterClose: () => {
                                input_correo.focus();
                            }
                        });
                    }
                });
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: 'No se puede conectar con el servidor',
                confirmButtonText: 'Entendido'
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran con valores incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    }
};

//Agraga un nuevo teléfono a la lista
const llenar_select = async () => {
    let resoltado = [];
    await listar_encargados_recinto().then(res => { resoltado = res });

    sl_encargado_recinto.innerHTML = "";
    sl_encargado_recinto.innerHTML = crear_Opciones_encargado_recinto(resoltado.datos);
};

const crear_Opciones_encargado_recinto = (datos) => {
    let html = '<option value="0" hidden>Seleccione encargado de recinto</option>';
    for (key in datos) {
        html += `<option value="${datos[key]._id}">${datos[key].nombre_completo}</option>`;
    }
    return html;
};

const sumar_capacidad = () => {
    let capacidad = Number(input_cap_tradicionales.value) + Number(input_cap_especiales.value);
    input_capacidad.innerHTML = `Capacidad total: ${capacidad}`;
};

// Acciónes
btn_registrar.addEventListener('click', recinto);
input_cap_tradicionales.addEventListener('keyup', sumar_capacidad);
input_cap_especiales.addEventListener('keyup', sumar_capacidad);
llenar_select();
