import { autocompletarDatos, inicializarFormulario } from "./perfil-datos.js";
import { inicializarFormulario as inicializarFormularioMediosPago } from "./perfil-medios-pago.js";

function cargarContenido(urlArchivo) {
    const contenedorMain = document.querySelector(".c-perfil");

    fetch(urlArchivo)
        .then(res => {
            if (!res.ok) alert("No se pudo cargar la sección!");
            return res.text();
        })
        .then(htmlSeccion => {
            contenedorMain.innerHTML = htmlSeccion;
            if (document.getElementById("formPerfil")) {
                autocompletarDatos();
                inicializarFormulario();
            }
            if (document.getElementById("form-medios-pago")) {
                inicializarFormularioMediosPago();
            }
        })
}

window.cargarContenido = cargarContenido;
