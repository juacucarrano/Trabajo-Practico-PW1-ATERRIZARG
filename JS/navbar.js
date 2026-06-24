const usuarioLogueado = localStorage.getItem("usuarioLogueado");

const botonPerfil = document.getElementById("nav-perfil");
const botonLogin = document.getElementById("nav-iniciar-sesion")
const botonCerrarSesion = document.getElementById("nav-cerrar-sesion");

if (usuarioLogueado) {
    botonPerfil.classList.remove("oculto");
    botonCerrarSesion.classList.remove("oculto");

    botonLogin.classList.add("oculto");
} else {
    botonLogin.classList.remove("oculto");

    botonPerfil.classList.add("oculto");
    botonCerrarSesion.classList.add("oculto");
}

function cerrarSesion() {

    localStorage.removeItem("usuarioLogueado");

    if (window.location.pathname.includes("/pages/")) {
        window.location.href = "../index.html";
    } else {
        window.location.href = "./index.html";
    }

}