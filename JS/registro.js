const formulario =
document.querySelector("form");

formulario.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const usuario = {

            nombre:
            document.getElementById(
                "nombre"
            ).value,

            apellido:
            document.getElementById(
                "apellido"
            ).value,

            correo:
            document.getElementById(
                "correo"
            ).value,

            contrasena:
            document.getElementById(
                "contrasena"
            ).value

        };

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        alert(
            "Usuario registrado"
        );

        window.location.href =
        "login.html";

    }
);