import { autocompletarDatos } from "./perfil-datos.js";

const mailLogueado = localStorage.getItem("usuarioLogueado");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const usuarioActual = usuarios.find(u => u.correo === mailLogueado);


// {
//     nroTarjeta,
//     titular,
//     mesVto,
//     anioVto,
//     documento,
//     codigoSeg
// }

function inicializarFormulario() {
    if (!usuarioActual) return;

    const formTarjeta = document.getElementById("form-medios-pago");
    const formFacturacion = document.getElementById("form-facturacion");

    autocompletarFacturacion();
    renderizarTarjetasGuardadas();
    verificarCantidadDeTarjetas();

    if (formTarjeta) {
        formTarjeta.addEventListener("submit", function (e) {
            e.preventDefault();
            const nroTarjeta = document.getElementById("nro-tarjeta").value;
            const regexTarjeta = /^\d{4}(?:[- ]?\d{4}){3}$/;

            if (!regexTarjeta.test(nroTarjeta)) {
                alert("El número de tarjeta debe tener 16 dígitos y no puede contener letras ni simbolos.");
                return;
            }

            const titular = document.getElementById("titular-tarjeta").value;
            const regexTitular = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{0,50}$/;
            if (!regexTitular.test(titular)) {
                alert("El titular de la tarjeta debe tener máximo 50 letras y no puede contener números ni símbolos.");
                return;
            }

            const mesVto = document.getElementById("mes-vto").value;
            const anioVto = document.getElementById("anio-vto").value;

            const regexDocumento = /^[A-Za-z0-9.\s-]{5,15}$/;
            const documento = document.getElementById("documento").value;
            if (!regexDocumento.test(documento)) {
                alert("El documento debe tener entre 5 y 15 caracteres y no puede contener símbolos.");
                return;
            }

            const regexCVV = /^\d{3,4}$/;
            const codigoSeg = document.getElementById("cvv").value;
            if (!regexCVV.test(codigoSeg)) {
                alert("El código de seguridad debe tener entre 3 y 4 dígitos.");
                return;
            }

            const fechaActual = new Date();
            const mesActual = fechaActual.getMonth() + 1;
            const anioActual = fechaActual.getFullYear();

            let anioParseado = parseInt(anioVto);
            if (anioParseado < 100) {
                anioParseado += 2000;
            }

            if (anioParseado < anioActual || (anioParseado === anioActual && parseInt(mesVto) < mesActual)) {
                alert("La tarjeta esta vencida");
                return;
            }

            const tarjeta = {
                nroTarjeta: nroTarjeta,
                titular: titular,
                mesVto: mesVto,
                anioVto: anioVto,
                documento: documento,
                codigoSeg: codigoSeg
            };

            if (tarjeta.nroTarjeta && tarjeta.titular && tarjeta.mesVto && tarjeta.anioVto && tarjeta.documento && tarjeta.codigoSeg) {
                guardarNuevaTarjeta(tarjeta);
            } else {
                alert("No se ingresaron todos los datos");
            }
        })
    }

    if (formFacturacion) {
        const inputPais = document.getElementById("pais");
        if (inputPais) {
            const details = inputPais.closest("details");
            if (details) {
                const boton = details.querySelector("button");
                if (boton) {
                    boton.addEventListener("click", function (e) {
                        if (this.textContent === "Editar") {
                            e.preventDefault();
                            cambiarEstadoFacturacion(false);
                        }
                    });
                }
            }
        }

        formFacturacion.addEventListener("submit", function (e) {
            e.preventDefault();

            const pais = document.getElementById("pais").value;
            const domicilio = document.getElementById("domicilio").value;
            const localidad = document.getElementById("localidad").value;
            const provincia = document.getElementById("provincia").value;
            const codPostal = document.getElementById("cod-postal").value;

            if (!pais || !domicilio || !localidad || !provincia || !codPostal) {
                alert("No se ingresaron todos los datos");
                return;
            }

            if (!pais) {
                alert("Debe ingresar un pais");
                return;
            }

            const regexDomicilio = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,#°-]+$/;

            if (!regexDomicilio.test(domicilio)) {
                alert("El domicilio no es válido. Solo se permiten letras, números, espacios y caracteres básicos (., # - °).");
                return;
            }

            const regexLocalidad = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

            if (!regexLocalidad.test(localidad)) {
                alert("La localidad debe contener solo letras y espacios.");
                return;
            }

            const regexProvincia = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
            if (!regexProvincia.test(provincia)) {
                alert("La provincia debe contener solo letras y espacios.");
                return;
            }

            const regexCodPostal = /^(?:\d{4}|[A-Za-z]\d{4}[A-Za-z]{3})$/;
            if (!regexCodPostal.test(codPostal)) {
                alert("El código postal debe ser de 4 dígitos (ej: 1425) o formato CPA (ej: C1024CWN)");
                return;
            }

            const datosFacturacion = {
                pais: pais,
                domicilio: domicilio,
                localidad: localidad,
                provincia: provincia,
                codPostal: codPostal,
            };
            usuarioActual.datosFacturacion = datosFacturacion;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Datos de facturación guardados");
            cambiarEstadoFacturacion(true);
            console.log(datosFacturacion);
        });
    }
}

