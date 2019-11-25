'use strict';
const url_base = "http://localhost:3000/api" // Redirección base de la api

const registrar_recinto = async (nombre_recinto, fotos, provincia, canton, distrito, direccion_exacta, geolocalizacion,
    capacidad_asientos_tradicionales, capacidad_asientos_especiales, capacidad, encargado_asociado_id) => {
    let resuldados;
    resuldados = await axios.post(`${url_base}/registrar-recinto`, {
        nombre_recinto, fotos, provincia, canton, distrito, direccion_exacta, geolocalizacion,
        capacidad_asientos_tradicionales, capacidad_asientos_especiales, capacidad, encargado_asociado_id
    });
    return resuldados.data;
};

const listar_encargados_recinto = async () => {
    let resuldados;
    resuldados = await axios.get(`${url_base}/listar-encargados-recinto`);
    return resuldados.data;
};


