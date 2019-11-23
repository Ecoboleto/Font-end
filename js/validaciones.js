'use strict';
const regex_contrasena = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,8}$";
const regex_solo_letras = "/^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/";
const regex_telefono = "^\\d{4}-\\d{4}$";
const regex_solo_numeros = "/^[-0-9]+$/";
const regex_letras_numeros = "/^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ0-9]+$/";
const regex_correo_electronico = "^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$";
const regex_nombre_completo = "^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[\\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+[\\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])?$";

/* Valida la edad que sea mayor de edad, retorna true si la validación es correcto */
const validar_edad = (edad) => {
    if( edad <= 18 ){
        return false;
    }
    return true
};

/* Valida un nombre completo, retorna true si la validación es correcto */
const validar_nombre_completo = (valor) => {
    return validar(valor,regex_nombre_completo);
};

/* Valida solo letras, retorna true si la validación es correcto */
const validar_letras = (valor) => {
    return validar(valor,regex_solo_letras);
};

/* Valida un valor si esta vacio, undefined o null, retorna true si la validación es correcto  */
const validar_vacio_null = (valor) => {
    if (valor == '' || valor == undefined || valor == null ) {
        return false;
    };
    return true
};

/* Valida un teléfono, retorna true si la validación es correcto */
const validar_telefono = (valor) => {    
    if(valor == "0000-0000"){
        return false;
    }
    return validar(valor,regex_telefono);
};

/* Valida solo numeros, retorna true si la validación es correcto */
const validar_numeros = (valor) => {
    return validar(valor,regex_solo_numeros);
};

/* Validar solo numeros y letras, retorna true si la validación es correcto */
const validar_numeros_letros = (valor) => {
    return validar(valor,regex_letras_numeros);
};

/* valida un correo electrónico, returna true es correcto */
const validar_correo_electronico = (valor) => {
    return validar(valor,regex_correo_electronico);
};

/* valida si es mayor de eadad , returna true es correcto */
const validar_mayor_edad = (date) => {
    const fecha_actual = new Date ();

};

/* Compara un valor con la expresión regex, retorna true si la validación es correcto */
const validar = (valor,regex) => {   
    let error = true;

    const resultado = valor.match(regex);
    if (valor == '' || valor == undefined || valor == null || resultado == null ) {
        error = false;
    };

    return error;
};

