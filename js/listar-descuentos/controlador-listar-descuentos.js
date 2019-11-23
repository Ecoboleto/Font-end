'use strict';

'use strict';

const tbody = document.querySelector("#tbl_descuentos tbody");
const input_filtro = document.querySelector('#txt_filtro_descuentos')
let lista_descuentos;

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    lista_descuentos = await listar_descuentos();
    tbody.innerHTML = '';
    for (let i = 0; i < lista_descuentos.length; i++) {
        let nombre = lista_descuentos[i]['nombre'].toLowerCase();
        let porcentaje = String(lista_descuentos[i]['porcentaje']);
        if (nombre.includes(filtro) || porcentaje.includes(filtro)) {
            let fila = tbody.insertRow();

            fila.insertCell().innerHTML = lista_descuentos[i]['nombre'][0].toUpperCase() + lista_descuentos[i]['nombre'].slice(1);
            fila.insertCell().innerHTML = lista_descuentos[i]['porcentaje'];
            fila.insertCell().innerHTML = lista_descuentos[i]['estado'];
        }
    };

};

llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);
