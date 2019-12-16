'use strict';

let btnRegistrarImpuesto = document.querySelector("#btn-registrar");
let banderaDefinitiva = true;
let _idDescuento = sessionStorage.getItem('_idDescuento');



let enviarAValidarParaEnviarARegistro = () => {
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


        return banderaError;
};

let llenarFormulario=async()=>{
    let inptNombre = document.querySelector("#inpt-nombre");
    let inptPorcentaje = document.querySelector("#inpt-monto");

    let descuento= await obtener_descuento_id(_idDescuento);
    if(document.querySelector("#inpt-nombre")!=null){
        inptNombre.value = descuento['nombre'];
        inptPorcentaje.value = descuento['porcentaje'];
    }
}

let obtenerDatos= ()=>{
let answer= enviarAValidarParaEnviarARegistro();
    if(answer==false){
        let inptNombre = document.querySelector("#inpt-nombre").value;
        let inptPorcentaje = document.querySelector("#inpt-monto").value;
        let estado = 'activo';
        editar_descuento(_idDescuento,inptNombre, inptPorcentaje, estado);
    }else{
        Swal.fire({
            title: 'Ha ocurrido un pequeño error',
            text: 'Al ingresar los datos',
            icon: 'error',
            confirmButtonText: 'ok!'
        })
    }
}

if(_idDescuento){
    llenarFormulario();
}else{
    console.log('Seleccione un usuario antes de editarlo');
}

btnRegistrarImpuesto.addEventListener('click', obtenerDatos);
