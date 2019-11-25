'use strict';
const input_nombre_recinto = document.querySelector('#txt_nombre_recinto');

const sl_provincias = document.querySelector('#provincias');
const sl_cantones = document.querySelector('#cantones');
const sl_distritos = document.querySelector('#distritos');
const sl_encargado_recinto = document.querySelector('#encargado-recinto');
const p_coordenadas = document.querySelector('#coordenadas');

const txt_area_direccion_exacta = document.querySelector('#txt_direccion_exacta');
const input_cap_tradicionales = document.querySelector('#txt_capacidad_asientos_tradicionales');
const input_cap_especiales = document.querySelector('#txt_capacidad_asientos_especiales');
const input_capacidad = document.querySelector('#txt_capacidad');

const img_imagen = document.querySelector('#id-imagen');
const btn_img = document.querySelector('#btn-guardarImagen');
const btn_registrar = document.querySelector('#btn_registrar');

//Valida el formulario, returna true si todo esta correcto
const validar_formulario = () => {
    let error = true;

    //removemos la clase error  
    input_nombre_recinto.classList.remove('input--error');
    sl_provincias.classList.remove('input--error');
    sl_cantones.classList.remove('input--error');
    sl_distritos.classList.remove('input--error');
    p_coordenadas.classList.remove('input--error');
    txt_area_direccion_exacta.classList.remove('input--error');

    input_cap_tradicionales.classList.remove('input--error');
    input_cap_especiales.classList.remove('input--error');


    return error;
};

const resetear_formulario = () => {

}

//Registra de recinto
const recinto = async () => {

    //Realizamos las demas validaciones   
    if (validar_formulario()) {

        try {
            let nombre_recinto = input_nombre_recinto.value;
            let fotos = img_imagen.src;
            let provincia = sl_provincias.options[sl_provincias.selectedIndex].text;
            let canton = sl_cantones.options[sl_cantones.selectedIndex].text;
            let distrito = sl_distritos.options[sl_distritos.selectedIndex].text;
            let direccion_exacta = txt_area_direccion_exacta.value;
            let geolocalizacion = p_coordenadas.textContent;
            let capacidad_asientos_tradicionales = input_cap_tradicionales.value;
            let capacidad_asientos_especiales = input_cap_especiales.value;
            let capacidad = Number(capacidad_asientos_tradicionales) + Number(capacidad_asientos_especiales);
            let encargado_asociado_id = sl_encargado_recinto.options[sl_encargado_recinto.selectedIndex].text;

            await registrar_recinto(nombre_recinto, fotos, provincia, canton, distrito, direccion_exacta, geolocalizacion,
                capacidad_asientos_tradicionales, capacidad_asientos_especiales, capacidad, encargado_asociado_id)
                .then(resultado => {
                    if (resultado.estado) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registro realizado con éxito',
                            text: 'El encargado de recinto ha sido almacenado',
                            confirmButtonText: 'Entendido',
                            onAfterClose: () => {
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
    sl_encargado_recinto.innerHTML =  crear_Opciones_encargado_recinto(resoltado.datos);
};

const crear_Opciones_encargado_recinto = (datos) => {
    var html = '<option value="0">Seleccione encargado de recinto</option>';
    for (key in datos) {
        html += `<option value="${datos[key]._id}">${datos[key].nombre_completo}</option>`;
    }
    return html;
};


// Acciónes
btn_registrar.addEventListener('click', recinto);
llenar_select();