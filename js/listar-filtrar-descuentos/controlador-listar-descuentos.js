'use strict';

let btnListar = document.querySelector("#btn-listar");
let input_filtro = document.querySelector("#id-search-bar");

let listarDescuentos = async () => {
    let lista_descuentos = await listar_descuentos();

    if(lista_descuentos == ""){
            Swal.fire({
                title: 'No existen descuentos',
                text: 'registrados en el sistema',
                icon: 'success',
                confirmButtonText: 'ok!'
            })
    }

    let lista_div_clase = document.querySelector("#id-lista-div");
    lista_div_clase.innerHTML = "";

    let ul;
    ul = document.createElement("ul");
    ul.id = "id-ul";
    ul.style.width = "100%";

    for (let i = 0; i < lista_descuentos.length; i++) {
        let li, labelNombre, labelMonto, labelEstado;
        li = document.createElement("li");
        li.id = "id-li";
        li.style.width = "100%";
        li.style.background = "white";
        li.style.height = "67px";
        li.style.border = "1px solid green";

        labelNombre = document.createElement("label");
        labelNombre.id = "id-label-nombre";
        labelNombre.style.display = "inline-block";
        labelNombre.style.padding = "25px 0px";
        labelNombre.style.paddingLeft = "35px";
        labelNombre.style.paddingRight = "55px";
        labelNombre.style.cssFloat = "left";
        labelNombre.style.color = "green";
        labelNombre.width = "30%";
        labelMonto = document.createElement("label");
        labelMonto.id = "id-label-monto";
        labelMonto.style.display = "inline-block";
        labelMonto.style.padding = "25px";
        labelMonto.style.paddingRight = "15px";
        labelMonto.style.cssFloat = "left";
        labelMonto.style.color = "green";
        labelMonto.style.width = "30%";
        labelEstado = document.createElement("label");
        labelEstado.id = "id-label-estado";
        labelEstado.style.display = "inline-block";
        labelEstado.style.padding = "25px 0px";
        labelEstado.style.paddingLeft = "0px";
        //labelEstado.style.cssFloat = "left";
        labelEstado.style.color = "green";
        labelEstado.width = "30%";


        labelNombre.innerHTML = "Nombre: " + lista_descuentos[i]['nombre'];
        labelMonto.innerHTML = "Porcentaje: " + lista_descuentos[i]['porcentaje'];
        labelEstado.innerHTML = "Estado: " + lista_descuentos[i]['estado'];




        li.appendChild(labelNombre);
        li.appendChild(labelMonto);
        li.appendChild(labelEstado);
        ul.appendChild(li);

    }

    lista_div_clase.appendChild(ul);

}




//funcion filtrar datos y mostrarlos en el contenedor donde el sistema los lista normalmente 
let mostrarDatosFiltradosEnElContenedor = async () => {
    let filtro = input_filtro.value.toLowerCase();
    let lista_descuentos = await listar_descuentos();
    //---
    let lista_div_clase = document.querySelector("#id-lista-div");
    lista_div_clase.innerHTML = "";

    let ul;
    ul = document.createElement("ul");
    ul.id = "id-ul";
    ul.style.width = "100%";


    for (let i = 0; i < lista_descuentos.length; i++) {
        let nombre = lista_descuentos[i]['nombre'].toLowerCase();
        let porc = Number(lista_descuentos[i]['porcentaje']);
        if (nombre.includes(filtro) || (String(porc)).includes(filtro)) {
            //------------------------------------------------------------------------------------------
            //Proceso para entender filtrar descuentos
            let li, labelNombre, labelMonto, labelEstado;
            li = document.createElement("li");
            li.id = "id-li";
            li.style.width = "100%";
            li.style.background = "white";
            li.style.height = "67px";
            li.style.border = "1px solid green";

            labelNombre = document.createElement("label");
            labelNombre.id = "id-label-nombre";
            labelNombre.style.display = "inline-block";
            labelNombre.style.padding = "25px 0px";
            labelNombre.style.paddingLeft = "35px";
            labelNombre.style.paddingRight = "55px";
            labelNombre.style.cssFloat = "left";
            labelNombre.style.color = "green";
            labelNombre.width = "30%";
            labelMonto = document.createElement("label");
            labelMonto.id = "id-label-monto";
            labelMonto.style.display = "inline-block";
            labelMonto.style.padding = "25px";
            labelMonto.style.paddingRight = "15px";
            //labelMonto.style.cssFloat = "left";
            labelMonto.style.color = "green";
            labelMonto.style.width = "30%";
            labelEstado = document.createElement("label");
            labelEstado.id = "id-label-estado";
            labelEstado.style.display = "inline-block";
            labelEstado.style.padding = "25px 0px";
            labelEstado.style.paddingLeft = "0px";
            //labelEstado.style.cssFloat = "left";
            labelEstado.style.color = "green";
            labelEstado.width = "30%";


            labelNombre.innerHTML = "Nombre: " + lista_descuentos[i]['nombre'];
            labelMonto.innerHTML = "Porcentaje: " + lista_descuentos[i]['porcentaje'];
            labelEstado.innerHTML = "Estado: " + lista_descuentos[i]['estado'];




            li.appendChild(labelNombre);
            li.appendChild(labelMonto);
            li.appendChild(labelEstado);
            ul.appendChild(li);
        }
    }


    lista_div_clase.appendChild(ul);


}

btnListar.addEventListener('click', listarDescuentos);
input_filtro.addEventListener('keyup', mostrarDatosFiltradosEnElContenedor);

