const formulario =
    document.querySelector("form");

formulario.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        if (document.getElementById("contrasena").value !== document.getElementById("contrasena-confirmar").value) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const usuarioExistente = JSON.parse(localStorage.getItem("usuario"));
        if(usuarioExistente && usuarioExistente.correo === correo) alert("Ya existe un usuario con ese correo.");

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