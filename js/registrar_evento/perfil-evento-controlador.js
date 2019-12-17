'use strict'

const contenedor = document.querySelector('#evento');
let evento;
let idevento = localStorage.getItem('evento_id');
console.log(idevento);

let escogerEntradas = async (limite) => {


};

let fechasi = async (fechas_obt) => {
    let fechatest = [];
    let fech;
    for (let i = 0; i < fechas_obt.length; i++) {

        fech = fechas_obt[i].slice(0, 10);
        fechatest.push(fech);

    }
    return fechatest;
};

let crearInfo = async () => {
    //lista_eventos = await listar_evento();
    //idevento = localStorage.getItem('evento_id');

    //for (let i = 0; i < lista_eventos.length; i++) {
    //if (idevento == lista_eventos[i]['_id']) {
    evento = await obtener_evento_id(idevento);

    let cont_evento = document.createElement('div');
    let cont_img = document.createElement('figure');
    let imagen = document.createElement('img');
    let nombre = document.createElement('p');
    let tipo = document.createElement('p');
    let recinto = document.createElement('p');
    let fechas = document.createElement('p');
    let descripcion = document.createElement('p');
    let precio = document.createElement('p');
    let limite = document.createElement('p');
    let sel_entradas = document.createElement('label');
    let cant_entradas = document.createElement('select');
    let opt_entradas = document.createElement('option');
    let carrito = document.createElement('button');
    let comprar = document.createElement('button');


    imagen.src = evento['foto_evento'];
    nombre.innerHTML = (evento['nombre_evento']);
    tipo.innerHTML = (evento['tipo_evento']);
    recinto.innerHTML = (evento['recinto_evento']);
    fechas.innerHTML = ('Fechas de evento: ' + await fechasi(evento['fechas']));
    descripcion.innerHTML = ('Descripción de evento: ' + evento['descripcion_evento']);
    precio.innerHTML = ('Precio de entrada: ₡' + evento['entrada_evento']);
    limite.innerHTML = ('Límite de entradas: ' + evento['limite_evento']);
    sel_entradas.innerHTML = ('Seleccione la cantidad de entradas: ');
    opt_entradas.innerHTML = ('---');
    carrito.innerHTML = ('Agregar al carrito')
    comprar.innerHTML = ('Comprar')


    cont_evento.classList.add('evento');
    cont_img.classList.add('cont_img');
    imagen.classList.add('img');
    nombre.classList.add('nombre');
    tipo.classList.add('tipo');
    recinto.classList.add('recinto');
    fechas.classList.add('fechas');
    descripcion.classList.add('descripcion');
    precio.classList.add('precio');
    limite.classList.add('limite');
    sel_entradas.classList.add('lab');
    cant_entradas.classList.add('sel');

    carrito.classList.add('btn');
    carrito.classList.add('btn--accion');
    carrito.classList.add('btn--positivo');
    carrito.classList.add('blanco--tipografia');

    comprar.classList.add('btn');
    comprar.classList.add('btn--accion');
    comprar.classList.add('btn--positivo');
    comprar.classList.add('blanco--tipografia');



    contenedor.appendChild(cont_evento);
    cont_evento.appendChild(cont_img);
    cont_img.appendChild(imagen);
    cont_evento.appendChild(nombre);
    cont_evento.appendChild(tipo);
    cont_evento.appendChild(recinto);
    cont_evento.appendChild(fechas);
    cont_evento.appendChild(descripcion);
    cont_evento.appendChild(precio);
    cont_evento.appendChild(limite);
    cont_evento.appendChild(sel_entradas);
    cont_evento.appendChild(cant_entradas);
    cant_entradas.appendChild(opt_entradas);
    let cant_limite = Number(evento['limite_evento']);
    for (let i = 1; i <= cant_limite; i++) {
        let opt_entradas = document.createElement('option');
        opt_entradas.innerHTML = i;
        cant_entradas.appendChild(opt_entradas);
    }
    cont_evento.appendChild(carrito);
    cont_evento.appendChild(comprar);
}

crearInfo();