const logueado =
localStorage.getItem("logueado");

if(logueado !== "true"){

    alert("Debe iniciar sesión");

    window.location.href =
    "login.html";

}

const vuelo =
localStorage.getItem(
    "vueloSeleccionado"
);

document.getElementById(
    "resumen-vuelo"
).textContent =
"Vuelo: " + vuelo;

const formulario =
document.querySelector("form");

formulario.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        let reservas =
        JSON.parse(
            localStorage.getItem(
                "reservas"
            )
        ) || [];

        reservas.push(vuelo);

        localStorage.setItem(
            "reservas",
            JSON.stringify(reservas)
        );

        alert(
            "Pago realizado correctamente"
        );

        window.location.href =
        "reservas.html";

    }
);