const contenedorDias = document.getElementById("contenedor-dias");
const ofertaSeleccionada = JSON.parse(localStorage.getItem("ofertaSeleccionada"));

const fechaSeparada = ofertaSeleccionada.fechaSalida.split("/"); // las fechas se guardan en formato "23/06/2026" DD/MM/AA
const anio = parseInt(fechaSeparada[2]);
const mes = parseInt(fechaSeparada[1]) - 1;
const dia = parseInt(fechaSeparada[0]);

const cantidadDeDiasDelMes = new Date(anio, mes + 1, 0).getDate(); // el 0 hace que nos de el ultimo dia del mes anterior, por eso al mes le sumo 1
const primerDiaDeLaSemana = new Date(anio, mes, 1).getDay();

const selectPasajeros = document.getElementById("pasajeros");
const cantidadPasajeros = parseInt(selectPasajeros.value) || 1;

for (let i = 0; i < primerDiaDeLaSemana; i++) { // dibujo los contenedores vacíos
    contenedorDias.innerHTML += `<div class="dia vacio"></div>`;
}

for (let d = 1; d <= cantidadDeDiasDelMes; d++) { // dibujo los días del mes
    if (d === dia) { // si el día del bucle coincide con el día del vuelo seleccionado, es habilitado
        contenedorDias.innerHTML += `
            <label class="dia disponible">
                <input type="radio" name="vuelo" value="${d}">
                <span>${d}</span>
            </label>
        `;
    } else {
        contenedorDias.innerHTML += `<div class="dia bloqueado">${d}</div>`; // los demás días están bloqueados porque solo hay un vuelo de cada tipo en oferta, el más barato
    }
}

const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (e) {
    const diaSeleccionado = document.querySelector('input[name="vuelo"]:checked');

    if (!diaSeleccionado) {
        e.preventDefault();
        alert("Por favor, seleccione el día disponible antes de continuar.");
        return;
    }

    const selectPasajeros = document.getElementById("pasajeros");
    const cantidadPasajeros = parseInt(selectPasajeros.value) || 1;

    const busqueda = {
        origen: ofertaSeleccionada.origen,
        destino: ofertaSeleccionada.destino,
        pasajeros: cantidadPasajeros,
        clase: "Turista",
        id: ofertaSeleccionada.id
    };

    localStorage.setItem("busqueda", JSON.stringify(busqueda));
});