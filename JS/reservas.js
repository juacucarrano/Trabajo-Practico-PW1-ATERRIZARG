const usuario =
localStorage.getItem(
    "usuarioLogueado"
);

const lista =
document.getElementById(
    "lista-reservas"
);

const reservas =
JSON.parse(
    localStorage.getItem(
        "reservas_" + usuario
    )
) || [];

if(reservas.length === 0){

    lista.innerHTML = `
        <p>No tienes reservas realizadas.</p>
    `;

}
else{

    reservas.forEach(function(reserva){

    const card =
    document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
        <p>${reserva.origen} → ${reserva.destino}</p>
        <p>${reserva.horario}</p>
    `;

    card.addEventListener(
        "click",
        function(){

            localStorage.setItem(
                "reservaSeleccionada",
                JSON.stringify(reserva)
            );

            location.reload();

        }
    );

    lista.appendChild(card);

    });

}
const reservaSeleccionada =
JSON.parse(
    localStorage.getItem(
        "reservaSeleccionada"
    )
);

if(reservaSeleccionada){

    document.getElementById("ruta-ida").textContent =
    reservaSeleccionada.origen +
    " → " +
    reservaSeleccionada.destino;

    document.getElementById("hora-salida").textContent =
    reservaSeleccionada.horario;

    document.getElementById("duracion").textContent =
    reservaSeleccionada.duracion;

    document.getElementById("numero-vuelo").textContent =
    reservaSeleccionada.numeroVuelo;

}