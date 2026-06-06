const usuario =
JSON.parse(
    localStorage.getItem(
        "usuario"
    )
);

document.getElementById(
    "nombre-usuario"
).textContent =
usuario.nombre;

const formulario =
document.getElementById(
"formPerfil"
);

if(formulario){

formulario.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const telefono =
    document.getElementById(
    "telefono"
    ).value;

    const direccion =
    document.getElementById(
    "direccion"
    ).value;

    const perfil = {

        telefono,
        direccion

    };

    localStorage.setItem(
        "perfil",
        JSON.stringify(perfil)
    );

    alert(
        "Datos guardados"
    );

});

}
