'use strict';

const output_foto_tarjeta = document.querySelector('#foto_tarjeta');

const detectar_tarjeta = () => {
    //Identificadores de tarjeta
    const identificador = [
        { nombre: 'VISA', patron: /^4\d{12}(\d{3})?$/, src:'../imgs/registrar_tarjetas/visa.png' },
        { nombre: 'MasterCard', patron: /^(5[1-5]\d{4}|677189)\d{10}$/, src: '../imgs/registrar_tarjetas/master.png' },
        { nombre: 'Amex', patron: /^3[47]\d{13}$/, src: '../imgs/registrar_tarjetas/amex.png' }
    ];

    output_foto_tarjeta.innerHTML = '';

    let numero_tarj = input_numero.value;
    const imagen = document.createElement('img');

    for (let i = 0; i < identificador.length; i++) {
        const esquema = identificador[i];
        if (esquema.patron.test(numero_tarj)) {
            imagen.src = esquema.src;
            imagen.alt = esquema.nombre;
            imagen.width = 150;
            output_foto_tarjeta.appendChild(imagen);
        }
    }
};

let registrar_tarjeta = async (pNombre, pNumero, pCodigo, pMes, pAnno) => {
    await axios({
      method: "post",
      url: "http://localhost:3000/api/registrar-tarjeta",
      responseType: "json",
      //body
      data: {
        nombre: pNombre,
        numero: pNumero,
        mes: pMes,
        anno: pAnno,
        codigo: pCodigo
      }
    })
      .then(function(res) {
        console.log(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  
  let listar_tarjeta = async () => {
    let lista_tarjetas;
    await axios({
      method: "get",
      url: "http://localhost:3000/api/lista_tarjetas",
      responseType: "json"
    })
      .then(function(res) {
        lista_tarjetas = res.data.tarjetas;
      })
  
      .catch(function(error) {
        console.log(error);
      });
  
    return lista_tarjetas;
  };