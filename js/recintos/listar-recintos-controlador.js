const tbody_table = document.querySelector('#tbl-lista tbody');

const input_nombre_recinto = document.querySelector('#txt_nombre_recinto');
const sl_provincia = document.querySelector('#provincias');
const sl_canton = document.querySelector('#cantones');
const sl_distrito = document.querySelector('#distritos');
const txt_area_direccion_exacta = document.querySelector('#txt_direccion_exacta');
const input_cap_tradicionales = document.querySelector('#txt_capacidad_asientos_tradicionales');
const input_cap_especiales = document.querySelector('#txt_capacidad_asientos_especiales');
const input_capacidad = document.querySelector('#txt_capacidad');
const input_encargado_recinto = document.querySelector('#txt_encargado-recinto');
const datalist_encargado_recinto = document.querySelector('#encargado-recinto');
const form_recinto = document.querySelector('#form-recinto');
const input_localizacion_no_aplicar = document.querySelector('#radio_localizacion_no_aplicar');
const input_localizacion_aplicar = document.querySelector('#radio_localizacion_aplicar');


const btn_aplicar = document.querySelector('#btn_aplicar');
const btn_limpiar = document.querySelector('#btn_limpiar');

//Lista sin filtrar y los muestra en la tabla
const listar_sin_filtro = async () => {
    let resuldatos;
    tbody_table.innerHTML = '';

    resetear_formulario();

    //Obtenemos los datos
    await listar_recinto().then(res => { resuldatos = res });
    if (resuldatos.estado) {
        resuldatos.datos.forEach(recinto => {
            let fila = tbody_table.insertRow();

            //geolocalizacion
            //estado
            //fila.insertCell().innerHTML = encargados.fotos;
            fila.insertCell().innerHTML = recinto.nombre_recinto;
            fila.insertCell().innerHTML = recinto.provincia;
            fila.insertCell().innerHTML = recinto.canton;
            fila.insertCell().innerHTML = recinto.distrito;
            fila.insertCell().innerHTML = recinto.direccion_exacta;
            fila.insertCell().innerHTML = recinto.capacidad_asientos_tradicionales;
            fila.insertCell().innerHTML = recinto.capacidad_asientos_especiales;
            fila.insertCell().innerHTML = recinto.capacidad;
            fila.insertCell().innerHTML = recinto.encargado_asociado_id.nombre_completo;

            const btn_editar = document.createElement('button');
            btn_editar.type = 'button';
            btn_editar.innerHTML = '<i class="fas fa-edit"></i> Editar';
            btn_editar.dataset._id = recinto._id;
            btn_editar.addEventListener("click", function () {
                window.localStorage.setItem('recinto_editar', this.dataset._id);

                if (window.localStorage.getItem('tipo_usuario') == 'administrador') {
                    window.location = "modificar-recinto-admin.html";
                } else {
                    window.location = "modificar-recinto.html";
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


    const filtro_nombre_recinto = input_nombre_recinto.value.trim().toLowerCase();
    let filtro_provincia = sl_provincia.options[sl_provincia.selectedIndex].text.trim().toLowerCase();
    let filtro_canton = sl_canton.options[sl_canton.selectedIndex].text.trim().toLowerCase();
    let filtro_distrito = sl_distrito.options[sl_distrito.selectedIndex].text.trim().toLowerCase();
    const filtro_area_direccion_exacta = txt_area_direccion_exacta.value.trim().toLowerCase();
    const filtro_cap_tradicionales = input_cap_tradicionales.value.trim().toLowerCase();
    const filtro_cap_especiales = input_cap_especiales.value.trim().toLowerCase();
    const filtro_capacidad = input_capacidad.value.trim().toLowerCase();
    const filtro_encargado_recinto = input_encargado_recinto.value.trim().toLowerCase();

    filtro_provincia = filtro_provincia == "seleccione la provincia" ? "" : filtro_provincia;
    filtro_canton = filtro_canton == "seleccione el cantón" ? "" : filtro_canton;
    filtro_distrito = filtro_distrito == "seleccione el distrito" ? "" : filtro_distrito;

    let resuldatos;
    tbody_table.innerHTML = '';
    //Obtenemos los datos
    //Obtenemos los datos
    await listar_recinto().then(res => { resuldatos = res });
    if (resuldatos.estado) {
        resuldatos.datos.forEach(recinto => {

            const nombre_recinto = recinto.nombre_recinto.toLowerCase().includes(filtro_nombre_recinto);
            const provincia = recinto.provincia.toLowerCase().includes(filtro_provincia);
            const canton = recinto.canton.toLowerCase().includes(filtro_canton);
            const distrito = recinto.distrito.toLowerCase().includes(filtro_distrito);
            const area_direccion_exacta = recinto.direccion_exacta.toLowerCase().includes(filtro_area_direccion_exacta);
            const cap_tradicionales = recinto.capacidad_asientos_tradicionales.toLowerCase().includes(filtro_cap_tradicionales);
            const cap_especiales = recinto.capacidad_asientos_especiales.toLowerCase().includes(filtro_cap_especiales);
            const capacidad = recinto.capacidad.toLowerCase().includes(filtro_capacidad);
            const encargado_recinto = recinto.encargado_asociado_id.nombre_completo.toLowerCase().includes(filtro_encargado_recinto);


            if (nombre_recinto && provincia && canton && distrito && area_direccion_exacta && cap_tradicionales && cap_especiales && capacidad && encargado_recinto) {
                let fila = tbody_table.insertRow();

                //geolocalizacion
                //estado
                //fila.insertCell().innerHTML = encargados.fotos;
                fila.insertCell().innerHTML = recinto.nombre_recinto;
                fila.insertCell().innerHTML = recinto.provincia;
                fila.insertCell().innerHTML = recinto.canton;
                fila.insertCell().innerHTML = recinto.distrito;
                fila.insertCell().innerHTML = recinto.direccion_exacta;
                fila.insertCell().innerHTML = recinto.capacidad_asientos_tradicionales;
                fila.insertCell().innerHTML = recinto.capacidad_asientos_especiales;
                fila.insertCell().innerHTML = recinto.capacidad;
                fila.insertCell().innerHTML = recinto.encargado_asociado_id.nombre_completo;

                const btn_editar = document.createElement('button');
                btn_editar.type = 'button';
                btn_editar.innerHTML = '<i class="fas fa-edit"></i> Editar';
                btn_editar.dataset._id = recinto._id;
                btn_editar.addEventListener("click", function () {
                    window.localStorage.setItem('recinto_editar', this.dataset._id);

                    if (window.localStorage.getItem('tipo_usuario') == 'administrador') {
                        window.location = "modificar-recinto-admin.html";
                    } else {
                        window.location = "modificar-recinto.html";
                    }
                });

                fila.insertCell().appendChild(btn_editar);
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

const buscar_datos = async (url) => {
    let resuldados;
    resuldados = await axios.post(url);
    return resuldados.data;
};

const Crear_Opciones = (datos, msg) => {
    var html = `<option value="0" hidden>${msg}</option>`;
    for (key in datos) {
        html += `<option value="${key}">${datos[key]}</option>`;
    }
    return html;
};

const obtener_provincias = async () => {
    let json;
    const url = "https://ubicaciones.paginasweb.cr/provincias.json";

    await buscar_datos(url).then(res => { json = res });
    sl_provincia.innerHTML = Crear_Opciones(json, "Seleccione la provincia");

    sl_canton.innerHTML = Crear_Opciones(gg = [], "Seleccione el cantón");
    sl_distrito.innerHTML = Crear_Opciones(gg = [], "Seleccione el distrito");
    sl_canton.disabled = true;
    sl_distrito.disabled = true;
}

const obtener_cantones = async (id_provincia) => {
    let json;
    const url = `https://ubicaciones.paginasweb.cr/provincia/${id_provincia}/cantones.json`;

    await buscar_datos(url).then(res => { json = res });
    sl_canton.innerHTML = Crear_Opciones(json, "Seleccione el cantón");
    sl_canton.disabled = false;
    sl_distrito.innerHTML = Crear_Opciones(gg = [], "Seleccione el distrito");
    sl_distrito.disabled = true;
};

const obtener_distritos = async (id_cantones) => {
    if (id_cantones == 0) {
        map.setZoom(9);
        document.querySelector('#distritos').innerHTML = "";
        return;
    }

    let json;
    const url = `https://ubicaciones.paginasweb.cr/provincia/${sl_provincia.value}/canton/${id_cantones}/distritos.json`;

    await buscar_datos(url).then(res => { json = res });
    sl_distrito.innerHTML = Crear_Opciones(json, "Seleccione el distrito");

    const provincia = sl_provincia.options[sl_provincia.selectedIndex].text;
    const canton = sl_canton.options[sl_canton.selectedIndex].text;
    sl_distrito.disabled = false;
};


const distritos_seleccionado = (id_distrito) => {
    const distrito = sl_distrito.options[sl_distrito.selectedIndex].text;
    const provincia = sl_provincia.options[sl_provincia.selectedIndex].text;
    const canton = sl_canton.options[sl_canton.selectedIndex].text;
};

//Agraga un nuevo teléfono a la lista
const llenar_select = async () => {
    let resoltado = [];
    await listar_encargados_recinto().then(res => { resoltado = res });

    datalist_encargado_recinto.innerHTML = "";
    datalist_encargado_recinto.innerHTML = crear_Opciones_encargado_recinto(resoltado.datos);
};

const crear_Opciones_encargado_recinto = (datos) => {
    let html = '';
    for (key in datos) {
        html += `<option value="${datos[key].nombre_completo}"></option>`;
    }
    return html;
};

const localizacion_aplicar = () =>{
      let valor = event.srcElement.value;
      if(valor == "1"){
        sl_provincia.disabled = false;
        sl_canton.disabled = true;
        sl_distrito.disabled = true;
      }else{
        sl_canton.selectedIndex = 0;
        sl_provincia.selectedIndex = 0;
        sl_distrito.selectedIndex = 0;

        sl_provincia.disabled = true;
        sl_canton.disabled = true;
        sl_distrito.disabled = true;
      }
};


const resetear_formulario = () => {
    form_recinto.reset();
    input_nombre_recinto.focus();
    input_capacidad.innerHTML = "capacidad total: 0";
    sl_canton.selectedIndex = 0;
    sl_distrito.selectedIndex = 0;
    sl_canton.disabled = true;
    sl_distrito.disabled = true;
}

input_localizacion_no_aplicar.addEventListener('click', localizacion_aplicar);
input_localizacion_aplicar.addEventListener('click', localizacion_aplicar);
btn_aplicar.addEventListener('click', listar_con_filtro);
btn_limpiar.addEventListener('click', listar_sin_filtro);

listar_sin_filtro();
llenar_select();
obtener_provincias();
