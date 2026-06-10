const estaLogeado = localStorage.getItem("logueado");

const botonPerfil = document.getElementById("nav-perfil");
const botonLogin = document.getElementById("nav-iniciar-sesion")
const botonCerrarSesion = document.getElementById("nav-cerrar-sesion");

if (estaLogeado === "true") {
    botonPerfil.classList.remove("oculto");
    botonCerrarSesion.classList.remove("oculto");

    botonLogin.classList.add("oculto");
} else {
    botonLogin.classList.remove("oculto");

    botonPerfil.classList.add("oculto");
    botonCerrarSesion.classList.add("oculto");
}

function cerrarSesion() {

    localStorage.removeItem("logueado");
    localStorage.removeItem("usuarioLogueado");

    window.location.href = "../index.html";

}