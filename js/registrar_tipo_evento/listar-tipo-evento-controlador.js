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
        //let icon_boton_editar = '<i title="Modificar" class="fas fa-edit verde-oscuro-a--tipografia"></i>';
        let icon1 = document.createElement('i');
        let icon2 = document.createElement('i');

        icon1.classList.add('fas');
        icon1.classList.add('fa-edit');
        icon1.classList.add('verde-oscuro-a--tipografia');

        icon2.classList.add('fas');
        icon2.classList.add('fa-edit');
        icon2.classList.add('verde-oscuro-a--tipografia');

        
        boton_editar.dataset._id = lista_tipos_eventos[i]['_id'];
        boton_editar.classList.add('modificar');
        boton_editar.addEventListener('click', function(){
            sessionStorage.setItem('tipo_evento_id', this.dataset._id)
            window.location.href = 'modificar-tipo-evento.html';
        })

        celda_editar.appendChild(boton_editar);
        boton_editar.appendChild(icon1);




        let celda_cambiar = fila.insertCell();
        let boton_cambiar = document.createElement('button');

        
        boton_cambiar.dataset._id = lista_tipos_eventos[i]['_id'];
        boton_cambiar.classList.add('modificar');
        boton_cambiar.addEventListener('click', function(){
            sessionStorage.setItem('tipo_evento_id', this.dataset._id);
            cambiarEstado(this.dataset._id);
        })

        celda_cambiar.appendChild(boton_cambiar);
        boton_cambiar.appendChild(icon2);

        }
    };
};

let cambiarEstado = async (id) => {
    let tipo = await obtener_tipo_evento_id(id);
    let idte = tipo['_id'];
    let tipo_evento = tipo['tipo_evento'];
    let estado = tipo['estado'];
    if (estado == 'Activo') {
        estado = 'Inactivo';
        await modificar_tipo_evento(idte, tipo_evento, estado);
        llenarTabla();
    } else {
        estado = 'Activo';
        await modificar_tipo_evento(idte, tipo_evento, estado);
        llenarTabla();
    }
}

llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);