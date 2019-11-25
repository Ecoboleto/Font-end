'use strict';

const inicio_sesion_servicio = async (correo,contrasenna) => {
    let resuldados;
    resuldados = await axios.post(`http://localhost:3000/api/inicio-sesion`, {
        correo,contrasenna
    });    
    return resuldados.data;
};