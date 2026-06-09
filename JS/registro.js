document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const diaNac = document.getElementById("dia-nac").value;
        const mesNac = document.getElementById("mes-nac").value;
        const anioNac = document.getElementById("anio-nac").value;
        const fechaNac = new Date(anioNac, mesNac - 1 , diaNac);
        const genero = document.getElementById("genero").value;
        const nacionalidad = document.getElementById("nacionalidad").value;
        const documento = document.getElementById("documento").value.trim();
        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const contrasena = document.getElementById("contrasena").value;
        const contrasenaConfirmar = document.getElementById("contrasena-confirmar").value;

        if (!nombre || !apellido || !diaNac || !mesNac || !anioNac || !genero || !nacionalidad || !documento || !correo || !contrasena || !contrasenaConfirmar) {
            alert("Por favor complete todos los campos.");
            return;
        }

        if (contrasena !== contrasenaConfirmar) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const listaUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        const existe = listaUsuarios.some((usuario) => usuario.correo === correo);
        if (existe) {
            alert("Ya existe un usuario con ese correo.");
            return;
        }

        const usuario = {
            nombre,
            apellido,
            fechaNac,
            genero,
            nacionalidad,
            documento,
            correo,
            contrasena,
        };

        listaUsuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

        alert("Usuario registrado");
        window.location.href = "login.html";
    });
});
