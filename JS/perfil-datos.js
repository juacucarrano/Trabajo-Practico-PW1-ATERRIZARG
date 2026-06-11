const mailLogueado = localStorage.getItem("usuarioLogueado");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const usuarioActual = usuarios.find(u => u.correo === mailLogueado);

autocompletarDatos();

function autocompletarDatos() {
    if (!usuarioActual) return;

    const perfNombre = document.getElementById("perf-nombre");
    const perfDoc = document.getElementById("perf-doc");
    const perfFecha = document.getElementById("perf-fecha");
    const perfNac = document.getElementById("perf-nac");
    const perfGenero = document.getElementById("perf-genero");
    const mailVerificado = document.getElementById("correo-verificado");
    const perfPrefPais = document.getElementById("cod-pais");
    const perfCodArea = document.getElementById("cod-area");
    const perfTel = document.getElementById("nro-tel");

    if (perfNombre) {
        perfNombre.textContent = usuarioActual.nombre + " " + usuarioActual.apellido;
    }
    if (perfDoc) {
        perfDoc.textContent = usuarioActual.documento;
    }
    if (perfFecha) {
        const fecNacimiento = new Date(usuarioActual.fechaNac);
        const dia = fecNacimiento.getDate();
        const mes = fecNacimiento.getMonth() + 1;
        const anio = fecNacimiento.getFullYear();
        perfFecha.textContent = dia + '/' + mes + '/' + anio;
    }
    if (perfNac) {
        perfNac.textContent = usuarioActual.nacionalidad;
    }
    if (perfGenero) {
        perfGenero.textContent = usuarioActual.genero;
    }
    if (perfPrefPais && perfCodArea && perfTel && usuarioActual.contacto) {
        perfPrefPais.value = usuarioActual.contacto.prefPais || "";
        perfCodArea.value = usuarioActual.contacto.codArea || "";
        perfTel.value = usuarioActual.contacto.nroTel || "";

        if (usuarioActual.contacto.nroTel) {
            cambiarEstadoTelefono(true);
        } else {
            cambiarEstadoTelefono(false);
        }
    }

    if (perfTel) {
        const details = perfTel.closest("details");
        if (details) {
            const summary = details.querySelector("summary");
            if (summary) summary.textContent = "Editar Teléfono";
        }
    }
    if (mailVerificado) {
        mailVerificado.textContent = mailLogueado;
    }

    renderizarMailsRespaldo();
    verificarCantidadDeRespaldos();
}

function renderizarMailsRespaldo() {
    if (!usuarioActual.mailsRespaldo) usuarioActual.mailsRespaldo = [];

    for (let i = 0; i < 2; i++) {
        let div = document.getElementById("correo-respaldo-fila-" + i);
        if (div) {
            div.innerHTML = "";
            div.classList.add("oculto");
        }
    }

    for (let i = 0; i < usuarioActual.mailsRespaldo.length; i++) {
        let div = document.getElementById("correo-respaldo-fila-" + i);
        if (div) {
            div.innerHTML =
                `<span>${usuarioActual.mailsRespaldo[i]}</span>
                <button type="button" class="btn-borrar-respaldo" onclick="borrarCorreo(${i})">Borrar</button>`;
            div.classList.remove("oculto");
        }
    }
}

function verificarCantidadDeRespaldos() {
    let div = document.getElementById("div-correo-respaldo");
    const details = document.getElementById("correo-details");

    if (!usuarioActual.mailsRespaldo || usuarioActual.mailsRespaldo.length === 0) {
        if (div) div.classList.add("oculto");
        if (details) details.classList.remove("oculto");
        return;
    }

    if (div) div.classList.remove("oculto");

    if (details) {
        if (usuarioActual.mailsRespaldo.length >= 2) {
            details.classList.add("oculto");
        } else {
            details.classList.remove("oculto");
        }
    }
}

function inicializarFormulario() {
    const formulario = document.getElementById("formPerfil");
    if (formulario) {

        const perfTel = document.getElementById("nro-tel");
        if (perfTel) {
            const details = perfTel.closest("details");
            if (details) {
                const boton = details.querySelector("button");
                if (boton) {
                    boton.addEventListener("click", function (e) {
                        if (this.textContent === "Editar") {
                            e.preventDefault();
                            cambiarEstadoTelefono(false);
                        }
                    });
                }
            }
        }

        formulario.addEventListener("submit", function (e) {
            e.preventDefault();

            const prefPais = document.getElementById("cod-pais").value.trim();
            const codArea = document.getElementById("cod-area").value.trim();
            const nroTel = document.getElementById("nro-tel").value.trim();



            if (prefPais && codArea && nroTel && prefijoValido(prefPais)) {
                const contacto = {
                    prefPais,
                    codArea,
                    nroTel
                }
                usuarioActual.contacto = contacto;
                console.log(usuarioActual.contacto);
            }

            const nuevoEmail = document.getElementById("email-nuevo").value.toLowerCase().trim();

            if (nuevoEmail) {
                if (nuevoEmail !== mailLogueado && !usuarioActual.mailsRespaldo.includes(nuevoEmail) && usuarioActual.mailsRespaldo.length < 2) {
                    usuarioActual.mailsRespaldo.push(nuevoEmail);
                    renderizarMailsRespaldo();
                    verificarCantidadDeRespaldos();
                } else {
                    alert("El email ya existe, es el correo principal, o se alcanzó el límite de 2 correos de respaldo.");
                    return;
                }
            }

            localStorage.setItem("usuarios", JSON.stringify(usuarios));


            const inputEmail = document.getElementById("email-nuevo");
            if (inputEmail) inputEmail.value = "";


            if (prefPais && codArea && nroTel && prefijoValido(prefPais)) {
                cambiarEstadoTelefono(true);
            }

            alert("Datos guardados");
        });
    }
}

function prefijoValido(prefPais) {
    let prefPrimerCaracter = prefPais[0];
    let prefijoResto = prefPais.slice(1);
    const regla = /^\d+$/;
    return prefPrimerCaracter === "+" && regla.test(prefijoResto)
}

window.borrarCorreo = function (indice) {
    usuarioActual.mailsRespaldo.splice(indice, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderizarMailsRespaldo();
    verificarCantidadDeRespaldos();
}

function cambiarEstadoTelefono(deshabilitar) {
    const perfPrefPais = document.getElementById("cod-pais");
    const perfCodArea = document.getElementById("cod-area");
    const perfTel = document.getElementById("nro-tel");

    if (perfPrefPais) perfPrefPais.disabled = deshabilitar;
    if (perfCodArea) perfCodArea.disabled = deshabilitar;
    if (perfTel) perfTel.disabled = deshabilitar;

    if (perfTel) {
        const details = perfTel.closest("details");
        if (details) {
            const boton = details.querySelector("button");
            if (boton) {
                boton.textContent = deshabilitar ? "Editar" : "Agregar";
            }
        }
    }
}

export { autocompletarDatos, inicializarFormulario };