import { autocompletarDatos } from "./perfil-datos.js";

const mailLogueado = localStorage.getItem("usuarioLogueado");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const usuarioActual = usuarios.find(u => u.correo === mailLogueado);
const formHTML = document.getElementById("form-medios-pago");


// {
//     nroTarjeta,
//     titular,
//     mesVto,
//     anioVto,
//     documento,
//     codigoSeg
// }

function inicializarFormulario() {
    const form = document.getElementById("form-medios-pago");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            const tarjeta = {};
            const nroTarjeta = formData.get("nro-tarjeta");
            const titular = formData.get("titular-tarjeta");
            const mesVto = formData.get("mes-vto");
            const documento = formData.get("documento");
            const anioVto = formData.get("anio-vto");
            const codigoSeg = formData.get("cod-seguridad");

            console.log(nroTarjeta, titular, mesVto, anioVto, codigoSeg);
            if ((nroTarjeta || titular || mesVto || anioVto || codigoSeg) &&
                !(nroTarjeta && titular && mesVto && anioVto && codigoSeg)) {
                verificarNuevaTarjeta(nroTarjeta, titular, mesVto, anioVto, documento, codigoSeg, tarjeta);
            }
        })
    }
}

function verificarNuevaTarjeta(nroTarjeta, titular, mesVto, anioVto, documento, codigoSeg, tarjeta) {

    if (usuarioActual.listaTarjetas) {

        if (usuarioActual.listaTarjetas.length >= 3) {
            alert("No es posible guardar más de 3 tarjetas.");
            return;
        }

        if ((nroTarjeta || titular || mesVto || anioVto || documento || codigoSeg) && !(nroTarjeta && titular && mesVto && anioVto && documento && codigoSeg)) {
            alert("No se ingresaron todos los datos");
            return;
        }
    }
    if (nroTarjeta.length !== 16) {
        alert("El numero de tarjeta debe tener 16 digitos");
        return;
    } else if (isNaN(nroTarjeta)) {
        alert("El numero de tarjeta debe tener solo numeros");
        return;
    }
    tarjeta.nroTarjeta = nroTarjeta;


    // NOMBRE DEL TITULAR DE TARJETA
    const regexNoLetras = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ'\s]/;
    if (regexNoLetras.test(titular)) {
        alert("El titular de la tarjeta debe tener solo letras");
        return;
    }
    tarjeta.titular = titular;

    // MES Y AÑO VTO
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    const anioActual = fechaActual.getFullYear();

    if (parseInt(anioVto) < anioActual || (parseInt(anioVto) === anioActual && parseInt(mesVto) < mesActual)) {
        alert("La fecha de vencimiento no puede ser anterior a la fecha actual");
        return;
    }
    tarjeta.mesVto = mesVto;
    tarjeta.anioVto = anioVto;

    // DNI 
    if (isNaN(documento)) {
        alert("El documento debe tener solo numeros");
        return;
    }
    if (documento.length < 7 || documento.length > 8) {
        alert("El documento debe tener entre 7 y 8 digitos");
        return;
    }
    tarjeta.documento = documento;

    // CODIGO SEGURIDAD
    if (isNaN(codigoSeg)) {
        alert("El codigo de seguridad debe tener solo numeros");
        return;
    }
    if (codigoSeg.length !== 3 && codigoSeg.length !== 4) {
        alert("El codigo de seguridad debe tener entre 3 y 4 digitos");
        return;
    }
    tarjeta.codigoSeg = codigoSeg;

    usuarioActual.listaTarjetas.push(tarjeta);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    formHTML.reset();
    alert("Tarjeta guardada");

    renderizarTarjetasGuardadas();
    verificarCantidadDeTarjetas();
}

function renderizarTarjetasGuardadas() {
    if (!usuarioActual.listaTarjetas) usuarioActual.listaTarjetas = [];
    for (let i = 0; i < 3; i++) {
        let div = document.getElementById("tarjeta-fila-" + i);
        if (div) {
            div.innerHTML = "";
            div.classList.add("oculto");
        }
    }
    for (let i = 0; i < 3; i++) {
        let div = document.getElementById("tarjeta-fila-" + i);
        let tarjetaGuardada = usuarioActual.listaTarjetas[i];
        let ultimosCuatroNumeros = tarjetaGuardada.nroTarjeta.slice(-4);

        if (div) {
            div.innerHTML =
                `<div class="datos-tarjeta">
                    <span class="icono-tarjeta">💳</span>
                    <div class="info-tarjeta">
                        <span class="numero-oculto">**** **** **** ${ultimosCuatroNumeros}</span>
                        <span class="titular-tarjeta">${tarjetaGuardada.titular}</span>
                    </div>
                </div>
                <button type="button" class="btn-borrar-tarjeta" onclick="borrarTarjeta(${i})">Borrar</button>`;
            div.classList.remove("oculto");
        }
    }
}

function verificarCantidadDeTarjetas() {
    let div = document.getElementById("div-tarjetas-guardadas");
    const details = document.getElementById("tarjetas-details");

    if (!usuarioActual.listaTarjetas || usuarioActual.listaTarjetas.length === 0) {
        if (div) div.classList.add("oculto");
        if (details) details.classList.remove("oculto");
        return;
    }

    if (div) div.classList.remove("oculto");

    if (details) {
        if (usuarioActual.listaTarjetas.length >= 3) {
            details.classList.add("oculto");
        } else {
            details.classList.remove("oculto");
        }
    }
}


export { inicializarFormulario };