// =========================
// DATOS DE LA BÚSQUEDA
// =========================

const busqueda =
    JSON.parse(
        localStorage.getItem("busqueda")
    );

const origen =
    busqueda?.origen || "";

const destino =
    busqueda?.destino || "";

// =========================
// MOSTRAR INFORMACIÓN
// =========================

document.getElementById(
    "informacion-busqueda"
).innerHTML = `
    <p>Origen: ${origen}</p>
    <p>Destino: ${destino}</p>
`;

// =========================
// FILTRAR POR DESTINO
// =========================

const tarjetas =
    document.querySelectorAll(".card");

tarjetas.forEach(function (card) {

    if (
        card.dataset.destino !==
        destino
    ) {

        card.style.display =
            "none";

    }

});

// =========================
// RESERVAR VUELO
// =========================

function reservar(
    origen,
    destino,
    aerolinea,
    precio,
    horario,
    duracion,
    numeroVuelo,
    fechaSalida,
    horarioSalida,
    horarioLlegada
) {

    const usuarioLogueado =
        localStorage.getItem("usuarioLogueado");

    if (!usuarioLogueado) {

        alert("Debe iniciar sesión");

        window.location.href =
            "login.html";

        return;
    }

    const nuevaReserva = {

        origen,
        destino,
        aerolinea,
        precio,
        horario,
        duracion,
        numeroVuelo,
        fechaSalida,
        horarioSalida,
        horarioLlegada

    };

    localStorage.setItem(
        "vueloSeleccionado",
        JSON.stringify(nuevaReserva)
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