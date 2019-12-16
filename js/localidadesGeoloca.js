let map;
let geocoder;
let crLat = 9.6301892;
let crLng = -84.2541843;
let geolocalizacion;
const sl_provincia = document.querySelector('#provincias');
const sl_canton = document.querySelector('#cantones');
const sl_distrito = document.querySelector('#distritos');

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: crLat, lng: crLng },
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: crLat, lng: crLng }
    });
    google.maps.event.addListener(marker, 'dragend', function () {
        maker_mover(marker);
    });
}

const codigo_direccion = (address) => {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
            maker_mover(marker);
        } else {
            console.debug('No pudimos obtener la dirección porque: ' + status);
        }
    });
}

const maker_mover = (marker) => {
    console.log(marker.getPosition());
    //const input_coordenada = document.querySelector('#coordenadas');
    //input_coordenada.innerHTML = marker.getPosition().toString().replace('(', '').replace(')', '');
    geolocalizacion = marker.getPosition().toString().replace('(', '').replace(')', '');
}

const buscar_datos = async (url) => {
    let resuldados;
    resuldados = await axios.post(url);
    return resuldados.data;
};

const Crear_Opciones = (datos, msg) => {
    let html = `<option value="0" hidden>${msg}</option>`;
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

    const provincia = sl_provincia.options[sl_provincia.selectedIndex].text;

    map.setZoom(9);
    codigo_direccion(`Costa Rica, ${provincia}`);

    sl_canton.disabled = false;
    sl_distrito.innerHTML = Crear_Opciones(gg = [], "Seleccione el distrito");
    sl_distrito.disabled = true;
};

const obtener_distritos = async (id_cantones) => {
    let json;
    const url = `https://ubicaciones.paginasweb.cr/provincia/${sl_provincia.value}/canton/${id_cantones}/distritos.json`;

    await buscar_datos(url).then(res => { json = res });
    sl_distrito.innerHTML = Crear_Opciones(json, "Seleccione el distrito");

    const provincia = sl_provincia.options[sl_provincia.selectedIndex].text;
    const canton = sl_canton.options[sl_canton.selectedIndex].text;
    map.setZoom(12);
    codigo_direccion(`Costa Rica, ${provincia}, ${canton}`);

    sl_distrito.disabled = false;
};


const distritos_seleccionado = (id_distrito) => {
    const distrito = sl_distrito.options[sl_distrito.selectedIndex].text;
    const provincia = sl_provincia.options[sl_provincia.selectedIndex].text;
    const canton = sl_canton.options[sl_canton.selectedIndex].text;

    map.setZoom(16);
    codigo_direccion(`Costa Rica, ${provincia}, ${canton}, ${distrito}`);
};
obtener_provincias();