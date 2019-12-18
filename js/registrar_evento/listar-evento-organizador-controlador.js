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

let cambiarEstado = async (id) => {
    let evento= await obtener_evento_id(id);
    let idtp = evento['_id'];
    let tipo_evento = evento['tipo_evento'];
    let foto_evento = evento['foto_evento'];
    let recinto_evento = evento['recinto_evento'];
    let descripcion_evento = evento['descripcion_evento'];
    let entrada_evento = evento['entrada_evento'];
    let asistentes_evento = evento['asistentes_evento'];
    let limite_evento = evento['limite_evento'];
    let fechas = evento['fechas'];
    let impuestos = evento['impuestos'];
    let descuentos = evento['descuentos'];
    let estado = evento['estado'];

    if (estado == 'Activo') {
        estado = 'Inactivo';
        await modificar_evento(idtp, tipo_evento, foto_evento, recinto_evento, descripcion_evento, entrada_evento, asistentes_evento, limite_evento, fechas, impuestos, descuentos, estado);
        llenarTabla();
    } else {
        estado = 'Activo';
        await modificar_evento(idtp, tipo_evento, foto_evento, recinto_evento, descripcion_evento, entrada_evento, asistentes_evento, limite_evento, fechas, impuestos, descuentos, estado);
        llenarTabla();
    }
};



llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);