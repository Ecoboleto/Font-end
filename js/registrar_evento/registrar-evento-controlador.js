'use strict';

// Variables de los input y botón de registrar
//const input_organizador_evento = document.querySelector('#txt_organizador_evento');
const input_nombre_evento = document.querySelector('#txt_nombre_evento');
const input_tipo_evento = document.querySelector('#txt_tipo_evento');
const input_foto_evento = document.querySelector('#imgEvento');
const input_recinto_evento = document.querySelector('#txt_recinto_evento');
const input_descripcion_evento = document.querySelector('#txt_descripcion_evento');
const input_entrada_evento = document.querySelector('#txt_entrada_evento');
const input_asistentes_evento = document.querySelector('#txt_asistentes_evento');
const input_limite_evento = document.querySelector('#txt_limite_evento');

const input_fecha_evento = document.querySelector('#txt_fecha_evento');
const input_inicio_evento_h = document.querySelector('#txt_inicio_evento_h');
const input_inicio_evento_m = document.querySelector('#txt_inicio_evento_m');
const input_final_evento_h = document.querySelector('#txt_final_evento_h');
const input_final_evento_m = document.querySelector('#txt_final_evento_m');

const input_impuestos_evento = document.querySelector('#txt_impuestos_evento');
const input_descuentos_evento = document.querySelector('#txt_descuentos_evento');

const btn_registrar = document.querySelector('#btn_registrar');
const btn_fecha = document.querySelector('#btn_fecha');
const btn_impuesto = document.querySelector('#btn_impuesto');
const btn_descuento = document.querySelector('#btn_descuento');


//Obterner los tipos de eventos de la base de datos
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


//Obtener recintos de la base de datos
const llenarRecintos = async () => {
    let lista_recinto_evento = await listar_recinto_evento();
    const select = document.querySelector('#txt_recinto_evento');
    let opt = document.createElement('option');
    opt.innerHTML = '--';
    opt.value = '--';
    select.appendChild(opt);

    for (let i = 0; i < lista_recinto_evento.length; i++) {
        opt = document.createElement('option');
        opt.value = lista_recinto_evento[i]['nombre_recinto'];
        opt.setAttribute('capacidadrecinto', lista_recinto_evento[i]['capacidad']);
        opt.setAttribute('dato_id', lista_recinto_evento[i]['_id']);
        opt.innerHTML = lista_recinto_evento[i]['nombre_recinto'] + ' -- ' + lista_recinto_evento[i]['capacidad'] + ' espacios';
        select.appendChild(opt);
    };
}



//Obterner los impuestos de la base de datos
const llenarImpuestos = async () => {
    let lista_impuestos = await listar_impuestos();
    const select = document.querySelector('#txt_impuestos_evento');
    let opt = document.createElement('option');
    opt.innerHTML = '--';
    opt.value = '--';
    select.appendChild(opt);

    for (let i = 0; i < lista_impuestos.length; i++) {
        opt = document.createElement('option');
        opt.value = lista_impuestos[i]['nombre'];
        opt.setAttribute('dato_id', lista_impuestos[i]['_id']);
        opt.innerHTML = lista_impuestos[i]['nombre'];
        select.appendChild(opt);
    };
}


//Obterner los descuentos de la base de datos
const llenarDescuentos = async () => {
    let lista_descuentos = await listar_descuentos();
    const select = document.querySelector('#txt_descuentos_evento');
    let opt = document.createElement('option');
    opt.innerHTML = '--';
    opt.value = '--';
    select.appendChild(opt);

    for (let i = 0; i < lista_descuentos.length; i++) {
        opt = document.createElement('option');
        opt.value = lista_descuentos[i]['nombre'];
        opt.setAttribute('dato_id', lista_descuentos[i]['_id']);
        opt.innerHTML = lista_descuentos[i]['nombre'];
        select.appendChild(opt);
    };
}

