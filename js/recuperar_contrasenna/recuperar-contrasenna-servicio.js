'use strict';

let enviar_contrasenna = async (correo) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/recuperar-contrasenna',
        responseType: 'json',
        data: {
            correo_electronico: correo,
        }
    }).then(function (res) {
        console.log(res.data);
    }).catch(function (error) {
        console.log(error);
    });
};
