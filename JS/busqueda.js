const destinoBuscado =
localStorage.getItem("destino");

const tarjetas =
document.querySelectorAll(".card");

tarjetas.forEach(function(card){

    const destinoCard =
    card.dataset.destino;

    if(
        destinoBuscado &&
        destinoCard.toLowerCase() !==
        destinoBuscado.toLowerCase()
    ){
        card.style.display = "none";
    }

});
const fechaIda =
localStorage.getItem("fechaIda");

const fechaVuelta =
localStorage.getItem("fechaVuelta");

document.getElementById(
"informacion-busqueda"
).innerHTML =

`
<p>Destino: ${destinoBuscado}</p>
<p>Ida: ${fechaIda}</p>
<p>Vuelta: ${fechaVuelta}</p>
`;

const origen = localStorage.getItem("origen");
const destino = localStorage.getItem("destino");

document.getElementById(
    "informacion-busqueda"
).innerHTML = `
<p>Origen: ${origen}</p>
<p>Destino: ${destino}</p>
`;

function reservar(vuelo){

    const logueado =
    localStorage.getItem("logueado");

    if(logueado !== "true"){

        alert("Debe iniciar sesión");

        window.location.href =
        "login.html";

        return;
    }

    localStorage.setItem(
        "vueloSeleccionado",
        vuelo
    );

    window.location.href =
    "confirmacion-reserva.html";
}

const checkDirecto =
document.getElementById("directo");

if(checkDirecto){

    const tarjetas =
    document.querySelectorAll(".card");

    checkDirecto.addEventListener(
        "change",
        function(){

            tarjetas.forEach(function(card){

                if(checkDirecto.checked){

                    if(
                        card.dataset.tipo !==
                        "directo"
                    ){
                        card.style.display =
                        "none";
                    }
                    else{
                        card.style.display =
                        "flex";
                    }

                }
                else{
                    card.style.display =
                    "flex";
                }

            });

        }
    );

}