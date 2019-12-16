'use strict';

const tbody = document.querySelector("#tbl_impuestos tbody");
const input_filtro = document.querySelector('#txt_filtro_impuestos')
let lista_impuestos;

let cambiarEstado = async (id, imgIcon2) => {
    let impuestoLlamadaId = await obtener_impuesto_id(id);
    let nombre = impuestoLlamadaId['nombre'];
    let porcentaje = impuestoLlamadaId['porcentaje'];
    let estado = impuestoLlamadaId['estado'];
    console.log(nombre);
    if (estado == 'activo') {
        estado = 'desactivo';
        await editar_estado_impuesto(id, nombre, porcentaje, estado);
        llenarTabla();
    } else {
        estado = 'activo';
        await editar_estado_impuesto(id, nombre, porcentaje, estado);
        llenarTabla();
    }
}

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    let lista_impuestos = await listar_impuestos();
    tbody.innerHTML = '';

    for (let i = 0; i < lista_impuestos.length; i++) {
        let nombre = lista_impuestos[i]['nombre'].toLowerCase();
        let porcentaje = String(lista_impuestos[i]['porcentaje']);
        if (nombre.includes(filtro) || porcentaje.includes(filtro)) {
            let fila = tbody.insertRow();
            let imgIcon = document.createElement('i');
            imgIcon.classList.add('fas');//<i class="fas fa-pen"></i>
            imgIcon.classList.add('fa-pen');//<i class="fas fa-backspace"></i>
            imgIcon.id = 'idiconmodificar' + (i + 1);//<i class="fas fa-backspace"></i>lista_impuestos[i]['nombre']
            let imgIcon2 = document.createElement('i');
            imgIcon2.classList.add('fas');//<i class="fas fa-pen"></i>

            switch (lista_impuestos[i]['estado']) {
                case "activo":
                    imgIcon2.classList.add('fa-toggle-on');
                    break;
                case "desactivo":
                    imgIcon2.classList.remove('fa-toggle-on');
                    imgIcon2.classList.add('fa-toggle-off');
                    break;
                default:
                    console.log('default');
            }

            imgIcon2.id = 'idiconborrar' + (i + 1);

            fila.insertCell().innerHTML = lista_impuestos[i]['nombre'][0].toUpperCase() + lista_impuestos[i]['nombre'].slice(1);
            fila.insertCell().innerHTML = lista_impuestos[i]['porcentaje'];
            fila.insertCell().innerHTML = lista_impuestos[i]['estado'];
            fila.insertCell().appendChild(imgIcon);
            fila.insertCell().appendChild(imgIcon2);
            imgIcon.dataset._id = lista_impuestos[i]['_id'];
            imgIcon2.dataset._id = lista_impuestos[i]['_id'];
            imgIcon.addEventListener('click', function () {
                sessionStorage.setItem('_idImpuesto', imgIcon.dataset._id);
                window.location.href = "modificar-impuesto.html";
            });
            imgIcon2.addEventListener('click', function () {
                cambiarEstado(imgIcon2.dataset._id, imgIcon2);
            });
        }

    };

};

llenarTabla();
input_filtro.addEventListener('keyup', llenarTabla);