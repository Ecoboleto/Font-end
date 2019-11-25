'use strict'

const tbody = document.querySelector('#tbl_evento tbody');
const input_filtro = document.querySelector('#txt_filtro_evento')
let lista_eventos;

let nombre_tipo_evento = async (pid) => {
    let tipoevento = await listar_tipo_evento();

    let tipoid = pid;
    let nombre = String;
    for (let i = 0; i < tipoevento.length; i++) {
        if (tipoevento[i]['_id'] == tipoid) {
            nombre.value = tipoevento[i]['tipo_evento']
            nombre = tipoevento[i]['tipo_evento']
        }
    }
    return nombre;
}

let nombre_recinto_evento = async (pid) => {
    let recintoevento = await listar_recinto_evento();
    let recintoid = pid;
    let nombre = String;
    for (let i = 0; i < recintoevento.length; i++) {
        if (recintoevento[i]['_id'] == recintoid) {
            nombre.value = recintoevento[i]['nombre_recinto']
            nombre = recintoevento[i]['nombre_recinto']
        }
    }
    return nombre;
}

let nombre_impuestos = async (pid) => {
    let impuestoevento = await listar_impuestos();
    let impuestosid = pid;
    let nombre = [];

    for (let i = 0; i < impuestoevento.length; i++) {
        for (let f = 0; f < impuestosid.length; f++) {
            if (impuestoevento[i]['_id'] == impuestosid[f]) {
                nombre.push(impuestoevento[i]['nombre_impuesto'])
            }
        }
    }
    return nombre;
}

let nombre_descuentos = async (pid) => {
    let descuentoevento = await listar_descuentos();
    let descuentosid = pid;
    let nombre = [];

    for (let i = 0; i < descuentoevento.length; i++) {
        for (let f = 0; f < descuentosid.length; f++) {
            if (descuentoevento[i]['_id'] == descuentosid[f]) {
                nombre.push(descuentoevento[i]['nombre_descuento'])
            }
        }
    }
    return nombre;
}

let llenarTabla = async () => {
    lista_eventos = await listar_evento();
    tbody.innerHTML = '';
    for (let i = 0; i < lista_eventos.length; i++) {
        let tipoevento = await nombre_tipo_evento(lista_eventos[i]['tipo_evento']);
        let recintoevento = await nombre_recinto_evento(lista_eventos[i]['recinto_evento']);
        let impuestosevento = await nombre_impuestos(lista_eventos[i]['impuestos']);
        let descuentosevento = await nombre_descuentos(lista_eventos[i]['descuentos']);

        let fila = tbody.insertRow();

        fila.insertCell().innerHTML = lista_eventos[i]['organizador_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['nombre_evento'];
        fila.insertCell().innerHTML = tipoevento;
        /*fila.insertCell().innerHTML = lista_eventos[i]['foto_evento'];*/
        fila.insertCell().innerHTML = recintoevento;
        fila.insertCell().innerHTML = lista_eventos[i]['descripcion_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['entrada_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['asistentes_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['limite_evento'];
        fila.insertCell().innerHTML = lista_eventos[i]['estado'];
        fila.insertCell().innerHTML = lista_eventos[i]['fechas'];
        fila.insertCell().innerHTML = impuestosevento;
        fila.insertCell().innerHTML = descuentosevento;
    }
};



llenarTabla();