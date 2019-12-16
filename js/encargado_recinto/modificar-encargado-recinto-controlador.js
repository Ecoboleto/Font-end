'use strict';
const p_edad = document.querySelector('#p-edad');
const input_correo = document.querySelector('#txt_correo');
const input_nombre = document.querySelector('#txt_nombre');
const input_fecha_nacimiento = document.querySelector('#txt_fecha_nacimiento');
const input_agregar_telefono = document.querySelector('#text-agregar-telefono');
const ul_lista_telefono = document.querySelector('#ul-lista-telefono');
//Genero
let genero;
let telefonos = [];
const input_masculino = document.querySelector('#radio_masculino');
const input_fenenino = document.querySelector('#radio_femenino');
const input_no_especificar = document.querySelector('#radio_no_especificar');
const input_otro = document.querySelector('#radio_otro');

const btn_agregar_telefono = document.querySelector('#btn-agregar-telefono');
const btn_modificar = document.querySelector('#btn_modificar');

//Valida el formulario, returna true si todo esta correcto
const validar_formulario = () => {
    const div_genero = document.querySelector('#div-genero');
    const edad = calcular_edad(input_fecha_nacimiento.value);
    let error = true;

    //removemos la clase error  
    input_correo.classList.remove('input--error');
    input_fecha_nacimiento.classList.remove('input--error');
    input_nombre.classList.remove('input--error');
    div_genero.classList.remove('input--error');
    input_agregar_telefono.classList.remove('input--error');

    //Valida que la edad sea mayorr de edad
    if (edad <= 17) {
        error = false;
        input_fecha_nacimiento.classList.add('input--error');
    }

    //Valida el correo electrónico
    if (!validar_correo_electronico(input_correo.value)) {
        error = false;
        input_correo.classList.add('input--error');
    }
    //Valida el nombre
    if (!validar_nombre_completo(input_nombre.value)) {
        error = false;
        input_nombre.classList.add('input--error');
    }
    //Valida la fecha de nacimiento
    if (!validar_vacio_null(input_fecha_nacimiento.value)) {
        error = false;
        input_fecha_nacimiento.classList.add('input--error');
    }

    //Valida los telefonos
    if (!validar_vacio_null(telefonos)) {
        error = false;
        input_agregar_telefono.classList.add('input--error');
    }

    //Valida el genero
    if (!validar_vacio_null(genero)) {
        error = false;
        div_genero.classList.add('input--error')
    }
    return error;
};

const resetear_formulario = () => {
    const ul_telefonos = document.querySelectorAll('#ul-lista-telefono li');

    //Elimina todos los telefonos de la lista
    ul_telefonos.forEach(n => n.remove());
    telefonos = [];

    p_edad.textContent = "Edad:"
    input_nombre.value = "";
    input_correo.value = "";
    input_fecha_nacimiento.value = "";
    input_agregar_telefono.value = ""

    genero = "";
    input_masculino.checked = false;
    input_fenenino.checked = false;
    input_no_especificar.checked = false;
    input_otro.value = "";
}

//Al cargar la vista se obtine el id de localstore y se solicitan los datos del encargado de recinto
const obtener_encargado = async () => {
    let resuldatos;
    //Obtenemos los datos
    const id_encargado_recinto = window.localStorage.getItem('encargado_recinto_editar');

    await obtener_encargado_recinto(id_encargado_recinto).then(res => { resuldatos = res });

    input_correo.value = resuldatos.datos.correo_electronico;
    input_nombre.value = resuldatos.datos.nombre_completo;
    p_edad.innerHTML = `Edad:${resuldatos.datos.edad}`
    input_fecha_nacimiento.value = resuldatos.datos.fecha_nacimiento;

    genero = resuldatos.datos.genero;
    switch (genero) {
        case "Masculino":
            input_masculino.checked = true;
            break;
        case "Femenino":
            input_fenenino.checked = true;
            break;
        case "Sin especificar":
            input_no_especificar.checked = true;
            break;
        default:
            input_otro.value = genero;
            break;
    }
    

    resuldatos.datos.telefonos.forEach(telefono => {
        const li = document.createElement("li");
        li.innerHTML = `${telefono}<span class="close" onclick="eliminar_telefono(this)">×</span>`;;
        li.setAttribute("dato-telefono", telefono)
        ul_lista_telefono.appendChild(li);
    });
};

