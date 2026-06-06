const formulario = document.querySelector(".buscador");

formulario.addEventListener("submit", function () {
    if(
origen === "" ||
destino === ""
){

    alert(
    "Complete origen y destino"
    );

    e.preventDefault();

    return;
}

    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const fechaIda = document.getElementById("fecha-ida").value;
    const fechaVuelta = document.getElementById("fecha-vuelta").value;
    const pasajeros = document.getElementById("pasajeros").value;
    const clase = document.getElementById("clase").value;

    localStorage.setItem("origen", origen);
    localStorage.setItem("destino", destino);
    localStorage.setItem("fechaIda", fechaIda);
    localStorage.setItem("fechaVuelta", fechaVuelta);
    localStorage.setItem("pasajeros", pasajeros);
    localStorage.setItem("clase", clase);

});
