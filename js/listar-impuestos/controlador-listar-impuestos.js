'use strict';

const tbody = document.querySelector("#tbl_impuestos tbody");
const input_filtro = document.querySelector('#txt_filtro_impuestos')
let lista_impuestos;

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    lista_impuestos = await listar_impuestos();
    tbody.innerHTML = '';
    for (let i = 0; i < lista_impuestos.length; i++) {
        let nombre = lista_impuestos[i]['nombre'].toLowerCase();
        let porcentaje = String(lista_impuestos[i]['porcentaje']);
        if (nombre.includes(filtro) || porcentaje.includes(filtro)) {
            let fila = tbody.insertRow();
            
            fila.insertCell().innerHTML = lista_impuestos[i]['nombre'][0].toUpperCase() + lista_impuestos[i]['nombre'].slice(1);
            fila.insertCell().innerHTML = lista_impuestos[i]['porcentaje'];
            fila.insertCell().innerHTML = lista_impuestos[i]['estado'];
        }
    };

};

llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);