'use strict'

const tbody = document.querySelector('#tbl_evento tbody');
const input_filtro = document.querySelector('#txt_filtro_evento')
let lista_eventos;

let org = localStorage.getItem('correo');

console.log(org);

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    lista_eventos = await listar_evento();
    tbody.innerHTML = '';
    for (let i = 0; i < lista_eventos.length; i++) {
        let nombre = lista_eventos[i]['nombre_evento'].toLowerCase();
        if(nombre.includes(filtro)) {
        let fila = tbody.insertRow();
        
        fila.insertCell().innerHTML = lista_eventos[i]['organizador_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['nombre_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['tipo_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['recinto_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['descripcion_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['entrada_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['asistentes_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['limite_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['estado'];
        fila.insertCell().innerHTML = lista_eventos[i]['fechas'];
        fila.insertCell().innerHTML = lista_eventos[i]['impuestos'];
        fila.insertCell().innerHTML = lista_eventos[i]['descuentos'];
    }
};
}


llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);