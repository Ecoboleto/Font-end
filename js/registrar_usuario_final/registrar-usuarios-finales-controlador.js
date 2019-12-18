'use strict';


const input_correo = document.querySelector('#txt_correo');
const input_primer_nombre = document.querySelector('#txt_primer-nombre');
const input_segundo_nombre = document.querySelector('#txt_segundo-nombre');
const input_primer_apellido = document.querySelector('#txt_primer-apellido');
const input_segundo_apellido = document.querySelector('#txt_segundo-apellido');
const input_fecha_nacimiento = document.querySelector('#txt_fecha-nacimiento');
const input_provincia = document.querySelector('#provincias');
const input_canton = document.querySelector('#cantones');
const input_distrito = document.querySelector('#distritos');
const input_genero = document.querySelector('.txt_genero');
const btn_guardar = document.querySelector('#btn-guardar');
const avatar_usuario = document.querySelector('#imgAvatar');
const input_tipo_evento =  document.querySelector('#txt_tipo_evento');
const btn_tipo_evento = document.querySelector('#btn_tipoevento');
let edad;

const llenarTipoEvento = async () => {
    let lista_tipos_eventos = await listar_tipo_evento();
    const select = document.querySelector('#txt_tipo_evento');
    let opt = document.createElement('option');
    opt.innerHTML = '--';
    opt.value = '--';
    select.appendChild(opt);

    for (let i = 0; i < lista_tipos_eventos.length; i++) {
        opt = document.createElement('option');
        opt.value = lista_tipos_eventos[i]['tipo_evento'];
        opt.setAttribute('dato_id', lista_tipos_eventos[i]['_id']);
        opt.innerHTML = lista_tipos_eventos[i]['tipo_evento'];
        select.appendChild(opt);
    };
}

    
//agregar los tipos de eventos
const agregarTiposEventos = () => {
    const sel = document.querySelector('#txt_tipo_evento')
    const label = document.querySelector('#tipo-evento');
    let lab = document.createElement('output');
    let evento;
    let tipo = input_tipo_evento.value;
    evento = (tipo);
    let evento_obt = obtenerTipoEvento();
    let validarevento = evento_obt.join().includes(evento);
    if (!validarevento && sel.value != '--') {
        lab.setAttribute('tipo_evento',evento);
        lab.value = evento;
        lab.innerHTML = sel.options[sel.selectedIndex].text;
        lab.classList.add('listatipos');
        lab.classList.add('d-bloque');
        label.appendChild(lab);
        sel.selectedIndex = 0;
    }
};

const obtenerTipoEvento = () => {
    let lista_tipos_evento = document.querySelectorAll('.listatipos');
    let tipos = [];
    
    for (let i = 0; i < 5; i++) {
        //tipos.push(lista_tipos_evento[i].getAttribute('tipo_evento'));
        tipos.push(lista_tipos_evento[i]);
    } 

    return tipos;
  }
  

const validar_datos = (correo, primer_nombre, primer_apellido, fecha_nacimiento,
    provincia, canton, distrito) => {

    let error = false;

    //removemos la clase error  
    input_correo.classList.remove('input--error');
    input_primer_nombre.classList.remove('input--error');
    input_primer_apellido.classList.remove('input--error');
    input_fecha_nacimiento.classList.remove('input--error');
    input_provincia.classList.remove('input--error');
    input_canton.classList.remove('input--error');
    input_distrito.classList.remove('input--error');



    if (!validar_vacio_null(primer_nombre)) {
        error = true;
        input_primer_nombre.classList.add('input--error');
    }


    if (!validar_vacio_null(primer_apellido)) {
        error = true;
        input_primer_apellido.classList.add('input--error');
    }


    if (!validar_vacio_null(correo)) {
        error = true;
        input_correo.classList.add('input--error');
    }


    if (!validar_vacio_null(fecha_nacimiento)) {
        error = true;
        input_fecha_nacimiento.classList.add('input--error');
    }


    if (!validar_vacio_null(provincia)) {
        error = true;
        input_provincia.classList.add('input--error');
    }


    if (!validar_vacio_null(canton)) {
        error = true;
        input_canton.classList.add('input--error');
    }

    if (!validar_vacio_null(distrito)) {
        error = true;
        input_distrito.classList.add('input--error');
    }

    return error;
};

let registrar_usuarios_finales = () => {
    let correo = input_correo.value;
    let primer_nombre = input_primer_nombre.value;
    let segundo_nombre = input_segundo_nombre.value;
    let primer_apellido = input_primer_apellido.value;
    let segundo_apellido = input_segundo_apellido.value;
    let fecha_nacimiento = input_fecha_nacimiento.value;
    edad = getEdad(input_fecha_nacimiento.value);
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let genero = input_genero.value;
    let avatar = avatar_usuario.src;


    if (validar_datos(correo, primer_nombre, primer_apellido, fecha_nacimiento,
        provincia, canton, distrito)) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })
    } else {

        if(validar_edad(edad)){
            Swal.fire({
                icon: 'warning',
                title: 'Datos incorrectos',
                text: 'Un menor de edad no puede ingresar dentro de la plataforma',
                confirmButtonText: 'Entendido'
            })
        }else{
        try {

            registrar_usuario_final(correo, primer_nombre, segundo_nombre, primer_apellido,
                segundo_apellido, fecha_nacimiento, edad, provincia, canton, distrito, genero, avatar);

        } catch (error) {

          
        
        }
    }
    }
};

btn_guardar.addEventListener('click', registrar_usuarios_finales);
btn_tipo_evento.addEventListener('click', agregarTiposEventos);
llenarTipoEvento();