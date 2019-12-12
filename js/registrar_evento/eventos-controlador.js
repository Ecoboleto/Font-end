'use strict'

const contenedor = document.querySelector('#eventos');
//const btn_evento = document.querySelector('.btn');
let lista_eventos;


let fechas = async (fechas_obt) => {
    let fechatest = [];
    let fech;
    for (let i = 0; i < fechas_obt.length; i++) {

        fech = fechas_obt[i].slice(0, 10);
        fechatest.push(fech);
        
    }
    return fechatest;
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

let perfilEvento = (id) => {
    //const btn_evento = document.querySelector('.btn');
    //let idevento = btn_evento.value;
    window.localStorage.setItem('evento_id', id);
    window.location = "perfil-evento.html";
    console.log(id);
};


let crearCards = async () => {
    lista_eventos = await listar_evento();

    for (let i = 0; i < lista_eventos.length; i++) {



        let card = document.createElement('div');
        let cont_img = document.createElement('figure');
        let imagen = document.createElement('img');
        let nombre = document.createElement('h3');
        let tipo = document.createElement('h7');
        let fecha = document.createElement('h5');
        let hora = document.createElement('h5');
        let recinto = document.createElement('h7');
        let precio = document.createElement('h9');
        let boton = document.createElement('button');

        imagen.src = lista_eventos[i]['foto_evento'];
        nombre.innerHTML = lista_eventos[i]['nombre_evento'];
        tipo.innerHTML = lista_eventos[i]['tipo_evento'];
        fecha.innerHTML = 'fecha: ' + await fechas(lista_eventos[i]['fechas']);
        hora.innerHTML = await horas(lista_eventos[i]['fechas']);
        recinto.innerHTML = lista_eventos[i]['recinto_evento'];
        precio.innerHTML = ('Precio: ₡' + lista_eventos[i]['entrada_evento']);
        //boton.value = lista_eventos[i]['_id'];
        boton.innerHTML = 'Ver evento';
        boton.setAttribute("onclick", `perfilEvento('${lista_eventos[i]['_id']}');`);

        card.classList.add('card');
        cont_img.classList.add('imgcont');
        imagen.classList.add('img');
        nombre.classList.add('nombre');
        tipo.classList.add('recinto');
        fecha.classList.add('fecha');
        hora.classList.add('fecha');
        recinto.classList.add('recinto');
        precio.classList.add('precio');
        boton.classList.add('btn');
        boton.classList.add('btn--accion');
        boton.classList.add('btn--positivo');
        boton.classList.add('blanco--tipografia');

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
//btn_evento.addEventListener('click', perfilEvento);