//llenar Inicio Horas
const llenarInicioH = () => {
    let min = 0;
    let max = 23;
    const select = document.querySelector('#txt_inicio_evento_h');
    let opt = document.createElement('option');
    opt.innerHTML = 'hh';
    opt.value = 'hh';
    select.appendChild(opt);

    for (let i = min; i <= max; i++) {
        if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
            opt = document.createElement('option');
            opt.value = ('0' + i);
            opt.innerHTML = ('0' + i);
            select.appendChild(opt);
        } else {
            opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            select.appendChild(opt);
        }
    };
}

//llenar Inicio Minutos
const llenarInicioM = () => {
    let min = 0;
    let max = 59;
    const select = document.querySelector('#txt_inicio_evento_m');
    let opt = document.createElement('option');
    opt.innerHTML = 'mm';
    opt.value = 'mm';
    select.appendChild(opt);

    for (let i = min; i <= max; i++) {
        if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
            opt = document.createElement('option');
            opt.value = ('0' + i);
            opt.innerHTML = ('0' + i);
            select.appendChild(opt);
        } else {
            opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            select.appendChild(opt);
        }
    };
}

//llenar Final Horas
const llenarFinalH = () => {
    let min = 0;
    let max = 23;
    const select = document.querySelector('#txt_final_evento_h');
    let opt = document.createElement('option');
    opt.innerHTML = 'hh';
    opt.value = 'hh';
    select.appendChild(opt);

    for (let i = min; i <= max; i++) {
        if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
            opt = document.createElement('option');
            opt.value = ('0' + i);
            opt.innerHTML = ('0' + i);
            select.appendChild(opt);
        } else {
            opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            select.appendChild(opt);
        }
    };
}

//llenar Final Minutos
const llenarFinalM = () => {
    let min = 0;
    let max = 59;
    const select = document.querySelector('#txt_final_evento_m');
    let opt = document.createElement('option');
    opt.innerHTML = 'mm';
    opt.value = 'mm';
    select.appendChild(opt);

    for (let i = min; i <= max; i++) {
        if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
            opt = document.createElement('option');
            opt.value = ('0' + i);
            opt.innerHTML = ('0' + i);
            select.appendChild(opt);
        } else {
            opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            select.appendChild(opt);
        }
    };
}

//Agraga un nueva fecha a la lista
const agregarFechaLista = () => {
    const sel = document.querySelector('#txt_fecha_evento')
    const label = document.querySelector('#fechas');
    let lab = document.createElement('output');

    let fecha_evento;
    let fecha = new Date(input_fecha_evento.value);

    let dia = fecha.getUTCDate();
    if (dia == 1 || dia == 2 || dia == 3 || dia == 4 || dia == 5 || dia == 6 || dia == 7 || dia == 8 || dia == 9) {
        dia = ('0' + dia)
    } else {
        dia = dia
    }


    let mes = fecha.getUTCMonth();
    if (mes == 0 && dia == 1) {
        mes = 1
    } else {
        mes = mes + 1
    }
    if (mes == 1 || mes == 2 || mes == 3 || mes == 4 || mes == 5 || mes == 6 || mes == 7 || mes == 8 || mes == 9) {
        mes = ('0' + mes)
    } else {
        mes = mes
    }


    let anno = fecha.getUTCFullYear();

    let inihora = input_inicio_evento_h.value;
    let inimin = input_inicio_evento_m.value;
    let finhora = input_final_evento_h.value;
    let finmin = input_final_evento_m.value;


    fecha_evento = (mes + '-' + dia + '-' + anno + '::' + inihora + ':' + inimin + '::' + finhora + ':' + finmin)
    let fech = fecha_evento;
    let fechainput = obtenerFechaComparar(fech);
    let fechas_obt = obtenerFechas();
    let fechaarray = obtenerFechaCompararArray(fechas_obt);
    let horainiinput = obtenerHoraIniComparar(fech);
    let horafininput = obtenerHoraFinComparar(fech);
    let validarfh = validarFechasHoras(fechainput, fechas_obt, inihora, finhora)
    let validarda = validarFechasAnteriores(mes, dia, anno);
    let horasvalidadas = validarHorasEvento(inihora, inimin, finhora, finmin);



    if (!validarfh && sel.value != '' && inihora != 'hh' && inimin != 'mm' && finhora != 'hh' && finmin != 'mm' && !horasvalidadas && !validarda) {
        lab.value = fecha_evento;
        lab.innerHTML = fecha_evento;
        lab.classList.add('listafechas');
        lab.classList.add('d-bloque');
        label.appendChild(lab);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Error de fechas u horas',
            text: 'Por favor revise la información: Seleccionar todos los campos de horas y minutos. No ingresar fechas anteriores a hoy. Hora final no puede ser menor a la hora de inicio. No se permiten eventos el mismo día en horarios ya reservados y en horas consecutivas.',
            confirmButtonText: 'Entendido'
        });
    }

};

