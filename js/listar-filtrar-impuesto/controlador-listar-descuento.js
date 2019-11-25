'use strict';

let btnListar = document.querySelector("#btn-listar");
let input_filtro = document.querySelector("#id-search-bar");

let llenar_tabla = async () => {
    lista_usuarios = await listar_usuarios();
    tbody.innerHTML = "";
    for (let i = 0; i < lista_usuarios.length; i++) {

        let fila = tbody.insertRow();

        fila.insertCell().innerHTML = lista_usuarios[i]['cedula'];
        fila.insertCell().innerHTML = lista_usuarios[i]['correo'];
        fila.insertCell().innerHTML = lista_usuarios[i]['nombre'];

    }
}

let listarDescuentos = async () => {
    let lista_descuentos = await listar_usuarios();
    console.log(lista_descuentos[0]);

    let lista_div_clase = document.querySelector("#id-lista-div");
    lista_div_clase.innerHTML = "";

    let ul;
    ul = document.createElement("ul");
    ul.id = "id-ul";
    ul.style.width = "100%";

    for (let i = 0; i < lista_descuentos.length; i++) {
        let li, labelNombre, labelMonto;
        li = document.createElement("li");
        li.id = "id-li";
        li.style.width = "100%";
        li.style.background = "#feffe4";
        li.style.height = "67px";
        li.style.border = "1px solid green";

        labelNombre = document.createElement("label");
        labelNombre.id = "id-label-nombre";
        labelNombre.style.display = "inline-block";
        labelNombre.style.padding = "25px 0px";
        labelNombre.style.paddingLeft = "60px";
        labelNombre.style.cssFloat = "left";
        labelNombre.style.color = "green";
        labelNombre.width = "50";
        labelMonto = document.createElement("label");
        labelMonto.id = "id-label-monto";
        labelMonto.style.display = "inline-block";
        labelMonto.style.padding = "25px";
        labelMonto.style.paddingRight = "60px";
        labelMonto.style.cssFloat = "right";
        labelMonto.style.color = "green";
        labelMonto.style.width = "40%";


        labelNombre.innerHTML = "Nombre: " + lista_descuentos[i]['nombre'];
        labelMonto.innerHTML = "Monto: " + lista_descuentos[i]['porcentaje'];



        li.appendChild(labelNombre);
        li.appendChild(labelMonto);
        ul.appendChild(li);

    }












    lista_div_clase.appendChild(ul);

}
//aqui termina listar impuestos

//funcion filtrar datos y mostrarlos en el contenedor donde el sistema los lista normalmente 
let mostrarDatosFiltradosEnElContenedor = async () => {
    let filtro = input_filtro.value.toLowerCase();
    let lista_usuarios = await listar_usuarios();
    //---
    let lista_div_clase = document.querySelector("#id-lista-div");
    lista_div_clase.innerHTML = "";

    let ul;
    ul = document.createElement("ul");
    ul.id = "id-ul";
    ul.style.width = "100%";


    for (let i = 0; i < lista_usuarios.length; i++) {
        let nombre = lista_usuarios[i]['nombre'].toLowerCase();
        if (nombre.includes(filtro)) {
            //------------------------------------------------------------------------------------------
            //Proceso para entender filtrar descuentos
            let li, labelNombre;
            li = document.createElement("li");
            li.id = "id-li";
            li.style.width = "100%";
            li.style.background = "#feffe4";
            li.style.height = "67px";
            li.style.border = "1px solid green";

            labelNombre = document.createElement("label");
            labelNombre.id = "id-label-nombre";
            labelNombre.style.display = "inline-block";
            labelNombre.style.padding = "25px 0px";
            labelNombre.style.paddingLeft = "60px";
            labelNombre.style.cssFloat = "left";
            labelNombre.style.color = "green";
            labelNombre.width = "50";



            labelNombre.innerHTML = "Nombre: " + lista_usuarios[i]['nombre'];



            li.appendChild(labelNombre);
            ul.appendChild(li);
        }
    }


    lista_div_clase.appendChild(ul);

    
}
input_filtro.addEventListener('keyup', mostrarDatosFiltradosEnElContenedor);
btnListar.addEventListener('click', listarDescuentos);