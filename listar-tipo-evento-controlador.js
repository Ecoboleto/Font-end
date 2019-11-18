'use strict'

const tbody = document.querySelector('#tbl_tipo_evento tbody');
const input_filtro = document.querySelector('#txt_filtro_tipo_evento')
let lista_tipos_eventos;

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    lista_tipos_eventos = await listar_tipo_evento();
    tbody.innerHTML = '';
    for (let i = 0; i < lista_tipos_eventos.length; i++) {
        let tipo_evento = lista_tipos_eventos[i]['tipo_evento'].toLowerCase();
        if(tipo_evento.includes(filtro)) {
            let fila = tbody.insertRow();

        fila.insertCell().innerHTML = lista_tipos_eventos[i]['tipo_evento'];
        }
    };
};

llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);