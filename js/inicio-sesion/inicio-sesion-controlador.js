'use strict';
const input_correo = document.querySelector('#txt_correo_electronico');
const input_contrasenna = document.querySelector('#txt_contrasenna');
const btn_ingresar = document.querySelector('.btn-iniciar-sesion');

const validar_datos = () => {
    let bError = false;

    input_correo.classList.remove('input--error');
    input_contrasenna.classList.remove('input--error');

    if (!validar_correo_electronico(input_correo.value)) {
        bError = true;
        input_correo.classList.add('input--error');
    }

    if (!validar_vacio_null(input_contrasenna.value)) {
        bError = true;
        input_contrasenna.classList.add('input--error');
    }

    return bError;
};

const inicio_sesion = async () => {
    let correo = input_correo.value;
    let contrasenna = input_contrasenna.value;

    correo = correo.trim();
    contrasenna = contrasenna.trim();

    if (!validar_datos()) {
        try {
            let resultado = "";
            await inicio_sesion_servicio(correo, contrasenna).then(res => { resultado = res });
            if (resultado.estado) {

                switch (resultado.datos.tipo_usuario) {
                    case 'encargado_de_recinto':
                        window.location = "http://127.0.0.1:5500/vistas/panel-de-control-encargado-recinto.html";
                        break;
                    case 'organizador_evento':
                        window.location = "http://127.0.0.1:5500/vistas/";
                        break;
                    case 'usuario_final':
                        window.location = "http://127.0.0.1:5500/vistas/";
                        break;
                    case 'administrador':
                        window.location = "http://127.0.0.1:5500/vistas/";
                        break;
                    default:
                        window.location = "http://127.0.0.1:5500/vistas/";
                        break;
                }

                console.log(resultado);
                window.localStorage.setItem('usuario_id', resultado.datos._id);
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: resultado.msg,
                    confirmButtonText: 'Entendido'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: 'No se puede iniciar sección en este momento',
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

btn_ingresar.addEventListener('click', inicio_sesion);
