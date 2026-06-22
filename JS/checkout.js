// =========================
// VERIFICAR LOGIN
// =========================
const usuarioLogueado = localStorage.getItem("usuarioLogueado");

if (!usuarioLogueado) {
    alert("Debe iniciar sesión");
    window.location.href = "./login.html";
}

// =========================
// OBTENER VUELO SELECCIONADO
// =========================
const vuelo = JSON.parse(localStorage.getItem("vueloSeleccionado"));

// Si no hay vuelo seleccionado
if (!vuelo) {
    alert("No hay ningún vuelo seleccionado");
    window.location.href = "../index.html";
}

// mostramos el resumen del vuelo y los pasajeros
const busqueda = JSON.parse(localStorage.getItem("busqueda")) || {};
const cantidadPasajeros = busqueda.pasajeros || 1;
let descuentoAplicado = 0;
const totalBase = vuelo.precio * cantidadPasajeros;

document.getElementById("ruta-vuelo").textContent = `${vuelo.origen} → ${vuelo.destino}`;
document.getElementById("fecha-vuelo").textContent = vuelo.fechaSalida;
document.getElementById("horario-vuelo").textContent = `${vuelo.horarioSalida} - ${vuelo.horarioLlegada}`;
document.getElementById("numero-vuelo").textContent = vuelo.numeroVuelo;
document.getElementById("precio-vuelo").textContent = `$${vuelo.precio}`;

// actualizamos la cantidad de pasajeros en el html
const summaryItems = document.querySelectorAll(".summary-item");
summaryItems.forEach(item => {
    if (item.querySelector(".summary-item-label")?.textContent.trim() === "Pasajeros:") {
        item.querySelector(".summary-item-value").textContent = cantidadPasajeros;
    }
});

function actualizarTotal() {
    const finalTotal = totalBase - descuentoAplicado;
    document.getElementById("total-vuelo").textContent = `$${finalTotal}`;
}
actualizarTotal();

// aca aplicamos el codigo de descuento
const inputDescuento = document.getElementById("codigo-descuento");
const btnDescuento = document.querySelector(".apply-discount-btn");

if (btnDescuento && inputDescuento) {
    btnDescuento.addEventListener("click", function () {
        const codigo = inputDescuento.value.trim().toUpperCase();
        if (codigo === "DESCUENTO10" || codigo === "ATERRIZARG") {
            descuentoAplicado = Math.round(totalBase * 0.1); // 10% de descuento
            alert(`¡Código aplicado correctamente! Descuento de $${descuentoAplicado} USD.`);
        } else {
            alert("Código de descuento inválido");
            descuentoAplicado = 0;
            inputDescuento.value = "";
        }
        actualizarTotal();
    });
}

// =================================
// CAMBIO DINÁMICO DE MÉTODOS DE PAGO
// =================================
// Capturamos los tres contenedores de detalles del HTML
const detallesTarjeta = document.getElementById("creditCardDetails");
const detallesPaypal = document.getElementById("paypalDetails");
const detallesTransferencia = document.getElementById("transferDetails");

// Capturamos todos los radio buttons que manejan el pago
const opcionesPago = document.querySelectorAll('input[name="payment"]');

// Escuchamos cuando el usuario cambia de opción de pago
opcionesPago.forEach(radio => {
    radio.addEventListener("change", function (e) {
        const metodoSeleccionado = e.target.value; // "creditCard", "paypal" o "transfer"

        // Ocultamos todos los contenedores primero
        detallesTarjeta.classList.add("oculto");
        detallesPaypal.classList.add("oculto");
        detallesTransferencia.classList.add("oculto");

        // Quitamos el 'required' de la tarjeta por si elige otro método
        document.getElementById("numero-tarjeta").required = false;
        document.getElementById("mes-vto").required = false;
        document.getElementById("anio-vto").required = false;
        document.getElementById("cvv").required = false;

        // Mostramos solo el que corresponde y activamos validaciones si es tarjeta
        if (metodoSeleccionado === "creditCard") {
            detallesTarjeta.classList.remove("oculto");
            document.getElementById("numero-tarjeta").required = true;
            document.getElementById("mes-vto").required = true;
            document.getElementById("anio-vto").required = true;
            document.getElementById("cvv").required = true;
        } else if (metodoSeleccionado === "paypal") {
            detallesPaypal.classList.remove("oculto");
        } else if (metodoSeleccionado === "transfer") {
            detallesTransferencia.classList.remove("oculto");
        }
    });
});

// =========================
// FORMULARIO
// =========================
const formulario = document.getElementById("checkout-form");

// =========================
// GUARDAR RESERVA
// =========================
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre-completo").value.trim();
    const documento = document.getElementById("documento").value.trim();
    const correo = document.getElementById("correo-electronico").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    const numeroTarjeta = document.getElementById("numero-tarjeta").value.trim();
    const mes = document.getElementById("mes-vto").value;
    const anio = document.getElementById("anio-vto").value;
    const cvv = document.getElementById("cvv").value.trim();

    // =========================
    // VALIDACIONES MEJORADAS
    // =========================
    // 1. Validar datos personales comunes
    if (nombre === "" || documento === "" || correo === "") {
        alert("Complete todos los campos obligatorios del pasajero");
        return;
    }

    if (nombre.length < 2) {
        alert("Ingrese un nombre válido")
        return;
    }

    if (documento.length < 6 || documento.length > 9) {
        alert("Ingrese un documento válido")
        return;
    }

    // 2. Validar datos de tarjeta SOLO si está seleccionada la opción "creditCard"
    const metodoPagoActual = document.querySelector('input[name="payment"]:checked').value;
    let tarjetaMascara = "No aplica";
    if (metodoPagoActual === "creditCard") {
        if (numeroTarjeta === "" || mes === "" || anio === "" || cvv === "") {
            alert("Complete los datos de su tarjeta de crédito");
            return;
        } else {
            tarjetaMascara = "**** **** **** " + numeroTarjeta.slice(-4);
        }
    }

    // =========================
    // USUARIO
    // =========================
    const usuario = localStorage.getItem("usuarioLogueado");

    let reservas = JSON.parse(localStorage.getItem("reservas_" + usuario)) || [];

    // =========================
    // RESERVA COMPLETA
    // =========================
    const reservaCompleta = {
        origen: vuelo.origen,
        destino: vuelo.destino,
        aerolinea: vuelo.aerolinea,
        precio: vuelo.precio,
        cantidadDePasajeros: cantidadPasajeros,
        descuento: descuentoAplicado,
        duracion: vuelo.duracion,
        numeroVuelo: vuelo.numeroVuelo,
        fechaSalida: vuelo.fechaSalida,
        horarioSalida: vuelo.horarioSalida,
        horarioLlegada: vuelo.horarioLlegada,
        metodoPago: metodoPagoActual,
        tarjetaInfo: tarjetaMascara,
        fechaDePago: new Date(),
        pasajero: {
            nombre: nombre,
            documento: documento,
            correo: correo,
            telefono: telefono
        }
    };

    // =========================
    // GUARDAR
    // =========================
    reservas.push(reservaCompleta);
    localStorage.setItem("reservas_" + usuario, JSON.stringify(reservas));

    // =========================
    // LIMPIAR TEMPORAL
    // =========================
    localStorage.removeItem("vueloSeleccionado");

    // =========================
    // CONFIRMAR
    // =========================
    alert("Pago realizado correctamente");
    window.location.href = "./reservas.html";
});