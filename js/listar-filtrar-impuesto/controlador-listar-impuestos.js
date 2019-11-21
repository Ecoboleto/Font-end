'use strict';

let btnListar = document.querySelector("#btn-listar");
let input_filtro = document.querySelector("#id-search-bar");


let listarImpuestos = async () => {
    let lista_impuestos = await listar_impuestos();

    if (lista_impuestos == "") {
        Swal.fire({
            title: 'No existen impuestos',
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

    for (let i = 0; i < lista_impuestos.length; i++) {
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


        labelNombre.innerHTML = "Nombre: " + lista_impuestos[i]['nombre'];
        labelMonto.innerHTML = "Porcentaje: " + lista_impuestos[i]['porcentaje'];
        labelEstado.innerHTML = "Estado: " + lista_impuestos[i]['estado'];




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
    let lista_impuestos = await listar_impuestos();
    //---
    let lista_div_clase = document.querySelector("#id-lista-div");
    lista_div_clase.innerHTML = "";

    let ul;
    ul = document.createElement("ul");
    ul.id = "id-ul";
    ul.style.width = "100%";


    for (let i = 0; i < lista_impuestos.length; i++) {
        let nombre = lista_impuestos[i]['nombre'].toLowerCase();
        let porc = String(lista_impuestos[i]['porcentaje']);
        if (nombre.includes(filtro) || porc.includes(filtro)) {
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


            labelNombre.innerHTML = "Nombre: " + lista_impuestos[i]['nombre'];
            labelMonto.innerHTML = "Porcentaje: " + lista_impuestos[i]['porcentaje'];
            labelEstado.innerHTML = "Estado: " + lista_impuestos[i]['estado'];




            li.appendChild(labelNombre);
            li.appendChild(labelMonto);
            li.appendChild(labelEstado);
            ul.appendChild(li);
        }

        
    }


    lista_div_clase.appendChild(ul);


}

btnListar.addEventListener('click', listarImpuestos);
input_filtro.addEventListener('keyup', mostrarDatosFiltradosEnElContenedor);
