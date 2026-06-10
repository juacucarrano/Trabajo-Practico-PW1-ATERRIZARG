const mailLogueado = localStorage.getItem("usuarioLogueado");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const usuarioActual = usuarios.find(u => u.correo === mailLogueado);

autocompletarDatos();

function inicializarFormulario() {
    const formulario = document.getElementById("formPerfil");
    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault();

            const prefPais = document.getElementById("cod-pais").value;
            const codArea = document.getElementById("cod-area").value;
            const nroTel = document.getElementById("nro-tel").value;

            if (prefPais && codArea && nroTel) {
                const contacto = {
                    prefPais,
                    codArea,
                    nroTel
                }
                usuarioActual.contacto = contacto;
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
            formulario.reset();
            alert("Datos guardados");
        });
    }
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
        perfPrefPais.textContent = usuarioActual.contacto.prefPais;
        perfCodArea.textContent = usuarioActual.contacto.codArea;
        perfTel.textContent = usuarioActual.contacto.nroTel;
    }
    if (mailVerificado) {
        mailVerificado.textContent = mailLogueado;
    }

    renderizarMailsRespaldo();
    verificarCantidadDeRespaldos();
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

function borrarCorreo(indice) {
    usuarioActual.mailsRespaldo.splice(indice, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderizarMailsRespaldo();
    verificarCantidadDeRespaldos();
}

function cargarContenido(urlArchivo) {
    const contenedorMain = document.querySelector(".c-perfil");

    fetch(urlArchivo)
        .then(res => {
            if (!res.ok) alert("No se pudo cargar la sección!");
            return res.text();
        })
        .then(htmlSeccion => {
            contenedorMain.innerHTML = htmlSeccion;
            autocompletarDatos();
            inicializarFormulario();
        })
}