//Obterner fechas para el registro
const obtenerFechas = () => {
    let lista_fecha_evento = document.querySelectorAll('.listafechas');
    let fecha_evento = [];

    for (let i = 0; i < lista_fecha_evento.length; i++) {
        fecha_evento.push(lista_fecha_evento[i].value)
    };
    return fecha_evento
};

//Remover fechas para resetear el formulario
const removerFechas = () => {
    let lista_fechas_evento = document.querySelectorAll('.listafechas');

    for (let i = 0; i < lista_fechas_evento.length; i++) {
        lista_fechas_evento[i].remove();
    };
};

//Obtener fecha para comparar del input
const obtenerFechaComparar = (fech) => {
    let str = fech;
    let res = str.slice(0, 10);
    return res
}

//Obtener fecha para comparar de la lista
const obtenerFechaCompararArray = (fechas_obt) => {
    let arrayfechas = [];
    for (let i = 0; i < fechas_obt.length; i++) {
        let str = fechas_obt[i];
        let res = str.slice(0, 10);
        arrayfechas.push(res)
    };

    return arrayfechas;
}


//Obtener hora inicio para comparar del input
const obtenerHoraIniComparar = (fech) => {
    let str = fech;
    let res = str.slice(12, 14);
    return res
}

//Obtener hora inicio para comparar de la lista
const obtenerHoraIniCompararArray = (fechas_obt) => {
    let arrayfechas = [];
    for (let i = 0; i < fechas_obt.length; i++) {
        let str = fechas_obt[i];
        let res = str.slice(12, 14);
        arrayfechas.push(res)
    };

    return arrayfechas;
}


//Obtener hora final para comparar del input
const obtenerHoraFinComparar = (fech) => {
    let str = fech;
    let res = str.slice(19, 21);
    return res
}

//Obtener hora final para comparar de la lista
const obtenerHoraFinCompararArray = (fechas_obt) => {
    let arrayfechas = [];
    for (let i = 0; i < fechas_obt.length; i++) {
        let str = fechas_obt[i];
        let res = str.slice(19, 21);
        arrayfechas.push(res)
    };

    return arrayfechas;
}


//Validar horas evento
const validarHorasEvento = (inihora, inimin, finhora, finmin) => {
    let error = false;
    if (inihora > finhora) {
        error = true;
    }
    if (inihora == finhora && inimin >= finmin) {
        error = true;
    }
    return error;
}


//Validar horas mismo dia
const validarFechasHoras = (fechainput, fechas_obt, inihora, finhora) => {
    let error = false;
    let fechalist = [];
    let ini = Number(inihora);
    let fin = Number(finhora);
    let inih;
    let finh;
    fechas_obt.forEach(fechashoras => {
        fechalist = obtenerFechaComparar(fechashoras);
        inih = Number(obtenerHoraIniComparar(fechashoras));
        finh = Number(obtenerHoraFinComparar(fechashoras));

        if (fechalist == fechainput) {

            if (((ini >= inih && ini <= finh) && (fin >= inih && fin >= finh)) || ((ini <= inih && ini <= finh) && (fin >= inih && fin <= finh)) || ((ini >= inih && ini <= finh) && (fin >= inih && fin <= finh))) {
                error = true;
            }
            if ((ini < inih && ini < finh) && (fin > inih && fin > finh)) {
                error = true;
            }
        }
    });

    return error;

}

