'use strict';


const input_correo = document.querySelector('#txt_correo');
const input_primer_nombre = document.querySelector('#txt_primer-nombre');
const input_segundo_nombre = document.querySelector('#txt_segundo-nombre');
const input_primer_apellido = document.querySelector('#txt_primer-apellido');
const input_segundo_apellido = document.querySelector('#txt_segundo-apellido');
const input_fecha_nacimiento = document.querySelector('#txt_fecha-nacimiento');
const input_provincia = document.querySelector('#txt_provincia');
const input_canton = document.querySelector('#txt_canton');
const input_distrito = document.querySelector('#txt_distrito');
const input_genero = document.querySelector('.txt_genero');
const btn_guardar = document.querySelector('#btn-guardar');
const avatar_usuario = document.querySelector('#imgAvatar');
let edad;
 


const validar_datos = (correo, primer_nombre, primer_apellido,fecha_nacimiento,
     provincia, canton, distrito) => {

    let error = false;

    //removemos la clase error  
    input_correo.classList.remove('input--error');
    input_primer_nombre.classList.remove('input--error');
    input_primer_apellido.classList.remove('input--error');
    input_fecha_nacimiento.classList.remove('input--error');
    input_provincia.classList.remove('input--error');
    input_canton.classList.remove('input--error');
    input_distrito.classList.remove('input--error'); 
   
    

    if (!validar_vacio_null(primer_nombre)) {
        error = true;
        input_primer_nombre.classList.add('input--error');
    }

      
    if (!validar_vacio_null(primer_apellido)) {
        error = true;
        input_primer_apellido.classList.add('input--error');
    }

  
    if(!validar_vacio_null(correo)){
        error = true;
        input_correo.classList.add('input--error');
    }

    
    if(!validar_vacio_null(fecha_nacimiento)){
        error = true;
        input_fecha_nacimiento.classList.add('input--error');
    }

    
    if(!validar_vacio_null(provincia)){
        error = true;
        input_provincia.classList.add('input--error');
    }

    
    if(!validar_vacio_null(canton)){
        error = true;
        input_canton.classList.add('input--error');
    }

    if(!validar_vacio_null(distrito)){
        error = true;
        input_distrito.classList.add('input--error');
    }

    return error;
    
};

let registrar_usuarios_finales = () => {

    let correo = input_correo.value;
    let primer_nombre = input_primer_nombre.value;
    let segundo_nombre = input_segundo_nombre.value;
    let primer_apellido = input_primer_apellido.value;
    let segundo_apellido = input_segundo_apellido.value;
    let fecha_nacimiento = input_fecha_nacimiento.value;
    edad = getEdad(input_fecha_nacimiento.value);
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let genero = input_genero.value;
    let avatar = avatar_usuario.src; 
    

    if (validar_datos(correo, primer_nombre, primer_apellido,fecha_nacimiento,
         provincia, canton, distrito) ) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })

    } else {

       try {

        registrar_usuario_final(correo, primer_nombre, segundo_nombre, primer_apellido,
            segundo_apellido,fecha_nacimiento,edad, provincia, canton, distrito, genero, avatar);

        Swal.fire({
            icon: 'success',
            title: 'Registro realizado con exito',
            text: 'El usuario ha sido almacenado',
            confirmButtonText: 'Entendido'
        })
           
       } catch (error) {

        Swal.fire({
            icon: 'warning', 
            title: 'Error en el registro', 
            text: 'El usuario ya se encuentra registrado', 
            confirmButtonText: 'Entendido'
        })
           
       }

      
    }





};



btn_guardar.addEventListener('click', registrar_usuarios_finales);