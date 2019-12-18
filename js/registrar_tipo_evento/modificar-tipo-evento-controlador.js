'use stric'

const input_tipo_evento = document.querySelector('#txt_tipo_evento');
const btn_modificar = document.querySelector('#btn_modificar');

let idtp = sessionStorage.getItem('tipo_evento_id');
console.log(idtp);

let llenarFormulario = async () => {
    let tipop = await obtener_tipo_evento_id(idtp);
    console.log(tipop);

    input_tipo_evento.value = tipop['tipo_evento'];

};


if (idtp) {
    llenarFormulario();
} else {
    Swal.fire({
        icon: 'warning',
        title: 'No se puede modificar',
        text: 'Seleccione un tipo de evento antes de modificar',
        confirmButtonText: 'Entendido'
    });
};


//Funcion de validar
let validar = () => {
    let error = false;

    let regex_letras_numeros = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ0-9]+$/;

    if (input_tipo_evento.value == '' || regex_letras_numeros.test(input_tipo_evento.value) == false) {
        error = true;
        input_tipo_evento.classList.add('error');
    } else {
        input_tipo_evento.classList.remove('error');
    }

    return error;
};

const resetear = () => {
    input_tipo_evento.value = "";
}

//Funcion de obtener datos
let obtenerTipoEvento = async () => {
    let tipo_evento = input_tipo_evento.value;

    //Si hay error entra al if
    if (validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Los espacios requeridos se encuentran en blanco o tienen un caracter no permitido',
            text: 'Por favor revise la informacion ingresada',
            confirmButtonText: 'Entendido'
        });

    } else {
        await modificar_tipo_evento(idtp, tipo_evento);
        resetear();
    };
};

btn_modificar.addEventListener('click', obtenerTipoEvento);