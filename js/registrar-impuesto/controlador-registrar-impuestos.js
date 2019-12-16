'use strict';

let btnRegistrarImpuesto = document.querySelector("#btn-registrar");
let banderaDefinitiva = true;
let lista_impuestos =  listar_impuestos();

let enviarAValidarParaEnviarARegistro = async() => {
    let banderaError = false;
    let inptNombre = document.querySelector("#inpt-nombre").value;
    let inptPorcentaje = document.querySelector("#inpt-monto").value;

    

    let regexnombreimpuesto = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
    let regexporcentajeimpuesto = /^[-+]?[0-9]\d{0,2}(\.\d{1,2})?%?$/;
    console.log(regexporcentajeimpuesto.test(inptPorcentaje));
    console.log(regexporcentajeimpuesto.test(inptPorcentaje));


    if (inptNombre == "" || regexnombreimpuesto.test(inptNombre) == false) {
        banderaError = true;
        document.querySelector("#inpt-nombre").classList.add("class-inpt-nombre");
    } else {
        document.querySelector("#inpt-nombre").classList.remove("class-inpt-nombre");
    }
    if (inptPorcentaje == "" || regexporcentajeimpuesto.test(inptPorcentaje) == false) {
        banderaError = true;
        document.querySelector("#inpt-monto").classList.add("class-inpt-porcentaje");
    } else {
        document.querySelector("#inpt-monto").classList.remove("class-inpt-porcentaje");
    }
    //El impuesto no se pudo registrar, ocurrio el siguiente error
    if (banderaError == true) {
        Swal.fire({
            title: 'Ha ocurrido un pequeño error',
            text: 'Al ingresar los datos',
            icon: 'error',
            confirmButtonText: 'ok!'
        })
    }


    if (banderaError != true) {
        let estado = 'activo';
        consultar_dato_repetido_y_registrar(inptNombre,lista_impuestos,inptPorcentaje,estado);
    }
};


let consultar_dato_repetido_y_registrar = async (inptNombre,lista_impuestos,inptPorcentaje,estado) => {
    let ultimo_numero;
    let banderaErrorDatoRepetido = false;
    let varNombreRepetido = document.querySelector("#inpt-nombre").value;

    for (let i = 0; i < lista_impuestos.length; i++) {
        if (varNombreRepetido == lista_impuestos[i]['nombre'] || inptNombre.toLowerCase() == lista_impuestos[i]['nombre']) {
            banderaErrorDatoRepetido = true;
            Swal.fire({
                title: 'Ha ocurrido un pequeño error(dato repetido).',
                text: 'Existe un mismo nombre dentro del sistema.',
                icon: 'error',
                confirmButtonText: 'ok!'
            })
        }
    }
    if (lista_impuestos.length != 0) {
        if (banderaErrorDatoRepetido != true) {
            await registrarDatosDeLosImpuestos(inptNombre, Number(inptPorcentaje), estado);
            Swal.fire({
                title: 'Datos registrados',
                text: 'en el sistema',
                icon: 'success',
                confirmButtonText: 'ok!'
            })
            document.getElementById('inpt-nombre').value='';
            document.getElementById('inpt-monto').value='';
        }
    }else if (lista_impuestos.length == 0) {

            await registrarDatosDeLosImpuestos(inptNombre, Number(inptPorcentaje), estado);
            Swal.fire({
                title: 'Datos registrados',
                text: 'en el sistema',
                icon: 'success',
                confirmButtonText: 'ok!'
            })
            document.getElementById('inpt-nombre').value='';
            document.getElementById('inpt-monto').value='';
        

    }else{
        Swal.fire({
            title: 'Ha ocurrido un pequeño error.',
            text: 'No se pudo realizar el registro.',
            icon: 'error',
            confirmButtonText: 'ok!'
        })
    }
};



btnRegistrarImpuesto.addEventListener('click', enviarAValidarParaEnviarARegistro);

