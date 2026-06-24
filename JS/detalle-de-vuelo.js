const avionData = [
    { fila: 1, izq: ["1A", "1B", "1C", "1D"], pasillo: "P", der: ["1E", "1F", "1G", "1H"] },
    { fila: 2, izq: ["2A", "2B", "2C", "2D"], pasillo: "A", der: ["2E", "2F", "2G", "2H"] },
    { fila: 3, izq: ["3A", "3B", "3C", "3D"], pasillo: "S", der: ["3E", "3F", "3G", "3H"] },
    { fila: 4, izq: ["4A", "4B", "4C", "4D"], pasillo: "I", der: ["4E", "4F", "4G", "4H"] },
    { fila: 5, izq: ["5A", "5B", "5C", "5D"], pasillo: "L", der: ["5E", "5F", "5G", "5H"] },
    { fila: 6, izq: ["6A", "6B", "6C", "6D"], pasillo: "L", der: ["6E", "6F", "6G", "6H"] },
    { fila: 7, izq: ["7A", "7B", "7C", "7D"], pasillo: "O", der: ["7E", "7F", "7G", "7H"] }
];

const container =
    document.querySelector(
        ".asiento-container"
    );

const vuelo =
    JSON.parse(
        localStorage.getItem(
            "vueloSeleccionado"
        )
    );

if (!vuelo) {
    alert("Debe seleccionar un vuelo primero.");
    window.location.href = "./busqueda.html";
} else {
    const claveAsientos =
        "asientos_" +
        vuelo.numeroVuelo;

    const asientosOcupados =
        JSON.parse(
            localStorage.getItem(
                claveAsientos
            )
        ) || [];

    let asientosSeleccionados =
        JSON.parse(
            localStorage.getItem(
                "asientosSeleccionados"
            )
        ) || [];


    function renderAvion() {

        avionData.forEach(function (fila) {

            const numero =
                document.createElement("div");

            numero.className = "numero";
            numero.textContent = fila.fila;

            container.appendChild(numero);

            fila.izq.forEach(crearAsiento);

            const pasillo =
                document.createElement("div");

            pasillo.className = "pasillo";
            pasillo.textContent = fila.pasillo;

            container.appendChild(pasillo);

            fila.der.forEach(crearAsiento);

        });

    }

    function continuarCheckout() {

        const asientos =
            JSON.parse(
                localStorage.getItem(
                    "asientosSeleccionados"
                )
            ) || [];

        const busqueda =
            JSON.parse(
                localStorage.getItem(
                    "busqueda"
                )
            );

        const cantidadPasajeros =
            busqueda?.pasajeros || 1;

        if (
            asientos.length !==
            cantidadPasajeros
        ) {
            alert(
                "Debe seleccionar " +
                cantidadPasajeros +
                " asiento(s)"
            );
            return;
        }

        window.location.href =
            "./checkout.html";

    }

    function crearAsiento(id) {

        const svg =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );

        svg.setAttribute(
            "viewBox",
            "0 0 24 24"
        );


        svg.innerHTML =
            `<path d="M4,18v3h3v-3h10v3h3v-6H4V18z M19,10h3v3h-3V10z M2,10h3v3H2V10z M17,13H7V5c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2V13z"/>`;

        svg.classList.add("svg");

        if (asientosOcupados.includes(id)) {

            svg.classList.add("ocupado");

        } else {

            svg.classList.add("disponible");

            if (
                asientosSeleccionados.includes(id)
            ) {
                svg.classList.remove(
                    "disponible"
                );

                svg.classList.add(
                    "seleccionado"
                );
            }

            svg.addEventListener(
                "click",
                function () {

                    const busqueda =
                        JSON.parse(
                            localStorage.getItem(
                                "busqueda"
                            )
                        );

                    const cantidadPasajeros =
                        busqueda?.pasajeros || 1;

                    // Si ya estaba seleccionado
                    if (
                        asientosSeleccionados.includes(id)
                    ) {

                        asientosSeleccionados =
                            asientosSeleccionados.filter(
                                function (asiento) {
                                    return asiento !== id;
                                }
                            );

                        localStorage.setItem(
                            "asientosSeleccionados",
                            JSON.stringify(
                                asientosSeleccionados
                            )
                        );

                        svg.classList.remove(
                            "seleccionado"
                        );

                        svg.classList.add(
                            "disponible"
                        );

                        return;
                    }

                    // Control de cantidad máxima
                    if (
                        asientosSeleccionados.length >=
                        cantidadPasajeros
                    ) {

                        alert(
                            "Solo puede seleccionar " +
                            cantidadPasajeros +
                            " asiento(s)"
                        );

                        return;
                    }

                    // Seleccionar asiento
                    asientosSeleccionados.push(id);

                    localStorage.setItem(
                        "asientosSeleccionados",
                        JSON.stringify(
                            asientosSeleccionados
                        )
                    );

                    svg.classList.remove(
                        "disponible"
                    );

                    svg.classList.add(
                        "seleccionado"
                    );

                }
            );

        }

        container.appendChild(svg);

    }

    renderAvion();

    console.log(vuelo);

    document.getElementById(
        "ruta-vuelo"
    ).textContent =
        vuelo.origen +
        " → " +
        vuelo.destino;

    document.getElementById(
        "horario-vuelo"
    ).textContent =
        vuelo.horarioSalida + " - " + vuelo.horarioLlegada;

    document.getElementById(
        "tipo-vuelo"
    ).textContent =
        vuelo.aerolinea;

    document.getElementById(
        "precio-vuelo"
    ).textContent =
        "Total: $" +
        vuelo.precio;

}