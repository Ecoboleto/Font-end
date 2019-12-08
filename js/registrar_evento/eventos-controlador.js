'use strict'

const contenedor = document.querySelector('#eventos');
let lista_eventos;


let fechas = async (fechas_obt) => {
    let fechatest = [];
    let fech;
    for (let i = 0; i < fechas_obt.length; i++) {

        fech = fechas_obt[i].slice(0, 10);
        fechatest.push('Fecha: ' + fech);
        return fechatest;
    }
};

let horas = async (horas_obt) => {
    let horatest = [];
    let hor;
    for (let i = 0; i < horas_obt.length; i++) {

        hor = horas_obt[i].slice(12, 17);
        horatest.push('Hora: ' + hor);
        return horatest;
    }
};


let crearCards = async () => {
    lista_eventos = await listar_evento();

    for (let i = 0; i < lista_eventos.length; i++) {



        let card = document.createElement('div');
        let cont_img = document.createElement('figure');
        let imagen = document.createElement('img');
        let nombre = document.createElement('h3');
        let tipo = document.createElement('p');
        let fecha = document.createElement('p');
        let hora = document.createElement('p');
        let recinto = document.createElement('p');
        let precio = document.createElement('p');
        let boton = document.createElement('button');

        imagen.src = lista_eventos[i]['foto_evento'];
        nombre.innerHTML = lista_eventos[i]['nombre_evento'];
        tipo.innerHTML = lista_eventos[i]['tipo_evento'];
        fecha.innerHTML = await fechas(lista_eventos[i]['fechas']);
        hora.innerHTML = await horas(lista_eventos[i]['fechas']);
        recinto.innerHTML = lista_eventos[i]['recinto_evento'];
        precio.innerHTML = ('Precio: ₡' + lista_eventos[i]['entrada_evento']);
        boton.value = lista_eventos[i]['_id'];
        boton.innerHTML = 'Ver evento';

        card.classList.add('card');
        cont_img.classList.add('imgcont');
        imagen.classList.add('img');
        nombre.classList.add('nombre');
        tipo.classList.add('recinto',
                            'mb-2',
                            'd-bloque');
        fecha.classList.add('fecha', 
                            'mb-2', 
                            'd-bloque');
        hora.classList.add('fecha', 
                            'mb-2', 
                            'd-bloque');
        recinto.classList.add('recinto', 
                              'mb-2', 
                              'd-bloque');
        precio.classList.add('precio', 
                             'mb-2', 
                             'd-bloque');
        boton.classList.add('btn', 
                            'btn--accion', 
                            'btn--positivo', 
                            'blanco--tipografia', 
                            'button');

        contenedor.appendChild(card);
        card.appendChild(cont_img);
        cont_img.appendChild(imagen);
        card.appendChild(nombre);
        card.appendChild(tipo);
        card.appendChild(fecha);
        card.appendChild(hora);
        card.appendChild(recinto);
        card.appendChild(precio);
        card.appendChild(boton);

    }
};

crearCards();