'use strict';

const tbody = document.querySelector('#tbl_evento tbody');
const input_filtro = document.querySelector('#txt_filtro_organizador_eventos')
let lista_organizadores;

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    lista_organizadores = await listar_organizador_evento();
    console.log(lista_organizadores);
    
    tbody.innerHTML = '';
    for (let i = 0; i < lista_organizadores.length; i++) {
        let nombre = lista_organizadores[i]['nombre_completo'].toLowerCase();
        if (nombre.includes(filtro)) {
            let fila = tbody.insertRow();

            fila.insertCell().innerText = lista_organizadores[i]['nombre_empresa'];
            fila.insertCell().innerText = lista_organizadores[i]['nombre_comercial'];
            fila.insertCell().innerText = lista_organizadores[i]['log'];
            fila.insertCell().innerText = lista_organizadores[i]['tipo_cedula'];
            fila.insertCell().innerText = lista_organizadores[i]['cedula'];
            fila.insertCell().innerText = lista_organizadores[i]['anos_experiencia'];
            fila.insertCell().innerText = lista_organizadores[i]['provincia'];
            fila.insertCell().innerText = lista_organizadores[i]['canton'];
            fila.insertCell().innerText = lista_organizadores[i]['distrito'];
            fila.insertCell().innerText = lista_organizadores[i]['direccion_exacta'];
            fila.insertCell().innerText = lista_organizadores[i]['nombre_completo'];
            fila.insertCell().innerText = lista_organizadores[i]['correo_electronico'];
            fila.insertCell().innerText = lista_organizadores[i]['fecha'];
            fila.insertCell().innerText = lista_organizadores[i]['telefonos'];
            fila.insertCell().innerText = lista_organizadores[i]['genero'];
            fila.insertCell().innerHTML = '<i class="fas fa-edit"></i>';
            fila.insertCell().innerHTML = '<i class="fas fa-trash-alt"></i>';
        }
    };
}


llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);