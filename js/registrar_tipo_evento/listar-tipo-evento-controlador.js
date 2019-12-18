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
        fila.insertCell().innerHTML = lista_tipos_eventos[i]['estado'];

        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');

        boton_editar.innerText = 'Editar';
        boton_editar.dataset._id = lista_tipos_eventos[i]['_id'];
        boton_editar.addEventListener('click', function(){
            sessionStorage.setItem('tipo_evento_id', this.dataset._id)
            window.location.href = 'modificar-tipo-evento.html';
        })

        celda_editar.appendChild(boton_editar);

        }
    };
};

llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);