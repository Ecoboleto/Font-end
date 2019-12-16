'use strict';

const tbody = document.querySelector("#tbl_descuentos tbody");
const input_filtro = document.querySelector('#txt_filtro_descuentos')
let lista_descuentos;

let cambiarEstado = async (id, imgIcon2) => {
    let descuentoLlamadaId = await obtener_descuento_id(id);
    let nombre = descuentoLlamadaId['nombre'];
    let porcentaje = descuentoLlamadaId['porcentaje'];
    let estado = descuentoLlamadaId['estado'];
    console.log(nombre);
    if (estado == 'activo') {
        estado = 'desactivo';
        await editar_estado_descuento(id, nombre, porcentaje, estado);
        llenarTabla();
    } else {
        estado = 'activo';
        await editar_estado_descuento(id, nombre, porcentaje, estado);
        llenarTabla();
    }
}

let llenarTabla = async () => {
    let filtro = input_filtro.value.toLowerCase();
    let lista_descuentos = await listar_descuentos();
    tbody.innerHTML = '';

    for (let i = 0; i < lista_descuentos.length; i++) {
        let nombre = lista_descuentos[i]['nombre'].toLowerCase();
        let porcentaje = String(lista_descuentos[i]['porcentaje']);
        if (nombre.includes(filtro) || porcentaje.includes(filtro)) {
            let fila = tbody.insertRow();
            let imgIcon = document.createElement('i');
            imgIcon.classList.add('fas');//<i class="fas fa-pen"></i>
            imgIcon.classList.add('fa-pen');//<i class="fas fa-backspace"></i>   <i class="fas fa-toggle-on"></i>
            imgIcon.id = 'idiconmodificar' + (i + 1);//<i class="fas fa-backspace"></i>lista_descuentos[i]['nombre']
            let imgIcon2 = document.createElement('i');
            imgIcon2.classList.add('fas');//<i class="fas fa-pen"></i>

            switch (lista_descuentos[i]['estado']) {
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

            fila.insertCell().innerHTML = lista_descuentos[i]['nombre'][0].toUpperCase() + lista_descuentos[i]['nombre'].slice(1);
            fila.insertCell().innerHTML = lista_descuentos[i]['porcentaje'];
            fila.insertCell().innerHTML = lista_descuentos[i]['estado'];
            fila.insertCell().appendChild(imgIcon);
            fila.insertCell().appendChild(imgIcon2);
            imgIcon.dataset._id = lista_descuentos[i]['_id'];
            imgIcon2.dataset._id = lista_descuentos[i]['_id'];
            imgIcon.addEventListener('click', function () {
                sessionStorage.setItem('_idDescuento', imgIcon.dataset._id);
                window.location.href = "modificar-descuento.html";
            });
            imgIcon2.addEventListener('click', function () {
                cambiarEstado(imgIcon2.dataset._id, imgIcon2);
            });
        }

    };

};

llenarTabla();

input_filtro.addEventListener('keyup', llenarTabla);

