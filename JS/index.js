// =================================
// CARGA DINÁMICA DE DESTINOS
// =================================
const destinos = [
    "Madrid",
    "Lima",
    "Miami"
];

const selectDestino = document.getElementById("destino");

destinos.forEach(function(destino) {
    const option = document.createElement("option");
    option.value = destino;
    option.textContent = destino;
    selectDestino.appendChild(option);
});

// =================================
// VALIDACIÓN Y ENVÍO DEL FORMULARIO
// =================================
const formulario = document.querySelector(".buscador");

formulario.addEventListener("submit", function(e) {
    // 1. Captura de valores
    const destino = document.getElementById("destino").value;
    const pasajerosInput = document.getElementById("pasajeros").value;
    const clase = document.getElementById("clase").value;

    // Convertimos a número entero para validar correctamente
    const cantidadPasajeros = parseInt(pasajerosInput, 10);

    // 2. Validación de Destino
    if (destino === "") {
        alert("Por favor, seleccione un destino válido para su vuelo.");
        e.preventDefault();
        return;
    }

    // 3. Validación de Pasajeros
    // Verifica si está vacío (isNaN), si es menor a 1, o si pusieron decimales
    if (isNaN(cantidadPasajeros) || cantidadPasajeros < 1 || pasajerosInput.includes('.')) {
        alert("Por favor, ingrese un número válido de pasajeros (mínimo 1).");
        e.preventDefault();
        return;
    }

    // 4. Validación de Clase
    if (clase === "") {
        alert("Por favor, seleccione la clase en la que desea viajar.");
        e.preventDefault();
        return;
    }

    // 5. Creación del objeto de búsqueda si todo está OK
    const busqueda = {
        origen: "Buenos Aires",
        destino: destino,
        pasajeros: cantidadPasajeros, // Guardado como número puro, no texto
        clase: clase
    };

    // 6. Almacenamiento
    localStorage.setItem("busqueda", JSON.stringify(busqueda));
    console.log("Búsqueda guardada con éxito:", busqueda);
});