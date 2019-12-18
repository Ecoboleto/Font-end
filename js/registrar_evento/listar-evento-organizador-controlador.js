'use strict'

const tbody = document.querySelector('#tbl_evento tbody');
const input_filtro = document.querySelector('#txt_filtro_evento')
let lista_eventos;

let org = localStorage.getItem('correo_usuario');

console.log(org);

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    lista_eventos = await listar_evento();
    tbody.innerHTML = '';
    for (let i = 0; i < lista_eventos.length; i++) {
        let nombre = lista_eventos[i]['nombre_evento'].toLowerCase();
        if (nombre.includes(filtro) && lista_eventos[i]['organizador_evento'] == org) {
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

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            let icon1 = document.createElement('i');
            let icon2 = document.createElement('i');

            icon1.classList.add('fas');
            icon1.classList.add('fa-edit');
            icon1.classList.add('verde-oscuro-a--tipografia');

            icon2.classList.add('fas');
            icon2.classList.add('fa-edit');
            icon2.classList.add('verde-oscuro-a--tipografia');


            boton_editar.dataset._id = lista_eventos[i]['_id'];
            boton_editar.classList.add('modificar');
            boton_editar.addEventListener('click', function () {
                sessionStorage.setItem('evento_modificar_id', this.dataset._id)
                window.location.href = 'modificar-eventos.html';
            })

            celda_editar.appendChild(boton_editar);
            boton_editar.appendChild(icon1);




            let celda_cambiar = fila.insertCell();
            let boton_cambiar = document.createElement('button');


            boton_cambiar.dataset._id = lista_eventos[i]['_id'];
            boton_cambiar.classList.add('modificar');
            boton_cambiar.addEventListener('click', function () {
                sessionStorage.setItem('evento_modificar_id', this.dataset._id);
                cambiarEstado(this.dataset._id);
            })

            celda_cambiar.appendChild(boton_cambiar);
            boton_cambiar.appendChild(icon2);

        }
    }
};

/*let cambiarEstado = async (id) => {
    let tipo = await obtener_evento_id(id);
    let idte = tipo['_id'];
    let tipo_evento = tipo['tipo_evento'];
    let estado = tipo['estado'];
    if (estado == 'Activo') {
        estado = 'Inactivo';
        await modificar_evento(idte, tipo_evento, estado);
        llenarTabla();
    } else {
        estado = 'Activo';
        await modificar_evento(idte, tipo_evento, estado);
        llenarTabla();
    }
};*/



llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);