//Validar fecha de dias anteriores
const validarFechasAnteriores = (pmes, pdia, panno) => {
    let error = false;
    let fecha = new Date();
    let dia = fecha.getUTCDate();
    if (dia == 1 || dia == 2 || dia == 3 || dia == 4 || dia == 5 || dia == 6 || dia == 7 || dia == 8 || dia == 9) {
        dia = ('0' + dia)
    } else {
        dia = dia
    }
    let mes = fecha.getUTCMonth();
    if (mes == 0 && dia == 1) {
        mes = 1
    } else {
        mes = mes + 1
    }
    if (mes == 1 || mes == 2 || mes == 3 || mes == 4 || mes == 5 || mes == 6 || mes == 7 || mes == 8 || mes == 9) {
        mes = ('0' + mes)
    } else {
        mes = mes
    }
    let anno = fecha.getUTCFullYear();

    if (anno > panno) {
        error = true
    } else if (anno == panno && mes > pmes) {
        error = true
    } else if (anno == panno && mes == pmes && dia > pdia) {
        error = true
    }

    return error;

}




// Agregar impuestos a la lista
const agregarImpuestosLista = () => {
    const sel = document.querySelector('#txt_impuestos_evento')
    const label = document.querySelector('#impuestos');
    let lab = document.createElement('output');
    let impuesto;
    let imp = input_impuestos_evento.value;
    impuesto = (imp);
    let impuestos_obt = obtenerImpuestos();
    let validarimp = impuestos_obt.join().includes(impuesto);
    if (!validarimp && sel.value != '--') {
        lab.setAttribute('nombre', impuesto);
        lab.value = impuesto;
        lab.innerHTML = sel.options[sel.selectedIndex].text;
        lab.classList.add('listaimpuestos');
        lab.classList.add('d-bloque');
        label.appendChild(lab);
        sel.selectedIndex = 0;
    }
};

//Obterner impuestos para el registro
const obtenerImpuestos = () => {
    let lista_impuestos_evento = document.querySelectorAll('.listaimpuestos');
    let impuestos = [];

    for (let i = 0; i < lista_impuestos_evento.length; i++) {
        impuestos.push(lista_impuestos_evento[i].getAttribute('nombre'))
    };
    return impuestos
};

//Remover impuestos para resetear el formulario
const removerImpuestos = () => {
    let lista_impuestos_evento = document.querySelectorAll('.listaimpuestos');

    for (let i = 0; i < lista_impuestos_evento.length; i++) {
        lista_impuestos_evento[i].remove();
    };
};

// Agregar descuentos a la lista
const agregarDescuentosLista = () => {
    const sel = document.querySelector('#txt_descuentos_evento')
    const label = document.querySelector('#descuentos');
    let lab = document.createElement('output');
    let descuento;
    let des = input_descuentos_evento.value;
    descuento = (des);
    let descuentos_obt = obtenerDescuentos();
    let validardes = descuentos_obt.join().includes(descuento);
    if (!validardes && sel.value != '--') {
        lab.setAttribute('nombre', descuento);
        lab.value = descuento;
        lab.innerHTML = sel.options[sel.selectedIndex].text;
        lab.classList.add('listadescuentos');
        lab.classList.add('d-bloque');
        label.appendChild(lab);
        sel.selectedIndex = 0;
    }

}

//Obterner impuestos para el registro
const obtenerDescuentos = () => {
    let lista_descuentos_evento = document.querySelectorAll('.listadescuentos');
    let descuentos = [];

    for (let i = 0; i < lista_descuentos_evento.length; i++) {
        descuentos.push(lista_descuentos_evento[i].getAttribute('nombre'))
    };
    return descuentos
};

