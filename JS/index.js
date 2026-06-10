const formulario = document.querySelector(".buscador");

formulario.addEventListener("submit", function (e) {
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;
  const fechaIda = document.getElementById("fecha-ida").value;
  const fechaVuelta = document.getElementById("fecha-vuelta").value;
  const pasajeros = document.getElementById("pasajeros").value;
  const clase = document.getElementById("clase").value;

  if (origen === "" || destino === "") {
    alert("Complete origen y destino");
    e.preventDefault();
    return;
  }

  const busqueda = { origen, destino, fechaIda, fechaVuelta, pasajeros, clase };
  localStorage.setItem("busqueda", JSON.stringify(busqueda));
});
