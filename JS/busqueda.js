// =========================
// DATOS DE LA BÚSQUEDA
// =========================

const busqueda =
JSON.parse(
    localStorage.getItem("busqueda")
);

const destino =
busqueda?.destino || "";

function mostrarVuelos() {

    const contenedor =
    document.getElementById(
        "contenedor-vuelos"
    );

    contenedor.innerHTML = "";

    vuelos.forEach(function(vuelo){

        if(vuelo.destino !== destino){
            return;
        }

        const card =
        document.createElement("div");

        card.className = "card";

        card.dataset.destino =
        vuelo.destino;

        card.dataset.tipo =
        vuelo.tipo;

        card.dataset.aerolinea =
        vuelo.aerolinea;

        card.dataset.equipaje =
        vuelo.equipaje.join(",");

        card.dataset.precio =
        vuelo.precio;

        let logoAerolinea = "";

if (vuelo.aerolinea === "AerolineasArgentinas") {

    logoAerolinea =
    "../images/aerolineasargentinas-logo-l.png";

}
else if (vuelo.aerolinea === "Flybondi") {

    logoAerolinea =
    "../images/Flybondi_logo_simple.svg.png";

}

card.innerHTML = `

<div class="vuelo-card">

    <div class="vuelo-logo">

        <img
            src="${logoAerolinea}"
            alt="${vuelo.aerolinea}"
            class="logo-aerolinea"
        >

    </div>

    <div class="vuelo-info">

        <div class="ruta">
            🌎 ${vuelo.origen}
            ➜
            ${vuelo.destino}
        </div>

        <div class="datos-vuelo">

            <span>🎫 ${vuelo.numeroVuelo}</span>

            <span>📅 ${vuelo.fechaSalida}</span>

            <span>
                🕒 ${vuelo.horarioSalida}
                -
                ${vuelo.horarioLlegada}
            </span>

            <span>⏳ ${vuelo.duracion}</span>

            <span>
                ${
                    vuelo.tipo === "directo"
                    ? "🟢 Directo"
                    : "🟠 Escala"
                }
            </span>

            <span>
                🧳 ${vuelo.equipaje.join(", ")}
            </span>

        </div>

    </div>

    <div class="vuelo-precio">

        <h2>
            U$D ${vuelo.precio}
        </h2>

        <button onclick="
            reservar(${vuelo.id})
        ">
            RESERVAR
        </button>

    </div>

</div>

`;

        contenedor.appendChild(card);

    });

}

// =========================
// RESERVAR VUELO
// =========================

function reservar(id){

    const usuarioLogueado =
    localStorage.getItem(
        "usuarioLogueado"
    );

    if(!usuarioLogueado){

    alert(
        "Debe iniciar sesión"
    );

    window.location.href =
    "./login.html";

    return;
}

    const vueloSeleccionado =
    vuelos.find(function(vuelo){

        return vuelo.id === id;

    });

    localStorage.setItem(
        "vueloSeleccionado",
        JSON.stringify(
            vueloSeleccionado
        )
    );

    window.location.href =
    "./detalle-de-vuelo.html";

}
// =========================
// FILTROS
// =========================

const checkDirecto =
    document.getElementById("directo");

const checkEscalas =
    document.getElementById("escalas");

const Flybondi =
    document.getElementById("Flybondi");

const AerolineasArgentinas =
    document.getElementById("AerolineasArgentinas");

const mano =
    document.getElementById("de-mano");

const cabina =
    document.getElementById("cabina");

const despachar =
    document.getElementById("despachar");

const precio =
    document.getElementById("precio");

const precioActual =
    document.getElementById("precio-actual");

// =========================
// MOSTRAR VALOR DEL SLIDER
// =========================

if (precio) {

    precio.addEventListener(
        "input",
        function () {

            precioActual.textContent =
                "$" +
                precio.value +
                " USD";

        }
    );

}

// =========================
// OBTENER EQUIPAJE
// =========================

function obtenerOpcionesEquipaje(card) {

    return (
        card.dataset.equipaje || ""
    );

}

// =========================
// FILTRAR TARJETAS
// =========================

function mostrarTarjetasPorFiltro() {

    const tiposSeleccionados = [];
    const aerolineasSeleccionadas = [];
    const equipajeSeleccionado = [];

    const tarjetas =
    document.querySelectorAll(".card");

    if (checkDirecto?.checked) {
        tiposSeleccionados.push(
            "directo"
        );
    }

    if (checkEscalas?.checked) {
        tiposSeleccionados.push(
            "escala"
        );
    }

    if (Flybondi?.checked) {
        aerolineasSeleccionadas.push(
            "Flybondi"
        );
    }

    if (AerolineasArgentinas?.checked) {
        aerolineasSeleccionadas.push(
            "AerolineasArgentinas"
        );
    }

    if (mano?.checked) {
        equipajeSeleccionado.push(
            "de-mano"
        );
    }

    if (cabina?.checked) {
        equipajeSeleccionado.push(
            "cabina"
        );
    }

    if (despachar?.checked) {
        equipajeSeleccionado.push(
            "despachar"
        );
    }

    tarjetas.forEach(function (card) {

        // Respeta siempre el destino buscado
        if (
            card.dataset.destino !==
            destino
        ) {

            card.style.display =
                "none";

            return;
        }

        const tipo =
            (
                card.dataset.tipo || ""
            ).toLowerCase();

        const aerolinea =
            card.dataset.aerolinea || "";

        const equipajeOpciones =
            obtenerOpcionesEquipaje(card);

        const precioVuelo =
            Number(card.dataset.precio);

        let visible = true;

        if (
            tiposSeleccionados.length > 0 &&
            !tiposSeleccionados.includes(tipo)
        ) {

            visible = false;

        }

        if (
            aerolineasSeleccionadas.length > 0 &&
            !aerolineasSeleccionadas.includes(aerolinea)
        ) {

            visible = false;

        }

        if (
            equipajeSeleccionado.length > 0 &&
            !equipajeSeleccionado.every(
                function (opcion) {

                    return equipajeOpciones.includes(
                        opcion
                    );

                }
            )
        ) {

            visible = false;

        }

        if (
            precio &&
            precioVuelo >
            Number(precio.value)
        ) {

            visible = false;

        }

        card.style.display =
            visible
                ? "flex"
                : "none";

    });

}

// =========================
// EVENTOS DE FILTRO
// =========================

[
    checkDirecto,
    checkEscalas,
    Flybondi,
    AerolineasArgentinas,
    mano,
    cabina,
    despachar,
    precio
].forEach(function (input) {

    if (input) {

        input.addEventListener(
            "change",
            mostrarTarjetasPorFiltro
        );

    }

});

mostrarVuelos();
mostrarTarjetasPorFiltro();