const formulario =
document.querySelector("form");

formulario.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const email =
        document.getElementById(
            "email"
        ).value;

        const contrasena =
        document.getElementById(
            "contrasena"
        ).value;

        const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

        if(
            usuario &&
            usuario.correo === email &&
            usuario.contrasena === contrasena
        ){

            localStorage.setItem(
                "logueado",
                "true"
            );

            alert(
                "Bienvenido " +
                usuario.nombre
            );

            window.location.href =
            "perfil.html";

        }
        else{

            alert(
                "Datos incorrectos"
            );

        }

    }
);