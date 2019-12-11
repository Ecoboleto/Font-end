let listar_organizador_evento = async () => {
    let lista_organizadores;
    
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-organizador-evento',
        responseType: 'json',
    })
    .then(function(res){
        lista_organizadores = res.data.datos;
    })
    .catch(function (error) {
        console.log(error);
    });
    return lista_organizadores;
};