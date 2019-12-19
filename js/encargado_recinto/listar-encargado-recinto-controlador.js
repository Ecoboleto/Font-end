'use strict';
const input_correo = document.querySelector('#txt_correo');
const input_nombre = document.querySelector('#txt_nombre');
const input_fecha_nacimiento = document.querySelector('#txt_fecha_nacimiento');
const input_edad = document.querySelector('#txt_edad');
const input_telefono = document.querySelector('#txt_telefono');
//genero
let genero = "";
const input_masculino = document.querySelector('#radio_masculino');
const input_fenenino = document.querySelector('#radio_femenino');
const input_no_especificar = document.querySelector('#radio_no_especificar');
const input_otro = document.querySelector('#radio_otro');

const btn_aplicar = document.querySelector('#btn_aplicar');
const btn_limpiar = document.querySelector('#btn_limpiar');

const tbody_table = document.querySelector('#tbl-lista tbody');

//Lista sin filtrar y los muestra en la tabla
const listar_sin_filtro = async () => {
    let resuldatos;
    tbody_table.innerHTML = '';
    //Obtenemos los datos
    await listar_encargado_recinto().then(res => { resuldatos = res });
    if (resuldatos.estado) {
        resuldatos.datos.forEach(encargados => {
            let fila = tbody_table.insertRow();
            fila.insertCell().innerHTML = encargados.correo_electronico;
            fila.insertCell().innerHTML = encargados.nombre_completo;
            fila.insertCell().innerHTML = encargados.fecha_nacimiento;
            fila.insertCell().innerHTML = encargados.edad;
            fila.insertCell().innerHTML = encargados.telefonos;
            fila.insertCell().innerHTML = encargados.genero == "Sin especificar" ? "" : encargados.genero;

            const btn_editar = document.createElement('button');
            btn_editar.type = 'button';
            btn_editar.innerHTML = '<i class="fas fa-edit verde-oscuro-a--tipografia"></i>';
            btn_editar.dataset._id = encargados._id;
            btn_editar.addEventListener("click",function(){
                window.localStorage.setItem('encargado_recinto_editar',this.dataset._id);

                if(window.localStorage.getItem('tipo_usuario') == 'administrador'){
                    window.location = "modificar-encargado-recinto-admin.html";
                }else {
                    window.location = "modificar-encargado-recinto-encargado-recinto.html";
                } 
            });

            fila.insertCell().appendChild(btn_editar);
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: resuldatos.msg,
            confirmButtonText: 'Entendido'
        });
    }
};

//Lista con el filtrar y los muestra en la tabla
let listar_con_filtro = async () => {
    const filtro_correo = input_correo.value.trim().toLowerCase();
    const filtro_nombre = input_nombre.value.trim().toLowerCase();
    const filtro_fecha_nacimiento = input_fecha_nacimiento.value.trim().toLowerCase();
    const filtro_edad = input_edad.value.trim().toLowerCase();
    const filtro_telefono = input_telefono.value.trim().toLowerCase();
    const filtro_genero = genero.trim().toLowerCase();
    let resuldatos;
    tbody_table.innerHTML = '';
    //Obtenemos los datos
    //Obtenemos los datos
    await listar_encargado_recinto().then(res => { resuldatos = res });
    if (resuldatos.estado) {
        resuldatos.datos.forEach(encargados => {

            const correo_electronico = encargados.correo_electronico.toLowerCase().includes(filtro_correo);
            const nombre_completo = encargados.nombre_completo.toLowerCase().includes(filtro_nombre);
            const fecha_nacimiento = encargados.fecha_nacimiento.toLowerCase().includes(filtro_fecha_nacimiento);
            const edad = encargados.edad.toString().toLowerCase().includes(filtro_edad);
            const telefonos = encargados.telefonos.join().includes(filtro_telefono);
            const genero = encargados.genero.toLowerCase().includes(filtro_genero);

            if (correo_electronico && nombre_completo && fecha_nacimiento && edad && telefonos && genero) {
                let fila = tbody_table.insertRow();
                fila.insertCell().innerHTML = encargados.correo_electronico;
                fila.insertCell().innerHTML = encargados.nombre_completo;
                fila.insertCell().innerHTML = encargados.fecha_nacimiento;
                fila.insertCell().innerHTML = encargados.edad;
                fila.insertCell().innerHTML = encargados.telefonos;
                fila.insertCell().innerHTML = encargados.genero == "Sin especificar" ? "" : encargados.genero;


                const btn_editar = document.createElement('button');
                btn_editar.type = 'button';
                btn_editar.innerText = '<i class="fas fa-edit verde-oscuro-a--tipografia"></i>';
                btn_editar.dataset._id = encargados._id;
                btn_editar.addEventListener("click",function(){
                    window.localStorage.setItem('encargado_recinto_editar',this.dataset._id);
                    window.location = "panel-de-control-encargado-recinto.html";
                });

                fila.insertCell().appendChild(btn_editar);

                //<i class="fas fa-edit"></i>
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',

            title: resuldatos.msg,
            confirmButtonText: 'Entendido'
        });
    }
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

//Limpia el filtro y retorna todos los valores
const limpiar_filtro = () => {
    let genero = "";
    input_correo.value = "";
    input_nombre.value = "";
    input_fecha_nacimiento.value = "";
    input_edad.value = "";
    input_telefono.value = "";
    input_masculino.checked = false;
    input_fenenino.checked = false;
    input_no_especificar.checked = false;
    input_otro.value = "";
    listar_sin_filtro();
};


listar_sin_filtro();
input_masculino.addEventListener('click', radio_genero);
input_fenenino.addEventListener('click', radio_genero);
input_no_especificar.addEventListener('click', radio_genero);
input_otro.addEventListener('keyup', input_genero);

btn_aplicar.addEventListener('click', listar_con_filtro);
btn_limpiar.addEventListener('click', limpiar_filtro);