//Remover descuentos para resetear el formulario
const removerDescuentos = () => {
    let lista_descuentos_evento = document.querySelectorAll('.listadescuentos');

    for (let i = 0; i < lista_descuentos_evento.length; i++) {
        lista_descuentos_evento[i].remove();
    };
};


//Validar datos
let validarVaciosFormato = () => {
    let error = false;

    let regex_letras_numeros = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ0-9\s]+$/;
    let regex_solo_numeros = /^[-0-9]+$/;

    //Validar nombre evento
    if (input_nombre_evento.value == '' || regex_letras_numeros.test(input_nombre_evento.value) == false) {
        error = true;
        input_nombre_evento.classList.add('input--error');
    } else {
        input_nombre_evento.classList.remove('input--error');
    }

    //Validar descripcion
    if (input_descripcion_evento.value == '') {
        error = true;
        input_descripcion_evento.classList.add('input--error');
    } else {
        input_descripcion_evento.classList.remove('input--error');
    }

    //Validar precio entrada evento
    if (input_entrada_evento.value == '' || input_entrada_evento.value < 0 || regex_solo_numeros.test(input_entrada_evento.value) == false) {
        error = true;
        input_entrada_evento.classList.add('input--error');
    } else {
        input_entrada_evento.classList.remove('input--error');
    }

    //validar asistentes esperados
    if (input_asistentes_evento.value == '' || input_asistentes_evento.value < 0 || regex_solo_numeros.test(input_asistentes_evento.value) == false) {
        error = true;
        input_asistentes_evento.classList.add('input--error');
    } else {
        input_asistentes_evento.classList.remove('input--error');
    }

    //Validar limite evento
    if (input_limite_evento.value == '' || input_limite_evento.value < 0 || regex_solo_numeros.test(input_limite_evento.value) == false) {
        error = true;
        input_limite_evento.classList.add('input--error');
    } else {
        input_limite_evento.classList.remove('input--error');
    }

    //Validar tipo evento
    if (input_tipo_evento.value == '--') {
        error = true;
        input_tipo_evento.classList.add('input--error');
    } else {
        input_tipo_evento.classList.remove('input--error');
    }

    //Validar recinto evento
    if (input_recinto_evento.value == '--') {
        error = true;
        input_recinto_evento.classList.add('input--error');
    } else {
        input_recinto_evento.classList.remove('input--error');
    }

    //Validar impuestos
    if (obtenerImpuestos().length == 0) {
        error = true;
        input_impuestos_evento.classList.add('input--error');
    } else {
        input_impuestos_evento.classList.remove('input--error');
    }

    //Validar fecha
    if (obtenerFechas().length == 0) {
        error = true;
        input_fecha_evento.classList.add('input--error');
    } else {
        input_fecha_evento.classList.remove('input--error');
    }

    //validar horas inicio
    if (input_inicio_evento_h.value == 'hh') {
        error = true;
        input_inicio_evento_h.classList.add('input--error');
    } else {
        input_inicio_evento_h.classList.remove('input--error');
    }

    //validar minutos inicio
    if (input_inicio_evento_m.value == 'mm') {
        error = true;
        input_inicio_evento_m.classList.add('input--error');
    } else {
        input_inicio_evento_m.classList.remove('input--error');
    }

    //validar minutos final
    if (input_final_evento_m.value == 'mm') {
        error = true;
        input_final_evento_m.classList.add('input--error');
    } else {
        input_final_evento_m.classList.remove('input--error');
    }

    //validar horas final
    if (input_final_evento_h.value == 'hh') {
        error = true;
        input_final_evento_h.classList.add('input--error');
    } else {
        input_final_evento_h.classList.remove('input--error');
    }

    return error;

};

