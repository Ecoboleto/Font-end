'use strict'

const input_correo = document.querySelector('#txt_correo_electronico'); 
const input_contrasenna = document.querySelector('#txt_contrasenna');

const btn_ingresar = document.querySelector('.btn-iniciar-sesion'); 

const inicioSesion = () => {
    let correo = input_correo.value;
    let contrasenna = input_contrasenna.value;
    let acceso = false;
    let bError = validar_datos(correo, contrasenna);

    if(bError == true){
        
        if(correo == '' & null || contrasenna == '' & null){
            swal({
                type : 'warning',
                title: 'Error',
                text: 'Revise los campos vacíos',
                confirmButtonText: 'Entendido'
            });
            console.log('El campo no puede estar vacío');
        // } else if(sUsuario == null || sContrasenna == null){
        //     swal({
        //         type : 'warning',
        //         title: 'Algo ocurrió',
        //         text: 'Tuvimos un problema por favor intentelo de nuevo',
        //         confirmButtonText: 'Entendido'
        //     });
        //     console.log('Tuvimos un problema por favor intentelo de nuevo');
        // };

    } else {
        
        acceso = validarCredenciales(correo, contrasenna);
        limpiarFormulario();
    
        if(acceso == true){
            ingresar();
        };

    };
};

};
const ingresar = () => {
    let rol = localStorage.getItem('rolUsuario');

    switch(rol){
        case 'Admin':
            window.location.href = '#';
        break;
        case 'Cliente':
            window.location.href = '#';
        break;
        case 'Organizador_eventos':
            window.location.href = '#';
        break;
        case 'Encargado_recinto':
            window.location.href = '#';
        default:
            swal({
                type : 'warning',
                title: 'Aviso',
                text: 'Sus credenciales son incorrectas,inténtelo de nuevo',
                confirmButtonText: 'Entendido'
            });
        break;
    };
}

const limpiarFormulario = () => {
    input_correo.value = '';
    input_contrasenna.value = '';
};

const validar_datos = (correo, contrasenna) => {
    let bError = false;
    // const regexCorreo = /^[a-zA-Z0-9@]+$/;

  
    if(validar(correo)){
        bError = true;
        input_correo.classList.add('input--error');
    } else {
        input_correo.classList.remove('input-error');
    };

    
    if(validar(contrasenna)){
        bError = true;
        input_contrasenna.classList.add('input--error');
    } else {
        input_contrasenna.classList.remove('input--error');
    };

    return bError;

};


btn_ingresar.addEventListener('click', inicioSesion);
