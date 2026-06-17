// =========================
// VERIFICAR LOGIN
// =========================

const logueado =
localStorage.getItem("logueado");

if(logueado !== "true"){

    alert("Debe iniciar sesión");

    window.location.href =
    "./login.html";

}

// =========================
// OBTENER VUELO SELECCIONADO
// =========================

const vuelo =
JSON.parse(
    localStorage.getItem(
        "vueloSeleccionado"
    )
);

// Si no hay vuelo seleccionado

if(!vuelo){

    alert(
        "No hay ningún vuelo seleccionado"
    );

    window.location.href =
    "../index.html";

}

// =========================
// MOSTRAR RESUMEN DEL VUELO
// =========================

document.getElementById("ruta-vuelo").textContent =
    `${vuelo.origen} → ${vuelo.destino}`;

document.getElementById("fecha-vuelo").textContent =
    vuelo.fechaSalida;

document.getElementById("horario-vuelo").textContent =
    `${vuelo.horarioSalida} - ${vuelo.horarioLlegada}`;

document.getElementById("numero-vuelo").textContent =
    vuelo.numeroVuelo;

document.getElementById("precio-vuelo").textContent =
    `$${vuelo.precio}`;

document.getElementById("total-vuelo").textContent =
    `$${vuelo.precio}`;

// =========================
// FORMULARIO
// =========================

const formulario =
document.getElementById(
    "checkout-form"
);

// =========================
// GUARDAR RESERVA
// =========================

formulario.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const nombre =
        document.getElementById(
            "nombre-completo"
        ).value.trim();

        const documento =
        document.getElementById(
            "documento"
        ).value.trim();

        const correo =
        document.getElementById(
            "correo-electronico"
        ).value.trim();

        const telefono =
        document.getElementById(
            "telefono"
        ).value.trim();

        const numeroTarjeta =
        document.getElementById(
            "numero-tarjeta"
        ).value.trim();

        const mes =
        document.getElementById(
            "mes-vto"
        ).value;

        const anio =
        document.getElementById(
            "anio-vto"
        ).value;

        const cvv =
        document.getElementById(
            "cvv"
        ).value.trim();

        // =========================
        // VALIDACIONES
        // =========================

        if(
            nombre === "" ||
            documento === "" ||
            correo === "" ||
            telefono === "" ||
            numeroTarjeta === "" ||
            mes === "" ||
            anio === "" ||
            cvv === ""
        ){

            alert(
                "Complete todos los campos obligatorios"
            );

            return;

        }

        // =========================
        // USUARIO
        // =========================

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

        // =========================
        // RESERVA COMPLETA
        // =========================

        const reservaCompleta = {

            origen:
            vuelo.origen,

            destino:
            vuelo.destino,

            aerolinea:
            vuelo.aerolinea,

            precio:
            vuelo.precio,

            horario:
            vuelo.horario,

            duracion:
            vuelo.duracion,

            numeroVuelo:
            vuelo.numeroVuelo,

            fechaSalida:
            vuelo.fechaSalida,

            horarioSalida:
            vuelo.horarioSalida,

            horarioLlegada:
            vuelo.horarioLlegada,

            pasajero: {

                nombre:
                nombre,

                documento:
                documento,

                correo:
                correo,

                telefono:
                telefono

            }

        };

        // =========================
        // GUARDAR
        // =========================

        reservas.push(
            reservaCompleta
        );

        localStorage.setItem(
            "reservas_" + usuario,
            JSON.stringify(
                reservas
            )
        );

        // =========================
        // LIMPIAR TEMPORAL
        // =========================

        localStorage.removeItem(
            "vueloSeleccionado"
        );

        // =========================
        // CONFIRMAR
        // =========================

        alert(
            "Pago realizado correctamente"
        );
        window.location.href =
        "./reservas.html";

    }
);