function guardarNuevaTarjeta(tarjeta) {
    if (!usuarioActual.listaTarjetas) {
        usuarioActual.listaTarjetas = [];
    }

    if (usuarioActual.listaTarjetas.length >= 3) {
        alert("No es posible guardar más de 3 tarjetas.");
        return;
    }

    usuarioActual.listaTarjetas.push(tarjeta);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    const formTarjeta = document.getElementById("form-medios-pago");
    if (formTarjeta) formTarjeta.reset();
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

        if (!usuarioActual.listaTarjetas[i]) {
            continue;
        }

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
window.borrarTarjeta = function (indice) {
    usuarioActual.listaTarjetas.splice(indice, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderizarTarjetasGuardadas();
    verificarCantidadDeTarjetas();
}

function cambiarEstadoFacturacion(deshabilitar) {
    const pais = document.getElementById("pais");
    const domicilio = document.getElementById("domicilio");
    const localidad = document.getElementById("localidad");
    const provincia = document.getElementById("provincia");
    const codPostal = document.getElementById("cod-postal");
    if (pais) pais.disabled = deshabilitar;
    if (domicilio) domicilio.disabled = deshabilitar;
    if (localidad) localidad.disabled = deshabilitar;
    if (provincia) provincia.disabled = deshabilitar;
    if (codPostal) codPostal.disabled = deshabilitar;

    if (pais) {
        const details = pais.closest("details");
        if (details) {
            const boton = details.querySelector("button");
            if (boton) {
                boton.textContent = deshabilitar ? "Editar" : "Agregar";
            }
        }
    }
}

function autocompletarFacturacion() {
    if (usuarioActual && usuarioActual.datosFacturacion && usuarioActual.datosFacturacion.pais) {
        const pais = document.getElementById("pais");
        const domicilio = document.getElementById("domicilio");
        const localidad = document.getElementById("localidad");
        const provincia = document.getElementById("provincia");
        const codPostal = document.getElementById("cod-postal");

        if (pais) pais.value = usuarioActual.datosFacturacion.pais || "";
        if (domicilio) domicilio.value = usuarioActual.datosFacturacion.domicilio || "";
        if (localidad) localidad.value = usuarioActual.datosFacturacion.localidad || "";
        if (provincia) provincia.value = usuarioActual.datosFacturacion.provincia || "";
        if (codPostal) codPostal.value = usuarioActual.datosFacturacion.codPostal || "";

        cambiarEstadoFacturacion(true);
    }
}

export { inicializarFormulario };