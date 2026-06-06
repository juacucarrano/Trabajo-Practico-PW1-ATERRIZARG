const lista = document.getElementById("lista-reservas");

const reservas = JSON.parse(localStorage.getItem("reservas"));

if (reservas !== null) {

    for (let i = 0; i < reservas.length; i++) {

        const p = document.createElement("p");

        p.textContent = reservas[i];

        lista.appendChild(p);

    }

}