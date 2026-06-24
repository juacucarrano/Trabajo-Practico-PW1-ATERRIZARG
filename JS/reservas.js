const usuario = localStorage.getItem("usuarioLogueado");

if (!usuario) {
    window.location.href = "./login.html";
} else {
    const lista = document.getElementById("lista-reservas");

    const reservas = JSON.parse(localStorage.getItem("reservas_" + usuario)) || [];

    // Mostramos todos los datos de la reserva que toco el usuario
    function mostrarDetallesDeReserva(reserva) {
        if (!reserva) return;

        // cargamos los datos del vuelo
        document.getElementById("ruta-ida").textContent = `${reserva.origen} → ${reserva.destino}`;
        document.getElementById("fecha-ida").textContent = reserva.fechaSalida;
        document.getElementById("hora-salida").textContent = reserva.horarioSalida;
        document.getElementById("hora-llegada").textContent = reserva.horarioLlegada;
        document.getElementById("duracion").textContent = reserva.duracion;
        document.getElementById("numero-vuelo").textContent = reserva.numeroVuelo;

        // calculamos el total del pago
        const cantPasajeros = reserva.cantidadDePasajeros || 1;
        const precioUnitario = reserva.precio || 0;
        const descuento = reserva.descuento || 0;
        const total = (precioUnitario * cantPasajeros) - descuento;

        document.getElementById("cantidad-de-pasajeros").textContent =
            `${cantPasajeros} x $${precioUnitario} USD`;

        document.getElementById("descuento").textContent =
            `-$${descuento} USD`;

        document.getElementById("pago-total").textContent =
            `$${total} USD`;

        // nos fijamos que metodo de pago uso
        let metodoText = "";
        if (reserva.metodoPago === "creditCard") {
            metodoText = `Tarjeta de Crédito (terminación ${reserva.tarjetaInfo ? reserva.tarjetaInfo.slice(-4) : "****"})`;
        } else if (reserva.metodoPago === "transfer") {
            metodoText = "Transferencia Bancaria";
        } else {
            metodoText = reserva.metodoPago || "No especificado";
        }
        document.getElementById("terminacion-tarjeta").textContent = metodoText;

        if (reserva.fechaDePago) {
            const fechaObj = new Date(reserva.fechaDePago);
            document.getElementById("fecha-de-pago").textContent =
                fechaObj.toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", timeZoneName: "short" });
        } else {
            document.getElementById("fecha-de-pago").textContent = "No disponible";
        }
    }

    if (reservas.length === 0) {
        lista.innerHTML = `<p>No tienes reservas realizadas.</p>`;
    } else {
        reservas.forEach(function (reserva, index) {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
            <p>${reserva.origen} → ${reserva.destino}</p>
            <p>${reserva.horarioSalida} - ${reserva.horarioLlegada}</p>
        `;

            // si hace click, cambiamos los datos sin recargar la pagina
            card.addEventListener("click", function () {
                // desmarcamos las otras tarjetas y pintamos la que clickeo
                lista.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");

                mostrarDetallesDeReserva(reserva);
            });

            lista.appendChild(card);
        });

        // por defecto mostramos siempre la ultima reserva que agrego
        const ultimaReserva = reservas[reservas.length - 1];
        mostrarDetallesDeReserva(ultimaReserva);

        // y le ponemos la clase selected a esa ultima tarjeta
        const ultimaCard = lista.lastElementChild;
        if (ultimaCard) {
            ultimaCard.classList.add("selected");
        }
    }
}
