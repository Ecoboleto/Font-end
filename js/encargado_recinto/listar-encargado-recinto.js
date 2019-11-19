'use strict';

const tbody_table = document.querySelector('#tbl-personas tbody');

//Lista sin filtrar y los muestra en la tabla
const listar_sin_filtro = async () => {
    //Obtenemos los datos
    await listar__encargado_recinto().then(res => {

    
        //llenamos la tabla
        res.forEach(encargados => {
            let fila = tbody_table.insertRow();
            //fila.insertCell().innerHTML = encargados.cedula;
            //fila.insertCell().innerHTML = encargados.nombre;
            //fila.insertCell().innerHTML = encargados.correo;
        });
    });
};

/*
//Lista con el filtrar y los muestra en la tabla
let listar_con_filtro = async () => {
    //const filtro_correo = input_filtro_correo.value.toLowerCase();
    //const filtro_nombre = input_filtro_nombre.value.toLowerCase();

    lista_personas = await listar__encargado_recinto();
    tbody.innerHTML = '';

    lista_personas.forEach(persona => {
        //Mornalizamos
        //const nombre = persona.nombre.toLowerCase();
        //const correo = persona.correo.toLowerCase();

        // No aplicamos el filtro
        if (filtro_correo == "" && filtro_nombre == "") {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = persona.cedula;
            fila.insertCell().innerHTML = persona.nombre;
            fila.insertCell().innerHTML = persona.correo;
            return;
        }

        // Aplicamos el filtro
        if (nombre.includes(filtro_nombre) && correo.includes(filtro_correo)) {
            //let fila = tbody.insertRow();
            //fila.insertCell().innerHTML = persona.cedula;
            //fila.insertCell().innerHTML = persona.nombre;
            //fila.insertCell().innerHTML = persona.correo;
        }
    });
};
*/

listar_sin_filtro();