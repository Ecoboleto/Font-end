'use strict';
const url_base = "http://localhost:3000/api" // Redirección base de la api

const registrar_encargado_recinto = async (nombre_completo, correo_electronico, fecha_nacimiento, edad, telefonos, genero) => {
    let resuldados;
    resuldados = await axios.post(`${url_base}/registrar-encargado-recinto`, {
        nombre_completo, correo_electronico, fecha_nacimiento, edad, telefonos, genero
    });
    return resuldados.data;
};

const listar__encargado_recinto = async () => {
    let resuldados;
    resuldados = await axios.get(`${url_base}/listar-encargados-recinto`);
    return resuldados.data;
};