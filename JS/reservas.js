const logueado =
localStorage.getItem("logueado");

if(logueado !== "true"){

    alert("Debe iniciar sesión");

    window.location.href =
    "login.html";

}

const lista =
document.getElementById(
    "lista-reservas"
);

const reservas =
JSON.parse(
    localStorage.getItem(
        "reservas"
    )
);

if(reservas){

    for(
        let i = 0;
        i < reservas.length;
        i++
    ){

        const p =
        document.createElement("p");

        p.textContent =
        reservas[i];

        lista.appendChild(p);

    }

}