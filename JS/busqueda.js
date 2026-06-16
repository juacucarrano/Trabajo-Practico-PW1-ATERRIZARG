const destinoBuscado =
    localStorage.getItem("destino");

const tarjetas =
    document.querySelectorAll(".card");

tarjetas.forEach(function (card) {

    const destinoCard =
        card.dataset.destino;

    if (
        destinoBuscado &&
        destinoCard.toLowerCase() !==
        destinoBuscado.toLowerCase()
    ) {
        card.style.display = "none";
    }

});
const fechaIda =
    localStorage.getItem("fechaIda");

const fechaVuelta =
    localStorage.getItem("fechaVuelta");

document.getElementById(
    "informacion-busqueda"
).innerHTML =

    `
<p>Destino: ${destinoBuscado}</p>
<p>Ida: ${fechaIda}</p>
<p>Vuelta: ${fechaVuelta}</p>
`;

const origen = localStorage.getItem("origen");
const destino = localStorage.getItem("destino");

document.getElementById(
    "informacion-busqueda"
).innerHTML = `
<p>Origen: ${origen}</p>
<p>Destino: ${destino}</p>
`;

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
){

    const logueado =
    localStorage.getItem("logueado");

    if(logueado !== "true"){

        alert("Debe iniciar sesión");

        window.location.href =
        "login.html";

        return;
    }

    const usuario =
    localStorage.getItem(
        "usuarioLogueado"
    );

    let reservas =
    JSON.parse(
        localStorage.getItem(
            "reservas_" + usuario
        )
    ) || [];

    const nuevaReserva = {

    origen: origen,
    destino: destino,
    aerolinea: aerolinea,
    precio: precio,
    horario: horario,
    duracion: duracion,
    numeroVuelo: numeroVuelo,
    fechaSalida: fechaSalida,
    horarioSalida: horarioSalida,
    horarioLlegada: horarioLlegada

};

    reservas.push(
        nuevaReserva
    );

    localStorage.setItem(
        "reservas_" + usuario,
        JSON.stringify(reservas)
    );

    localStorage.setItem(
        "vueloSeleccionado",
        JSON.stringify(nuevaReserva)
    );

    window.location.href =
    "./detalle-de-vuelo.html";
}

const checkDirecto = document.getElementById("directo");
const checkEscalas = document.getElementById("escalas");
const Flybondi = document.getElementById("Flybondi");
const AerolineasArgentinas = document.getElementById("AerolineasArgentinas");
const mano = document.getElementById("de-mano");
const cabina = document.getElementById("cabina");
const despachar = document.getElementById("despachar");
const precio = document.getElementById("precio");
const precioActual = document.getElementById("precio-actual");

if (precio) { // Indica el valor filtro tipo slider del acordeon

    precio.addEventListener(
        "input",
        function () {

            precioActual.textContent =
                "$" + precio.value + " USD";

        }
    );

}

function obtenerOpcionesEquipaje(card) {
    return (card.dataset.equipaje || "")
}

function mostrarTarjetasPorFiltro() {
    const tiposSeleccionados = [];
    const aerolineasSeleccionadas = [];
    const equipajeSeleccionado = [];

    if (checkDirecto?.checked) tiposSeleccionados.push("directo");
    if (checkEscalas?.checked) tiposSeleccionados.push("escala");
    if (Flybondi?.checked) aerolineasSeleccionadas.push("Flybondi");
    if (AerolineasArgentinas?.checked) aerolineasSeleccionadas.push("AerolineasArgentinas");
    if (mano?.checked) equipajeSeleccionado.push("de-mano");
    if (cabina?.checked) equipajeSeleccionado.push("cabina");
    if (despachar?.checked) equipajeSeleccionado.push("despachar");

    tarjetas.forEach(function (card) {
        const tipo = (card.dataset.tipo || "").toLowerCase();
        const aerolinea = card.dataset.aerolinea || "";
        const equipajeOpciones = obtenerOpcionesEquipaje(card);
        const precioVuelo = Number(card.dataset.precio);

        let visible = true;

        if (tiposSeleccionados.length > 0 && !tiposSeleccionados.includes(tipo)) {
            visible = false;
        }

        if (aerolineasSeleccionadas.length > 0 && !aerolineasSeleccionadas.includes(aerolinea)) {
            visible = false;
        }

        if (equipajeSeleccionado.length > 0 && !equipajeSeleccionado.every(function (opcion) {
            return equipajeOpciones.includes(opcion);
        })) {
            visible = false;
        }
        if (precio && precioVuelo > Number(precio.value)) {
            visible = false;
        }

        card.style.display = visible ? "flex" : "none";
    });
}

[checkDirecto, checkEscalas, Flybondi, AerolineasArgentinas, mano, cabina, despachar, precio].forEach(function (input) {
    if (input) {
        input.addEventListener("change", mostrarTarjetasPorFiltro);
    }
});