'use strict';

// Inicio: Año automatizado en el footer
    let anno = new Date().getFullYear();
    document.querySelector('#anno_footer').innerHTML = anno;
// Fin: Año automatizado en el footer