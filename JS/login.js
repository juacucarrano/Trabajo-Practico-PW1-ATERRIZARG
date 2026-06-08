const formulario =
document.querySelector("form");

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

formulario.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const email = document.getElementById("email").value;
        const contrasena = document.getElementById("contrasena").value;

        const usuarioCoincidencia = usuarios.find(u => u.correo === email);
        
        if(usuarioCoincidencia && usuarioCoincidencia.contrasena === contrasena){

            localStorage.setItem("logueado", "true");
            localStorage.setItem("usuarioLogeado", usuarioCoincidencia.correo);

            alert("Bienvenido " + usuarioCoincidencia.nombre);
            window.location.href = "perfil.html";

        }
        else{
            alert("Datos incorrectos");
        }
    }
);