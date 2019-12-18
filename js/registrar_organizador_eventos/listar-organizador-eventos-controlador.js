'use strict';

const tbody = document.querySelector('#tbl_evento tbody');
const input_filtro = document.querySelector('#txt_filtro_organizador_eventos');
let filtro_marcado = document.getElementsByName('filtro');
let activar = document.createElement('button');
let lista_organizadores;

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    lista_organizadores = await listar_organizador_evento();

    tbody.innerHTML = '';
    for (let i = 0; i < lista_organizadores.length; i++) {
        let nombre_empresa = lista_organizadores[i]['nombre_empresa'].toLowerCase();
        let provincia = lista_organizadores[i]['provincia'].toLowerCase();
        let nombre_completo = lista_organizadores[i]['nombre_completo'].toLowerCase();
        let correo_electronico = lista_organizadores[i]['correo_electronico'].toLowerCase();
        let cedula = lista_organizadores[i]['cedula'];
        let modificar = document.createElement('button');
        activar = document.createElement('button');
        let icono_modificar = '<i title="Modificar" class="fas fa-edit verde-oscuro-a--tipografia"></i>';
        let icono_activar = '<i title="Modificar" class="fas fa-eye verde-oscuro-a--tipografia"></i>';

        modificar.classList.add('modificar');
        modificar.dataset._id = lista_organizadores[i]['_id'];
        modificar.innerHTML = icono_modificar;
        modificar.addEventListener('click', function () {
            localStorage.setItem('_idorganizador', this.dataset._id);
            window.location.href = 'modificar-organizador-eventos.html';
        });

        activar.classList.add('modificar');
        activar.id = 'activar';
        activar.dataset._id = lista_organizadores[i]['_id'];
        activar.innerHTML = icono_activar;
        activar.addEventListener('click', function () {
            localStorage.setItem('_idorganizador', this.dataset._id);
        });

        // console.log(modificar);

        if (lista_organizadores[i].tipo_usuario == 'organizador_evento') {
            if (nombre_empresa.includes(filtro)
                || provincia.includes(filtro)
                || nombre_completo.includes(filtro)
                || correo_electronico.includes(filtro)
                || cedula.includes(filtro)
            ) {
                let fila = tbody.insertRow();
                let fecha = new Date(lista_organizadores[i]['fecha']);
                let dia = fecha.getDate() + 1;
                let mes = fecha.getMonth() + 1;
                let anno = fecha.getFullYear();
                let fecha_impresion = dia + '/' + mes + '/' + anno;

                let estado;

                if (lista_organizadores[i]['estado']) {
                    estado = 'Activo';
                } else {
                    estado = 'Inactivo';
                }

                fila.insertCell().innerText = lista_organizadores[i]['nombre_empresa'];
                // fila.insertCell().innerText = lista_organizadores[i]['nombre_comercial'];
                fila.insertCell().innerHTML = '<img src="' + lista_organizadores[i]['log'] + '" class="logo-empresas">';
                fila.insertCell().innerText = lista_organizadores[i]['tipo_cedula'];
                fila.insertCell().innerText = lista_organizadores[i]['cedula'];
                // fila.insertCell().innerText = lista_organizadores[i]['anos_experiencia'];
                fila.insertCell().innerText = lista_organizadores[i]['provincia'];
                fila.insertCell().innerText = lista_organizadores[i]['canton'];
                fila.insertCell().innerText = lista_organizadores[i]['distrito'];
                // fila.insertCell().innerText = lista_organizadores[i]['direccion_exacta'];
                fila.insertCell().innerText = lista_organizadores[i]['nombre_completo'];
                fila.insertCell().innerText = lista_organizadores[i]['correo_electronico'];
                fila.insertCell().innerText = fecha_impresion;
                fila.insertCell().innerText = lista_organizadores[i]['telefonos'];
                fila.insertCell().innerText = lista_organizadores[i]['genero'];
                fila.insertCell().innerText = estado;
                fila.insertCell().appendChild(activar);
                fila.insertCell().appendChild(modificar);
                activar.addEventListener('click', activar_desactivar);
            }
        }
    };
}

const cambiar_estado_organizador = async (_id) => {
    let organizador = await obtener_organizador_id(_id);
    let estado_cambiar = organizador.estado;
    let estado_nuevo;
    console.log(estado_cambiar);
    
    if(estado_cambiar == true){
        estado_nuevo = false;
    } else {
        estado_nuevo = true;
    }

    await modificar_organizador_eventos_estado(organizador, estado_nuevo);
}

const activar_desactivar = async () => {
    // console.log(localStorage.getItem('_idorganizador'));

    let _id = localStorage.getItem('_idorganizador');

    if (_id) {
        await cambiar_estado_organizador(_id);
        await llenarTabla();
    } else {
        console.log('Seleccione un usuario para modificar');
    }
};


llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);