let map;
let geocoder;
let crLat = 9.6301892;
let crLng = -84.2541843;

function initMap()  {
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
    const input_coordenada = document.querySelector('#coordenadas');
    input_coordenada.innerHTML = marker.getPosition().toString().replace('(', '').replace(')', '');
}


const buscar_datos = async (url) => {
    let resuldados;
    resuldados = await axios.post(url);
    return resuldados.data;
};

const Crear_Opciones = (datos) => {
    var html = '<option value="0">Seleccione una opción</option>';
    for (key in datos) {
        html += `<option value="${key}">${datos[key]}</option>`;
    }
    return html;
};

const obtener_provincias = async () => {
    let json;
    const sl_provincia = document.querySelector('#provincias');
    const url = "https://ubicaciones.paginasweb.cr/provincias.json";

    await buscar_datos(url).then(res => { json = res });
    sl_provincia.innerHTML = Crear_Opciones(json);
}

const obtener_cantones = async (id_provincia) => {
    if(id_provincia == 0){
        document.querySelector('#cantones').innerHTML = "";
        document.querySelector('#distritos').innerHTML = "";
        map.setZoom(9);
        return;
    }

    let json;
    const sl_cantones = document.querySelector('#cantones');
    const sl_provincia = document.querySelector('#provincias');
    const url = `https://ubicaciones.paginasweb.cr/provincia/${id_provincia}/cantones.json`;

    await buscar_datos(url).then(res => { json = res });
    sl_cantones.innerHTML = Crear_Opciones(json);

    const provincia = sl_provincia.options[sl_provincia.selectedIndex].text;

    map.setZoom(9);
    codigo_direccion(`Costa Rica, ${provincia}`);

    document.querySelector('#distritos').innerHTML = "";
};

const obtener_distritos = async (id_cantones) => {
    if(id_cantones == 0){
        map.setZoom(9);
        document.querySelector('#distritos').innerHTML = "";
        return;
    }

    let json;
    const sl_distritos = document.querySelector('#distritos');
    const sl_provincia = document.querySelector('#provincias');
    const sl_canton = document.querySelector('#cantones');
    const url = `https://ubicaciones.paginasweb.cr/provincia/${sl_provincia.value}/canton/${id_cantones}/distritos.json`;

    await buscar_datos(url).then(res => { json = res });
    sl_distritos.innerHTML = Crear_Opciones(json);

    const provincia = sl_provincia.options[sl_provincia.selectedIndex].text;
    const canton = sl_canton.options[sl_canton.selectedIndex].text;
    map.setZoom(12);
    codigo_direccion(`Costa Rica, ${provincia}, ${canton}`);
};


const distritos_seleccionado = (id_distrito) => {   
    if(id_distrito == 0){
        map.setZoom(9);
        return;
    }

    const sl_provincia = document.querySelector('#provincias');
    const sl_canton = document.querySelector('#cantones');    
    const sl_distritos = document.querySelector('#distritos');

    const distrito = sl_distritos.options[sl_distritos.selectedIndex].text; 
    const provincia = sl_provincia.options[sl_provincia.selectedIndex].text;
    const canton = sl_canton.options[sl_canton.selectedIndex].text;    

    map.setZoom(16);
    codigo_direccion(`Costa Rica, ${provincia}, ${canton}, ${distrito}`);
};
obtener_provincias();