//Validar capacidades recinto
let validarRecintoCapacidad = () => {
    let error = false;
    const sel = document.querySelector('#txt_recinto_evento');
    let capacidad = Number(sel.options[sel.selectedIndex].getAttribute('capacidadrecinto'));
    if (input_asistentes_evento.value > capacidad) {
        error = true;
        input_asistentes_evento.classList.add('input--error');
    } else {
        input_asistentes_evento.classList.remove('input--error');
    }

    return error;

};

let validarLimiteEntradas = () => {
    let error = false;
    let limite = Number(input_limite_evento.value);
    let asis = Number(input_asistentes_evento.value)
    if (limite > asis) {
        error = true;
        input_limite_evento.classList.add('input--error');
    } else {
        input_limite_evento.classList.remove('input--error');
    }
    return error;
};



//Resetear formulario
const resetear = () => {
    input_nombre_evento.value = "";
    input_descripcion_evento.value = "";
    input_entrada_evento.value = "";
    input_asistentes_evento.value = "";
    input_limite_evento.value = "";
    input_tipo_evento.selectedIndex = 0;
    input_recinto_evento.selectedIndex = 0;
    removerImpuestos();
    removerDescuentos();
    removerFechas();
    input_fecha_evento.value = "";
    input_inicio_evento_h.value = "hh";
    input_inicio_evento_m.value = "mm";
    input_final_evento_h.value = "hh";
    input_final_evento_m.value = "mm";
    input_foto_evento.src = "../imgs/evento.jpg";
}


//Funcion de obtener datos
const obtenerEvento = async () => {

    let organizador = JSON.parse(localStorage.getItem('usuario_iniciado'));

    let organizador_evento = organizador.correo_electronico;
    let nombre_evento = input_nombre_evento.value;
    let tipo_evento = input_tipo_evento.value;
    /*let tipo_evento_nombre = input_tipo_evento.options[input_tipo_evento.selectedIndex].text;*/
    let foto_evento = input_foto_evento.src;
    let recinto_evento = input_recinto_evento.value;
    /*let recinto_evento_nombre = input_recinto_evento.options[input_recinto_evento.selectedIndex].text;*/
    let descripcion_evento = input_descripcion_evento.value;
    let entrada_evento = input_entrada_evento.value;
    let asistentes_evento = input_asistentes_evento.value;
    let limite_evento = input_limite_evento.value;
    let fechas = obtenerFechas();
    let impuestos = obtenerImpuestos();
    let descuentos = obtenerDescuentos();

    //Entra al if cuando hay error
    if (validarVaciosFormato()) {
        Swal.fire({
            icon: 'warning',
            title: 'Los espacios requeridos se encuentran en blanco o tienen un caracter o valor no permitido',
            text: 'Por favor revise la informacion ingresada',
            confirmButtonText: 'Entendido'
        });
    } else if (validarRecintoCapacidad()) {
        Swal.fire({
            icon: 'warning',
            title: 'Los asistentes esperados no pueden superar la capacidad del recinto selecionado',
            text: 'Por favor revise la informacion ingresada',
            confirmButtonText: 'Entendido'
        });

    } else if (validarLimiteEntradas()) {
        Swal.fire({
            icon: 'warning',
            title: 'El limite de entradas por cliente no puede superar los asistentes esperados',
            text: 'Por favor revise la informacion ingresada',
            confirmButtonText: 'Entendido'
        });

    } else {
        await registrar_evento(organizador_evento, nombre_evento, tipo_evento, foto_evento, recinto_evento, descripcion_evento, entrada_evento, asistentes_evento, limite_evento, fechas, impuestos, descuentos);
        resetear();
    };

};

//Eventos asociados a los botones o inputs
btn_fecha.addEventListener('click', agregarFechaLista);
btn_impuesto.addEventListener('click', agregarImpuestosLista);
btn_descuento.addEventListener('click', agregarDescuentosLista);
btn_registrar.addEventListener('click', obtenerEvento);

llenarTipoEvento();
llenarRecintos();
llenarImpuestos();
llenarDescuentos();
llenarInicioH();
llenarInicioM();
llenarFinalH();
llenarFinalM();