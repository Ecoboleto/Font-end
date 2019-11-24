'use strict'

const correo = document.querySelector('#txt_correo_electronico'); 
const contrasenna = document.querySelector('#txt_contrasenna');

const btn_ingresar = document.querySelector('.btn-iniciar-sesion'); 

const inicioSesion = () => {
    let sUsuario = inputUsuario.value;
    let sContrasenna = inputContrasenna.value;
    let bAcceso = false;
    let bError = validar(sUsuario, sContrasenna);

    if(bError == true){
        
        if(sUsuario == '' || sContrasenna == ''){
            swal({
                type : 'warning',
                title: 'Algo ocurrió',
                text: 'El campo no puede estar vacío',
                confirmButtonText: 'Entendido'
            });
            console.log('El campo no puede estar vacío');
        } else if(sUsuario == null || sContrasenna == null){
            swal({
                type : 'warning',
                title: 'Algo ocurrió',
                text: 'Tuvimos un problema por favor intentelo de nuevo',
                confirmButtonText: 'Entendido'
            });
            console.log('Tuvimos un problema por favor intentelo de nuevo');
        };

    } else {
        
        bAcceso = validarCredenciales(sUsuario, sContrasenna);
        limpiarFormulario();
    
        if(bAcceso == true){
            ingresar();
        };

    };
};
//Fin: Funcion Iniciar Sesion

//Inicio: Funcion Ingresar
const ingresar = () => {
    let rol = sessionStorage.getItem('rolUsuarioActivo');

    switch(rol){
        case 'Admin':
            window.location.href = 'pag/admin.html';
        break;
        case 'Instructor':
            window.location.href = 'pag/instructor.html';
        break;
        case 'Cliente':
            window.location.href = 'pag/cliente.html';
        break;
        default:
            swal({
                type : 'warning',
                title: 'Algo ocurrió',
                text: 'Su usuario o contraseña no coinciden con los del sistema, intentelo nuevamente o contacte a su instructor.',
                confirmButtonText: 'Entendido'
            });
        break;
    };
}
//Fin: Funcion Ingresar

//Inicio: Funcion limpiarFormulario
const limpiarFormulario = () => {
    inputUsuario.value = '';
    inputContrasenna.value = '';
};
//Fin: Funcion limpiarFormulario

