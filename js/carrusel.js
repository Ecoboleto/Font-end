'use strict';

window.onload = function () {
    // Variables
    const imagenes = [
        '../imgs/carrusel/concierto.jpg',
        '../imgs/carrusel/venta_ropa.jpg',
        '../imgs/carrusel/gastronomía.jpg',
        '../imgs/carrusel/charla.jpg'
    ];

    let posicionActual = 0;
    let intervalo;
    const tiempo_intervalo_milesimas_segundo = 5000;
    const boton_retroceder = document.querySelector('#retroceder');
    const boton_avanzar = document.querySelector('#avanzar');
    const imagen = document.querySelector('#imagen');

    // Funciones

    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
    const pasarFoto = () => {
        if(posicionActual >= imagenes.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarImagen();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    const retrocederFoto = () => {
        if(posicionActual <= 0) {
            posicionActual = imagenes.length - 1;
        } else {
            posicionActual--;
        }
        renderizarImagen();
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    const renderizarImagen = () => {
        imagen.style.backgroundImage = `url(${imagenes[posicionActual]})`;
    }

    /**
     * Activa el autoplay de la imagen
     */
    const playIntervalo = () => {
        intervalo = setInterval(pasarFoto, tiempo_intervalo_milesimas_segundo);
        // Desactivamos los botones de control
        boton_avanzar.setAttribute('disabled', true);
        boton_retroceder.setAttribute('disabled', true);
    }

    // Eventos
    boton_avanzar.addEventListener('click', pasarFoto);
    boton_retroceder.addEventListener('click', retrocederFoto);
    // Iniciar
    playIntervalo();
    renderizarImagen();
}; 