'use strict';

/* Calcula la edad a partir de la fecha de nacimiento */
const calcular_edad = (fecha_nacimiento) => {      
    const fecha_actual = new Date();
    var fecha_nacimiento = new Date(fecha_nacimiento);

    let edad = fecha_actual.getFullYear() - fecha_nacimiento.getFullYear();
    let mes = fecha_actual.getMonth() - fecha_nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && fecha_actual.getDate() < fecha_nacimiento.getDate())) {
        edad--;
    }
    return edad;
};

/* Normaliza el texto removiendo los espacios innecesarios y capitaliza el string */
const Normaliza_string = (string) => {
    //validamos que el valor ingresado se de tipo string
    if (typeof string !== 'string') return ''
    string = string.trim();
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
};

//Elimina un elemento del array
function eliminar_elemento(array, elemento) {
    const indice = array.indexOf(elemento);
  
    if (indice !== -1) {
      array.splice(indice, 1);
    }
  }