//Registra el encargado de recinto
const encargado_recinto = async () => {
    obtener_telefonos();
    const edad = calcular_edad(input_fecha_nacimiento.value);
    if (validar_formulario()) {
        //Realizamos las demas validaciones   
        try {
            let nombre_completo = input_nombre.value;
            let correo_electronico = input_correo.value
            const fecha_nacimiento = input_fecha_nacimiento.value;

            //Normaliza los datos para enviarlo al servidor
            nombre_completo = Normaliza_string(nombre_completo);
            genero = Normaliza_string(genero);
            correo_electronico = correo_electronico.trim().toLowerCase();

            const id_encargado_recinto = window.localStorage.getItem('encargado_recinto_editar');
            
            await modificar_encargado_recinto(id_encargado_recinto,nombre_completo, fecha_nacimiento, edad, telefonos, genero)
                .then(resultado => {
                    if (resultado.estado) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Modificación realizado con éxito',
                            text: 'El encargado de recinto ha sido modificado',
                            confirmButtonText: 'Entendido',
                            onAfterClose: () => {
                                //Reseteamos todos los campos del formulario
                                //resetear_formulario();
                                input_correo.focus();
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: resultado.msg,
                            confirmButtonText: 'Entendido',
                            onAfterClose: () => {
                                input_correo.focus();
                            }
                        });
                    }
                });
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: 'No se puede conectar con el servidor',
                confirmButtonText: 'Entendido'
            });
        }
    } else {
        if (edad <= 17 && edad >= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No se puede registrar un menor de edad',
                confirmButtonText: 'Entendido'
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Algunos de los campos se encuentran con valores incorrectos',
                text: 'Por favor revise los campos en rojo',
                confirmButtonText: 'Entendido'
            });
        }
    }
};

//Agraga un nuevo teléfono a la lista
const agregar_telefono_lista = () => {
    let telefono = input_agregar_telefono.value;
    telefono = Normaliza_string(telefono);

    if (!validar_telefono(telefono)) {
        Swal.fire({
            icon: 'warning',
            title: 'Ingrese un teléfono validó',
            confirmButtonText: 'Entendido',
            onAfterClose: () => {
                input_agregar_telefono.focus();
            }
        });
    } else {
        obtener_telefonos();
        //busca si el teléfono ya se agrego a la lista
        const resultado = telefonos.includes(telefono);
        if (resultado) {
            Swal.fire({
                icon: 'warning',
                title: 'EL teléfono se encuentra en la lista',
                confirmButtonText: 'Entendido',
                onAfterClose: () => {
                    input_agregar_telefono.focus();
                }
            });
        } else {
            const li = document.createElement("li");
            li.innerHTML = `${telefono}<span class="close" onclick="eliminar_telefono(this)">×</span>`;;
            li.setAttribute("dato-telefono", telefono)
            ul_lista_telefono.appendChild(li);

            //limpiemos el el elemento text-agregar-telefono
            input_agregar_telefono.value = "";
            input_agregar_telefono.focus()
        }
    }
};

//Elimina un teléfono de la lista
const eliminar_telefono = () => {
    const li = event.srcElement.parentNode;
    li.remove();
};

//Obtien los telefonos de la etiqueta "#ul-lista-telefono>li" del atributo dato-telefono y 
//los retorna en un array
const obtener_telefonos = () => {
    const ul_telefonos = document.querySelectorAll('#ul-lista-telefono li');
    telefonos = [];
    ul_telefonos.forEach(li => telefonos.push(li.getAttribute('dato-telefono')));
};

//Obtine el genero de las etiquetas  #radio_masculino,#radio_femenino,#radio_no_especificar
// y guarda su value en la variable genero
const radio_genero = () => {
    input_otro.value = "";
    genero = event.srcElement.value;
};
//Obtine el genero de las etiquetas  #input_otro
const input_genero = () => {
    input_masculino.checked = false;
    input_fenenino.checked = false;
    input_no_especificar.checked = false;
    genero = event.srcElement.value;
};

//Muestra la edad al usuario
const Edad = () => {
    const fecha_nacimiento = input_fecha_nacimiento.value;
    const edad = calcular_edad(fecha_nacimiento);
    p_edad.textContent = `Edad:${edad}`
};

// Acciónes
btn_agregar_telefono.addEventListener('click', agregar_telefono_lista);
input_fecha_nacimiento.addEventListener('change', Edad);
btn_modificar.addEventListener('click', encargado_recinto);
input_masculino.addEventListener('click', radio_genero);
input_fenenino.addEventListener('click', radio_genero);
input_no_especificar.addEventListener('click', radio_genero);
input_otro.addEventListener('keyup', input_genero);
obtener_encargado();