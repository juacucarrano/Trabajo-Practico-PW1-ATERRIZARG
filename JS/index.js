const destinos = [
    "Madrid",
    "Lima",
    "Miami"
];

const selectDestino =
document.getElementById("destino");

destinos.forEach(function(destino){

    const option =
    document.createElement("option");

    option.value = destino;
    option.textContent = destino;

    selectDestino.appendChild(option);

});

const formulario =
document.querySelector(".buscador");

formulario.addEventListener(
    "submit",
    function(e){

        const destino =
        document.getElementById("destino").value;

        const pasajeros =
        document.getElementById("pasajeros").value;

        const clase =
        document.getElementById("clase").value;

        if(destino === ""){

            alert("Seleccione un destino");

            e.preventDefault();

            return;
        }

        const busqueda = {

            origen: "Buenos Aires",
            destino: destino,
            pasajeros: pasajeros,
            clase: clase

        };

        localStorage.setItem(
            "busqueda",
            JSON.stringify(busqueda)
        );

        console.log(busqueda);

    }
);
