'use strict';

window.onload = function () {
    // Variables
    const imagenes = [
        '../imgs/carrusel/concierto.jpg',
        '../imgs/carrusel/venta_ropa.jpg',
        '../imgs/carrusel/gastronomía.jpg',
        '../imgs/carrusel/charla.jpg'
    ];

    let posicion_actual = 0;
    let intervalo;
    const tiempo_intervalo_milesimas_segundo = 5000;
    const boton_retroceder = document.querySelector('#retroceder');
    const boton_avanzar = document.querySelector('#avanzar');
    const imagen = document.querySelector('#imagen');

    // Funciones

    //Funcion que cambia la foto en la siguiente posicion
    const pasar_foto = () => {
        if (posicion_actual >= imagenes.length - 1) {
            posicion_actual = 0;
        } else {
            posicion_actual++;
        }
        renderizar_imagen();
    }

    //Funcion que cambia la foto en la anterior posicion
    const retroceder_foto = () => {
        if (posicion_actual <= 0) {
            posicion_actual = imagenes.length - 1;
        } else {
            posicion_actual--;
        }
        renderizar_imagen();
    }

    //Funcion que actualiza la imagen de imagen dependiendo de posicion_actual
    const renderizar_imagen = () => {
        imagen.style.backgroundImage = `url(${imagenes[posicion_actual]})`;
    }

    //Activa el autoplay de la imagen
    const iniciar_intervalo = () => {
        intervalo = setInterval(pasar_foto, tiempo_intervalo_milesimas_segundo);
    }

    // Eventos
    boton_avanzar.addEventListener('click', pasar_foto);
    boton_retroceder.addEventListener('click', retroceder_foto);
    // Iniciar
    iniciar_intervalo();
    renderizar_imagen();
}; 