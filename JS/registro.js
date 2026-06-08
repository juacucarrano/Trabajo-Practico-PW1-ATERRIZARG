const formulario =
    document.querySelector("form");

const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

formulario.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        if (document.getElementById("contrasena").value !== document.getElementById("contrasena-confirmar").value) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const existe = listaUsuarios.some((usuario) => {
            return usuario.correo === document.getElementById("correo").value;
        })
        if (existe) {
            alert("Ya existe un usuario con ese correo.");
            return;
        }

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
        
        listaUsuarios.push(usuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(listaUsuarios)
        );

        alert(
            "Usuario registrado"
        );


        window.location.href =
            "login.html";

    }
);

